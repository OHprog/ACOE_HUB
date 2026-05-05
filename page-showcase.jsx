// Generic showcase page used by Robotisation / Digitalisation / Reporting
const { useState: useStateShowcase, useMemo } = React;

function ShowcasePage({
  pageKey,
  heroClass,
  title,
  description,
  techPills,
  accent,
  onNavigate,
  filters,
  swatchColor,
}) {
  const [filter, setFilter] = useStateShowcase('All');
  const [openProject, setOpenProject] = useStateShowcase(null);
  const items = window.PROJECTS[pageKey] || [];
  const filtered = useMemo(() => filter === 'All' ? items : items.filter(p => p.tag === filter), [filter, items]);

  return (
    <div className="page-fade-enter">
      <section className={`page-hero ${heroClass}`}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="crumb">
            <a href="#/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>ACOE</a>
            <span className="sep">/</span>
            <span style={{ color: 'white' }}>{title}</span>
          </div>
          <h1>{title}.</h1>
          <p className="desc">{description}</p>
          <div className="tech-row">
            {techPills.map(t => (
              <span className="tech-pill" key={t}>
                <span className="swatch" style={{ background: swatchColor }}></span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <div className="container">
          <div className="filters">
            <span className="filter-label">Filter</span>
            {filters.map(f => (
              <button
                key={f}
                className={`filter ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
                style={filter === f ? { background: accent, borderColor: accent } : {}}
              >{f}</button>
            ))}
            <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--ink-3)', fontWeight: 600 }}>
              {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
            </span>
          </div>

          <div className="showcase-grid">
            {filtered.map(p => {
              const Ico = window.Icon[p.Icon] || window.Icon.Robot;
              return (
                <article key={p.id} className="showcase" style={{ '--accent': p.accent }}>
                  <div className="showcase-thumb">
                    <div className="thumb-bg" style={{ background: p.gradient }}></div>
                    <span className="thumb-tag">{p.id}</span>
                    <span className="cat-badge" style={{ color: p.accent }}>{p.category}</span>
                    <div className="thumb-icon"><Ico size={56} /></div>
                  </div>
                  <div className="showcase-body">
                    <div className="showcase-meta">
                      <span className="dept">{p.dept}</span>
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span>{p.status}</span>
                    </div>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="showcase-foot">
                      <button className="view-btn" onClick={() => setOpenProject(p)}>
                        View details <Icon.Arrow size={14} />
                      </button>
                      <div className="metrics-row">
                        <span className="m"><Icon.Clock size={12} /> <b>{p.hours}</b>/mo</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div style={{
              padding: 60, textAlign: 'center', color: 'var(--ink-3)',
              border: '1px dashed rgba(15,12,40,0.12)', borderRadius: 14
            }}>
              No projects in this category yet. <a style={{ color: accent, fontWeight: 700 }} href="#/hub" onClick={(e) => { e.preventDefault(); onNavigate('hub'); }}>Submit one →</a>
            </div>
          )}
        </div>
      </section>

      <Modal project={openProject} onClose={() => setOpenProject(null)} />
    </div>
  );
}

function Robotisation({ onNavigate }) {
  return <ShowcasePage
    pageKey="robotisation"
    heroClass=""
    title="Robotisation"
    description="We automate repetitive manual tasks using UiPath RPA — freeing your team to focus on high-value work."
    techPills={['UiPath', 'GitLab', 'Excel', 'SAP']}
    accent="#300091"
    swatchColor="#41b6e6"
    filters={['All', 'SAP', 'Government', 'Sales', 'Operations', 'Finance']}
    onNavigate={onNavigate}
  />;
}
function Digitalisation({ onNavigate }) {
  return <ShowcasePage
    pageKey="digitalisation"
    heroClass="alt"
    title="Digitalisation"
    description="We digitalize paper and Excel processes into structured applications and forms with full automation built in."
    techPills={['Power Apps', 'Power Automate', 'Dataverse', 'SharePoint']}
    accent="#41b6e6"
    swatchColor="#ffffff"
    filters={['All', 'Operations', 'Finance']}
    onNavigate={onNavigate}
  />;
}
function Reporting({ onNavigate }) {
  return <ShowcasePage
    pageKey="reporting"
    heroClass="red"
    title="Reporting"
    description="We visualize complex data and replace manual Excel reports with interactive, automated dashboards."
    techPills={['Power BI', 'Confluence', 'Dataverse', 'Azure']}
    accent="#f12e49"
    swatchColor="#ffffff"
    filters={['All', 'Operations', 'Finance']}
    onNavigate={onNavigate}
  />;
}

window.Robotisation = Robotisation;
window.Digitalisation = Digitalisation;
window.Reporting = Reporting;
