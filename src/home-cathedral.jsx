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
        <span>Sofia / Worldwide</span>
        <span>Last updated · 05.05.26</span>
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
        <span><span className="live-dot" />Sofia, BG — available for select work, Q3 — Q4 / 2026</span>
        <span className="ix">Index № 001 · VFX &amp; Etc</span>
      </div>

      <div className="home-hero-stage">
        <h1 className="title">
          VFX &amp; Etc<br/><em>Artist.</em>
        </h1>
        <p className="title-sub">
          Presley Yordanov — building cinematic, sculptural, slightly haunted
          imagery for music, motorsport &amp; brands. Sofia &amp; worldwide.
        </p>
      </div>

      <div className="hero-foot">
        <span className="hero-foot-l">Scroll to selected work ↓</span>
        <span className="hero-foot-r">© 2021 — 2026 · Six years &amp; counting</span>
      </div>
    </section>
  );
};

// ============================================
// CAROUSEL — peach side rails, slide with CHECK OUT
// ============================================
window.CarouselSection = function CarouselSection({ goProject }) {
  const slides = [
    {
      title: "Golden Hour",
      em: "Hour",
      kicker: "Motorsport — 2025",
      role: "Direction · Color · Edit",
      desc: "A 90-second portrait of a tuned Supra at the last hour of light.",
      bg: "linear-gradient(135deg, #c87a4a 0%, #6a2820 100%)"
    },
    {
      title: "Mask of Utopia",
      em: "Utopia",
      kicker: "Personal — 2024",
      role: "3D · Sculptural · Cinematic",
      desc: "A long-form 3D study in carved-stone faces and slow camera moves.",
      bg: "linear-gradient(135deg, #3a2050 0%, #0a0414 100%)"
    },
    {
      title: "Stage Visuals",
      em: "Visuals",
      kicker: "Music — 2025",
      role: "Direction · Live · Compositing",
      desc: "Twelve cues of live-render visuals for the Rite concert film.",
      bg: "linear-gradient(135deg, #5a4080 0%, #1a0e2e 100%)"
    },
    {
      title: "Ethereal Designs",
      em: "Designs",
      kicker: "Brand — 2024",
      role: "CGI · Brand · Direction",
      desc: "Identity film and product CG for a Sofia-based jewellery house.",
      bg: "linear-gradient(135deg, #b8a890 0%, #4a3a2a 100%)"
    }
  ];
  const [idx, setIdx] = useState(0);
  const [animDir, setAnimDir] = useState("next");
  const [animating, setAnimating] = useState(false);
  const autoRef = useRef(null);
  const total = slides.length;
  const current = slides[idx];

  const go = (newIdx, dir) => {
    if (animating) return;
    setAnimDir(dir);
    setAnimating(true);
    setTimeout(() => {
      setIdx(newIdx);
      setTimeout(() => setAnimating(false), 50);
    }, 320);
  };
  const prev = () => go((idx - 1 + total) % total, "prev");
  const next = () => go((idx + 1) % total, "next");

  // Auto-play every 5s, pauses on hover
  useEffect(() => {
    autoRef.current = setInterval(() => {
      go(-1, "next"); // placeholder — handled below
    }, 5000);
    return () => clearInterval(autoRef.current);
  }, []);
  // Fix: auto-play uses latest idx
  useEffect(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setAnimDir("next");
      setAnimating(true);
      setTimeout(() => {
        setIdx(prev => (prev + 1) % total);
        setTimeout(() => setAnimating(false), 50);
      }, 320);
    }, 5000);
    return () => clearInterval(autoRef.current);
  }, [idx, total]);

  const pauseAuto = () => clearInterval(autoRef.current);
  const resumeAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setAnimDir("next");
      setAnimating(true);
      setTimeout(() => {
        setIdx(prev => (prev + 1) % total);
        setTimeout(() => setAnimating(false), 50);
      }, 320);
    }, 5000);
  };

  return (
    <section className="carousel-section">
      <Reveal>
        <div className="carousel-head">
          <h2>Selected<br/><em>Work</em></h2>
          <div className="meta">
            {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}<br/>
            Featured projects
          </div>
        </div>
      </Reveal>
      <div className="carousel" onMouseEnter={pauseAuto} onMouseLeave={resumeAuto}>
        <div className="carousel-stage">
          <div className="carousel-side" onClick={prev} aria-label="Previous">
            <span className="arrow">‹</span>
          </div>
          <div className={"carousel-slide" + (animating ? " anim-out-" + animDir : " anim-in")}
               style={{ background: current.bg }}
               onClick={() => goProject && goProject(current.title)}>
            <div className="scrim" />
            <div className="label">
              <span className="kicker">{current.kicker}</span>
              <h3>{current.title.replace(current.em, "").trim()} <em>{current.em}</em></h3>
              <span className="role">{current.role}</span>
              <p className="slide-desc">{current.desc}</p>
            </div>
            <span className="checkout" onClick={(e) => { e.stopPropagation(); goProject && goProject(current.title); }}>
              Check out <span className="arrow">→</span>
            </span>
          </div>
          <div className="carousel-side right" onClick={next} aria-label="Next">
            <span className="arrow">›</span>
          </div>
        </div>
        <div className="carousel-dots">
          {slides.map((_, i) => (
            <span key={i} className={"dot" + (i === idx ? " active" : "")}
                  onClick={() => go(i, i > idx ? "next" : "prev")} />
          ))}
        </div>
        <div className="carousel-counter">
          <span className="carousel-counter-current">{String(idx + 1).padStart(2, "0")}</span>
          <span className="carousel-counter-sep">/</span>
          <span className="carousel-counter-total">{String(total).padStart(2, "0")}</span>
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
    { kicker: "Motorsport", title: "Golden Hour — a tuned Supra at the last light of day", icon: "→", c: "c7", r: "r2", k: "golden" },
    { kicker: "Personal", title: "Mask of Utopia — sculptural 3D study in carved stone", icon: "Ø", c: "c5", k: "mask" },
    { kicker: "Music", title: "Stage Visuals — twelve live-render cues for Rite", icon: "♪", c: "c5", k: "stage" },
    { kicker: "Brand", title: "Ethereal Designs — identity film and product CGI", icon: "◈", c: "c7", k: "ethereal" },
    { kicker: "R&D", title: "Chronos 01 — time-sculpture experiments", icon: "◷", c: "c4", k: "chronos" },
    { kicker: "Personal", title: "Neural Echoes — generative landscapes", icon: "∿", c: "c4", k: "neural" },
    { kicker: "Direction", title: "Datmaxp.jet — automotive culture series", icon: "▶", c: "c4", k: "datmaxp" }
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
            <div className="ph">{t.kicker}</div>
            <span className="icon">{t.icon}</span>
            <div className="meta">
              <span className="kicker">{t.kicker}</span>
              <span className="title">{t.title}</span>
              <span className="arrow">→ view project</span>
            </div>
            <a href="#" className="tile-hit"
               onClick={(e) => { e.preventDefault(); goProject && goProject(t.title); }}
               style={{ position: "absolute", inset: 0, zIndex: 3 }} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

// ============================================
// MASK SECTION — kept from previous, awaits real 3D from Presley
// ============================================
window.MaskSection = function MaskSection() {
  const maskRef = useRef(null);
  const [phase, setPhase] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!maskRef.current) return;
      const rect = maskRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      maskRef.current.style.transform = `perspective(1000px) rotateY(${dx * 14}deg) rotateX(${-dy * 10}deg)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

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
    { l: "EXPLORE", r: "MASKS" },
    { l: "WEAR", r: "WORLDS" },
    { l: "OF", r: "UTOPIA" }
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
        <img ref={maskRef} src="assets/mask-placeholder.svg" className="mask-figure" alt="Mask" />
        <div className="mask-caption">3D helmet preview · Move your cursor · placeholder pending Presley's real model</div>
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
          A <strong>VFX &amp; Etc artist</strong> based in Sofia, Bulgaria — working
          between music, motorsport and brand. I direct, shoot, edit, color and
          sometimes sculpt entire worlds in 3D.
        </p>
        <p>
          The work tends toward the <strong>cinematic and slightly haunted</strong> —
          big sculptural objects, golden hours, lighting that belongs in a chapel.
          I like making real things in CG, and CG things that feel real.
        </p>
        <dl className="meta">
          <div>
            <dt>Based</dt>
            <dd>Sofia, BG</dd>
          </div>
          <div>
            <dt>Booking</dt>
            <dd>Q3 — Q4 / 2026</dd>
          </div>
          <div>
            <dt>Travel</dt>
            <dd>Worldwide</dd>
          </div>
          <div>
            <dt>Years</dt>
            <dd>06</dd>
          </div>
        </dl>
      </div>

      <div className="cv-block">
        <a href="#" className="cv-download"
           onClick={(e) => { e.preventDefault(); alert("CV PDF — pending Presley's file"); }}>
          Download CV <span>↓</span>
        </a>
        <div className="cv-preview"
             onClick={() => window.dispatchEvent(new CustomEvent("nav", { detail: "about" }))}>
          <div className="cv-head">
            <span>CV — 2026</span>
            <span>Sofia / BG</span>
          </div>
          <h3>Presley<br/>Yordanov</h3>
          <div className="cv-role">VFX &amp; Etc Artist · Director</div>
          <div className="cv-row">
            <span className="y">2025</span>
            <span className="t">LBWK Performance — <em>Golden Hour</em>. Direction, color, edit.</span>
          </div>
          <div className="cv-row">
            <span className="y">2025</span>
            <span className="t">Rite (live) — <em>Stage Visuals</em>. Direction, 12 live cues.</span>
          </div>
          <div className="cv-row">
            <span className="y">2024</span>
            <span className="t">Mask of Utopia — 3D film, personal.</span>
          </div>
          <div className="cv-row">
            <span className="y">2024</span>
            <span className="t">Ethereal Designs — brand film, CGI.</span>
          </div>
          <div className="cv-row">
            <span className="y">2021</span>
            <span className="t">Independent practice begins.</span>
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
      <h2>Let's build<br/><em>something rare.</em></h2>
      <div className="contact-rows">
        <div className="col">
          <div className="lbl">Direct</div>
          <div className="v">hey@presleyyordanov.com</div>
          <div className="desc">Best for project briefs, quotes and longer notes. Replies within 48h.</div>
        </div>
        <div className="col">
          <div className="lbl">Elsewhere</div>
          <div className="v">@presley.yrd<br/>vimeo.com/presleyyordanov</div>
          <div className="desc">Daily process and reel updates on Instagram and Vimeo.</div>
        </div>
      </div>
    </section>
  );
};
