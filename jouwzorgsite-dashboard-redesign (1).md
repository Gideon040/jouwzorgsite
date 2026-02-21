import { useState } from "react";

const statusDot = "inline-block w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse";

// Custom icon components to avoid generic look
const IconEdit = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);
const IconSparkle = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/>
  </svg>
);
const IconEye = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconUser = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconTool = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);
const IconChart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
  </svg>
);
const IconHome = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconLayers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
  </svg>
);
const IconStar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconSettings = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const IconHelp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const navItems = [
  { icon: <IconHome />, label: "Overzicht", active: true },
  { icon: <IconLayers />, label: "Mijn websites" },
  { icon: <IconStar />, label: "Kwaliteit", badge: "Nieuw" },
  { icon: <IconTool />, label: "DBA-Tools", badge: "Nieuw" },
];

const bottomNav = [
  { icon: <IconUser />, label: "Mijn gegevens" },
  { icon: <IconSettings />, label: "Instellingen" },
  { icon: <IconHelp />, label: "Hulp & Support" },
];

const quickActions = [
  { icon: <IconEdit />, title: "Site bewerken", desc: "Teksten, foto's en kleuren", color: "#0d9488", bg: "#f0fdfa" },
  { icon: <IconSparkle />, title: "AI Wizard", desc: "Laat AI je site verbeteren", color: "#8b5cf6", bg: "#f5f3ff" },
  { icon: <IconEye />, title: "Site bekijken", desc: "Bekijk je live website", color: "#2563eb", bg: "#eff6ff" },
];

const tools = [
  { icon: <IconUser />, title: "Mijn gegevens", desc: "Contact & zakelijke info", color: "#059669" },
  { icon: <IconShield />, title: "Kwaliteitskeurmerk", desc: "Toon dat je aan eisen voldoet", color: "#0891b2" },
  { icon: <IconGlobe />, title: "Eigen domein", desc: "Koppel je eigen .nl domein", color: "#7c3aed" },
  { icon: <IconTool />, title: "DBA-Tools", desc: "Binnenkort beschikbaar", color: "#94a3b8", disabled: true },
];

export default function Dashboard() {
  const [siteActive, setSiteActive] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: "#fafaf9",
      color: "#1c1917",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&display=swap" rel="stylesheet" />

      {/* Sidebar */}
      <aside style={{
        width: 240,
        background: "#1c1917",
        color: "#fafaf9",
        display: "flex",
        flexDirection: "column",
        padding: "24px 0",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle texture overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 30% 0%, rgba(13,148,136,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />

        {/* Logo */}
        <div style={{ padding: "0 24px", marginBottom: 40, position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #0d9488, #2dd4bf)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Fraunces', serif",
              fontWeight: 700,
              fontSize: 16,
              color: "#fff",
              letterSpacing: "-0.5px",
            }}>
              JZ
            </div>
            <span style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: "-0.3px",
            }}>
              JouwZorgSite
            </span>
          </div>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, position: "relative" }}>
          {navItems.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 24px",
                margin: "2px 12px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: item.active ? 500 : 400,
                background: item.active ? "rgba(255,255,255,0.08)" : "transparent",
                color: item.active ? "#fff" : "rgba(255,255,255,0.55)",
                cursor: "pointer",
                transition: "all 0.15s ease",
                position: "relative",
              }}
            >
              {item.active && (
                <div style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 3,
                  height: 20,
                  borderRadius: 4,
                  background: "#2dd4bf",
                }} />
              )}
              {item.icon}
              {item.label}
              {item.badge && (
                <span style={{
                  fontSize: 10,
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #0d9488, #2dd4bf)",
                  color: "#fff",
                  padding: "2px 7px",
                  borderRadius: 10,
                  marginLeft: "auto",
                  letterSpacing: "0.3px",
                  textTransform: "uppercase",
                }}>
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom nav */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 8, position: "relative" }}>
          {bottomNav.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 24px",
                margin: "2px 12px",
                borderRadius: 8,
                fontSize: 14,
                color: "rgba(255,255,255,0.45)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflow: "auto" }}>
        {/* Top bar */}
        <header style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 32px",
          borderBottom: "1px solid #e7e5e4",
          background: "#fafaf9",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}>
          <div />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 8,
              border: "none",
              background: "linear-gradient(135deg, #0d9488, #0f766e)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.1px",
              boxShadow: "0 1px 3px rgba(13,148,136,0.3), 0 4px 12px rgba(13,148,136,0.15)",
              transition: "all 0.2s ease",
            }}>
              <IconPlus />
              Nieuwe site
            </button>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0d9488, #2dd4bf)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}>
              G
            </div>
          </div>
        </header>

        {/* Content area */}
        <div style={{ padding: "32px", maxWidth: 960, margin: "0 auto" }}>

          {/* Welcome section */}
          <div style={{
            background: "linear-gradient(135deg, #1c1917 0%, #292524 100%)",
            borderRadius: 16,
            padding: "28px 32px",
            marginBottom: 28,
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Decorative elements */}
            <div style={{
              position: "absolute",
              right: -20,
              top: -20,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(45,212,191,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute",
              right: 60,
              bottom: -40,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
              <div>
                <h1 style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 26,
                  fontWeight: 600,
                  color: "#fafaf9",
                  margin: 0,
                  letterSpacing: "-0.5px",
                  lineHeight: 1.2,
                }}>
                  Welkom terug, Giel
                </h1>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 10,
                }}>
                  <a href="#" style={{
                    color: "#2dd4bf",
                    fontSize: 14,
                    textDecoration: "none",
                    fontWeight: 500,
                  }}>
                    giel.jouwzorgsite.nl
                  </a>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#34d399",
                    background: "rgba(52,211,153,0.1)",
                    padding: "3px 8px",
                    borderRadius: 20,
                    letterSpacing: "0.3px",
                    textTransform: "uppercase",
                  }}>
                    <span style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#34d399",
                      display: "inline-block",
                      animation: "pulse 2s infinite",
                    }} />
                    Live
                  </span>
                </div>
              </div>

              {/* Toggle */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                  Website is live
                </span>
                <button
                  onClick={() => setSiteActive(!siteActive)}
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    border: "none",
                    background: siteActive ? "#0d9488" : "#44403c",
                    cursor: "pointer",
                    position: "relative",
                    transition: "background 0.2s ease",
                  }}
                >
                  <div style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "#fff",
                    position: "absolute",
                    top: 3,
                    left: siteActive ? 23 : 3,
                    transition: "left 0.2s ease",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  }} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ marginBottom: 28 }}>
            <h2 style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#78716c",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              margin: "0 0 14px 0",
            }}>
              Snelle acties
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {quickActions.map((action, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredCard(`qa-${i}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    padding: "20px",
                    borderRadius: 12,
                    border: `1px solid ${hoveredCard === `qa-${i}` ? action.color + "40" : "#e7e5e4"}`,
                    background: hoveredCard === `qa-${i}` ? action.bg : "#fff",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    transform: hoveredCard === `qa-${i}` ? "translateY(-2px)" : "translateY(0)",
                    boxShadow: hoveredCard === `qa-${i}`
                      ? `0 8px 24px ${action.color}15`
                      : "0 1px 2px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: action.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: action.color,
                    marginBottom: 14,
                  }}>
                    {action.icon}
                  </div>
                  <div style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#1c1917",
                    marginBottom: 3,
                    letterSpacing: "-0.2px",
                  }}>
                    {action.title}
                  </div>
                  <div style={{ fontSize: 13, color: "#78716c" }}>
                    {action.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>

            {/* Tools grid */}
            <div>
              <h2 style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#78716c",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                margin: "0 0 14px 0",
              }}>
                Beheer
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {tools.map((tool, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => !tool.disabled && setHoveredCard(`t-${i}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      padding: "16px 18px",
                      borderRadius: 12,
                      border: `1px solid ${hoveredCard === `t-${i}` ? tool.color + "30" : "#e7e5e4"}`,
                      background: tool.disabled ? "#fafaf9" : "#fff",
                      cursor: tool.disabled ? "default" : "pointer",
                      transition: "all 0.2s ease",
                      opacity: tool.disabled ? 0.5 : 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                    }}
                  >
                    <div style={{
                      color: tool.color,
                      flexShrink: 0,
                    }}>
                      {tool.icon}
                    </div>
                    <div>
                      <div style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#1c1917",
                        letterSpacing: "-0.1px",
                      }}>
                        {tool.title}
                      </div>
                      <div style={{ fontSize: 12, color: "#a8a29e", marginTop: 1 }}>
                        {tool.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats panel */}
            <div>
              <h2 style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#78716c",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                margin: "0 0 14px 0",
              }}>
                Bezoekers
              </h2>
              <div style={{
                padding: "20px",
                borderRadius: 12,
                border: "1px solid #e7e5e4",
                background: "#fff",
                height: "calc(100% - 34px)",
                boxSizing: "border-box",
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "#fef3c7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#d97706",
                  }}>
                    <IconChart />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: 28,
                      fontWeight: 600,
                      color: "#1c1917",
                      letterSpacing: "-1px",
                      lineHeight: 1,
                    }}>
                      0
                    </div>
                    <div style={{ fontSize: 12, color: "#a8a29e" }}>
                      bezoekers deze maand
                    </div>
                  </div>
                </div>

                {/* Mini chart placeholder */}
                <div style={{
                  height: 60,
                  background: "linear-gradient(180deg, #fef9ee 0%, #fff 100%)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "0 4px 4px",
                  gap: 3,
                  marginBottom: 16,
                }}>
                  {[20, 35, 15, 45, 30, 55, 25, 40, 50, 35, 60, 45, 30, 55].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${h}%`,
                        background: "linear-gradient(180deg, #fbbf24 0%, #fde68a 100%)",
                        borderRadius: 3,
                        opacity: 0.25,
                      }}
                    />
                  ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { label: "Vandaag", value: "0" },
                    { label: "Deze week", value: "0" },
                    { label: "Deze maand", value: "0" },
                  ].map((stat, i) => (
                    <div key={i} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "6px 0",
                      borderBottom: i < 2 ? "1px solid #f5f5f4" : "none",
                    }}>
                      <span style={{ fontSize: 13, color: "#78716c" }}>{stat.label}</span>
                      <span style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#1c1917",
                        fontFamily: "'DM Sans', sans-serif",
                      }}>
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
