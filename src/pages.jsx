/* global React */
const { useState, useEffect } = React;

// ============================================
// PROJECT DETAIL PAGE — per Presley's wireframe
// Title hero card + ROLE/INFO/INFO meta strip + featured shot with quote + thumb strip
// ============================================
window.ProjectDetail = function ProjectDetail({ title = "Golden Hour", back }) {
  // Project metadata — would be data-driven once Presley sends real materials
  const meta = {
    role: { lbl: "Role", v: "Director · Editor · Colorist", desc: "Solo from on-set direction through post." },
    info2: { lbl: "Year / Length", v: "2025 · 1:32", desc: "Three shoot days, ten days of post." },
    info3: { lbl: "Tools", v: "Resolve · After Effects · C4D", desc: "CG license plate replacement and ground reflection grading in C4D." }
  };
  const [active, setActive] = useState(0);
  const thumbs = [
    "Hero — sunset wall",
    "Tracking — A-road",
    "Detail — wing",
    "Detail — wheel",
    "Closing — wide"
  ];

  return (
    <div className="page active">
      <CathedralBg intensity={0.5} />

      <section className="proj-title-hero">
        <div className="crumbs">
          <a href="#" onClick={(e) => { e.preventDefault(); back && back(); }}>← Work</a>
        </div>
        <div className="title-card">
          <div className="num">PROJECT № 01 / GH-2025</div>
          <h1>{title}</h1>
        </div>
        <div className="year">2025</div>
      </section>

      <section className="proj-meta-strip">
        <Reveal className="cell" delay={0}>
          <span className="lbl">{meta.role.lbl}</span>
          <span className="v">{meta.role.v}</span>
          <span className="desc">{meta.role.desc}</span>
        </Reveal>
        <Reveal className="cell" delay={80}>
          <span className="lbl">{meta.info2.lbl}</span>
          <span className="v">{meta.info2.v}</span>
          <span className="desc">{meta.info2.desc}</span>
        </Reveal>
        <Reveal className="cell" delay={160}>
          <span className="lbl">{meta.info3.lbl}</span>
          <span className="v">{meta.info3.v}</span>
          <span className="desc">{meta.info3.desc}</span>
        </Reveal>
      </section>

      <section className="proj-featured">
        <div className="frame">
          <div className="quote-overlay">
            <span className="kicker">{title.toUpperCase()}</span>
            <blockquote>
              "The team's ability to transform ideas into stunning visuals is unmatched on
              many levels. Every project feels like a work of art with purpose."
            </blockquote>
            <footer>— Liam Carter, Creative Director · LBWK</footer>
          </div>
        </div>
        <div className="proj-thumbs">
          {thumbs.map((t, i) => (
            <div key={i}
                 className={"th" + (i === active ? " active" : "")}
                 onClick={() => setActive(i)}>
              <div className="ph" />
            </div>
          ))}
        </div>
      </section>

      {/* Next project */}
      <section className="container" style={{ padding: "60px 40px 120px", maxWidth: 1480, margin: "0 auto" }}>
        <a href="#" className="proj-card span-12" style={{ display: "block", aspectRatio: "21/9" }}
           onClick={(e) => { e.preventDefault(); back && back(); }}>
          <div className="placeholder">Next — Mask of Utopia</div>
          <div className="meta">
            <span className="title">Next: Mask of Utopia</span>
            <span className="role">3D · 2024 →</span>
          </div>
        </a>
      </section>

      <footer className="footer">
        <span>© 2026 Presley Yordanov</span><span>{title}</span><span>↑ Top</span>
      </footer>
      <ContactPopup />
    </div>
  );
};

// ============================================
// WORK INDEX PAGE — list of all projects
// ============================================
window.WorkIndex = function WorkIndex({ goProject }) {
  const projects = [
    { num: "01", t: "Golden Hour", r: "Color · Edit · Direction", y: "2025", tag: "Motorsport", bg: "linear-gradient(135deg, #c87a4a, #6a2820)" },
    { num: "02", t: "Mask of Utopia", r: "3D · Cinematic", y: "2024", tag: "Personal", bg: "linear-gradient(135deg, #3a2050, #0a0414)" },
    { num: "03", t: "Stage Visuals — Rite", r: "Direction · Live", y: "2025", tag: "Music", bg: "linear-gradient(135deg, #5a4080, #1a0e2e)" },
    { num: "04", t: "Ethereal Designs", r: "Brand · CGI", y: "2024", tag: "Brand", bg: "linear-gradient(135deg, #b8a890, #4a3a2a)" },
    { num: "05", t: "Chronos 01", r: "Sculpture · R&D", y: "2023", tag: "Personal", bg: "linear-gradient(135deg, #1a1525, #050208)" },
    { num: "06", t: "Neural Echoes", r: "Generative", y: "2024", tag: "Personal", bg: "linear-gradient(135deg, #2a3a50, #0a1420)" }
  ];
  const [hovered, setHovered] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const onRowMove = (e, i) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setHovered(i);
  };

  return (
    <div className="page active">
      <CathedralBg intensity={0.4} />

      <section className="container" style={{ paddingTop: 160, paddingBottom: 60 }}>
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 24 }}>Work · Index № 001</div>
          <h1 className="serif" style={{ fontSize: "clamp(72px, 11vw, 200px)", lineHeight: 0.92 }}>
            Things <em>I've</em><br/>made.
          </h1>
          <p className="lede" style={{ marginTop: 30, maxWidth: 600 }}>
            A working archive — VFX, direction, color and a few personal experiments in
            sculpture and stage design.
          </p>
        </Reveal>
      </section>

      <section className="container" ref={containerRef} style={{ position: "relative" }}>
        {/* Floating preview thumbnail */}
        {hovered !== null && (
          <div className="work-preview-float" style={{
            left: mousePos.x + 20,
            top: mousePos.y - 80,
            background: projects[hovered].bg
          }}>
            <span className="work-preview-label">{projects[hovered].t}</span>
          </div>
        )}
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {projects.map((p, i) => (
            <Reveal key={p.num} delay={i * 80}>
              <a href="#"
                 onClick={(e) => { e.preventDefault(); goProject && goProject(p.t); }}
                 className="work-row"
                 onMouseMove={(e) => onRowMove(e, i)}
                 onMouseLeave={() => setHovered(null)}>
                <span className="work-row-num">№ {p.num}</span>
                <span className="work-row-title serif">{p.t}</span>
                <span className="work-row-role">{p.r}</span>
                <span className="chip">{p.tag}</span>
                <span className="work-row-year">{p.y} →</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="footer" style={{ marginTop: 100 }}>
        <span>© 2026 P.Y.</span><span>Index 001</span><span>↑ Top</span>
      </footer>
      <ContactPopup />
    </div>
  );
};

// ============================================
// ABOUT PAGE
// ============================================
window.AboutPage = function AboutPage() {
  return (
    <div className="page active">
      <CathedralBg intensity={0.45} />

      <section className="container about-hero">
        <div className="eyebrow" style={{ marginBottom: 24 }}>About</div>
        <h1 className="serif" style={{ fontSize: "clamp(60px, 9vw, 160px)" }}>
          Hey, I'm <em>Presley</em>.
        </h1>
      </section>

      <section className="container about-grid">
        <div className="about-portrait" />
        <div className="about-bio">
          <p>
            I'm a <strong>VFX &amp; Etc artist</strong> based in Sofia, Bulgaria —
            working between music, motorsport and brand. I direct, shoot, edit, color
            and sometimes sculpt entire worlds in 3D.
          </p>
          <p>
            My work tends toward the <strong>cinematic and slightly haunted</strong> —
            big sculptural objects, golden hours, and the kind of lighting that feels
            like it belongs in a chapel. I like making real things in CG, and CG things
            that feel real.
          </p>
          <p>
            Currently taking on select commissions for Q3 and Q4. If your project has
            an unreasonable visual ambition, we'll probably get along.
          </p>

          <div className="about-list">
            <div>
              <div className="label">Services</div>
              <ul>
                <li>Direction <span>01</span></li>
                <li>VFX &amp; Compositing <span>02</span></li>
                <li>3D / CGI <span>03</span></li>
                <li>Color &amp; Edit <span>04</span></li>
                <li>Stage / Live visuals <span>05</span></li>
              </ul>
            </div>
            <div>
              <div className="label">Tools</div>
              <ul>
                <li>Resolve <span>·</span></li>
                <li>After Effects <span>·</span></li>
                <li>Cinema 4D <span>·</span></li>
                <li>Houdini <span>·</span></li>
                <li>Nuke <span>·</span></li>
              </ul>
            </div>
            <div>
              <div className="label">Selected clients</div>
              <ul>
                <li>LBWK Performance <span>2025</span></li>
                <li>Ethereal Designs <span>2024</span></li>
                <li>Datmaxp.jet <span>2024</span></li>
                <li>Various artists <span>2023+</span></li>
              </ul>
            </div>
            <div>
              <div className="label">Recognition</div>
              <ul>
                <li>Vimeo Staff Pick <span>×2</span></li>
                <li>Motion Awards Shortlist <span>2025</span></li>
                <li>Stash Mag feature <span>2024</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container contact-block">
        <h2 className="serif"><em>Want to</em> work together?</h2>
        <div style={{ marginTop: 40 }}>
          <span className="contact-pill">
            <span>Send me a message at</span>
            <span className="email">hey@presleyyordanov.com</span>
          </span>
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 P.Y.</span><span>About</span><span>Sofia / Worldwide</span>
      </footer>
      <ContactPopup />
    </div>
  );
};

// ============================================
// CONTACT PAGE
// ============================================
window.ContactPage = function ContactPage() {
  return (
    <div className="page active">
      <CathedralBg intensity={0.6} />

      <section className="container" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "140px 40px 60px" }}>
        <div className="eyebrow" style={{ marginBottom: 24 }}>— Contact</div>
        <h1 className="serif" style={{ fontSize: "clamp(72px, 12vw, 220px)", lineHeight: 0.9 }}>
          Let's make<br/><em>something</em><br/>rare.
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginTop: 80, paddingTop: 60, borderTop: "1px solid var(--line)" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>Direct</div>
            <div className="serif" style={{ fontSize: 36 }}>hey@presleyyordanov.com</div>
            <p style={{ color: "var(--ink-dim)", marginTop: 16, maxWidth: 400 }}>
              Best for project briefs, quotes and longer notes. Replies within 48h.
            </p>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>Elsewhere</div>
            <ul style={{ listStyle: "none" }}>
              {["Instagram · @presley.yrd", "Vimeo · presleyyordanov", "Are.na · presley", "LinkedIn · presleyyordanov"].map(s => (
                <li key={s} style={{ padding: "14px 0", borderBottom: "1px solid var(--line)", fontFamily: "var(--serif)", fontSize: 22 }}>{s} <span style={{ float: "right", color: "var(--ink-mute)", fontFamily: "var(--mono)", fontSize: 12 }}>↗</span></li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ marginTop: 80, paddingTop: 40, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div><div className="eyebrow" style={{ marginBottom: 8 }}>Booking</div><div>Q3 — Q4 / 2026</div></div>
          <div><div className="eyebrow" style={{ marginBottom: 8 }}>Located</div><div>Sofia, BG</div></div>
          <div><div className="eyebrow" style={{ marginBottom: 8 }}>Travel</div><div>Worldwide</div></div>
          <div><div className="eyebrow" style={{ marginBottom: 8 }}>Hours</div><div>UTC+2 / 09 — 19</div></div>
        </div>
      </section>

      <footer className="footer"><span>© 2026 P.Y.</span><span>Contact</span><span>EOF</span></footer>
    </div>
  );
};
