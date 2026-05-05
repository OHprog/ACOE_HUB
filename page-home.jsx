// Home page
const { useState: useStateHome } = React;

function Home({ onNavigate }) {
  return (
    <div className="page-fade-enter">
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <span className="eyebrow"><span className="dot"></span> Internal portal · v2.4</span>
            <h1>Automation <br/>Center of <span className="accent">Excellence</span></h1>
            <p className="lead">
              We drive digital transformation across the group through RPA, digitalisation
              and reporting — turning manual work into reliable, measurable systems.
            </p>
            <div className="hero-actions">
              <button className="btn btn-white" onClick={() => onNavigate('robotisation')}>
                Explore our work <Icon.Arrow size={14} />
              </button>
              <button className="btn btn-red" onClick={() => onNavigate('hub')}>
                Submit an idea <Icon.Spark size={14} />
              </button>
            </div>
          </div>
          <div className="hero-side">
            <div className="hero-card">
              <div className="label" style={{ marginBottom: 14 }}>Live bots · today</div>
              <div className="row">
                <div>
                  <div className="name">Forecast Aggregator</div>
                  <div className="meta">UiPath · 14 sites · 06:30 run</div>
                </div>
                <span className="status-pill ok"><span className="pulse"></span>Done</span>
              </div>
              <div className="row">
                <div>
                  <div className="name">SAP CapEx Capitalize</div>
                  <div className="meta">UiPath · queue: 23</div>
                </div>
                <span className="status-pill run"><span className="pulse"></span>Running</span>
              </div>
              <div className="row">
                <div>
                  <div className="name">Cadastre Scraper</div>
                  <div className="meta">UiPath · scheduled 22:00</div>
                </div>
                <span className="status-pill idle">Idle</span>
              </div>
              <div className="row">
                <div>
                  <div className="name">Service Re-keying</div>
                  <div className="meta">UiPath · 312 / 480 orders</div>
                </div>
                <span className="status-pill run"><span className="pulse"></span>Running</span>
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
              <div className="section-eyebrow">What we do</div>
              <h2>Three disciplines, one delivery team.</h2>
            </div>
            <p className="section-sub">
              We pick the right tool for the job — bots, apps, or dashboards —
              and run it as a managed service from day one.
            </p>
          </div>
          <div className="pillar-grid">
            <article className="pillar" style={{ '--accent': 'var(--blue)', '--accent-bg': 'rgba(48,0,145,0.08)' }} onClick={() => onNavigate('robotisation')}>
              <div className="pillar-num">01 / Robotisation</div>
              <div className="pillar-icon"><Icon.Robot size={28} /></div>
              <h3>Robotisation</h3>
              <p>UiPath bots that take repetitive manual work off your plate — so the team can focus on judgment, not keystrokes.</p>
              <div className="pillar-stack">
                <span className="tech-chip">UiPath</span>
                <span className="tech-chip">SAP</span>
                <span className="tech-chip">GitLab</span>
              </div>
              <div style={{ height: 18 }}></div>
              <a className="pillar-link" href="#/robotisation" onClick={(e) => { e.preventDefault(); onNavigate('robotisation'); }}>
                Explore <Icon.Arrow size={14} />
              </a>
            </article>
            <article className="pillar" style={{ '--accent': 'var(--light-blue)', '--accent-bg': 'rgba(65,182,230,0.14)' }} onClick={() => onNavigate('digitalisation')}>
              <div className="pillar-num">02 / Digitalisation</div>
              <div className="pillar-icon"><Icon.Bolt size={28} /></div>
              <h3>Digitalisation</h3>
              <p>Power Apps and Power Automate flows that replace shared spreadsheets with structured, auditable processes.</p>
              <div className="pillar-stack">
                <span className="tech-chip">Power Apps</span>
                <span className="tech-chip">Power Automate</span>
                <span className="tech-chip">Dataverse</span>
              </div>
              <div style={{ height: 18 }}></div>
              <a className="pillar-link" href="#/digitalisation" onClick={(e) => { e.preventDefault(); onNavigate('digitalisation'); }}>
                Explore <Icon.Arrow size={14} />
              </a>
            </article>
            <article className="pillar" style={{ '--accent': 'var(--red)', '--accent-bg': 'rgba(241,46,73,0.10)' }} onClick={() => onNavigate('reporting')}>
              <div className="pillar-num">03 / Reporting</div>
              <div className="pillar-icon"><Icon.Chart size={28} /></div>
              <h3>Reporting</h3>
              <p>Power BI dashboards on a curated semantic model — replacing handcrafted Excel decks with reliable, refreshed truth.</p>
              <div className="pillar-stack">
                <span className="tech-chip">Power BI</span>
                <span className="tech-chip">Confluence</span>
                <span className="tech-chip">Azure</span>
              </div>
              <div style={{ height: 18 }}></div>
              <a className="pillar-link" href="#/reporting" onClick={(e) => { e.preventDefault(); onNavigate('reporting'); }}>
                Explore <Icon.Arrow size={14} />
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
              <div className="label">Robots Deployed</div>
            </div>
            <div className="stat">
              <div className="num"><CountUp to={30} /><span className="plus">+</span></div>
              <div className="label">Processes Automated</div>
            </div>
            <div className="stat">
              <div className="num"><CountUp to={3} /></div>
              <div className="label">Platforms</div>
            </div>
            <div className="stat">
              <div className="num"><CountUp to={100} /><span className="plus">+</span></div>
              <div className="label">Hours Saved Weekly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process strip */}
      <section className="process">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">How we deliver</div>
              <h2>From idea to running automation in four steps.</h2>
            </div>
          </div>
          <div className="process-grid">
            <div className="process-step">
              <div className="step-num">STEP 01</div>
              <h4>Discover</h4>
              <p>You drop us a process. We assess feasibility, ROI and the cleanest path to automation.</p>
            </div>
            <div className="process-step">
              <div className="step-num">STEP 02</div>
              <h4>Design</h4>
              <p>We map the as-is process, agree on the to-be, and lock the handover criteria with the business owner.</p>
            </div>
            <div className="process-step">
              <div className="step-num">STEP 03</div>
              <h4>Build</h4>
              <p>Source-controlled bots, apps and reports — built to a shared template so they stay maintainable.</p>
            </div>
            <div className="process-step">
              <div className="step-num">STEP 04</div>
              <h4>Run</h4>
              <p>We monitor, support and improve. SLAs, alerting and a dashboard you can trust.</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
            <button className="btn btn-blue" onClick={() => onNavigate('hub')}>
              Got an idea? Submit it <Icon.Arrow size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

window.Home = Home;
