import { useState, useEffect } from "react";

const weeks = [
  {
    month: "Month 1 — AI Tools",
    color: "#FF6B35",
    weeks: [
      { week: 1, topic: "Figma AI Features", channel: "Figma Official", task: "Redo one old frame using AI tools" },
      { week: 2, topic: "Relume + AI Wireframing", channel: "Flux Academy", task: "Build a landing page wireframe in 30 min" },
      { week: 3, topic: "Midjourney for Moodboards", channel: "The Future", task: "Create a moodboard for any brand" },
      { week: 4, topic: "AI for UX Copy & Content", channel: "Mizko", task: "Rewrite UI copy for an old project" },
    ]
  },
  {
    month: "Month 2 — UX Research with AI",
    color: "#7C3AED",
    weeks: [
      { week: 5, topic: "Claude/ChatGPT for Personas", channel: "AJ&Smart", task: "Generate 3 personas with AI prompt" },
      { week: 6, topic: "Dovetail Basics", channel: "Dovetail Official", task: "Organize past research notes in Dovetail" },
      { week: 7, topic: "Journey Mapping with AI", channel: "NNgroup", task: "Map one user journey using AI draft" },
      { week: 8, topic: "Competitive Analysis Fast Method", channel: "Femke Design", task: "Do a 30-min AI-powered competitor audit" },
    ]
  },
  {
    month: "Month 3 — Design Systems & Automation",
    color: "#059669",
    weeks: [
      { week: 9, topic: "Figma Variables Basics", channel: "Figma Official", task: "Build a color + type token system" },
      { week: 10, topic: "Tokens Studio Plugin", channel: "Tokens Studio", task: "Connect tokens to a mini component" },
      { week: 11, topic: "Design System Structure", channel: "Design System University", task: "Build a button component with variants" },
      { week: 12, topic: "Document & Publish Your System", channel: "Figma + Notion", task: "Write a 1-page case study" },
    ]
  }
];

export default function App() {
  const [checked, setChecked] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("design_tracker_v1");
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  const toggle = (key) => {
    const updated = { ...checked, [key]: !checked[key] };
    setChecked(updated);
    try { localStorage.setItem("design_tracker_v1", JSON.stringify(updated)); } catch {}
  };

  const totalTasks = weeks.reduce((acc, m) => acc + m.weeks.length * 2, 0);
  const completedTasks = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  if (!loaded) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0F0F0F", color: "#fff" }}>
      Loading...
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0F0F0F",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: "#F5F5F0",
      padding: "40px 24px",
      maxWidth: 720,
      margin: "0 auto"
    }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: "#666", textTransform: "uppercase", marginBottom: 8 }}>
          12-Week Plan · 1hr/day
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
          Designer Evolution<br />
          <span style={{ color: "#FF6B35" }}>Tracker</span>
        </h1>
        <div style={{ marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888", marginBottom: 8 }}>
            <span>{completedTasks} of {totalTasks} tasks done</span>
            <span style={{ color: progress === 100 ? "#059669" : "#FF6B35", fontWeight: 600 }}>{progress}%</span>
          </div>
          <div style={{ height: 6, background: "#1E1E1E", borderRadius: 99, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #FF6B35, #7C3AED)",
              borderRadius: 99,
              transition: "width 0.5s ease"
            }} />
          </div>
        </div>
      </div>

      {weeks.map((month) => (
        <div key={month.month} style={{ marginBottom: 40 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 2,
            textTransform: "uppercase", color: month.color, marginBottom: 16, paddingLeft: 2
          }}>
            {month.month}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {month.weeks.map(({ week, topic, channel, task }) => {
              const watchKey = `w${week}_watch`;
              const taskKey = `w${week}_task`;
              const bothDone = checked[watchKey] && checked[taskKey];
              return (
                <div key={week} style={{
                  background: bothDone ? "#111" : "#161616",
                  border: `1px solid ${bothDone ? month.color + "33" : "#222"}`,
                  borderRadius: 12, padding: "16px 20px",
                  transition: "all 0.2s ease", opacity: bothDone ? 0.6 : 1
                }}>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
                        color: month.color, background: month.color + "18",
                        padding: "2px 8px", borderRadius: 99
                      }}>WEEK {week}</span>
                      {bothDone && <span style={{ fontSize: 10, color: "#555" }}>✓ Complete</span>}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#F5F5F0" }}>{topic}</div>
                    <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>▶ {channel}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { key: watchKey, label: "Watched the video" },
                      { key: taskKey, label: task }
                    ].map(({ key, label }) => (
                      <label key={key} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        cursor: "pointer", fontSize: 13,
                        color: checked[key] ? "#555" : "#AAA",
                        textDecoration: checked[key] ? "line-through" : "none",
                        userSelect: "none"
                      }}>
                        <div onClick={() => toggle(key)} style={{
                          width: 18, height: 18, borderRadius: 5,
                          border: `2px solid ${checked[key] ? month.color : "#333"}`,
                          background: checked[key] ? month.color : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0, transition: "all 0.15s ease"
                        }}>
                          {checked[key] && <span style={{ fontSize: 11, color: "#fff", fontWeight: 700 }}>✓</span>}
                        </div>
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{ borderTop: "1px solid #1E1E1E", paddingTop: 20, fontSize: 11, color: "#444", textAlign: "center", letterSpacing: 1 }}>
        MISS A DAY? JUST CONTINUE. NO CATCHING UP. 🧘
      </div>
    </div>
  );
}
