
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../data/db'
import type { Project } from '../data/db'
import '../App.css'

function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProjects = async () => {
      const p = await db.getProjects()
      setProjects(p)
    }
    fetchProjects()
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      {/* ── HEADER ── */}
      <header className="scrolled">
        <div className="header-content">
          <div className="logo" style={{cursor: 'pointer'}} onClick={() => navigate('/')}>
            <img
              src={theme === 'light' ? '/images/logo_light.png' : '/images/default_logo.png'}
              alt="Logo"
              className="logo-image"
              style={{ height: '40px' }}
            />
          </div>

          <nav className="desktop-nav">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
            <a href="/#services" onClick={(e) => { e.preventDefault(); navigate('/#services'); }}>About</a>
            <a href="/projects" className="active-nav-link" onClick={(e) => e.preventDefault()}>Projects</a>
            <a href="/#contact" onClick={(e) => { e.preventDefault(); navigate('/#contact'); }}>Contact</a>
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
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); setMenuOpen(false); }}>Home</a>
          <a href="/#services" onClick={(e) => { e.preventDefault(); navigate('/#services'); setMenuOpen(false); }}>About</a>
          <a href="/projects" onClick={(e) => { e.preventDefault(); setMenuOpen(false); }}>Projects</a>
          <a href="/#contact" onClick={(e) => { e.preventDefault(); navigate('/#contact'); setMenuOpen(false); }}>Contact</a>
        </div>
      </header>

      {/* ── ALL PROJECTS ── */}
      <section id="all-projects" className="all-projects-page">
        <div className="all-projects-header">
          <h1>All Projects</h1>
          <p>A complete collection of my work in web development and applications</p>
        </div>
        <div className="projects-container">
          {projects.length === 0 ? (
            <p style={{textAlign:'center', opacity: 0.6}}>Loading projects...</p>
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
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <p>© {new Date().getFullYear()} Jet Padilla. All Rights Reserved.</p>
      </footer>
    </>
  )
}

export default Projects
