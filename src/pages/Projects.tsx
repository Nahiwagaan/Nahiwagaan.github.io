import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../data/db'
import type { Project } from '../data/db'
import '../App.css'

function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProjects = async () => {
      const p = await db.getProjects()
      setProjects(p)
    }
    fetchProjects()
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="page-layout">

      {/* ── LEFT NAV SIDEBAR ── */}
      <aside className={`left-nav-sidebar ${menuOpen ? 'lnav-open' : ''}`}>
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

        <div className="lnav-group">
          <button className="lnav-link" onClick={() => navigate('/')}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            Back to Home
          </button>
          <a href="https://github.com/Nahiwagaan" target="_blank" rel="noreferrer" className="lnav-link">
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" /></svg>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/jet-padilla-b19b68327/" target="_blank" rel="noreferrer" className="lnav-link">
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
            LinkedIn
          </a>
        </div>

        <div className="lnav-divider" />

        <div className="lnav-group">
          <button className="lnav-section-link lnav-active" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Projects ({projects.length})
          </button>
        </div>

        <div style={{ flex: 1 }} />

        <div className="lnav-bottom">
          <div className="lnav-controls">
            <button onClick={toggleTheme} className="lnav-control-btn" aria-label="Toggle theme" title="Toggle theme">
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" /></svg>
              )}
            </button>
          </div>
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

      {/* ── MAIN CONTENT ── */}
      <div className="main-content-wrapper">
        <main className="main-content-area projects-page-area">

          {/* PAGE HEADER */}
          <div className="projects-list-header">
            <h1 className="projects-list-title">projects</h1>
            <p className="projects-list-subtitle">
              Products and platforms I've designed and shipped — spanning developer education, generative AI, and consumer apps.
            </p>
          </div>

          {/* PROJECT LIST CARDS */}
          <div className="projects-vertical-stack">
            {projects.length === 0 ? (
              <p style={{ opacity: 0.6 }}>No projects added yet.</p>
            ) : projects.map((p, idx) => (
              <div key={p.id} className="project-list-card" onClick={() => setSelectedProject(p)} style={{ cursor: 'pointer' }}>
                <div className="plc-icon-container">
                  <img
                    src={p.image_url || "/images/unnamed.jpg"}
                    alt={p.title}
                    className="plc-icon-img"
                  />
                </div>
                <div className="plc-details">
                  <div className="plc-badges-row">
                    <span className="plc-pill-badge">{`< #${idx + 1} ${p.status.toUpperCase()} >`}</span>
                    <span className="plc-year-badge">{p.year}</span>
                  </div>

                  <h3 className="plc-title">{p.title}</h3>
                  <p className="plc-description">{p.desc_text}</p>

                  <div className="plc-footer-row">
                    {p.link_url && (
                      <a
                        href={p.link_url}
                        target="_blank"
                        rel="noreferrer"
                        className="plc-action-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Visit Live Project</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                      </a>
                    )}

                    {p.tech_stack && p.tech_stack.length > 0 && (
                      <div className="plc-tech-icons">
                        <span className="plc-tech-label">STACK:</span>
                        {p.tech_stack.map((icon, i) => (
                          <img key={i} src={icon} alt="tech" className="plc-tech-icon" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

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

              {/* Right Preview Column */}
              <div className="upwork-modal-right">
                <div className="upwork-modal-image-box">
                  <img
                    src={selectedProject.image_url || '/images/unnamed.jpg'}
                    alt={selectedProject.title}
                    className="upwork-modal-main-image"
                  />
                </div>
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

export default Projects

