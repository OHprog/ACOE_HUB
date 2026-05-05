// Navbar + Footer + Modal + helpers
const { useState, useEffect, useRef } = React;

// Sun / Moon icons for theme toggle
function IconSun({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
function IconMoon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function Navbar({ current, onNavigate, lang, setLang, theme, setTheme }) {
  const links = [
    { id: 'home',           labelKey: 'nav_home' },
    { id: 'robotisation',   labelKey: 'nav_robotisation' },
    { id: 'digitalisation', labelKey: 'nav_digitalisation' },
    { id: 'reporting',      labelKey: 'nav_reporting' },
    { id: 'hub',            labelKey: 'nav_hub' },
  ];
  const [open, setOpen] = useState(false);
  const isDark = theme === 'dark';

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#/" className="brand" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          <BrandMark size={36} />
          <div className="brand-text">
            <div className="b1">{T('brand_name', lang)}</div>
            <div className="b2">{T('brand_sub', lang)}</div>
          </div>
        </a>
        <div className="nav-links">
          {links.map(l => (
            <a
              key={l.id}
              href={`#/${l.id === 'home' ? '' : l.id}`}
              className={`nav-link ${current === l.id ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); onNavigate(l.id); }}
            >
              {T(l.labelKey, lang)}
            </a>
          ))}
          <div className="nav-controls">
            <div className="lang-toggle">
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
              <button className={`lang-btn ${lang === 'cz' ? 'active' : ''}`} onClick={() => setLang('cz')}>CZ</button>
            </div>
            <button className="theme-btn" onClick={() => setTheme(isDark ? 'light' : 'dark')} title={isDark ? 'Light mode' : 'Dark mode'}>
              {isDark ? <IconSun size={15} /> : <IconMoon size={15} />}
            </button>
            <button className="nav-cta" onClick={() => onNavigate('hub')}>
              <Icon.Spark size={14} />
              {T('nav_submit', lang)}
            </button>
          </div>
        </div>
        <button
          className="nav-mobile"
          aria-label={T('nav_menu_aria', lang)}
          onClick={() => setOpen(o => !o)}
          style={{
            background: 'transparent', border: '1px solid rgba(15,12,40,0.1)',
            borderRadius: 8, padding: 10, color: 'var(--ink)'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>
      {open && (
        <div style={{
          borderTop: '1px solid rgba(15,12,40,0.06)',
          background: 'var(--white)', padding: '12px 20px', display: 'grid', gap: 4
        }}>
          {links.map(l => (
            <a
              key={l.id}
              href="#"
              className={`nav-link ${current === l.id ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setOpen(false); onNavigate(l.id); }}
              style={{ padding: 12 }}
            >{T(l.labelKey, lang)}</a>
          ))}
          <div style={{ display: 'flex', gap: 8, padding: '8px 12px' }}>
            <div className="lang-toggle">
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
              <button className={`lang-btn ${lang === 'cz' ? 'active' : ''}`} onClick={() => setLang('cz')}>CZ</button>
            </div>
            <button className="theme-btn" onClick={() => setTheme(isDark ? 'light' : 'dark')}>
              {isDark ? <IconSun size={15} /> : <IconMoon size={15} />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer({ onNavigate, lang }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <BrandMark size={28} />
          <span>ACOE — {T('brand_sub', lang)}</span>
        </div>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="#/robotisation" onClick={(e) => { e.preventDefault(); onNavigate('robotisation'); }}>{T('nav_robotisation', lang)}</a>
          <a href="#/digitalisation" onClick={(e) => { e.preventDefault(); onNavigate('digitalisation'); }}>{T('nav_digitalisation', lang)}</a>
          <a href="#/reporting" onClick={(e) => { e.preventDefault(); onNavigate('reporting'); }}>{T('nav_reporting', lang)}</a>
          <a href="#/hub" onClick={(e) => { e.preventDefault(); onNavigate('hub'); }}>{T('nav_hub', lang)}</a>
        </div>
        <div className="footer-mini">{T('footer_copy', lang)}</div>
      </div>
    </footer>
  );
}

// Animated count-up — kicks off on scroll into view
function CountUp({ to, suffix = '', duration = 1400 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setVal(Math.floor(eased * to));
          if (t < 1) requestAnimationFrame(tick);
          else setVal(to);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function Modal({ project, onClose, lang }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [project, onClose]);
  if (!project) return null;
  const Ico = Icon[project.Icon] || Icon.Robot;
  const isCz = lang === 'cz';
  const title   = isCz && project.titleCz   ? project.titleCz   : project.title;
  const long    = isCz && project.longCz    ? project.longCz    : (project.long || project.desc);
  const bullets = isCz && project.bulletsCz ? project.bulletsCz : project.bullets;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ '--accent': project.accent }}>
        <div className="modal-thumb" style={{ position: 'relative' }}>
          <div className="thumb-bg" style={{ background: project.gradient }}></div>
          <button className="modal-close" onClick={onClose} aria-label={T('modal_close_aria', lang)}>×</button>
          <div className="thumb-tag" style={{ position: 'absolute', left: 24, top: 22 }}>{project.id}</div>
          <div className="thumb-icon" style={{ right: 28, bottom: 24, color: 'white', opacity: 0.95 }}>
            <Ico size={64} />
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-eyebrow" style={{ color: project.accent }}>{project.category} · {project.dept}</div>
          <h2>{title}</h2>
          <p className="lead">{long}</p>
          <div className="modal-grid">
            <div className="cell"><div className="k">{T('modal_status', lang)}</div><div className="v">{project.status}</div></div>
            <div className="cell"><div className="k">{T('modal_hours', lang)}</div><div className="v">{project.hours}</div></div>
            <div className="cell"><div className="k">{T('modal_stack', lang)}</div><div className="v" style={{ fontSize: 14 }}>{project.stack.join(', ')}</div></div>
          </div>
          <h4>{T('modal_what', lang)}</h4>
          <ul>{bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
          <h4>{T('modal_owner', lang)}</h4>
          <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 14 }}>{project.owner} · {project.dept}</p>
        </div>
      </div>
    </div>
  );
}

window.Navbar = Navbar;
window.Footer = Footer;
window.CountUp = CountUp;
window.Modal = Modal;
