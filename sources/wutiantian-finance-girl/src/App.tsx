import { lazy, Suspense, useEffect, useState } from 'react'
import { PhotoFrame } from './components/PhotoFrame'
import { financeStates, formulas, photos, profile } from './content'

const FinanceWorld3D = lazy(() =>
  import('./components/FinanceWorld3D').then((module) => ({ default: module.FinanceWorld3D })),
)

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2c.4 6.2 3.8 9.6 10 10-6.2.4-9.6 3.8-10 10-.4-6.2-3.8-9.6-10-10 6.2-.4 9.6-3.8 10-10Z" />
    </svg>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [monthEnd, setMonthEnd] = useState(false)
  const [closing, setClosing] = useState(false)
  const [progress, setProgress] = useState(24)
  const [challengeState, setChallengeState] = useState<'idle' | 'rejected' | 'balanced'>('idle')

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1050)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('month-end-active', monthEnd)
    return () => document.body.classList.remove('month-end-active')
  }, [monthEnd])

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.micro-tilt')
    const cleanups: Array<() => void> = []

    cards.forEach((card) => {
      const move = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        card.style.setProperty('--tilt-x', `${y * -2.2}deg`)
        card.style.setProperty('--tilt-y', `${x * 2.2}deg`)
      }
      const leave = () => {
        card.style.setProperty('--tilt-x', '0deg')
        card.style.setProperty('--tilt-y', '0deg')
      }
      card.addEventListener('pointermove', move)
      card.addEventListener('pointerleave', leave)
      cleanups.push(() => {
        card.removeEventListener('pointermove', move)
        card.removeEventListener('pointerleave', leave)
      })
    })

    return () => cleanups.forEach((cleanup) => cleanup())
  }, [])

  const toggleMonthEnd = () => {
    if (monthEnd) {
      setMonthEnd(false)
      setClosing(false)
      setProgress(24)
      return
    }

    setMonthEnd(true)
    setClosing(true)
    setProgress(12)
    const interval = window.setInterval(() => {
      setProgress((value) => Math.min(99, value + Math.max(2, Math.round((99 - value) * 0.18))))
    }, 110)
    window.setTimeout(() => {
      window.clearInterval(interval)
      setProgress(99)
      setClosing(false)
    }, 2700)
  }

  const rejectOneCent = () => {
    setChallengeState('rejected')
    window.setTimeout(() => setChallengeState('idle'), 3200)
  }

  const balanceTheBook = () => {
    setChallengeState('balanced')
    window.setTimeout(() => setChallengeState('idle'), 3200)
  }

  return (
    <>
      <div className={`page-loader ${isLoading ? '' : 'is-gone'}`} aria-hidden={!isLoading}>
        <div className="loader-equation">
          <span>资产</span>
          <i>=</i>
          <span>负债</span>
          <i>+</i>
          <span>权益</span>
        </div>
        <div className="loader-line"><span /></div>
        <small>正在核对数字世界</small>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="返回首页">
          <span>WT.</span>
          <small>FINANCE<br />GIRL</small>
        </a>
        <nav aria-label="主导航">
          <a href="#about">关于她</a>
          <a href="#finance-mode">财务模式</a>
          <a href="#gallery">照片</a>
        </nav>
        <span className="header-balance"><i /> BALANCE: OK</span>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-grid" aria-hidden="true" />
          <div className="floating-numbers" aria-hidden="true">
            <span style={{ '--x': '8%', '--y': '20%', '--delay': '-2s' } as React.CSSProperties}>¥ 520.00</span>
            <span style={{ '--x': '86%', '--y': '16%', '--delay': '-5s' } as React.CSSProperties}>SUM()</span>
            <span style={{ '--x': '78%', '--y': '78%', '--delay': '-1s' } as React.CSSProperties}>100%</span>
            <span style={{ '--x': '13%', '--y': '83%', '--delay': '-7s' } as React.CSSProperties}>#REF!</span>
            <span style={{ '--x': '47%', '--y': '12%', '--delay': '-3s' } as React.CSSProperties}>¥ 1314.00</span>
          </div>

          <div className="hero-copy">
            <div className="eyebrow load-item"><span /> 一个财务女孩的数字世界</div>
            <h1 className="hero-title load-item">
              <span>{profile.name}</span>
              <em>把世界，</em>
              <em>对到刚刚好。</em>
            </h1>
            <p className="hero-intro load-item">
              管钱的人，不一定有钱。<br />
              但账，一定得对。
            </p>
            <div className="hero-meta load-item">
              <span>{profile.role}</span>
              <span>{profile.direction}</span>
              <span>{profile.company}</span>
            </div>
            <div className="hero-actions load-item">
              <button className="primary-action" type="button" onClick={toggleMonthEnd}>
                <span>{monthEnd ? '退出月底模式' : '进入月底模式'}</span>
                <SparkIcon />
              </button>
              <a className="text-link" href="#about">认识她 <ArrowIcon /></a>
            </div>
          </div>

          <div className="hero-visual load-item">
            <div className="visual-caption">
              <span>LIVE / LEDGER OBJECT</span>
              <span>拖动目光，数字会回应</span>
            </div>
            <Suspense fallback={<div className="finance-world-fallback"><span>0.01</span></div>}>
              <FinanceWorld3D monthEnd={monthEnd} />
            </Suspense>
            <div className={`difference-chip ${monthEnd ? 'is-urgent' : ''}`}>
              <span>账面差额</span>
              <strong>¥ 0.01</strong>
              <small>UNBALANCED</small>
            </div>
            <PhotoFrame src={photos.hero} label="PHOTO 00" caption="首页人物主照片" className="hero-photo" />
            <div className="visual-ticker" aria-hidden="true">
              <span>借 DEBIT</span><i /><span>贷 CREDIT</span><i /><span>平 BALANCED</span>
            </div>
          </div>

          <a className="scroll-cue" href="#about" aria-label="向下浏览">
            <span>SCROLL TO RECONCILE</span>
            <i />
          </a>
        </section>

        <section className="about section-shell" id="about">
          <div className="section-kicker" data-reveal>
            <span>ABOUT / 关于她</span>
            <span>资料不够，就不替她编。</span>
          </div>
          <div className="about-head" data-reveal>
            <h2>认真不是无趣，<br />只是数字值得被认真对待。</h2>
            <p>她是吴甜甜，一名与企业财务和财务管理打交道的财务主管。更多故事，正在补账；履历数据，等待本人授权导入。</p>
          </div>

          <div className="about-layout">
            <PhotoFrame src={photos.work} label="PHOTO 01" caption="工作中的她" className="about-work-photo" />
            <div className="profile-ledger micro-tilt" data-reveal>
              <div className="ledger-head"><span>PERSONAL LEDGER</span><span>已核 / 04 项</span></div>
              <dl>
                <div><dt>姓名</dt><dd>{profile.name}</dd></div>
                <div><dt>职位</dt><dd>{profile.role}</dd></div>
                <div><dt>公司</dt><dd>{profile.company}</dd></div>
                <div><dt>方向</dt><dd>{profile.direction}</dd></div>
              </dl>
              <p className="ledger-note"><span>备注</span>其余人生数据，保持空白比擅自填数更专业。</p>
            </div>
            <blockquote data-reveal>
              <span>“</span>
              别人看到的是数字，<br />她看到的是——<br />这个数为什么对不上？
            </blockquote>
          </div>
        </section>

        <section className={`finance-mode ${monthEnd ? 'is-month-end' : ''}`} id="finance-mode">
          <div className="month-end-floaters" aria-hidden="true">
            <span>#REF!</span><span>☕</span><span>SUM()</span><span>Ctrl + S</span><span>☕</span><span>¥0.01</span>
          </div>
          <div className="section-shell finance-inner">
            <div className="section-kicker light" data-reveal>
              <span>FINANCE MODE / 财务脑回路</span>
              <span>{monthEnd ? '系统已进入月底，请勿催下班。' : '普通日期，暂时还能聊天。'}</span>
            </div>

            <div className="finance-heading" data-reveal>
              <div>
                <span className="status-dot" /> MONTH-END SIMULATOR
                <h2>月底，是财务人的<br />隐藏 Boss 关。</h2>
              </div>
              <div className="month-end-control">
                <span>当前咖啡需求</span>
                <strong>☕ × {monthEnd ? '07' : '02'}</strong>
                <button type="button" onClick={toggleMonthEnd}>
                  {monthEnd ? '恢复普通日期' : '进入月底模式'} <ArrowIcon />
                </button>
              </div>
            </div>

            <div className="closing-console micro-tilt" data-reveal>
              <div className="console-top">
                <span><i /> {closing ? '结账中……' : monthEnd ? '月底模式运行中' : '系统待命'}</span>
                <span>{progress.toString().padStart(2, '0')}%</span>
              </div>
              <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
              <div className="console-bottom">
                <span>总账核对</span>
                <span>凭证复查</span>
                <span>报表确认</span>
                <strong>{progress === 99 ? '永远差最后一步' : '等待启动'}</strong>
              </div>
              {monthEnd && !closing && <p className="month-end-verdict">月底不存在下班，只有暂时离开工位。</p>}
            </div>

            <div className="state-strip" data-reveal>
              {financeStates.map(([label, value, english]) => (
                <article key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <small>{english}</small>
                </article>
              ))}
            </div>

            <div className="formula-grid">
              {formulas.map((item, index) => (
                <article className="formula-card micro-tilt" data-reveal key={item.formula}>
                  <span className="formula-index">CELL / 0{index + 1}</span>
                  <code>{item.formula}</code>
                  <div><span>计算结果</span><strong>{item.result}</strong></div>
                  <p>{item.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="challenge section-shell" id="challenge">
          <div className="section-kicker" data-reveal>
            <span>THE ¥0.01 CHALLENGE</span>
            <span>这不是金额问题，这是原则问题。</span>
          </div>
          <div className="challenge-stage" data-reveal>
            <div className={`cent-display ${challengeState === 'rejected' ? 'is-rejected' : ''} ${challengeState === 'balanced' ? 'is-balanced' : ''}`}>
              <span>账面差额 / DIFFERENCE</span>
              <strong>¥ {challengeState === 'balanced' ? '0.00' : '0.01'}</strong>
              <div className="cent-ruler"><i /><i /><i /><i /><i /><i /><i /></div>
            </div>
            <div className="challenge-copy">
              <span className="tiny-label">来自非财务同事的危险建议</span>
              <h2>“算了吧，<br />不就一分钱？”</h2>
              <p>财务人的雷达不会因为数字小就自动关闭。请谨慎选择你的下一步。</p>
              <div className="challenge-actions">
                <button className="ghost-action" type="button" onClick={rejectOneCent}>算了吧，就一分钱</button>
                <button className="ink-action" type="button" onClick={balanceTheBook}>继续核对 <ArrowIcon /></button>
              </div>
            </div>
            <div className={`rejection-note ${challengeState === 'idle' ? '' : 'is-shown'}`} role="status" aria-live="polite">
              {challengeState === 'balanced' ? (
                <><span>✓</span><strong>对账意识审核通过。</strong><small>账平了，今天可以早点——算了，别立 Flag。</small></>
              ) : (
                <><span>×</span><strong>财务主管拒绝了你的请求。</strong><small>不是钱的问题，是账必须平。</small></>
              )}
            </div>
          </div>
        </section>

        <section className="gallery section-shell" id="gallery">
          <div className="gallery-heading" data-reveal>
            <div className="section-kicker"><span>GALLERY / 待本人入镜</span></div>
            <h2>数字之外，<br />也该留些生活的底片。</h2>
            <p>不使用陌生照片代替她。把真实照片按约定文件名放进图片目录，占位会自动消失。</p>
          </div>
          <div className="gallery-grid">
            <PhotoFrame src={photos.atmosphere} label="PHOTO 02" caption="横版氛围照片" className="gallery-wide" />
            <PhotoFrame src={photos.gallery01} label="PHOTO 03" caption="Gallery / 01" className="gallery-tall" />
            <PhotoFrame src={photos.gallery02} label="PHOTO 04" caption="Gallery / 02" className="gallery-square" />
            <PhotoFrame src={photos.gallery03} label="PHOTO 05" caption="Gallery / 03" className="gallery-landscape" />
          </div>
        </section>

        <section className="little-things section-shell">
          <div className="life-photo-wrap" data-reveal>
            <PhotoFrame src={photos.life} label="PHOTO 06" caption="日常生活照片" className="life-photo" />
            <span className="side-note">LIFE / NOT IN A SPREADSHEET</span>
          </div>
          <div className="little-copy" data-reveal>
            <span className="tiny-label">LITTLE THINGS / 一些小事</span>
            <h2>严谨放在账里，<br />可爱留给生活。</h2>
            <div className="tag-cloud">
              <span>数字敏感</span>
              <span>细节雷达常开</span>
              <span>Ctrl + S 条件反射</span>
              <span>借贷平衡强迫症</span>
              <span>看到 0.01 无法路过</span>
              <span>更多故事正在补账</span>
            </div>
            <div className="tiny-joke">
              <span>下班状态公式</span>
              <code>=IF(账平了,"拜拜","再看一眼")</code>
              <strong>再看一眼</strong>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-orbit" aria-hidden="true"><span>0.01</span></div>
        <div className="footer-copy">
          <span>END OF LEDGER</span>
          <h2>账平了，<br />今天的网站也看到这里了。</h2>
          <p>Made for {profile.name} · {new Date().getFullYear()}</p>
        </div>
        <a className="back-top" href="#top">回到顶部 <ArrowIcon /></a>
      </footer>
    </>
  )
}

export default App
