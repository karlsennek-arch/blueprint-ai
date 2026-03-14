"use client";
import { useEffect, useState } from "react";

const Gold = "#E8C872";
const Green = "#7EE8B2";
const Bg = "#08090C";
const W = (a) => `rgba(255,255,255,${a})`;

export default function SuccessPage() {
  const [show, setShow] = useState(false);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
    const pieces = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      color: [Gold, Green, "#fff", "#E8C872", "#7EE8B2", "#D4A843"][Math.floor(Math.random() * 6)],
      size: 4 + Math.random() * 6,
    }));
    setConfetti(pieces);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: Bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter','SF Pro Display',-apple-system,sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes checkDraw {
          from { stroke-dashoffset: 40; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      {confetti.map((p) => (
        <div key={p.id} style={{
          position: "absolute",
          top: -10,
          left: `${p.x}%`,
          width: p.size,
          height: p.size,
          borderRadius: p.id % 3 === 0 ? "50%" : "1px",
          background: p.color,
          animation: `fall ${p.duration}s ${p.delay}s ease-in forwards`,
          opacity: 0,
        }} />
      ))}

      <div style={{
        textAlign: "center",
        padding: "48px 32px",
        maxWidth: 480,
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(.4,0,.2,1)",
      }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${Green}, #5BC99A)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 28px",
          boxShadow: `0 8px 32px rgba(126,232,178,.25)`,
          animation: "pulse 2s ease-in-out infinite",
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke={Bg}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 40,
                strokeDashoffset: 0,
                animation: "checkDraw 0.6s 0.3s ease-out backwards",
              }}
            />
          </svg>
        </div>

        <h1 style={{
          fontSize: 28,
          fontWeight: 900,
          color: "#fff",
          marginBottom: 8,
          lineHeight: 1.2,
        }}>
          Payment successful!
        </h1>

        <p style={{
          fontSize: 15,
          color: W(.45),
          marginBottom: 32,
          lineHeight: 1.6,
        }}>
          Your full blueprint has been unlocked. Check your email for the receipt from Stripe.
        </p>

        <div style={{
          background: W(.03),
          border: `1px solid ${W(.06)}`,
          borderRadius: 16,
          padding: "24px 20px",
          marginBottom: 28,
        }}>
          <div style={{ fontSize: 12, color: Gold, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
            What you unlocked
          </div>
          {[
            ["📅", "Day-by-day action plan (4 weeks)"],
            ["📝", "Copy-paste outreach scripts"],
            ["📊", "6-month revenue projections"],
            ["💰", "Detailed income breakdown"],
            ["🛠", "Exact tools with pricing"],
            ["🕐", "Custom daily schedule"],
            ["💬", "AI follow-up chat advisor"],
            ["🔀", "Blueprint comparison mode"],
            ["✅", "Interactive progress tracker"],
            ["📄", "PDF export"],
          ].map(([icon, text], i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 0",
              borderBottom: i < 9 ? `1px solid ${W(.04)}` : "none",
              animation: `fadeUp 0.5s ${0.5 + i * 0.08}s both`,
            }}>
              <span style={{ fontSize: 14 }}>{icon}</span>
              <span style={{ fontSize: 13, color: W(.6) }}>{text}</span>
              <span style={{ marginLeft: "auto", color: Green, fontSize: 13 }}>✓</span>
            </div>
          ))}
        </div>

        <a href="/" style={{
          display: "inline-block",
          width: "100%",
          padding: 16,
          borderRadius: 12,
          background: `linear-gradient(135deg, ${Gold}, #D4A843)`,
          color: Bg,
          fontSize: 15,
          fontWeight: 700,
          textDecoration: "none",
          boxShadow: `0 4px 24px rgba(232,200,114,.2)`,
          marginBottom: 12,
        }}>
          View My Full Blueprint →
        </a>

        <p style={{ fontSize: 11, color: W(.2), marginTop: 8 }}>
          Questions? Reply to your Stripe receipt email — we respond within 24 hours.
        </p>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 14,
          marginTop: 20,
        }}>
          {["🔒 256-bit encrypted", "💳 Powered by Stripe", "↩️ 30-day refund"].map((t, i) => (
            <span key={i} style={{ fontSize: 9.5, color: W(.15) }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
