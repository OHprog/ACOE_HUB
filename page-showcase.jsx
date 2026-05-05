// Generic showcase page used by Robotisation / Digitalisation / Reporting
const { useState: useStateShowcase, useMemo } = React;

function ShowcasePage({
  pageKey,
  heroClass,
  titleKey,
  descKey,
  techPills,
  accent,
  onNavigate,
  filters,
  filtersCz,
  swatchColor,
  lang,
}) {
  const [filter, setFilter] = useStateShowcase('All');
  const [openProject, setOpenProject] = useStateShowcase(null);
  const items = window.PROJECTS[pageKey] || [];
  const filtered = useMemo(() => filter === 'All' ? items : items.filter(p => p.tag === filter), [filter, items]);
  const isCz = lang === 'cz';
  const allLabel = isCz ? 'Vše' : 'All';

  return (
    <div className="page-fade-enter">
      <section className={`page-hero ${heroClass}`}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="crumb">
            <a href="#/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>{T('showcase_crumb_home', lang)}</a>
            <span className="sep">/</span>
            <span style={{ color: 'white' }}>{T(titleKey, lang)}</span>
          </div>
          <h1>{T(titleKey, lang)}.</h1>
          <p className="desc">{T(descKey, lang)}</p>
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
            <span className="filter-label">{T('showcase_filter_label', lang)}</span>
            <button
              className={`filter ${filter === 'All' ? 'active' : ''}`}
              onClick={() => setFilter('All')}
              style={filter === 'All' ? { background: accent, borderColor: accent } : {}}
            >{allLabel}</button>
            {filters.map((f, i) => {
              const label = isCz && filtersCz ? filtersCz[i] : f;
              return (
                <button
                  key={f}
                  className={`filter ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                  style={filter === f ? { background: accent, borderColor: accent } : {}}
                >{label}</button>
              );
            })}
            <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--ink-3)', fontWeight: 600 }}>
              {filtered.length} {filtered.length === 1 ? T('showcase_count_singular', lang) : T('showcase_count_plural', lang)}
            </span>
          </div>

          <div className="showcase-grid">
            {filtered.map(p => {
              const Ico = window.Icon[p.Icon] || window.Icon.Robot;
              const title = isCz && p.titleCz ? p.titleCz : p.title;
              const desc  = isCz && p.descCz  ? p.descCz  : p.desc;
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
                    <h3>{title}</h3>
                    <p>{desc}</p>
                    <div className="showcase-foot">
                      <button className="view-btn" onClick={() => setOpenProject(p)}>
                        {T('showcase_view_details', lang)} <Icon.Arrow size={14} />
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
              {T('showcase_empty', lang)}{' '}
              <a style={{ color: accent, fontWeight: 700 }} href="#/hub" onClick={(e) => { e.preventDefault(); onNavigate('hub'); }}>
                {T('showcase_empty_link', lang)}
              </a>
            </div>
          )}
        </div>
      </section>

      <Modal project={openProject} onClose={() => setOpenProject(null)} lang={lang} />
    </div>
  );
}

function Robotisation({ onNavigate, lang }) {
  return <ShowcasePage
    pageKey="robotisation"
    heroClass=""
    titleKey="robo_title"
    descKey="robo_desc"
    techPills={['UiPath', 'GitLab', 'Excel', 'SAP']}
    accent="#300091"
    swatchColor="#41b6e6"
    filters={['SAP', 'Government', 'Sales', 'Operations', 'Finance']}
    filtersCz={['SAP', 'Státní správa', 'Prodej', 'Provoz', 'Finance']}
    onNavigate={onNavigate}
    lang={lang}
  />;
}
function Digitalisation({ onNavigate, lang }) {
  return <ShowcasePage
    pageKey="digitalisation"
    heroClass="alt"
    titleKey="digi_title"
    descKey="digi_desc"
    techPills={['Power Apps', 'Power Automate', 'Dataverse', 'SharePoint']}
    accent="#41b6e6"
    swatchColor="#ffffff"
    filters={['Operations', 'Finance']}
    filtersCz={['Provoz', 'Finance']}
    onNavigate={onNavigate}
    lang={lang}
  />;
}
function Reporting({ onNavigate, lang }) {
  return <ShowcasePage
    pageKey="reporting"
    heroClass="red"
    titleKey="repo_title"
    descKey="repo_desc"
    techPills={['Power BI', 'Confluence', 'Dataverse', 'Azure']}
    accent="#f12e49"
    swatchColor="#ffffff"
    filters={['Operations', 'Finance']}
    filtersCz={['Provoz', 'Finance']}
    onNavigate={onNavigate}
    lang={lang}
  />;
}

window.Robotisation = Robotisation;
window.Digitalisation = Digitalisation;
window.Reporting = Reporting;
