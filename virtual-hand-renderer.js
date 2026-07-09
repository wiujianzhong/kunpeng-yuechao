(function() {
    class DisabledVirtualHandRenderer {
        update() {
            this.hide();
        }

        hide() {
            const canvas = document.getElementById('virtual-hand-canvas');
            if (canvas) canvas.remove();
        }
    }

    window.VirtualHandRenderer = DisabledVirtualHandRenderer;
    window.VIRTUAL_HAND_DEFAULT_CONFIG = { showVirtualHand: false };
})();
