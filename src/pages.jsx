/* global React */
const { useState, useEffect } = React;

// ============================================
// PROJECT DETAIL PAGE — per Presley's wireframe
// Title hero card + ROLE/INFO/INFO meta strip + featured shot with quote + thumb strip
// ============================================
window.ProjectDetail = function ProjectDetail({ title = "Dike Or Strike", back }) {
  // Project metadata — data-driven per project
  const projectData = {
    "Dike Or Strike": {
      slug: "dike-or-strike",
      role: { lbl: "Role", v: "UI Designer · UX Researcher · Systems Designer", desc: "Led UI design, conducted 88+ cultural probes, interviews, and playtests." },
      info2: { lbl: "Client / Genre", v: "Groningen Provincial House · Co-op Strategy", desc: "Group project — board game-inspired interface with Dutch identity." },
      info3: { lbl: "Tools", v: "Figma · Unity · Blender · Jira", desc: "Interfaces readable over 3-meter distances, embedded Dutch visual language." },
      thumbLabels: ["One-pager overview", "Character selection", "Main menu", "Gameplay tutorial", "Quest screen"],
      thumbCount: 5
    },
    "Oops! A Data Breach": {
      slug: "oops-data-breach",
      role: { lbl: "Role", v: "Solo UI Designer · UX Researcher", desc: "End-to-end UI/UX for an educational cybersecurity game." },
      info2: { lbl: "Client / Genre", v: "University of Groningen · Educational", desc: "Team project — stealth learning through intuitive interactions." },
      info3: { lbl: "Tools", v: "Figma · Unity · Trello · Miro", desc: "Designed for short 2–5 minute play sessions, matching 70% of participants' preferred session length." },
      thumbLabels: ["Isometric campus hub", "Pipe puzzle", "Word puzzle", "Characters", "Achievements"],
      thumbCount: 5
    },
    "Walls of Eden": {
      slug: "walls-of-eden",
      role: { lbl: "Role", v: "UI/UX Designer · Narrative System · 3D & Texturing", desc: "UI as storytelling medium — reinforcing corporate influence through visual language." },
      info2: { lbl: "Genre", v: "VR Game · Dystopian", desc: "Group project — moral choices with consequence-driven interactions." },
      info3: { lbl: "Tools", v: "Figma · Blender · Substance Painter · Trello", desc: "Cohesive visual identity for in-world corporation, integrated branding into gameplay." },
      thumbLabels: ["Visor interface", "Moral choice UI", "In-game view", "SafeHaven logo", "Commission screen"],
      thumbCount: 5
    },
    "Folkloric Character": {
      slug: "folkloric-character",
      role: { lbl: "Role", v: "Character Designer · Texturing", desc: "Solo project — narrative-first character design." },
      info2: { lbl: "Type", v: "Solo · 3D Character", desc: "Every visual decision informed by a complete fictional history." },
      info3: { lbl: "Tools", v: "Blender · Substance Painter", desc: "Three expressions (Malice, Sensory Overload, Starvation) via shape keys." },
      thumbLabels: ["Character render — front", "Character render — alternate lighting", "Mask wireframe topology"],
      thumbCount: 3
    }
  };
  const data = projectData[title] || projectData["Dike Or Strike"];
  const meta = { role: data.role, info2: data.info2, info3: data.info3 };
  const [active, setActive] = useState(0);
  const thumbs = data.thumbLabels;
  const slug = data.slug;
  const thumbCount = data.thumbCount || thumbs.length;
  // Build image paths — hero for featured, thumb-N for thumbnails
  const heroImg = slug ? `assets/projects/${slug}/hero.webp` : null;
  const thumbImgs = [];
  for (let i = 1; i <= thumbCount; i++) {
    thumbImgs.push(`assets/projects/${slug}/thumb-${i}.webp`);
  }

  return (
    <div className="page active">
      <CathedralBg intensity={0.5} />

      <section className="proj-title-hero">
        <div className="crumbs">
          <a href="#" onClick={(e) => { e.preventDefault(); back && back(); }}>← Work</a>
        </div>
        <div className="title-card">
          <div className="num">PROJECT · {title.toUpperCase()}</div>
          <h1>{title}</h1>
        </div>
        <div className="year">2026</div>
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
        <div className="frame" style={heroImg ? { backgroundImage: `url(${thumbImgs.length > 0 ? thumbImgs[active] : heroImg})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}>
          <div className="quote-overlay">
            <span className="kicker">{title.toUpperCase()}</span>
            <blockquote>
              "Player-centred design that transforms complex systems into intuitive,
              emotionally engaging experiences."
            </blockquote>
            <footer>— Project overview</footer>
          </div>
        </div>
        {thumbCount > 0 && (
          <div className="proj-thumbs">
            {thumbImgs.map((src, i) => (
              <div key={i}
                   className={"th" + (i === active ? " active" : "")}
                   onClick={() => setActive(i)}>
                <img src={src} alt={thumbs[i] || `${title} screenshot ${i + 1}`} loading="lazy"
                     style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Next project */}
      <section className="container" style={{ padding: "60px 40px 120px", maxWidth: 1480, margin: "0 auto" }}>
        <a href="#" className="proj-card span-12" style={{ display: "block", aspectRatio: "21/9" }}
           onClick={(e) => { e.preventDefault(); back && back(); }}>
          <div className="placeholder">← Back to all projects</div>
          <div className="meta">
            <span className="title">View all projects</span>
            <span className="role">Work Index →</span>
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
    { num: "01", t: "Dike Or Strike", r: "UI/UX · Systems Design", y: "2026", tag: "Strategy", bg: "linear-gradient(135deg, #2a4a2a, #1a0e0a)", img: "assets/projects/dike-or-strike/hero.webp" },
    { num: "02", t: "Oops! A Data Breach", r: "Solo UI/UX · Research", y: "2026", tag: "Educational", bg: "linear-gradient(135deg, #1a2a4a, #0a0a1e)", img: "assets/projects/oops-data-breach/hero.webp" },
    { num: "03", t: "Walls of Eden", r: "UI/UX · Narrative · 3D", y: "2025", tag: "VR Game", bg: "linear-gradient(135deg, #0a2a3a, #040810)", img: "assets/projects/walls-of-eden/hero.webp" },
    { num: "04", t: "Folkloric Character", r: "Character Design · Texturing", y: "2025", tag: "3D Solo", bg: "linear-gradient(135deg, #3a2a4a, #0e0814)", img: "assets/projects/folkloric-character/hero.webp" }
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
            Selected<br/><em>Work.</em>
          </h1>
          <p className="lede" style={{ marginTop: 30, maxWidth: 600 }}>
            Game UI/UX, narrative systems, 3D character design — projects built at the
            intersection of player experience and visual storytelling.
          </p>
        </Reveal>
      </section>

      <section className="container" ref={containerRef} style={{ position: "relative" }}>
        {/* Floating preview thumbnail */}
        {hovered !== null && (
          <div key={hovered} className="work-preview-float" style={{
            left: mousePos.x + 20,
            top: mousePos.y - 80,
            background: projects[hovered].bg
          }}>
            {projects[hovered].img && (
              <img src={projects[hovered].img} alt="" style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", pointerEvents: "none"
              }} />
            )}
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
            I'm a <strong>UI/UX &amp; VFX artist</strong> based in Groningen, Netherlands —
            studying Creative Media &amp; Game Technologies at Hanze University. I design
            player-centred interfaces, narrative systems, and atmospheric 3D worlds.
          </p>
          <p>
            My work sits at the intersection of <strong>behavioral design, emotional design,
            and atmosphere</strong> — using visual hierarchy, information architecture, and
            environmental storytelling to create experiences that feel intuitive and immersive.
          </p>
          <p>
            Open for collaborations and project work. If your project needs thoughtful
            interaction design or atmospheric visual storytelling, let's talk.
          </p>

          <div className="about-list">
            <div>
              <div className="label">Skills</div>
              <ul>
                <li>UI/UX Design <span>01</span></li>
                <li>UX Research <span>02</span></li>
                <li>Systems Design <span>03</span></li>
                <li>3D &amp; Texturing <span>04</span></li>
                <li>Character Design <span>05</span></li>
              </ul>
            </div>
            <div>
              <div className="label">Tools</div>
              <ul>
                <li>Figma <span>·</span></li>
                <li>Blender <span>·</span></li>
                <li>Substance Painter <span>·</span></li>
                <li>Unity <span>·</span></li>
                <li>Unreal Engine <span>·</span></li>
                <li>Illustrator <span>·</span></li>
              </ul>
            </div>
            <div>
              <div className="label">Selected projects</div>
              <ul>
                <li>Dike Or Strike <span>2026</span></li>
                <li>Oops! A Data Breach <span>2026</span></li>
                <li>Walls of Eden <span>2025</span></li>
                <li>Folkloric Character <span>2025</span></li>
              </ul>
            </div>
            <div>
              <div className="label">Design principles</div>
              <ul>
                <li>Behavioral Design <span>·</span></li>
                <li>Emotional Design <span>·</span></li>
                <li>Atmosphere Design <span>·</span></li>
                <li>Rapid Iteration <span>·</span></li>
                <li>Information Hierarchy <span>·</span></li>
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
            <span className="email">pp.hey@st.hanze.nl</span>
          </span>
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 P.Y.</span><span>About</span><span>Groningen / Worldwide</span>
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
          Let's create<br/><em>something</em><br/>together.
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginTop: 80, paddingTop: 60, borderTop: "1px solid var(--line)" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>Direct</div>
            <div className="serif" style={{ fontSize: 36 }}>pp.hey@st.hanze.nl</div>
            <p style={{ color: "var(--ink-dim)", marginTop: 16, maxWidth: 400 }}>
              Best for project inquiries, collaborations, and longer notes. Replies within 48h.
            </p>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>Elsewhere</div>
            <ul style={{ listStyle: "none" }}>
              {["Instagram · @presley.yrd", "LinkedIn · presleyyordanov"].map(s => (
                <li key={s} style={{ padding: "14px 0", borderBottom: "1px solid var(--line)", fontFamily: "var(--serif)", fontSize: 22 }}>{s} <span style={{ float: "right", color: "var(--ink-mute)", fontFamily: "var(--mono)", fontSize: 12 }}>↗</span></li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ marginTop: 80, paddingTop: 40, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div><div className="eyebrow" style={{ marginBottom: 8 }}>Status</div><div>Open for projects</div></div>
          <div><div className="eyebrow" style={{ marginBottom: 8 }}>Located</div><div>Groningen, NL</div></div>
          <div><div className="eyebrow" style={{ marginBottom: 8 }}>Study</div><div>Hanze University</div></div>
          <div><div className="eyebrow" style={{ marginBottom: 8 }}>Hours</div><div>CET / 09 — 19</div></div>
        </div>
      </section>

      <footer className="footer"><span>© 2026 P.Y.</span><span>Contact</span><span>EOF</span></footer>
    </div>
  );
};
