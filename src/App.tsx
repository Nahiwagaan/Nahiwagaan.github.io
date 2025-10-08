import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }


  return (
    <>
      <header className={isScrolled ? 'scrolled' : ''}>
        <div className="header-content">
          <div className="logo">JP</div>
          <nav>
            <a href="#home" onClick={(e) => scrollToSection(e, 'home')}>HOME</a>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>ABOUT</a>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')}>PROJECTS</a>
            <a href="#workflow" onClick={(e) => scrollToSection(e, 'workflow')}>WORKFLOW</a>
            <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')}>SKILLS</a>
            <button className="btn-explore" onClick={(e) => {
              e.preventDefault()
              scrollToSection(e as any, 'contact')
            }}>CONTACT</button>
          </nav>
        </div>
      </header>

      <main id="home">
        <div className="main-bg-circle"></div>
        <img id="pogi" src="/images/unnamed.jpg" alt="Jet Padilla" />
        <h1>
          <span className="highlights">Hi, </span>
          <span className="highlight">I'm Jet </span>
          <span className="highlight-alt">Padilla</span>
        </h1>
        <p className="description">
        An aspiring web developer who strives to build intuitive, visually appealing, and user-friendly digital experiences by combining creativity with technical expertise, staying updated with the latest industry trends, and continuously refining skills to deliver impactful and scalable web solutions.
        </p>
        <div className="buttons">
          <button className="watch-launch">Let's Connect!</button>
          <button className="empty-btn">View Resume</button>
        </div>
        <div className="down-arrow">&darr;</div>
      </main>

      <section id="about" className="about-section">
        <div className="about-container">
          <h2>My Journey Through Time</h2>
          <p className="section-subtitle">A quick journey through my coding path</p>

          <div className="timeline">
            <div className="timeline-item left">
              <div className="timeline-content">
                <h3>2018</h3>
                <h4>Started My Coding Journey</h4>
                <p>Experimented with HTML & CSS by customizing blog themes — sparking my curiosity for web development.</p>
              </div>
            </div>

            <div className="timeline-item right">
              <div className="timeline-content">
                <h3>2021</h3>
                <h4>First Projects</h4>
                <p>Built small web apps and school projects, learning the foundations of JavaScript and Git.</p>
              </div>
            </div>

            <div className="timeline-item left">
              <div className="timeline-content">
                <h3>2023</h3>
                <h4>Freelance & Collaboration</h4>
                <p>Worked with teams and organizations, developing responsive websites and honing problem-solving skills.</p>
              </div>
            </div>

            <div className="timeline-item right">
              <div className="timeline-content">
                <h3>2025</h3>
                <h4>Focused on Growth</h4>
                <p>Building full-stack projects with React, Node.js, and Python while continuously learning modern technologies.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="projects">
        <h2>My Projects</h2>
        <p>Here is a collection of my projects, showcasing my skills in web development and applications</p>
        <div className="projects-container">
          <div className="project-card">
            <div className="status-badge status-completed">Completed</div>
            <img src="/images/unnamed.jpg" alt="File Organizer Project" className="project-image" />
            <div className="project-content">
              <div className="project-header">
                <h3>File-Organizer</h3>
                <span className="project-year">2023</span>
              </div>
              <p className="project-description">
                A simple file organizer that will help you to organize your files based on their extension.
              </p>
            </div>
          </div>
          
          <div className="project-card">
            <div className="status-badge status-active">Active</div>
            <img src="/images/unnamed.jpg" alt="Portfolio Website" className="project-image" />
            <div className="project-content">
              <div className="project-header">
                <h3>Portfolio Website</h3>
                <span className="project-year">2025</span>
              </div>
              <p className="project-description">
                A modern, responsive portfolio website built with React and TypeScript.
              </p>
            </div>
          </div>
          
          <div className="project-card">
            <div className="status-badge status-active">Active</div>
            <img src="/images/unnamed.jpg" alt="Web Application" className="project-image" />
            <div className="project-content">
              <div className="project-header">
                <h3>The New York Times</h3>
                <span className="project-year">2024</span>
              </div>
              <p className="project-description">
                A replication of The New York Times layout using web development skills.
              </p>
            </div>
          </div>

          <div className="project-card">
            <div className="status-badge status-completed">Completed</div>
            <img src="/images/unnamed.jpg" alt="Web Application" className="project-image" />
            <div className="project-content">
              <div className="project-header">
                <h3>Auto-Backup</h3>
                <span className="project-year">2024</span>
              </div>
              <p className="project-description">
                Interactive web application with user authentication and dynamic content.
              </p>
            </div>
          </div>

          <div className="project-card">
            <div className="status-badge status-completed">Completed</div>
            <img src="/images/unnamed.jpg" alt="Web Application" className="project-image" />
            <div className="project-content">
              <div className="project-header">
                <h3>Chatbot</h3>
                <span className="project-year">2025</span>
              </div>
              <p className="project-description">
                A playful conversational Python chatbot that uses simple NLP, jokes, Gen Z slang responses, and some easter eggs.
              </p>
            </div>
          </div>

          <div className="project-card">
            <div className="status-badge status-completed">Completed</div>
            <img src="/images/unnamed.jpg" alt="Web Application" className="project-image" />
            <div className="project-content">
              <div className="project-header">
                <h3>Jejemon Translator</h3>
                <span className="project-year">2025</span>
              </div>
              <p className="project-description">
                A stylized module for decoding *jejemon* or stylized Filipino texts back to normal using a mix of pattern matching, reverse mappings, and regex.
              </p>
            </div>
          </div>

          <div className="project-card">
            <div className="status-badge status-completed">Completed</div>
            <img src="/images/unnamed.jpg" alt="Web Application" className="project-image" />
            <div className="project-content">
              <div className="project-header">
                <h3>Easts Enrollment System</h3>
                <span className="project-year">2025</span>
              </div>
              <p className="project-description">
                I was part of the team that developed a full-stack enrollment system.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow">
        <h2>My Process</h2>
        <p>A structured approach to bring your ideas to life</p>
        <div className="workflow-container">
          <div className="workflow-step">
            <div className="step-icon">
              <span>🔍</span>
            </div>
            <div className="step-number">1</div>
            <h3>Explore</h3>
            <p>We begin by understanding your project’s objectives and specific needs.</p>
          </div>
          
          <div className="workflow-step">
            <div className="step-icon">
              <span>🎨</span>
            </div>
            <div className="step-number">2</div>
            <h3>Plan</h3>
            <p>I outline the app’s framework and user journey to build a strong base.</p>
          </div>
          
          <div className="workflow-step">
            <div className="step-icon">
              <span>💻</span>
            </div>
            <div className="step-number">3</div>
            <h3>Build</h3>
            <p>The design is transformed into functional, clean, and scalable code.</p>
          </div>
          
          <div className="workflow-step">
            <div className="step-icon">
              <span>🚀</span>
            </div>
            <div className="step-number">4</div>
            <h3>Launch</h3>
            <p>Your project goes live, ready to reach and engage its audience.</p>
          </div>
        </div>
      </section>

      <section id="skills">
        <h2>Core Competencies</h2>
        <p>The tools and technologies I use to create impactful solutions</p>
        <div className="skills-wrapper">
          <div className="skills-container">
            <div className="skill-item">
              <div className="skill-icon">
                <img src="/images/react.png" alt="React" />
              </div>
              <span>React</span>
            </div>
            <div className="skill-item">
              <div className="skill-icon">
                <img src="/images/javascript.svg" alt="JavaScript" />
              </div>
              <span>JavaScript</span>
            </div>
            <div className="skill-item">
              <div className="skill-icon">
                <img src="/images/css.png" alt="CSS3" />
              </div>
              <span>CSS3</span>
            </div>
            <div className="skill-item">
              <div className="skill-icon">
                <img src="/images/html.jpg" alt="HTML5" />
              </div>
              <span>HTML5</span>
            </div>
            <div className="skill-item">
              <div className="skill-icon">
                <img src="/images/nodejs.png" alt="Node.js" />
              </div>
              <span>Node.js</span>
            </div>
            <div className="skill-item">
              <div className="skill-icon">
                <img src="/images/git.png" alt="Git" />
              </div>
              <span>Git</span>
            </div>
            <div className="skill-item">
              <div className="skill-icon">
                <img src="/images/figma.webp" alt="Figma" />
              </div>
              <span>Figma</span>
            </div>
            <div className="skill-item">
              <div className="skill-icon">
                <img src="/images/python.png" alt="Python" />
              </div>
              <span>Python</span>
            </div>
            <div className="skill-item">
              <div className="skill-icon">
                <img src="/images/react.png" alt="React" />
              </div>
              <span>React</span>
            </div>
            <div className="skill-item">
              <div className="skill-icon">
                <img src="/images/javascript.svg" alt="JavaScript" />
              </div>
              <span>JavaScript</span>
            </div>
            <div className="skill-item">
              <div className="skill-icon">
                <img src="/images/css.png" alt="CSS3" />
              </div>
              <span>CSS3</span>
            </div>
            <div className="skill-item">
              <div className="skill-icon">
                <img src="/images/html.jpg" alt="HTML5" />
              </div>
              <span>HTML5</span>
            </div>
            <div className="skill-item">
              <div className="skill-icon">
                <img src="/images/nodejs.png" alt="Node.js" />
              </div>
              <span>Node.js</span>
            </div>
            <div className="skill-item">
              <div className="skill-icon">
                <img src="/images/git.png" alt="Git" />
              </div>
              <span>Git</span>
            </div>
            <div className="skill-item">
              <div className="skill-icon">
                <img src="/images/figma.webp" alt="Figma" />
              </div>
              <span>Figma</span>
            </div>
            <div className="skill-item">
              <div className="skill-icon">
                <img src="/images/python.png" alt="Python" />
              </div>
              <span>Python</span>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2025 Jet Padilla. All Rights Reserved.</p>
      </footer>
    </>
  )
}

export default App
