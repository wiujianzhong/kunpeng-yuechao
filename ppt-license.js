(function () {
    'use strict';

    const ACTIVATION_KEY = 'jx_ppt_activation';
    const OFFLINE_GRACE_KEY = 'jx_ppt_offline_grace';
    const INSTALLATION_KEY = 'jx_ppt_installation_id';
    const LICENSE_API = 'https://ppt-license.xiaowustudio.cn/api/license';
    const GRACE_MS = 7 * 24 * 60 * 60 * 1000;

    function storageGet(key) {
        try { return localStorage.getItem(key); } catch (_) { return null; }
    }

    function storageSet(key, value) {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (_) {
            return false;
        }
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

    function showError(message) {
        const error = document.getElementById('activation-error');
        if (!error) return;
        error.textContent = `⚠️ ${message}`;
        error.classList.add('visible');
    }

    function saveGrace(expiry) {
        storageSet(OFFLINE_GRACE_KEY, JSON.stringify({
            expiry: Math.min(Number(expiry), Date.now() + GRACE_MS)
        }));
    }

    function hasGrace() {
        try {
            return Date.now() < JSON.parse(storageGet(OFFLINE_GRACE_KEY) || '{}').expiry;
        } catch (_) {
            return false;
        }
    }

    async function checkServer(code) {
        const response = await fetch(`${LICENSE_API}/check`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, installationId: installationId() })
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
        const code = storageGet(ACTIVATION_KEY);
        if (code && hasGrace()) hideOverlay();
        if (code && await restorePaidLicense()) return;
        if (!code) return;
        showOverlay();
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
                showError('激活码无效或已过期');
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
})();
