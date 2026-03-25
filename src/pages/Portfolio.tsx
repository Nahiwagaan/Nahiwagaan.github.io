
import { useEffect, useState } from 'react'
import '../App.css'
import { db } from '../data/db'
import type { Project, Certificate, Skill } from '../data/db'

function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  const [certIndex, setCertIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)

  // Dynamic States
  const [projects, setProjects] = useState<Project[]>([])
  const [certs, setCerts] = useState<Certificate[]>([])
  const [skills, setSkills] = useState<Skill[]>([])


  useEffect(() => {
    const fetchData = async () => {
      const p = await db.getProjects();
      const c = await db.getCerts();
      const s = await db.getSkills();
      setProjects(p);
      setCerts(c);
      setSkills(s);
    };
    fetchData();
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
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')}>Projects</a>
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
          <a href="#home" onClick={(e) => scrollToSection(e, 'home')}>Home</a>
          <a href="#services" onClick={(e) => scrollToSection(e, 'services')}>About</a>
          <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')}>Projects</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="home" className="hero-section">
        <div className="hero-inner">
          <div className="hero-left">
            <p className="hero-greeting">I'm</p>
            <h1 className="hero-name">Jet <span className="hero-name-alt">Padilla</span></h1>
            <div className="hero-underline"></div>
            <p className="hero-desc">
              An aspiring web developer who provides services for digital programming
              and design content needs, for all businesses with more than 4 years of experience.
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
                      <img src={`/images/${s.icon === 'javascript' ? 'javascript.svg' : s.icon === 'figma' ? 'figma.webp' : s.icon === 'html' ? 'html.jpg' : `${s.icon}.png`}`} alt={s.name} />
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
            <h2 className="services-heading">Let's build quality products in programming and design with my services</h2>
            <a href="#projects" className="services-link" onClick={(e) => scrollToSection(e as any, 'projects')}>
              show more <span className="services-arrow">→</span>
            </a>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-icon fb">f</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="social-icon tw">𝕏</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon ig">◉</a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest" className="social-icon pi">P</a>
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
                It is easier to entrust the work to the experts because they are able to provide
                the best results with reliable quality.
              </p>
            </div>
            <div className="service-cards-stack">
              <a href="#projects" className="service-card" onClick={(e) => scrollToSection(e as any, 'projects')}>
                <img src="/images/uiux.jfif" alt="UI/UX Design" className="service-thumb" />
                <div className="service-info">
                  <h3>UI/UX Design</h3>
                  <p>7 Projects</p>
                </div>
                <span className="service-arrow">→</span>
              </a>
              <a href="#projects" className="service-card" onClick={(e) => scrollToSection(e as any, 'projects')}>
                <img src="/images/frontend.jfif" alt="Front End Develop" className="service-thumb" />
                <div className="service-info">
                  <h3>Front End Development</h3>
                  <p>4 Projects</p>
                </div>
                <span className="service-arrow">→</span>
              </a>
              <a href="#projects" className="service-card" onClick={(e) => scrollToSection(e as any, 'projects')}>
                <img src="/images/mobile.jfif" alt="Mobile App Develop" className="service-thumb" />
                <div className="service-info">
                  <h3>Mobile App Development</h3>
                  <p>2 Projects</p>
                </div>
                <span className="service-arrow">→</span>
              </a>
            </div>
          </div>

          <div className="carousel-section-header">
            <div className="section-label">CERTIFICATIONS</div>
          </div>
          <div className="carousel-main-row">
            <button onClick={prevCert} className="carousel-side-btn prev" aria-label="Previous Cert">←</button>

            <div className="cert-preview-large centered">
              <div className="cert-viewer-box">
                {certs.length > 0 ? (
                  <iframe
                    src={`${certs[certIndex]?.file_url}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                    className={`cert-pdf-iframe ${isFading ? 'fading-out' : 'fading-in'}`}
                    title={certs[certIndex]?.title}
                    onLoad={() => {
                      setTimeout(() => setIsFading(false), 150);
                    }}
                    scrolling="no"
                  />
                ) : (
                  <div className="no-certs">No certificates added yet.</div>
                )}
              </div>

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
            </div>

            <button onClick={nextCert} className="carousel-side-btn next" aria-label="Next Cert">→</button>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects">
        <h2>My Projects</h2>
        <p>A collection of my work showcasing skills in web development and applications</p>
        <div className="projects-container">
          {projects.map((p) => (
            <div className="project-card" key={p.id}>
              <div className={`status-badge status-${p.status}`}>{p.status.charAt(0).toUpperCase() + p.status.slice(1)}</div>
              <img src={p.image_url || "/images/unnamed.jpg"} alt={p.title} className="project-image" />
              <div className="project-content">
                <div className="project-header">
                  <h3>{p.title}</h3>
                  <span className="project-year">{p.year}</span>
                </div>
                <p className="project-description">{p.desc_text}</p>
              </div>
            </div>
          ))}
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
          

          <form className="contact-form-main" onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData.entries());
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
            <div className="form-group-inline">
              <input type="text" name="name" placeholder="Name" required />
              <input type="email" name="email" placeholder="Email" required />
            </div>
            <textarea name="message" placeholder="Your Message" rows={4} required></textarea>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>

          <div className="contact-links" style={{marginTop: '2rem'}}>
            <a href="mailto:jetpadilla@email.com" className="contact-btn">Send Email Directly</a>
            <a href="https://www.linkedin.com/in/jet-padilla-b19b68327/" target="_blank" rel="noreferrer" className="contact-btn ghost">LinkedIn</a>
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
