/* global React */
const { useState, useEffect, useRef } = React;

// ============================================
// HOME — Variant 2: "Editorial"
// More minimal/redactional. Big serif, less BG, marquee → vertical feed
// ============================================
window.HomeEditorial = function HomeEditorial() {
  return (
    <div className="page active">
      <CathedralBg intensity={0.35} />

      <section className="hero" style={{ alignItems: "flex-start", textAlign: "left", paddingLeft: 80, paddingRight: 80 }}>
        <div className="hero-eyebrow">
          <span className="dot" />
          <span className="eyebrow">Index № 001 · Spring 2026</span>
        </div>
        <h1 className="serif" style={{ fontSize: "clamp(72px, 11vw, 220px)", lineHeight: 0.92 }}>
          Presley<br/>Yordanov<sup style={{ fontSize: "0.3em", verticalAlign: "super", marginLeft: 12, color: "var(--violet-300)" }}>©</sup>
        </h1>
        <p className="hero-sub" style={{ marginTop: 30, marginLeft: 0 }}>
          A UI/UX &amp; VFX Artist designing player-centred interfaces, narrative
          systems &amp; atmospheric 3D worlds. Selected work and a way to write me.
        </p>
        <div className="hero-cta" style={{ marginTop: 40 }}>
          <a href="#index" className="btn">Index of work →</a>
          <a href="#contact" className="btn">Contact</a>
        </div>
      </section>

      {/* Editorial vertical feed */}
      <section className="container" id="index">
        <div className="section-head">
          <h2 className="serif"><em>The</em> Index</h2>
          <div className="meta">12 entries / sorted by year</div>
        </div>

        <div style={{ display: "grid", gap: 80, paddingBottom: 100 }}>
          {[
            { num: "01", title: "Dike Or Strike", role: "UI/UX · Systems Design", year: "2026" },
            { num: "02", title: "Oops! A Data Breach", role: "Solo UI/UX · Research", year: "2026" },
            { num: "03", title: "Walls of Eden", role: "UI/UX · Narrative · 3D", year: "2025" },
            { num: "04", title: "Folkloric Character", role: "Character Design · Texturing", year: "2025" }
          ].map((p, i) => (
            <Reveal key={p.num} delay={i * 60}>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 40, alignItems: "start" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".18em", color: "var(--ink-mute)" }}>
                  № {p.num}<br/>{p.year}
                </div>
                <div>
                  <div className="proj-card" style={{ aspectRatio: "21/9", marginBottom: 24, gridColumn: "auto" }}>
                    <div className="placeholder">{p.title}</div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid var(--line)", paddingBottom: 16 }}>
                    <h3 className="serif" style={{ fontSize: 36 }}>{p.title}</h3>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-dim)" }}>
                      {p.role}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container contact-block" id="contact">
        <h2 className="serif"><em>Write</em> me.</h2>
        <div style={{ marginTop: 40 }}>
          <span className="contact-pill">
            <span>Direct</span>
            <span className="email">pp.hey@st.hanze.nl</span>
          </span>
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 P.Y.</span><span>Index 001 / Spring</span><span>Set in Cormorant &amp; Inter</span>
      </footer>
      <ContactPopup />
    </div>
  );
};

// ============================================
// HOME — Variant 3: "Cyber Cathedral"
// Tech / glitch hybrid. Big mask hero, terminal-feel
// ============================================
window.HomeCyber = function HomeCyber() {
  const maskRef = useRef(null);
  useEffect(() => {
    const onMove = (e) => {
      if (!maskRef.current) return;
      const rect = maskRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      maskRef.current.style.transform = `perspective(900px) rotateY(${dx * 18}deg) rotateX(${-dy * 12}deg) translate(-50%, -50%)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="page active">
      <CathedralBg intensity={0.6} />

      {/* hero with mask center, big text behind */}
      <section className="hero" style={{ minHeight: "100vh", padding: 0, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <h1 className="serif" style={{
            fontSize: "clamp(120px, 22vw, 360px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(184,168,212,0.35)",
            letterSpacing: "-0.02em",
            textAlign: "center",
            lineHeight: 0.85
          }}>
            UI/UX<br/>&amp; VFX
          </h1>
        </div>
        <img
          ref={maskRef}
          src="assets/mask-placeholder.svg"
          style={{
            position: "absolute",
            top: "52%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(420px, 32vw)",
            transition: "transform 0.15s ease-out",
            filter: "drop-shadow(0 30px 80px rgba(122,79,204,0.6))"
          }}
          alt=""
        />
        <div style={{ position: "absolute", left: 40, bottom: 40, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".18em", color: "var(--ink-mute)", textTransform: "uppercase" }}>
          PRESLEY.YORDANOV / SYS.001
        </div>
        <div style={{ position: "absolute", right: 40, bottom: 40, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".18em", color: "var(--ink-mute)", textTransform: "uppercase", textAlign: "right" }}>
          STATUS — AVAILABLE<br/>OPEN FOR PROJECTS / 26
        </div>
      </section>

      {/* Tech grid */}
      <section className="container">
        <div className="section-head">
          <h2 className="serif">Project<br/><em>archive</em></h2>
          <div className="meta">QUERY * FROM works WHERE year &gt;= 2023</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--line)", border: "1px solid var(--line)", marginBottom: 80 }}>
          {[
            ["Dike Or Strike", "UI/UX", "2026", "Strategy"],
            ["Oops! A Data Breach", "UI/UX", "2026", "Educational"],
            ["Walls of Eden", "VR/3D", "2025", "Narrative"],
            ["Folkloric Character", "3D", "2025", "Character"]
          ].map(([t, r, y, m], i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="proj-card" style={{ borderRadius: 0, border: "none", aspectRatio: "1 / 1" }}>
                <div className="placeholder">{t}</div>
                <div className="meta" style={{ flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
                  <span className="title">{t}</span>
                  <span className="role" style={{ display: "flex", gap: 12 }}>
                    <span>{r}</span><span>·</span><span>{y}</span><span>·</span><span>{m}</span>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container contact-block">
        <div className="eyebrow" style={{ marginBottom: 18, fontFamily: "var(--mono)" }}>// CONTACT</div>
        <h2 className="serif"><em>Initiate</em> contact.</h2>
        <div style={{ marginTop: 40 }}>
          <span className="contact-pill">
            <span>Channel open at</span>
            <span className="email">pp.hey@st.hanze.nl</span>
          </span>
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 / P.Y.SYS</span><span>build 26.07.02</span><span>Groningen ↔ Worldwide</span>
      </footer>
      <ContactPopup />
    </div>
  );
};
