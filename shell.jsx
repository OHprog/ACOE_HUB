// Navbar + Footer + Modal + helpers
const { useState, useEffect, useRef } = React;

function Navbar({ current, onNavigate }) {
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'robotisation', label: 'Robotisation' },
    { id: 'digitalisation', label: 'Digitalisation' },
    { id: 'reporting', label: 'Reporting' },
    { id: 'hub', label: 'Automation Hub' },
  ];
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#/" className="brand" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          <BrandMark size={36} />
          <div className="brand-text">
            <div className="b1">ACOE</div>
            <div className="b2">Automation Center of Excellence</div>
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
              {l.label}
            </a>
          ))}
          <button className="nav-cta" onClick={() => onNavigate('hub')}>
            <Icon.Spark size={14} />
            Submit an Idea
          </button>
        </div>
        <button
          className="nav-mobile"
          aria-label="Menu"
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
          background: 'white', padding: '12px 20px', display: 'grid', gap: 4
        }}>
          {links.map(l => (
            <a
              key={l.id}
              href="#"
              className={`nav-link ${current === l.id ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setOpen(false); onNavigate(l.id); }}
              style={{ padding: 12 }}
            >{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <BrandMark size={28} />
          <span>ACOE — Automation Center of Excellence</span>
        </div>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="#/robotisation" onClick={(e) => { e.preventDefault(); onNavigate('robotisation'); }}>Robotisation</a>
          <a href="#/digitalisation" onClick={(e) => { e.preventDefault(); onNavigate('digitalisation'); }}>Digitalisation</a>
          <a href="#/reporting" onClick={(e) => { e.preventDefault(); onNavigate('reporting'); }}>Reporting</a>
          <a href="#/hub" onClick={(e) => { e.preventDefault(); onNavigate('hub'); }}>Automation Hub</a>
        </div>
        <div className="footer-mini">© 2026 · Internal portal · v2.4</div>
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

function Modal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);
  if (!project) return null;
  const Ico = project.Icon || Icon.Robot;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ '--accent': project.accent }}>
        <div className="modal-thumb" style={{ position: 'relative' }}>
          <div className="thumb-bg" style={{ background: project.gradient }}></div>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
          <div className="thumb-tag" style={{ position: 'absolute', left: 24, top: 22 }}>
            {project.id}
          </div>
          <div className="thumb-icon" style={{ right: 28, bottom: 24, color: 'white', opacity: 0.95 }}>
            <Ico size={64} />
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-eyebrow" style={{ color: project.accent }}>{project.category} · {project.dept}</div>
          <h2>{project.title}</h2>
          <p className="lead">{project.long || project.desc}</p>

          <div className="modal-grid">
            <div className="cell"><div className="k">Status</div><div className="v">{project.status}</div></div>
            <div className="cell"><div className="k">Hours saved / mo</div><div className="v">{project.hours}</div></div>
            <div className="cell"><div className="k">Stack</div><div className="v" style={{ fontSize: 14 }}>{project.stack.join(', ')}</div></div>
          </div>

          <h4>What it does</h4>
          <ul>
            {project.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>

          <h4>Owner</h4>
          <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 14 }}>
            {project.owner} · {project.dept}
          </p>
        </div>
      </div>
    </div>
  );
}

window.Navbar = Navbar;
window.Footer = Footer;
window.CountUp = CountUp;
window.Modal = Modal;
