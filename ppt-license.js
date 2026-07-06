(function () {
    'use strict';

    const VERSION = '20260707-authfix';
    const ACTIVATION_KEY = 'jx_ppt_activation';
    const OFFLINE_GRACE_KEY = 'jx_ppt_offline_grace';
    const INSTALLATION_KEY = 'jx_ppt_installation_id';
    const TRIAL_KEY = 'jx_ppt_trial';
    const TRIAL_FINGERPRINT_PREFIX = 'trialFingerprint-';
    const LICENSE_API = 'https://ppt-license.xiaowustudio.cn/api/license';
    const GRACE_MS = 7 * 24 * 60 * 60 * 1000;

    function storageGet(key) {
        try {
            return localStorage.getItem(key);
        } catch (_) {
            const prefix = `${encodeURIComponent(key)}=`;
            const cookies = document.cookie ? document.cookie.split('; ') : [];
            for (const cookie of cookies) {
                if (cookie.indexOf(prefix) === 0) {
                    return decodeURIComponent(cookie.slice(prefix.length));
                }
            }
            return null;
        }
    }

    function storageSet(key, value, maxAgeSeconds) {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (_) {}
        const maxAge = maxAgeSeconds || 400 * 24 * 60 * 60;
        document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
        return false;
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

    function getMachineCode() {
        return simpleHash([
            navigator.userAgent || '',
            navigator.platform || '',
            `${screen.width}x${screen.height}x${screen.colorDepth}`,
            navigator.language || '',
            navigator.hardwareConcurrency || '',
            navigator.deviceMemory || '',
            getCanvasFingerprint()
        ].join('|||'));
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

    function updateMachineCode() {
        const codeBox = document.getElementById('machine-code-display');
        if (codeBox) codeBox.textContent = getMachineCode();
    }

    function installationId() {
        let value = storageGet(INSTALLATION_KEY);
        if (!value) {
            value = (crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`).replace(/-/g, '');
            storageSet(INSTALLATION_KEY, value);
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
        if (footer) footer.textContent = message || '👆 新用户点上方免费体验 · 已有激活码则输入激活';
    }

    function showError(message) {
        const error = document.getElementById('activation-error');
        if (!error) return;
        error.textContent = `⚠️ ${message}`;
        error.classList.add('visible');
    }

    function saveGrace(expiry) {
        storageSet(OFFLINE_GRACE_KEY, JSON.stringify({
            expiry: Math.min(Number(expiry), Date.now() + GRACE_MS)
        }), 7 * 24 * 60 * 60);
    }

    function hasGrace() {
        try {
            return Date.now() < JSON.parse(storageGet(OFFLINE_GRACE_KEY) || '{}').expiry;
        } catch (_) {
            return false;
        }
    }

    async function checkServer(code) {
        const machineCode = getMachineCode();
        const response = await fetch(`${LICENSE_API}/check`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code,
                machineCode,
                installationId: installationId(),
                clientVersion: VERSION
            })
        });
        if (!response.ok) throw new Error('授权服务器暂时不可用');
        return response.json();
    }

    async function restorePaidLicense() {
        const code = storageGet(ACTIVATION_KEY);
        if (!code) return false;
        try {
            const result = await checkServer(code);
            if (result.valid) {
                saveGrace(result.expiry);
                hideOverlay();
                return true;
            }
            return false;
        } catch (_) {
            if (hasGrace()) {
                hideOverlay();
                return true;
            }
            return false;
        }
    }

    async function init() {
        updateMachineCode();
        const code = storageGet(ACTIVATION_KEY);
        if (code && hasGrace()) hideOverlay();
        if (code && await restorePaidLicense()) return;
        if (await restoreTrial()) return;
        showTrialSection();
        showOverlay();
    }

    async function restoreTrial() {
        const trialData = storageGet(TRIAL_KEY);
        if (trialData) {
            try {
                const trial = JSON.parse(trialData);
                if (Date.now() < trial.expiry) {
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
            storageSet(ACTIVATION_KEY, code);
            saveGrace(result.expiry);
            document.getElementById('activation-error')?.classList.remove('visible');
            hideOverlay();
        } catch (_) {
            showError('授权服务器暂时不可用，请稍后重试');
        } finally {
            if (button) {
                button.disabled = false;
                button.textContent = '激 活';
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
})();
