/* global React, ReactDOM */
const { useState, useEffect, useRef } = React;

// ============================================
// Shared chrome
// ============================================
window.Nav = function Nav({ page, setPage }) {
  const leftLinks = [
    { id: "work", label: "Work" }
  ];
  const rightLinks = [
    { id: "about", label: "CV · About" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <nav className="nav">
      <div className="nav-left">
        {leftLinks.map((l, i) => (
          <a key={l.label}
             className={page === l.id ? "active" : ""}
             onClick={(e) => { e.preventDefault(); setPage(l.id); }}
             href="#">{l.label}</a>
        ))}
      </div>
      <a href="#" className="nav-brand"
         onClick={(e) => { e.preventDefault(); setPage("home"); }}>
        Presley Yordanov
      </a>
      <div className="nav-right">
        {rightLinks.map(l => (
          <a key={l.id}
             className={page === l.id ? "active" : ""}
             onClick={(e) => { e.preventDefault(); setPage(l.id); }}
             href="#">{l.label}</a>
        ))}
      </div>
    </nav>
  );
};

// Cathedral background — fixed, behind everything.
// Restrained: dark warm-black field + film grain + vignette.
// (vitrail accent retired — references are deep/pure dark)
window.CathedralBg = function CathedralBg({ intensity = 1 }) {
  return (
    <div className="cathedral-bg" style={{ opacity: intensity }}>
      <div className="cathedral-grain" />
      <div className="cathedral-vignette" />
    </div>
  );
};

// Contact pop-up that rises after user has scrolled a bit
window.ContactPopup = function ContactPopup({ email = "pp.hey@st.hanze.nl" }) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (dismissed) return;
      const ratio = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setShow(ratio > 0.45);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);
  return (
    <div className={"contact-popup" + (show && !dismissed ? " show" : "")}>
      <span>Interested in working with me? Send me a message at</span>
      <span className="email">{email}</span>
      <span className="x" onClick={() => setDismissed(true)} aria-label="Dismiss">×</span>
    </div>
  );
};

// Reveal-on-scroll wrapper
window.Reveal = function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={"reveal " + (visible ? "in " : "") + className}>
      {children}
    </div>
  );
};

// Generic placeholder tile content
window.Placeholder = function Placeholder({ label }) {
  return <div className="placeholder">{label}</div>;
};
