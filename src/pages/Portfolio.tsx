
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { db } from '../data/db'
import type { Project, Certificate, Skill } from '../data/db'

function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  const [certIndex, setCertIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const navigate = useNavigate()

  // Dynamic States
  const [projects, setProjects] = useState<Project[]>([])
  const [certs, setCerts] = useState<Certificate[]>([])
  const [skills, setSkills] = useState<Skill[]>([])


  useEffect(() => {
    const fetchData = async () => {
      const p = await db.getPinnedProjects();
      const c = await db.getCerts();
      const s = await db.getSkills();
      setProjects(p);
      setCerts(c);
      setSkills(s);
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [])

  const handleCertChange = (newIndex: number) => {
    if (isFading || certs.length === 0) return;
    setIsFading(true);
    setTimeout(() => {
      setCertIndex(newIndex);
    }, 400); // wait for CSS fade-out animation
  }

  const nextCert = () => handleCertChange((certIndex + 1) % certs.length)
  const prevCert = () => handleCertChange((certIndex - 1 + certs.length) % certs.length)

  const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const isPdfUrl = (url?: string) => !!url && url.toLowerCase().includes('.pdf')
  const isCloudinaryUrl = (url?: string) => !!url && url.includes('res.cloudinary.com')

  const getMobilePdfPreviewSrc = (url?: string) => {
    if (!url || !isPdfUrl(url) || !isCloudinaryUrl(url)) return ''
    return url.replace('/upload/', '/upload/pg_1,f_auto,q_auto,w_1400/')
  }

  // Helper to ensure PDFs display on mobile without downloading
  const getCertSrc = (url: string | undefined) => {
    if (!url) return '';
    const isPdf = isPdfUrl(url)

    if (isPdf && isMobileDevice) {
      return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true&chrome=false`;
    }
    return `${url}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`;
  };

  const activeCert = certs[certIndex]
  const activeCertUrl = activeCert?.file_url
  const activeCertLink = activeCert?.link_url || activeCert?.file_url
  const showMobilePdfPreview = isMobileDevice && isPdfUrl(activeCertUrl)
  const mobilePdfPreviewSrc = getMobilePdfPreviewSrc(activeCertUrl)

  useEffect(() => {
    if (showMobilePdfPreview && !mobilePdfPreviewSrc && isFading) {
      const timer = setTimeout(() => setIsFading(false), 150)
      return () => clearTimeout(timer)
    }
  }, [showMobilePdfPreview, mobilePdfPreviewSrc, isFading])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, sectionId: string) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <>
      {/* ── HEADER ── */}
      <header className={isScrolled ? 'scrolled' : ''}>
        <div className="header-content">
          <div className="logo">
            <img
              src={theme === 'light' ? '/images/logo_light.png' : '/images/default_logo.png'}
              alt="Logo"
              className="logo-image"
              style={{ height: '40px' }}
            />
          </div>

          <nav className="desktop-nav">
            <a href="#home" onClick={(e) => scrollToSection(e, 'home')}>Home</a>
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')}>About</a>
            <a href="/projects" onClick={(e) => { e.preventDefault(); navigate('/projects'); }}>Projects</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
          </nav>

          <div className="nav-actions">
            <a href="https://github.com/Nahiwagaan" target="_blank" rel="noreferrer" className="nav-icon" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" /></svg>
            </a>
            <a href="https://www.linkedin.com/in/jet-padilla-b19b68327/" target="_blank" rel="noreferrer" className="nav-icon" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
            </a>
            <button onClick={toggleTheme} className="nav-icon theme-toggle" aria-label="Toggle Theme">
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
              )}
            </button>
            <button
              className="hamburger"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={menuOpen ? 'bar open' : 'bar'}></span>
              <span className={menuOpen ? 'bar open' : 'bar'}></span>
              <span className={menuOpen ? 'bar open' : 'bar'}></span>
            </button>
          </div>
        </div>

        <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
          <a href="/" onClick={(e) => { e.preventDefault(); scrollToSection(e, 'home'); }}>Home</a>
          <a href="/" onClick={(e) => { e.preventDefault(); scrollToSection(e, 'services'); }}>About</a>
          <a href="/projects" onClick={(e) => { e.preventDefault(); navigate('/projects'); setMenuOpen(false); }}>Projects</a>
          <a href="/" onClick={(e) => { e.preventDefault(); scrollToSection(e, 'contact'); }}>Contact</a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="home" className="hero-section">
        <div className="hero-inner">
          <div className="hero-left">
            <p className="hero-greeting">I'm</p>
            <h1 className="hero-name">Jet <span className="hero-name-alt">Padilla</span></h1>
            <p className="hero-role">Software Developer · Frontend Developer · AI Enthusiast</p>
            <div className="hero-underline"></div>
            <p className="hero-desc">
              Designing intuitive web experiences and bringing ideas to life
              through clean interfaces   powered by AI, driven by craft.
            </p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={(e) => scrollToSection(e as any, 'contact')}>Let's Connect!</button>
              <a href="/Jet Padilla Resume.pdf" className="btn-ghost" download>Download CV</a>
            </div>

            <div className="hero-skills-inline">
              <p className="skills-inline-label">Tech Stack</p>
              <div className="hero-skills-wrapper">
                <div className="hero-skills-track">
                  {skills.length > 0 ? [...skills, ...skills].map((s, i) => (
                    <div className="hero-skill-item" key={i}>
                      <img
                        src={s.icon?.startsWith('http') ? s.icon : `/images/${s.icon === 'javascript' ? 'javascript.svg' : s.icon === 'figma' ? 'figma.webp' : s.icon === 'html' ? 'html.jpg' : `${s.icon}.png`}`}
                        alt={s.name}
                      />
                      <span>{s.name.toUpperCase()}</span>
                    </div>
                  )) : (
                    <p>Loading skills...</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="hero-photo-wrap">
            <img src="/images/Untitled.png" alt="Jet Padilla" className="hero-photo" />
          </div>

          <div className="hero-right">
            <p className="services-label">Services</p>
            <h2 className="services-heading">Let's turn your ideas into polished, functional products.</h2>
            <a href="#projects" className="services-link" onClick={(e) => scrollToSection(e as any, 'projects')}>
              show more <span className="services-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </span>
            </a>
            <div className="social-icons">
              <a href="https://www.facebook.com/jetpadilla/" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-icon fb">f</a>
              <a href="https://x.com/Jettty1" target="_blank" rel="noreferrer" aria-label="Twitter" className="social-icon tw">𝕏</a>
              <a href="https://www.instagram.com/superjetpad/" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon ig"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg></a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT CAN I DO ── */}
      <section id="services" className="services-section">
        <div className="services-wrapper redesigned">
          <div className="services-top-row">
            <div className="services-text-left">
              <h2 className="services-big-title">How I Can Help You<br />With My Services</h2>
              <p className="services-desc">
                I turn ideas into real, functional products from design to
                deployment. Every project is built with intention, precision,
                and a commitment to quality.
              </p>
            </div>
            <div className="service-cards-stack">
              <a href="#projects" className="service-card" onClick={(e) => scrollToSection(e as any, 'projects')}>
                <img src="/images/uiux.jfif" alt="UI/UX Design" className="service-thumb" />
                <div className="service-info">
                  <h3>UI/UX Design</h3>
                </div>
                <span className="service-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </span>
              </a>
              <a href="#projects" className="service-card" onClick={(e) => scrollToSection(e as any, 'projects')}>
                <img src="/images/frontend.jfif" alt="Front End Develop" className="service-thumb" />
                <div className="service-info">
                  <h3>Front End Development</h3>
                </div>
                <span className="service-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </span>
              </a>
              <a href="#projects" className="service-card" onClick={(e) => scrollToSection(e as any, 'projects')}>
                <img src="/images/mobile.jfif" alt="Mobile App Develop" className="service-thumb" />
                <div className="service-info">
                  <h3>Mobile App Development</h3>
                </div>
                <span className="service-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </span>
              </a>
            </div>
          </div>

          <div className="carousel-section-header">
            <div className="section-label">CERTIFICATIONS</div>
          </div>
          <div className="carousel-container">
            <div className="cert-preview-large centered">
              <div className="cert-viewer-box">
                {certs.length > 0 ? (
                  showMobilePdfPreview ? (
                    <a href={activeCertLink} target="_blank" rel="noreferrer" className={`cert-mobile-preview-link ${isFading ? 'fading-out' : 'fading-in'}`}>
                      {mobilePdfPreviewSrc ? (
                        <img
                          src={mobilePdfPreviewSrc}
                          className="cert-mobile-preview"
                          alt={`Certificate ${certIndex + 1}`}
                          onLoad={() => {
                            setTimeout(() => setIsFading(false), 150)
                          }}
                        />
                      ) : (
                        <span className="cert-mobile-preview-fallback">Open certificate</span>
                      )}
                    </a>
                  ) : (
                    <iframe
                      src={getCertSrc(activeCertUrl)}
                      className={`cert-pdf-iframe ${isFading ? 'fading-out' : 'fading-in'}`}
                      title={`Certificate ${certIndex + 1}`}
                      onLoad={() => {
                        setTimeout(() => setIsFading(false), 150);
                      }}
                      scrolling="no"
                    />
                  )
                ) : (
                  <div className="no-certs">No certificates added yet.</div>
                )}
                {activeCertLink && !showMobilePdfPreview && (
                  <a href={activeCertLink} target="_blank" rel="noreferrer" className="cert-link-overlay" aria-label={`Open certificate ${certIndex + 1}`} />
                )}
              </div>

              <div className="carousel-controls-bottom">
                <button onClick={prevCert} className="carousel-side-btn prev" aria-label="Previous Cert">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>

                <div className="carousel-pagination">
                  {certs.map((_, idx) => (
                    <button
                      key={idx}
                      className={`pagination-dot ${idx === certIndex ? 'active' : ''}`}
                      onClick={() => handleCertChange(idx)}
                      aria-label={`Go to certificate ${idx + 1}`}
                    />
                  ))}
                </div>

                <button onClick={nextCert} className="carousel-side-btn next" aria-label="Next Cert">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PINNED PROJECTS ── */}
      <section id="projects">
        <h2>Projects</h2>
        <p>A collection of my work showcasing skills in web development and applications</p>
        <div className="projects-container">
          {projects.length === 0 ? (
            <p style={{ textAlign: 'center', opacity: 0.6, gridColumn: '1 / -1' }}>No pinned projects yet. Pin projects in the Admin Panel.</p>
          ) : projects.map((p) => (
            <a href={p.link_url || '#'} target={p.link_url ? '_blank' : undefined} rel="noreferrer" className="project-card-link" key={p.id}>
              <div className="project-card">
                <div className={`status-badge status-${p.status}`}>{p.status.charAt(0).toUpperCase() + p.status.slice(1)}</div>
                <img src={p.image_url || "/images/unnamed.jpg"} alt={p.title} className="project-image" />
                <div className="project-content">
                  <div className="project-header">
                    <h3>{p.title}</h3>
                    <span className="project-year">{p.year}</span>
                  </div>
                  {p.tech_stack && p.tech_stack.length > 0 && (
                    <div className="project-tech-stack">
                      {p.tech_stack.map((icon, idx) => (
                        <img key={idx} src={icon} alt="Tech" className="tech-icon-small" title="Tech Stack" />
                      ))}
                    </div>
                  )}
                  <p className="project-description">{p.desc_text}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button className="btn-primary" onClick={() => navigate('/projects')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            View All Projects
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </section>

      {/* ── WORKFLOW ── */}
      <section id="workflow">
        <h2>My Process</h2>
        <p>A structured approach to bring your ideas to life</p>
        <div className="workflow-container">
          {[
            { icon: '/images/explore.png', num: '1', title: 'Explore', desc: "We begin by understanding your project's objectives and specific needs." },
            { icon: '/images/plan.png', num: '2', title: 'Plan', desc: "I outline the app's framework and user journey to build a strong base." },
            { icon: '/images/build.png', num: '3', title: 'Build', desc: 'The design is transformed into functional, clean, and scalable code.' },
            { icon: '/images/launch.png', num: '4', title: 'Launch', desc: 'Your project goes live, ready to reach and engage its audience.' },
          ].map((w) => (
            <div className="workflow-step" key={w.title}>
              <div className="step-number">{w.num}</div>
              <div className="step-icon"><img src={w.icon} alt={w.title} className="workflow-icon-img" /></div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <h2>Get In Touch</h2>
          <p>Have a project in mind? Let's work together and make it happen.</p>


          <div className="contact-form-card">
            <form className="contact-form-main" onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const data = Object.fromEntries(formData.entries());

              // Honeypot check: If the hidden field is filled, it's a bot.
              if (data.hp_phone) {
                console.warn('Spam detected via honeypot.');
                (e.target as HTMLFormElement).reset();
                alert('Message sent successfully!'); // Fake success to deter bots from trying again
                return;
              }

              try {
                await db.addMessage({
                  name: data.name as string,
                  email: data.email as string,
                  content: data.message as string
                });
                alert('Message sent successfully!');
                (e.target as HTMLFormElement).reset();
              } catch (error) {
                alert('Error sending message. Please try again.');
                console.error(error);
              }
            }}>
              {/* HONEYPOT FIELD (Hidden from humans) */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input type="text" name="hp_phone" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="form-group-inline">
                <div className="input-wrap">
                  <label>Your Name</label>
                  <input type="text" name="name" placeholder="John Doe" required />
                </div>
                <div className="input-wrap">
                  <label>Your Email</label>
                  <input type="email" name="email" placeholder="john@example.com" required />
                </div>
              </div>
              <div className="input-wrap">
                <label>Project Intent</label>
                <textarea name="message" placeholder="Briefly describe your vision..." rows={5} required></textarea>
              </div>
              <button type="submit" className="btn-transmission">Submit</button>
            </form>
          </div>

          <div className="contact-links" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jetpadilla07@gmail.com&su=Project Intent" target="_blank" rel="noreferrer" className="contact-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
              </svg>
              Email Me
            </a>
            <a href="https://www.linkedin.com/in/jet-padilla-b19b68327/" target="_blank" rel="noreferrer" className="contact-btn ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <p>© {new Date().getFullYear()} Jet Padilla. All Rights Reserved.</p>
      </footer>
    </>
  )
}

export default Portfolio;
