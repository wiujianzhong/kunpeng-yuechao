(() => {
    const brand = document.currentScript.dataset.brand;
    const company = document.querySelector('.workspace-owner').textContent.trim();
    const more = document.querySelector('#tool-more');
    const key = 'ppt-welcome-seen-v1-' + brand;
    const accent = brand === 'texhong' ? '#965017' : '#246347';
    const tint = brand === 'texhong' ? '#fbf2e8' : '#eaf3ed';

    const style = document.createElement('style');
    style.textContent = `
        #ppt-welcome {
            position: fixed; inset: 0; margin: auto; box-sizing: border-box;
            width: calc(100% - 32px); max-width: 420px; height: fit-content;
            max-height: calc(100% - 32px); overflow: auto;
            padding: clamp(20px, 5vw, 32px); color: #1f2926; background: #fff;
            border: 0; border-top: 5px solid ${accent}; border-radius: 16px;
            box-shadow: 0 18px 64px rgba(14, 31, 24, .22); text-align: left;
            font-family: system-ui, "PingFang SC", "Microsoft YaHei", sans-serif;
        }
        #ppt-welcome:not([open]) { display: none; }
        #ppt-welcome::backdrop { background: rgba(22, 32, 28, .55); }
        #ppt-welcome.ppt-welcome-fallback { z-index: 2147483647; box-shadow: 0 0 0 100vmax rgba(22,32,28,.55); }
        #ppt-welcome .ppt-welcome-brand { display: flex; align-items: center; gap: 10px; color: ${accent}; font-size: 14px; font-weight: 650; }
        #ppt-welcome .ppt-welcome-brand img { height: 31px; width: auto; max-width: 100px; object-fit: contain; }
        #ppt-welcome h2 { margin: 17px 0 5px; color: #17261f; font-size: clamp(22px, 5vw, 27px); line-height: 1.35; font-weight: 750; }
        #ppt-welcome p { margin: 0; color: #515d57; font-size: 15px; line-height: 1.65; }
        #ppt-welcome ul { display: grid; gap: 8px; margin: 17px 0 20px; padding: 13px 15px; list-style: none; color: #293d32; background: ${tint}; border-radius: 9px; font-size: 14px; line-height: 1.55; }
        #ppt-welcome li { display: flex; gap: 9px; }
        #ppt-welcome li::before { content: "✓"; color: ${accent}; font-weight: bold; }
        #ppt-welcome-start { width: 100%; min-height: 47px; border: 0; border-radius: 9px; background: ${accent}; color: #fff; font: inherit; font-weight: 650; cursor: pointer; }
        #ppt-welcome-start:focus-visible { outline: 3px solid #183e73; outline-offset: 3px; }
        #ppt-welcome .ppt-welcome-credit { margin: 11px 0 0; text-align: center; font-size: 12px; }
    `;
    document.head.append(style);

    const dialog = document.createElement('dialog');
    dialog.id = 'ppt-welcome';
    dialog.setAttribute('aria-labelledby', 'ppt-welcome-title');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('role', 'dialog');
    dialog.innerHTML = `
        <div class="ppt-welcome-brand"><img alt=""><span></span></div>
        <h2 id="ppt-welcome-title">用现场照片生成整改 PPT</h2>
        <p>整理巡检问题、对比整改前后照片，按公司模板生成可编辑的报告。</p>
        <ul><li>上传现场照片，填写问题和整改说明</li>
            <li>导入已有 PPT，提取现场照片和文字</li>
            <li>导出中文或中文加拼音的 PPT</li></ul>
        <button id="ppt-welcome-start" type="button">确认，开始使用</button>
        <p class="ppt-welcome-credit">小伍工作室出品 · 免费使用</p>`;
    dialog.querySelector('.ppt-welcome-brand span').textContent = company + ' · 问题整改';
    dialog.querySelector('img').src = document.querySelector('.workspace-brand img').src;
    document.body.append(dialog);

    const start = dialog.querySelector('button');
    const about = document.createElement('button');
    about.id = 'ppt-welcome-about';
    about.type = 'button';
    about.textContent = '工具介绍';
    more.querySelector('.workspace-panel').insertBefore(about, more.querySelector('a'));

    function openWelcome() {
        if (dialog.hasAttribute('open')) return;
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else {
            dialog.classList.add('ppt-welcome-fallback');
            dialog.setAttribute('open', '');
        }
        start.focus();
    }

    function enterTool() {
        try { localStorage.setItem(key, '1'); } catch {}
        if (typeof dialog.close === 'function') dialog.close();
        else dialog.removeAttribute('open');
        const target = more.open ? more.querySelector('summary') : document.querySelector('#workspace-header h1');
        more.open = false;
        if (target.tagName === 'H1') target.tabIndex = -1;
        target.focus({preventScroll: true});
    }

    start.addEventListener('click', enterTool);
    about.addEventListener('click', openWelcome);
    dialog.addEventListener('cancel', event => { event.preventDefault(); enterTool(); });
    dialog.addEventListener('keydown', event => {
        if (event.key === 'Tab') { event.preventDefault(); start.focus(); }
        if (event.key === 'Escape' && dialog.classList.contains('ppt-welcome-fallback')) enterTool();
    });
    let seen = false;
    try { seen = localStorage.getItem(key) === '1'; } catch {}
    if (!seen) openWelcome();
})();
