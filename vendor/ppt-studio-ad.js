(() => {
    const slides = [
        ['01-shift-reports.webp', '三个班的数，又要抄一遍？按你的表做个工具，班报一键汇成周报。'],
        ['02-spare-part.webp', '同款配件，还得重新量？实物建成三维模型，下次补件有图可用。'],
        ['03-team-training.webp', '每来一批新人，都要再教一遍？把现场示范剪成短片，新人随时能看。']
    ];
    const home = 'https://xiaowustudio.cn/';
    const requiredViewMs = 5000;
    const progress = document.getElementById('media-progress');
    const panel = document.getElementById('media-progress-text')?.parentElement;
    if (!progress || !panel) return;

    const style = document.createElement('style');
    style.textContent = `
        #media-progress .studio-ad-panel { box-sizing:border-box; width:min(100%,540px,calc(150vh - 240px)); padding:0 0 12px !important; overflow:hidden; box-shadow:0 6px 36px #172a2426; }
        .studio-ad-panel #media-progress-text { margin:5px 8px 0; font-size:14px; }
        .studio-ad-panel #media-progress-text + p { margin-top:1px !important; font-size:12px !important; }
        #ppt-studio-ad { color:#20372c; font:14px/1.4 system-ui,"PingFang SC","Microsoft YaHei",sans-serif; }
        #ppt-studio-ad[hidden] { display:none !important; }
        #ppt-studio-ad header { display:flex; align-items:center; justify-content:space-between; gap:8px; padding:0 6px 0 15px; }
        #ppt-studio-ad header a { color:#28563b; text-decoration:underline; text-underline-offset:3px; }
        #ppt-studio-ad-close { min-height:40px; padding:0 10px; font:inherit; cursor:pointer; }
        #ppt-studio-ad-close:disabled { color:#64748b; cursor:default; }
        #ppt-studio-ad-link { display:block; overflow:hidden; touch-action:pan-y pinch-zoom; }
        #ppt-studio-ad .studio-ad-track { display:flex; transition:transform .3s ease-out; }
        #ppt-studio-ad .studio-ad-slide { flex:0 0 100%; width:100%; min-width:0; position:relative; color:#244a36; background:#f4f3e9; text-align:left; }
        #ppt-studio-ad .studio-ad-slide::before { content:''; display:block; padding-top:66.667%; }
        #ppt-studio-ad .studio-ad-copy { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; gap:.6em; padding:7%; font-size:clamp(13px,2vw,18px); }
        #ppt-studio-ad .studio-ad-copy strong { font-size:1.4em; line-height:1.25; }
        #ppt-studio-ad img { position:absolute; inset:0; width:100%; height:100%; object-fit:contain; visibility:hidden; }
        #ppt-studio-ad img.ready { visibility:visible; }
        #ppt-studio-ad nav { display:flex; align-items:center; justify-content:center; }
        #ppt-studio-ad .studio-ad-dot { width:32px; height:28px; border:0; background:transparent; cursor:pointer; display:grid; place-items:center; }
        #ppt-studio-ad .studio-ad-dot::after { content:''; width:8px; height:8px; border-radius:5px; background:#a6b3a9; }
        #ppt-studio-ad .studio-ad-dot[aria-current=true]::after { width:17px; background:#305c42; }
        #ppt-studio-ad :focus-visible { outline:2px solid #386f4c; outline-offset:-2px; }
        @media (prefers-reduced-motion:reduce) { #ppt-studio-ad .studio-ad-track { transition:none; } }
        @media (max-height:350px) { #media-progress .studio-ad-panel { min-width:185px; max-height:100%; overflow:auto; } }
    `;
    document.head.appendChild(style);

    const ad = document.createElement('section');
    ad.id = 'ppt-studio-ad';
    ad.tabIndex = -1;
    ad.hidden = true;
    ad.setAttribute('aria-label', '小伍工作室案例');
    ad.setAttribute('aria-live', 'off');
    ad.innerHTML = `
        <header><a href="${home}" target="_blank" rel="noopener noreferrer">小伍工作室主页 ↗</a>
            <button type="button" id="ppt-studio-ad-close" aria-label="关闭广告">关闭 ×</button></header>
        <a href="${home}" id="ppt-studio-ad-link" target="_blank" rel="noopener noreferrer" draggable="false">
            <span class="studio-ad-track"></span></a>
        <nav aria-label="选择案例图片"></nav>`;
    panel.insertBefore(ad, panel.firstChild);
    const link = ad.querySelector('#ppt-studio-ad-link');
    const track = ad.querySelector('.studio-ad-track');
    const nav = ad.querySelector('nav');
    const close = ad.querySelector('#ppt-studio-ad-close');
    const motion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
    let active = false;
    let shown = 0;
    let timer;
    let touchStart = null;
    let swiped = false;
    let viewRemaining = 0;
    let displayedSeconds = -1;
    let lastPaint = null;
    let viewFrame;
    let finishWait;
    let viewWait = Promise.resolve();
    const images = [];

    slides.forEach(([, description], index) => {
        const slide = document.createElement('span');
        slide.className = 'studio-ad-slide';
        const copy = document.createElement('span');
        copy.className = 'studio-ad-copy';
        const [headline, detail] = description.split('？');
        const title = document.createElement('strong');
        title.textContent = headline + '？';
        copy.append(title, detail);
        const image = document.createElement('img');
        image.alt = '';
        image.draggable = false;
        image.onload = () => image.classList.add('ready');
        image.onerror = () => {
            image.classList.remove('ready');
            image.removeAttribute('src');
        };
        images.push(image);
        slide.append(copy, image);
        track.appendChild(slide);
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'studio-ad-dot';
        dot.setAttribute('aria-label', `第${index + 1}张：${description.split('？')[0]}？`);
        dot.addEventListener('click', () => selectSlide(index));
        nav.appendChild(dot);
    });

    function schedule() {
        clearTimeout(timer);
        if (active && !ad.hidden && !document.hidden && !motion.matches) {
            timer = setTimeout(() => selectSlide((shown + 1) % slides.length), 5000);
        }
    }

    function selectSlide(index) {
        shown = index;
        track.style.transform = `translateX(-${index * 100}%)`;
        link.setAttribute('aria-label', slides[index][1] + ' 打开小伍工作室主页');
        Array.from(nav.children).forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
        const photo = images[index];
        if (!photo.hasAttribute('src')) photo.src = './vendor/studio-ads/' + slides[index][0];
        schedule();
    }

    function prepare() {
        const first = images[0];
        if (!first.hasAttribute('src')) first.src = './vendor/studio-ads/' + slides[0][0];
    }

    function renderCountdown() {
        const seconds = Math.ceil(viewRemaining / 1000);
        if (seconds === displayedSeconds) return;
        displayedSeconds = seconds;
        close.textContent = seconds ? `${seconds} 秒后可关闭` : '关闭 ×';
        close.disabled = seconds > 0;
        close.setAttribute('aria-label', seconds ? close.textContent : '关闭广告');
    }

    function completeWait() {
        if (finishWait) finishWait();
        finishWait = null;
    }

    function countView(time) {
        if (!active || !finishWait || document.hidden) return;
        const painted = ad.checkVisibility ? ad.checkVisibility({ visibilityProperty:true, opacityProperty:true })
            : ad.getClientRects().length && getComputedStyle(ad).visibility === 'visible';
        if (painted) {
            if (lastPaint !== null) viewRemaining = Math.max(0, viewRemaining - (time - lastPaint));
            lastPaint = time;
        } else {
            lastPaint = null;
        }
        renderCountdown();
        if (viewRemaining === 0) completeWait();
        else viewFrame = requestAnimationFrame(countView);
    }

    function resumeView() {
        cancelAnimationFrame(viewFrame);
        lastPaint = null;
        // 第二个动画帧才开始计时，让首张图或本地文字至少先绘制一次。
        if (active && finishWait && !document.hidden) {
            viewFrame = requestAnimationFrame(() => { viewFrame = requestAnimationFrame(countView); });
        }
    }

    function show() {
        if (active) return;
        active = true;
        viewRemaining = requiredViewMs;
        viewWait = new Promise(resolve => { finishWait = resolve; });
        try {
            ad.hidden = false;
            panel.classList.add('studio-ad-panel');
            if (!document.hidden) ad.focus();
            renderCountdown();
            selectSlide(0);
            resumeView();
        } catch (error) {
            hide();
            console.warn('工作室轮播暂时无法显示', error);
        }
    }

    function hide() {
        if (!active) return;
        active = false;
        clearTimeout(timer);
        cancelAnimationFrame(viewFrame);
        completeWait();
        ad.hidden = true;
        panel.classList.remove('studio-ad-panel');
        touchStart = null;
        swiped = false;
    }

    function skip() {
        if (!finishWait) hide();
    }
    close.addEventListener('click', skip);
    progress.addEventListener('click', event => { if (event.target === progress) skip(); });
    document.addEventListener('keydown', event => {
        if (active && event.key === 'Escape') { event.preventDefault(); skip(); }
    });
    document.addEventListener('visibilitychange', () => { resumeView(); schedule(); });
    if (motion.addEventListener) motion.addEventListener('change', schedule);
    link.addEventListener('pointerdown', event => {
        touchStart = [event.clientX, event.clientY];
        swiped = false;
    });
    link.addEventListener('pointercancel', () => { touchStart = null; });
    link.addEventListener('pointerup', event => {
        if (!touchStart) return;
        const dx = event.clientX - touchStart[0], dy = event.clientY - touchStart[1];
        touchStart = null;
        if (Math.abs(dx) < 36 || Math.abs(dx) < Math.abs(dy)) return;
        swiped = true;
        selectSlide((shown + (dx < 0 ? 1 : -1) + slides.length) % slides.length);
    });
    link.addEventListener('click', event => {
        if (swiped && event.detail) { event.preventDefault(); swiped = false; }
    });
    window.pptStudioAd = { prepare, show, hide, waitUntilSkippable: () => viewWait };
})();
