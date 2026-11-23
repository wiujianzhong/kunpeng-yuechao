// 两个公司版本共用同一套导入与草稿替换流程。
const IMPORTED_SOURCE_KEY = 'source-pptx';

async function preparePPTXImport(file, mode) {
    const { rows, preservedSlides, slideSize } = await extractIssuesFromPPTX(file, mode);
    if (!rows.length && !preservedSlides.length) throw new Error('未找到可导入的内容，已跳过封面和模板装饰。');
    const records = [];
    for (const [index, row] of rows.entries()) {
        setMediaProgress(`正在检查新报告的照片和文字 ${index + 1}/${rows.length}…`);
        row.id = issueCount + index + 1;
        for (const type of ['left', 'right']) {
            const side = row[type];
            if (!side?.image && !side?.video) continue;
            const blob = await readMediaBlob(side.video || side.image);
            if (!blob.size) throw new Error('报告中有空的媒体文件。');
            const kind = side.video ? 'video' : 'image';
            const record = { key: getDraftMediaKey(row.id, type), name: side.name || '', kind, blob };
            if (kind === 'image') record.thumbnail = await resizeImageBlob(blob, 320, 0.8);
            else side.videoData = await readDraftBlob(blob);
            side.record = record;
            records.push(record);
        }
    }
    const source = preservedSlides.length ? { file, preservedSlides, slideSize, mode } : null;
    if (source) records.push({ key: IMPORTED_SOURCE_KEY, blob: file });
    return { rows, records, source };
}

function currentPPTXWorkSummary() {
    const { issues } = collectDraftState();
    const summary = { issues: issues.length, photos: 0, videos: 0, preserved: importedPPTX?.preservedSlides.length || 0, extracted: extractedPPTXTextRows.length };
    for (const item of issues) {
        for (const kind of [item.leftKind, item.rightKind]) {
            if (kind === 'image') summary.photos++;
            if (kind === 'video') summary.videos++;
        }
    }
    return summary;
}

async function replaceStoredPPTXDraft(draft, records) {
    const db = await getDraftDB();
    async function commit(pack) {
        const prepared = [];
        for (const record of records) prepared.push(pack ? await packDraftMediaRecord(record) : record);
        await new Promise((resolve, reject) => {
            const transaction = db.transaction([DRAFT_META_STORE, DRAFT_MEDIA_STORE], 'readwrite');
            transaction.oncomplete = resolve;
            transaction.onabort = () => reject(transaction.error || new Error('草稿替换中断。'));
            const media = transaction.objectStore(DRAFT_MEDIA_STORE);
            try {
                media.clear();
                for (const record of prepared) media.put(record);
                transaction.objectStore(DRAFT_META_STORE).put(draft);
            } catch (error) {
                transaction.abort();
                reject(error);
            }
        });
    }
    try {
        await commit(draftBlobsNeedBuffers);
    } catch (error) {
        if (draftBlobsNeedBuffers || !isDraftBlobStorageError(error)) throw error;
        await commit(true);
        draftBlobsNeedBuffers = true;
    }
}

function releasePPTXIssueData(ids) {
    for (const id of ids) {
        mergedDescriptionStates.delete(String(id));
        for (const type of ['left', 'right']) {
            const key = getDraftMediaKey(id, type);
            clearPhotoPreview(key);
            savedPhotoMarkups.delete(key);
            draftPendingMedia.delete(key);
            draftMediaKeys.delete(key);
            unsavedMediaKeys.delete(key);
            delete window[`${type}Image-${id}`];
            delete window[`${type}Video-${id}`];
            delete window[`${type}VideoName-${id}`];
        }
    }
}

async function replacePPTXWorkspace(prepared, mode, fileName) {
    const { rows, records, source } = prepared;
    const container = document.getElementById('issues-container');
    const previous = document.createDocumentFragment();
    const oldIds = Array.from(container.children, issue => issue.id.slice(6));
    const oldSource = importedPPTX;
    const oldCount = issueCount;
    const oldPage = currentIssuePage;
    clearTimeout(draftSaveTimer);
    isRestoringDraft = true;
    container.setAttribute('inert', '');
    // 保留旧节点及其事件、照片引用；草稿事务成功后才释放。
    while (container.firstChild) previous.appendChild(container.firstChild);
    try {
        importedPPTX = source;
        currentIssuePage = 0;
        for (const row of rows) {
            const id = addEmptyIssue(row.id, mode === 'rectify' ? fileName : '', mode === 'edit' ? fileName : '');
            document.getElementById(`process-${id}`).value = row.processName || '';
            for (const type of ['left', 'right']) {
                const side = row[type];
                document.getElementById(`${type}Desc-${id}`).value = side?.title || (type === 'right' && mode === 'rectify' ? '已整改' : '');
                if (side?.record) await applyMediaRecord(id, type, side.record, draftAvailable, side.videoData);
            }
            if (row.descMerged) setIssueDescriptionMerged(id, true, row.left?.title ? 'left' : 'right');
        }
        renumberIssues();
        refreshBatchImagesFromIssues();
        if (draftAvailable) await replaceStoredPPTXDraft(collectDraftState(), records);
    } catch (error) {
        releasePPTXIssueData(rows.map(row => row.id));
        container.textContent = '';
        container.appendChild(previous);
        importedPPTX = oldSource;
        issueCount = oldCount;
        currentIssuePage = oldPage;
        renumberIssues();
        refreshBatchImagesFromIssues();
        throw error;
    } finally {
        container.removeAttribute('inert');
        isRestoringDraft = false;
        scheduleDraftSave();
    }
    releasePPTXIssueData(oldIds);
    for (const record of records) if (draftAvailable) draftMediaKeys.add(record.key);
    defaultProcessTitle = '';
    activePasteTarget = null;
    clearExtractedPPTXText();
    updateDraftStatus(draftAvailable ? '💾 新报告已保存到本机草稿' : '当前浏览器未开启本机草稿，请及时生成PPT备份');
}

function handlePPTXImport(file, mode) {
    if (!file) return;
    return enqueueMediaTask(() => importPPTXFile(file, mode));
}

async function importPPTXFile(file, mode = 'rectify') {
    if (!/\.pptx$/i.test(file.name || '')) {
        alert('请选择PPTX文件');
        return;
    }
    const button = document.getElementById('import-pptx-btn');
    button.disabled = true;
    try {
        setMediaProgress('正在检查新PPT…');
        const prepared = await preparePPTXImport(file, mode);
        const summary = currentPPTXWorkSummary();
        if ((summary.issues || summary.preserved || summary.extracted) && !await confirmPPTXReplacement(summary, file.name, mode)) return;
        setMediaProgress('正在导入新报告…');
        await replacePPTXWorkspace(prepared, mode, file.name);
        const pages = prepared.source?.preservedSlides.length || 0;
        alert(`导入完成，共 ${prepared.rows.length} 页可填写内容${pages ? `，另保留 ${pages} 页原始内容` : ''}。`);
    } catch (error) {
        console.warn('导入失败', error);
        let message = getErrorMessage(error);
        if (error.name === 'QuotaExceededError') message = '本机空间不足，无法保存新报告。';
        else if (/zip|central directory|end of data/i.test(message) && !/[\u3400-\u9fff]/.test(message)) message = '文件损坏或不是有效的 PPTX，请重新选择。';
        else if (/[a-zA-Z]{3}/.test(message) && !/[\u3400-\u9fff]/.test(message)) message = '文件无法完整读取或保存，请检查文件和本机可用空间。';
        alert(`导入失败，当前工作已保留。\n${message}`);
    } finally {
        button.disabled = false;
    }
}
