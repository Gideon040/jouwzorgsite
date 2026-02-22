'use client';

import { useEffect, useRef, useState } from 'react';
import './marketing-homepage.css';

interface MarketingHomepageProps {
  onStart: () => void;
}

export default function MarketingHomepage({ onStart }: MarketingHomepageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    // ── Intersection Observer for reveal animations ──
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stagger children
            if (entry.target.classList.contains('stagger')) {
              entry.target.querySelectorAll(':scope > *').forEach((child, i) => {
                (child as HTMLElement).style.transitionDelay = `${i * 80}ms`;
                child.classList.add('visible');
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    page.querySelectorAll('.reveal, .stagger').forEach((el) => observer.observe(el));

    // ── Navbar scroll effect ──
    const nav = page.querySelector('.nav') as HTMLElement;
    const handleScroll = () => {
      if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 50);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ── Story line reveal ──
    const lines = page.querySelectorAll('.story-line');
    const handleStoryScroll = () => {
      const vh = window.innerHeight;
      lines.forEach((line) => {
        const rect = line.getBoundingClientRect();
        if (rect.top < vh * 0.78) {
          line.classList.add('lit');
        } else {
          line.classList.remove('lit');
        }
      });
    };
    window.addEventListener('scroll', handleStoryScroll, { passive: true });
    handleStoryScroll();

    // ── Smooth scroll for anchor links ──
    const anchors = page.querySelectorAll('a[href^="#"]');
    const handleAnchorClick = (e: Event) => {
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      if (href && /^#[a-zA-Z][\w-]*$/.test(href)) {
        const target = page.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    anchors.forEach((a) => a.addEventListener('click', handleAnchorClick));

    // ── FAQ toggles ──
    const faqItems = page.querySelectorAll('.faq-q');
    faqItems.forEach((q) => {
      q.addEventListener('click', () => {
        const item = q.parentElement;
        if (item) item.classList.toggle('open');
      });
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleStoryScroll);
      anchors.forEach((a) => a.removeEventListener('click', handleAnchorClick));
    };
  }, []);

  return (
    <div className="marketing-page" ref={pageRef}>
      
      {/* ═══════════════════════════════════════════════════════════
           NAVIGATION
           ═══════════════════════════════════════════════════════════ */}
      <nav className="nav" id="nav">
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <img src="/logo.png" alt="JouwZorgSite" style={{ height: '28px' }} />
          </a>
          <div className="nav-links">
            <a href="#features">Voordelen</a>
            <a href="#templates">Templates</a>
            <a href="#prijzen">Prijzen</a>
            <a href="/faq">FAQ</a>
            <a href="#contact">Contact</a>
            <a href="/login" className="nav-login">Inloggen</a>
          </div>
          <div className="nav-right">
            <button className="nav-cta" onClick={(e) => { e.preventDefault(); onStart(); }}>Gratis proberen</button>
            <button
              className="nav-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>Voordelen</a>
            <a href="#templates" onClick={() => setMobileMenuOpen(false)}>Templates</a>
            <a href="#prijzen" onClick={() => setMobileMenuOpen(false)}>Prijzen</a>
            <a href="/faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <a href="/login" className="mobile-login" onClick={() => setMobileMenuOpen(false)}>Inloggen</a>
            <button className="mobile-cta" onClick={() => { setMobileMenuOpen(false); onStart(); }}>Gratis proberen</button>
          </div>
        )}
      </nav>
      
      
      {/* ═══════════════════════════════════════════════════════════
           HERO
           ═══════════════════════════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <h1>Jouw zorgwebsite in <em>30 seconden</em> online</h1>
            <p className="hero-sub">Vul je naam en specialisatie in. Onze AI maakt direct een complete, professionele website — met teksten, design en kwaliteitskeurmerk. Geen technische kennis nodig.</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={onStart}>
                Maak je website
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
              <button className="btn-secondary" onClick={() => { document.getElementById('prijzen')?.scrollIntoView({ behavior: 'smooth' }); }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
                Bekijk prijzen
              </button>
            </div>
            <div className="hero-trust">
              <div className="hero-trust-item">
                <span className="hero-trust-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#5a7c5a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
                Gratis uitproberen
              </div>
              <div className="hero-trust-item">
                <span className="hero-trust-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#5a7c5a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
                Geen creditcard nodig
              </div>
              <div className="hero-trust-item">
                <span className="hero-trust-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#5a7c5a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
                AVG-compliant
              </div>
            </div>
          </div>
      
          {/* Browser mockup */}
          <div className="hero-visual">
            <div className="hero-float-1"></div>
            <div className="hero-float-2"></div>
            <div className="hero-mockup">
              <div className="mock-bar">
                <div className="mock-dots">
                  <div className="mock-dot" style={{'background':'#ef4444'}}></div>
                  <div className="mock-dot" style={{'background':'#fbbf24'}}></div>
                  <div className="mock-dot" style={{'background':'#22c55e'}}></div>
                </div>
                <div className="mock-url">lisa-verpleegkundige.nl</div>
              </div>
              <div className="mock-content">
                <div className="mock-hero-grid">
                  <div className="mock-photo">
                    <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop&crop=face" alt="Zorgprofessional" onError={(e) => { const img = e.currentTarget; img.style.display = 'none'; if (img.parentElement) img.parentElement.style.background = 'linear-gradient(145deg,#c4d4cf,#a8b8b0)'; }}/>
                    <div className="mock-avail"><span className="mock-avail-dot"></span><span className="mock-avail-text">Beschikbaar</span></div>
                    <div className="mock-exp"><div className="mock-exp-num">8+</div><div className="mock-exp-label">Jaar ervaring</div></div>
                  </div>
                  <div className="mock-info">
                    <div className="mock-beroep">Wijkverpleegkundige</div>
                    <div className="mock-naam">Lisa de Vries</div>
                    <div className="mock-sub">Persoonlijke zorg aan huis in Amsterdam-Zuid.</div>
                    <div className="mock-usps">
                      <div className="mock-usp"><div className="mock-usp-icon"><span className="material-symbols-outlined">verified</span></div><span>BIG-geregistreerd</span></div>
                      <div className="mock-usp"><div className="mock-usp-icon"><span className="material-symbols-outlined">shield</span></div><span>DBA-compliant</span></div>
                      <div className="mock-usp"><div className="mock-usp-icon"><span className="material-symbols-outlined">verified_user</span></div><span>VOG & Verzekerd</span></div>
                      <div className="mock-usp"><div className="mock-usp-icon"><span className="material-symbols-outlined">location_on</span></div><span>Amsterdam e.o.</span></div>
                    </div>
                    <div className="mock-ctas">
                      <div className="mock-cta mock-cta-primary">Contact opnemen</div>
                      <div className="mock-cta mock-cta-secondary">Bekijk diensten</div>
                    </div>
                  </div>
                </div>
                <div className="mock-widget" style={{'left':'auto','right':'12px'}}>
                  <div className="mock-widget-shield"><svg fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <div><div className="mock-widget-main">Geverifieerd zorgprofiel</div><div className="mock-widget-sub">BIG · KvK · 92% compliant</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      {/* ═══════════════════════════════════════════════════════════
           SOCIAL PROOF BAR
           ═══════════════════════════════════════════════════════════ */}
      <div className="social-proof-bar">
        <div className="sp-item">
          <div className="sp-avatars">
            <span style={{'background':'url(\'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&q=80\') center/cover'}}></span>
            <span style={{'background':'url(\'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&q=80\') center/cover'}}></span>
            <span style={{'background':'url(\'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=64&q=80\') center/cover'}}></span>
            <span style={{'background':'url(\'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=64&q=80\') center/cover'}}></span>
            <span style={{'background':'url(\'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=64&q=80\') center/cover'}}></span>
          </div>
          <span><strong>130+</strong> zorgprofessionals gingen je voor</span>
        </div>
        <div className="sp-divider"></div>
        <div className="sp-item">
          <span className="sp-pulse"></span>
          <span><strong>12</strong> sites deze week aangemaakt</span>
        </div>
      </div>
      
      
      
      {/* ═══════════════════════════════════════════════════════════
           STORYTELLING — Compact reveal paragraph
           ═══════════════════════════════════════════════════════════ */}
      <section className="story" id="beroepen">
        <div className="story-inner">
          <p>
            <span className="story-line">Opdrachtgevers googlen je naam. </span>
            <span className="story-line">En vinden… <span className="story-muted">niets.</span> </span>
            <span className="story-line">Geen website, geen keurmerk, geen bewijs. </span>
            <span className="story-line">Met JouwZorgSite heb je binnen 30 seconden </span>
            <span className="story-line">een <span className="story-teal">professionele website</span> met eigen domein, </span>
            <span className="story-line"><span className="story-teal">kwaliteitskeurmerk</span> en AI-geschreven teksten. </span>
            <span className="story-line">Morgen al vindbaar. <span className="story-muted">Op pagina 1.</span></span>
          </p>
          <a href="#pricing" className="story-cta" onClick={(e) => { e.preventDefault(); onStart(); }}>Probeer het gratis →</a>
        </div>
      </section>
      
      
      {/* ═══════════════════════════════════════════════════════════
           HOW IT WORKS — 3-step timeline
           ═══════════════════════════════════════════════════════════ */}
      <section className="hiw">
        <div className="hiw-inner reveal">
          <div className="hiw-label">Zo simpel is het</div>
          <h2 className="hiw-title">In 3 stappen online</h2>
          <div className="hiw-timeline">
            <div className="hiw-step">
              <div className="hiw-num">1</div>
              <div className="hiw-step-title">Vul je naam in</div>
              <div className="hiw-step-desc">Je naam, specialisatie en werkgebied. Meer hebben we niet nodig.</div>
            </div>
            <div className="hiw-step">
              <div className="hiw-num">2</div>
              <div className="hiw-step-title">Kies je stijl</div>
              <div className="hiw-step-desc">Selecteer een template en kleurpalet. AI schrijft je teksten automatisch.</div>
            </div>
            <div className="hiw-step">
              <div className="hiw-num">3</div>
              <div className="hiw-step-title">Je site is live</div>
              <div className="hiw-step-desc">Direct online met eigen domein, keurmerk en contactformulier.</div>
            </div>
          </div>
        </div>
      </section>
      
      
      {/* ═══════════════════════════════════════════════════════════
           FEATURES (from v6 sections)
           ═══════════════════════════════════════════════════════════ */}
      <section className="features" id="features">
        <div className="section-header reveal">
          <div className="section-label">Waarom JouwZorgSite</div>
          <h2 className="section-title">Alles wat je nodig hebt als zorg-ZZP'er</h2>
          <p className="section-desc">Een professionele website is meer dan een visitekaartje. Het is je eerste indruk, je vindbaarheid, en je bewijs van zelfstandigheid.</p>
        </div>
      
        <div className="features-wrapper">
      
          {/* 1. VERTROUWEN */}
          <div className="feature-card card-light reveal">
            <div className="f-text">
              <p className="f-label">Vertrouwen opbouwen</p>
              <h2 className="f-heading">Opdrachtgevers nemen je serieus vanaf het eerste contact</h2>
              <p className="f-desc">Een professionele website met kwaliteitskeurmerk laat zien dat je een serieuze zorgprofessional bent. Instellingen checken je online — zorg dat ze onder de indruk zijn.</p>
              <div className="f-checks stagger">
                <div className="f-check"><span className="f-check-icon" style={{'background':'var(--sage-light)'}}><svg viewBox="0 0 24 24" fill="none" stroke="#5a7c5a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span><span className="f-check-text">Professionele uitstraling als een echte ondernemer</span></div>
                <div className="f-check"><span className="f-check-icon" style={{'background':'var(--sage-light)'}}><svg viewBox="0 0 24 24" fill="none" stroke="#5a7c5a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span><span className="f-check-text">Kwaliteitskeurmerk dat vertrouwen wekt</span></div>
                <div className="f-check"><span className="f-check-icon" style={{'background':'var(--sage-light)'}}><svg viewBox="0 0 24 24" fill="none" stroke="#5a7c5a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span><span className="f-check-text">Eruitziet alsof je er duizenden aan hebt uitgegeven</span></div>
              </div>
            </div>
            <div className="f-visual">
              <div className="hero-mockup" style={{'transform':'none','maxWidth':'460px'}}>
                <div className="mock-bar">
                  <div className="mock-dots"><div className="mock-dot" style={{'background':'#ef4444'}}></div><div className="mock-dot" style={{'background':'#fbbf24'}}></div><div className="mock-dot" style={{'background':'#22c55e'}}></div></div>
                  <div className="mock-url">lisa-verpleegkundige.nl</div>
                </div>
                <div className="mock-content">
                  <div className="mock-hero-grid">
                    <div className="mock-photo">
                      <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop&crop=face" alt="Zorgprofessional" onError={(e) => { const img = e.currentTarget; img.style.display = 'none'; if (img.parentElement) img.parentElement.style.background = 'linear-gradient(145deg,#c4d4cf,#a8b8b0)'; }}/>
                      <div className="mock-avail"><span className="mock-avail-dot"></span><span className="mock-avail-text">Beschikbaar</span></div>
                      <div className="mock-exp"><div className="mock-exp-num">8+</div><div className="mock-exp-label">Jaar ervaring</div></div>
                    </div>
                    <div className="mock-info">
                      <div className="mock-beroep">Wijkverpleegkundige</div>
                      <div className="mock-naam">Lisa de Vries</div>
                      <div className="mock-sub">Persoonlijke zorg aan huis in Amsterdam-Zuid.</div>
                      <div className="mock-usps">
                        <div className="mock-usp"><div className="mock-usp-icon"><span className="material-symbols-outlined">verified</span></div><span>BIG-geregistreerd</span></div>
                        <div className="mock-usp"><div className="mock-usp-icon"><span className="material-symbols-outlined">shield</span></div><span>DBA-compliant</span></div>
                        <div className="mock-usp"><div className="mock-usp-icon"><span className="material-symbols-outlined">verified_user</span></div><span>VOG & Verzekerd</span></div>
                        <div className="mock-usp"><div className="mock-usp-icon"><span className="material-symbols-outlined">location_on</span></div><span>Amsterdam e.o.</span></div>
                      </div>
                      <div className="mock-ctas">
                        <div className="mock-cta mock-cta-primary">Contact opnemen</div>
                        <div className="mock-cta mock-cta-secondary">Bekijk diensten</div>
                      </div>
                    </div>
                  </div>
                  <div className="mock-widget">
                    <div className="mock-widget-shield"><svg fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                    <div><div className="mock-widget-main">Professioneel zorgprofiel</div><div className="mock-widget-sub">3 geverifieerd · 92% compliant</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          {/* 2. GEVONDEN WORDEN */}
          <div className="feature-card card-teal reverse reveal">
            <div className="f-text">
              <p className="f-label" style={{'color':'#059669'}}>Gevonden worden</p>
              <h2 className="f-heading">Morgen al vindbaar voor opdrachtgevers</h2>
              <p className="f-desc">Met een eigen .nl domein en een geoptimaliseerde website word je gevonden wanneer opdrachtgevers zoeken naar zorgprofessionals in jouw regio.</p>
              <div className="f-checks stagger">
                <div className="f-check"><span className="f-check-icon" style={{'background':'#d1fae5'}}><svg viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span><span className="f-check-text">Eigen .nl domeinnaam inbegrepen</span></div>
                <div className="f-check"><span className="f-check-icon" style={{'background':'#d1fae5'}}><svg viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span><span className="f-check-text">Geoptimaliseerd voor Google</span></div>
                <div className="f-check"><span className="f-check-icon" style={{'background':'#d1fae5'}}><svg viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span><span className="f-check-text">Vindbaar in jouw regio</span></div>
              </div>
            </div>
            <div className="f-visual">
              <div className="google-frame">
                <div className="search-result">
                  <div className="result-url-row"><span className="favicon">🌐</span><span className="result-url">lisa-verpleegkundige.nl</span></div>
                  <div className="result-title">Lisa de Vries — Wijkverpleegkundige Amsterdam</div>
                  <div className="result-snippet">Ervaren wijkverpleegkundige in Amsterdam-Zuid. BIG-geregistreerd, gespecialiseerd in ouderenzorg en palliatieve zorg. Direct beschikbaar voor...</div>
                </div>
                <div className="result-ghost">
                  <div className="ghost-line" style={{'width':'65%','height':'10px','marginBottom':'7px'}}></div>
                  <div className="ghost-line" style={{'width':'85%','height':'8px'}}></div>
                </div>
              </div>
            </div>
          </div>
      
          {/* 3. MEER OPDRACHTEN */}
          <div className="feature-card card-dark reveal">
            <div className="f-text">
              <p className="f-label">Meer opdrachten</p>
              <h2 className="f-heading">Directe aanvragen, zonder bureau ertussen</h2>
              <p className="f-desc">Opdrachtgevers die je website vinden, nemen rechtstreeks contact met je op. Geen bemiddelingsbureau dat een marge pakt.</p>
              <div className="f-checks stagger">
                <div className="f-check"><span className="f-check-icon" style={{'background':'rgba(13,148,136,0.15)'}}><svg viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span><span className="f-check-text">Contactformulier direct op je website</span></div>
                <div className="f-check"><span className="f-check-icon" style={{'background':'rgba(13,148,136,0.15)'}}><svg viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span><span className="f-check-text">Geen commissie of bemiddelingskosten</span></div>
                <div className="f-check"><span className="f-check-icon" style={{'background':'rgba(13,148,136,0.15)'}}><svg viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span><span className="f-check-text">Bouw relaties op met vaste opdrachtgevers</span></div>
              </div>
            </div>
            <div className="f-visual">
              <div className="opdrachten-visual">
                <div className="stat-block">
                  <div className="stat-num">3</div>
                  <div className="stat-label">Nieuwe aanvragen deze week</div>
                </div>
                <div className="floating-inbox">
                  <div className="inbox-header">
                    <span className="inbox-title"><span className="material-symbols-outlined" style={{'fontSize':'14px','color':'#0d9488'}}>mail</span> Aanvragen</span>
                    <span className="inbox-badge">3 nieuw</span>
                  </div>
                  <div className="inbox-item unread"><span className="inbox-dot"></span><div style={{'flex':'1','minWidth':'0'}}><div className="inbox-from">Zorggroep De Linde</div><div className="inbox-preview">Wij zoeken een wijkverpleegkundige voor 24 uur per week...</div></div><span className="inbox-time">2u</span></div>
                  <div className="inbox-item unread"><span className="inbox-dot"></span><div style={{'flex':'1','minWidth':'0'}}><div className="inbox-from">Thuiszorg Amsterdam-Oost</div><div className="inbox-preview">Via uw website willen wij graag contact opnemen...</div></div><span className="inbox-time">5u</span></div>
                  <div className="inbox-item unread"><span className="inbox-dot"></span><div style={{'flex':'1','minWidth':'0'}}><div className="inbox-from">Huisartsenpraktijk Centrum</div><div className="inbox-preview">Uw profiel spreekt ons erg aan. Kunnen we...</div></div><span className="inbox-time">1d</span></div>
                </div>
              </div>
            </div>
          </div>
      
          {/* 4. DBA-PROOF */}
          <div className="feature-card card-blue reverse reveal">
            <div className="f-text">
              <p className="f-label" style={{'color':'#007fa9'}}>DBA-compliant</p>
              <h2 className="f-heading">Slaap rustig — je bent DBA-proof</h2>
              <p className="f-desc">De handhaving is gestart en boetes lopen op tot €45.000. Met een eigen website en kwaliteitskeurmerk bewijs je aantoonbaar dat je een echte zelfstandige bent.</p>
              <div className="f-checks stagger">
                <div className="f-check"><span className="f-check-icon" style={{'background':'#dbeafe'}}><svg viewBox="0 0 24 24" fill="none" stroke="#007fa9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span><span className="f-check-text">Eigen website als bewijs van zelfstandigheid</span></div>
                <div className="f-check"><span className="f-check-icon" style={{'background':'#dbeafe'}}><svg viewBox="0 0 24 24" fill="none" stroke="#007fa9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span><span className="f-check-text">Kwaliteitskeurmerk toont professionaliteit</span></div>
                <div className="f-check"><span className="f-check-icon" style={{'background':'#dbeafe'}}><svg viewBox="0 0 24 24" fill="none" stroke="#007fa9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span><span className="f-check-text">Meerdere opdrachtgevers zichtbaar op je profiel</span></div>
              </div>
            </div>
            <div className="f-visual">
              <div className="dba-visual">
                <div className="dba-card">
                  <div className="dba-card-header">
                    <svg width="24" height="24" fill="none" stroke="#007fa9" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span>DBA-risico analyse</span>
                  </div>
                  <div className="dba-card-result">
                    <div className="dba-result-status">Laag risico</div>
                    <div className="dba-result-desc">Je profiel vertoont voldoende kenmerken van zelfstandigheid</div>
                  </div>
                  <div className="dba-card-items">
                    <div className="dba-card-item dba-pass"><svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>Eigen professionele website</span></div>
                    <div className="dba-card-item dba-pass"><svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>Kwaliteitskeurmerk actief</span></div>
                    <div className="dba-card-item dba-pass"><svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>BIG-registratie geverifieerd</span></div>
                    <div className="dba-card-item dba-pass"><svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>KvK-inschrijving bevestigd</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
        </div>
      </section>
      
      
      {/* ═══════════════════════════════════════════════════════════
           TEMPLATES SHOWCASE
           ═══════════════════════════════════════════════════════════ */}
      <section className="templates" id="templates">
        <div className="section-header reveal">
          <div className="section-label">5 Templates · Duizenden combinaties</div>
          <h2 className="section-title">Kies de stijl die bij jou past</h2>
          <p className="section-desc">Elk template heeft 17 secties met 3 layoutvarianten en 4 kleurpaletten. Geen twee sites zijn hetzelfde.</p>
        </div>
        <div className="tpl-grid reveal stagger">
      
          {/* 1. EDITORIAL — Newsreader heading, sage green */}
          <div className="tpl-card">
            <div className="tpl-chrome">
              <div className="tpl-chrome-dots"><span></span><span></span><span></span></div>
              <div className="tpl-chrome-url">marieke-jansen.jouwzorgsite.nl</div>
            </div>
            <div className="tpl-preview">
              <div className="tpl-preview-bg" style={{'backgroundImage':'url(\'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80\')'}}></div>
              <div className="tpl-preview-overlay" style={{'background':'linear-gradient(to top, #faf9f6 0%, #faf9f6ee 35%, transparent 75%)'}}>
                <span className="tp-tag" style={{'color':'#5a7c6f','fontVariant':'small-caps'}}>Wijkverpleegkundige</span>
                <div className="tp-h" style={{'fontFamily':'\'Newsreader\',Georgia,serif','fontStyle':'italic','color':'#1a2e28'}}>Zorg met Aandacht<br />&amp; Vertrouwen</div>
                <div className="tp-sub" style={{'color':'#5a6b65'}}>Persoonlijke wijkverpleging in Amsterdam-Zuid</div>
                <div className="tp-usps">
                  <span className="tp-usp" style={{'border':'1px solid rgba(90,124,111,0.2)','color':'#5a6b65'}}><span style={{'color':'#5a7c6f'}}>✓</span> BIG</span>
                  <span className="tp-usp" style={{'border':'1px solid rgba(90,124,111,0.2)','color':'#5a6b65'}}><span style={{'color':'#5a7c6f'}}>✓</span> DBA</span>
                  <span className="tp-usp" style={{'border':'1px solid rgba(90,124,111,0.2)','color':'#5a6b65'}}><span style={{'color':'#5a7c6f'}}>✓</span> VOG</span>
                </div>
                <div className="tp-btns">
                  <span className="tp-btn" style={{'background':'#5a7c6f','color':'#fff'}}>Neem contact op</span>
                  <span className="tp-btn" style={{'border':'1px solid rgba(90,124,111,0.2)','color':'#5a6b65'}}>Bekijk profiel</span>
                </div>
              </div>
            </div>
            <div className="tpl-meta">
              <div><span className="tpl-meta-name">Editorial</span><span className="tpl-meta-style">Newsreader + Source Sans</span></div>
              <div className="tpl-meta-pals">
                <div className="tpl-meta-pal" style={{'background':'#5a7c6f'}} title="Sage"></div>
                <div className="tpl-meta-pal" style={{'background':'#7c3a50'}} title="Burgundy"></div>
                <div className="tpl-meta-pal" style={{'background':'#3d4a6b'}} title="Navy"></div>
                <div className="tpl-meta-pal" style={{'background':'#7c6a4f'}} title="Caramel"></div>
              </div>
            </div>
          </div>
      
          {/* 2. PROACTIEF — Space Grotesk heading, cyan/orange */}
          <div className="tpl-card">
            <div className="tpl-chrome">
              <div className="tpl-chrome-dots"><span></span><span></span><span></span></div>
              <div className="tpl-chrome-url">kevin-de-boer.nl</div>
            </div>
            <div className="tpl-preview">
              <div className="tpl-preview-bg" style={{'backgroundImage':'url(\'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80\')'}}></div>
              <div className="tpl-preview-overlay" style={{'background':'linear-gradient(to top, #ffffff 0%, #ffffffee 35%, transparent 75%)'}}>
                <div style={{'display':'flex','alignItems':'center','gap':'4px','marginBottom':'4px'}}>
                  <div style={{'width':'14px','height':'2px','background':'#007fa9'}}></div>
                  <span className="tp-tag" style={{'color':'#007fa9','margin':'0'}}>Verpleegkundige</span>
                </div>
                <div className="tp-h" style={{'fontFamily':'\'Space Grotesk\',sans-serif','fontWeight':'700','color':'#0f172a'}}>Professionele Thuiszorg<br />op Maat</div>
                <div className="tp-sub" style={{'color':'#607085'}}>Verpleegkundige zorg aan huis in Utrecht</div>
                <div className="tp-btns">
                  <span className="tp-btn" style={{'background':'#f26632','color':'#fff'}}>Contact opnemen →</span>
                  <span className="tp-btn" style={{'border':'1px solid rgba(0,127,169,0.15)','color':'#0f172a'}}>Diensten</span>
                </div>
                <div className="tp-stats" style={{'borderTop':'1px solid rgba(0,127,169,0.1)','paddingTop':'6px'}}>
                  <div><span className="tp-stat-val" style={{'color':'#007fa9'}}>12+</span><div className="tp-stat-lbl" style={{'color':'#607085'}}>Jaar ervaring</div></div>
                  <div><span className="tp-stat-val" style={{'color':'#007fa9'}}>200+</span><div className="tp-stat-lbl" style={{'color':'#607085'}}>Cliënten</div></div>
                </div>
              </div>
            </div>
            <div className="tpl-meta">
              <div><span className="tpl-meta-name">ProActief</span><span className="tpl-meta-style">Space Grotesk + Work Sans</span></div>
              <div className="tpl-meta-pals">
                <div className="tpl-meta-pal" style={{'background':'#007fa9'}} title="Cyan"></div>
                <div className="tpl-meta-pal" style={{'background':'#7c3aed'}} title="Electric"></div>
                <div className="tpl-meta-pal" style={{'background':'#d14635'}} title="Sunset"></div>
                <div className="tpl-meta-pal" style={{'background':'#05875f'}} title="Emerald"></div>
              </div>
            </div>
          </div>
      
          {/* 3. PORTFOLIO — DM Serif Display heading, forest green, LIGHT bg */}
          <div className="tpl-card">
            <div className="tpl-chrome">
              <div className="tpl-chrome-dots"><span></span><span></span><span></span></div>
              <div className="tpl-chrome-url">fatima-el-amrani.nl</div>
            </div>
            <div className="tpl-preview">
              <div className="tpl-preview-bg" style={{'backgroundImage':'url(\'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80\')','backgroundPosition':'center 20%'}}></div>
              <div className="tpl-preview-overlay" style={{'background':'linear-gradient(to top, #f8f6f2 0%, #f8f6f2ee 32%, transparent 70%)'}}>
                <div style={{'display':'inline-flex','alignItems':'center','gap':'3px','padding':'2px 7px','borderRadius':'100px','background':'rgba(26,58,47,0.08)','marginBottom':'5px'}}>
                  <span style={{'width':'4px','height':'4px','borderRadius':'50%','background':'#699838'}}></span>
                  <span style={{'fontSize':'6px','color':'#1a3a2f'}}>Beschikbaar</span>
                </div>
                <div className="tp-h" style={{'color':'#1a3a2f','fontFamily':'\'DM Serif Display\',Georgia,serif'}}>Kraamzorg met<br />Liefde &amp; Ervaring</div>
                <div className="tp-sub" style={{'color':'#5a6b65'}}>Ervaren kraamverzorgende in Den Haag</div>
                <div className="tp-btns">
                  <span className="tp-btn" style={{'background':'#1a3a2f','color':'#fff','borderRadius':'100px'}}>Contact</span>
                  <span className="tp-btn" style={{'border':'1px solid rgba(26,58,47,0.15)','color':'#1a3a2f','borderRadius':'100px'}}>Over mij</span>
                </div>
                <div className="tp-stats" style={{'borderTop':'1px solid rgba(26,58,47,0.1)','paddingTop':'6px'}}>
                  <div><span className="tp-stat-val" style={{'color':'#1a3a2f'}}>15+</span><div className="tp-stat-lbl" style={{'color':'#5a6b65'}}>Ervaring</div></div>
                  <div><span className="tp-stat-val" style={{'color':'#699838'}}>300+</span><div className="tp-stat-lbl" style={{'color':'#5a6b65'}}>Gezinnen</div></div>
                </div>
              </div>
            </div>
            <div className="tpl-meta">
              <div><span className="tpl-meta-name">Portfolio</span><span className="tpl-meta-style">DM Serif + DM Sans</span></div>
              <div className="tpl-meta-pals">
                <div className="tpl-meta-pal" style={{'background':'#1a3a2f'}} title="Forest"></div>
                <div className="tpl-meta-pal" style={{'background':'#2d3436'}} title="Charcoal"></div>
                <div className="tpl-meta-pal" style={{'background':'#1e293b'}} title="Midnight"></div>
                <div className="tpl-meta-pal" style={{'background':'#3e2723'}} title="Espresso"></div>
              </div>
            </div>
          </div>
      
          {/* 4. MINDOOR — Fraunces heading, sage + coral */}
          <div className="tpl-card">
            <div className="tpl-chrome">
              <div className="tpl-chrome-dots"><span></span><span></span><span></span></div>
              <div className="tpl-chrome-url">sophie-van-dijk.jouwzorgsite.nl</div>
            </div>
            <div className="tpl-preview">
              <div className="tpl-preview-bg" style={{'backgroundImage':'url(\'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80\')'}}></div>
              <div className="tpl-preview-overlay" style={{'background':'linear-gradient(to top, #faf8f5 0%, #faf8f5ee 35%, transparent 75%)'}}>
                <div style={{'display':'flex','alignItems':'center','gap':'3px','marginBottom':'4px'}}>
                  <span style={{'width':'4px','height':'4px','borderRadius':'50%','background':'#22c55e'}}></span>
                  <span style={{'fontSize':'6px','color':'#3d503d','fontWeight':'500'}}>Beschikbaar</span>
                </div>
                <div className="tp-h" style={{'fontFamily':'\'Fraunces\',Georgia,serif','color':'#1a1a1a'}}>Sophie van Dijk,<br /><span style={{'fontStyle':'italic','color':'#d4644a'}}>Verzorgende IG</span></div>
                <div className="tp-sub" style={{'color':'#6b6560'}}>Warme zorg in Rotterdam e.o.</div>
                <div className="tp-btns">
                  <span className="tp-btn" style={{'background':'#d4644a','color':'#fff','borderRadius':'100px'}}>Contact →</span>
                  <span className="tp-btn" style={{'background':'#fff','border':'1px solid rgba(90,124,90,0.15)','color':'#1a1a1a','borderRadius':'100px'}}>Diensten</span>
                </div>
                <div className="tp-social" style={{'background':'#fff','border':'1px solid rgba(90,124,90,0.1)'}}>
                  <div className="tp-avatars"><span></span><span style={{'background':'#c4b5a0'}}></span><span style={{'background':'#a8a29e'}}></span></div>
                  <span style={{'fontSize':'6px','color':'#6b6560'}}>Vertrouwd door zorginstellingen</span>
                </div>
              </div>
            </div>
            <div className="tpl-meta">
              <div><span className="tpl-meta-name">Mindoor</span><span className="tpl-meta-style">Fraunces + Nunito</span></div>
              <div className="tpl-meta-pals">
                <div className="tpl-meta-pal" style={{'background':'#5a7c5a'}} title="Sage+Coral"></div>
                <div className="tpl-meta-pal" style={{'background':'#946b74'}} title="Dusty Rose"></div>
                <div className="tpl-meta-pal" style={{'background':'#6b705c'}} title="Olive"></div>
                <div className="tpl-meta-pal" style={{'background':'#937133'}} title="Amber"></div>
              </div>
            </div>
          </div>
      
          {/* 5. SERENE — Cormorant Garamond heading, muted sage */}
          <div className="tpl-card">
            <div className="tpl-chrome">
              <div className="tpl-chrome-dots"><span></span><span></span><span></span></div>
              <div className="tpl-chrome-url">anna-bakker.nl</div>
            </div>
            <div className="tpl-preview">
              <div className="tpl-preview-bg" style={{'backgroundImage':'url(\'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80\')'}}></div>
              <div className="tpl-preview-overlay" style={{'background':'linear-gradient(to top, #f9faf8 0%, #f9faf8ee 35%, transparent 75%)'}}>
                <div style={{'display':'flex','alignItems':'center','gap':'5px','marginBottom':'5px'}}>
                  <span style={{'fontSize':'5px','textTransform':'uppercase','letterSpacing':'1.2px','color':'#617061'}}>Thuiszorg</span>
                  <div style={{'width':'30px','height':'1px','background':'rgba(61,74,61,0.15)'}}></div>
                </div>
                <div className="tp-h" style={{'fontFamily':'\'Cormorant Garamond\',Georgia,serif','color':'#2d3a2d','fontSize':'22px','fontWeight':'500'}}>Anna<br /><em style={{'color':'#3d4a3d'}}>Bakker</em></div>
                <div className="tp-sub" style={{'color':'#617061'}}>Thuiszorg met aandacht voor het gezin</div>
                <div className="tp-btns">
                  <span className="tp-btn" style={{'background':'#3d4a3d','color':'#fff','borderRadius':'2px'}}>Contact →</span>
                  <span className="tp-btn" style={{'border':'1px solid rgba(61,74,61,0.15)','color':'#2d3a2d','borderRadius':'2px'}}>Diensten</span>
                </div>
              </div>
            </div>
            <div className="tpl-meta">
              <div><span className="tpl-meta-name">Serene</span><span className="tpl-meta-style">Cormorant + Nunito Sans</span></div>
              <div className="tpl-meta-pals">
                <div className="tpl-meta-pal" style={{'background':'#3d4a3d'}} title="Sage"></div>
                <div className="tpl-meta-pal" style={{'background':'#6b7280'}} title="Stone"></div>
                <div className="tpl-meta-pal" style={{'background':'#5a6b8a'}} title="Dusk"></div>
                <div className="tpl-meta-pal" style={{'background':'#4a5d4a'}} title="Moss"></div>
              </div>
            </div>
          </div>
      
        </div>
      </section>
      
      
      {/* ═══════════════════════════════════════════════════════════
           KWALITEITSKEURMERK
           ═══════════════════════════════════════════════════════════ */}
      <section className="keurmerk" id="keurmerk">
        <div className="section-header reveal">
          <div className="section-label">Kwaliteitskeurmerk</div>
          <h2 className="section-title">Bewijs dat je aan alle eisen voldoet</h2>
          <p className="section-desc">Vergelijkbaar met WebwinkelKeur, maar dan voor zorgprofessionals. Met BIG-verificatie, KvK-controle en 9 professionele verklaringen.</p>
        </div>
        <div className="keurmerk-grid">
          <div className="keurmerk-steps stagger">
            <div className="keurmerk-step">
              <div className="keurmerk-step-num">1</div>
              <div>
                <div className="keurmerk-step-title">BIG-registratie verifiëren</div>
                <div className="keurmerk-step-desc">Zoek je naam op — we controleren live bij het BIG-register van de overheid.</div>
              </div>
            </div>
            <div className="keurmerk-step">
              <div className="keurmerk-step-num">2</div>
              <div>
                <div className="keurmerk-step-title">KvK-nummer toevoegen</div>
                <div className="keurmerk-step-desc">Bewijs dat je bent ingeschreven bij de Kamer van Koophandel als zelfstandig ondernemer.</div>
              </div>
            </div>
            <div className="keurmerk-step">
              <div className="keurmerk-step-num">3</div>
              <div>
                <div className="keurmerk-step-title">9 verklaringen ondertekenen</div>
                <div className="keurmerk-step-desc">Bevestig dat je voldoet aan Wtza, Wkkgz, AVG en andere professionele normen.</div>
              </div>
            </div>
            <div className="keurmerk-step">
              <div className="keurmerk-step-num">4</div>
              <div>
                <div className="keurmerk-step-title">Widget activeren</div>
                <div className="keurmerk-step-desc">Het keurmerk verschijnt als zwevende badge op je website — zichtbaar voor elke bezoeker.</div>
              </div>
            </div>
          </div>
          <div className="f-visual reveal">
            <div className="trust-frame">
              <div className="trust-panel-inner">
                <div className="tp-header">
                  <div className="tp-shield"><svg fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <div><div className="tp-title">Professioneel zorgprofiel</div><div className="tp-sub">Verklaring zelfstandige zorgverlener</div></div>
                  <span className="tp-status">✓ Compliant</span>
                </div>
                <div style={{'paddingTop':'10px'}}>
                  <div className="tp-row"><div className="tp-check"><svg fill="#007fa9" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div><div><div className="tp-row-label">BIG-registratie gecontroleerd</div><div className="tp-row-detail">Verpleegkundige — niveau 5</div></div><span className="tp-badge">Geverifieerd</span></div>
                  <div className="tp-row"><div className="tp-check"><svg fill="#007fa9" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div><div><div className="tp-row-label">KvK-inschrijving</div><div className="tp-row-detail">Lisa de Vries Zorg — KvK 87654321</div></div><span className="tp-badge">Geverifieerd</span></div>
                  <div className="tp-row"><div className="tp-check"><svg fill="#007fa9" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div><div><div className="tp-row-label">Professionele website actief</div></div><span className="tp-badge">Actief</span></div>
                </div>
                <div className="tp-divider"></div>
                <div style={{'padding':'8px 0'}}>
                  <div className="tp-decl"><svg fill="#007fa9" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span>Klachtenregeling conform Wkkgz</span></div>
                  <div className="tp-decl"><svg fill="#007fa9" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span>Voldoet aan AVG-verplichtingen</span></div>
                  <div className="tp-decl"><svg fill="#007fa9" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span>Wtza-melding gedaan</span></div>
                  <div className="tp-decl"><svg fill="#007fa9" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span>Investeert in deskundigheidsbevordering</span></div>
                </div>
                <div className="tp-score">
                  <div><div className="tp-score-num">92%</div><div className="tp-score-label">Compliance score</div></div>
                  <div className="score-ring"><svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="none" stroke="#dbeafe" strokeWidth="3"/><circle cx="24" cy="24" r="20" fill="none" stroke="#007fa9" strokeWidth="3" strokeDasharray="115.5 125.66" strokeLinecap="round"/></svg><span className="score-ring-text">92%</span></div>
                </div>
                <div className="tp-footer"><span>Aangeboden door <a href="#">JouwZorgSite</a></span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      {/* ═══════════════════════════════════════════════════════════
           DBA URGENCY BANNER
           ═══════════════════════════════════════════════════════════ */}
      <div className="dba-banner">
        <div className="dba-inner">
          <span className="dba-pulse"></span>
          <div className="dba-text"><strong>DBA-handhaving is gestart</strong> — laat zien dat je zelfstandig opereert met een professionele website en keurmerk.<a href="#prijzen" onClick={(e) => { e.preventDefault(); onStart(); }}>Start vandaag →</a></div>
        </div>
      </div>
      
      
      {/* ═══════════════════════════════════════════════════════════
           PRICING
           ═══════════════════════════════════════════════════════════ */}
      <section className="pricing" id="prijzen">
        <div className="section-header reveal">
          <div className="section-label">Prijzen</div>
          <h2 className="section-title">Twee simpele abonnementen, geen verrassingen</h2>
          <p className="section-desc">Start met een subdomein of ga direct voor je eigen .nl domein. Beide met 14 dagen gratis proefperiode.</p>
        </div>
        <div className="pricing-grid stagger">
          <div className="price-card">
            <div className="price-tier">Starter</div>
            <div className="price-amount">€14,95<span>/maand</span></div>
            <div className="price-period">Gratis subdomein inbegrepen</div>
            <ul className="price-features">
              <li><span className="price-check" style={{'background':'var(--sage-light)'}}><svg viewBox="0 0 24 24" fill="none" stroke="#5a7c5a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>AI-gegenereerde website</li>
              <li><span className="price-check" style={{'background':'var(--sage-light)'}}><svg viewBox="0 0 24 24" fill="none" stroke="#5a7c5a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Subdomein (naam.jouwzorgsite.nl)</li>
              <li><span className="price-check" style={{'background':'var(--sage-light)'}}><svg viewBox="0 0 24 24" fill="none" stroke="#5a7c5a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Niet vindbaar in Google, wél deelbaar</li>
              <li><span className="price-check" style={{'background':'var(--sage-light)'}}><svg viewBox="0 0 24 24" fill="none" stroke="#5a7c5a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>5 templates, 20 paletten</li>
              <li><span className="price-check" style={{'background':'var(--sage-light)'}}><svg viewBox="0 0 24 24" fill="none" stroke="#5a7c5a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Visuele editor</li>
              <li><span className="price-check" style={{'background':'var(--sage-light)'}}><svg viewBox="0 0 24 24" fill="none" stroke="#5a7c5a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>SSL-beveiligd</li>
            </ul>
            <button className="price-btn" onClick={onStart}>14 dagen gratis proberen</button>
          </div>
          <div className="price-card featured">
            <div className="price-tier">Professional</div>
            <div className="price-amount">€19,95<span>/maand</span></div>
            <div className="price-period">Gratis eigen .nl domein inbegrepen</div>
            <ul className="price-features">
              <li><span className="price-check" style={{'background':'rgba(13,148,136,0.15)'}}><svg viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Alles uit Starter</li>
              <li><span className="price-check" style={{'background':'rgba(13,148,136,0.15)'}}><svg viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Eigen .nl domein inbegrepen</li>
              <li><span className="price-check" style={{'background':'rgba(13,148,136,0.15)'}}><svg viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Vindbaar in Google (SEO-geoptimaliseerd)</li>
              <li><span className="price-check" style={{'background':'rgba(13,148,136,0.15)'}}><svg viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Kwaliteitskeurmerk + BIG-verificatie</li>
              <li><span className="price-check" style={{'background':'rgba(13,148,136,0.15)'}}><svg viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Bezoekersstatistieken</li>
              <li><span className="price-check" style={{'background':'rgba(13,148,136,0.15)'}}><svg viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Contactformulier</li>
              <li><span className="price-check" style={{'background':'rgba(13,148,136,0.15)'}}><svg viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>DBA-tools (binnenkort)</li>
            </ul>
            <button className="price-btn" onClick={onStart}>14 dagen gratis proberen</button>
          </div>
        </div>
      </section>
      
      
      {/* ═══════════════════════════════════════════════════════════
           FAQ
           ═══════════════════════════════════════════════════════════ */}
      <section className="faq" id="faq">
        <div className="section-header reveal">
          <div className="section-label">Veelgestelde vragen</div>
          <h2 className="section-title">Alles wat je wilt weten</h2>
        </div>
        <div className="faq-list">
          <div className="faq-item">
            <div className="faq-q">
              Hoe snel heb ik mijn website online?
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
            <div className="faq-a"><p>Binnen 30 seconden. Je vult je naam en specialisatie in, kiest een template, en de AI genereert direct alle teksten en het design. Je kunt daarna alles nog aanpassen via de visuele editor.</p></div>
          </div>
          <div className="faq-item">
            <div className="faq-q">
              Heb ik technische kennis nodig?
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
            <div className="faq-a"><p>Nee, absoluut niet. Als je een e-mail kunt versturen, kun je ook een website maken met JouwZorgSite. De editor werkt met klikken en typen — geen code, geen moeilijke instellingen.</p></div>
          </div>
          <div className="faq-item">
            <div className="faq-q">
              Wat is het kwaliteitskeurmerk precies?
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
            <div className="faq-a"><p>Een badge op je website die laat zien dat je BIG-registratie is geverifieerd, je bij de KvK staat ingeschreven, en je voldoet aan 9 professionele normen (zoals Wtza, Wkkgz, AVG). Vergelijk het met WebwinkelKeur, maar dan voor zorgprofessionals.</p></div>
          </div>
          <div className="faq-item">
            <div className="faq-q">
              Helpt dit echt tegen DBA-risico's?
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
            <div className="faq-a"><p>Een eigen professionele website is één van de criteria die de Belastingdienst bekijkt om te beoordelen of je echt zelfstandig bent. Het is geen garantie, maar het versterkt je positie aanzienlijk — zeker in combinatie met het kwaliteitskeurmerk dat je professionaliteit aantoont.</p></div>
          </div>
          <div className="faq-item">
            <div className="faq-q">
              Kan ik mijn eigen domein koppelen?
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
            <div className="faq-a"><p>Ja! Je kunt een nieuw .nl domein direct registreren via je dashboard (gratis bij het Pro-abonnement), of een bestaand domein koppelen met onze DNS-instructies.</p></div>
          </div>
          <div className="faq-item">
            <div className="faq-q">
              Kan ik het gratis uitproberen?
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
            <div className="faq-a"><p>Ja, je kunt gratis een website maken met een subdomein (naam.jouwzorgsite.nl). Geen creditcard nodig. Wil je een eigen domein en het kwaliteitskeurmerk? Dan upgrade je naar het Pro-abonnement met 14 dagen gratis proefperiode.</p></div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <a href="/faq" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '15px',
            fontWeight: 600,
            color: '#5a7c6f',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}>
            Bekijk alle vragen
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
           CONTACT FORM
           ═══════════════════════════════════════════════════════════ */}
      <section className="contact-section" id="contact">
        <div className="contact-inner">
          <div className="contact-info reveal">
            <div className="section-label" style={{'textAlign':'left'}}>Contact</div>
            <h2 className="section-title" style={{'textAlign':'left','fontSize':'38px'}}>Vragen? Neem contact op</h2>
            <p style={{'fontSize':'16px','lineHeight':'1.65','color':'var(--stone-500)','marginBottom':'36px'}}>
              Heb je een vraag over JouwZorgSite, wil je een demo of heb je hulp nodig bij het opzetten van je website? We helpen je graag.
            </p>
            <div className="contact-details">
              <div className="contact-detail">
                <div className="contact-detail-icon" style={{'background':'var(--teal-50)','color':'var(--teal-600)'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <div className="contact-detail-label">E-mail</div>
                  <a href="mailto:support@jouwzorgsite.nl" className="contact-detail-value">support@jouwzorgsite.nl</a>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon" style={{'background':'#ede9fe','color':'#7c3aed'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <div className="contact-detail-label">Reactietijd</div>
                  <div className="contact-detail-value">Binnen 24 uur</div>
                </div>
              </div>
            </div>
          </div>
          <form className="contact-form reveal" onSubmit={(e) => { e.preventDefault(); const form = e.currentTarget; const success = form.querySelector('.form-success') as HTMLElement; const fields = form.querySelector('.form-fields') as HTMLElement; if (success) success.style.display = 'flex'; if (fields) fields.style.display = 'none'; }}>
            <div className="form-fields">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Naam</label>
                  <input type="text" className="form-input" placeholder="Je volledige naam" required />
                </div>
                <div className="form-group">
                  <label className="form-label">E-mailadres</label>
                  <input type="email" className="form-input" placeholder="naam@voorbeeld.nl" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Onderwerp</label>
                <select className="form-input form-select">
                  <option value="">Kies een onderwerp</option>
                  <option>Vraag over JouwZorgSite</option>
                  <option>Hulp bij mijn website</option>
                  <option>Ik wil een demo</option>
                  <option>Samenwerking / partnerschap</option>
                  <option>Anders</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Bericht</label>
                <textarea className="form-input form-textarea" placeholder="Waar kunnen we je mee helpen?" rows={5} required></textarea>
              </div>
              <button type="submit" className="form-submit">
                Verstuur bericht
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
            <div className="form-success" style={{display:'none'}}>
              <div className="form-success-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div className="form-success-title">Bericht verstuurd!</div>
              <div className="form-success-desc">Bedankt voor je bericht. We reageren binnen 24 uur.</div>
            </div>
          </form>
        </div>
      </section>
      
      
      {/* ═══════════════════════════════════════════════════════════
           FINAL CTA
           ═══════════════════════════════════════════════════════════ */}
      <section className="cta-section">
        <div className="cta-content reveal">
          <h2>Klaar om gevonden te worden?</h2>
          <p>Maak vandaag nog je professionele zorgwebsite. Gratis uitproberen, geen creditcard nodig.</p>
          <div className="cta-actions">
            <button className="btn-cta-primary" onClick={onStart}>
              Start gratis — klaar in 30 seconden
            </button>
          </div>
          <div className="cta-note">Geen creditcard nodig · Direct online · Op elk moment opzegbaar</div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════
           FOOTER
           ═══════════════════════════════════════════════════════════ */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo.png" alt="JouwZorgSite" style={{ height: '28px' }} />
            </div>
            <p className="footer-tagline">De enige website-builder speciaal voor zelfstandige zorgprofessionals in Nederland. AI-gegenereerd, zorgspecifiek, met ingebouwd kwaliteitskeurmerk.</p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <a href="#features">Voordelen</a>
            <a href="#templates">Templates</a>
            <a href="#keurmerk">Kwaliteitskeurmerk</a>
            <a href="#prijzen">Prijzen</a>
          </div>
          <div className="footer-col">
            <h4>Beroepen</h4>
            <a href="#beroepen">Verpleegkundige</a>
            <a href="#beroepen">Verzorgende IG</a>
            <a href="#beroepen">Kraamverzorgende</a>
            <a href="#beroepen">Thuiszorg</a>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <a href="/faq">Veelgestelde vragen</a>
            <a href="mailto:support@jouwzorgsite.nl">Contact</a>
            <a href="mailto:support@jouwzorgsite.nl">Hulp nodig?</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 JouwZorgSite. Alle rechten voorbehouden.</span>
          <div className="footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Voorwaarden</a>
            <a href="#">AVG</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
