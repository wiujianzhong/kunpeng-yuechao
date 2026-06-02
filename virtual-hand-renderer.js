(function() {
    const DEFAULT_CONFIG = {
        showVirtualHand: true,
        virtualHandScale: 1,
        virtualHandOpacity: 0.92,
        virtualHandPosition: { x: 0.5, y: 0.86 },
        mirror: true
    };

    const FINGER_CHAINS = [
        [0, 1, 2, 3, 4],
        [0, 5, 6, 7, 8],
        [0, 9, 10, 11, 12],
        [0, 13, 14, 15, 16],
        [0, 17, 18, 19, 20]
    ];
    const TIP_IDS = [4, 8, 12, 16, 20];
    const PALM_IDS = [0, 5, 9, 13, 17];
    const PALM_RIBS = [
        [0, 5], [0, 9], [0, 13], [0, 17],
        [5, 9], [9, 13], [13, 17],
        [5, 13], [9, 17]
    ];

    const STATE_STYLE = {
        WANDER: { main: '#55f7ff', second: '#8d6cff', hot: '#ffffff', gold: '#ffe57a' },
        ATTACK: { main: '#ffe27a', second: '#6ff8ff', hot: '#fff8cb', gold: '#ffd65a' },
        GIANT: { main: '#78eaff', second: '#9f7aff', hot: '#ffffff', gold: '#d7ecff' },
        SPIRAL: { main: '#b06cff', second: '#54f5ff', hot: '#fff3ff', gold: '#ffcf6b' },
        CORE: { main: '#48f4ff', second: '#4f82ff', hot: '#ffffff', gold: '#91ffff' },
        SHIELD: { main: '#4fffea', second: '#ffe16a', hot: '#ffffff', gold: '#ffe16a' }
    };

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function hexToRgb(hex) {
        const value = hex.replace('#', '');
        return {
            r: parseInt(value.slice(0, 2), 16),
            g: parseInt(value.slice(2, 4), 16),
            b: parseInt(value.slice(4, 6), 16)
        };
    }

    function rgba(hex, alpha) {
        const rgb = hexToRgb(hex);
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
    }

    function mergeConfig(config) {
        const position = Object.assign({}, DEFAULT_CONFIG.virtualHandPosition, (config && config.virtualHandPosition) || {});
        return Object.assign({}, DEFAULT_CONFIG, config || {}, { virtualHandPosition: position });
    }

    class VirtualHandRenderer {
        constructor(config) {
            this.config = mergeConfig(config);
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'virtual-hand-canvas';
            this.canvas.setAttribute('aria-hidden', 'true');
            this.canvas.style.position = 'fixed';
            this.canvas.style.pointerEvents = 'none';
            this.canvas.style.zIndex = '7';
            this.canvas.style.opacity = '0';
            this.canvas.style.transform = 'translate(-50%, -50%)';
            this.canvas.style.transition = 'opacity 0.18s linear';
            this.canvas.style.mixBlendMode = 'screen';
            this.canvas.style.filter = 'drop-shadow(0 0 14px rgba(55, 244, 255, 0.38))';
            document.body.appendChild(this.canvas);

            this.ctx = this.canvas.getContext('2d');
            this.dpr = 1;
            this.cssWidth = 1;
            this.cssHeight = 1;
            this.fade = 0;
            this.targetFade = 0;
            this.lastHand = null;
            this.state = 'WANDER';
            this.openCount = 0;
            this.rotation = 0;
            this.lastTime = performance.now();

            this.resize = this.resize.bind(this);
            this.tick = this.tick.bind(this);
            window.addEventListener('resize', this.resize, { passive: true });
            this.resize();
            requestAnimationFrame(this.tick);
        }

        setConfig(config) {
            this.config = mergeConfig(Object.assign({}, this.config, config || {}));
            this.resize();
        }

        update(payload) {
            if (!this.config.showVirtualHand || !payload || !payload.landmarks || payload.landmarks.length < 21) {
                this.hide();
                return;
            }

            this.state = payload.state || this.state;
            this.openCount = typeof payload.openCount === 'number' ? payload.openCount : this.openCount;
            const nextHand = this.normalizeLandmarks(payload.landmarks);

            if (this.lastHand) {
                this.lastHand = nextHand.map((point, index) => ({
                    x: lerp(this.lastHand[index].x, point.x, 0.42),
                    y: lerp(this.lastHand[index].y, point.y, 0.42),
                    z: lerp(this.lastHand[index].z || 0, point.z || 0, 0.42)
                }));
            } else {
                this.lastHand = nextHand;
            }

            this.targetFade = 1;
        }

        hide() {
            this.targetFade = 0;
        }

        resize() {
            const widthBase = window.innerWidth <= 768
                ? clamp(window.innerWidth * 0.34, 148, 218)
                : clamp(window.innerWidth * 0.22, 230, 360);
            this.cssWidth = widthBase * this.config.virtualHandScale;
            this.cssHeight = this.cssWidth * 1.18;
            this.dpr = clamp(window.devicePixelRatio || 1, 1, 2);
            this.canvas.style.width = `${this.cssWidth}px`;
            this.canvas.style.height = `${this.cssHeight}px`;
            this.canvas.style.left = `${this.config.virtualHandPosition.x * 100}%`;
            this.canvas.style.top = `${this.config.virtualHandPosition.y * 100}%`;
            this.canvas.width = Math.round(this.cssWidth * this.dpr);
            this.canvas.height = Math.round(this.cssHeight * this.dpr);
            this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        }

        normalizeLandmarks(landmarks) {
            const mapped = landmarks.map(point => ({
                x: this.config.mirror ? 1 - point.x : point.x,
                y: point.y,
                z: point.z || 0
            }));

            let minX = Infinity;
            let maxX = -Infinity;
            let minY = Infinity;
            let maxY = -Infinity;
            for (const point of mapped) {
                minX = Math.min(minX, point.x);
                maxX = Math.max(maxX, point.x);
                minY = Math.min(minY, point.y);
                maxY = Math.max(maxY, point.y);
            }

            const boxWidth = Math.max(maxX - minX, 0.001);
            const boxHeight = Math.max(maxY - minY, 0.001);
            const scale = Math.min(this.cssWidth * 0.80 / boxWidth, this.cssHeight * 0.74 / boxHeight);
            const centerX = (minX + maxX) * 0.5;
            const centerY = (minY + maxY) * 0.5;
            const targetCenterX = this.cssWidth * 0.5;
            const targetCenterY = this.cssHeight * 0.43;

            return mapped.map(point => ({
                x: targetCenterX + (point.x - centerX) * scale,
                y: targetCenterY + (point.y - centerY) * scale,
                z: point.z
            }));
        }

        tick(now) {
            const dt = clamp((now - this.lastTime) / 1000, 0, 0.05);
            this.lastTime = now;
            this.rotation += dt * (this.state === 'SPIRAL' ? 0.95 : 0.52);
            this.fade = lerp(this.fade, this.targetFade, 0.13);
            this.canvas.style.opacity = String(this.fade * this.config.virtualHandOpacity);
            this.ctx.clearRect(0, 0, this.cssWidth, this.cssHeight);

            if (this.fade > 0.01 && this.lastHand) {
                this.draw(this.lastHand, now / 1000);
            }

            requestAnimationFrame(this.tick);
        }

        palmCenter(hand) {
            const ids = [0, 5, 9, 13, 17];
            return ids.reduce((acc, id) => {
                acc.x += hand[id].x / ids.length;
                acc.y += hand[id].y / ids.length;
                return acc;
            }, { x: 0, y: 0 });
        }

        baseCenter(hand) {
            const wrist = hand[0];
            const palm = this.palmCenter(hand);
            return {
                x: lerp(wrist.x, palm.x, 0.35),
                y: clamp(Math.max(wrist.y, palm.y) + this.cssHeight * 0.16, this.cssHeight * 0.58, this.cssHeight * 0.87)
            };
        }

        palmRadius() {
            if (this.state === 'CORE') return this.cssWidth * 0.15;
            if (this.state === 'GIANT' || this.state === 'SPIRAL') return this.cssWidth * 0.23;
            if (this.state === 'SHIELD') return this.cssWidth * 0.26;
            return this.cssWidth * 0.20;
        }

        style() {
            return STATE_STYLE[this.state] || STATE_STYLE.WANDER;
        }

        draw(hand, time) {
            const ctx = this.ctx;
            const palm = this.palmCenter(hand);
            const base = this.baseCenter(hand);
            const style = this.style();
            const pulse = 0.5 + Math.sin(time * 3.2) * 0.5;

            ctx.save();
            ctx.globalAlpha = this.fade;
            this.drawAmbientField(ctx, palm, base, style, pulse);
            this.drawBaseArray(ctx, base, style, pulse);
            this.drawPalmRune(ctx, palm, style, pulse);
            this.drawEnergyTendrils(ctx, hand, palm, base, style, time);
            this.drawHandShell(ctx, hand, style, pulse);
            this.drawHandVeins(ctx, hand, palm, style, pulse);
            this.drawJointStars(ctx, hand, style, pulse);
            this.drawSpiritParticles(ctx, palm, base, style, time);
            ctx.restore();
        }

        drawAmbientField(ctx, palm, base, style, pulse) {
            const radius = this.cssWidth * (0.38 + pulse * 0.04);
            const gradient = ctx.createRadialGradient(palm.x, palm.y, 0, palm.x, palm.y, radius);
            gradient.addColorStop(0, rgba(style.hot, 0.14));
            gradient.addColorStop(0.34, rgba(style.main, 0.16));
            gradient.addColorStop(0.68, rgba(style.second, 0.08));
            gradient.addColorStop(1, 'rgba(5, 10, 28, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(palm.x, palm.y, radius, 0, Math.PI * 2);
            ctx.fill();

            const beam = ctx.createLinearGradient(base.x, base.y, palm.x, palm.y - this.cssHeight * 0.25);
            beam.addColorStop(0, rgba(style.main, 0.22));
            beam.addColorStop(0.5, rgba(style.hot, 0.08));
            beam.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = beam;
            ctx.beginPath();
            ctx.moveTo(base.x - this.cssWidth * 0.10, base.y);
            ctx.lineTo(palm.x - this.cssWidth * 0.12, palm.y - this.cssHeight * 0.18);
            ctx.lineTo(palm.x + this.cssWidth * 0.12, palm.y - this.cssHeight * 0.18);
            ctx.lineTo(base.x + this.cssWidth * 0.10, base.y);
            ctx.closePath();
            ctx.fill();
        }

        drawBaseArray(ctx, base, style, pulse) {
            const radius = this.cssWidth * (this.state === 'CORE' ? 0.28 : 0.32 + pulse * 0.02);
            const yScale = 0.35;

            ctx.save();
            ctx.translate(base.x, base.y);
            ctx.rotate(this.rotation * 0.35);
            ctx.scale(1, yScale);
            ctx.lineCap = 'round';
            ctx.shadowColor = rgba(style.main, 0.95);
            ctx.shadowBlur = 16;

            for (let layer = 0; layer < 4; layer++) {
                const r = radius * (1 - layer * 0.18);
                ctx.lineWidth = layer === 0 ? 2.2 : 1.1;
                ctx.strokeStyle = layer % 2 === 0 ? rgba(style.main, 0.58 - layer * 0.08) : rgba(style.gold, 0.42 - layer * 0.06);
                ctx.beginPath();
                ctx.arc(0, 0, r, 0, Math.PI * 2);
                ctx.stroke();
            }

            const tickCount = this.state === 'SHIELD' ? 54 : 40;
            for (let i = 0; i < tickCount; i++) {
                const angle = (i / tickCount) * Math.PI * 2;
                const longTick = i % 5 === 0;
                const inner = radius * (longTick ? 0.72 : 0.84);
                const outer = radius * (longTick ? 1.08 : 0.99);
                ctx.lineWidth = longTick ? 1.4 : 0.8;
                ctx.strokeStyle = i % 7 === 0 ? rgba(style.hot, 0.62) : rgba(style.main, 0.44);
                ctx.beginPath();
                ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
                ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
                ctx.stroke();
            }

            if (this.state === 'SHIELD') {
                this.drawMiniSwordArray(ctx, radius * 0.86, 12, style);
            } else if (this.state === 'GIANT' || this.state === 'SPIRAL') {
                this.drawMiniSwordArray(ctx, radius * 0.72, this.state === 'SPIRAL' ? 9 : 6, style);
            } else {
                this.drawBaguaBars(ctx, radius * 0.76, style);
            }

            ctx.restore();

            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.fillStyle = rgba(style.hot, this.state === 'CORE' ? 0.70 : 0.52);
            ctx.shadowColor = rgba(style.hot, 1);
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.ellipse(base.x, base.y, radius * 0.10, radius * yScale * 0.24, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        drawPalmRune(ctx, palm, style, pulse) {
            const baseRadius = this.palmRadius();
            const radius = baseRadius * (this.state === 'CORE' ? 0.78 + pulse * 0.05 : 1 + pulse * 0.04);
            const bright = this.state === 'CORE' ? 1.35 : 1;

            ctx.save();
            ctx.translate(palm.x, palm.y);
            ctx.rotate(-this.rotation * 0.86);
            ctx.lineCap = 'round';
            ctx.shadowColor = rgba(style.main, 0.95);
            ctx.shadowBlur = 13;
            ctx.lineWidth = 1.4;
            ctx.strokeStyle = rgba(style.main, 0.48 * bright);
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.strokeStyle = rgba(style.second, 0.34 * bright);
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.62, 0, Math.PI * 2);
            ctx.stroke();

            const count = this.state === 'SHIELD' ? 12 : (this.state === 'SPIRAL' ? 9 : 8);
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                const inner = radius * 0.66;
                const outer = radius * 1.08;
                ctx.strokeStyle = i % 3 === 0 ? rgba(style.hot, 0.56) : rgba(style.main, 0.36);
                ctx.beginPath();
                ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
                ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
                ctx.stroke();
            }

            if (this.state === 'GIANT' || this.state === 'SPIRAL' || this.state === 'SHIELD') {
                this.drawMiniSwordArray(ctx, radius * 0.92, this.state === 'SHIELD' ? 10 : 7, style);
            } else {
                this.drawBaguaBars(ctx, radius * 0.88, style);
            }
            ctx.restore();
        }

        drawBaguaBars(ctx, radius, style) {
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = rgba(style.main, 0.45);
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle + Math.PI / 2);
                ctx.beginPath();
                ctx.moveTo(-6, -4);
                ctx.lineTo(6, -4);
                ctx.moveTo(-6, 4);
                ctx.lineTo(6, 4);
                if (i % 2 === 0) {
                    ctx.moveTo(-6, 0);
                    ctx.lineTo(6, 0);
                }
                ctx.stroke();
                ctx.restore();
            }
        }

        drawMiniSwordArray(ctx, radius, count, style) {
            ctx.strokeStyle = rgba(style.gold, 0.62);
            ctx.fillStyle = rgba(style.hot, 0.42);
            ctx.lineWidth = 1.2;
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                ctx.save();
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.moveTo(0, -radius * 1.20);
                ctx.lineTo(4, -radius * 0.98);
                ctx.lineTo(0, -radius * 0.76);
                ctx.lineTo(-4, -radius * 0.98);
                ctx.closePath();
                ctx.stroke();
                if (i % 3 === 0) ctx.fill();
                ctx.restore();
            }
        }

        drawEnergyTendrils(ctx, hand, palm, base, style, time) {
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.lineCap = 'round';
            ctx.shadowColor = rgba(style.main, 0.9);
            ctx.shadowBlur = 8;

            for (const id of TIP_IDS) {
                const tip = hand[id];
                const drift = Math.sin(time * 2.2 + id) * this.cssWidth * 0.018;
                const controlX = lerp(palm.x, tip.x, 0.55) + drift;
                const controlY = lerp(palm.y, tip.y, 0.55) - this.cssHeight * 0.05;
                ctx.lineWidth = id === 8 || id === 12 ? 1.7 : 1.1;
                ctx.strokeStyle = id === 8 ? rgba(style.gold, 0.42) : rgba(style.main, 0.34);
                ctx.beginPath();
                ctx.moveTo(base.x, base.y);
                ctx.quadraticCurveTo(controlX, controlY, tip.x, tip.y);
                ctx.stroke();
            }

            for (let i = 0; i < 7; i++) {
                const angle = this.rotation * 1.5 + i * 0.92;
                const startR = this.cssWidth * (0.08 + i * 0.015);
                const endR = this.cssWidth * (0.24 + (i % 3) * 0.025);
                ctx.lineWidth = 0.8;
                ctx.strokeStyle = rgba(i % 2 ? style.second : style.main, 0.22);
                ctx.beginPath();
                ctx.moveTo(palm.x + Math.cos(angle) * startR, palm.y + Math.sin(angle) * startR);
                ctx.quadraticCurveTo(
                    palm.x + Math.cos(angle + 0.9) * endR,
                    palm.y + Math.sin(angle + 0.7) * endR,
                    palm.x + Math.cos(angle + 1.3) * endR,
                    palm.y + Math.sin(angle + 1.2) * endR
                );
                ctx.stroke();
            }
            ctx.restore();
        }

        drawHandShell(ctx, hand, style, pulse) {
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            for (const chain of FINGER_CHAINS) {
                this.strokeChain(ctx, hand, chain, rgba(style.second, 0.14), 10, rgba(style.second, 0.78), 18);
                this.strokeChain(ctx, hand, chain, rgba(style.main, 0.28), 5, rgba(style.main, 0.92), 12);
                this.strokeChain(ctx, hand, chain, rgba(style.hot, 0.84), 1.35 + pulse * 0.3, rgba(style.hot, 0.95), 5);
            }

            ctx.strokeStyle = rgba(style.hot, 0.38);
            ctx.lineWidth = 1.1;
            ctx.shadowColor = rgba(style.hot, 1);
            ctx.shadowBlur = 8;
            for (const [a, b] of PALM_RIBS) {
                ctx.beginPath();
                ctx.moveTo(hand[a].x, hand[a].y);
                ctx.lineTo(hand[b].x, hand[b].y);
                ctx.stroke();
            }

            ctx.fillStyle = rgba(style.main, 0.08);
            ctx.strokeStyle = rgba(style.hot, 0.30);
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            PALM_IDS.forEach((id, index) => {
                const point = hand[id];
                if (index === 0) ctx.moveTo(point.x, point.y);
                else ctx.lineTo(point.x, point.y);
            });
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }

        strokeChain(ctx, hand, chain, color, width, shadow, blur) {
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.shadowColor = shadow;
            ctx.shadowBlur = blur;
            ctx.beginPath();
            chain.forEach((id, index) => {
                const point = hand[id];
                if (index === 0) ctx.moveTo(point.x, point.y);
                else ctx.lineTo(point.x, point.y);
            });
            ctx.stroke();
        }

        drawHandVeins(ctx, hand, palm, style, pulse) {
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.lineCap = 'round';
            ctx.shadowColor = rgba(style.main, 0.9);
            ctx.shadowBlur = 9 + pulse * 4;

            for (const id of TIP_IDS) {
                const tip = hand[id];
                ctx.lineWidth = id === 8 || id === 12 ? 1.6 : 1.0;
                ctx.strokeStyle = id === 8 || id === 12 ? rgba(style.gold, 0.70) : rgba(style.main, 0.54);
                ctx.beginPath();
                ctx.moveTo(palm.x, palm.y);
                ctx.lineTo(tip.x, tip.y);
                ctx.stroke();
            }

            ctx.strokeStyle = rgba(style.second, 0.38);
            ctx.lineWidth = 0.9;
            for (const [a, b] of PALM_RIBS) {
                ctx.beginPath();
                ctx.moveTo(hand[a].x, hand[a].y);
                ctx.lineTo(hand[b].x, hand[b].y);
                ctx.stroke();
            }
            ctx.restore();
        }

        drawJointStars(ctx, hand, style, pulse) {
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            for (let i = 0; i < hand.length; i++) {
                const point = hand[i];
                const isTip = TIP_IDS.includes(i);
                const radius = isTip ? 4.4 + pulse * 1.2 : 2.2 + pulse * 0.45;
                const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius * 3.2);
                gradient.addColorStop(0, rgba(isTip ? style.hot : style.main, 0.95));
                gradient.addColorStop(0.35, rgba(isTip ? style.gold : style.main, 0.40));
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(point.x, point.y, radius * 3.2, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = rgba(isTip ? style.hot : style.main, 0.92);
                ctx.beginPath();
                ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }

        drawSpiritParticles(ctx, palm, base, style, time) {
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.shadowColor = rgba(style.main, 0.85);
            ctx.shadowBlur = 9;

            const count = 24;
            for (let i = 0; i < count; i++) {
                const phase = time * (0.55 + i * 0.01) + i * 1.618;
                const radius = this.cssWidth * (0.10 + (i % 7) * 0.022);
                const rise = ((phase * 0.18 + i * 0.07) % 1) * this.cssHeight * 0.46;
                const x = lerp(base.x, palm.x, 0.35) + Math.cos(phase) * radius;
                const y = base.y - rise + Math.sin(phase * 0.8) * this.cssHeight * 0.018;
                const size = 1.0 + Math.sin(phase * 1.7) * 0.55;
                ctx.fillStyle = i % 5 === 0 ? rgba(style.gold, 0.48) : rgba(style.main, 0.44);
                ctx.beginPath();
                ctx.arc(x, y, Math.max(0.5, size), 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    window.VirtualHandRenderer = VirtualHandRenderer;
    window.VIRTUAL_HAND_DEFAULT_CONFIG = DEFAULT_CONFIG;
})();
