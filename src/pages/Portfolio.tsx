
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { db } from '../data/db'
import type { Project, Certificate, Skill } from '../data/db'

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  const [certIndex, setCertIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [localTime, setLocalTime] = useState('')
  const [activeSection, setActiveSection] = useState('services')
  const navigate = useNavigate()

  const [projects, setProjects] = useState<Project[]>([])
  const [allProjectsCount, setAllProjectsCount] = useState(0)
  const [certs, setCerts] = useState<Certificate[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [copied, setCopied] = useState(false)


  // Live local time
  useEffect(() => {
    const updateTime = () => {
      setLocalTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Manila',
      }))
    }
    updateTime()
    const timer = setInterval(updateTime, 30000)
    return () => clearInterval(timer)
  }, [])

  // Active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )
    const sections = document.querySelectorAll('section[id]')
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const [allP, c, s] = await Promise.all([db.getProjects(), db.getCerts(), db.getSkills()])
      setProjects(allP.filter(p => p.pinned))
      setAllProjectsCount(allP.length)
      setCerts(c)
      setSkills(s)
    }
    fetchData()
    window.scrollTo(0, 0)
  }, [])

  const handleCertChange = (newIndex: number) => {
    if (isFading || certs.length === 0) return
    setIsFading(true)
    setTimeout(() => { setCertIndex(newIndex) }, 400)
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

  const getCertSrc = (url: string | undefined) => {
    if (!url) return ''
    const absoluteUrl = url.startsWith('/') ? `${window.location.origin}${url}` : url
    if (isPdfUrl(url) && isMobileDevice) {
      return `https://docs.google.com/gview?url=${encodeURIComponent(absoluteUrl)}&embedded=true&chrome=false`
    }
    return `${url}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`
  }

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

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const navSections = [
    { id: 'services', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Stack' },
    { id: 'certifications', label: 'Certifications' },
  ]


  const skillCategories = [
    { title: 'Frontend Development', desc: 'Responsive, accessible UIs focused on performance.', keywords: ['frontend', 'ui', 'ux', 'javascript', 'react', 'html', 'css', 'tailwind', 'typescript', 'nextjs', 'figma'] },
    { title: 'Backend Development', desc: 'API design and server-side logic with clean architecture.', keywords: ['backend', 'node', 'python', 'api', 'express', 'auth', 'java', 'c#', 'php'] },
    { title: 'Database & Infra', desc: 'Schema design, query optimization, and cloud deployment.', keywords: ['database', 'infra', 'sql', 'mysql', 'postgres', 'docker', 'aws', 'deploy', 'supabase', 'mongodb', 'firebase', 'vercel', 'sqlite'] },
    { title: 'AI Tools & Automation', desc: 'Integrating intelligent models and automated agents.', keywords: ['ai', 'artificial intelligence', 'ml', 'machine learning', 'openai', 'gemini', 'claude', 'langchain', 'n8n', 'automation', 'agent', 'bot', 'llm', 'nlp'] },
    { title: 'Tools & Others', desc: 'Essential development utilities for various workflows.', keywords: ['git', 'github', 'cloudinary', 'tiled', 'unity', 'photoshop', 'illustrator', 'premiere', 'slack', 'notion'] },
  ]

  return (
    <div className="page-layout">

      {/* ── LEFT NAV SIDEBAR ── */}
      <aside className={`left-nav-sidebar ${menuOpen ? 'lnav-open' : ''}`}>

        {/* Logo / Name */}
        <div
          className="lnav-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ cursor: 'pointer' }}
        >
          <img
            src={theme === 'light' ? '/images/logo_light.png' : '/images/default_logo.png'}
            alt="Logo"
            className="lnav-logo-img"
          />
          <span className="lnav-name">Jet P.</span>
        </div>

        {/* External Links */}
        <div className="lnav-group">
          <a href="https://github.com/Nahiwagaan" target="_blank" rel="noreferrer" className="lnav-link">
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" /></svg>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/jet-padilla-b19b68327/" target="_blank" rel="noreferrer" className="lnav-link">
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
            LinkedIn
          </a>
          <a href="https://drive.google.com/file/d/1o8zZvsyKBCiIu4I1LBLZrnk1nvZW9lv6/view?usp=sharing" target="_blank" rel="noreferrer" className="lnav-link">
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" /></svg>
            Resume
          </a>
          <a href="/projects" onClick={(e) => { e.preventDefault(); navigate('/projects') }} className="lnav-link">
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" /></svg>
            All Projects
          </a>
        </div>

        <div className="lnav-divider" />

        {/* Section Navigation */}
        <div className="lnav-group">
          {navSections.map(s => (
            <button
              key={s.id}
              className={`lnav-section-link ${activeSection === s.id ? 'lnav-active' : ''}`}
              onClick={() => scrollTo(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Bottom utility */}
        <div className="lnav-bottom">
          <div className="lnav-avail">
            <span className="lnav-avail-dot" />
            <span>Open to Work</span>
          </div>

          <div className="lnav-controls">
            <button onClick={toggleTheme} className="lnav-control-btn" aria-label="Toggle theme" title="Toggle theme">
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" /></svg>
              )}
            </button>
            <a href="https://github.com/Nahiwagaan" target="_blank" rel="noreferrer" className="lnav-control-btn" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" /></svg>
            </a>
          </div>

          <div className="lnav-contact-label">For work, collabs &amp; everything else, reach me at</div>
          <a href="mailto:jetpadilla07@gmail.com" className="lnav-email">jetpadilla07@gmail.com</a>
        </div>
      </aside>

      {/* Mobile Hamburger */}
      <button
        className={`lnav-hamburger ${menuOpen ? 'lnav-hamburger-open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
      {menuOpen && <div className="lnav-overlay" onClick={() => setMenuOpen(false)} />}

      {/* ── MAIN CONTENT WRAPPER ── */}
      <div className="main-content-wrapper">
        <main className="main-content-area">

          {/* PROFILE HEADER */}
          <div className="profile-header-card">
            <div className="profile-left">
              <div className="profile-photo-container">
                <img src="/images/Untitled.png" alt="Jet Padilla" className="profile-photo-upwork" />
                <span className="profile-online-dot" title="Available" />
              </div>
              <div className="profile-identity">
                <h1 className="profile-name">
                  Jet <span className="profile-lastname">Padilla</span>
                </h1>
                <p className="profile-role-text">Junior Software Developer · Frontend Developer · Aspiring AI Engineer</p>
                <p className="profile-location-text">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" style={{ verticalAlign: 'middle', marginRight: '4px' }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                  Bulacan, Philippines{localTime ? ` · ${localTime} local time` : ''}
                </p>
              </div>
            </div>

          </div>

          {/* ABOUT */}
          <section id="services" className="content-section">
            <h2 className="content-section-title">About</h2>
            <p className="about-bio-text">
              Fresh Computer Science graduate targeting a Junior Software Developer role. Experienced in full-stack web development, mobile app development, and UI/UX design. Proficient in React, JavaScript, Python, REST APIs, and AI-assisted development tools. Proven ability to lead teams, ship production-ready applications, and deliver clean, user-friendly interfaces with a focus on performance and accessibility.
            </p>
            <div className="about-services-grid">
              <div className="about-service-item">
                <span className="about-service-icon">
                  <svg viewBox="0 0 24 24" fill="none" width="20" height="20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                  </svg>
                </span>
                <div>
                  <h4>UI/UX Design</h4>
                  <p>Crafting clean, intuitive interfaces from Figma prototypes to polished, accessible code.</p>
                </div>
              </div>
              <div className="about-service-item">
                <span className="about-service-icon">
                  <svg viewBox="0 0 24 24" fill="none" width="20" height="20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                  </svg>
                </span>
                <div>
                  <h4>Web Development</h4>
                  <p>Building responsive, performant web apps with React, TypeScript, Node.js and more.</p>
                </div>
              </div>
              <div className="about-service-item">
                <span className="about-service-icon">
                  <svg viewBox="0 0 24 24" fill="none" width="20" height="20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
                  </svg>
                </span>
                <div>
                  <h4>Mobile Apps</h4>
                  <p>Cross-platform mobile development with Flutter and React Native (Expo).</p>
                </div>
              </div>
            </div>
          </section>

          {/* PORTFOLIO */}
          <section id="projects" className="content-section">
            <div className="content-section-header-row">
              <h2 className="content-section-title">Projects</h2>
              {allProjectsCount > 9 && (
                <button className="btn-ghost view-all-btn" onClick={() => navigate('/projects')}>View All</button>
              )}
            </div>
            <div className="upwork-portfolio-grid">
              {projects.length === 0 ? (
                <p style={{ opacity: 0.6 }}>No projects yet.</p>
              ) : projects.map((p) => {
                const inner = (
                  <div className="upwork-portfolio-item-inner">
                    <div className="upwork-thumbnail">
                      <img src={p.image_url || '/images/default_logo.png'} alt="" className="upwork-main-img" />
                      <div className={`upwork-status-badge status-${p.status}`}>
                        {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                      </div>
                    </div>
                    <p className="upwork-thumbnail-title">{p.title}</p>
                    <p className="upwork-thumbnail-year">{p.year}</p>
                  </div>
                )
                return (
                  <div
                    key={p.id}
                    className="upwork-portfolio-item"
                    onClick={() => setSelectedProject(p)}
                  >
                    {inner}
                  </div>
                )
              })}
            </div>
          </section>

          {/* EXPERIENCE */}
          <section id="experience" className="content-section">
            <h2 className="content-section-title">Experience</h2>
            <div className="experience-grid">
              <div className="experience-card">
                <div className="experience-label">WORK EXPERIENCE</div>
                <h3 className="experience-title">Web Developer / Head Marketing (OJT)</h3>
                <p className="experience-details">Bulacan, Philippines | April 2025 - June 2025</p>
                <ul className="experience-bullets">
                  <li>Designed and developed dual-portal front-end for EASTS Enrollment System serving 30+ users, implementing student registration, class scheduling, and academic record tracking interfaces using Figma prototypes as design foundation.</li>
                  <li>Delivered accessible, user-friendly web interfaces across administrator and student portals, applying UX principles to streamline course enrollment and profile management workflows for a 8-person cross-functional team.</li>
                  <li>Supported digital marketing operations by managing social media scheduling, editing video content, and producing branded materials.</li>
                </ul>
              </div>
              <div className="experience-card">
                <div className="experience-label">THESIS PROJECT</div>
                <h3 className="experience-title">Code Mania</h3>
                <p className="experience-role">Role: Frontend Engineer / Project Lead</p>
                <p className="experience-details">Interactive Learning Platform | September 2024 - June 2026</p>
                <ul className="experience-bullets">
                  <li>Led frontend development and UI/UX design as project lead for a gamified coding education platform supporting Python, JavaScript, and C++ challenges.</li>
                  <li>Managed a 5-person team via GitHub Issues, assigning tickets and tracking tasks to deliver a fully responsive interface with progress tracking across administrator and student-facing features.</li>
                  <li>Deployed to classmates and students as test users, incorporating feedback to refine UX and optimize the learning journey.</li>
                </ul>
              </div>
            </div>
          </section>


          {/* SKILLS */}
          <section id="skills" className="content-section">
            <h2 className="content-section-title">Stack</h2>
            <div className="skills-categories-grid">
              {skillCategories.map((cat, idx) => {
                const matchedSkills = skills.filter(s => {
                  if (s.category && s.category.toLowerCase() === cat.title.toLowerCase()) return true
                  return cat.keywords.some(kw => {
                    const name = s.name?.toLowerCase() || ''
                    const category = s.category?.toLowerCase() || ''
                    if (kw.length <= 2) { const regex = new RegExp(`\\b${kw}\\b`, 'i'); return regex.test(name) || regex.test(category) }
                    return name.includes(kw) || category.includes(kw)
                  })
                })
                return (
                  <div className="skill-category-card" key={idx}>
                    <h3 className="category-title">{cat.title}</h3>
                    <p className="category-desc">{cat.desc}</p>
                    <div className="category-tags">
                      {matchedSkills.length > 0 ? matchedSkills.map(s => (
                        <span className="skill-tag" key={s.id}>
                          <img src={s.icon?.startsWith('http') ? s.icon : `/images/${s.icon}.png`} alt={s.name} className="tag-icon" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                          {s.name}
                        </span>
                      )) : cat.keywords.slice(0, 4).map(kw => (
                        <span className="skill-tag" key={kw}>{kw.charAt(0).toUpperCase() + kw.slice(1)}</span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* CERTIFICATIONS */}
          <section id="certifications" className="content-section">
            <h2 className="content-section-title">Certifications</h2>
            <p className="cert-section-subtitle">
              Credentials across development, AI, and engineering — each verifiable at its source.
            </p>
            {certs.length === 0 ? (
              <p className="no-certs-msg">No certificates added yet.</p>
            ) : (
              (() => {
                const categories = Array.from(new Set(certs.map(c => c.category || 'General')));
                return categories.map(cat => (
                  <div className="cert-category-group" key={cat}>
                    <div className="cert-category-label">{cat}</div>
                    <div className="cert-cards-grid">
                      {certs.filter(c => (c.category || 'General') === cat).map(cert => {
                        const certTargetUrl = cert.file_url || cert.link_url;
                        const CardContent = (
                          <>
                            <div className="cert-card-logo">
                              {cert.icon_url ? (
                                <img src={cert.icon_url} alt={cert.issuer} className="cert-card-icon-img" />
                              ) : (
                                <span className="cert-card-icon-fallback">
                                  <svg viewBox="0 0 48 48" fill="none" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="24" cy="20" r="12" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.85"/>
                                    <polyline points="17,30 14,44 24,39 34,44 31,30" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" opacity="0.85"/>
                                    <circle cx="24" cy="20" r="6" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5"/>
                                  </svg>
                                </span>
                              )}
                            </div>
                            <div className="cert-card-title">{cert.title}</div>
                            <div className="cert-card-issuer">{cert.issuer}</div>
                            <span className={`cert-card-verify ${!certTargetUrl ? 'muted' : ''}`}>✦ VERIFY</span>
                          </>
                        );

                        return certTargetUrl ? (
                          <a
                            href={certTargetUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="cert-card"
                            key={cert.id}
                          >
                            {CardContent}
                          </a>
                        ) : (
                          <div className="cert-card" key={cert.id}>
                            {CardContent}
                          </div>
                        );
                      })}

                    </div>
                  </div>
                ));
              })()
            )}
          </section>


          {/* MY PROCESS */}
          <section className="content-section">
            <h2 className="content-section-title">My Process</h2>
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
        </main>
      </div>

      {/* ── UPWORK PROJECT DETAIL MODAL ── */}
      {selectedProject && (
        <div className="upwork-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="upwork-modal-container" onClick={(e) => e.stopPropagation()}>
            
            {/* Top Bar */}
            <div className="upwork-modal-header">
              <h2 className="upwork-modal-title">{selectedProject.title}</h2>
              <div className="upwork-modal-top-actions">
                {selectedProject.link_url && (
                  <button
                    className="upwork-copy-link-btn"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedProject.link_url!)
                      setCopied(true)
                      setTimeout(() => setCopied(false), 2000)
                    }}
                  >
                    <span>{copied ? 'Copied!' : 'Copy link'}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  </button>
                )}
                <button className="upwork-modal-close-btn" onClick={() => setSelectedProject(null)} aria-label="Close">
                  ✕
                </button>
              </div>
            </div>

            {/* Main 2-Column Section */}
            <div className="upwork-modal-body">
              
              {/* Left Info Column */}
              <div className="upwork-modal-left">
                <div className="upwork-modal-section">
                  <span className="upwork-modal-label">Project description</span>
                  <h3 className="upwork-modal-subtitle">{selectedProject.title}</h3>
                  {selectedProject.link_url && (
                    <a href={selectedProject.link_url} target="_blank" rel="noreferrer" className="upwork-modal-link">
                      {selectedProject.link_url}
                    </a>
                  )}
                  <p className="upwork-modal-desc">{selectedProject.desc_text}</p>
                </div>

                {selectedProject.tech_stack && selectedProject.tech_stack.length > 0 && (
                  <div className="upwork-modal-section">
                    <span className="upwork-modal-label">Skills and deliverables</span>
                    <div className="upwork-modal-pills">
                      {selectedProject.tech_stack.map((iconUrl, i) => (
                        <span key={i} className="upwork-modal-pill">
                          {getTechName(iconUrl)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="upwork-modal-section">
                  <span className="upwork-modal-meta">Published on {selectedProject.year}</span>
                </div>
              </div>

              {/* Right Preview Column — Horizontal Scroll Strip */}
              <div className="upwork-modal-right">
                {(() => {
                  const allImgs = [
                    ...(selectedProject.image_url ? [selectedProject.image_url] : []),
                    ...(selectedProject.images || []),
                  ].filter(Boolean);
                  const imgs = allImgs.length > 0 ? allImgs : ['/images/default_logo.png'];
                  return (
                    <div className="modal-img-scroll">
                      {imgs.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`${selectedProject.title} screenshot ${i + 1}`}
                          className="modal-img-scroll-item"
                        />
                      ))}
                    </div>
                  );
                })()}
              </div>

            </div>

            {/* Bottom "More by Jet P." Row */}
            <div className="upwork-modal-bottom">
              <h4 className="upwork-modal-bottom-title">More by Jet P.</h4>
              <div className="upwork-modal-carousel">
                {projects.filter(p => p.id !== selectedProject.id).map(otherP => (
                  <div
                    key={otherP.id}
                    className="upwork-modal-thumb-item"
                    onClick={() => setSelectedProject(otherP)}
                  >
                    <div className="upwork-modal-thumb-img-wrap">
                      <img src={otherP.image_url || '/images/unnamed.jpg'} alt={otherP.title} />
                    </div>
                    <span className="upwork-modal-thumb-name">{otherP.title}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

function getTechName(url: string): string {
  if (url.includes('react')) return 'React'
  if (url.includes('typescript')) return 'TypeScript'
  if (url.includes('python')) return 'Python'
  if (url.includes('javascript')) return 'JavaScript'
  if (url.includes('html5')) return 'HTML5'
  if (url.includes('css3')) return 'CSS3'
  if (url.includes('figma')) return 'Figma'
  if (url.includes('nodejs')) return 'Node.js'
  if (url.includes('flutter')) return 'Flutter'
  if (url.includes('sqlite')) return 'SQLite'
  if (url.includes('github')) return 'GitHub'
  return 'Deliverable'
}

export default Portfolio
