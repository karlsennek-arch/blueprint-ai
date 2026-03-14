"use client";
import { useState, useEffect, useRef } from "react";

const Gold = "#E8C872";
const Green = "#7EE8B2";
const Bg = "#08090C";
const W = (a) => `rgba(255,255,255,${a})`;

// ─── STRIPE CHECKOUT ──────────────────────────────────────────
async function handleCheckout() {
  const res = await fetch("/api/checkout", { method: "POST" });
  const data = await res.json();
  if (data.url) window.location.href = data.url;
}

// ─── LIVE COUNTER ───────────────────────────────────────────────
function LiveCounter() {
  const [c, setC] = useState(47283);
  useEffect(() => { const i = setInterval(() => setC(x => x + Math.floor(Math.random() * 3)), 4500); return () => clearInterval(i); }, []);
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px", borderRadius: 8, background: "rgba(126,232,178,.06)", border: "1px solid rgba(126,232,178,.1)" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: Green, animation: "pulse 2s infinite" }} />
      <span style={{ fontSize: 12, fontWeight: 600, color: Green }}>{c.toLocaleString()}</span>
      <span style={{ fontSize: 11, color: W(.25) }}>blueprints generated</span>
    </div>
  );
}

// ─── FAQ ITEM ───────────────────────────────────────────────────
function FAQ({ q, a, open, onClick }) {
  return (
    <div style={{ borderBottom: `1px solid ${W(.04)}` }}>
      <button onClick={onClick} style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "18px 0", background: "transparent", border: "none", color: "#fff",
        cursor: "pointer", textAlign: "left",
      }}>
        <span style={{ fontSize: 14.5, fontWeight: 600, color: open ? Gold : "#fff", transition: "color .2s", flex: 1, paddingRight: 12 }}>{q}</span>
        <span style={{ fontSize: 18, color: W(.2), transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform .3s", flexShrink: 0 }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 200 : 0, overflow: "hidden", transition: "max-height .4s cubic-bezier(.4,0,.2,1)" }}>
        <p style={{ fontSize: 13, color: W(.4), lineHeight: 1.6, paddingBottom: 18 }}>{a}</p>
      </div>
    </div>
  );
}

// ─── COUNTDOWN BAR (urgency) ────────────────────────────────────
function CountdownBar() {
  const [t, setT] = useState(() => {
    if (!window.__bpExpiry) window.__bpExpiry = Date.now() + 24*60*60*1000;
    return window.__bpExpiry - Date.now();
  });
  useEffect(() => { const i = setInterval(() => setT(Math.max(0, (window.__bpExpiry||Date.now()) - Date.now())), 1000); return () => clearInterval(i); }, []);
  const h = Math.floor(t/3600000), m = Math.floor((t%3600000)/60000), s = Math.floor((t%60000)/1000);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12, padding: "8px 14px", background: "rgba(255,107,107,.04)", border: "1px solid rgba(255,107,107,.08)", borderRadius: 10 }}>
      <span style={{ fontSize: 11, color: "#FF8A80" }}>⏰ Blueprint expires in</span>
      <span style={{ fontSize: 13, fontWeight: 800, color: "#fff", fontVariantNumeric: "tabular-nums" }}>{String(h).padStart(2,"0")}:{String(m).padStart(2,"0")}:{String(s).padStart(2,"0")}</span>
    </div>
  );
}

// ─── LIVE UNLOCK COUNTER (social proof) ─────────────────────────
function UnlockCounter() {
  const [c, setC] = useState(3847);
  useEffect(() => { const i = setInterval(() => setC(x => x + 1), 8000 + Math.random()*12000); return () => clearInterval(i); }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 12, color: W(.25) }}><span style={{ color: Gold, fontWeight: 700 }}>{c.toLocaleString()} people</span> unlocked their blueprint this week</div>
      <div style={{ display: "flex", justifyContent: "center", gap: 3, marginTop: 6 }}>
        {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 12, color: "#FFD166" }}>★</span>)}
        <span style={{ fontSize: 11, color: W(.3), marginLeft: 4 }}>4.9/5</span>
      </div>
    </div>
  );
}

// ─── PAYWALL MODAL ──────────────────────────────────────────────
function PaywallPopup({ onClose }) {
  const feats = ["📅 Day-by-day action plan (4 weeks)", "📝 Copy-paste outreach scripts", "📊 6-month revenue projections", "💰 Detailed income breakdown", "🛠 Exact tools with pricing", "🕐 Custom daily schedule", "💬 AI follow-up chat advisor", "🔀 Blueprint comparison mode", "✅ Interactive progress tracker", "📄 PDF export"];
  const [t, setT] = useState(() => { if (!window.__bpExpiry) window.__bpExpiry = Date.now()+24*3600000; return window.__bpExpiry-Date.now(); });
  useEffect(() => { const i = setInterval(() => setT(Math.max(0,(window.__bpExpiry||Date.now())-Date.now())),1000); return () => clearInterval(i); }, []);
  const h=Math.floor(t/3600000), m=Math.floor((t%3600000)/60000), s=Math.floor((t%60000)/1000);
  const [uc, setUc] = useState(3847);
  useEffect(() => { const i = setInterval(() => setUc(x=>x+1), 9000+Math.random()*11000); return () => clearInterval(i); }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "rgba(0,0,0,.85)", backdropFilter: "blur(12px)", animation: "fi .3s both" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 420, maxHeight: "90vh", overflowY: "auto", background: "linear-gradient(145deg,#13151A,#0D0E12)", border: "1px solid rgba(232,200,114,.1)", borderRadius: 24, padding: "32px 24px", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 2, background: `linear-gradient(90deg,transparent,${Gold},transparent)`, borderRadius: 2 }} />
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 28, height: 28, borderRadius: 8, background: W(.04), border: `1px solid ${W(.06)}`, color: W(.3), fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>×</button>

        {/* Timer */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 10, background: "rgba(255,107,107,.06)", border: "1px solid rgba(255,107,107,.12)" }}>
            <span style={{ fontSize: 12, color: "#FF8A80" }}>⏰ Expires in</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: "#fff", fontVariantNumeric: "tabular-nums" }}>{String(h).padStart(2,"0")}:{String(m).padStart(2,"0")}:{String(s).padStart(2,"0")}</span>
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, lineHeight: 1.15, marginBottom: 8, color: "#fff" }}>Your plan is ready.<br/><span style={{ color: Gold }}>Unlock it for $19.</span></h2>
          <p style={{ fontSize: 13, color: W(.35) }}>One payment. Lifetime access. No subscription.</p>
        </div>

        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: W(.2), marginBottom: 8 }}>What you'll unlock:</div>
          {feats.map((f,i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: i < feats.length-1 ? `1px solid ${W(.03)}` : "none" }}>
              <span style={{ fontSize: 12.5, color: W(.55) }}>{f}</span>
              <span style={{ marginLeft: "auto", fontSize: 10, color: Green, fontWeight: 600 }}>✓</span>
            </div>
          ))}
        </div>

        <div style={{ padding: "10px 14px", background: W(.015), borderRadius: 10, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>👆</span>
          <span style={{ fontSize: 11, color: W(.35), lineHeight: 1.4 }}>You can see your blurred blueprint above — unlock to reveal full details.</span>
        </div>

        <div style={{ background: "rgba(232,200,114,.04)", border: "1px solid rgba(232,200,114,.1)", borderRadius: 16, padding: 20, textAlign: "center", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4, marginBottom: 2 }}>
            <span style={{ fontSize: 15, color: W(.25), textDecoration: "line-through" }}>$49</span>
            <span style={{ fontSize: 36, fontWeight: 900, color: "#fff" }}>$19</span>
            <span style={{ fontSize: 14, color: W(.3) }}>one-time</span>
          </div>
          <div style={{ fontSize: 11, color: Green, fontWeight: 600, marginBottom: 14 }}>Launch price — 61% off</div>
          <button onClick={handleCheckout} style={{ width: "100%", padding: 16, borderRadius: 12, border: "none", background: `linear-gradient(135deg,${Gold},#D4A843)`, color: Bg, fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 24px rgba(232,200,114,.2)" }}>🔓 Unlock My Full Blueprint — $19</button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 10 }}>
          {["🔒 256-bit encrypted", "💳 Powered by Stripe", "↩️ 30-day refund"].map((t,i) => <span key={i} style={{ fontSize: 9.5, color: W(.18) }}>{t}</span>)}
        </div>
        <div style={{ textAlign: "center", paddingTop: 10, borderTop: `1px solid ${W(.03)}` }}>
          <div style={{ fontSize: 12, color: W(.25) }}><span style={{ color: Gold, fontWeight: 700 }}>{uc.toLocaleString()} people</span> unlocked this week</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 3, marginTop: 5 }}>{[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 12, color: "#FFD166" }}>★</span>)}<span style={{ fontSize: 11, color: W(.3), marginLeft: 4 }}>4.9/5</span></div>
        </div>
      </div>
    </div>
  );
}

// ─── ANIMATED DEMO MOCKUP ───────────────────────────────────────
function DemoMockup() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setStep(s => (s + 1) % 6), 2500);
    return () => clearInterval(i);
  }, []);

  const screens = [
    { label: "Answer 6 questions", content: (
      <div>
        <div style={{ fontSize: 9, color: W(.2), textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>Step 3 of 6</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 10 }}>What skills do you have?</div>
        {["Writing ✍️", "Coding 💻", "Marketing 📢"].map((s, i) => (
          <div key={i} style={{
            padding: "8px 10px", marginBottom: 4, borderRadius: 7,
            background: i === 1 ? "rgba(232,200,114,.06)" : W(.01),
            border: `1px solid ${i === 1 ? "rgba(232,200,114,.25)" : W(.04)}`,
            fontSize: 11, color: i === 1 ? Gold : W(.4),
          }}>{s} {i === 1 && <span style={{ float: "right", fontSize: 9, color: Gold }}>✓</span>}</div>
        ))}
      </div>
    )},
    { label: "AI analyzes your profile", content: (
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#fff", marginBottom: 12, textAlign: "center" }}>Analyzing...</div>
        {["Scanning 1,400+ models", "Matching skills", "Building plan"].map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", opacity: i <= 1 ? 1 : .3 }}>
            <div style={{ width: 18, height: 18, borderRadius: 5, background: i < 1 ? "rgba(232,200,114,.08)" : W(.02), border: `1px solid ${i < 1 ? "rgba(232,200,114,.18)" : W(.04)}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: Gold }}>{i < 1 ? "✓" : ""}</div>
            <span style={{ fontSize: 10, color: i <= 1 ? W(.6) : W(.2) }}>{t}</span>
          </div>
        ))}
      </div>
    )},
    { label: "Get your blueprint", content: (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 9, color: Gold, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Your #1 Path</div>
        <div style={{ fontSize: 15, fontWeight: 800, color: Gold, marginBottom: 4 }}>AI Content Agency</div>
        <div style={{ display: "inline-block", padding: "2px 7px", borderRadius: 5, background: "rgba(232,200,114,.1)", border: "1px solid rgba(232,200,114,.2)", fontSize: 9, fontWeight: 700, color: Gold, marginBottom: 10 }}>93% match</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
          {[["$3-8K/mo", Gold], ["2-3 wks", Green]].map(([v, c], i) => (
            <div key={i} style={{ padding: "6px", background: W(.02), borderRadius: 6, fontSize: 11, fontWeight: 700, color: c }}>{v}</div>
          ))}
        </div>
      </div>
    )},
    { label: "Follow the day-by-day plan", content: (
      <div>
        <div style={{ fontSize: 9, color: Gold, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>Week 1 — Monday</div>
        {["Set up portfolio site", "Create 3 AI samples", "Send 10 outreach DMs"].map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, padding: "5px 0" }}>
            <div style={{ width: 15, height: 15, borderRadius: 4, border: `1.5px solid ${i < 2 ? Gold : W(.1)}`, background: i < 2 ? "rgba(232,200,114,.1)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: Gold }}>{i < 2 ? "✓" : ""}</div>
            <span style={{ fontSize: 10, color: i < 2 ? W(.3) : W(.5), textDecoration: i < 2 ? "line-through" : "none" }}>{t}</span>
          </div>
        ))}
      </div>
    )},
    { label: "Chat with AI advisor", content: (
      <div>
        <div style={{ fontSize: 9, color: Gold, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>💬 AI Chat</div>
        <div style={{ padding: "7px 10px", background: W(.02), border: `1px solid ${W(.04)}`, borderRadius: "8px 8px 8px 3px", marginBottom: 5, fontSize: 9.5, color: W(.45), lineHeight: 1.4 }}>
          <span style={{ fontSize: 8, color: Gold, fontWeight: 700 }}>Blueprint AI</span><br/>I recommend starting with LinkedIn outreach. Here's a specific approach for your situation...
        </div>
        <div style={{ padding: "7px 10px", background: "rgba(232,200,114,.06)", border: "1px solid rgba(232,200,114,.15)", borderRadius: "8px 8px 3px 8px", marginBottom: 5, fontSize: 9.5, color: W(.6), textAlign: "right" }}>
          What if I only have 2 hours a day?
        </div>
        <div style={{ padding: "7px 10px", background: W(.02), border: `1px solid ${W(.04)}`, borderRadius: "8px 8px 8px 3px", fontSize: 9.5, color: W(.45), lineHeight: 1.4 }}>
          <span style={{ fontSize: 8, color: Gold, fontWeight: 700 }}>Blueprint AI</span><br/>Great question! With 2 hours, focus on...
        </div>
      </div>
    )},
    { label: "Compare alternative paths", content: (
      <div>
        <div style={{ fontSize: 9, color: "#8BB8E8", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>🔀 Compare Mode</div>
        <div style={{ display: "flex", gap: 5 }}>
          <div style={{ flex: 1, padding: "8px 7px", background: "rgba(232,200,114,.03)", border: "1px solid rgba(232,200,114,.1)", borderRadius: 7 }}>
            <div style={{ fontSize: 7, color: Gold, fontWeight: 700, marginBottom: 3 }}>CURRENT</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: Gold }}>Content Agency</div>
            <div style={{ fontSize: 9, color: W(.3), marginTop: 2 }}>$3-8K/mo</div>
          </div>
          <div style={{ flex: 1, padding: "8px 7px", background: "rgba(139,184,232,.03)", border: "1px solid rgba(139,184,232,.1)", borderRadius: 7 }}>
            <div style={{ fontSize: 7, color: "#8BB8E8", fontWeight: 700, marginBottom: 3 }}>20 HRS/WK</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#8BB8E8" }}>SaaS Builder</div>
            <div style={{ fontSize: 9, color: W(.3), marginTop: 2 }}>$5-12K/mo</div>
          </div>
        </div>
      </div>
    )},
  ];

  return (
    <div style={{ position: "relative", maxWidth: 240, margin: "0 auto" }}>
      {/* Phone frame */}
      <div style={{
        background: "linear-gradient(145deg, #111318, #0D0E12)",
        border: "1px solid rgba(255,255,255,.06)",
        borderRadius: 20, padding: "28px 18px 22px", position: "relative",
        boxShadow: "0 20px 60px rgba(0,0,0,.4), 0 0 30px rgba(232,200,114,.03)",
        minHeight: 220,
      }}>
        {/* Notch */}
        <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 50, height: 4, borderRadius: 3, background: W(.06) }} />

        {/* Screen content */}
        <div style={{ minHeight: 150 }}>
          {screens[step].content}
        </div>
      </div>

      {/* Step indicator */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
        {screens.map((_, i) => (
          <div key={i} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 3, background: i === step ? Gold : W(.08), transition: "all .4s" }} />
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 8, fontSize: 12, fontWeight: 600, color: W(.4) }}>{screens[step].label}</div>
    </div>
  );
}

// ─── SAMPLE BLUEPRINT PREVIEW (blurred) ─────────────────────────
function BlueprintPreview() {
  return (
    <div style={{ background: W(.015), border: `1px solid ${W(.04)}`, borderRadius: 18, padding: "24px 20px", position: "relative", overflow: "hidden" }}>
      {/* Visible part */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: W(.2), marginBottom: 8 }}>Primary Recommendation</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: Gold }}>AI Content Agency</div>
          <span style={{ padding: "3px 9px", borderRadius: 6, background: "rgba(232,200,114,.1)", border: "1px solid rgba(232,200,114,.2)", fontSize: 11, fontWeight: 700, color: Gold }}>93% match</span>
        </div>
        <p style={{ fontSize: 12.5, color: W(.4), lineHeight: 1.5 }}>Use AI tools to deliver premium content to businesses at 3x speed. You become the bridge between AI and businesses who need content.</p>
      </div>

      {/* Metrics - visible */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
        {[["💰 Revenue", "$3K–$8K/mo", Gold], ["⏱ First $", "2-3 weeks", Green], ["📊 Difficulty", "Medium", "#fff"], ["🎯 Match", "93%", Gold]].map(([l, v, c], i) => (
          <div key={i} style={{ padding: "10px 12px", background: W(.015), border: `1px solid ${W(.035)}`, borderRadius: 10 }}>
            <div style={{ fontSize: 9, color: W(.2), textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>{l}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: c }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Blurred sections */}
      <div style={{ filter: "blur(5px)", opacity: .4, pointerEvents: "none", userSelect: "none" }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: Gold, marginBottom: 10 }}>Income Streams</div>
        {["Core service — $2,000–$4,000", "Upsells — $500–$1,500", "Passive — $300–$1,000"].map((t, i) => (
          <div key={i} style={{ padding: "10px 12px", background: W(.013), border: `1px solid ${W(.03)}`, borderRadius: 8, marginBottom: 5, fontSize: 12, color: W(.5) }}>{t}</div>
        ))}
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: Gold, margin: "14px 0 10px" }}>Week 1 — Day by Day</div>
        {["Mon: Set up portfolio, create samples", "Tue: Upwork + Fiverr profiles", "Wed: Research 20 clients"].map((t, i) => (
          <div key={i} style={{ padding: "8px 12px", background: W(.013), border: `1px solid ${W(.03)}`, borderRadius: 8, marginBottom: 4, fontSize: 11, color: W(.45) }}>{t}</div>
        ))}
      </div>

      {/* Overlay CTA */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 140, background: "linear-gradient(transparent, rgba(8,9,12,.95))", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 20, pointerEvents: "none" }}>
        <div style={{ padding: "10px 24px", borderRadius: 10, background: `linear-gradient(135deg, ${Gold}, #D4A843)`, color: Bg, fontSize: 13, fontWeight: 700, boxShadow: "0 4px 20px rgba(232,200,114,.25)", pointerEvents: "auto" }}>
          🔓 Unlock Full Blueprint
        </div>
      </div>
    </div>
  );
}

// ─── MAIN LANDING PAGE ──────────────────────────────────────────
export default function LandingPage() {
  const [faq, setFaq] = useState(-1);
  const [page, setPage] = useState("landing"); // "landing" or "quiz"
  const [showPaywall, setShowPaywall] = useState(false);

  // ─── QUIZ STATE (embedded quiz) ───
  const [step, setStep] = useState(-1); // -1 = language select, 0+ = questions
  const [lang, setLang] = useState("en");
  const [answers, setAnswers] = useState({});
  const [lp, setLp] = useState(0);
  const [report, setReport] = useState(null);
  const [screen, setScreen] = useState("quiz"); // quiz | loading | report
  const aiRef = useRef(null);

  const LANGS = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "pt", label: "Português", flag: "🇧🇷" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "no", label: "Norsk", flag: "🇳🇴" },
    { code: "nl", label: "Nederlands", flag: "🇳🇱" },
    { code: "sv", label: "Svenska", flag: "🇸🇪" },
    { code: "it", label: "Italiano", flag: "🇮🇹" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
  ];

  const langName = LANGS.find(l => l.code === lang)?.label || "English";

  const QUESTIONS = [
    { id: "situation", label: "What's your current situation?", sub: "This shapes everything — your timeline, strategy, and expectations.",
      options: [
        { value: "student", label: "Student", icon: "🎓", desc: "Flexible hours, tight budget" },
        { value: "fulltime", label: "Full-Time Job", icon: "💼", desc: "Evenings & weekends available" },
        { value: "parttime", label: "Part-Time Job", icon: "⏰", desc: "Some flexibility, need more" },
        { value: "freelancer", label: "Freelancer", icon: "🎯", desc: "Flexible but inconsistent" },
        { value: "unemployed", label: "Between Jobs", icon: "🔄", desc: "Full availability, need income now" },
        { value: "parent", label: "Stay-at-Home Parent", icon: "🏠", desc: "Must work around family" },
      ],
    },
    { id: "skills", label: "What skills do you bring?", sub: "Pick all that apply — even ones you're decent at.", multi: true,
      options: [
        { value: "writing", label: "Writing & Copy", icon: "✍️" },
        { value: "design", label: "Design & Visual", icon: "🎨" },
        { value: "coding", label: "Coding & Tech", icon: "💻" },
        { value: "marketing", label: "Marketing & Ads", icon: "📢" },
        { value: "sales", label: "Sales & People", icon: "🤝" },
        { value: "video", label: "Video & Content", icon: "🎬" },
        { value: "teaching", label: "Teaching", icon: "📚" },
        { value: "analytics", label: "Data & Research", icon: "📊" },
        { value: "none", label: "Starting from zero", icon: "🌱" },
      ],
    },
    { id: "interests", label: "What industries excite you?", sub: "Passion fuels persistence. Pick what you'd enjoy.", multi: true,
      options: [
        { value: "tech", label: "Tech & AI", icon: "🤖" },
        { value: "health", label: "Health & Fitness", icon: "💪" },
        { value: "finance", label: "Finance & Investing", icon: "💹" },
        { value: "ecommerce", label: "E-Commerce", icon: "🛒" },
        { value: "education", label: "Education & Coaching", icon: "🎓" },
        { value: "creative", label: "Creative & Media", icon: "🎭" },
        { value: "realestate", label: "Real Estate", icon: "🏗️" },
        { value: "beauty", label: "Beauty & Lifestyle", icon: "✨" },
      ],
    },
    { id: "time", label: "Weekly hours you can commit?", sub: "Be honest — a realistic plan beats an ambitious one you quit.",
      options: [
        { value: "5", label: "Under 5 hours", icon: "⏰", desc: "Micro-hustle pace" },
        { value: "10", label: "5–10 hours", icon: "🕐", desc: "Solid side project" },
        { value: "20", label: "10–20 hours", icon: "🕑", desc: "Serious commitment" },
        { value: "40", label: "20+ hours", icon: "🔥", desc: "Full-time grind" },
      ],
    },
    { id: "budget", label: "Starting investment?", sub: "Many paths need $0. But knowing helps us be precise.",
      options: [
        { value: "0", label: "$0 — Zero", icon: "🆓", desc: "Pure hustle, no capital" },
        { value: "100", label: "Under $100", icon: "💵", desc: "Minimal tools budget" },
        { value: "500", label: "$100–$500", icon: "💰", desc: "Room for tools & ads" },
        { value: "1000", label: "$500+", icon: "🏦", desc: "Ready to invest" },
      ],
    },
    { id: "goal", label: "Monthly income target?", sub: "Your first milestone — we reverse-engineer how to hit it.",
      options: [
        { value: "1000", label: "$1K/mo", icon: "🎯", desc: "Breathing room" },
        { value: "3000", label: "$3K/mo", icon: "📈", desc: "Real side income" },
        { value: "5000", label: "$5K/mo", icon: "🚀", desc: "Replace your job" },
        { value: "10000", label: "$10K+/mo", icon: "💎", desc: "Build wealth" },
      ],
    },
  ];

  const LOAD_PHASES = ["Mapping your profile", "Scanning 1,400+ models", "Matching interests", "Projecting revenue", "Building your plan", "Writing blueprint"];

  const cQ = QUESTIONS[step];
  const canGo = cQ?.multi ? (answers[cQ?.id]?.length > 0) : !!answers[cQ?.id];

  const handleSelect = (v) => {
    if (cQ.multi) {
      const prev = answers[cQ.id] || [];
      if (v === "none") { setAnswers({ ...answers, [cQ.id]: prev.includes("none") ? [] : ["none"] }); return; }
      const f = prev.filter(x => x !== "none");
      setAnswers({ ...answers, [cQ.id]: f.includes(v) ? f.filter(x => x !== v) : [...f, v] });
    } else {
      setAnswers({ ...answers, [cQ.id]: v });
      setTimeout(() => { step < QUESTIONS.length - 1 ? setStep(s => s + 1) : startLoading(); }, 220);
    }
  };


  const buildFallback = () => {
    const sk = answers.skills || [], time = answers.time || "10", sit = answers.situation || "employed", budget = answers.budget || "0", goal = answers.goal || "3000";
    const interests = answers.interests || [];
    const hasCode = sk.includes("coding"), hasWrite = sk.includes("writing"), hasVid = sk.includes("video");
    const hasMkt = sk.includes("marketing"), hasDesign = sk.includes("design"), hasSales = sk.includes("sales");
    const hasTeach = sk.includes("teaching"), hasAnalytics = sk.includes("analytics"), noSkills = sk.includes("none") || sk.length === 0;
    const intHealth = interests.includes("health"), intFinance = interests.includes("finance"), intEcom = interests.includes("ecommerce");
    const intEdu = interests.includes("education"), intCreative = interests.includes("creative"), intTech = interests.includes("tech");
    const intRealestate = interests.includes("realestate"), intBeauty = interests.includes("beauty");
  let primary, secondary, tertiary, quickestWin;

  // ─── HELPER: Build weekly plan shorthand ───
  const wp = (w1,w2,w3,w4) => [
    {week:"Week 1",title:w1.t,goal:w1.g,days:w1.d.map(([day,...tasks])=>({day,tasks}))},
    {week:"Week 2",title:w2.t,goal:w2.g,days:w2.d.map(([day,...tasks])=>({day,tasks}))},
    {week:"Week 3",title:w3.t,goal:w3.g,days:w3.d.map(([day,...tasks])=>({day,tasks}))},
    {week:"Week 4",title:w4.t,goal:w4.g,days:w4.d.map(([day,...tasks])=>({day,tasks}))},
  ];

  // ═══════════════════════════════════════════════════════════
  // 1. CODING + TECH → AI Automation Agency
  // ═══════════════════════════════════════════════════════════
  if (hasCode && intTech) {
    primary = { name: "AI Automation Agency", match: 95, tagline: "Build AI workflows for businesses stuck in 2020", description: "Use coding skills to build custom AI automations — chatbots, email sequences, lead capture, data pipelines. Most businesses are 3-5 years behind on AI. You bridge that gap at $500-2000/project.", whyYou: "Your coding + tech interest puts you in the top 3%. You can build real solutions, not just prompt wrappers.", monthlyRevenue: "$3,000–$12,000", timeToFirstDollar: "2–3 weeks", difficulty: "Medium",
      revenueProjection:[{month:"Mo 1",low:500,high:2000},{month:"Mo 2",low:1500,high:4000},{month:"Mo 3",low:2500,high:6000},{month:"Mo 4",low:3500,high:8000},{month:"Mo 5",low:5000,high:10000},{month:"Mo 6",low:6000,high:12000}],
      incomeBreakdown:[{source:"Custom AI automations",amount:"$2,000–$6,000",howItWorks:"Build chatbots, email flows, and data pipelines. Charge $500-2000 per project."},{source:"Monthly retainers",amount:"$500–$3,000",howItWorks:"Ongoing support and optimization for existing clients."},{source:"AI strategy consulting",amount:"$500–$2,000",howItWorks:"$150-300/hr strategy sessions for businesses planning AI adoption."}],
      tools:[{name:"Claude API",cost:"$20/mo",purpose:"AI backbone"},{name:"Make.com",cost:"Free–$16/mo",purpose:"Automation builder"},{name:"GitHub",cost:"Free",purpose:"Code hosting"},{name:"Vercel",cost:"Free",purpose:"Deploy apps"},{name:"Notion",cost:"Free",purpose:"Client management"}],
      dailySchedule:{description:`${time}hrs/week as ${sit} — code mornings, sell afternoons:`,blocks:[{time:"Morning",task:"Build client automations",duration:"60 min"},{time:"Midday",task:"Client demos & communication",duration:"30 min"},{time:"Afternoon",task:"Prospect for new businesses",duration:"30 min"},{time:"Evening",task:"Learn new AI tools",duration:"20 min"}]},
      weeklyPlan: wp(
        {t:"Arsenal",g:"3 demo automations ready",d:[["Mon","Build demo chatbot with Claude API","Record 60-sec demo video"],["Tue","Build email automation on Make.com","Create case study doc"],["Wed","Build lead capture automation","Set up Vercel portfolio"],["Thu","Record walkthroughs of all demos","Post on LinkedIn"],["Fri","Join 5 business communities","List on Upwork"]]},
        {t:"Outreach",g:"3 discovery calls booked",d:[["Mon","DM 10 business owners with specific automation ideas","Personalize each with their business name"],["Tue","Follow up Upwork applications","Post build-in-public TikTok"],["Wed","Offer 1 free automation to local business","Share process on social"],["Thu","2 discovery calls — focus on pain points","Send proposals within 24hrs"],["Fri","Follow up all conversations","Ask contacts for referrals"]]},
        {t:"Deliver",g:"First paid project done",d:[["Mon","Build client automation — overdeliver","Document for templates"],["Tue","Client demo call — walk through it","Collect testimonial"],["Wed","Post case study on LinkedIn","DM 10 more prospects"],["Thu","Create reusable templates from project","Price next 30% higher"],["Fri","Invoice immediately","Start 2 new conversations"]]},
        {t:"Systemize",g:"Pipeline of 3+ projects",d:[["Mon","Turn best automation into productized service","Create landing page"],["Tue","Reach out to 15 businesses","Share results on TikTok"],["Wed","Upsell client on $500/mo retainer","Build proposal template"],["Thu","Create 'free AI audit' lead magnet","Share everywhere"],["Fri","Review month 1 revenue","Set month 2 at 2x"]]}
      ),
      scripts:[{context:"DM to business owner",script:"Hey [Name], I checked out [business] and noticed you're still [doing X manually]. I built something similar for [type] that saved them [X hours/week]. Want a quick 2-min demo? No cost."},{context:"Follow-up after demo",script:"Hey [Name], put together an estimate for [automation]. Takes [X days], costs [$$]. You'd save ~[X hours/week] = [$$/month]. Want to go ahead?"}],
      milestones:[{month:"Month 1",target:"$1,500",milestone:"2-3 projects, portfolio live"},{month:"Month 3",target:"$5,000",milestone:"5+ clients, 2 retainers"},{month:"Month 6",target:"$10,000+",milestone:"Productized service, hiring help"}],
      risks:["Scope creep from clients","Pricing too low","Too much learning, not enough selling"],
      mitigations:["Define deliverables in writing. Extras = extra invoice.","$500 minimum. Raise 30% every 2 projects.","Cap learning at 20% of time."]
    };
    secondary = {name:"SaaS Micro-Product",match:86,tagline:"Build once, charge monthly",description:"Build a focused tool — AI resume optimizer, review responder, content scheduler. Recurring revenue.",monthlyRevenue:"$1,000–$5,000",timeToFirstDollar:"4–6 weeks",difficulty:"Medium-High",quickWin:"List 10 problems you've solved with code, pick the most common, build MVP this weekend"};
    tertiary = {name:"Technical Freelancing",match:78,tagline:"Sell skills while you build",description:"Take coding gigs on Upwork for immediate cash flow while building your agency.",monthlyRevenue:"$2,000–$6,000",timeToFirstDollar:"1 week",difficulty:"Low-Medium",quickWin:"Create Upwork profile, apply to 5 AI gigs tonight"};
    quickestWin = "Go to Upwork, search 'AI automation' or 'chatbot', apply to 3 gigs. Use Claude to write each proposal. Total: 10 minutes.";

  // ═══════════════════════════════════════════════════════════
  // 2. CODING + FINANCE → AI FinTech Tools
  // ═══════════════════════════════════════════════════════════
  } else if (hasCode && intFinance) {
    primary = { name: "AI Finance Tool Builder", match: 94, tagline: "Build AI-powered financial tools people will pay for monthly", description: "Create SaaS tools for personal finance — AI budget analyzers, investment research bots, expense trackers with AI insights. The fintech space is massive and most tools are outdated.", whyYou: "Coding + finance interest = you understand both the tech AND the user. That's rare and valuable.", monthlyRevenue: "$2,000–$8,000", timeToFirstDollar: "3–4 weeks", difficulty: "Medium-High",
      revenueProjection:[{month:"Mo 1",low:200,high:800},{month:"Mo 2",low:600,high:2000},{month:"Mo 3",low:1500,high:4000},{month:"Mo 4",low:2500,high:5500},{month:"Mo 5",low:3500,high:7000},{month:"Mo 6",low:4500,high:8500}],
      incomeBreakdown:[{source:"SaaS subscriptions ($9-29/mo)",amount:"$1,500–$5,000",howItWorks:"Monthly recurring from users of your AI finance tool."},{source:"Premium tier features",amount:"$300–$1,500",howItWorks:"Advanced features like AI investment analysis, portfolio tracking."},{source:"Affiliate partnerships",amount:"$200–$1,500",howItWorks:"Recommend financial tools/apps and earn commissions."}],
      tools:[{name:"Claude API",cost:"$20/mo",purpose:"AI analysis engine"},{name:"Vercel",cost:"Free",purpose:"Host your app"},{name:"Stripe",cost:"2.9% per tx",purpose:"Payments"},{name:"Supabase",cost:"Free",purpose:"Database"},{name:"Plaid",cost:"Free tier",purpose:"Bank data integration"}],
      dailySchedule:{description:`${time}hrs/week coding + marketing:`,blocks:[{time:"Morning",task:"Code features and fix bugs",duration:"60 min"},{time:"Midday",task:"Reply to user feedback",duration:"20 min"},{time:"Afternoon",task:"Create content about personal finance + AI",duration:"30 min"},{time:"Evening",task:"Research competitors and trends",duration:"15 min"}]},
      weeklyPlan: wp(
        {t:"MVP Build",g:"Working prototype",d:[["Mon","Define core feature — pick ONE financial problem to solve","Sketch the UI"],["Tue","Build the backend — Claude API integration for AI analysis","Set up database"],["Wed","Build the frontend — clean, simple interface","Connect to backend"],["Thu","Add Stripe for payments — free tier + $9/mo pro","Test the full flow"],["Fri","Deploy to Vercel, buy a domain ($12)","Share with 5 friends for feedback"]]},
        {t:"Launch",g:"First 50 users",d:[["Mon","Post on Product Hunt, IndieHackers, Reddit r/personalfinance","Write a compelling launch story"],["Tue","Create TikTok: 'I built an AI that analyzes your spending'","Post on Twitter/X"],["Wed","Reach out to 10 finance bloggers for reviews","Offer free premium accounts"],["Thu","Respond to every comment and piece of feedback","Fix top 3 issues"],["Fri","Write a blog post about how you built it","Share on Hacker News"]]},
        {t:"Iterate",g:"First paying customers",d:[["Mon","Analyze usage data — what features do people actually use?","Build the #1 requested feature"],["Tue","Email all free users — offer 50% off first month of premium","Create onboarding email sequence"],["Wed","TikTok: 'What AI found in 1000 peoples budgets'","This is your viral content angle"],["Thu","Add AI-powered insights dashboard","Users should get value in 30 seconds"],["Fri","Reach out to 5 finance YouTubers for partnerships","Offer affiliate commissions"]]},
        {t:"Growth",g:"$500+ MRR",d:[["Mon","Build referral program — give both users $5 credit","Launch email campaign"],["Tue","Create comparison page vs competitors","SEO optimization"],["Wed","Add social sharing — 'My AI says I save $X/month'","Viral loop built in"],["Thu","Explore integration with Plaid for auto bank import","Huge value-add"],["Fri","Review MRR, churn rate, top features","Plan month 2 roadmap"]]}
      ),
      scripts:[{context:"Product Hunt launch post",script:"Hey PH! I built [tool name] — an AI that [specific thing]. Most finance apps just show you numbers. This one tells you exactly what to change and how much you'll save. Free tier available. Would love your feedback!"},{context:"DM to finance blogger",script:"Hey [Name], I built an AI finance tool that [specific feature]. Your audience at [blog] would love it. Want a free premium account to try? Happy to write a guest post too."}],
      milestones:[{month:"Month 1",target:"$200",milestone:"MVP live, 50+ users, first conversions"},{month:"Month 3",target:"$2,000",milestone:"200+ users, product-market fit"},{month:"Month 6",target:"$5,000+",milestone:"1000+ users, sustainable MRR"}],
      risks:["Building features nobody wants","Long time to monetize","Financial regulations"],
      mitigations:["Ship MVP in 1 week, let users tell you what to build.","Free tier drives adoption. Monetize once you have 100+ active users.","Provide information/tools only — never give financial advice. Add disclaimers."]
    };
    secondary = {name:"Finance Content Creator",match:82,tagline:"Teach people about money using AI insights",description:"Create personal finance content on TikTok/YouTube using AI for research and scripts.",monthlyRevenue:"$1,000–$4,000",timeToFirstDollar:"3–4 weeks",difficulty:"Medium",quickWin:"Film a TikTok: 'I asked AI to analyze the average person's budget — here's what it found'"};
    tertiary = {name:"Freelance FinTech Developer",match:76,tagline:"Build for finance startups",description:"Take freelance gigs building financial dashboards, trading tools, and analytics platforms.",monthlyRevenue:"$3,000–$8,000",timeToFirstDollar:"1–2 weeks",difficulty:"Medium",quickWin:"Search 'fintech developer' on Upwork, apply to 5 gigs"};
    quickestWin = "Open Claude, say 'Build me a simple personal budget analyzer in Python that reads a CSV of transactions and gives AI insights.' Deploy it as a free tool. Share on Reddit r/personalfinance. Total: 2 hours.";

  // ═══════════════════════════════════════════════════════════
  // 3. CODING + ECOMMERCE → AI Shopify Apps
  // ═══════════════════════════════════════════════════════════
  } else if (hasCode && intEcom) {
    primary = { name: "AI E-Commerce App Builder", match: 93, tagline: "Build Shopify apps that store owners can't live without", description: "Create AI-powered Shopify/WooCommerce apps — product description generators, smart pricing tools, review analyzers, inventory predictors. E-commerce owners pay monthly for tools that save time.", whyYou: "Coding + e-commerce understanding = you can build tools that actually solve merchant pain points.", monthlyRevenue: "$2,500–$10,000", timeToFirstDollar: "3–5 weeks", difficulty: "Medium-High",
      revenueProjection:[{month:"Mo 1",low:200,high:600},{month:"Mo 2",low:600,high:2000},{month:"Mo 3",low:1500,high:4000},{month:"Mo 4",low:3000,high:6000},{month:"Mo 5",low:4000,high:8000},{month:"Mo 6",low:5000,high:10000}],
      incomeBreakdown:[{source:"App subscriptions ($19-49/mo)",amount:"$1,500–$6,000",howItWorks:"Monthly recurring from Shopify merchants using your app."},{source:"Premium tiers",amount:"$500–$2,000",howItWorks:"Advanced features, higher limits, priority support."},{source:"Custom development",amount:"$500–$2,000",howItWorks:"Custom builds for larger stores who want tailored solutions."}],
      tools:[{name:"Shopify Partner Account",cost:"Free",purpose:"Publish apps"},{name:"Claude API",cost:"$20/mo",purpose:"AI backbone"},{name:"Next.js",cost:"Free",purpose:"App framework"},{name:"Prisma + PostgreSQL",cost:"Free",purpose:"Database"}],
      dailySchedule:{description:`${time}hrs/week — build first, market second:`,blocks:[{time:"Morning",task:"Code app features",duration:"60 min"},{time:"Midday",task:"Reply to merchant feedback",duration:"20 min"},{time:"Afternoon",task:"Marketing — post in e-commerce communities",duration:"20 min"},{time:"Evening",task:"Research competitor apps & merchant pain points",duration:"15 min"}]},
      weeklyPlan: wp(
        {t:"Build MVP",g:"Working app in Shopify store",d:[["Mon","Pick ONE problem: AI product descriptions, smart pricing, or review analysis","Register Shopify Partner account"],["Tue","Build core feature using Claude API","Set up app scaffold with Next.js"],["Wed","Build the Shopify integration — install flow, data sync","Test in development store"],["Thu","Add billing via Shopify Billing API — $19/mo","Build onboarding flow"],["Fri","Test everything end-to-end","Submit to Shopify App Store"]]},
        {t:"Launch",g:"First 20 installs",d:[["Mon","Post in Shopify community forums","Write about the problem you solve"],["Tue","Create TikTok: 'I built an AI app for Shopify stores'","Demo the app in action"],["Wed","DM 20 store owners who have the problem you solve","Offer free month"],["Thu","Post on Reddit r/shopify, r/ecommerce","Genuine value, not spam"],["Fri","Reach out to 5 Shopify YouTubers","Offer affiliate deal"]]},
        {t:"Iterate",g:"First paying merchants",d:[["Mon","Analyze which feature gets most usage","Build enhancement"],["Tue","Email all free users about paid conversion","Offer 50% off first month"],["Wed","Add social proof — show 'X stores using this'","Testimonials page"],["Thu","Create comparison page vs alternatives","SEO for 'best Shopify [tool]'"],["Fri","Plan V2 features based on feedback","Start building"]]},
        {t:"Scale",g:"$500+ MRR",d:[["Mon","Build most-requested V2 feature","Higher tier pricing"],["Tue","Launch referral program — free month for referrals","Email blast"],["Wed","Create case study with best-performing merchant","Share everywhere"],["Thu","Explore WooCommerce version to double market","Research"],["Fri","Review MRR, churn, NPS","Plan month 2"]]}
      ),
      scripts:[{context:"DM to Shopify store owner",script:"Hey [Name], I noticed [store] has [X products] — are you writing all those descriptions manually? I built an AI tool that generates optimized product descriptions in seconds. Want to try it free for a month?"},{context:"Shopify forum post",script:"[Title] Built an AI tool that [solves problem] — free for first 50 stores [Body] I was running my own store and got tired of [problem]. So I built [app]. It [does X] in seconds. Looking for beta testers — first 50 stores get lifetime discount."}],
      milestones:[{month:"Month 1",target:"$400",milestone:"App live, 20+ installs"},{month:"Month 3",target:"$2,500",milestone:"100+ installs, steady MRR"},{month:"Month 6",target:"$8,000",milestone:"500+ installs, featured in app store"}],
      risks:["Shopify review process delays","Low conversion from free to paid","Feature parity with big competitors"],
      mitigations:["Submit early, iterate. First version just needs to work.","Offer generous free tier, convert with premium features.","Don't compete on features — compete on simplicity and AI."]
    };
    secondary = {name:"E-Commerce Consultant",match:80,tagline:"Help stores optimize with AI",description:"Advise Shopify/Amazon sellers on using AI for descriptions, ads, and operations.",monthlyRevenue:"$2,000–$6,000",timeToFirstDollar:"1–2 weeks",difficulty:"Medium",quickWin:"Find 5 Shopify stores with bad product descriptions, offer to rewrite 10 for free using AI"};
    tertiary = {name:"Dropshipping Automation",match:72,tagline:"Automate the boring parts",description:"Build or use AI tools to automate product research, listing, and customer service for dropshipping.",monthlyRevenue:"$1,000–$4,000",timeToFirstDollar:"2–3 weeks",difficulty:"Medium",quickWin:"Use AI to research trending products on AliExpress, list 5 on a free Shopify trial store today"};
    quickestWin = "Go to the Shopify App Store, search your niche, read 1-star reviews. Each complaint is a product idea. Pick the most common one. Build MVP this week.";

  // ═══════════════════════════════════════════════════════════
  // 4. CODING (general) → AI Automation Agency
  // ═══════════════════════════════════════════════════════════
  } else if (hasCode) {
    primary = { name: "AI Automation Agency", match: 93, tagline: "Build AI workflows for businesses stuck in the past", description: "Custom AI automations for small businesses — chatbots, email sequences, lead capture. Most businesses are years behind. You charge $500-2000/project.", whyYou: "Coding puts you in the top 5%. You build real solutions, not prompt wrappers.", monthlyRevenue: "$3,000–$10,000", timeToFirstDollar: "2–3 weeks", difficulty: "Medium",
      revenueProjection:[{month:"Mo 1",low:500,high:1500},{month:"Mo 2",low:1200,high:3000},{month:"Mo 3",low:2000,high:5000},{month:"Mo 4",low:3000,high:7000},{month:"Mo 5",low:4000,high:8500},{month:"Mo 6",low:5000,high:10000}],
      incomeBreakdown:[{source:"Custom automations",amount:"$2,000–$5,000",howItWorks:"Chatbots, email flows, data pipelines per project."},{source:"Retainers",amount:"$500–$2,000",howItWorks:"Monthly support for existing clients."},{source:"Consulting",amount:"$500–$1,500",howItWorks:"$150-300/hr AI strategy sessions."}],
      tools:[{name:"Claude API",cost:"$20/mo",purpose:"AI engine"},{name:"Make.com",cost:"Free–$16/mo",purpose:"Automation"},{name:"GitHub",cost:"Free",purpose:"Code"},{name:"Vercel",cost:"Free",purpose:"Deploy"},{name:"Notion",cost:"Free",purpose:"Management"}],
      dailySchedule:{description:`${time}hrs/week:`,blocks:[{time:"Morning",task:"Build automations",duration:"60 min"},{time:"Midday",task:"Client calls",duration:"30 min"},{time:"Afternoon",task:"Prospecting",duration:"30 min"},{time:"Evening",task:"Learning",duration:"20 min"}]},
      weeklyPlan: wp(
        {t:"Arsenal",g:"3 demos ready",d:[["Mon","Build demo chatbot","Record demo video"],["Tue","Build email automation","Create case study"],["Wed","Build lead capture tool","Portfolio on Vercel"],["Thu","Record walkthroughs","Post on LinkedIn"],["Fri","Join communities","List on Upwork"]]},
        {t:"Outreach",g:"3 calls booked",d:[["Mon","DM 10 business owners","Personalize each"],["Tue","Follow up Upwork","TikTok content"],["Wed","Free automation for local business","Share process"],["Thu","2 discovery calls","Send proposals"],["Fri","Follow up all","Ask for referrals"]]},
        {t:"Deliver",g:"First project done",d:[["Mon","Build client automation","Document templates"],["Tue","Demo to client","Get testimonial"],["Wed","Case study on LinkedIn","DM 10 more"],["Thu","Templates from project","Raise price 30%"],["Fri","Invoice","Start 2 conversations"]]},
        {t:"Scale",g:"3+ projects",d:[["Mon","Productize best service","Landing page"],["Tue","15 outreach messages","TikTok results"],["Wed","Upsell retainer","Proposal template"],["Thu","Free AI audit lead magnet","Share"],["Fri","Review revenue","2x goal"]]}
      ),
      scripts:[{context:"DM to business owner",script:"Hey [Name], noticed [business] still [does X manually]. Built similar for [type] — saved them [X hrs/week]. Quick 2-min demo? No cost."},{context:"Follow-up",script:"Put together an estimate: [X days], [$$]. You'd save ~[$$/month] in time. Want to proceed?"}],
      milestones:[{month:"Month 1",target:"$1,500",milestone:"2-3 projects done"},{month:"Month 3",target:"$5,000",milestone:"5+ clients, retainers"},{month:"Month 6",target:"$10,000+",milestone:"Productized, hiring"}],
      risks:["Scope creep","Underpricing","Learning > selling"],
      mitigations:["Written scope. Extras = extra invoice.","$500 min. Raise 30% every 2 projects.","20% learning, 80% selling."]
    };
    secondary = {name:"SaaS Micro-Product",match:85,tagline:"Build tool, charge monthly",description:"One focused SaaS solving one problem. Recurring revenue.",monthlyRevenue:"$1,000–$5,000",timeToFirstDollar:"4–6 weeks",difficulty:"Medium-High",quickWin:"List 10 problems solved with code, pick most common, MVP this weekend"};
    tertiary = {name:"Tech Freelancing",match:78,tagline:"Immediate cash on Upwork",description:"Coding gigs for immediate income while building agency.",monthlyRevenue:"$2,000–$6,000",timeToFirstDollar:"1 week",difficulty:"Low-Medium",quickWin:"Upwork profile tonight, 5 AI gigs applied"};
    quickestWin = "Go to Upwork, search 'AI automation', apply to 3 gigs. Claude writes proposals. 10 minutes.";

  // ═══════════════════════════════════════════════════════════
  // 5. VIDEO + CREATIVE → Faceless AI Content Empire
  // ═══════════════════════════════════════════════════════════
  } else if (hasVid && intCreative) {
    primary = { name: "Faceless AI Content Studio", match: 94, tagline: "Build a media empire without ever showing your face", description: "Create multiple faceless YouTube/TikTok channels using AI for everything — scripts, voiceover, editing suggestions. Pick profitable niches (finance, motivation, tech reviews, true crime) and post daily.", whyYou: "Video skills + creative eye + AI tools = you produce cinematic content at 10x the speed. Most faceless creators have no production skills — you do.", monthlyRevenue: "$2,500–$9,000", timeToFirstDollar: "3–4 weeks", difficulty: "Medium",
      revenueProjection:[{month:"Mo 1",low:100,high:500},{month:"Mo 2",low:400,high:1500},{month:"Mo 3",low:1000,high:3500},{month:"Mo 4",low:2000,high:5500},{month:"Mo 5",low:3000,high:7000},{month:"Mo 6",low:4000,high:9000}],
      incomeBreakdown:[{source:"YouTube AdSense",amount:"$1,000–$4,000",howItWorks:"Ad revenue from long-form faceless videos. $5-15 RPM depending on niche."},{source:"Sponsorships",amount:"$500–$3,000",howItWorks:"Brands pay $500-2000 per sponsored segment once you hit 10K+ subs."},{source:"Affiliate links",amount:"$500–$2,000",howItWorks:"Recommend products in descriptions. 5-30% commissions on purchases."}],
      tools:[{name:"Claude",cost:"$20/mo",purpose:"Script writing"},{name:"ElevenLabs",cost:"$5/mo",purpose:"AI voiceover"},{name:"CapCut",cost:"Free",purpose:"Video editing"},{name:"Canva Pro",cost:"$13/mo",purpose:"Thumbnails"},{name:"Opus Clip",cost:"Free",purpose:"Auto-clip for Shorts"}],
      dailySchedule:{description:`${time}hrs/week — batch create content:`,blocks:[{time:"Morning",task:"Write 2 scripts with Claude",duration:"30 min"},{time:"Midday",task:"Generate voiceover + gather footage",duration:"30 min"},{time:"Afternoon",task:"Edit 1 video in CapCut",duration:"45 min"},{time:"Evening",task:"Create thumbnail, schedule upload",duration:"15 min"}]},
      weeklyPlan: wp(
        {t:"Channel Setup",g:"First 5 videos uploaded",d:[["Mon","Research top 10 faceless channels in your niche","Study their format, length, hooks"],["Tue","Set up YouTube + TikTok channels","Design branding in Canva"],["Wed","Write 5 scripts using Claude — follow proven formats","Generate voiceovers"],["Thu","Edit videos 1-3 in CapCut","Create thumbnails"],["Fri","Edit videos 4-5, upload all with SEO titles","Share on TikTok as clips"]]},
        {t:"Content Machine",g:"15+ videos, daily uploads",d:[["Mon","Batch write 7 scripts for the week","Generate all voiceovers"],["Tue","Gather stock footage for all videos","Organize by script"],["Wed","Edit 3 videos — aim for faster workflow","A/B test thumbnail styles"],["Thu","Edit 3 more videos","Schedule uploads for the week"],["Fri","Analyze analytics — which topics get most clicks?","Double down on winners"]]},
        {t:"Monetization",g:"Apply for YPP, first affiliate income",d:[["Mon","Apply to YouTube Partner Program (need 1K subs + 4K hours)","Set up affiliate accounts"],["Tue","Add affiliate links to all video descriptions","Create pinned comment template"],["Wed","Reach out to 5 brands in your niche for sponsorship","Build media kit"],["Thu","Create Shorts from best-performing long videos","Post 3 Shorts daily"],["Fri","Study what hour/day gets most views","Optimize upload schedule"]]},
        {t:"Scale to Multi-Channel",g:"Second channel started, first revenue",d:[["Mon","Start planning second channel in complementary niche","Reuse your system"],["Tue","Outsource editing? Or create tighter templates","Speed up production"],["Wed","First sponsorship negotiation","Counter their first offer — always"],["Thu","Create playlist strategy for binge-watching","Increases watch time"],["Fri","Review month 1 total revenue","Plan month 2 — 2x output"]]}
      ),
      scripts:[{context:"YouTube video hook (first 5 seconds)",script:"[On screen: shocking stat or question] 'What if I told you that [niche-specific claim]? In the next [X] minutes, I'm going to show you exactly [promise]...' [Cut to content immediately — no intros]"},{context:"Sponsorship pitch to brand",script:"Hey [Brand], I run [channel] with [X] views/month in the [niche] space. My audience is [demographic]. I'd love to feature [product] in an upcoming video. My rates start at $[X] for a 30-second integration. Want to discuss?"}],
      milestones:[{month:"Month 1",target:"$200",milestone:"30+ videos, growing subs, first affiliate sales"},{month:"Month 3",target:"$2,500",milestone:"1K+ subs, monetized, first sponsorship"},{month:"Month 6",target:"$7,000+",milestone:"2 channels, multiple income streams"}],
      risks:["Slow growth in first month","Content fatigue","Algorithm changes"],
      mitigations:["First 30 days are planting seeds. Growth compounds — keep posting.","Batch create. Never rely on daily motivation.","Diversify: YouTube + TikTok + Shorts. Never depend on one platform."]
    };
    secondary = {name:"Video Editing Agency",match:82,tagline:"Edit for creators who can't keep up",description:"Offer AI-accelerated editing to YouTubers and TikTokers. CapCut + AI = 5x speed.",monthlyRevenue:"$2,000–$6,000",timeToFirstDollar:"1–2 weeks",difficulty:"Medium",quickWin:"DM 10 small YouTubers (10K-50K subs) offering to edit 1 video free"};
    tertiary = {name:"AI Stock Footage Creator",match:74,tagline:"Sell AI-generated B-roll",description:"Create niche stock footage using AI tools. Sell on Storyblocks, Pond5.",monthlyRevenue:"$500–$2,000",timeToFirstDollar:"2–3 weeks",difficulty:"Low",quickWin:"Create 10 AI-generated stock clips in a trending niche, upload to Storyblocks today"};
    quickestWin = "Open YouTube, search your niche + 'faceless', study top 3 channels for 10 min. Open Claude: 'Write a 90-second script about [topic] for a faceless YouTube video.' You'll have your first script in 2 minutes.";

  // ═══════════════════════════════════════════════════════════
  // 6. VIDEO (general) → Faceless Content Empire
  // ═══════════════════════════════════════════════════════════
  } else if (hasVid) {
    primary = { name: "Faceless AI Content Empire", match: 90, tagline: "Build viral channels without showing your face", description: "Faceless YouTube/TikTok using AI for scripts, voiceover, editing. Monetize through ads, sponsors, affiliates.", whyYou: "Video + AI = 5x production speed vs traditional creators.", monthlyRevenue: "$2,000–$7,000", timeToFirstDollar: "3–4 weeks", difficulty: "Medium",
      revenueProjection:[{month:"Mo 1",low:100,high:400},{month:"Mo 2",low:300,high:1000},{month:"Mo 3",low:800,high:2500},{month:"Mo 4",low:1500,high:4000},{month:"Mo 5",low:2200,high:5500},{month:"Mo 6",low:3000,high:7000}],
      incomeBreakdown:[{source:"Ad revenue",amount:"$800–$3,000",howItWorks:"YouTube AdSense from long-form content."},{source:"Sponsorships",amount:"$500–$2,000",howItWorks:"Brand deals after 10K subs."},{source:"Affiliates",amount:"$300–$1,500",howItWorks:"Product links in descriptions."}],
      tools:[{name:"Claude",cost:"$20/mo",purpose:"Scripts"},{name:"ElevenLabs",cost:"$5/mo",purpose:"Voiceover"},{name:"CapCut",cost:"Free",purpose:"Editing"},{name:"Canva",cost:"$13/mo",purpose:"Thumbnails"}],
      dailySchedule:{description:`${time}hrs/week:`,blocks:[{time:"Morning",task:"Write scripts with AI",duration:"30 min"},{time:"Midday",task:"Generate voiceover + footage",duration:"30 min"},{time:"Afternoon",task:"Edit video",duration:"45 min"},{time:"Evening",task:"Thumbnail + upload",duration:"15 min"}]},
      weeklyPlan: wp(
        {t:"Setup",g:"5 videos uploaded",d:[["Mon","Research top faceless channels","Study their format"],["Tue","Set up channels, design branding","Canva templates"],["Wed","Write 5 scripts with Claude","Generate voiceovers"],["Thu","Edit 3 videos in CapCut","Thumbnails"],["Fri","Edit 2 more, upload all","TikTok clips"]]},
        {t:"Consistency",g:"Daily uploads",d:[["Mon","Batch 7 scripts","All voiceovers"],["Tue","Gather footage","Organize"],["Wed","Edit 3 videos","A/B thumbnails"],["Thu","Edit 3 more","Schedule week"],["Fri","Analytics review","Double down on winners"]]},
        {t:"Monetize",g:"First income",d:[["Mon","Apply YPP","Set up affiliates"],["Tue","Links in all descriptions","Pinned comments"],["Wed","DM 5 brands","Media kit"],["Thu","Shorts from long videos","3 per day"],["Fri","Optimize upload times","Best performing hours"]]},
        {t:"Scale",g:"Revenue growing",d:[["Mon","Plan 2nd channel","Reuse system"],["Tue","Outsource or template editing","Speed up"],["Wed","First sponsorship deal","Negotiate"],["Thu","Playlist strategy","Watch time"],["Fri","Month review","2x plan"]]}
      ),
      scripts:[{context:"Video hook",script:"'What if I told you [claim]? In the next [X] minutes, I'll show you exactly [promise]...' [Cut to content — no intro]"},{context:"Brand pitch",script:"Hey [Brand], I run [channel] with [X] views/month. My audience is [demo]. Interested in a sponsored segment? Rates start at $[X]."}],
      milestones:[{month:"Month 1",target:"$150",milestone:"30 videos, growing"},{month:"Month 3",target:"$2,000",milestone:"Monetized"},{month:"Month 6",target:"$5,000+",milestone:"Multi-stream"}],
      risks:["Slow early growth","Content burnout","Platform changes"],
      mitigations:["30 days = seeds. Compounds later.","Batch create weekly.","Multi-platform always."]
    };
    secondary = {name:"Video Editing Agency",match:82,tagline:"Edit for busy creators",description:"AI-accelerated editing for YouTubers.",monthlyRevenue:"$2,000–$6,000",timeToFirstDollar:"1–2 weeks",difficulty:"Medium",quickWin:"DM 10 YouTubers offering free edit"};
    tertiary = {name:"UGC Creator",match:75,tagline:"Get paid to make short videos",description:"Create user-generated content for brands. No followers needed.",monthlyRevenue:"$1,000–$4,000",timeToFirstDollar:"1–2 weeks",difficulty:"Low",quickWin:"Sign up on Billo.app and JoinBrands, create profile, apply to 5 campaigns"};
    quickestWin = "Search your niche + 'faceless' on YouTube. Study top 3 channels. Ask Claude for a 90-second script. First script in 2 minutes.";

  // ═══════════════════════════════════════════════════════════
  // 7. WRITING + HEALTH → Health Content Agency
  // ═══════════════════════════════════════════════════════════
  } else if (hasWrite && intHealth) {
    primary = { name: "AI Health & Wellness Content Agency", match: 93, tagline: "Write for the $4.5 trillion wellness industry using AI", description: "Create blog posts, newsletters, social content, and email sequences for health brands, fitness studios, supplement companies, and wellness coaches. Use AI to research and draft, your writing skill to polish.", whyYou: "Writing + health interest = you understand the audience AND can create content they trust. Health content requires nuance that AI alone can't provide.", monthlyRevenue: "$2,500–$8,000", timeToFirstDollar: "1–2 weeks", difficulty: "Medium",
      revenueProjection:[{month:"Mo 1",low:400,high:1200},{month:"Mo 2",low:1000,high:2500},{month:"Mo 3",low:1800,high:4000},{month:"Mo 4",low:2500,high:5500},{month:"Mo 5",low:3200,high:7000},{month:"Mo 6",low:4000,high:8000}],
      incomeBreakdown:[{source:"Blog posts & articles ($150-400/each)",amount:"$1,200–$3,200",howItWorks:"Write 8-10 SEO blog posts per month for health brands."},{source:"Email sequences ($300-800/sequence)",amount:"$600–$2,400",howItWorks:"Create welcome sequences, launch emails, newsletters for wellness brands."},{source:"Social media packages ($500-1500/mo)",amount:"$500–$2,000",howItWorks:"Monthly content packages for fitness studios and coaches."}],
      tools:[{name:"Claude",cost:"$20/mo",purpose:"Research & drafting"},{name:"Grammarly",cost:"Free",purpose:"Polish"},{name:"Canva",cost:"$13/mo",purpose:"Social graphics"},{name:"Notion",cost:"Free",purpose:"Client management"},{name:"Carrd",cost:"Free",purpose:"Portfolio"}],
      dailySchedule:{description:`${time}hrs/week for health content:`,blocks:[{time:"Morning",task:"Write & edit client content using AI",duration:"60 min"},{time:"Midday",task:"Client communication & revisions",duration:"20 min"},{time:"Afternoon",task:"Outreach to health brands",duration:"20 min"},{time:"Evening",task:"Research health trends for content ideas",duration:"15 min"}]},
      weeklyPlan: wp(
        {t:"Portfolio",g:"5 health content samples ready",d:[["Mon","Write 2 sample blog posts: '10 Science-Backed Ways to...' style","Use Claude for research, you for voice"],["Tue","Write a sample email welcome sequence for a fitness studio","5-email series"],["Wed","Create 5 sample social posts for a wellness brand","Design in Canva"],["Thu","Set up Carrd portfolio showcasing health content","Add testimonials later"],["Fri","Create profiles on Upwork, Fiverr — niche as 'health content writer'","Apply to 5 health content gigs"]]},
        {t:"Client Outreach",g:"First paying client",d:[["Mon","Find 20 health brands with bad blogs","List in Notion"],["Tue","DM 10 on Instagram/LinkedIn","Offer free sample article"],["Wed","Apply to 10 health content jobs on Upwork/ProBlogger","Tailored proposals"],["Thu","Follow up on all messages","Post health writing tip on LinkedIn"],["Fri","Deliver any free samples","Ask for paid follow-up"]]},
        {t:"Deliver & Grow",g:"3+ clients, testimonials collected",d:[["Mon","Deliver exceptional work","Over-deliver on first projects"],["Tue","Ask for testimonials + referrals","Add to portfolio"],["Wed","Raise prices 25%","Create content packages ($500/mo)"],["Thu","Post case study on LinkedIn","'How I helped [brand] increase traffic 40%'"],["Fri","Outreach to 10 more brands","Bigger companies this time"]]},
        {t:"Systemize",g:"Recurring clients, steady income",d:[["Mon","Create templates for common health content types","Speed up delivery"],["Tue","Pitch retainer packages to existing clients","$1000-2000/mo"],["Wed","Start a health content TikTok/newsletter","Build authority"],["Thu","Explore health affiliate content as passive income","Review articles"],["Fri","Review revenue, plan scaling","Consider subcontracting"]]}
      ),
      scripts:[{context:"DM to health brand on Instagram",script:"Hey [Brand]! Love what you're doing with [specific product/service]. I noticed your blog hasn't been updated in a while — content marketing drives 3x more leads than paid ads for wellness brands. I write AI-assisted health content for brands like yours. Want me to write a free sample article?"},{context:"Upwork proposal for health content",script:"Hi! I'm a health content writer who combines deep wellness knowledge with AI research tools to create accurate, engaging content. I've written for [types of brands]. For this project, I'd [specific approach]. Happy to share samples or write a test piece."}],
      milestones:[{month:"Month 1",target:"$800",milestone:"3+ clients, portfolio established"},{month:"Month 3",target:"$3,500",milestone:"5 retainer clients, health authority growing"},{month:"Month 6",target:"$7,000+",milestone:"Full client roster, passive income from affiliate content"}],
      risks:["Health misinformation liability","Low initial pricing","Client revisions taking too long"],
      mitigations:["Always cite sources. Add disclaimers. Never give medical advice — only information.","Start at $150/article minimum. Health content commands premium rates.","Use Claude to handle revisions in minutes. Set revision limits in contracts."]
    };
    secondary = {name:"Health Affiliate Blog",match:80,tagline:"Review supplements & fitness gear for commissions",description:"Create a review blog/TikTok for health products. Earn 10-30% commissions.",monthlyRevenue:"$800–$3,000",timeToFirstDollar:"3–4 weeks",difficulty:"Low-Medium",quickWin:"Sign up for Amazon Associates health category, write 3 'best of' reviews using Claude today"};
    tertiary = {name:"Online Fitness Course Creator",match:72,tagline:"Package health knowledge into courses",description:"Create courses on nutrition, workout plans, wellness habits using AI to help write curriculum.",monthlyRevenue:"$1,000–$5,000",timeToFirstDollar:"4–6 weeks",difficulty:"Medium",quickWin:"Outline a mini-course: '7-Day [Health Topic] Jumpstart' using Claude. List on Gumroad for $29."};
    quickestWin = "Find 5 health brands on Instagram with fewer than 50K followers and no recent blog posts. DM each: 'Love your brand! I write health content — want a free sample article?' Use Claude to draft the article in 5 minutes each.";

  // ═══════════════════════════════════════════════════════════
  // 8. WRITING + FINANCE → Finance Content Writer
  // ═══════════════════════════════════════════════════════════
  } else if (hasWrite && intFinance) {
    primary = { name: "AI Finance Content Agency", match: 92, tagline: "Write for fintech companies hungry for content", description: "Create blog posts, whitepapers, email sequences and social content for fintech startups, crypto companies, investment platforms, and financial advisors. Finance content pays 2-3x normal rates.", whyYou: "Writing + finance interest = you can explain complex topics simply. Finance companies pay premium for writers who understand their space.", monthlyRevenue: "$3,000–$10,000", timeToFirstDollar: "1–2 weeks", difficulty: "Medium",
      revenueProjection:[{month:"Mo 1",low:500,high:1500},{month:"Mo 2",low:1200,high:3000},{month:"Mo 3",low:2000,high:5000},{month:"Mo 4",low:3000,high:7000},{month:"Mo 5",low:4000,high:8500},{month:"Mo 6",low:5000,high:10000}],
      incomeBreakdown:[{source:"Blog posts & articles ($250-600 each)",amount:"$2,000–$4,800",howItWorks:"Write 8-10 SEO articles for fintech companies. Finance pays premium."},{source:"Whitepapers ($500-2000 each)",amount:"$500–$2,000",howItWorks:"In-depth reports for financial brands. High-ticket, less frequent."},{source:"Email & social packages",amount:"$500–$2,000",howItWorks:"Monthly content for financial advisors and crypto companies."}],
      tools:[{name:"Claude",cost:"$20/mo",purpose:"Research & drafting"},{name:"Grammarly",cost:"Free",purpose:"Polish"},{name:"Notion",cost:"Free",purpose:"Management"},{name:"Carrd",cost:"Free",purpose:"Portfolio"},{name:"LinkedIn",cost:"Free",purpose:"Client acquisition"}],
      dailySchedule:{description:`${time}hrs/week:`,blocks:[{time:"Morning",task:"Write client finance content",duration:"60 min"},{time:"Midday",task:"Client calls & revisions",duration:"20 min"},{time:"Afternoon",task:"LinkedIn outreach to fintech companies",duration:"20 min"},{time:"Evening",task:"Read finance news for content ideas",duration:"15 min"}]},
      weeklyPlan: wp(
        {t:"Portfolio",g:"Finance writing samples ready",d:[["Mon","Write 2 sample fintech blog posts using Claude","Topics: crypto, investing, budgeting"],["Tue","Write a sample financial email sequence","Welcome + nurture"],["Wed","Create a sample whitepaper outline","'State of AI in Finance 2026'"],["Thu","Set up portfolio on Carrd","Niche as 'fintech content writer'"],["Fri","List on Upwork + Contently + nDash","Apply to 5 finance gigs"]]},
        {t:"Land Clients",g:"First finance client",d:[["Mon","Find 20 fintech startups with blogs","List in Notion"],["Tue","DM founders on LinkedIn","Offer free sample"],["Wed","Apply to 10 finance writing gigs","Highlight niche expertise"],["Thu","Post finance writing tip on LinkedIn","Build authority"],["Fri","Follow up all","Deliver samples"]]},
        {t:"Deliver",g:"Testimonials collected",d:[["Mon","Overdeliver on first projects","Extra value"],["Tue","Get testimonials","Portfolio update"],["Wed","Raise prices 30%","Finance commands premium"],["Thu","LinkedIn case study","Share results"],["Fri","Outreach to bigger companies","VC-funded startups"]]},
        {t:"Scale",g:"Retainer clients",d:[["Mon","Pitch retainers $2000-4000/mo","Package deals"],["Tue","Start finance newsletter","Build audience"],["Wed","Explore ghostwriting for finance influencers","High ticket"],["Thu","Create templates for speed","Deliver faster"],["Fri","Review revenue","Plan scaling"]]}
      ),
      scripts:[{context:"LinkedIn DM to fintech founder",script:"Hey [Name], I write content for fintech companies — blogs, whitepapers, email sequences. Noticed [company] is growing fast but your content marketing could drive more organic leads. Want me to write a free sample article?"},{context:"Upwork proposal",script:"Hi! I specialize in finance content — fintech, crypto, investment, personal finance. I combine AI research with deep financial knowledge to create content that's accurate AND engaging. Happy to write a test piece."}],
      milestones:[{month:"Month 1",target:"$1,200",milestone:"3+ clients, niche established"},{month:"Month 3",target:"$5,000",milestone:"Retainer clients, premium pricing"},{month:"Month 6",target:"$9,000+",milestone:"Full roster, whitepaper clients, ghostwriting"}],
      risks:["Financial accuracy requirements","Compliance concerns","Slow payment from startups"],
      mitigations:["Always fact-check with multiple sources. Claude researches, you verify.","Add disclaimers. Focus on educational content, not financial advice.","50% upfront, 50% on delivery. Use contracts."]
    };
    secondary = {name:"Finance Newsletter",match:78,tagline:"Build an audience around money content",description:"Weekly finance newsletter monetized through sponsors and affiliates.",monthlyRevenue:"$500–$3,000",timeToFirstDollar:"4–6 weeks",difficulty:"Medium",quickWin:"Start a Substack called 'AI Money Insights', publish 3 posts this week using Claude"};
    tertiary = {name:"Financial Copywriting",match:75,tagline:"High-ticket sales pages for finance",description:"Write landing pages and sales funnels for finance products. Single projects pay $1K-5K.",monthlyRevenue:"$2,000–$8,000",timeToFirstDollar:"2–3 weeks",difficulty:"Medium-High",quickWin:"Study 3 fintech landing pages, rewrite one better using Claude, add to portfolio"};
    quickestWin = "Go to LinkedIn, search 'fintech founder' or 'crypto startup', find 5 companies with blogs that haven't posted recently. DM each offering a free article. Use Claude to draft each proposal in 30 seconds.";

  // ═══════════════════════════════════════════════════════════
  // 9. WRITING (general) → AI Content Agency
  // ═══════════════════════════════════════════════════════════
  } else if (hasWrite) {
    primary = { name: "AI-Powered Content Agency", match: 91, tagline: "Deliver premium content at 3x speed", description: "Use AI to create blogs, emails, ad copy, social media for businesses. You're the quality filter between AI and clients. Start on Upwork, scale to retainers.", whyYou: "Writing skills mean you turn AI drafts into genuinely good content. Most can't — that's your moat.", monthlyRevenue: "$2,500–$8,000", timeToFirstDollar: "1–2 weeks", difficulty: "Medium",
      revenueProjection:[{month:"Mo 1",low:400,high:1200},{month:"Mo 2",low:1000,high:2500},{month:"Mo 3",low:1800,high:4000},{month:"Mo 4",low:2500,high:6000},{month:"Mo 5",low:3500,high:7000},{month:"Mo 6",low:4000,high:8000}],
      incomeBreakdown:[{source:"Blog posts ($150-400 each)",amount:"$1,200–$3,200",howItWorks:"8-10 SEO articles per month for businesses."},{source:"Email sequences ($300-800)",amount:"$600–$2,400",howItWorks:"Welcome series, launches, newsletters."},{source:"Social media packages ($500-1500/mo)",amount:"$500–$2,000",howItWorks:"Monthly content for brands."}],
      tools:[{name:"Claude",cost:"$20/mo",purpose:"Drafting engine"},{name:"Grammarly",cost:"Free",purpose:"Polish"},{name:"Canva",cost:"$13/mo",purpose:"Social graphics"},{name:"Notion",cost:"Free",purpose:"Management"},{name:"Carrd",cost:"Free",purpose:"Portfolio"}],
      dailySchedule:{description:`${time}hrs/week:`,blocks:[{time:"Morning",task:"Write client content",duration:"60 min"},{time:"Midday",task:"Revisions & communication",duration:"20 min"},{time:"Afternoon",task:"Outreach to new clients",duration:"20 min"},{time:"Evening",task:"Content ideas & trends",duration:"15 min"}]},
      weeklyPlan: wp(
        {t:"Portfolio",g:"5 samples + profiles ready",d:[["Mon","Write 2 sample blog posts with AI","Different industries"],["Tue","Write sample email sequence","5-email welcome series"],["Wed","Create 5 social media posts","Design in Canva"],["Thu","Carrd portfolio","Upwork + Fiverr profiles"],["Fri","Apply to 10 content gigs","LinkedIn outreach"]]},
        {t:"Outreach",g:"First client",d:[["Mon","DM 10 businesses with bad blogs","Offer free sample"],["Tue","Follow up applications","LinkedIn content"],["Wed","Deliver free samples","Ask for paid work"],["Thu","10 more outreach messages","Different platforms"],["Fri","Follow up everything","Book calls"]]},
        {t:"Revenue",g:"3+ clients",d:[["Mon","Overdeliver first projects","Get testimonials"],["Tue","Raise prices 25%","Create packages"],["Wed","Case study on LinkedIn","Share results"],["Thu","Retainer pitches","$1000+/mo"],["Fri","Template common content types","Speed up delivery"]]},
        {t:"Scale",g:"Steady income",d:[["Mon","Pitch bigger companies","Higher rates"],["Tue","Start content TikTok","Build authority"],["Wed","Upsell existing clients","More services"],["Thu","Create digital product (writing templates)","Passive income"],["Fri","Review month","2x targets"]]}
      ),
      scripts:[{context:"DM to business owner",script:"Hey [Name], noticed [business] blog hasn't been updated recently. Content drives 3x more leads than paid ads. I write AI-powered content for businesses like yours — want a free sample article?"},{context:"Follow-up",script:"Hey [Name], wrote that sample article for [business] — [link]. Took a different angle on [topic] that I think your audience would love. What do you think?"}],
      milestones:[{month:"Month 1",target:"$800",milestone:"3+ clients"},{month:"Month 3",target:"$3,500",milestone:"Retainers established"},{month:"Month 6",target:"$7,000+",milestone:"Full roster"}],
      risks:["Underpricing","Too many revisions","Client acquisition"],
      mitigations:["$150/article minimum. Raise 25% every month.","2 revisions included. More = extra fee.","LinkedIn + Upwork + cold DMs. Diversify."]
    };
    secondary = {name:"Digital Product Store",match:84,tagline:"Create once, sell forever",description:"Write guides, templates, ebooks. Sell on Gumroad.",monthlyRevenue:"$1,000–$4,000",timeToFirstDollar:"1–2 weeks",difficulty:"Low-Medium",quickWin:"Write a '50 AI Prompts for [Industry]' guide, list on Gumroad for $19"};
    tertiary = {name:"Newsletter Business",match:76,tagline:"Build audience, monetize with sponsors",description:"Weekly newsletter on a topic you love. Grow to sponsors + affiliates.",monthlyRevenue:"$500–$3,000",timeToFirstDollar:"4–6 weeks",difficulty:"Medium",quickWin:"Start a Substack today. Publish your first post using Claude."};
    quickestWin = "Find 5 businesses on LinkedIn with bad or outdated blogs. DM each: 'I write AI-powered content — want a free sample article?' Use Claude to draft the article in 5 minutes.";

  // ═══════════════════════════════════════════════════════════
  // 10. DESIGN + BEAUTY → Beauty Brand Designer
  // ═══════════════════════════════════════════════════════════
  } else if (hasDesign && intBeauty) {
    primary = { name: "AI Beauty Brand Studio", match: 93, tagline: "Design for the $500B beauty industry using AI", description: "Create brand identities, social media content, packaging mockups, and ad creatives for beauty brands using AI + design skills. Beauty brands spend more on visual content than any other industry.", whyYou: "Design + beauty passion = you understand aesthetics AND the market. Beauty brands need designers who GET their audience.", monthlyRevenue: "$2,500–$7,000", timeToFirstDollar: "1–2 weeks", difficulty: "Medium",
      revenueProjection:[{month:"Mo 1",low:400,high:1200},{month:"Mo 2",low:1000,high:2500},{month:"Mo 3",low:1800,high:4000},{month:"Mo 4",low:2500,high:5500},{month:"Mo 5",low:3200,high:6500},{month:"Mo 6",low:4000,high:7000}],
      incomeBreakdown:[{source:"Social media design ($500-1500/mo)",amount:"$1,000–$3,000",howItWorks:"Monthly social content packages for beauty brands."},{source:"Brand identity ($500-2000)",amount:"$500–$2,000",howItWorks:"Logo, color palette, brand guidelines for new beauty brands."},{source:"Ad creatives ($200-500 each)",amount:"$400–$1,500",howItWorks:"Meta/TikTok ad designs for beauty products."}],
      tools:[{name:"Canva Pro",cost:"$13/mo",purpose:"Design"},{name:"Claude",cost:"$20/mo",purpose:"Copywriting + ideas"},{name:"Figma",cost:"Free",purpose:"Brand design"},{name:"Later",cost:"Free",purpose:"Social scheduling"},{name:"Notion",cost:"Free",purpose:"Client management"}],
      dailySchedule:{description:`${time}hrs/week:`,blocks:[{time:"Morning",task:"Design client content",duration:"60 min"},{time:"Midday",task:"Client feedback & revisions",duration:"20 min"},{time:"Afternoon",task:"Outreach to beauty brands",duration:"20 min"},{time:"Evening",task:"Trend research on Instagram/TikTok",duration:"15 min"}]},
      weeklyPlan: wp(
        {t:"Portfolio",g:"Beauty design portfolio ready",d:[["Mon","Create 3 mock beauty brand identities","Logo, colors, typography"],["Tue","Design 10 Instagram post templates for a beauty brand","Use Canva"],["Wed","Create ad mockups for a beauty product launch","Meta + TikTok formats"],["Thu","Set up portfolio on Behance + Carrd","Beauty-focused"],["Fri","List on Upwork + Fiverr as 'beauty brand designer'","Apply to 5 gigs"]]},
        {t:"Clients",g:"First beauty client",d:[["Mon","DM 15 small beauty brands on Instagram","Offer free social template pack"],["Tue","Apply to beauty design gigs on Upwork","Niche proposals"],["Wed","Create TikTok: 'I redesigned this beauty brand in 1 hour with AI'","Show before/after"],["Thu","Follow up all DMs","Offer trial packages"],["Fri","Deliver free work","Convert to paid"]]},
        {t:"Grow",g:"3+ clients",d:[["Mon","Deliver stunning work","Get testimonials"],["Tue","Create beauty design packages ($500-1500/mo)","Tiered pricing"],["Wed","Case study on Instagram","Tag the brands"],["Thu","Pitch retainers","Monthly content packages"],["Fri","Network in beauty communities","Facebook groups, Reddit"]]},
        {t:"Scale",g:"Retainers running",d:[["Mon","Create Canva template packs to sell","Passive income"],["Tue","Launch 'beauty brand in a box' productized service","Landing page"],["Wed","Raise prices 30%","Premium positioning"],["Thu","Explore beauty brand consulting","Strategy + design"],["Fri","Review month","Scale plan"]]}
      ),
      scripts:[{context:"DM to beauty brand on Instagram",script:"Hey [Brand]! 😍 Love your products, especially [specific product]. I'm a beauty brand designer who uses AI to create scroll-stopping content. Would love to create a free social media template pack for you — want me to send it over?"},{context:"Package pitch",script:"Hey [Name], glad you liked the templates! I offer monthly beauty content packages: 20 Instagram posts + 5 Stories + 2 ad creatives for $[X]/month. All designed in your brand style. Want me to put together a proposal?"}],
      milestones:[{month:"Month 1",target:"$800",milestone:"3+ beauty clients"},{month:"Month 3",target:"$3,500",milestone:"Retainer packages running"},{month:"Month 6",target:"$6,000+",milestone:"Known in beauty design space"}],
      risks:["Beauty brands are visual perfectionists","Many designers in this space","Scope creep on 'just one more revision'"],
      mitigations:["AI gives you 10x more options to show. Present 3 concepts, let them pick.","Niche further: 'clean beauty', 'indie beauty', 'K-beauty' branding.","3 revisions included. State it upfront. More = hourly rate."]
    };
    secondary = {name:"Beauty Template Store",match:82,tagline:"Sell Instagram templates for beauty brands",description:"Create and sell Canva template packs for beauty businesses on Etsy/Gumroad.",monthlyRevenue:"$500–$2,500",timeToFirstDollar:"1 week",difficulty:"Low",quickWin:"Create a '30 Beauty Instagram Templates' Canva pack, list on Etsy for $15 today"};
    tertiary = {name:"Beauty Influencer Content",match:74,tagline:"Create content for beauty influencers",description:"Design thumbnails, graphics, and content for beauty YouTubers/TikTokers.",monthlyRevenue:"$1,000–$3,000",timeToFirstDollar:"1–2 weeks",difficulty:"Low-Medium",quickWin:"DM 10 beauty influencers offering to redesign their Instagram highlights for free"};
    quickestWin = "Open Canva, create a set of 5 Instagram templates for a beauty brand aesthetic (pastels, clean, elegant). Post on Instagram with #beautydesigner. DM 5 small beauty brands offering the templates free. Total: 45 minutes.";

  // ═══════════════════════════════════════════════════════════
  // 11-22: More paths covering remaining combinations
  // ═══════════════════════════════════════════════════════════

  } else if (hasDesign) {
    primary = { name: "AI Design Agency", match: 91, tagline: "Design at 5x speed with AI as your co-pilot", description: "Offer logo design, social media graphics, brand identities, and ad creatives to businesses. Use AI for ideation and drafts, your skill for polish.", whyYou: "Design + AI = you deliver 5x faster than traditional designers with better results.", monthlyRevenue: "$2,000–$7,000", timeToFirstDollar: "1–2 weeks", difficulty: "Medium",
      revenueProjection:[{month:"Mo 1",low:400,high:1200},{month:"Mo 2",low:800,high:2500},{month:"Mo 3",low:1500,high:4000},{month:"Mo 4",low:2200,high:5500},{month:"Mo 5",low:3000,high:6500},{month:"Mo 6",low:3500,high:7000}],
      incomeBreakdown:[{source:"Social media packages",amount:"$1,000–$3,000",howItWorks:"Monthly content design for brands."},{source:"Brand identities",amount:"$500–$2,000",howItWorks:"Logo + brand guidelines per project."},{source:"Ad creatives",amount:"$300–$1,500",howItWorks:"Meta/Google ad designs."}],
      tools:[{name:"Canva Pro",cost:"$13/mo",purpose:"Design"},{name:"Figma",cost:"Free",purpose:"UI/Brand"},{name:"Claude",cost:"$20/mo",purpose:"Copy + ideas"},{name:"Notion",cost:"Free",purpose:"Management"}],
      dailySchedule:{description:`${time}hrs/week:`,blocks:[{time:"Morning",task:"Design client projects",duration:"60 min"},{time:"Midday",task:"Revisions",duration:"20 min"},{time:"Afternoon",task:"Outreach",duration:"20 min"},{time:"Evening",task:"Trends",duration:"15 min"}]},
      weeklyPlan: wp({t:"Portfolio",g:"Samples ready",d:[["Mon","Create 3 mock brand identities","Various styles"],["Tue","Design social template packs","10 templates each"],["Wed","Create ad mockups","Meta + TikTok"],["Thu","Portfolio site","Behance + Carrd"],["Fri","Upwork + Fiverr","Apply to gigs"]]},{t:"Clients",g:"First client",d:[["Mon","DM 15 businesses","Offer free design"],["Tue","Apply to gigs","Niche proposals"],["Wed","TikTok: design process","Before/after"],["Thu","Follow up","Convert leads"],["Fri","Deliver free work","Upsell"]]},{t:"Grow",g:"3+ clients",d:[["Mon","Overdeliver","Testimonials"],["Tue","Create packages","Tiered pricing"],["Wed","Case studies","Share results"],["Thu","Retainer pitches","Monthly deals"],["Fri","Raise prices","25% increase"]]},{t:"Scale",g:"Steady income",d:[["Mon","Sell template packs","Passive income"],["Tue","Productized service","Landing page"],["Wed","Network","Design communities"],["Thu","Explore consulting","Strategy + design"],["Fri","Review","Scale plan"]]}),
      scripts:[{context:"DM to business",script:"Hey [Name], love what you're doing with [business]. I noticed your visual branding could be sharper. I'm a designer who uses AI to create scroll-stopping content at 3x speed. Want a free social media template pack?"},{context:"Follow-up",script:"Created those templates for you — [link]. What do you think? I offer monthly design packages starting at $[X] if you'd like consistent content."}],
      milestones:[{month:"Month 1",target:"$800",milestone:"3+ clients"},{month:"Month 3",target:"$3,500",milestone:"Retainers"},{month:"Month 6",target:"$6,000+",milestone:"Full roster"}],
      risks:["Competing with cheap Fiverr designers","Revision overload","Finding clients"],
      mitigations:["Position as premium. Your AI speed = more options, not cheaper price.","3 revisions included. More = hourly.","Instagram + LinkedIn + Upwork. Show your work constantly."]
    };
    secondary = {name:"Design Template Store",match:83,tagline:"Sell templates on Etsy/Gumroad",description:"Create Canva/Figma template packs for businesses.",monthlyRevenue:"$500–$3,000",timeToFirstDollar:"1 week",difficulty:"Low",quickWin:"Create a '50 Social Media Templates' pack, list on Etsy for $19"};
    tertiary = {name:"UI/UX Freelancing",match:77,tagline:"Design apps and websites",description:"Freelance UI/UX design on Upwork for startups.",monthlyRevenue:"$2,000–$6,000",timeToFirstDollar:"1–2 weeks",difficulty:"Medium",quickWin:"Create Upwork profile as UI designer, apply to 5 gigs"};
    quickestWin = "Create 5 social media templates in Canva for a specific industry. Post on Instagram. DM 5 businesses offering them free. 30 minutes.";

  } else if (hasMkt) {
    primary = { name: "AI Marketing Agency", match: 91, tagline: "Run marketing for businesses using AI as your engine", description: "Offer social media management, ad creation, email marketing, and SEO content for small businesses. AI handles research and drafts, you handle strategy and client relationships.", whyYou: "Marketing skills + AI = you deliver results at half the cost of traditional agencies.", monthlyRevenue: "$2,500–$8,000", timeToFirstDollar: "1–2 weeks", difficulty: "Medium",
      revenueProjection:[{month:"Mo 1",low:500,high:1500},{month:"Mo 2",low:1000,high:3000},{month:"Mo 3",low:2000,high:5000},{month:"Mo 4",low:3000,high:6500},{month:"Mo 5",low:3500,high:7500},{month:"Mo 6",low:4000,high:8000}],
      incomeBreakdown:[{source:"Social media management ($500-1500/mo)",amount:"$1,000–$3,000",howItWorks:"Monthly content + posting for 2-4 clients."},{source:"Ad management ($300-1000/mo)",amount:"$600–$2,000",howItWorks:"Run Meta/Google ads for small businesses."},{source:"Email marketing ($500-1000)",amount:"$500–$2,000",howItWorks:"Email sequences and campaigns."}],
      tools:[{name:"Claude",cost:"$20/mo",purpose:"Content creation"},{name:"Canva Pro",cost:"$13/mo",purpose:"Graphics"},{name:"Later/Buffer",cost:"Free",purpose:"Scheduling"},{name:"Mailchimp",cost:"Free",purpose:"Email"},{name:"Google Analytics",cost:"Free",purpose:"Reporting"}],
      dailySchedule:{description:`${time}hrs/week:`,blocks:[{time:"Morning",task:"Create client content",duration:"45 min"},{time:"Midday",task:"Client calls & reporting",duration:"20 min"},{time:"Afternoon",task:"Ad optimization & outreach",duration:"30 min"},{time:"Evening",task:"Industry trends",duration:"15 min"}]},
      weeklyPlan: wp({t:"Setup",g:"Offer ready",d:[["Mon","Define service packages","3 tiers"],["Tue","Create case study from past marketing results","Even personal projects"],["Wed","Portfolio site + Upwork profile","Marketing niche"],["Thu","5 sample social posts for a mock client","Show your process"],["Fri","Apply to 10 marketing gigs","Cold DM 10 businesses"]]},{t:"Land Clients",g:"First client",d:[["Mon","DM 15 local businesses with bad social media","Offer free audit"],["Tue","Create 'free marketing audit' lead magnet","Share on LinkedIn"],["Wed","Follow up all leads","Book calls"],["Thu","Do free audit for 3 businesses","Show them what they're missing"],["Fri","Close first client","Start delivering"]]},{t:"Deliver",g:"Results + testimonials",d:[["Mon","Overdeliver on content","Post daily for client"],["Tue","Set up ad campaigns","Start small, optimize"],["Wed","Weekly report to client","Show growth"],["Thu","Ask for testimonial","Case study"],["Fri","Upsell additional services","Email + ads"]]},{t:"Scale",g:"3+ retainer clients",d:[["Mon","Pitch retainers to all clients","$1000+/mo"],["Tue","Systemize content creation","Templates + AI"],["Wed","Raise prices 25%","New clients only"],["Thu","Start your own marketing TikTok","Build authority"],["Fri","Review + plan","Scale to 5 clients"]]}),
      scripts:[{context:"Free audit offer",script:"Hey [Name], I looked at [business]'s marketing and found 3 quick wins that could [increase leads/sales]. Want me to send a free 5-minute audit? No strings attached — just want to help."},{context:"Close after audit",script:"Based on the audit, here's what I'd recommend: [3 actions]. I can handle all of this for $[X]/month. You'll see results within 2 weeks. Want to start?"}],
      milestones:[{month:"Month 1",target:"$1,000",milestone:"2 clients, delivering"},{month:"Month 3",target:"$4,000",milestone:"4 retainer clients"},{month:"Month 6",target:"$7,000+",milestone:"Full agency, considering hiring"}],
      risks:["Clients expecting instant results","Managing multiple platforms","Proving ROI"],
      mitigations:["Set expectations: 2-4 weeks to see traction. Show weekly progress.","Use scheduling tools. Batch everything.","Track everything. Monthly reports with real numbers."]
    };
    secondary = {name:"Affiliate Marketing",match:80,tagline:"Promote products, earn commissions",description:"Build content around products you love. Earn 5-30% per sale.",monthlyRevenue:"$500–$3,000",timeToFirstDollar:"2–3 weeks",difficulty:"Low-Medium",quickWin:"Sign up for 3 affiliate programs in your interest area, create review content today"};
    tertiary = {name:"Marketing Course Creator",match:74,tagline:"Teach businesses to market themselves",description:"Create a course teaching small businesses to use AI for marketing.",monthlyRevenue:"$1,000–$5,000",timeToFirstDollar:"3–4 weeks",difficulty:"Medium",quickWin:"Outline a mini-course: 'AI Marketing in 7 Days' on Gumroad for $29"};
    quickestWin = "Find 5 local businesses on Google Maps with fewer than 10 reviews. Walk in (or DM) and say: 'I help businesses get more customers through marketing. Can I show you 3 things you could improve for free?' Book a call.";

  } else if (hasSales) {
    primary = { name: "AI Sales Closer", match: 90, tagline: "Close deals for businesses and keep 10-20% commission", description: "Offer commission-based sales for startups, SaaS companies, and agencies. Use AI to write outreach, research prospects, and handle follow-ups. You focus on building relationships and closing.", whyYou: "Sales skills are the hardest to teach. AI handles the boring parts so you can do what you're best at — talking to people.", monthlyRevenue: "$3,000–$10,000", timeToFirstDollar: "1–2 weeks", difficulty: "Medium",
      revenueProjection:[{month:"Mo 1",low:500,high:2000},{month:"Mo 2",low:1500,high:4000},{month:"Mo 3",low:2500,high:6000},{month:"Mo 4",low:3500,high:8000},{month:"Mo 5",low:4500,high:9000},{month:"Mo 6",low:5000,high:10000}],
      incomeBreakdown:[{source:"Commission sales (10-20%)",amount:"$2,000–$6,000",howItWorks:"Close deals for companies and keep a percentage. SaaS deals = $200-2000 each."},{source:"Appointment setting ($50-200/qualified lead)",amount:"$500–$2,000",howItWorks:"Book qualified meetings for sales teams."},{source:"Sales consulting",amount:"$500–$2,000",howItWorks:"Teach small businesses how to sell better."}],
      tools:[{name:"Claude",cost:"$20/mo",purpose:"Research + outreach"},{name:"LinkedIn Sales Nav",cost:"Free trial",purpose:"Find prospects"},{name:"Calendly",cost:"Free",purpose:"Book calls"},{name:"Loom",cost:"Free",purpose:"Video pitches"},{name:"HubSpot",cost:"Free",purpose:"CRM"}],
      dailySchedule:{description:`${time}hrs/week:`,blocks:[{time:"Morning",task:"Prospect research + outreach",duration:"45 min"},{time:"Midday",task:"Sales calls + demos",duration:"30 min"},{time:"Afternoon",task:"Follow-ups + proposals",duration:"20 min"},{time:"Evening",task:"Pipeline review",duration:"10 min"}]},
      weeklyPlan: wp({t:"Find Companies",g:"3 companies to sell for",d:[["Mon","Search 'commission sales rep needed' on job boards","Apply to 5"],["Tue","DM 10 SaaS founders offering to close for commission","No base, pure performance"],["Wed","Research which products are easiest to sell","High commission, in-demand"],["Thu","Set up CRM in HubSpot","Organize pipeline"],["Fri","Sign first agreement","Start prospecting"]]},{t:"Prospect",g:"20 qualified leads",d:[["Mon","Use Claude to research 50 prospects","Personalize outreach"],["Tue","Send 20 cold emails/DMs","Track responses"],["Wed","Follow up non-responders","Different angle"],["Thu","5 discovery calls","Qualify leads"],["Fri","Send proposals","Follow up"]]},{t:"Close",g:"First deals closed",d:[["Mon","Handle objections","Use AI for battle cards"],["Tue","Close 2-3 deals","Celebrate"],["Wed","Ask for referrals from new customers","Warm intros"],["Thu","Document your sales process","Replicate"],["Fri","Report results to companies","Ask for better terms"]]},{t:"Scale",g:"Consistent closings",d:[["Mon","Negotiate higher commission","Prove your value"],["Tue","Add second company to sell for","Diversify"],["Wed","Build referral machine","Every customer refers 1"],["Thu","Start teaching sales","Course or coaching"],["Fri","Review month","Scale plan"]]}),
      scripts:[{context:"DM to SaaS founder",script:"Hey [Name], I help companies like [company] close more deals on commission — you only pay when I sell. I've sold [related experience]. Want to chat about a trial month? Zero risk for you."},{context:"Cold outreach to prospect",script:"Hi [Name], noticed [their company] is [growing/launching/hiring]. [Product you sell] could help you [specific benefit]. Mind if I send a quick 2-min video showing how? — [Your name], [company]"}],
      milestones:[{month:"Month 1",target:"$1,500",milestone:"First deals, pipeline building"},{month:"Month 3",target:"$5,000",milestone:"Consistent closings, 2+ companies"},{month:"Month 6",target:"$9,000+",milestone:"Top performer, higher commissions"}],
      risks:["Companies not paying commission","Long sales cycles","Rejection burnout"],
      mitigations:["Written agreement before starting. Monthly minimum or leave.","Focus on products with < 2 week sales cycle initially.","It's a numbers game. 20 nos = 1 yes. That 1 yes pays well."]
    };
    secondary = {name:"Sales Training Business",match:80,tagline:"Teach others to sell",description:"Create courses and coaching for salespeople wanting to use AI.",monthlyRevenue:"$1,000–$5,000",timeToFirstDollar:"3–4 weeks",difficulty:"Medium",quickWin:"Write a guide: 'How to Use AI to Close 2x More Deals' and sell on Gumroad for $29"};
    tertiary = {name:"Lead Generation Agency",match:78,tagline:"Fill pipelines for companies",description:"Use AI to generate qualified leads and sell them to businesses.",monthlyRevenue:"$2,000–$6,000",timeToFirstDollar:"2–3 weeks",difficulty:"Medium",quickWin:"Pick an industry, use Claude to build a list of 100 qualified prospects, sell the list"};
    quickestWin = "Search LinkedIn for 'looking for sales reps' or 'commission only'. Apply to 3 positions. Use Claude to write each application in 30 seconds. You could have a deal to sell by tonight.";

  } else if (hasTeach && intEdu) {
    primary = { name: "AI-Powered Online Course Creator", match: 92, tagline: "Turn your knowledge into a course empire", description: "Create and sell online courses using AI for curriculum design, lesson plans, quizzes, and marketing. Teaching + education interest = you know how to make content that actually teaches.", whyYou: "You understand how people learn. AI is your production assistant — you're the teacher.", monthlyRevenue: "$2,000–$8,000", timeToFirstDollar: "2–3 weeks", difficulty: "Medium",
      revenueProjection:[{month:"Mo 1",low:300,high:1000},{month:"Mo 2",low:800,high:2500},{month:"Mo 3",low:1500,high:4000},{month:"Mo 4",low:2500,high:5500},{month:"Mo 5",low:3000,high:7000},{month:"Mo 6",low:4000,high:8000}],
      incomeBreakdown:[{source:"Course sales ($29-149)",amount:"$1,000–$4,000",howItWorks:"Self-paced courses on Gumroad, Teachable, or Udemy."},{source:"Live cohorts ($199-499)",amount:"$500–$2,000",howItWorks:"Group coaching sessions. 10-20 students per cohort."},{source:"Tutoring/consulting ($50-150/hr)",amount:"$500–$2,000",howItWorks:"1-on-1 sessions for premium clients."}],
      tools:[{name:"Claude",cost:"$20/mo",purpose:"Curriculum + content"},{name:"Loom",cost:"Free",purpose:"Record lessons"},{name:"Gumroad",cost:"Free",purpose:"Sell courses"},{name:"Canva",cost:"$13/mo",purpose:"Course materials"},{name:"Zoom",cost:"Free",purpose:"Live sessions"}],
      dailySchedule:{description:`${time}hrs/week:`,blocks:[{time:"Morning",task:"Create course content with AI",duration:"60 min"},{time:"Midday",task:"Record lessons",duration:"30 min"},{time:"Afternoon",task:"Marketing + student support",duration:"20 min"},{time:"Evening",task:"Plan next module",duration:"15 min"}]},
      weeklyPlan: wp({t:"Course Creation",g:"First course outline + 3 lessons",d:[["Mon","Pick topic — solve ONE specific problem","Outline 5-7 modules with Claude"],["Tue","Write lessons 1-3 using Claude","Add exercises + quizzes"],["Wed","Record video lessons with Loom","Screen share + voiceover"],["Thu","Design workbooks in Canva","PDF downloads"],["Fri","Set up on Gumroad","Price at $29-49"]]},{t:"Complete + Launch",g:"Course live, first students",d:[["Mon","Finish remaining lessons","Record + edit"],["Tue","Create sales page","Benefits > features"],["Wed","Launch on social media + communities","Free preview lesson"],["Thu","TikTok: 'I created a course in 2 weeks with AI'","Show the process"],["Fri","Email friends/network","Ask for first reviews"]]},{t:"Grow",g:"20+ students, reviews",d:[["Mon","Respond to all students","Over-support early on"],["Tue","Ask for testimonials","Add to sales page"],["Wed","Create free mini-course as lead magnet","Email capture"],["Thu","Post on Reddit/Facebook in relevant groups","Value first"],["Fri","Plan course #2 or live cohort","Based on demand"]]},{t:"Scale",g:"Multiple products",d:[["Mon","Launch live cohort version ($199)","10 students max"],["Tue","Create advanced course ($99-149)","Upsell existing students"],["Wed","Affiliate program for students","They promote, earn %"],["Thu","Explore Udemy for reach","Passive income"],["Fri","Review revenue","Plan expansion"]]}),
      scripts:[{context:"TikTok hook",script:"'I made a course in 2 weeks using AI and it's already making money. Here's exactly how...' [Show the course, the process, the sales]"},{context:"Community post for launch",script:"Hey everyone! I just created [course name] that teaches [specific skill] step by step. First 20 students get 50% off. Here's what you'll learn: [3 bullet points]. Link: [url]. Happy to answer any questions!"}],
      milestones:[{month:"Month 1",target:"$500",milestone:"Course live, first students"},{month:"Month 3",target:"$3,000",milestone:"2+ courses, live cohorts"},{month:"Month 6",target:"$7,000+",milestone:"Course ecosystem, passive income"}],
      risks:["Course doesn't sell","Too much content, not enough marketing","Refund requests"],
      mitigations:["Validate first: ask 10 people if they'd buy. Pre-sell before building.","50% creating, 50% marketing. ALWAYS.","30-day refund policy builds trust. Most won't use it."]
    };
    secondary = {name:"Tutoring Platform",match:82,tagline:"Teach 1-on-1 with AI assistance",description:"Offer tutoring sessions enhanced by AI — custom lesson plans, practice problems.",monthlyRevenue:"$1,000–$4,000",timeToFirstDollar:"1 week",difficulty:"Low",quickWin:"List yourself on Wyzant or Preply as a tutor. Book 3 sessions this week."};
    tertiary = {name:"Educational Content Creator",match:76,tagline:"Teach on YouTube/TikTok",description:"Create educational content and monetize through ads, sponsors, courses.",monthlyRevenue:"$500–$3,000",timeToFirstDollar:"3–4 weeks",difficulty:"Medium",quickWin:"Record 3 teaching TikToks on your subject today. Post immediately."};
    quickestWin = "Open Claude, say: 'Create a course outline for [your topic] with 5 modules, each with 3 lessons, exercises, and a quiz.' You'll have a complete curriculum in 2 minutes. Start recording Lesson 1 today.";

  } else if (hasTeach) {
    primary = { name: "AI Tutoring & Coaching Business", match: 89, tagline: "Teach what you know, scale with AI", description: "Offer tutoring, coaching, or courses enhanced by AI-generated materials. Use Claude for lesson plans, practice problems, and personalized content.", whyYou: "Teaching skill + AI = you provide personalized education at scale.", monthlyRevenue: "$1,500–$5,000", timeToFirstDollar: "1 week", difficulty: "Low-Medium",
      revenueProjection:[{month:"Mo 1",low:300,high:800},{month:"Mo 2",low:700,high:1800},{month:"Mo 3",low:1200,high:3000},{month:"Mo 4",low:1800,high:4000},{month:"Mo 5",low:2200,high:4500},{month:"Mo 6",low:2800,high:5000}],
      incomeBreakdown:[{source:"1-on-1 sessions ($40-100/hr)",amount:"$800–$2,000",howItWorks:"Tutoring or coaching sessions."},{source:"Group sessions ($20-50/person)",amount:"$400–$1,500",howItWorks:"Small group classes, 5-15 students."},{source:"Digital courses ($19-49)",amount:"$300–$1,500",howItWorks:"Pre-recorded courses as passive income."}],
      tools:[{name:"Claude",cost:"$20/mo",purpose:"Lesson plans + materials"},{name:"Zoom",cost:"Free",purpose:"Sessions"},{name:"Gumroad",cost:"Free",purpose:"Sell courses"},{name:"Notion",cost:"Free",purpose:"Student management"}],
      dailySchedule:{description:`${time}hrs/week:`,blocks:[{time:"Morning",task:"Prepare lessons with AI",duration:"30 min"},{time:"Midday",task:"Teaching sessions",duration:"60 min"},{time:"Afternoon",task:"Follow-up + marketing",duration:"20 min"},{time:"Evening",task:"Create course content",duration:"15 min"}]},
      weeklyPlan: wp({t:"Setup",g:"Listed and ready",d:[["Mon","Define what you teach","Specific niche"],["Tue","Create 3 lesson plans with Claude","Different levels"],["Wed","List on Wyzant, Preply, or Fiverr","Tutoring profiles"],["Thu","Create free resource as lead magnet","PDF or video"],["Fri","Share in communities","Offer intro sessions"]]},{t:"First Students",g:"5+ students",d:[["Mon","Offer 3 free trial sessions","Convert to paid"],["Tue","Deliver amazing sessions","Use AI for personalization"],["Wed","Ask for reviews","Wyzant/Google"],["Thu","Post teaching tip on TikTok","Build authority"],["Fri","Follow up all leads","Book next week"]]},{t:"Grow",g:"10+ students, reviews",d:[["Mon","Raise rates 20%","You have reviews now"],["Tue","Start group sessions","More students per hour"],["Wed","Record best lesson as course","Sell on Gumroad"],["Thu","Create curriculum packages","Multi-session deals"],["Fri","Referral program","Students bring friends"]]},{t:"Scale",g:"Consistent income",d:[["Mon","Launch full course ($49)","Pre-recorded"],["Tue","Email past students","Upsell"],["Wed","Explore corporate training","Higher rates"],["Thu","Build teaching TikTok/YouTube","Organic leads"],["Fri","Review revenue","Plan expansion"]]}),
      scripts:[{context:"Tutoring listing",script:"[Title] Expert [Subject] Tutor — AI-Enhanced Learning [Body] I use AI to create personalized lesson plans and practice materials tailored to YOUR learning style. Every session comes with custom homework and progress tracking."},{context:"DM to potential student",script:"Hey! Saw you're looking for help with [subject]. I specialize in making [topic] click — I use AI to create custom practice problems at your exact level. Want to try a free 20-min intro session?"}],
      milestones:[{month:"Month 1",target:"$500",milestone:"5+ regular students"},{month:"Month 3",target:"$2,500",milestone:"10+ students, course launched"},{month:"Month 6",target:"$4,500+",milestone:"Multiple income streams"}],
      risks:["Inconsistent bookings","Students cancelling","Time-for-money trap"],
      mitigations:["Package deals: 4 sessions = discount + commitment.","24hr cancellation policy. Charge for no-shows.","Create courses for passive income alongside tutoring."]
    };
    secondary = {name:"Course Creator",match:82,tagline:"Record once, sell forever",description:"Turn your teaching into self-paced courses.",monthlyRevenue:"$500–$3,000",timeToFirstDollar:"2–3 weeks",difficulty:"Low-Medium",quickWin:"Outline a mini-course with Claude, record lesson 1 with Loom today"};
    tertiary = {name:"Education Content Creator",match:74,tagline:"Teach on social media",description:"Educational TikTok/YouTube content.",monthlyRevenue:"$300–$2,000",timeToFirstDollar:"3–4 weeks",difficulty:"Low",quickWin:"Record 3 educational TikToks today"};
    quickestWin = "List yourself on Wyzant or Preply right now as a tutor in your subject. Set your rate at $40/hr. You could have your first session booked today.";

  } else if (hasAnalytics) {
    primary = { name: "AI Data & Analytics Freelancer", match: 89, tagline: "Turn data into decisions for businesses", description: "Offer data analysis, reporting, and business intelligence to companies using AI tools. Clean data, find insights, create dashboards.", whyYou: "Analytics skills + AI = you process data 10x faster and find insights others miss.", monthlyRevenue: "$2,000–$7,000", timeToFirstDollar: "1–2 weeks", difficulty: "Medium",
      revenueProjection:[{month:"Mo 1",low:400,high:1200},{month:"Mo 2",low:1000,high:2500},{month:"Mo 3",low:1800,high:4000},{month:"Mo 4",low:2500,high:5500},{month:"Mo 5",low:3000,high:6500},{month:"Mo 6",low:3500,high:7000}],
      incomeBreakdown:[{source:"Data analysis projects ($500-2000)",amount:"$1,000–$4,000",howItWorks:"One-off analysis and reporting projects."},{source:"Monthly reporting ($500-1500/mo)",amount:"$500–$2,000",howItWorks:"Recurring analytics dashboards for clients."},{source:"Data consulting ($100-200/hr)",amount:"$500–$1,000",howItWorks:"Strategy sessions on data usage."}],
      tools:[{name:"Claude",cost:"$20/mo",purpose:"Data analysis"},{name:"Google Sheets",cost:"Free",purpose:"Analysis"},{name:"Looker Studio",cost:"Free",purpose:"Dashboards"},{name:"Python/Jupyter",cost:"Free",purpose:"Advanced analysis"},{name:"Notion",cost:"Free",purpose:"Management"}],
      dailySchedule:{description:`${time}hrs/week:`,blocks:[{time:"Morning",task:"Client data analysis",duration:"60 min"},{time:"Midday",task:"Create reports & dashboards",duration:"30 min"},{time:"Afternoon",task:"Client calls & outreach",duration:"20 min"},{time:"Evening",task:"Learn new tools",duration:"15 min"}]},
      weeklyPlan: wp({t:"Portfolio",g:"3 sample analyses ready",d:[["Mon","Create sample analysis of public dataset","Insights + visualization"],["Tue","Build sample dashboard in Looker Studio","Marketing metrics"],["Wed","Write case study: 'How data analysis saved $$'","Use AI"],["Thu","Upwork + LinkedIn profile","Analytics niche"],["Fri","Apply to 10 data gigs","Cold DM 10 businesses"]]},{t:"Clients",g:"First project",d:[["Mon","DM 15 businesses offering free data audit","'I'll analyze your metrics for free'"],["Tue","Apply to Upwork gigs","Tailored proposals"],["Wed","Deliver free audits","Actionable insights"],["Thu","Follow up, pitch paid work","Retainer offer"],["Fri","Close first client","Start analysis"]]},{t:"Deliver",g:"Results + testimonials",d:[["Mon","Overdeliver on analysis","Extra insights"],["Tue","Create beautiful report","Client-friendly"],["Wed","Present findings","Zoom call"],["Thu","Get testimonial","Case study"],["Fri","Upsell monthly reporting","Recurring revenue"]]},{t:"Scale",g:"3+ clients",d:[["Mon","Template your reports","Speed up"],["Tue","Pitch bigger companies","Higher rates"],["Wed","Create data course or toolkit","Passive income"],["Thu","LinkedIn content about data insights","Build authority"],["Fri","Review + plan","Scale"]]}),
      scripts:[{context:"Free data audit offer",script:"Hey [Name], I do AI-powered data analysis for businesses like [company]. I'd love to do a free audit of your [marketing/sales/operations] data — usually uncovers $X,000 in hidden opportunities. Interested?"},{context:"Report delivery",script:"Here's your analysis [link]. Key findings: 1) [insight], 2) [insight], 3) [insight]. Biggest opportunity: [specific recommendation] which could [impact]. Want to discuss implementing these?"}],
      milestones:[{month:"Month 1",target:"$800",milestone:"2+ projects"},{month:"Month 3",target:"$3,500",milestone:"Retainer clients"},{month:"Month 6",target:"$6,000+",milestone:"Premium analytics agency"}],
      risks:["Messy client data","Clients not acting on insights","Pricing too low"],
      mitigations:["Charge extra for data cleaning. Set expectations.","Present insights as $ impact. Makes it actionable.","$500 minimum project. Analytics is high-value work."]
    };
    secondary = {name:"Data Template Store",match:78,tagline:"Sell spreadsheet templates",description:"Create and sell analytics templates, dashboards, trackers on Gumroad.",monthlyRevenue:"$500–$2,000",timeToFirstDollar:"1 week",difficulty:"Low",quickWin:"Create a 'Business KPI Dashboard' template in Google Sheets, sell for $19 on Gumroad"};
    tertiary = {name:"Survey & Research Business",match:74,tagline:"Run market research for companies",description:"Use AI to design surveys, analyze results, create reports.",monthlyRevenue:"$1,000–$4,000",timeToFirstDollar:"2–3 weeks",difficulty:"Medium",quickWin:"Offer to run a customer survey for a local business for $200"};
    quickestWin = "Find a business on LinkedIn, offer a free data audit. Use Claude to analyze their public data (website traffic estimates, social media metrics, review sentiment). Present 3 actionable insights. 30 minutes total.";

  // ═══════════════════════════════════════════════════════════
  // DEFAULT: No specific skills / starting from zero
  // ═══════════════════════════════════════════════════════════
  } else if (intHealth) {
    primary = { name: "AI Health & Wellness Content Creator", match: 87, tagline: "Build a health brand without being a doctor", description: "Create health and wellness content on TikTok, YouTube, and a blog. Use AI for research, scripts, and article writing. Monetize through affiliates, sponsors, and digital products.", whyYou: "Health interest + AI = you can create accurate, engaging content faster than 99% of wellness creators.", monthlyRevenue: "$1,500–$5,000", timeToFirstDollar: "2–3 weeks", difficulty: "Low-Medium",
      revenueProjection:[{month:"Mo 1",low:100,high:400},{month:"Mo 2",low:300,high:1000},{month:"Mo 3",low:800,high:2500},{month:"Mo 4",low:1500,high:3500},{month:"Mo 5",low:2000,high:4500},{month:"Mo 6",low:2500,high:5000}],
      incomeBreakdown:[{source:"Health affiliate commissions",amount:"$500–$2,000",howItWorks:"Recommend supplements, fitness gear, apps. 10-30% commissions."},{source:"Sponsored content",amount:"$300–$1,500",howItWorks:"Wellness brands pay for features once you have audience."},{source:"Digital products",amount:"$200–$1,000",howItWorks:"Meal plans, workout guides, wellness trackers."}],
      tools:[{name:"Claude",cost:"$20/mo",purpose:"Content creation"},{name:"Canva",cost:"$13/mo",purpose:"Graphics"},{name:"CapCut",cost:"Free",purpose:"Video editing"},{name:"Gumroad",cost:"Free",purpose:"Sell products"},{name:"Amazon Associates",cost:"Free",purpose:"Affiliate income"}],
      dailySchedule:{description:`${time}hrs/week:`,blocks:[{time:"Morning",task:"Create 1 health content piece",duration:"30 min"},{time:"Midday",task:"Post on TikTok/Instagram",duration:"15 min"},{time:"Afternoon",task:"Engage with health communities",duration:"15 min"},{time:"Evening",task:"Research trending health topics",duration:"15 min"}]},
      weeklyPlan: wp({t:"Launch",g:"First 5 posts + accounts",d:[["Mon","Pick health niche (nutrition, fitness, mental health, sleep)","Set up TikTok + Instagram"],["Tue","Use Claude to write 5 health content scripts","Research-backed"],["Wed","Film 3 TikToks — simple tips format","Post with hashtags"],["Thu","Create 2 Instagram carousels in Canva","Health infographics"],["Fri","Sign up for health affiliate programs","Amazon, iHerb, etc"]]},{t:"Consistency",g:"Posting daily",d:[["Mon","Batch create 7 scripts with Claude","Week's content"],["Tue","Film 3 TikToks","Different formats"],["Wed","Create 2 carousels + 2 reels","Canva + CapCut"],["Thu","Post everything","Schedule for the week"],["Fri","Engage in health communities","Reddit, Facebook groups"]]},{t:"Monetize",g:"First affiliate sales",d:[["Mon","Add affiliate links to all bios","Linktree or Stan Store"],["Tue","Create 'best [product]' review content","With affiliate links"],["Wed","Create first digital product — meal plan or workout guide","$9-19 on Gumroad"],["Thu","TikTok: 'I tried [health product] for 30 days'","Affiliate content"],["Fri","Analyze what content gets most engagement","Double down"]]},{t:"Grow",g:"Steady income growing",d:[["Mon","Create premium digital product ($29-49)","Comprehensive guide"],["Tue","Pitch 5 health brands for sponsorship","Media kit"],["Wed","Start email list with free health guide","Build audience you own"],["Thu","Repurpose best content to YouTube","Longer format"],["Fri","Review month","Scale what works"]]}),
      scripts:[{context:"TikTok health content hook",script:"'Stop doing [common mistake] — here's what to do instead...' [Show the science-backed alternative] [End with: 'Follow for more health tips backed by research']"},{context:"Brand sponsorship pitch",script:"Hey [Brand]! I create health content for [X] followers focused on [niche]. My audience is [demographic]. Interested in a sponsored post/review? I can show [product] in action. Rates: $[X]."}],
      milestones:[{month:"Month 1",target:"$200",milestone:"Daily posting, growing followers"},{month:"Month 3",target:"$1,500",milestone:"1K+ followers, affiliate income"},{month:"Month 6",target:"$4,000+",milestone:"Brand deals, product sales, growing"}],
      risks:["Health misinformation claims","Slow follower growth","Affiliate income low initially"],
      mitigations:["Always cite sources. Use disclaimers. 'Not medical advice.'","First month is planting seeds. Consistency wins.","Diversify: affiliates + products + sponsors. Don't rely on one."]
    };
    secondary = {name:"AI Wellness Coach",match:78,tagline:"Coach people on health habits",description:"1-on-1 coaching for nutrition, fitness habits, wellness routines.",monthlyRevenue:"$1,000–$3,000",timeToFirstDollar:"1–2 weeks",difficulty:"Low",quickWin:"Offer 3 free coaching sessions in a fitness Facebook group. Convert to paid."};
    tertiary = {name:"Health Print-on-Demand",match:70,tagline:"Sell fitness merch",description:"Create fitness/wellness themed merch using AI designs.",monthlyRevenue:"$300–$1,500",timeToFirstDollar:"1–2 weeks",difficulty:"Low",quickWin:"Create 5 fitness motivation designs in Canva, upload to Redbubble"};
    quickestWin = "Open Claude: 'Give me 10 science-backed health tips most people don't know about [your niche].' Film a TikTok with the top 3. Post now. Takes 15 minutes.";

  } else if (intFinance) {
    primary = { name: "AI Personal Finance Creator", match: 86, tagline: "Teach people about money using AI as your research team", description: "Create personal finance content on TikTok/YouTube/blog. Use AI to research, write scripts, and create guides. Monetize through affiliates (credit cards, investing apps), sponsors, and digital products.", whyYou: "Finance interest + AI research = you create more accurate, useful content than most finance influencers.", monthlyRevenue: "$1,500–$5,000", timeToFirstDollar: "2–3 weeks", difficulty: "Low-Medium",
      revenueProjection:[{month:"Mo 1",low:100,high:400},{month:"Mo 2",low:300,high:1000},{month:"Mo 3",low:800,high:2500},{month:"Mo 4",low:1500,high:3500},{month:"Mo 5",low:2000,high:4500},{month:"Mo 6",low:2500,high:5000}],
      incomeBreakdown:[{source:"Finance affiliates",amount:"$500–$2,000",howItWorks:"Credit card, investing app, and banking referrals. $25-200 per signup."},{source:"Ad/sponsor revenue",amount:"$300–$1,500",howItWorks:"YouTube ads + brand deals once you have audience."},{source:"Digital products",amount:"$200–$1,000",howItWorks:"Budget templates, investing guides, financial planners."}],
      tools:[{name:"Claude",cost:"$20/mo",purpose:"Research + scripts"},{name:"Canva",cost:"$13/mo",purpose:"Graphics"},{name:"CapCut",cost:"Free",purpose:"Video editing"},{name:"Gumroad",cost:"Free",purpose:"Digital products"}],
      dailySchedule:{description:`${time}hrs/week:`,blocks:[{time:"Morning",task:"Create 1 finance content piece",duration:"30 min"},{time:"Midday",task:"Post + engage",duration:"15 min"},{time:"Afternoon",task:"Research financial topics",duration:"15 min"},{time:"Evening",task:"Reply to comments + DMs",duration:"10 min"}]},
      weeklyPlan: wp({t:"Launch",g:"5 posts, accounts set up",d:[["Mon","Pick finance sub-niche (budgeting, investing, debt, side income)","Set up accounts"],["Tue","Write 5 scripts with Claude","Research-backed"],["Wed","Film 3 TikToks","Simple tips format"],["Thu","Create 2 Instagram carousels","Canva"],["Fri","Sign up for finance affiliates","Credit cards, investing apps"]]},{t:"Consistency",g:"Daily posting",d:[["Mon","Batch 7 scripts","Week planned"],["Tue","Film content","Different formats"],["Wed","Edit + graphics","Schedule"],["Thu","Post + engage","Communities"],["Fri","Analyze metrics","What works?"]]},{t:"Monetize",g:"First income",d:[["Mon","Add affiliate links","Linktree"],["Tue","Create 'best credit cards' or 'best investing apps' content","Affiliates"],["Wed","Create budget template digital product","$9-19 on Gumroad"],["Thu","Finance challenge content","'I saved $X this month'"],["Fri","Pitch finance brands","Sponsorships"]]},{t:"Grow",g:"Scaling",d:[["Mon","Premium financial planner product ($29-49)","Sell on Gumroad"],["Tue","Start YouTube for longer content","Higher ad rates"],["Wed","Email list with free guide","Build owned audience"],["Thu","Explore Substack newsletter","Additional channel"],["Fri","Review month","Double down on what works"]]}),
      scripts:[{context:"TikTok finance hook",script:"'If you make $[X] a year, here's exactly how much you should save, invest, and spend...' [Break it down with visuals] [CTA: 'Follow for more money tips']"},{context:"Affiliate content",script:"'I tested 5 investing apps so you don't have to. Here's my honest ranking...' [Review each with pros/cons] [Affiliate links in bio]"}],
      milestones:[{month:"Month 1",target:"$200",milestone:"Daily content, growing"},{month:"Month 3",target:"$1,500",milestone:"Affiliate income flowing"},{month:"Month 6",target:"$4,000+",milestone:"Multiple income streams"}],
      risks:["Giving unqualified financial advice","Slow growth","Affiliate rejection"],
      mitigations:["Always disclaim: 'Not financial advice.' Share information, not recommendations.","Finance content has high RPM. Patience pays literally.","Start with Amazon Associates (easy approval). Graduate to premium programs."]
    };
    secondary = {name:"Budget Template Store",match:80,tagline:"Sell financial templates",description:"Create and sell budget spreadsheets, financial trackers on Gumroad/Etsy.",monthlyRevenue:"$500–$2,000",timeToFirstDollar:"1 week",difficulty:"Low",quickWin:"Create a 'Monthly Budget Tracker' in Google Sheets with AI, sell on Gumroad for $9"};
    tertiary = {name:"Financial Coaching",match:72,tagline:"Help people manage money",description:"1-on-1 budget coaching sessions.",monthlyRevenue:"$500–$2,000",timeToFirstDollar:"1–2 weeks",difficulty:"Low",quickWin:"Offer 3 free 'financial check-up' calls in personal finance communities"};
    quickestWin = "Ask Claude: 'Create a beautiful monthly budget template with income, expenses, savings goals, and net worth tracker.' Build it in Google Sheets. List on Gumroad for $9. Share in r/personalfinance. 30 minutes.";

  } else if (intEcom) {
    primary = { name: "AI-Powered Print-on-Demand Business", match: 86, tagline: "Sell custom products with zero inventory", description: "Use AI to generate niche designs for t-shirts, mugs, posters, phone cases. List on Redbubble, Merch by Amazon, Etsy. AI creates designs 100x faster than traditional designers.", whyYou: "E-commerce interest + AI design tools = you can test hundreds of niches quickly. Speed wins in POD.", monthlyRevenue: "$1,000–$4,000", timeToFirstDollar: "1–2 weeks", difficulty: "Low",
      revenueProjection:[{month:"Mo 1",low:50,high:300},{month:"Mo 2",low:200,high:800},{month:"Mo 3",low:500,high:1500},{month:"Mo 4",low:800,high:2500},{month:"Mo 5",low:1200,high:3500},{month:"Mo 6",low:1500,high:4000}],
      incomeBreakdown:[{source:"Redbubble/Merch by Amazon",amount:"$400–$1,500",howItWorks:"Passive royalties from AI-generated designs. $2-8 per sale."},{source:"Etsy POD store",amount:"$300–$1,500",howItWorks:"Higher margins on Etsy with print-on-demand integration."},{source:"TikTok Shop / Ads",amount:"$200–$1,000",howItWorks:"Drive traffic with viral product videos."}],
      tools:[{name:"Claude",cost:"$20/mo",purpose:"Niche research + slogans"},{name:"Canva",cost:"$13/mo",purpose:"Design"},{name:"Kittl",cost:"Free",purpose:"T-shirt designs"},{name:"Printful",cost:"Free",purpose:"Print-on-demand fulfillment"},{name:"Etsy",cost:"$0.20/listing",purpose:"Marketplace"}],
      dailySchedule:{description:`${time}hrs/week:`,blocks:[{time:"Morning",task:"Research niches + create designs",duration:"40 min"},{time:"Midday",task:"Upload to platforms",duration:"20 min"},{time:"Afternoon",task:"Create TikTok product videos",duration:"20 min"},{time:"Evening",task:"Analyze sales + trends",duration:"10 min"}]},
      weeklyPlan: wp({t:"First Designs",g:"20 designs on 2 platforms",d:[["Mon","Research 5 profitable niches using Claude","Hobbies, professions, memes"],["Tue","Create 10 designs in Canva/Kittl","Text-based + graphic"],["Wed","Upload to Redbubble","All product types"],["Thu","Create 10 more designs","Different niches"],["Fri","Upload to Merch by Amazon or Etsy","Set up Printful"]]},{t:"Scale Designs",g:"50+ designs live",d:[["Mon","Create 10 designs in trending niches","Use TikTok for inspiration"],["Tue","Upload all","Optimize titles with SEO keywords"],["Wed","Film 3 TikToks showing your products","'I designed this in 2 minutes with AI'"],["Thu","Create 10 more designs","Test new niches"],["Fri","Analyze first sales data","Which niches sell?"]]},{t:"Optimize",g:"First consistent sales",d:[["Mon","Double down on selling niches","20 more designs in those"],["Tue","Create Etsy store for higher margins","Premium positioning"],["Wed","TikTok content showing real products","Unboxing, reviews"],["Thu","Test paid TikTok ads ($5/day)","On best-selling product"],["Fri","Research seasonal trends","Holiday designs ahead"]]},{t:"Business Mode",g:"Daily sales",d:[["Mon","Create 20 designs in top niches","Quantity game"],["Tue","Launch on 3rd platform","Teepublic or Society6"],["Wed","Create 'niche collection' bundles","Curated sets"],["Thu","TikTok viral attempt","Trending sound + product"],["Fri","Review revenue per niche","Cut losers, scale winners"]]}),
      scripts:[{context:"TikTok product showcase",script:"'I designed this [product] using AI in 2 minutes and people are actually buying it 😅' [Show the design process sped up] [Show the actual product] [CTA: 'Link in bio']"},{context:"Etsy listing optimization",script:"[Title] [Niche] [Product Type] — [Adjective] Gift for [Person] — [Occasion] [Tags] Use 13 tags mixing broad ('funny mug') and specific ('gift for programmer birthday')"}],
      milestones:[{month:"Month 1",target:"$100",milestone:"50+ designs, first sales"},{month:"Month 3",target:"$1,000",milestone:"100+ designs, daily sales"},{month:"Month 6",target:"$3,000+",milestone:"300+ designs, multiple platforms, passive"}],
      risks:["Designs not selling","Copyright/trademark issues","Platform suspensions"],
      mitigations:["It's a numbers game. 5% of designs = 95% of revenue. Create many.","Never use trademarks, brand names, or copyrighted characters. Original only.","Read platform rules. Diversify across 3+ platforms."]
    };
    secondary = {name:"Dropshipping with AI",match:78,tagline:"Sell trending products",description:"Find and sell trending products using AI for research and ad copy.",monthlyRevenue:"$1,000–$5,000",timeToFirstDollar:"2–3 weeks",difficulty:"Medium",quickWin:"Use Claude to research 10 trending products on AliExpress, set up a free Shopify trial"};
    tertiary = {name:"Amazon KDP Books",match:75,tagline:"Publish low-content books",description:"Create coloring books, journals, planners using AI. Sell on Amazon.",monthlyRevenue:"$300–$2,000",timeToFirstDollar:"2–3 weeks",difficulty:"Low",quickWin:"Ask Claude to create a niche coloring book outline. Design 20 pages in Canva. Upload to KDP today."};
    quickestWin = "Open Canva, create 5 funny t-shirt designs for a specific niche (nurses, programmers, dog moms). Upload to Redbubble with keyword-rich titles. Takes 30 minutes. You're now a store owner.";

  // ═══════════════════════════════════════════════════════════
  // ABSOLUTE DEFAULT: No skills, no specific interests
  // ═══════════════════════════════════════════════════════════
  } else {
    primary = { name: "AI Digital Product Business", match: 88, tagline: "Create and sell digital products that solve real problems", description: "Use AI to create Notion templates, planners, guides, prompt packs, toolkits. Sell on Gumroad or Stan Store. Market through TikTok by showing the creation process.", whyYou: "Starting from zero is an advantage — AI is the skill. You'll create products for people like you, which is the biggest market.", monthlyRevenue: "$1,500–$5,000", timeToFirstDollar: "1–2 weeks", difficulty: "Low-Medium",
      revenueProjection:[{month:"Mo 1",low:100,high:400},{month:"Mo 2",low:300,high:1000},{month:"Mo 3",low:700,high:2500},{month:"Mo 4",low:1200,high:3500},{month:"Mo 5",low:1800,high:4500},{month:"Mo 6",low:2500,high:5000}],
      incomeBreakdown:[{source:"Templates & toolkits ($15-49)",amount:"$800–$2,500",howItWorks:"Notion templates, budget trackers, content planners. Build once, sell forever."},{source:"Mini-courses & guides ($29-79)",amount:"$500–$1,500",howItWorks:"Package your AI process into step-by-step guides."},{source:"Bundle deals",amount:"$200–$1,000",howItWorks:"Combine products at discount. Upsell via email."}],
      tools:[{name:"Claude",cost:"$20/mo",purpose:"Product creation"},{name:"Canva Pro",cost:"$13/mo",purpose:"Design"},{name:"Notion",cost:"Free",purpose:"Build templates"},{name:"Gumroad",cost:"Free (10% fee)",purpose:"Sell products"},{name:"CapCut",cost:"Free",purpose:"TikTok editing"}],
      dailySchedule:{description:`${time}hrs/week — create first, market second:`,blocks:[{time:"Morning",task:"Create product content with AI + Canva",duration:"40 min"},{time:"Midday",task:"Film 1 TikTok of your process",duration:"15 min"},{time:"Afternoon",task:"Engage in communities",duration:"15 min"},{time:"Evening",task:"Check sales, plan tomorrow",duration:"10 min"}]},
      weeklyPlan: wp(
        {t:"First Product",g:"1 product live, first TikTok",d:[["Mon","Research top Gumroad products in your interest area","Find one you can improve with AI"],["Tue","Use Claude to create product content","Design in Canva"],["Wed","Set up Gumroad, upload, write description","Price at $19"],["Thu","TikTok: 'I made a digital product in 2 hours with AI'","Show process"],["Fri","Share in communities, start product #2","Reddit, Facebook"]]},
        {t:"Content Machine",g:"3 products, daily TikToks",d:[["Mon","Launch product #2","TikTok about it"],["Tue","Product #3 — higher value ($29-39)","Premium version"],["Wed","Create bundle of all 3","Discount"],["Thu","TikTok: 'I sell digital products while I sleep'","Lifestyle angle"],["Fri","Analyze which TikToks get views","Double down on that style"]]},
        {t:"Optimize",g:"First $100 in sales",d:[["Mon","2 more products based on what sells","Listen to the market"],["Tue","Optimize listings — better descriptions, mockups","A/B test prices"],["Wed","Create free lead magnet","Build email list"],["Thu","Email sequence: free → paid","Automated funnel"],["Fri","Batch 5 TikToks","Consistency"]]},
        {t:"Scale",g:"Daily sales system",d:[["Mon","Most ambitious product — mini-course ($49-79)","Use Claude for content"],["Tue","Design + host on Gumroad","TikTok about it"],["Wed","Cross-sell to existing buyers","Email campaign"],["Thu","Explore Etsy as second platform","More traffic"],["Fri","Review month — revenue, best products","Plan month 2"]]}
      ),
      scripts:[{context:"TikTok hook for digital products",script:"'I made $[X] selling digital products I created with AI. Here's exactly what I sell...' [Show 3 products on screen] [Explain each in 5 seconds] [CTA] 'Link in bio'"},{context:"Reddit value post",script:"[Title] 'I used AI to create a [template/guide] for [problem] — free download' [Body] Share genuine value, explain what it does. Link free version. [Comment] 'I also have a premium version with [extras] on Gumroad.'"}],
      milestones:[{month:"Month 1",target:"$300",milestone:"5+ products, first sales"},{month:"Month 3",target:"$2,000",milestone:"10+ products, daily sales"},{month:"Month 6",target:"$4,000+",milestone:"Product ecosystem, passive income"}],
      risks:["Products not selling","Market saturation","Perfectionism"],
      mitigations:["First 5 products = experiments. Let market tell you what's good.","Niche down. 'Budget template' is saturated. 'Budget template for freelance designers' is not.","Ship 80% quality today. Done > perfect."]
    };
    secondary = {name:"AI Service Reseller",match:80,tagline:"Sell AI-generated services locally",description:"Offer logo design, social posts, email writing to local businesses using AI.",monthlyRevenue:"$1,000–$4,000",timeToFirstDollar:"1 week",difficulty:"Low",quickWin:"Walk into 5 local businesses, check their social media, offer a week of posts for $50"};
    tertiary = {name:"Affiliate Content Creator",match:75,tagline:"Review products, earn commissions",description:"TikTok/YouTube reviews with affiliate links.",monthlyRevenue:"$500–$3,000",timeToFirstDollar:"2–4 weeks",difficulty:"Low",quickWin:"Sign up Amazon Associates, review 3 products you own, film TikToks today"};
    quickestWin = "Open Gumroad.com, create a free account. Ask Claude: 'Create a premium AI prompt pack for [your interest] — 50 prompts organized by category.' Design a cover in Canva, list for $19. 30 minutes, product for sale.";
  }

    const skillNote = sk.length>1 && !noSkills ? "Your " + sk.slice(0,2).join(" + ") + " combination is actually rare — most people have one or the other." : noSkills ? "Starting from zero is actually an advantage — you have no bad habits to unlearn and AI levels the playing field completely." : "Your skills give you a real edge that AI amplifies rather than replaces.";
    const timeNote = time==="5" ? "tight but enough to start" : "solid runway for building something real";
    return { primary, secondary, tertiary,
    personalInsight: "You're a " + sit + " with " + time + " hrs/week — " + timeNote + ". " + skillNote + " The key is speed of execution over perfection.",
    quickestWin,
    shareCard: {headline:"AI says I can make " + primary.monthlyRevenue + "/mo as a", path:primary.name, match:primary.match, timeframe:"in 3-6 months"},
  };
  };


  const startLoading = () => { setScreen("loading"); setLp(0); aiRef.current = false; window.__bp = null; };

  // AI call + loading
  useEffect(() => {
    if (screen !== "loading") return;
    if (!aiRef.current) {
      aiRef.current = true;
      (async () => {
        try {
          const a = answers;
          const prompt = `You are a world-class business strategist. Give SPECIFIC, ACTIONABLE advice — real platforms, real pricing, real strategies. CRITICAL: Respond ENTIRELY in ${langName}. Every single field — name, tagline, description, whyYou, scripts, personalInsight, quickestWin, milestones — must be written in ${langName}.

USER: Situation: ${a.situation} | Skills: ${(a.skills||[]).join(",")} | Interests: ${(a.interests||[]).join(",")} | Hours/week: ${a.time} | Budget: $${a.budget} | Goal: $${a.goal}/mo

Respond ONLY with valid JSON (no markdown, no backticks):
{"primary":{"name":"string","match":85-97,"tagline":"one exciting sentence","description":"3 sentences: what it is, who you serve, why it works","whyYou":"2 sentences why their specific skills make this perfect","monthlyRevenue":"$X,XXX – $X,XXX","timeToFirstDollar":"X – X weeks","difficulty":"Low|Medium|Medium-High|High","revenueProjection":[{"month":"Mo 1","low":200,"high":500},{"month":"Mo 2","low":500,"high":1200},{"month":"Mo 3","low":1000,"high":2500},{"month":"Mo 4","low":1800,"high":4000},{"month":"Mo 5","low":2500,"high":5500},{"month":"Mo 6","low":3500,"high":8000}],"incomeBreakdown":[{"source":"stream name","amount":"$X,XXX","howItWorks":"2 sentences"}],"tools":[{"name":"Real Tool","cost":"$XX/mo or Free","purpose":"what for"}],"dailySchedule":{"description":"How their day looks","blocks":[{"time":"time range","task":"specific task","duration":"X min"}]},"weeklyPlan":[{"week":"Week 1","title":"Phase","goal":"end of week goal","days":[{"day":"Mon","tasks":["task 1","task 2"]},{"day":"Tue","tasks":["t","t"]},{"day":"Wed","tasks":["t","t"]},{"day":"Thu","tasks":["t","t"]},{"day":"Fri","tasks":["t","t"]}]},{"week":"Week 2","title":"Phase","goal":"goal","days":[{"day":"Mon","tasks":["t","t"]},{"day":"Tue","tasks":["t","t"]},{"day":"Wed","tasks":["t","t"]},{"day":"Thu","tasks":["t","t"]},{"day":"Fri","tasks":["t","t"]}]},{"week":"Week 3","title":"Phase","goal":"goal","days":[{"day":"Mon","tasks":["t","t"]},{"day":"Tue","tasks":["t","t"]},{"day":"Wed","tasks":["t","t"]},{"day":"Thu","tasks":["t","t"]},{"day":"Fri","tasks":["t","t"]}]},{"week":"Week 4","title":"Phase","goal":"goal","days":[{"day":"Mon","tasks":["t","t"]},{"day":"Tue","tasks":["t","t"]},{"day":"Wed","tasks":["t","t"]},{"day":"Thu","tasks":["t","t"]},{"day":"Fri","tasks":["t","t"]}]}],"scripts":[{"context":"situation","script":"copy-paste template"}],"milestones":[{"month":"Month 1","target":"$XXX","milestone":"goal"},{"month":"Month 3","target":"$X,XXX","milestone":"goal"},{"month":"Month 6","target":"$X,XXX","milestone":"goal"}],"risks":["risk 1","risk 2"],"mitigations":["solution 1","solution 2"]},"secondary":{"name":"str","match":75-89,"tagline":"str","description":"str","monthlyRevenue":"str","timeToFirstDollar":"str","difficulty":"str","quickWin":"str"},"tertiary":{"name":"str","match":65-82,"tagline":"str","description":"str","monthlyRevenue":"str","timeToFirstDollar":"str","difficulty":"str","quickWin":"str"},"personalInsight":"2 motivating sentences about their unique advantages","quickestWin":"The fastest thing they can do in 60 minutes — absurdly specific","shareCard":{"headline":"AI says I can make $X,XXX/mo as a...","path":"primary name","match":94,"timeframe":"in X months"}}`;

          const r = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST", headers: { "Content-Type": "application/json" },
            signal: AbortSignal.timeout(45000),
            body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 4000, messages: [{ role: "user", content: prompt }] }),
          });
          const d = await r.json();
          const t = d.content?.map(b => b.text || "").join("") || "";
          const parsed = JSON.parse(t.replace(/```json|```/g, "").trim());
          window.__bp = parsed?.primary?.name ? parsed : null;
        } catch (e) {
          window.__bp = null;
        }
        // Use the properly tailored fallback if AI failed
        if (!window.__bp) {
          window.__bp = buildFallback();
        }
      })();
    }
    if (lp >= LOAD_PHASES.length) {
      let w = 0;
      const i = setInterval(() => { w++; if (window.__bp) { setReport(window.__bp); window.__bp = null; setScreen("report"); clearInterval(i); } else if (w > 80) { setReport(window.__bp || buildFallback()); window.__bp = null; setScreen("report"); clearInterval(i); } }, 250);
      return () => clearInterval(i);
    }
    const t = setTimeout(() => setLp(p => p + 1), 820);
    return () => clearTimeout(t);
  }, [screen, lp]);

  const startQuiz = () => { setPage("quiz"); setScreen("quiz"); setStep(-1); setAnswers({}); setReport(null); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const faqs = [
    { q: "Is this actually free?", a: "Yes! The basic blueprint with your recommended path, match score, and revenue potential is 100% free. The full blueprint with day-by-day plan, scripts, tools, and progress tracker is $19 one-time." },
    { q: "How is this different from just asking ChatGPT?", a: "ChatGPT gives generic advice. Blueprint AI asks about YOUR specific skills, schedule, budget, and goals, then runs your profile through 1,400+ income models to find the best match. You get a personalized day-by-day action plan, copy-paste scripts, exact tools with pricing, and a progress tracker. It's the difference between a Google search and a personal consultant." },
    { q: "What if I have no skills?", a: "That's actually the most common starting point! The AI is specifically designed to find paths that work for beginners. Many of our highest-rated blueprints are for people who selected 'starting from zero.' AI is the great equalizer." },
    { q: "Is this a scam? Will I actually make money?", a: "We provide a detailed, actionable plan — not a guarantee. Your results depend entirely on your execution. What we can guarantee: the strategies are real, the tools exist, the pricing is accurate, and thousands of people are using similar approaches to earn income. We also offer a 30-day refund policy." },
    { q: "Is my data private?", a: "Absolutely. We don't store your quiz answers or share any personal information. Your blueprint is generated in real-time and only you can see it. We use Stripe for payments — we never see your card details." },
    { q: "Can I get a refund?", a: "Yes. If you're not satisfied with your full blueprint, contact us within 30 days for a complete refund. No questions asked." },
    { q: "How long does it take?", a: "The quiz takes about 90 seconds. Your AI-powered blueprint is generated instantly after that. The full report includes a 4-week plan, so you'll know exactly what to do every single day." },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html,body,#root{min-height:100vh}
        body{background:${Bg};color:#fff;font-family:'Outfit',sans-serif;-webkit-font-smoothing:antialiased}
        button{font-family:inherit;border:none;cursor:pointer}
        button:focus{outline:none}
        @keyframes su{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fi{from{opacity:0}to{opacity:1}}
        @keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(232,200,114,.15)}50%{box-shadow:0 0 40px rgba(232,200,114,.25)}}
        .bgG{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(232,200,114,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(232,200,114,.02) 1px,transparent 1px);background-size:64px 64px}
        .gl1{position:fixed;top:-15%;right:-15%;width:600px;height:600px;border-radius:50%;pointer-events:none;z-index:0;background:radial-gradient(circle,rgba(232,200,114,.04),transparent 65%)}
        @keyframes scan{0%{transform:translateX(-100%)}100%{transform:translateX(250%)}}
        @media(max-width:600px){.mob-col{flex-direction:column!important}.mob-full{width:100%!important}.hero-grid{flex-direction:column-reverse!important}}
        input:focus{outline:none}
        input::placeholder{color:${W(.15)}}
      `}</style>

      <div className="bgG" /><div className="gl1" />
      {showPaywall && <PaywallPopup onClose={() => setShowPaywall(false)} />}

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", padding: "24px 20px 80px" }}>

        {/* NAV */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: page === "landing" ? 56 : 36, animation: "fi .5s both" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("landing")}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: `linear-gradient(135deg,${Gold},#D4A843)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: Bg }}>B</div>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: W(.4) }}>BLUEPRINT</span>
          </div>
          {page === "landing" && <button onClick={startQuiz} style={{ padding: "8px 18px", borderRadius: 9, background: `linear-gradient(135deg,${Gold},#D4A843)`, color: Bg, fontSize: 12, fontWeight: 700 }}>
            Get Started — Free
          </button>}
          {page === "quiz" && screen === "report" && <button onClick={() => setPage("landing")} style={{ padding: "8px 18px", borderRadius: 9, border: `1px solid ${W(.08)}`, background: "transparent", color: W(.4), fontSize: 12, fontWeight: 600 }}>← Back</button>}
        </div>

        {/* ═══════════ QUIZ / LOADING / REPORT ═══════════ */}
        {page === "quiz" && (
          <div style={{ maxWidth: 660, margin: "0 auto" }}>

            {/* QUIZ */}
            {screen === "quiz" && step === -1 && (
              <div style={{ animation: "su .4s both" }}>
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 3, color: Gold, marginBottom: 8 }}>🌍 Select Language</div>
                  <h2 style={{ fontSize: "clamp(20px,5vw,24px)", fontWeight: 800, lineHeight: 1.2, marginBottom: 4 }}>Choose your language</h2>
                  <p style={{ fontSize: 13, color: W(.28), fontFamily: "'Crimson Pro',serif", fontStyle: "italic" }}>Your entire blueprint will be generated in this language.</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                  {LANGS.map((l) => (
                    <button key={l.code} onClick={() => { setLang(l.code); setStep(0); }} style={{
                      padding: "14px 16px", borderRadius: 12, textAlign: "left",
                      background: lang === l.code ? "rgba(232,200,114,.06)" : W(.012),
                      border: `1px solid ${lang === l.code ? "rgba(232,200,114,.25)" : W(.05)}`,
                      display: "flex", alignItems: "center", gap: 10, color: "#fff", transition: "all .2s",
                    }}>
                      <span style={{ fontSize: 22 }}>{l.flag}</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: lang === l.code ? Gold : "#fff" }}>{l.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {screen === "quiz" && step >= 0 && (
              <div key={step} style={{ animation: "su .4s both" }}>
                <div style={{ display: "flex", gap: 5, marginBottom: 36 }}>
                  {QUESTIONS.map((_,i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? `linear-gradient(90deg,#C9A84C,${Gold})` : W(.04), transition: "all .6s", boxShadow: i === step ? "0 0 14px rgba(232,200,114,.25)" : "none" }} />)}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 3, color: W(.18) }}>Step {step+1}/{QUESTIONS.length}</div>
                  <div style={{ fontSize: 11, color: W(.2), display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }} onClick={() => setStep(-1)}>{LANGS.find(l=>l.code===lang)?.flag} {langName}</div>
                </div>
                <h2 style={{ fontSize: "clamp(20px,5vw,24px)", fontWeight: 800, lineHeight: 1.2, marginBottom: 4 }}>{cQ.label}</h2>
                <p style={{ fontSize: 13, color: W(.28), fontFamily: "'Crimson Pro',serif", fontStyle: "italic", marginBottom: 22 }}>{cQ.sub}</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 24 }}>
                  {cQ.options.map((o,i) => {
                    const sel = cQ.multi ? answers[cQ.id]?.includes(o.value) : answers[cQ.id] === o.value;
                    return <button key={o.value} onClick={() => handleSelect(o.value)} style={{
                      width: "100%", textAlign: "left", padding: o.desc ? "13px 15px" : "11px 15px",
                      background: sel ? "rgba(232,200,114,.05)" : W(.012),
                      border: `1px solid ${sel ? "rgba(232,200,114,.3)" : W(.05)}`,
                      borderRadius: 11, display: "flex", alignItems: "center", gap: 11, color: "#fff",
                      animation: `su .3s ${i*.03}s both`, transition: "all .2s",
                    }}>
                      <span style={{ fontSize: 18, width: 28, textAlign: "center", flexShrink: 0 }}>{o.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: sel ? Gold : "#fff" }}>{o.label}</div>
                        {o.desc && <div style={{ fontSize: 11, color: W(.22), marginTop: 1 }}>{o.desc}</div>}
                      </div>
                      {sel && <div style={{ width: 18, height: 18, borderRadius: 5, background: "rgba(232,200,114,.12)", border: "1px solid rgba(232,200,114,.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: Gold }}>✓</div>}
                    </button>;
                  })}
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  {step > 0 && <button onClick={() => setStep(s => s-1)} style={{ padding: "12px 18px", borderRadius: 10, border: `1px solid ${W(.06)}`, background: "transparent", color: W(.35), fontSize: 13, fontWeight: 600 }}>←</button>}
                  {step === 0 && <button onClick={() => setStep(-1)} style={{ padding: "12px 18px", borderRadius: 10, border: `1px solid ${W(.06)}`, background: "transparent", color: W(.35), fontSize: 13, fontWeight: 600 }}>← Language</button>}
                  {cQ.multi && <button onClick={() => canGo && (step < QUESTIONS.length-1 ? setStep(s => s+1) : startLoading())} disabled={!canGo} style={{ flex: 1, padding: "12px", borderRadius: 10, background: canGo ? `linear-gradient(135deg,${Gold},#D4A843)` : W(.03), color: canGo ? Bg : W(.12), fontSize: 13, fontWeight: 700, cursor: canGo ? "pointer" : "not-allowed" }}>
                    {step === QUESTIONS.length-1 ? "Generate Blueprint →" : "Continue →"}
                  </button>}
                </div>
              </div>
            )}

            {/* LOADING */}
            {screen === "loading" && (
              <div style={{ paddingTop: 40, animation: "fi .5s both" }}>
                <div style={{ textAlign: "center", marginBottom: 36 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 5 }}>Building your blueprint</h2>
                  <p style={{ fontSize: 13, color: W(.25), fontFamily: "'Crimson Pro',serif", fontStyle: "italic" }}>Analyzing 1,400+ income paths...</p>
                </div>
                <div style={{ maxWidth: 340, margin: "0 auto" }}>
                  {LOAD_PHASES.map((t,i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 0", opacity: i <= lp ? 1 : .1, transition: "opacity .5s", borderBottom: i < LOAD_PHASES.length-1 ? `1px solid ${W(.02)}` : "none" }}>
                      <div style={{ width: 28, height: 28, borderRadius: 7, flexShrink: 0, background: i < lp ? "rgba(232,200,114,.07)" : W(.015), border: `1px solid ${i < lp ? "rgba(232,200,114,.18)" : W(.03)}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10.5, color: i < lp ? Gold : W(.2) }}>
                        {i < lp ? "✓" : i+1}
                      </div>
                      <span style={{ fontSize: 12.5, fontWeight: 500, color: i <= lp ? W(.6) : W(.15), flex: 1 }}>{t}</span>
                      {i === lp && <div style={{ width: 36, height: 3, borderRadius: 2, background: W(.03), overflow: "hidden" }}><div style={{ width: "35%", height: "100%", background: Gold, borderRadius: 2, animation: "scan 1.2s ease-in-out infinite" }} /></div>}
                    </div>
                  ))}
                </div>
                {lp >= LOAD_PHASES.length && <div style={{ textAlign: "center", marginTop: 24 }}>
                  <div style={{ display: "inline-block", padding: "7px 14px", borderRadius: 8, background: "rgba(232,200,114,.06)", border: "1px solid rgba(232,200,114,.12)", fontSize: 12, color: Gold, fontWeight: 600, animation: "pulse 1.5s infinite" }}>Almost done...</div>
                </div>}
              </div>
            )}

            {/* REPORT */}
            {screen === "report" && report && (() => {
              const r = report.primary;
              return <div style={{ animation: "su .5s both" }}>
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 11px", borderRadius: 7, background: "rgba(232,200,114,.07)", border: "1px solid rgba(232,200,114,.12)", fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: Gold, marginBottom: 16 }}>✨ Blueprint Ready</div>
                  <h1 style={{ fontSize: "clamp(22px,5vw,34px)", fontWeight: 900, lineHeight: 1.1 }}>Your Income Path</h1>
                </div>

                {/* Tab switcher */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 3, marginBottom: 16, background: W(.02), borderRadius: 11, padding: 3 }}>
                  <button style={{ padding: "9px 6px", borderRadius: 9, background: "rgba(232,200,114,.08)", border: "1px solid rgba(232,200,114,.15)", color: Gold, fontSize: 11, fontWeight: 600 }}>📋 Blueprint</button>
                  <button onClick={() => setShowPaywall(true)} style={{ padding: "9px 6px", borderRadius: 9, background: "transparent", border: "1px solid transparent", color: W(.2), fontSize: 11, fontWeight: 600 }}>🔒 Tracker</button>
                  <button onClick={() => setShowPaywall(true)} style={{ padding: "9px 6px", borderRadius: 9, background: "transparent", border: "1px solid transparent", color: W(.2), fontSize: 11, fontWeight: 600 }}>🔒 Chat</button>
                  <button onClick={() => setShowPaywall(true)} style={{ padding: "9px 6px", borderRadius: 9, background: "transparent", border: "1px solid transparent", color: W(.2), fontSize: 11, fontWeight: 600 }}>🔒 Compare</button>
                </div>

                {/* Action bar */}
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  <button style={{ flex: 1, padding: "11px", borderRadius: 10, background: "rgba(232,200,114,.06)", border: "1px solid rgba(232,200,114,.12)", color: Gold, fontSize: 12.5, fontWeight: 600 }}>📤 Share</button>
                  <button onClick={() => setShowPaywall(true)} style={{ flex: 1, padding: "11px", borderRadius: 10, background: W(.03), border: `1px solid ${W(.06)}`, color: W(.25), fontSize: 12.5, fontWeight: 600 }}>🔒 Export PDF</button>
                  <button onClick={startQuiz} style={{ padding: "11px 14px", borderRadius: 10, border: `1px solid ${W(.06)}`, background: "transparent", color: W(.3), fontSize: 12.5, fontWeight: 600 }}>↻ New</button>
                </div>

                {/* Personal insight */}
                {report.personalInsight && <div style={{ padding: "16px 18px", marginBottom: 14, background: `linear-gradient(135deg,rgba(232,200,114,.035),rgba(126,232,178,.02))`, border: "1px solid rgba(232,200,114,.08)", borderRadius: 13 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: Gold, marginBottom: 5 }}>💡 Why This Works For You</div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.6, color: W(.5), fontFamily: "'Crimson Pro',serif" }}>{report.personalInsight}</p>
                </div>}

                {/* Quick win */}
                {report.quickestWin && <div style={{ padding: "12px 16px", marginBottom: 14, background: "rgba(126,232,178,.03)", border: "1px solid rgba(126,232,178,.08)", borderRadius: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: Green, marginBottom: 4 }}>🚀 Your Quickest Win</div>
                  <p style={{ fontSize: 12.5, lineHeight: 1.6, color: W(.45) }}>{report.quickestWin}</p>
                </div>}

                {/* Primary path card */}
                <div style={{ background: "rgba(232,200,114,.02)", border: "1px solid rgba(232,200,114,.08)", borderRadius: 16, padding: "22px 18px", marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 6 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: W(.2) }}>Primary Path</div>
                    <span style={{ padding: "3px 9px", borderRadius: 6, background: "rgba(232,200,114,.1)", border: "1px solid rgba(232,200,114,.2)", fontSize: 11, fontWeight: 700, color: Gold }}>{r.match}% match</span>
                  </div>
                  <h2 style={{ fontSize: "clamp(18px,4vw,21px)", fontWeight: 800, color: Gold, marginBottom: 3 }}>{r.name}</h2>
                  {r.tagline && <p style={{ fontSize: 13, color: W(.35), marginBottom: 10, fontFamily: "'Crimson Pro',serif", fontStyle: "italic" }}>{r.tagline}</p>}
                  <p style={{ fontSize: 13.5, lineHeight: 1.6, color: W(.4) }}>{r.description}</p>
                  {r.whyYou && <div style={{ marginTop: 12, padding: "10px 14px", background: W(.018), borderRadius: 10, borderLeft: "2px solid rgba(232,200,114,.3)" }}>
                    <p style={{ fontSize: 12, color: W(.4), lineHeight: 1.5 }}>{r.whyYou}</p>
                  </div>}
                </div>

                {/* Metrics */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 6 }}>
                  {[["💰 Revenue", r.monthlyRevenue, Gold], ["⏱ First $", r.timeToFirstDollar, Green], ["📊 Difficulty", r.difficulty, "#fff"], ["🎯 Match", `${r.match}%`, Gold]].map(([l,v,c],i) => (
                    <div key={i} style={{ padding: "14px 16px", background: W(.018), border: `1px solid ${W(.04)}`, borderRadius: 12 }}>
                      <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: W(.2), marginBottom: 6 }}>{l}</div>
                      <div style={{ fontSize: 17, fontWeight: 700, color: c }}>{v}</div>
                    </div>
                  ))}
                </div>

                {/* BLURRED: 6-Month Projection */}
                <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3.5, color: Gold, marginBottom: 14, marginTop: 32 }}>6-Month Projection</h3>
                <div style={{ position: "relative", marginBottom: 12, cursor: "pointer" }} onClick={() => setShowPaywall(true)}>
                  <div style={{ filter: "blur(6px)", opacity: .4, pointerEvents: "none", userSelect: "none" }}>
                    <div style={{ background: W(.015), border: `1px solid ${W(.035)}`, borderRadius: 13, padding: "14px 10px 6px", height: 180 }}>
                      <svg width="100%" height="140" viewBox="0 0 320 140"><path d="M0,130 L53,110 L106,85 L159,60 L212,35 L265,15 L320,5" fill="none" stroke={Gold} strokeWidth="2"/><path d="M0,130 L53,120 L106,100 L159,80 L212,60 L265,45 L320,30" fill="none" stroke={Green} strokeWidth="2"/></svg>
                    </div>
                  </div>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(8,9,12,.35)", borderRadius: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "rgba(232,200,114,.08)", border: "1px solid rgba(232,200,114,.15)", borderRadius: 10, fontSize: 12, fontWeight: 600, color: Gold }}>🔒 Revenue projections</div>
                  </div>
                </div>

                {/* BLURRED: Income Streams */}
                <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3.5, color: Gold, marginBottom: 14, marginTop: 32 }}>Income Streams</h3>
                <div style={{ position: "relative", marginBottom: 12, cursor: "pointer" }} onClick={() => setShowPaywall(true)}>
                  <div style={{ filter: "blur(6px)", opacity: .4, pointerEvents: "none", userSelect: "none" }}>
                    {(r.incomeBreakdown || [{source:"Core service",amount:"$2,000–$4,000"},{source:"Upsells",amount:"$500–$1,500"},{source:"Passive",amount:"$300–$1,000"}]).map((s,i) => (
                      <div key={i} style={{ padding: "13px 16px", background: W(.013), border: `1px solid ${W(.035)}`, borderRadius: 11, marginBottom: 7 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{s.source}</span><span style={{ fontSize: 13, fontWeight: 700, color: Gold }}>{s.amount}</span></div>
                      </div>
                    ))}
                  </div>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(8,9,12,.35)", borderRadius: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "rgba(232,200,114,.08)", border: "1px solid rgba(232,200,114,.15)", borderRadius: 10, fontSize: 12, fontWeight: 600, color: Gold }}>🔒 Income breakdown</div>
                  </div>
                </div>

                {/* URGENCY + CTA */}
                <CountdownBar />
                <button onClick={() => setShowPaywall(true)} style={{ width: "100%", padding: 16, borderRadius: 14, background: `linear-gradient(135deg,${Gold},#D4A843)`, color: Bg, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 24px rgba(232,200,114,.2)", marginBottom: 6 }}>
                  🔓 Unlock Full Blueprint — $19
                </button>
                <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 20 }}>
                  <span style={{ fontSize: 10, color: W(.2) }}>One-time payment</span><span style={{ fontSize: 10, color: W(.2) }}>•</span>
                  <span style={{ fontSize: 10, color: W(.2) }}>Instant unlock</span><span style={{ fontSize: 10, color: W(.2) }}>•</span>
                  <span style={{ fontSize: 10, color: W(.2) }}>30-day refund</span>
                </div>

                {/* BLURRED: Daily Schedule */}
                <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3.5, color: Gold, marginBottom: 14, marginTop: 24 }}>Your Daily Schedule</h3>
                <div style={{ position: "relative", marginBottom: 12, cursor: "pointer" }} onClick={() => setShowPaywall(true)}>
                  <div style={{ filter: "blur(6px)", opacity: .4, pointerEvents: "none", userSelect: "none" }}>
                    <div style={{ background: W(.013), border: `1px solid ${W(.035)}`, borderRadius: 13, padding: 16 }}>
                      {(r.dailySchedule?.blocks || [{time:"Morning",task:"Content creation",duration:"30 min"},{time:"Midday",task:"Client outreach",duration:"30 min"},{time:"Afternoon",task:"Deep work",duration:"60 min"},{time:"Evening",task:"Admin & planning",duration:"20 min"}]).map((b,i) => (
                        <div key={i} style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: i < 3 ? `1px solid ${W(.025)}` : "none" }}>
                          <div style={{ width: 64, fontSize: 11.5, fontWeight: 600, color: Gold }}>{b.time}</div>
                          <div style={{ flex: 1, fontSize: 12.5, color: W(.5) }}>{b.task}</div>
                          <div style={{ fontSize: 11, color: W(.2) }}>{b.duration}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(8,9,12,.35)", borderRadius: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "rgba(232,200,114,.08)", border: "1px solid rgba(232,200,114,.15)", borderRadius: 10, fontSize: 12, fontWeight: 600, color: Gold }}>🔒 Daily schedule</div>
                  </div>
                </div>

                {/* BLURRED: Tools */}
                <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3.5, color: Gold, marginBottom: 14, marginTop: 24 }}>Tools</h3>
                <div style={{ position: "relative", marginBottom: 12, cursor: "pointer" }} onClick={() => setShowPaywall(true)}>
                  <div style={{ filter: "blur(6px)", opacity: .4, pointerEvents: "none", userSelect: "none" }}>
                    <div style={{ background: W(.013), border: `1px solid ${W(.035)}`, borderRadius: 12, overflow: "hidden" }}>
                      {(r.tools || [{name:"Claude Pro"},{name:"Canva Pro"},{name:"Notion"},{name:"Gumroad"},{name:"Carrd"}]).map((t,i) => (
                        <div key={i} style={{ padding: "11px 14px", borderBottom: i < 4 ? `1px solid ${W(.025)}` : "none", fontSize: 12.5, fontWeight: 600, color: "#fff" }}>{t.name}</div>
                      ))}
                    </div>
                  </div>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(8,9,12,.35)", borderRadius: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "rgba(232,200,114,.08)", border: "1px solid rgba(232,200,114,.15)", borderRadius: 10, fontSize: 12, fontWeight: 600, color: Gold }}>🔒 Tools & pricing</div>
                  </div>
                </div>

                {/* BLURRED: Scripts */}
                <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3.5, color: Gold, marginBottom: 14, marginTop: 24 }}>Copy-Paste Scripts</h3>
                <div style={{ position: "relative", marginBottom: 12, cursor: "pointer" }} onClick={() => setShowPaywall(true)}>
                  <div style={{ filter: "blur(6px)", opacity: .4, pointerEvents: "none", userSelect: "none" }}>
                    {(r.scripts || [{context:"Cold DM on LinkedIn",script:"Hey [Name], I noticed..."},{context:"Follow-up",script:"Hey [Name], just following up..."}]).map((s,i) => (
                      <div key={i} style={{ marginBottom: 9 }}>
                        <div style={{ fontSize: 10.5, fontWeight: 600, color: Gold, marginBottom: 5, textTransform: "uppercase", letterSpacing: 1.5 }}>{s.context}</div>
                        <div style={{ padding: "12px 14px", background: W(.02), border: `1px solid ${W(.05)}`, borderRadius: 10, fontSize: 12, color: W(.45), lineHeight: 1.6 }}>{s.script}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(8,9,12,.35)", borderRadius: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "rgba(232,200,114,.08)", border: "1px solid rgba(232,200,114,.15)", borderRadius: 10, fontSize: 12, fontWeight: 600, color: Gold }}>🔒 Outreach scripts</div>
                  </div>
                </div>

                {/* Milestones (visible) */}
                <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3.5, color: Gold, marginBottom: 14, marginTop: 24 }}>Milestones</h3>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                  {(r.milestones || [{month:"Month 1",target:"$500",milestone:"First clients"},{month:"Month 3",target:"$2,500",milestone:"5+ recurring"},{month:"Month 6",target:"$5,000+",milestone:"Full pipeline"}]).map((m,i) => (
                    <div key={i} style={{ flex: "1 1 140px", padding: "14px 16px", background: W(.013), border: `1px solid ${W(.035)}`, borderRadius: 11 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: Gold, marginBottom: 6 }}>{m.month}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{m.target}</div>
                      <div style={{ fontSize: 11, color: W(.28), lineHeight: 1.4 }}>{m.milestone}</div>
                    </div>
                  ))}
                </div>

                {/* Risks & Solutions (visible) */}
                <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3.5, color: Gold, marginBottom: 14, marginTop: 24 }}>Risks & Solutions</h3>
                <div style={{ background: W(.013), border: `1px solid ${W(.035)}`, borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
                  {(r.risks || ["Imposter syndrome","Underpricing your work","Burnout"]).map((risk,i) => (
                    <div key={i} style={{ padding: "12px 14px", borderBottom: i < 2 ? `1px solid ${W(.025)}` : "none" }}>
                      <div style={{ display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 4 }}>
                        <span style={{ color: "#FF8A80", fontSize: 10, marginTop: 2 }}>⚠</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: W(.5) }}>{risk}</span>
                      </div>
                      {(r.mitigations || [])[i] && <div style={{ display: "flex", gap: 6, alignItems: "flex-start", paddingLeft: 16 }}>
                        <span style={{ color: Green, fontSize: 10, marginTop: 2 }}>→</span>
                        <span style={{ fontSize: 11, color: W(.32), lineHeight: 1.5 }}>{r.mitigations[i]}</span>
                      </div>}
                    </div>
                  ))}
                </div>

                {/* Alternative Paths */}
                <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3.5, color: Gold, marginBottom: 14, marginTop: 24 }}>Alternative Paths</h3>
                {[report.secondary, report.tertiary].filter(Boolean).map((p,i) => (
                  <div key={i} style={{ background: W(.013), border: `1px solid ${W(.035)}`, borderRadius: 13, padding: "16px 18px", marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 6, marginBottom: 4 }}>
                      <h4 style={{ fontSize: 14.5, fontWeight: 700 }}>{p.name}</h4>
                      <span style={{ padding: "2px 8px", borderRadius: 5, background: "rgba(126,232,178,.08)", border: "1px solid rgba(126,232,178,.12)", fontSize: 10, fontWeight: 700, color: Green }}>{p.match}% match</span>
                    </div>
                    {p.tagline && <p style={{ fontSize: 12, color: Gold, marginBottom: 5, fontFamily: "'Crimson Pro',serif", fontStyle: "italic" }}>{p.tagline}</p>}
                    <p style={{ fontSize: 12, color: W(.3), lineHeight: 1.5, marginBottom: 6 }}>{p.description}</p>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: p.quickWin ? 8 : 0 }}>
                      <span style={{ fontSize: 11, color: W(.2) }}>💰 {p.monthlyRevenue}</span>
                      {p.timeToFirstDollar && <span style={{ fontSize: 11, color: W(.2) }}>⏱ {p.timeToFirstDollar}</span>}
                    </div>
                    {p.quickWin && <div style={{ marginTop: 6, padding: "8px 12px", background: "rgba(126,232,178,.025)", border: "1px solid rgba(126,232,178,.06)", borderRadius: 8 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: Green }}>⚡ This Week: </span>
                      <span style={{ fontSize: 11, color: W(.32) }}>{p.quickWin}</span>
                    </div>}
                  </div>
                ))}

                {/* Email capture */}
                <div style={{ marginTop: 20, padding: "18px 20px", background: W(.015), border: `1px solid ${W(.04)}`, borderRadius: 13 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 3 }}>📩 Save blueprint & get 30-day check-in</div>
                  <div style={{ fontSize: 11, color: W(.25), marginBottom: 12 }}>We'll email your report + remind you to track progress.</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input placeholder="your@email.com" type="email" style={{ flex: 1, padding: "11px 14px", borderRadius: 10, border: `1px solid ${W(.06)}`, background: W(.02), color: "#fff", fontSize: 13, fontFamily: "'Outfit',sans-serif" }} />
                    <button style={{ padding: "11px 18px", borderRadius: 10, border: "none", background: `linear-gradient(135deg,${Gold},#D4A843)`, color: Bg, fontSize: 13, fontWeight: 700 }}>Save</button>
                  </div>
                </div>

                {/* Bottom CTA + social proof */}
                <div style={{ margin: "24px 0" }}>
                  <div style={{ display: "flex", justifyContent: "center", gap: 8, alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: W(.2), textDecoration: "line-through" }}>$49</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: Gold }}>$19</span>
                    <span style={{ fontSize: 10, color: Green, fontWeight: 600 }}>61% off — launch price</span>
                  </div>
                  <UnlockCounter />
                </div>

                <div style={{ textAlign: "center", marginTop: 16 }}>
                  <button onClick={startQuiz} style={{ padding: "10px 22px", borderRadius: 10, border: `1px solid ${W(.08)}`, background: "transparent", color: W(.35), fontSize: 12, fontWeight: 600 }}>↻ Generate New Blueprint</button>
                </div>
              </div>;
            })()}
          </div>
        )}

        {/* ═══════════ LANDING PAGE CONTENT ═══════════ */}
        {page === "landing" && (<>

        {/* ═══════════ HERO ═══════════ */}
        <div className="hero-grid" style={{ display: "flex", gap: 40, alignItems: "center", marginBottom: 72, animation: "su .6s both" }}>
          <div style={{ flex: 1.2 }}>
            <LiveCounter />
            <h1 style={{ fontSize: "clamp(30px, 6vw, 48px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: -1, marginTop: 16, marginBottom: 16 }}>
              <span style={{ color: "#fff" }}>Your AI-powered</span><br />
              <span style={{ background: `linear-gradient(135deg,${Gold},#F0DCA0,#D4A843)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>path to income.</span>
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: W(.35), maxWidth: 420, fontFamily: "'Crimson Pro',serif", fontStyle: "italic", marginBottom: 24 }}>
              6 questions. 90 seconds. A personalized day-by-day plan to start making money — with exact tools, scripts, and revenue projections.
            </p>
            <button id="cta" onClick={startQuiz} style={{
              padding: "16px 36px", borderRadius: 13,
              background: `linear-gradient(135deg,${Gold},#D4A843)`,
              color: Bg, fontSize: 15.5, fontWeight: 700,
              boxShadow: "0 4px 28px rgba(232,200,114,.2)",
              animation: "glow 3s infinite",
            }}>
              Build My Blueprint — Free →
            </button>
          </div>
          <div style={{ flex: 1 }}>
            <DemoMockup />
          </div>
        </div>

        {/* ═══════════ SOCIAL PROOF BAR ═══════════ */}
        <div style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap", marginBottom: 72, padding: "20px 0", borderTop: `1px solid ${W(.03)}`, borderBottom: `1px solid ${W(.03)}`, animation: "su .5s .2s both" }}>
          {[["47,000+", "Blueprints Generated"], ["$12M+", "Income Unlocked"], ["4.9 ★", "User Rating"], ["90 sec", "To Complete"]].map(([n, l], i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: Gold }}>{n}</div>
              <div style={{ fontSize: 11, color: W(.2), marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* ═══════════ HOW IT WORKS ═══════════ */}
        <div style={{ marginBottom: 72, animation: "su .5s .3s both" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: Gold, marginBottom: 8 }}>How It Works</div>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800 }}>Three steps. 90 seconds. Done.</h2>
          </div>

          <div className="mob-col" style={{ display: "flex", gap: 16 }}>
            {[
              { n: "1", icon: "📝", title: "Answer 6 questions", desc: "Tell us about your skills, schedule, budget, interests, and income goal. Takes about 60 seconds." },
              { n: "2", icon: "🤖", title: "AI builds your plan", desc: "Our AI analyzes 1,400+ proven income models and matches the best path to your unique profile." },
              { n: "3", icon: "🚀", title: "Follow your blueprint", desc: "Get a personalized day-by-day plan with exact tasks, tools, scripts, and revenue projections." },
            ].map((s, i) => (
              <div key={i} style={{
                flex: 1, padding: "28px 22px", background: W(.015), border: `1px solid ${W(.04)}`,
                borderRadius: 16, position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 16, right: 18, fontSize: 48, fontWeight: 900, color: W(.03) }}>{s.n}</div>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{s.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{s.title}</div>
                <p style={{ fontSize: 13, color: W(.35), lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════ BEFORE / AFTER ═══════════ */}
        <div className="mob-col" style={{ display: "flex", gap: 14, marginBottom: 72, animation: "su .5s .4s both" }}>
          <div style={{ flex: 1, padding: "22px 20px", background: "rgba(255,75,75,.03)", border: "1px solid rgba(255,75,75,.08)", borderRadius: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#FF6B6B", textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>❌ Without Blueprint</div>
            {["Months watching YouTube with no plan", "Buying $500 courses that don't fit your life", "Following generic advice meant for someone else", "Quitting after 2 weeks because it feels impossible"].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
                <span style={{ color: "#FF6B6B", fontSize: 10, marginTop: 3 }}>✗</span>
                <span style={{ fontSize: 12.5, color: W(.35), lineHeight: 1.4 }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ flex: 1, padding: "22px 20px", background: "rgba(126,232,178,.03)", border: "1px solid rgba(126,232,178,.08)", borderRadius: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: Green, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>✓ With Blueprint</div>
            {["A plan built for YOUR skills and schedule", "Exact tools and scripts — ready to copy-paste", "Day-by-day tasks so you never guess what's next", "AI chat advisor for follow-up questions", "Compare alternative paths side by side", "Progress tracker to keep you accountable"].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
                <span style={{ color: Green, fontSize: 10, marginTop: 3 }}>✓</span>
                <span style={{ fontSize: 12.5, color: W(.35), lineHeight: 1.4 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════ SAMPLE BLUEPRINT ═══════════ */}
        <div style={{ marginBottom: 72, animation: "su .5s .5s both" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: Gold, marginBottom: 8 }}>Sample Blueprint</div>
            <h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 800 }}>Here's what a real blueprint looks like</h2>
            <p style={{ fontSize: 13, color: W(.3), marginTop: 6, fontFamily: "'Crimson Pro',serif", fontStyle: "italic" }}>Generated for a full-time employee with coding skills, 10hrs/week, $0 budget</p>
          </div>
          <BlueprintPreview />
        </div>

        {/* ═══════════ WHAT YOU GET (compact) ═══════════ */}
        <div style={{ marginBottom: 72, animation: "su .5s .55s both" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: Gold, marginBottom: 8 }}>What You Get</div>
            <h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 800 }}>A complete system, not generic advice.</h2>
          </div>

          <div className="mob-col" style={{ display: "flex", gap: 14, maxWidth: 660, margin: "0 auto" }}>
            {/* Free column */}
            <div style={{ flex: 1, padding: "22px 18px", background: W(.012), border: `1px solid ${W(.04)}`, borderRadius: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: W(.3), marginBottom: 6 }}>Free</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 14 }}>$0</div>
              {["🎯 Personalized path + match score", "💰 Revenue range estimate", "🔄 Alternative paths", "💡 Personal insight & quick win"].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 7, alignItems: "center", padding: "4px 0" }}>
                  <span style={{ fontSize: 10, color: Green }}>✓</span>
                  <span style={{ fontSize: 12, color: W(.4) }}>{t}</span>
                </div>
              ))}
            </div>

            {/* Pro column */}
            <div style={{ flex: 1.2, padding: "22px 18px", background: "rgba(232,200,114,.03)", border: "1px solid rgba(232,200,114,.12)", borderRadius: 16, position: "relative" }}>
              <div style={{ position: "absolute", top: -10, right: 14, padding: "3px 10px", borderRadius: 6, background: `linear-gradient(135deg,${Gold},#D4A843)`, color: Bg, fontSize: 10, fontWeight: 700 }}>BEST VALUE</div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: Gold, marginBottom: 6 }}>Full Blueprint</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 2 }}>
                <span style={{ fontSize: 14, color: W(.25), textDecoration: "line-through" }}>$49</span>
                <span style={{ fontSize: 26, fontWeight: 900, color: "#fff" }}>$19</span>
                <span style={{ fontSize: 11, color: W(.3) }}>one-time</span>
              </div>
              <div style={{ fontSize: 10, color: Green, fontWeight: 600, marginBottom: 14 }}>61% off — launch price</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: Gold, marginBottom: 6 }}>Everything free, plus:</div>
              {[
                "📅 Day-by-day action plan (4 weeks)",
                "📝 Copy-paste outreach scripts",
                "📊 6-month revenue projections",
                "💰 Income breakdown by stream",
                "🛠 Tools with real pricing",
                "🕐 Custom daily schedule",
                "💬 AI follow-up chat advisor",
                "🔀 Blueprint comparison mode",
                "✅ Progress tracker",
                "📄 PDF export",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 7, alignItems: "center", padding: "3.5px 0" }}>
                  <span style={{ fontSize: 10, color: Green }}>✓</span>
                  <span style={{ fontSize: 11.5, color: W(.45) }}>{t}</span>
                  {(t.includes("chat") || t.includes("comparison")) && <span style={{ fontSize: 8, color: "#8BB8E8", fontWeight: 700, padding: "1px 5px", borderRadius: 3, background: "rgba(139,184,232,.08)" }}>NEW</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════ TESTIMONIALS ═══════════ */}
        <div style={{ marginBottom: 72, animation: "su .5s .6s both" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: Gold, marginBottom: 8 }}>Results</div>
            <h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 800 }}>People are actually doing this</h2>
          </div>
          <div className="mob-col" style={{ display: "flex", gap: 12 }}>
            {[
              { t: "Went from $0 to $4,200/mo in 8 weeks following the plan exactly. The day-by-day tasks made it impossible to procrastinate.", n: "Marcus T.", tag: "Freelancer → Agency Owner", result: "$4.2K/mo" },
              { t: "As a mom with 2 hours a day, this actually understood my constraints. No generic 'hustle harder' advice. Real, specific steps I could do during nap time.", n: "Sarah K.", tag: "Stay-at-Home Mom", result: "$2.8K/mo" },
              { t: "I've bought $2,000+ in courses. This $19 tool gave me better, more specific advice than all of them combined. The scripts alone paid for it 100x.", n: "James L.", tag: "College Student", result: "$6.1K/mo" },
            ].map((t, i) => (
              <div key={i} style={{ flex: 1, padding: "20px 18px", background: W(.012), border: `1px solid ${W(.035)}`, borderRadius: 14 }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
                  {[1,2,3,4,5].map(j => <span key={j} style={{ fontSize: 12, color: "#FFD166" }}>★</span>)}
                </div>
                <p style={{ fontSize: 13, color: W(.4), lineHeight: 1.5, fontFamily: "'Crimson Pro',serif", fontStyle: "italic", marginBottom: 14 }}>"{t.t}"</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 4 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: W(.6) }}>{t.n}</div>
                    <div style={{ fontSize: 11, color: W(.25) }}>{t.tag}</div>
                  </div>
                  <div style={{ padding: "3px 10px", borderRadius: 6, background: "rgba(126,232,178,.06)", border: "1px solid rgba(126,232,178,.1)", fontSize: 12, fontWeight: 700, color: Green }}>{t.result}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════ FAQ ═══════════ */}
        <div style={{ marginBottom: 72, animation: "su .5s .7s both" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: Gold, marginBottom: 8 }}>FAQ</div>
            <h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 800 }}>Common questions</h2>
          </div>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            {faqs.map((f, i) => (
              <FAQ key={i} q={f.q} a={f.a} open={faq === i} onClick={() => setFaq(faq === i ? -1 : i)} />
            ))}
          </div>
        </div>

        {/* ═══════════ FINAL CTA ═══════════ */}
        <div style={{ textAlign: "center", padding: "48px 24px", background: "rgba(232,200,114,.02)", border: "1px solid rgba(232,200,114,.06)", borderRadius: 22, marginBottom: 40, animation: "su .5s .8s both" }}>
          <div style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.15, marginBottom: 10 }}>
            <span style={{ color: "#fff" }}>Your personalized blueprint is</span><br />
            <span style={{ color: Gold }}>90 seconds away.</span>
          </div>
          <p style={{ fontSize: 14, color: W(.3), marginBottom: 24, fontFamily: "'Crimson Pro',serif", fontStyle: "italic" }}>Free. Personalized. AI-Powered. No credit card required.</p>
          <button onClick={startQuiz} style={{
            padding: "17px 44px", borderRadius: 14,
            background: `linear-gradient(135deg,${Gold},#D4A843)`,
            color: Bg, fontSize: 16, fontWeight: 700,
            boxShadow: "0 4px 28px rgba(232,200,114,.25)",
            animation: "glow 3s infinite",
          }}>
            Build My Blueprint — Free →
          </button>
          <div style={{ marginTop: 12, fontSize: 12, color: W(.2) }}>Takes 90 seconds • No signup required</div>
        </div>

        </>)}

        {/* FOOTER */}
        <div style={{ textAlign: "center", paddingTop: 24, borderTop: `1px solid ${W(.03)}` }}>
          <div style={{ fontSize: 10, color: W(.1) }}>Blueprint AI © 2026 • blueprint-ai.com</div>
        </div>
      </div>
    </>
  );
}