// 封面直接用于 PPT 的视频对象，播放标记绘在图内，整个对象仍可点击。
window.makePPTVideoPoster = function (source, frameRatio) {
    if (!(source instanceof Blob) && !(typeof source === 'string' && /^data:video\//i.test(source))) {
        return Promise.resolve(undefined);
    }
    return new Promise(resolve => {
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        let objectUrl;
        let targets;
        let index = 0;
        let finished = false;
        const timer = setTimeout(() => finish(), 3200);

        function finish(png) {
            if (finished) return;
            finished = true;
            clearTimeout(timer);
            video.onloadedmetadata = video.onloadeddata = video.oncanplay = video.onseeked = video.onerror = null;
            video.pause();
            video.removeAttribute('src');
            video.load();
            if (objectUrl) URL.revokeObjectURL(objectUrl);
            canvas.width = canvas.height = 1;
            resolve(png);
        }

        function capture() {
            if (finished || !targets || video.seeking || video.readyState < 2 || !video.videoWidth || !video.videoHeight) return;
            try {
                const ctx = canvas.getContext('2d');
                if (index + 1 < targets.length) {
                    // 仅检查一张小图。视频以黑场开始时，再向后取一至两帧。
                    canvas.width = canvas.height = 16;
                    ctx.drawImage(video, 0, 0, 16, 16);
                    const pixels = ctx.getImageData(0, 0, 16, 16).data;
                    let lit = 0;
                    for (let i = 0; i < pixels.length; i += 4) {
                        if (Math.max(pixels[i], pixels[i + 1], pixels[i + 2]) > 30) lit++;
                    }
                    if (lit < 8) {
                        video.currentTime = targets[++index];
                        return;
                    }
                }

                const ratio = Number.isFinite(frameRatio) && frameRatio > 0 ? frameRatio : video.videoWidth / video.videoHeight;
                canvas.width = Math.max(1, Math.round(480 * Math.min(1, ratio)));
                canvas.height = Math.max(1, Math.round(480 * Math.min(1, 1 / ratio)));
                const w = canvas.width, h = canvas.height;
                const scale = Math.min(w / video.videoWidth, h / video.videoHeight);
                const dw = video.videoWidth * scale, dh = video.videoHeight * scale;
                ctx.fillStyle = '#19212b';
                ctx.fillRect(0, 0, w, h);
                ctx.drawImage(video, (w - dw) / 2, (h - dh) / 2, dw, dh);
                const x = w / 2, y = h / 2, r = Math.min(w, h) * 0.115;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, 2 * Math.PI);
                ctx.fillStyle = 'rgba(0,0,0,.60)';
                ctx.fill();
                ctx.strokeStyle = 'rgba(255,255,255,.85)';
                ctx.lineWidth = Math.max(1, r * 0.055);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x - r * 0.28, y - r * 0.46);
                ctx.lineTo(x + r * 0.48, y);
                ctx.lineTo(x - r * 0.28, y + r * 0.46);
                ctx.closePath();
                ctx.fillStyle = '#fff';
                ctx.fill();
                finish(canvas.toDataURL('image/png'));
            } catch (_) {
                finish();
            }
        }

        video.onerror = () => finish();
        video.onloadeddata = video.oncanplay = video.onseeked = capture;
        video.onloadedmetadata = () => {
            try {
                const d = video.duration;
                targets = Number.isFinite(d) && d > 0
                    ? [Math.min(0.12, d * 0.1), Math.min(0.75, d * 0.45), Math.min(1.8, d * 0.8)]
                    : [0];
                if (targets[0] > 0) video.currentTime = targets[0];
                else capture();
            } catch (_) {
                finish();
            }
        };
        try {
            video.muted = true;
            video.playsInline = true;
            video.preload = 'auto';
            video.src = source instanceof Blob ? (objectUrl = URL.createObjectURL(source)) : source;
            video.load();
        } catch (_) {
            finish();
        }
    });
};
