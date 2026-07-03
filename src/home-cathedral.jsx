/* global React */
const { useState, useEffect, useRef } = React;

// ============================================
// HOME — Cathedral (redesign per Presley's wireframes 2026-05)
// Hero (TEXT TITLE + 3 cards) → Carousel → Bento → Mask → About/CV → Contact
// ============================================
window.HomeCathedral = function HomeCathedral({ goProject }) {
  return (
    <div className="page active">
      <CathedralBg intensity={1} />
      <HomeHero goProject={goProject} />
      <CarouselSection goProject={goProject} />
      <BentoGallery goProject={goProject} />
      <MaskSection />
      <HomeAbout />
      <HomeContact />
      <footer className="footer">
        <span>© 2026 Presley Yordanov</span>
        <span>Groningen / Worldwide</span>
        <span>Last updated · 02.07.26</span>
      </footer>
      <ContactPopup />
    </div>
  );
};

// ============================================
// HERO — big TEXT TITLE + 3-card image module
// ============================================
window.HomeHero = function HomeHero({ goProject }) {
  return (
    <section className="home-hero">
      <div className="eyebrow-row">
        <span><span className="live-dot" />Groningen, NL — open for projects, 2026</span>
        <span className="ix">Index № 001 · UI/UX · VFX</span>
      </div>

      <div className="home-hero-stage">
        <h1 className="title">
          UI/UX · VFX<br/><em>Artist.</em>
        </h1>
        <p className="title-sub">
          Presley Yordanov — designing player-centred interfaces, narrative-driven
          systems &amp; atmospheric 3D worlds. Groningen &amp; worldwide.
        </p>
      </div>

      <div className="hero-foot">
        <span className="hero-foot-l">Scroll to selected work ↓</span>
        <span className="hero-foot-r">Hanze University · Creative Media &amp; Game Technologies</span>
      </div>
    </section>
  );
};

// ============================================
// CAROUSEL — full-width crossfade, modern controls
// ============================================
window.CarouselSection = function CarouselSection({ goProject }) {
  const slides = [
    {
      title: "Dike Or Strike",
      em: "Strike",
      kicker: "Strategy · Groningen Provincial House",
      role: "UI Design · UX Research · Systems Design",
      desc: "A local co-op strategy game transforming democracy into a meaningful, emotionally engaging experience through player agency and community-driven decision making.",
      bg: "linear-gradient(135deg, #2a4a2a 0%, #1a0e0a 100%)",
      img: "assets/projects/dike-or-strike/hero.webp"
    },
    {
      title: "Oops! A Data Breach",
      em: "Breach",
      kicker: "Educational · University of Groningen",
      role: "Solo UI/UX Design · Research",
      desc: "A cybersecurity learning game with stealth education through intuitive interactions and player-centred UX, designed for short 2–5 minute sessions.",
      bg: "linear-gradient(135deg, #1a2a4a 0%, #0a0a1e 100%)",
      img: "assets/projects/oops-data-breach/hero.webp"
    },
    {
      title: "Walls of Eden",
      em: "Eden",
      kicker: "VR Game · Group Project",
      role: "UI/UX Design · Narrative System · 3D & Texturing",
      desc: "A dystopian VR game using interface design as a storytelling medium — reinforcing narrative themes, player morality, and corporate influence through visual language.",
      bg: "linear-gradient(135deg, #0a2a3a 0%, #040810 100%)",
      img: "assets/projects/walls-of-eden/hero.webp"
    },
    {
      title: "Folkloric Character",
      em: "Character",
      kicker: "3D · Solo Project",
      role: "Character Design · Texturing",
      desc: "A narrative-driven creature whose identity is communicated through silhouette, expression, and texturing — designed to feel almost human, but unmistakably wrong.",
      bg: "linear-gradient(135deg, #3a2a4a 0%, #0e0814 100%)",
      img: "assets/projects/folkloric-character/hero.webp"
    }
  ];
  const [idx, setIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);
  const idxRef = useRef(0);        // always holds current index — avoids stale closures
  const autoRef = useRef(null);
  const pausedRef = useRef(false);  // track hover state
  const total = slides.length;

  const goTo = (newIdx) => {
    if (newIdx === idxRef.current) return;
    setPrevIdx(idxRef.current);
    idxRef.current = newIdx;
    setIdx(newIdx);
    setTimeout(() => setPrevIdx(null), 900);
  };
  const goPrev = () => goTo((idxRef.current - 1 + total) % total);
  const goNext = () => goTo((idxRef.current + 1) % total);

  // Auto-play every 7s, pauses on hover
  useEffect(() => {
    autoRef.current = setInterval(() => {
      if (pausedRef.current) return;         // skip tick while hovered
      goTo((idxRef.current + 1) % total);
    }, 7000);
    return () => clearInterval(autoRef.current);
  }, [total]);

  const onEnter = () => { pausedRef.current = true; };
  const onLeave = () => { pausedRef.current = false; };

  // Progress bar for current slide
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const dur = 7000;
    let raf;
    const tick = () => {
      if (pausedRef.current) { raf = requestAnimationFrame(tick); return; }
      const elapsed = Date.now() - start;
      setProgress(Math.min(elapsed / dur, 1));
      if (elapsed < dur) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [idx]);

  return (
    <section className="carousel-section">
      <Reveal>
        <div className="carousel-head">
          <h2>Selected<br/><em>Work</em></h2>
        </div>
      </Reveal>
      <div className="carousel-fw" onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {/* All slides stacked, crossfade via opacity */}
        <div className="carousel-fw-stack">
          {slides.map((s, i) => (
            <div key={i}
                 className={"carousel-fw-slide" + (i === idx ? " active" : "") + (i === prevIdx ? " leaving" : "")}
                 style={{
                   background: s.bg,
                   backgroundImage: s.img ? `url(${s.img})` : undefined,
                   backgroundSize: "cover",
                   backgroundPosition: "center"
                 }}
                 onClick={() => goProject && goProject(s.title)}>
              <div className="carousel-fw-scrim" />
              <div className="carousel-fw-content">
                <span className="carousel-fw-kicker">{s.kicker}</span>
                <h3 className="carousel-fw-title">{s.title.replace(s.em, "").trim()} <em>{s.em}</em></h3>
                <span className="carousel-fw-role">{s.role}</span>
                <p className="carousel-fw-desc">{s.desc}</p>
              </div>
              <span className="carousel-fw-cta"
                    onClick={(e) => { e.stopPropagation(); goProject && goProject(s.title); }}>
                View project <span>→</span>
              </span>
            </div>
          ))}
        </div>

        {/* Controls — bottom bar */}
        <div className="carousel-fw-controls">
          <div className="carousel-fw-nav">
            <button className="carousel-fw-btn" onClick={goPrev} aria-label="Previous">←</button>
            <button className="carousel-fw-btn" onClick={goNext} aria-label="Next">→</button>
          </div>
          <div className="carousel-fw-indicators">
            {slides.map((s, i) => (
              <button key={i}
                      className={"carousel-fw-ind" + (i === idx ? " active" : "")}
                      onClick={() => goTo(i)}>
                <span className="carousel-fw-ind-label">{String(i + 1).padStart(2, "0")}</span>
                <span className="carousel-fw-ind-title">{s.title}</span>
                {i === idx && <span className="carousel-fw-ind-bar" style={{ transform: `scaleX(${progress})` }} />}
              </button>
            ))}
          </div>
          <div className="carousel-fw-count">
            {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// BENTO — Koto-style asymmetric grid, imagery does the work
// ============================================
window.BentoGallery = function BentoGallery({ goProject }) {
  const tiles = [
    { kicker: "Strategy", title: "Dike Or Strike — board game-inspired UI for democratic gameplay", icon: "⚔", c: "c7", r: "r2", k: "dike", img: "assets/projects/dike-or-strike/hero.webp", proj: "Dike Or Strike" },
    { kicker: "UI/UX", title: "Dike Or Strike — character selection and menu systems", icon: "◈", c: "c5", k: "dike-ui", img: "assets/projects/dike-or-strike/thumb-2.webp", proj: "Dike Or Strike" },
    { kicker: "Educational", title: "Oops! Data Breach — isometric campus hub and puzzle screens", icon: "🛡", c: "c5", k: "oops", img: "assets/projects/oops-data-breach/hero.webp", proj: "Oops! A Data Breach" },
    { kicker: "VR", title: "Walls of Eden — dystopian narrative UI and moral choice system", icon: "◎", c: "c5", k: "eden", img: "assets/projects/walls-of-eden/thumb-2.webp", proj: "Walls of Eden" },
    { kicker: "Narrative", title: "Walls of Eden — VR visor interface and corporate branding", icon: "⊕", c: "c7", k: "eden-vr", img: "assets/projects/walls-of-eden/hero.webp", proj: "Walls of Eden" },
    { kicker: "3D", title: "Folkloric Character — creature with three emotional expressions", icon: "Ø", c: "c4", k: "folk", img: "assets/projects/folkloric-character/hero.webp", proj: "Folkloric Character" },
    { kicker: "Texturing", title: "Folkloric Character — mask as narrative device, silver burns and engravings", icon: "◷", c: "c8", k: "folk-mask", img: "assets/projects/folkloric-character/hero.webp", proj: "Folkloric Character" }
  ];

  return (
    <section className="bento-section">
      <Reveal>
        <div className="bento-head">
          <h2><em>Gallery</em></h2>
          <div className="meta">{String(tiles.length).padStart(2, "0")} projects<br/>Scroll →</div>
        </div>
      </Reveal>
      <div className="bento">
        {tiles.map((t, i) => (
          <Reveal key={t.k} className={"tile " + (t.c || "c4") + " " + (t.r || "")} delay={i * 60}>
            {t.img ? (
              <img src={t.img} alt={t.title} className="tile-bg" loading="lazy" />
            ) : (
              <div className="ph">{t.kicker}</div>
            )}
            <span className="icon">{t.icon}</span>
            <div className="meta">
              <span className="kicker">{t.kicker}</span>
              <span className="title">{t.title}</span>
              <span className="arrow">→ view project</span>
            </div>
            <a href="#" className="tile-hit"
               onClick={(e) => { e.preventDefault(); goProject && goProject(t.proj || t.title); }}
               style={{ position: "absolute", inset: 0, zIndex: 3 }} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

// ============================================
// MASK SECTION — Folkloric Character Design showcase
// Interactive 3D model with expression switching via morph targets
// ============================================
window.MaskSection = function MaskSection() {
  const [phase, setPhase] = useState(0);
  const [expression, setExpression] = useState("neutral");
  const sectionRef = useRef(null);
  const viewerRef = useRef(null);

  const expressions = [
    { key: "neutral", label: "Neutral" },
    { key: "malice", label: "Malice" },
    { key: "sensory", label: "Sensory Overload" },
    { key: "starvation", label: "Starvation" }
  ];

  // Morph target animation via model-viewer scene graph
  const setMorph = (expr) => {
    setExpression(expr);
    const mv = viewerRef.current;
    if (!mv || !mv.model) return;
    const targets = { malice: "Malice", sensory: "Sensory Overload", starvation: "Starvation" };
    // mesh.002 is index 2 — the mask mesh with 3 shape keys
    const meshes = mv.model.meshes || [];
    for (let mi = 0; mi < meshes.length; mi++) {
      const mesh = meshes[mi];
      // Try each primitive in the mesh
      const prims = mesh.primitives || [];
      for (let pi = 0; pi < prims.length; pi++) {
        const prim = prims[pi];
        if (!prim || !prim.morphTargetInfluences) continue;
        const names = prim.morphTargetNames || [];
        // Reset all, then set selected
        for (let ti = 0; ti < names.length; ti++) {
          prim.morphTargetInfluences[ti] = (targets[expr] && names[ti] === targets[expr]) ? 1 : 0;
        }
      }
    }
    // Also try the Three.js scene directly (model-viewer exposes it)
    try {
      mv.model.traverse && mv.model.traverse((child) => {
        if (child.morphTargetInfluences && child.morphTargetDictionary) {
          Object.values(targets).forEach(t => {
            if (t in child.morphTargetDictionary) {
              child.morphTargetInfluences[child.morphTargetDictionary[t]] = 0;
            }
          });
          if (targets[expr] && targets[expr] in child.morphTargetDictionary) {
            child.morphTargetInfluences[child.morphTargetDictionary[targets[expr]]] = 1;
          }
        }
      });
    } catch(e) {}
    // Force a re-render
    mv.requestUpdate && mv.requestUpdate();
  };

  // Scroll-driven text phases
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const start = rect.top;
      const total = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -start / total));
      if (progress < 0.33) setPhase(0);
      else if (progress < 0.66) setPhase(1);
      else setPhase(2);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const phrases = [
    { l: "ANCIENT", r: "FOLKLORE" },
    { l: "CONTAINED", r: "POWER" },
    { l: "FORGOTTEN", r: "IDENTITY" }
  ];

  return (
    <section className="mask-section" ref={sectionRef}>
      <div className="mask-sticky">
        {phrases.map((p, i) => (
          <React.Fragment key={i}>
            <div className={"mask-text left" + (phase === i ? " active" : "")}>{p.l}</div>
            <div className={"mask-text right" + (phase === i ? " active" : "")}>{p.r}</div>
          </React.Fragment>
        ))}

        {/* 3D model viewer — replaces static image */}
        <div className="mask-figure-wrap">
          <model-viewer
            ref={viewerRef}
            src="assets/models/character-v3.glb"
            alt="Folkloric Character — interactive 3D model"
            camera-controls
            auto-rotate
            auto-rotate-delay="0"
            rotation-per-second="12deg"
            interaction-prompt="none"
            camera-orbit="0deg 75deg 5.5m"
            min-camera-orbit="auto auto 3m"
            max-camera-orbit="auto auto 8m"
            field-of-view="32deg"
            style={{
              width: "100%",
              height: "100%",
              background: "transparent",
              "--poster-color": "transparent",
              outline: "none",
              border: "none"
            }}
          />
        </div>

        {/* Expression switcher */}
        <div className="mask-expressions">
          <span className="mask-expr-label">Expression</span>
          {expressions.map(e => (
            <button
              key={e.key}
              className={"mask-expr-btn" + (expression === e.key ? " active" : "")}
              onClick={() => setMorph(e.key)}
            >
              <span className="mask-expr-dot" />
              {e.label}
            </button>
          ))}
        </div>

        <div className="mask-caption">Folkloric Character Design · Interactive 3D · Blender &amp; Substance Painter</div>
      </div>
    </section>
  );
};

// ============================================
// ABOUT + CV — home-page section, two columns
// ============================================
window.HomeAbout = function HomeAbout() {
  return (
    <section className="home-about">
      <div className="bio">
        <h2>Hey, I'm <em>Presley.</em></h2>
        <p>
          A <strong>UI/UX &amp; VFX artist</strong> based in Groningen, Netherlands — studying
          Creative Media &amp; Game Technologies at Hanze University. I design
          player-centred interfaces, narrative systems, and atmospheric 3D worlds.
        </p>
        <p>
          My work sits at the intersection of <strong>behavioral design, emotional
          design, and atmosphere</strong> — using visual hierarchy, information architecture,
          and environmental storytelling to create experiences that feel intuitive
          and immersive.
        </p>
        <dl className="meta">
          <div>
            <dt>Based</dt>
            <dd>Groningen, NL</dd>
          </div>
          <div>
            <dt>Study</dt>
            <dd>Hanze University</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>Game UI/UX · 3D</dd>
          </div>
          <div>
            <dt>Tools</dt>
            <dd>Figma · Blender · Unity</dd>
          </div>
        </dl>
      </div>

      <div className="cv-block">
        <a href="#" className="cv-download"
           onClick={(e) => { e.preventDefault(); alert("CV download — coming soon"); }}>
          Download CV <span>↓</span>
        </a>
        <div className="cv-preview"
             onClick={() => window.dispatchEvent(new CustomEvent("nav", { detail: "about" }))}>
          <div className="cv-head">
            <span>CV — 2026</span>
            <span>Groningen / NL</span>
          </div>
          <h3>Presley<br/>Yordanov</h3>
          <div className="cv-role">UI/UX · VFX Artist</div>
          <div className="cv-row">
            <span className="y">2026</span>
            <span className="t">Groningen Provincial House — <em>Dike Or Strike</em>. UI/UX, Systems Design.</span>
          </div>
          <div className="cv-row">
            <span className="y">2026</span>
            <span className="t">University of Groningen — <em>Oops! A Data Breach</em>. Solo UI/UX.</span>
          </div>
          <div className="cv-row">
            <span className="y">2025</span>
            <span className="t">Walls of Eden — VR game. UI/UX, Narrative, 3D.</span>
          </div>
          <div className="cv-row">
            <span className="y">2025</span>
            <span className="t">Folkloric Character — solo 3D, Blender &amp; Substance Painter.</span>
          </div>
          <div className="cv-row">
            <span className="y">2024</span>
            <span className="t">Hanze University — Creative Media &amp; Game Technologies.</span>
          </div>
          <div className="cv-stamp">P.Y.<br/>26</div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CONTACT — home-page footer block
// ============================================
window.HomeContact = function HomeContact() {
  return (
    <section className="home-contact">
      <h2>Let's create<br/><em>something together.</em></h2>
      <div className="contact-rows">
        <div className="col">
          <div className="lbl">Direct</div>
          <div className="v">pp.hey@st.hanze.nl</div>
          <div className="desc">Best for project inquiries, collaborations, and longer notes. Replies within 48h.</div>
        </div>
        <div className="col">
          <div className="lbl">Elsewhere</div>
          <div className="v">@presley.yrd</div>
          <div className="desc">Process updates and work-in-progress on Instagram.</div>
        </div>
      </div>
    </section>
  );
};
