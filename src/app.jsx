/* global React, ReactDOM */
const { useState, useEffect } = React;

function App() {
  const [page, setPageRaw] = useState("home"); // home | work | about | contact | project | canvas
  const [variant, setVariant] = useState("cathedral"); // cathedral | editorial | cyber
  const [project, setProject] = useState(null);

  const setPage = (p) => {
    setPageRaw(p);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const goProject = (title) => {
    setProject(title);
    setPageRaw("project");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // Listen for in-page nav events (from buttons inside pages)
  useEffect(() => {
    const onNav = (e) => setPage(e.detail);
    window.addEventListener("nav", onNav);
    return () => window.removeEventListener("nav", onNav);
  }, []);

  // Tweaks: variant + bg intensity
  // edit-mode protocol
  const [showTweaks, setShowTweaks] = useState(false);
  useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === "__activate_edit_mode") setShowTweaks(true);
      if (e.data?.type === "__deactivate_edit_mode") setShowTweaks(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  let content;
  if (page === "home") {
    if (variant === "editorial") content = <HomeEditorial />;
    else if (variant === "cyber") content = <HomeCyber />;
    else content = <HomeCathedral goProject={goProject} />;
  } else if (page === "work") {
    content = <WorkIndex goProject={goProject} />;
  } else if (page === "about") {
    content = <AboutPage />;
  } else if (page === "contact") {
    content = <ContactPage />;
  } else if (page === "project") {
    content = <ProjectDetail title={project || "Golden Hour"} back={() => setPage("work")} />;
  }

  return (
    <div className="site">
      <InteractiveLayer />
      <Curtain trigger={page + ":" + (project || "")} />
      <Nav page={page} setPage={setPage} />
      {content}
      <HudBadges />
      {showTweaks && <SiteTweaks variant={variant} setVariant={setVariant} setPage={setPage} />}
    </div>
  );
}

// Tweaks panel — site-wide controls
function SiteTweaks({ variant, setVariant, setPage }) {
  const close = () => {
    window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*");
  };
  return (
    <div style={{
      position: "fixed",
      right: 24, top: 80,
      zIndex: 200,
      width: 280,
      background: "rgba(20,10,36,0.94)",
      border: "1px solid var(--line-strong)",
      borderRadius: 14,
      padding: 18,
      backdropFilter: "blur(20px)",
      fontFamily: "var(--sans)",
      color: "var(--ink)",
      boxShadow: "0 30px 80px rgba(0,0,0,0.5)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ fontFamily: "var(--serif)", fontSize: 18 }}>Tweaks</span>
        <span onClick={close} style={{ cursor: "pointer", color: "var(--ink-mute)" }}>×</span>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Home variant</div>
        {[
          ["cathedral", "Cathedral"],
          ["editorial", "Editorial"],
          ["cyber", "Cyber"]
        ].map(([k, label]) => (
          <button key={k}
            onClick={() => setVariant(k)}
            style={{
              display: "block", width: "100%",
              padding: "10px 12px", marginBottom: 6,
              background: variant === k ? "var(--violet-700)" : "transparent",
              border: "1px solid " + (variant === k ? "var(--violet-300)" : "var(--line)"),
              borderRadius: 8,
              color: "var(--ink)",
              fontFamily: "var(--sans)", fontSize: 13,
              textAlign: "left", cursor: "pointer"
            }}>{label}</button>
        ))}
      </div>

      <div>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Jump to page</div>
        {[
          ["home", "Home"],
          ["work", "Work index"],
          ["project", "Project detail"],
          ["about", "About"],
          ["contact", "Contact"]
        ].map(([k, label]) => (
          <button key={k}
            onClick={() => setPage(k)}
            style={{
              display: "block", width: "100%",
              padding: "8px 12px", marginBottom: 4,
              background: "transparent",
              border: "1px solid var(--line)",
              borderRadius: 8,
              color: "var(--ink-dim)",
              fontFamily: "var(--sans)", fontSize: 12,
              textAlign: "left", cursor: "pointer"
            }}>{label} →</button>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
