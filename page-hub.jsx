// Automation Hub — idea submission form
const { useState: useStateHub } = React;

function Hub({ onNavigate, lang }) {
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
    if (!form.name.trim()) e.name = T('err_required', lang);
    if (!form.dept.trim()) e.dept = T('err_required', lang);
    if (!form.email.trim()) e.email = T('err_required', lang);
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = T('err_email', lang);
    if (!form.title.trim()) e.title = T('err_required', lang);
    if (!form.category) e.category = T('err_required', lang);
    if (!form.description.trim()) e.description = T('err_required', lang);
    else if (form.description.trim().length < 20) e.description = T('err_desc_short', lang);
    if (!form.timeSpent) e.timeSpent = T('err_required', lang);
    return e;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
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
            <a href="#/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>{T('showcase_crumb_home', lang)}</a>
            <span className="sep">/</span>
            <span style={{ color: 'white' }}>{T('hub_crumb', lang)}</span>
          </div>
          <h1>{T('hub_h1_1', lang)}<br/>{T('hub_h1_2', lang)}</h1>
          <p className="desc">{T('hub_desc', lang)}</p>
        </div>
      </section>

      <section className="hub-wrap">
        <div className="container hub-grid">
          <div className="form-card">
            {submitted ? (
              <div className="success">
                <div className="check"><Icon.Check size={44} /></div>
                <h3>{T('hub_success_title', lang)}</h3>
                <p>{T('hub_success_body', lang)}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <button className="btn btn-blue" onClick={() => onNavigate('home')}>{T('hub_back_home', lang)}</button>
                  <button className="btn btn-ghost" onClick={() => {
                    setForm({ name: '', dept: '', email: '', title: '', category: '', description: '', timeSpent: '' });
                    setSubmitted(false);
                  }}>{T('hub_submit_another', lang)}</button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 800 }}>{T('hub_form_title', lang)}</h2>
                <p style={{ margin: '0 0 24px', color: 'var(--ink-3)', fontSize: 14 }}>{T('hub_form_sub', lang)}</p>

                <div className="form-row">
                  <div className={`field ${errors.name ? 'error' : ''}`}>
                    <label>{T('hub_field_name', lang)}<span className="req">*</span></label>
                    <input value={form.name} onChange={set('name')} placeholder={T('hub_field_name_ph', lang)} />
                    {errors.name && <span className="error-msg">{errors.name}</span>}
                  </div>
                  <div className={`field ${errors.dept ? 'error' : ''}`}>
                    <label>{T('hub_field_dept', lang)}<span className="req">*</span></label>
                    <input value={form.dept} onChange={set('dept')} placeholder={T('hub_field_dept_ph', lang)} />
                    {errors.dept && <span className="error-msg">{errors.dept}</span>}
                  </div>
                </div>

                <div className={`field ${errors.email ? 'error' : ''}`}>
                  <label>{T('hub_field_email', lang)}<span className="req">*</span></label>
                  <input type="email" value={form.email} onChange={set('email')} placeholder={T('hub_field_email_ph', lang)} />
                  {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>

                <div className={`field ${errors.title ? 'error' : ''}`}>
                  <label>{T('hub_field_title', lang)}<span className="req">*</span></label>
                  <input value={form.title} onChange={set('title')} placeholder={T('hub_field_title_ph', lang)} />
                  {errors.title && <span className="error-msg">{errors.title}</span>}
                </div>

                <div className="form-row">
                  <div className={`field ${errors.category ? 'error' : ''}`}>
                    <label>{T('hub_field_category', lang)}<span className="req">*</span></label>
                    <select value={form.category} onChange={set('category')}>
                      <option value="">{T('hub_field_category_ph', lang)}</option>
                      <option>{T('hub_cat_robo', lang)}</option>
                      <option>{T('hub_cat_digi', lang)}</option>
                      <option>{T('hub_cat_repo', lang)}</option>
                      <option>{T('hub_cat_unsure', lang)}</option>
                    </select>
                    {errors.category && <span className="error-msg">{errors.category}</span>}
                  </div>
                  <div className={`field ${errors.timeSpent ? 'error' : ''}`}>
                    <label>{T('hub_field_time', lang)}<span className="req">*</span></label>
                    <select value={form.timeSpent} onChange={set('timeSpent')}>
                      <option value="">{T('hub_field_time_ph', lang)}</option>
                      <option>{T('hub_time_lt1', lang)}</option>
                      <option>{T('hub_time_1_4', lang)}</option>
                      <option>{T('hub_time_4_8', lang)}</option>
                      <option>{T('hub_time_8plus', lang)}</option>
                    </select>
                    {errors.timeSpent && <span className="error-msg">{errors.timeSpent}</span>}
                  </div>
                </div>

                <div className={`field ${errors.description ? 'error' : ''}`}>
                  <label>{T('hub_field_desc', lang)}<span className="req">*</span></label>
                  <textarea value={form.description} onChange={set('description')} placeholder={T('hub_field_desc_ph', lang)} />
                  {errors.description && <span className="error-msg">{errors.description}</span>}
                  <span className="hint">{form.description.length} {T('hub_char_hint', lang)}</span>
                </div>

                <div className="note-box">
                  <strong>{T('hub_note', lang)}</strong>
                  {T('hub_note_body', lang)}
                  <a href="mailto:acoe@example.com" style={{ color: 'var(--blue)', fontWeight: 700 }}>acoe@example.com</a>
                  {T('hub_note_suffix', lang)}
                </div>

                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? T('hub_submitting', lang) : <>{T('hub_submit', lang)} <Icon.Arrow size={16} /></>}
                </button>
              </form>
            )}
          </div>

          <aside className="side-panel">
            <div className="side-card dark">
              <div className="head">
                <div className="ico"><Icon.Coffee size={18} /></div>
                <h4>{T('hub_side1_title', lang)}</h4>
              </div>
              <p>{T('hub_side1_body', lang)}</p>
              <div className="stat-grid">
                <div>
                  <div className="num">{T('hub_side1_stat1_num', lang)}</div>
                  <div className="lbl">{T('hub_side1_stat1_lbl', lang)}</div>
                </div>
                <div>
                  <div className="num">{T('hub_side1_stat2_num', lang)}</div>
                  <div className="lbl">{T('hub_side1_stat2_lbl', lang)}</div>
                </div>
              </div>
            </div>
            <div className="side-card">
              <div className="head">
                <div className="ico"><Icon.Pulse size={18} /></div>
                <h4>{T('hub_side2_title', lang)}</h4>
              </div>
              <ol style={{ margin: 0, paddingLeft: 18, color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.7 }}>
                <li>{T('hub_side2_li1', lang)}</li>
                <li>{T('hub_side2_li2', lang)}</li>
                <li>{T('hub_side2_li3', lang)}</li>
              </ol>
            </div>
            <div className="side-card">
              <div className="head">
                <div className="ico"><Icon.Mail size={18} /></div>
                <h4>{T('hub_side3_title', lang)}</h4>
              </div>
              <p>
                <strong>acoe@example.com</strong><br/>
                {T('hub_side3_body_slack', lang)} <span style={{ color: 'var(--blue)', fontWeight: 700 }}>#acoe-help</span><br/>
                {T('hub_side3_body_office', lang)}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

window.Hub = Hub;
