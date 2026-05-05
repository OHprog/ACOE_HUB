// Home page
function Home({ onNavigate, lang }) {
  return (
    <div className="page-fade-enter">
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <span className="eyebrow"><span className="dot"></span> {T('hero_eyebrow', lang)}</span>
            <h1>{T('hero_h1_1', lang)} <br/>{T('hero_h1_2', lang)} <span className="accent">{T('hero_h1_accent', lang)}</span></h1>
            <p className="lead">{T('hero_lead', lang)}</p>
            <div className="hero-actions">
              <button className="btn btn-white" onClick={() => onNavigate('robotisation')}>
                {T('hero_cta_explore', lang)} <Icon.Arrow size={14} />
              </button>
              <button className="btn btn-red" onClick={() => onNavigate('hub')}>
                {T('hero_cta_submit', lang)} <Icon.Spark size={14} />
              </button>
            </div>
          </div>
          <div className="hero-side">
            <div className="hero-card">
              <div className="label" style={{ marginBottom: 14 }}>{T('hero_card_label', lang)}</div>
              <div className="row">
                <div>
                  <div className="name">Forecast Aggregator</div>
                  <div className="meta">UiPath · 14 sites · 06:30 run</div>
                </div>
                <span className="status-pill ok"><span className="pulse"></span>{T('hero_status_done', lang)}</span>
              </div>
              <div className="row">
                <div>
                  <div className="name">SAP CapEx Capitalize</div>
                  <div className="meta">UiPath · queue: 23</div>
                </div>
                <span className="status-pill run"><span className="pulse"></span>{T('hero_status_running', lang)}</span>
              </div>
              <div className="row">
                <div>
                  <div className="name">Cadastre Scraper</div>
                  <div className="meta">UiPath · scheduled 22:00</div>
                </div>
                <span className="status-pill idle">{T('hero_status_idle', lang)}</span>
              </div>
              <div className="row">
                <div>
                  <div className="name">Service Re-keying</div>
                  <div className="meta">UiPath · 312 / 480 orders</div>
                </div>
                <span className="status-pill run"><span className="pulse"></span>{T('hero_status_running', lang)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="pillars">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">{T('pillars_eyebrow', lang)}</div>
              <h2>{T('pillars_h2', lang)}</h2>
            </div>
            <p className="section-sub">{T('pillars_sub', lang)}</p>
          </div>
          <div className="pillar-grid">
            <article className="pillar" style={{ '--accent': 'var(--blue)', '--accent-bg': 'rgba(48,0,145,0.08)' }} onClick={() => onNavigate('robotisation')}>
              <div className="pillar-num">{T('pillar1_num', lang)}</div>
              <div className="pillar-icon"><Icon.Robot size={28} /></div>
              <h3>{T('pillar1_title', lang)}</h3>
              <p>{T('pillar1_desc', lang)}</p>
              <div className="pillar-stack">
                <span className="tech-chip">UiPath</span>
                <span className="tech-chip">SAP</span>
                <span className="tech-chip">GitLab</span>
              </div>
              <div style={{ height: 18 }}></div>
              <a className="pillar-link" href="#/robotisation" onClick={(e) => { e.preventDefault(); onNavigate('robotisation'); }}>
                {T('pillar_explore', lang)} <Icon.Arrow size={14} />
              </a>
            </article>
            <article className="pillar" style={{ '--accent': 'var(--light-blue)', '--accent-bg': 'rgba(65,182,230,0.14)' }} onClick={() => onNavigate('digitalisation')}>
              <div className="pillar-num">{T('pillar2_num', lang)}</div>
              <div className="pillar-icon"><Icon.Bolt size={28} /></div>
              <h3>{T('pillar2_title', lang)}</h3>
              <p>{T('pillar2_desc', lang)}</p>
              <div className="pillar-stack">
                <span className="tech-chip">Power Apps</span>
                <span className="tech-chip">Power Automate</span>
                <span className="tech-chip">Dataverse</span>
              </div>
              <div style={{ height: 18 }}></div>
              <a className="pillar-link" href="#/digitalisation" onClick={(e) => { e.preventDefault(); onNavigate('digitalisation'); }}>
                {T('pillar_explore', lang)} <Icon.Arrow size={14} />
              </a>
            </article>
            <article className="pillar" style={{ '--accent': 'var(--red)', '--accent-bg': 'rgba(241,46,73,0.10)' }} onClick={() => onNavigate('reporting')}>
              <div className="pillar-num">{T('pillar3_num', lang)}</div>
              <div className="pillar-icon"><Icon.Chart size={28} /></div>
              <h3>{T('pillar3_title', lang)}</h3>
              <p>{T('pillar3_desc', lang)}</p>
              <div className="pillar-stack">
                <span className="tech-chip">Power BI</span>
                <span className="tech-chip">Confluence</span>
                <span className="tech-chip">Azure</span>
              </div>
              <div style={{ height: 18 }}></div>
              <a className="pillar-link" href="#/reporting" onClick={(e) => { e.preventDefault(); onNavigate('reporting'); }}>
                {T('pillar_explore', lang)} <Icon.Arrow size={14} />
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <div className="num"><CountUp to={12} /><span className="plus">+</span></div>
              <div className="label">{T('stat1_label', lang)}</div>
            </div>
            <div className="stat">
              <div className="num"><CountUp to={30} /><span className="plus">+</span></div>
              <div className="label">{T('stat2_label', lang)}</div>
            </div>
            <div className="stat">
              <div className="num"><CountUp to={3} /></div>
              <div className="label">{T('stat3_label', lang)}</div>
            </div>
            <div className="stat">
              <div className="num"><CountUp to={100} /><span className="plus">+</span></div>
              <div className="label">{T('stat4_label', lang)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process strip */}
      <section className="process">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">{T('process_eyebrow', lang)}</div>
              <h2>{T('process_h2', lang)}</h2>
            </div>
          </div>
          <div className="process-grid">
            <div className="process-step">
              <div className="step-num">{T('process_s1_num', lang)}</div>
              <h4>{T('process_s1_title', lang)}</h4>
              <p>{T('process_s1_desc', lang)}</p>
            </div>
            <div className="process-step">
              <div className="step-num">{T('process_s2_num', lang)}</div>
              <h4>{T('process_s2_title', lang)}</h4>
              <p>{T('process_s2_desc', lang)}</p>
            </div>
            <div className="process-step">
              <div className="step-num">{T('process_s3_num', lang)}</div>
              <h4>{T('process_s3_title', lang)}</h4>
              <p>{T('process_s3_desc', lang)}</p>
            </div>
            <div className="process-step">
              <div className="step-num">{T('process_s4_num', lang)}</div>
              <h4>{T('process_s4_title', lang)}</h4>
              <p>{T('process_s4_desc', lang)}</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
            <button className="btn btn-blue" onClick={() => onNavigate('hub')}>
              {T('process_cta', lang)} <Icon.Arrow size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

window.Home = Home;
