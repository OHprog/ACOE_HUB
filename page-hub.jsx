// Automation Hub — idea submission form
const { useState: useStateHub } = React;

function Hub({ onNavigate }) {
  const [form, setForm] = useStateHub({
    name: '', dept: '', email: '', title: '',
    category: '', description: '', timeSpent: '',
  });
  const [errors, setErrors] = useStateHub({});
  const [submitted, setSubmitted] = useStateHub(false);
  const [submitting, setSubmitting] = useStateHub(false);

  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: undefined });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.dept.trim()) e.dept = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.title.trim()) e.title = 'Required';
    if (!form.category) e.category = 'Required';
    if (!form.description.trim()) e.description = 'Required';
    else if (form.description.trim().length < 20) e.description = 'Please give a bit more detail (20+ chars)';
    if (!form.timeSpent) e.timeSpent = 'Required';
    return e;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 700);
  };

  return (
    <div className="page-fade-enter">
      <section className="page-hero purple">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="crumb">
            <a href="#/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>ACOE</a>
            <span className="sep">/</span>
            <span style={{ color: 'white' }}>Automation Hub</span>
          </div>
          <h1>Submit your <br/>automation idea.</h1>
          <p className="desc">
            Have a process that could be automated? We'd love to hear it. Drop by the
            2nd floor for coffee, or submit your idea below — someone from the ACOE
            team will reach out within 5 business days.
          </p>
        </div>
      </section>

      <section className="hub-wrap">
        <div className="container hub-grid">
          <div className="form-card">
            {submitted ? (
              <div className="success">
                <div className="check">
                  <Icon.Check size={44} />
                </div>
                <h3>Thank you — we've got it.</h3>
                <p>The ACOE team will review your submission and contact you within 5 business days.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <button className="btn btn-blue" onClick={() => onNavigate('home')}>Back to home</button>
                  <button className="btn btn-ghost" onClick={() => {
                    setForm({ name: '', dept: '', email: '', title: '', category: '', description: '', timeSpent: '' });
                    setSubmitted(false);
                  }}>Submit another</button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 800 }}>Tell us about it</h2>
                <p style={{ margin: '0 0 24px', color: 'var(--ink-3)', fontSize: 14 }}>
                  Required fields are marked. We read every submission.
                </p>

                <div className="form-row">
                  <div className={`field ${errors.name ? 'error' : ''}`}>
                    <label>Your name<span className="req">*</span></label>
                    <input value={form.name} onChange={set('name')} placeholder="Jane Doe" />
                    {errors.name && <span className="error-msg">{errors.name}</span>}
                  </div>
                  <div className={`field ${errors.dept ? 'error' : ''}`}>
                    <label>Department / team<span className="req">*</span></label>
                    <input value={form.dept} onChange={set('dept')} placeholder="Finance · Controlling" />
                    {errors.dept && <span className="error-msg">{errors.dept}</span>}
                  </div>
                </div>

                <div className={`field ${errors.email ? 'error' : ''}`}>
                  <label>Work email<span className="req">*</span></label>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="jane.doe@example.com" />
                  {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>

                <div className={`field ${errors.title ? 'error' : ''}`}>
                  <label>Idea title<span className="req">*</span></label>
                  <input value={form.title} onChange={set('title')} placeholder="Automate monthly vendor reconciliation" />
                  {errors.title && <span className="error-msg">{errors.title}</span>}
                </div>

                <div className="form-row">
                  <div className={`field ${errors.category ? 'error' : ''}`}>
                    <label>Category<span className="req">*</span></label>
                    <select value={form.category} onChange={set('category')}>
                      <option value="">Select a category…</option>
                      <option>Robotisation</option>
                      <option>Digitalisation</option>
                      <option>Reporting</option>
                      <option>Not sure</option>
                    </select>
                    {errors.category && <span className="error-msg">{errors.category}</span>}
                  </div>
                  <div className={`field ${errors.timeSpent ? 'error' : ''}`}>
                    <label>Estimated time spent<span className="req">*</span></label>
                    <select value={form.timeSpent} onChange={set('timeSpent')}>
                      <option value="">Select…</option>
                      <option>Less than 1 hr / week</option>
                      <option>1 – 4 hrs / week</option>
                      <option>4 – 8 hrs / week</option>
                      <option>8+ hrs / week</option>
                    </select>
                    {errors.timeSpent && <span className="error-msg">{errors.timeSpent}</span>}
                  </div>
                </div>

                <div className={`field ${errors.description ? 'error' : ''}`}>
                  <label>Process description<span className="req">*</span></label>
                  <textarea value={form.description} onChange={set('description')}
                    placeholder="Describe the current manual process — who does it, how often, and what makes it painful." />
                  {errors.description && <span className="error-msg">{errors.description}</span>}
                  <span className="hint">{form.description.length} / 20+ characters</span>
                </div>

                <div className="note-box">
                  <strong>Have a process diagram?</strong> Email it to <a href="mailto:acoe@example.com" style={{ color: 'var(--blue)', fontWeight: 700 }}>acoe@example.com</a> and reference your idea title — it speeds up the discovery conversation.
                </div>

                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? 'Submitting…' : <>Submit idea <Icon.Arrow size={16} /></>}
                </button>
              </form>
            )}
          </div>

          <aside className="side-panel">
            <div className="side-card dark">
              <div className="head">
                <div className="ico"><Icon.Coffee size={18} /></div>
                <h4>Prefer to chat?</h4>
              </div>
              <p>Drop by the 2nd floor — we keep good coffee, a whiteboard, and an open-door policy.</p>
              <div className="stat-grid">
                <div>
                  <div className="num">5d</div>
                  <div className="lbl">Avg. response</div>
                </div>
                <div>
                  <div className="num">100%</div>
                  <div className="lbl">Read rate</div>
                </div>
              </div>
            </div>
            <div className="side-card">
              <div className="head">
                <div className="ico"><Icon.Pulse size={18} /></div>
                <h4>What happens next</h4>
              </div>
              <ol style={{ margin: 0, paddingLeft: 18, color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.7 }}>
                <li>We log your idea into the intake board.</li>
                <li>A delivery lead reaches out for a 30-min discovery call.</li>
                <li>If green-lit, we scope, build and hand back a running automation.</li>
              </ol>
            </div>
            <div className="side-card">
              <div className="head">
                <div className="ico"><Icon.Mail size={18} /></div>
                <h4>Direct contact</h4>
              </div>
              <p>
                <strong>acoe@example.com</strong><br/>
                Slack: <span style={{ color: 'var(--blue)', fontWeight: 700 }}>#acoe-help</span><br/>
                Office: 2nd floor · Building B
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

window.Hub = Hub;
