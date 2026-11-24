(() => {
    const slides = [
        ['01-shift-reports.webp', '三个班的数，又要抄一遍？按你的表做个工具，班报一键汇成周报。'],
        ['02-spare-part.webp', '同款配件，还得重新量？实物建成三维模型，下次补件有图可用。'],
        ['03-team-training.webp', '每来一批新人，都要再教一遍？把现场示范剪成短片，新人随时能看。']
    ];
    const home = 'https://xiaowustudio.cn/';
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
        #ppt-studio-ad-link { display:block; overflow:hidden; touch-action:pan-y pinch-zoom; }
        #ppt-studio-ad .studio-ad-track { display:flex; transition:transform .3s ease-out; }
        #ppt-studio-ad img { flex:0 0 100%; width:100%; min-width:0; aspect-ratio:3/2; object-fit:contain; display:block; }
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
    let requested = 0;
    let shown = 0;
    let timer;
    let touchStart = null;
    let swiped = false;

    slides.forEach(([, description], index) => {
        const image = document.createElement('img');
        image.alt = description;
        image.draggable = false;
        image.onload = () => { if (active && requested === index) displaySlide(index); };
        image.onerror = () => {
            image.removeAttribute('src');
            if (active && requested === index) hide();
        };
        track.appendChild(image);
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

    function displaySlide(index) {
        const opening = ad.hidden;
        shown = index;
        track.style.transform = `translateX(-${index * 100}%)`;
        link.setAttribute('aria-label', slides[index][1] + ' 打开小伍工作室主页');
        Array.from(nav.children).forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
        ad.hidden = false;
        panel.classList.add('studio-ad-panel');
        if (opening && !document.hidden) close.focus();
        schedule();
    }

    function selectSlide(index) {
        clearTimeout(timer);
        requested = index;
        const photo = track.children[index];
        if (photo.complete && photo.naturalWidth) displaySlide(index);
        else if (!photo.hasAttribute('src')) photo.src = './vendor/studio-ads/' + slides[index][0];
    }

    function prepare() {
        const first = track.children[0];
        if (!first.hasAttribute('src')) first.src = './vendor/studio-ads/' + slides[0][0];
    }

    function show() {
        if (active) return;
        active = true;
        try {
            selectSlide(0);
        } catch (error) {
            hide();
            console.warn('工作室轮播暂时无法显示', error);
        }
    }

    function hide() {
        if (!active) return;
        active = false;
        clearTimeout(timer);
        ad.hidden = true;
        panel.classList.remove('studio-ad-panel');
        touchStart = null;
        swiped = false;
    }

    close.addEventListener('click', hide);
    progress.addEventListener('click', event => { if (event.target === progress) hide(); });
    document.addEventListener('keydown', event => {
        if (active && event.key === 'Escape') { event.preventDefault(); hide(); }
    });
    document.addEventListener('visibilitychange', schedule);
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
    window.pptStudioAd = { prepare, show, hide };
})();
