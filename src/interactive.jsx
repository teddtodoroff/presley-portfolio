/* global React */
const { useEffect, useRef, useState } = React;

// ============================================
// Custom cursor + magnetic + parallax bg + transitions
// ============================================
window.InteractiveLayer = function InteractiveLayer() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);
  const progress = useRef(null);
  const [labelText, setLabelText] = useState("");

  useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf;

    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      if (label.current) label.current.style.transform = `translate(${mx + 30}px, ${my + 30}px)`;

      // Background parallax — gentle on remaining bg elements (no-op if none)
      const cx = (mx / window.innerWidth - 0.5) * 30;
      const cy = (my / window.innerHeight - 0.5) * 20;
      const grain = document.querySelector(".cathedral-grain");
      if (grain) grain.style.transform = `translate(${-cx * 0.15}px, ${-cy * 0.15}px)`;

      // tile/card spotlights
      const target = e.target.closest(".marquee-tile, .proj-card, .bento .tile, .hero-3card .card");
      if (target) {
        const r = target.getBoundingClientRect();
        target.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        target.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      }
    };

    const animate = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(animate);
    };
    animate();

    // Hover detection
    const onOver = (e) => {
      const t = e.target;
      const cls = (extra) => {
        if (dot.current) dot.current.className = "cursor " + extra;
        if (ring.current) ring.current.className = "cursor-ring " + extra;
      };
      const card = t.closest(".proj-card, .marquee-tile, .work-row");
      const link = t.closest("a, button, .btn, .x");
      if (card) {
        cls("hover-card");
        const role = card.querySelector(".role")?.textContent;
        const title = card.querySelector(".title, .serif")?.textContent;
        setLabelText(role ? `View ${title || ""}`.trim() : "View");
        if (label.current) label.current.classList.add("show");
      } else if (link) {
        cls("hover-link");
        if (label.current) label.current.classList.remove("show");
      } else {
        cls("");
        if (label.current) label.current.classList.remove("show");
      }
    };

    // Magnetic buttons
    const onMove = (e) => {
      const btn = e.target.closest(".btn");
      if (btn) {
        const r = btn.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) * 0.25;
        const dy = (e.clientY - cy) * 0.25;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };
    const onLeaveBtn = (e) => {
      if (e.target.classList?.contains("btn")) {
        e.target.style.transform = "";
      }
    };

    // Scroll progress
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (progress.current) progress.current.style.width = pct + "%";
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeaveBtn, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeaveBtn, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor" />
      <div ref={ring} className="cursor-ring" />
      <div ref={label} className="cursor-label">{labelText}</div>
      <div ref={progress} className="scroll-progress" />
    </>
  );
};

// Page transition — iris wipe (closes, holds dark, opens)
window.Curtain = function Curtain({ trigger }) {
  const [phase, setPhase] = useState("idle"); // idle | close | open
  const lastTrigger = useRef(trigger);

  useEffect(() => {
    if (trigger === lastTrigger.current) return;
    lastTrigger.current = trigger;
    setPhase("close");
    const t1 = setTimeout(() => setPhase("open"), 360);
    const t2 = setTimeout(() => setPhase("idle"), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [trigger]);

  if (phase === "idle") return null;

  return (
    <div className={"iris " + phase} aria-hidden="true">
      <div className="iris-fill" />
      <div className="iris-grain" />
      <div className="iris-rim" />
    </div>
  );
};

// Live Groningen time chip + status badge
window.HudBadges = function HudBadges() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      // Groningen is CET (UTC+1) / CEST (UTC+2 in summer)
      const d = new Date();
      const nl = d.toLocaleString("en-GB", { timeZone: "Europe/Amsterdam", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
      const offset = d.toLocaleString("en-GB", { timeZone: "Europe/Amsterdam", timeZoneName: "shortOffset" }).split("GMT")[1] || "+1";
      setTime(`${nl} UTC${offset} · Groningen`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  // HUD badges removed — they overlapped the hero footer text
  return null;
};

// Letter reveal helper for hero h1
window.SplitText = function SplitText({ children, className = "" }) {
  const words = String(children).split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className={"word " + className}>
          <span>{w}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
};
