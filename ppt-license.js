(function () {
    'use strict';

    const VERSION = '20260713-stable-machine';
    const ACTIVATION_KEY = 'jx_ppt_activation';
    const OFFLINE_GRACE_KEY = 'jx_ppt_offline_grace';
    const INSTALLATION_KEY = 'jx_ppt_installation_id';
    const TRIAL_KEY = 'jx_ppt_trial';
    const TRIAL_FINGERPRINT_PREFIX = 'trialFingerprint-';
    const LICENSE_API = 'https://pptsq.xiaowustudio.cn/api/license';
    const GRACE_MS = 30 * 24 * 60 * 60 * 1000;
    const LEGACY_MIGRATION_PREFIX = 'jx-ppt-migrate:';
    const hostname = window.location.hostname.toLowerCase();
    const PRODUCT_SCOPE = hostname === 'th.xiaowustudio.cn'
        || hostname === 'texhong-ppt.xiaowustudio.cn'
        || (hostname === 'wiujianzhong.github.io' && window.location.pathname.includes('texhong'))
        ? 'th'
        : 'jx';
    let licenseMode = 'locked';

    function scopedCookieName(key) {
        return `${key}_${PRODUCT_SCOPE}`;
    }

    function cookieGet(name) {
        const prefix = `${encodeURIComponent(name)}=`;
        const cookies = document.cookie ? document.cookie.split('; ') : [];
        for (const cookie of cookies) {
            if (cookie.indexOf(prefix) !== 0) continue;
            try {
                return decodeURIComponent(cookie.slice(prefix.length));
            } catch (_) {
                return null;
            }
        }
        return null;
    }

    function cookieSet(name, value, maxAgeSeconds) {
        try {
            const attributes = [
                `max-age=${maxAgeSeconds || 400 * 24 * 60 * 60}`,
                'path=/',
                'SameSite=Lax'
            ];
            if (window.location.protocol === 'https:') attributes.push('Secure');
            if (hostname === 'xiaowustudio.cn' || hostname.endsWith('.xiaowustudio.cn')) {
                attributes.push('Domain=.xiaowustudio.cn');
            }
            document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; ${attributes.join('; ')}`;
            return true;
        } catch (_) {
            return false;
        }
    }

    function storageGet(key) {
        try {
            const value = localStorage.getItem(key);
            if (value !== null) return value;
        } catch (_) {}
        return cookieGet(scopedCookieName(key)) || cookieGet(key);
    }

    function storageSet(key, value, maxAgeSeconds) {
        let localSaved = false;
        try {
            localStorage.setItem(key, value);
            localSaved = true;
        } catch (_) {}
        const cookieSaved = cookieSet(scopedCookieName(key), value, maxAgeSeconds);
        return localSaved || cookieSaved;
    }

    function simpleHash(str) {
        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash).toString(36).toUpperCase().slice(0, 8);
    }

    function getCanvasFingerprint() {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 200;
            canvas.height = 50;
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, 200, 50);
            ctx.fillStyle = '#000';
            ctx.font = '14px Arial';
            ctx.fillText('KunpengYuechao2026', 10, 30);
            return canvas.toDataURL();
        } catch (_) {
            return '';
        }
    }

    let cachedMachineCode = '';

    function getMachineCode() {
        if (cachedMachineCode) return cachedMachineCode;
        cachedMachineCode = simpleHash([
            navigator.userAgent || '',
            navigator.platform || '',
            `${screen.width}x${screen.height}x${screen.colorDepth}`,
            navigator.language || '',
            navigator.hardwareConcurrency || '',
            navigator.deviceMemory || '',
            getCanvasFingerprint()
        ].join('|||'));
        return cachedMachineCode;
    }

    function getTrialFingerprint() {
        return simpleHash([
            navigator.userAgent || '',
            `${screen.width}x${screen.height}x${screen.colorDepth}`,
            Intl.DateTimeFormat().resolvedOptions().timeZone || '',
            navigator.language || ''
        ].join('|||'));
    }

    function getTrialFingerprintKey() {
        return `${TRIAL_FINGERPRINT_PREFIX}${getTrialFingerprint()}`;
    }

    function openActivationDB() {
        return new Promise((resolve, reject) => {
            if (!window.indexedDB) {
                reject(new Error('IndexedDB不可用'));
                return;
            }
            const request = indexedDB.open('jx_ppt_data', 1);
            request.onupgradeneeded = e => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('store')) {
                    db.createObjectStore('store');
                }
            };
            request.onsuccess = e => resolve(e.target.result);
            request.onerror = () => reject(request.error || new Error('IndexedDB打开失败'));
        });
    }

    async function getActivationDBValue(key) {
        const db = await openActivationDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('store', 'readonly');
            const req = tx.objectStore('store').get(key);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error || new Error('IndexedDB读取失败'));
            tx.oncomplete = () => db.close();
            tx.onerror = () => db.close();
        });
    }

    async function putActivationDBValue(key, value) {
        const db = await openActivationDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('store', 'readwrite');
            tx.objectStore('store').put(value, key);
            tx.oncomplete = () => {
                db.close();
                resolve();
            };
            tx.onerror = () => {
                db.close();
                reject(tx.error || new Error('IndexedDB写入失败'));
            };
        });
    }

    function withTimeout(promise, timeoutMs) {
        return Promise.race([
            promise,
            new Promise((_, reject) => setTimeout(() => reject(new Error('本地记录读取超时')), timeoutMs))
        ]);
    }

    function persistentMaxAge(key) {
        return key === OFFLINE_GRACE_KEY
            ? Math.ceil(GRACE_MS / 1000)
            : 400 * 24 * 60 * 60;
    }

    function persistentDBKey(key) {
        return `paid-${PRODUCT_SCOPE}-${key}`;
    }

    async function readPersistentValue(key) {
        const stored = storageGet(key);
        if (stored !== null) {
            storageSet(key, stored, persistentMaxAge(key));
            putActivationDBValue(persistentDBKey(key), stored).catch(() => {});
            return stored;
        }
        try {
            const backup = await withTimeout(getActivationDBValue(persistentDBKey(key)), 1200);
            if (typeof backup === 'string' && backup) {
                storageSet(key, backup, persistentMaxAge(key));
                return backup;
            }
        } catch (_) {}
        return null;
    }

    async function writePersistentValue(key, value) {
        storageSet(key, value, persistentMaxAge(key));
        try {
            await withTimeout(putActivationDBValue(persistentDBKey(key), value), 1200);
        } catch (_) {}
    }

    function importLegacyWindowName() {
        if (!window.name || !window.name.startsWith(LEGACY_MIGRATION_PREFIX)) return;
        try {
            const payload = JSON.parse(decodeURIComponent(window.name.slice(LEGACY_MIGRATION_PREFIX.length)));
            [ACTIVATION_KEY, OFFLINE_GRACE_KEY, INSTALLATION_KEY, TRIAL_KEY].forEach(key => {
                if (typeof payload[key] === 'string' && payload[key]) {
                    storageSet(key, payload[key], persistentMaxAge(key));
                }
            });
        } catch (_) {}
        window.name = '';
    }

    function updateMachineCode() {
        const codeBox = document.getElementById('machine-code-display');
        if (codeBox) codeBox.textContent = getMachineCode();
    }

    async function installationId() {
        let value = await readPersistentValue(INSTALLATION_KEY);
        if (!value) {
            value = (crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`).replace(/-/g, '');
            await writePersistentValue(INSTALLATION_KEY, value);
        }
        return value;
    }

    function hideOverlay() {
        document.getElementById('activation-overlay')?.classList.add('hidden');
    }

    function showOverlay() {
        document.getElementById('activation-overlay')?.classList.remove('hidden');
    }

    function hideTrialSection(message) {
        const section = document.getElementById('trial-section');
        const footer = document.getElementById('activation-footer-text');
        if (section) section.style.display = 'none';
        if (footer) footer.textContent = message;
    }

    function showTrialSection(message) {
        const section = document.getElementById('trial-section');
        const footer = document.getElementById('activation-footer-text');
        if (section) section.style.display = '';
        if (footer) footer.textContent = message || (section
            ? '👆 新用户点上方免费体验 · 已有激活码则输入激活'
            : '已有管理员授权码，请在上方输入并验证');
    }

    function showError(message) {
        const error = document.getElementById('activation-error');
        if (!error) return;
        error.textContent = `⚠️ ${message}`;
        error.classList.add('visible');
    }

    async function saveGrace(expiry) {
        await writePersistentValue(OFFLINE_GRACE_KEY, JSON.stringify({
            expiry: Math.min(Number(expiry), Date.now() + GRACE_MS)
        }));
    }

    async function hasGrace() {
        try {
            return Date.now() < JSON.parse(await readPersistentValue(OFFLINE_GRACE_KEY) || '{}').expiry;
        } catch (_) {
            return false;
        }
    }

    async function checkServer(code) {
        const machineCode = getMachineCode();
        const controller = typeof AbortController === 'function' ? new AbortController() : null;
        const timeout = controller ? setTimeout(() => controller.abort(), 8000) : null;
        try {
            const response = await fetch(`${LICENSE_API}/check`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code,
                    machineCode,
                    installationId: await installationId(),
                    clientVersion: VERSION
                }),
                signal: controller?.signal
            });
            if (!response.ok) throw new Error('授权服务器暂时不可用');
            return response.json();
        } finally {
            if (timeout) clearTimeout(timeout);
        }
    }

    async function restorePaidLicense(code) {
        if (!code) return { valid: false, message: '' };
        try {
            const result = await checkServer(code);
            if (result.valid) {
                licenseMode = 'paid';
                await writePersistentValue(ACTIVATION_KEY, code);
                await saveGrace(result.expiry);
                hideOverlay();
                return { valid: true, message: '' };
            }
            return { valid: false, message: result.message || '授权已失效，请联系管理员' };
        } catch (_) {
            if (await hasGrace()) {
                hideOverlay();
                return { valid: true, message: '' };
            }
            return { valid: false, message: '网络暂时无法连接授权服务，请检查网络后刷新' };
        }
    }

    async function init() {
        importLegacyWindowName();
        updateMachineCode();
        const code = await readPersistentValue(ACTIVATION_KEY);
        if (code && await hasGrace()) {
            licenseMode = 'paid';
            hideOverlay();
        }
        const paidResult = code ? await restorePaidLicense(code) : { valid: false, message: '' };
        if (paidResult.valid) return;
        if (await restoreTrial()) return;
        showTrialSection();
        showOverlay();
        if (paidResult.message) showError(paidResult.message);
    }

    async function restoreTrial() {
        const trialData = storageGet(TRIAL_KEY);
        if (trialData) {
            try {
                const trial = JSON.parse(trialData);
                if (Date.now() < trial.expiry) {
                    licenseMode = 'trial';
                    hideOverlay();
                    return true;
                }
                hideTrialSection('⏰ 免费体验已到期 · 请联系管理员激活');
            } catch (_) {}
        }
        try {
            const trial = await getActivationDBValue('trial');
            const fingerprintRecord = await getActivationDBValue(getTrialFingerprintKey());
            if (trial && Date.now() < trial.expiry) {
                licenseMode = 'trial';
                storageSet(TRIAL_KEY, JSON.stringify(trial), 7 * 24 * 60 * 60);
                hideOverlay();
                return true;
            }
            if (trial || fingerprintRecord) {
                hideTrialSection('⏰ 此设备已领取过免费体验 · 请联系管理员激活');
                return false;
            }
        } catch (_) {}
        return false;
    }

    window.tryActivate = async function () {
        const input = document.getElementById('activation-input');
        const code = input?.value.trim() || '';
        if (!code) {
            showError('请输入激活码');
            return;
        }
        const button = document.getElementById('activation-btn');
        const oldButtonText = button?.textContent;
        if (button) {
            button.disabled = true;
            button.textContent = '正在验证...';
        }
        try {
            const result = await checkServer(code);
            if (!result.valid) {
                showError(result.message || '激活码无效、过期或不匹配此设备');
                return;
            }
            await writePersistentValue(ACTIVATION_KEY, code);
            licenseMode = 'paid';
            await saveGrace(result.expiry);
            document.getElementById('activation-error')?.classList.remove('visible');
            hideOverlay();
        } catch (_) {
            showError('授权服务器暂时不可用，请稍后重试');
        } finally {
            if (button) {
                button.disabled = false;
                button.textContent = oldButtonText || '激 活';
            }
        }
    };

    window.startFreeTrial = async function () {
        const button = document.getElementById('trial-btn');
        const oldText = button?.textContent;
        if (button) {
            button.disabled = true;
            button.textContent = '正在开通...';
        }
        try {
            const localTrial = storageGet(TRIAL_KEY);
            if (localTrial) {
                hideTrialSection('⏰ 此设备已领取过免费体验 · 请联系管理员激活');
                showError('此设备已领取过免费体验，请联系管理员激活');
                return;
            }
            try {
                const oldTrial = await getActivationDBValue('trial');
                const oldFingerprint = await getActivationDBValue(getTrialFingerprintKey());
                if (oldTrial || oldFingerprint) {
                    hideTrialSection('⏰ 此设备已领取过免费体验 · 请联系管理员激活');
                    showError('此设备已领取过免费体验，请联系管理员激活');
                    return;
                }
            } catch (_) {}
            const start = Date.now();
            const fingerprint = getTrialFingerprint();
            const trial = {
                start,
                expiry: start + GRACE_MS,
                fingerprint
            };
            storageSet(TRIAL_KEY, JSON.stringify(trial), 7 * 24 * 60 * 60);
            licenseMode = 'trial';
            document.getElementById('activation-error')?.classList.remove('visible');
            hideOverlay();
            Promise.all([
                putActivationDBValue('trial', trial),
                putActivationDBValue(getTrialFingerprintKey(), { fingerprint, start })
            ]).catch(error => console.warn('免费体验兼容记录写入失败', error));
        } finally {
            if (button) {
                button.disabled = false;
                button.textContent = oldText || '🎉 免费体验7天';
            }
        }
    };

    window.copyMachineCode = function () {
        const codeBox = document.getElementById('machine-code-display');
        const code = codeBox ? codeBox.textContent : getMachineCode();
        const button = document.querySelector('.machine-code-copy-btn');
        const markCopied = () => {
            if (!button) return;
            button.textContent = '已复制 ✓';
            setTimeout(() => button.textContent = '📋 复制', 1500);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code).then(markCopied).catch(markCopied);
            return;
        }
        const input = document.createElement('input');
        input.value = code;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        markCopied();
    };

    window.generateActivationCode = async function () {
        const machineCode = document.getElementById('admin-machine-input')?.value.trim() || '';
        const password = document.getElementById('admin-password-input')?.value.trim() || '';
        if (!machineCode) {
            alert('请输入机器码');
            return;
        }
        try {
            const response = await fetch(`${LICENSE_API}/admin/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ machineCode, password, days: 365 })
            });
            const result = await response.json();
            if (!response.ok || !result.ok) {
                alert(result.message || '生成失败');
                return;
            }
            document.getElementById('admin-output').value = result.code;
        } catch (_) {
            alert('授权服务器暂时不可用');
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }

    window.__pptLicenseVersion = VERSION;
    window.__pptLicense = {
        isPaid: () => PRODUCT_SCOPE === 'jx' && licenseMode === 'paid',
        getTranslationAuth: async () => {
            if (PRODUCT_SCOPE !== 'jx' || licenseMode !== 'paid') return null;
            return {
                code: await readPersistentValue(ACTIVATION_KEY),
                machineCode: getMachineCode(),
                installationId: await installationId()
            };
        }
    };
})();
