
import React, { useState, useEffect } from 'react';
import { db } from '../../data/db';
import type { Project as ProjectType, Certificate as CertType, Skill as SkillType } from '../../data/db';
import {
  Plus, Trash2, Edit, X, LogOut,
  FolderKanban, Award, Code2,
  Menu, Monitor, Upload, Pin, GripVertical, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { uploadToCloudinary } from '../../data/cloudinary';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'certs' | 'skills'>('projects');
  const [isMobileView, setIsMobileView] = useState(() => window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth > 768);
  const [isUploading, setIsUploading] = useState(false);

  // Dashboard States
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [certs, setCerts] = useState<CertType[]>([]);
  const [skills, setSkills] = useState<SkillType[]>([]);


  // Editing States
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const resetForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFilePreview(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(file.name); // Just show the name for PDFs
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobileView(mobile);
      setIsSidebarOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadData = async () => {
    setProjects(await db.getProjects());
    setCerts(await db.getCerts());
    setSkills(await db.getSkills());

  };

  const handleProjectReorder = async (newOrder: ProjectType[]) => {
    setProjects(newOrder); // Optimistic UI
    await db.updateProjectPositions(newOrder);
  };


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      loadData();
    } else {
      alert('Invalid Password');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  const changeTab = (tab: 'projects' | 'certs' | 'skills') => {
    setActiveTab(tab);
    if (isMobileView) setIsSidebarOpen(false);
  };

  const deleteItem = async (type: string, id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      if (type === 'projects') await db.deleteProject(id);
      else if (type === 'certs') await db.deleteCert(id);
      else if (type === 'skills') await db.deleteSkill(id);
      else if (type === 'messages') await db.deleteMessage(id);
      loadData();
    } catch (error) {
      alert('Error deleting item');
    }
  };

  const saveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const itemData: any = Object.fromEntries(formData.entries());
    const file = formData.get('file_upload') as File;

    try {
      setIsUploading(true);
      let uploadedUrl = '';

      if (file && file.size > 0) {
        console.log('Attempting Cloudinary upload:', file.name, file.size, 'bytes');
        uploadedUrl = await uploadToCloudinary(file) || '';
      }

      const finalData = { ...itemData, id: editingItem?.id };
      delete finalData.file_upload;

      if (activeTab === 'projects') {
        finalData.pinned = formData.get('pinned') === 'true';
        finalData.tech_stack = formData.getAll('tech_stack');
        if (uploadedUrl) finalData.image_url = uploadedUrl;
        await db.saveProject(finalData);
      } else if (activeTab === 'certs') {
        if (!uploadedUrl && !editingItem?.file_url) {
          alert('Please select a PDF file to upload.');
          return;
        }
        if (uploadedUrl) finalData.file_url = uploadedUrl;
        const certLink = typeof finalData.link_url === 'string' ? finalData.link_url.trim() : '';
        finalData.link_url = certLink || null;
        // Auto-generate title from filename
        const urlForTitle = uploadedUrl || editingItem?.file_url || '';
        finalData.title = decodeURIComponent(urlForTitle.split('/').pop()?.replace(/\.[^.]+$/, '') || 'Certificate');
        finalData.issuer = 'Uploaded';
        await db.saveCert(finalData);
      } else if (activeTab === 'skills') {
        if (uploadedUrl) finalData.icon = uploadedUrl;
        await db.saveSkill(finalData);
      }

      resetForm();
      loadData();
    } catch (error) {
      alert('Error saving item');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="admin-login-card">
          <div className="login-header">
            <Monitor size={48} className="login-icon" />
            <h1>Portfolio Admin</h1>
            <p>Enter your password to manage your site</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Administrator Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required autoFocus />
            </div>
            <button type="submit" className="login-btn">Login to Dashboard</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {isMobileView && isSidebarOpen && (
        <button className="admin-sidebar-backdrop" aria-label="Close menu" onClick={() => setIsSidebarOpen(false)} />
      )}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo-area"><div className="logo-dot"></div><span>Admin Panel</span></div>
          <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}><Menu size={20} /></button>
        </div>
        <nav className="sidebar-nav">
          <button className={activeTab === 'projects' ? 'active' : ''} onClick={() => changeTab('projects')}><FolderKanban size={20} /><span>Projects</span></button>
          <button className={activeTab === 'certs' ? 'active' : ''} onClick={() => changeTab('certs')}><Award size={20} /><span>Certificates</span></button>
          <button className={activeTab === 'skills' ? 'active' : ''} onClick={() => changeTab('skills')}><Code2 size={20} /><span>Skills</span></button>

        </nav>
        <div className="sidebar-footer">
          <button onClick={logout} className="logout-btn"><LogOut size={20} /><span>Sign Out</span></button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="main-header">
          <div className="main-header-left">
            {isMobileView && (
              <button className="mobile-menu-btn" aria-label="Toggle menu" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <Menu size={18} />
              </button>
            )}
            <div className="header-breadcrumbs">Dashboard / {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</div>
          </div>
          <button className="add-new-btn" onClick={() => { setEditingItem(null); setShowForm(true); }}>
            <Plus size={18} /><span>Add {activeTab.slice(0, -1)}</span>
          </button>
        </header>

        <section className="admin-content-area">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
              <div className="admin-table-container">
                {activeTab === 'projects' && (
                  <table className="admin-table">
                    <thead><tr><th></th><th>Project Name</th><th>Year</th><th>Status</th><th>Pinned</th><th>Description</th><th>Actions</th></tr></thead>
                    <Reorder.Group as="tbody" axis="y" values={projects} onReorder={handleProjectReorder}>
                      {projects.map(p => (
                        <Reorder.Item as="tr" key={p.id} value={p} style={{ cursor: 'grab' }}>
                          <td style={{ color: 'var(--admin-text-muted)', cursor: 'grab', width: '40px' }}><GripVertical size={18} /></td>
                          <td><strong>{p.title}</strong></td><td>{p.year}</td>
                          <td><span className={`status-pill ${p.status}`}>{p.status}</span></td>
                          <td>
                            <button
                              className={`action-btn ${p.pinned ? 'pinned' : ''}`}
                              onClick={async () => { await db.togglePin(p.id, !p.pinned); loadData(); }}
                              title={p.pinned ? 'Unpin from homepage' : 'Pin to homepage'}
                            >
                              <Pin size={16} />
                            </button>
                          </td>
                          <td><div className="truncate-text">{p.desc_text}</div></td>
                          <td className="actions-cell">
                            <button className="action-btn edit" onClick={() => { setEditingItem(p); setShowForm(true); }}><Edit size={16} /></button>
                            <button className="action-btn delete" onClick={() => deleteItem('projects', p.id)}><Trash2 size={16} /></button>
                          </td>
                        </Reorder.Item>
                      ))}
                    </Reorder.Group>
                  </table>
                )}
                {activeTab === 'certs' && (
                  <table className="admin-table">
                    <thead><tr><th>#</th><th>Certificate File</th><th>Certification Link</th><th>Actions</th></tr></thead>
                    <tbody>
                      {certs.map((c, idx) => (
                        <tr key={c.id}>
                          <td>{idx + 1}</td>
                          <td><div className="truncate-text">{c.file_url?.split('/').pop() || 'Certificate file'}</div></td>
                          <td><div className="truncate-text">{c.link_url || '-'}</div></td>
                          <td className="actions-cell">
                            <a className="action-btn view" href={c.file_url} target="_blank" rel="noreferrer" title="View certificate">
                              <ExternalLink size={16} />
                            </a>
                            {c.link_url && (
                              <a className="action-btn view" href={c.link_url} target="_blank" rel="noreferrer" title="Open certification link">
                                <ExternalLink size={16} />
                              </a>
                            )}
                            <button className="action-btn edit" onClick={() => { setEditingItem(c); setShowForm(true); }}><Edit size={16} /></button>
                            <button className="action-btn delete" onClick={() => deleteItem('certs', c.id)}><Trash2 size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {activeTab === 'skills' && (
                  <table className="admin-table">
                    <thead><tr><th>Skill Name</th><th>Category</th><th>Icon</th><th>Actions</th></tr></thead>
                    <tbody>
                      {skills.map(s => (
                        <tr key={s.id}>
                          <td>{s.name}</td>
                          <td><span className="status-pill active">{s.category || 'Uncategorized'}</span></td>
                          <td>{s.icon ? <img src={s.icon} alt={s.name} style={{ height: '30px', width: '30px', objectFit: 'contain' }} /> : 'No Icon'}</td>
                          <td className="actions-cell">
                            <button className="action-btn edit" onClick={() => { setEditingItem(s); setShowForm(true); }}><Edit size={16} /></button>
                            <button className="action-btn delete" onClick={() => deleteItem('skills', s.id)}><Trash2 size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      {showForm && (
        <div className="admin-modal-overlay">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="admin-modal">
            <div className="modal-header">
              <h3>{editingItem ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}</h3>
              <button className="close-btn" onClick={resetForm}><X size={20} /></button>
            </div>
            <form onSubmit={saveItem} className="admin-form">
              {activeTab === 'projects' && (
                <>
                  <div className="form-group"><label>Title</label><input name="title" defaultValue={editingItem?.title} required /></div>
                  <div className="form-row">
                    <div className="form-group"><label>Year</label><input name="year" defaultValue={editingItem?.year} required /></div>
                    <div className="form-group"><label>Status</label>
                      <select name="status" defaultValue={editingItem?.status || 'active'}><option value="active">Active</option><option value="completed">Completed</option></select>
                    </div>
                  </div>
                  <div className="form-group"><label>Description (desc_text)</label><textarea name="desc_text" defaultValue={editingItem?.desc_text} rows={4} required /></div>
                  <div className="form-group"><label>Project Link (URL)</label><input name="link_url" defaultValue={editingItem?.link_url} placeholder="https://your-project.com" /></div>
                  <div className="form-group">
                    <label>Tech Stack</label>
                    <div className="tech-stack-select">
                      {skills.map((s) => (
                        <label key={s.id} className="tech-checkbox-label" title={s.name}>
                          <input type="checkbox" name="tech_stack" value={s.icon} defaultChecked={editingItem?.tech_stack?.includes(s.icon) || false} />
                          <img src={s.icon || `/images/icons/${s.name.toLowerCase()}.svg`} alt={s.name} />
                          <span className="tech-label-text">{s.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group form-checkbox">
                    <label>
                      <input type="checkbox" name="pinned" value="true" defaultChecked={editingItem?.pinned || false} />
                      <span>Pin to Homepage (max 9)</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label>Project Image</label>
                    <div className="upload-container">
                      <input type="file" name="file_upload" accept="image/*" className="file-input-real" id="file_upload" onChange={handleFileSelect} />
                      <label htmlFor="file_upload" className="file-input-label">
                        <Upload size={18} /> {editingItem?.image_url || filePreview ? 'Change Image' : 'Select Image'}
                      </label>
                      <input name="image_url" defaultValue={editingItem?.image_url} placeholder="Or enter URL manually" />
                    </div>
                    {(filePreview || editingItem?.image_url) && filePreview?.startsWith('blob') && (
                      <div className="file-preview-area">
                        <p>Preview:</p>
                        <img src={filePreview} alt="Preview" className="img-preview-small" />
                      </div>
                    )}
                  </div>
                </>
              )}
              {activeTab === 'certs' && (
                <>
                  <div className="form-group">
                    <label>Upload Certificate (PDF)</label>
                    <div className="upload-container">
                      <input type="file" name="file_upload" accept="application/pdf,image/*" className="file-input-real" id="file_upload_cert" onChange={handleFileSelect} />
                      <label htmlFor="file_upload_cert" className="file-input-label">
                        <Upload size={18} /> {editingItem?.file_url || filePreview ? 'Change File' : 'Select PDF File'}
                      </label>
                    </div>
                    {filePreview && !filePreview.startsWith('blob') && (
                      <p className="preview-text">Selected: {filePreview}</p>
                    )}
                    {editingItem?.file_url && !filePreview && (
                      <p className="preview-text">Current: {editingItem.file_url.split('/').pop()}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Certification Link (Optional)</label>
                    <input name="link_url" defaultValue={editingItem?.link_url} placeholder="https://verify.example.com/certificate-id" />
                  </div>
                </>
              )}
              {activeTab === 'skills' && (
                <>
                  <div className="form-group"><label>Skill Name</label><input name="name" defaultValue={editingItem?.name} required /></div>
                  <div className="form-group">
                    <label>Category</label>
                    <select name="category" defaultValue={editingItem?.category || 'Frontend Development'} required>
                      <option value="Frontend Development">Frontend Development</option>
                      <option value="Backend Development">Backend Development</option>
                      <option value="Database & Infra">Database & Infra</option>
                      <option value="AI Tools & Automation">AI Tools & Automation</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Skill Icon</label>
                    <div className="upload-container">
                      <input type="file" name="file_upload" accept="image/*" className="file-input-real" id="file_upload_skill" onChange={handleFileSelect} />
                      <label htmlFor="file_upload_skill" className="file-input-label">
                        <Upload size={18} /> {editingItem?.icon || filePreview ? 'Change Icon' : 'Select Icon'}
                      </label>
                      <input name="icon" defaultValue={editingItem?.icon} placeholder="Or enter icon URL manually" />
                    </div>
                    {(filePreview || editingItem?.icon) && filePreview?.startsWith('blob') && (
                      <div className="file-preview-area">
                        <img src={filePreview} alt="Preview" className="img-preview-skill" />
                      </div>
                    )}
                  </div>
                </>
              )}
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={resetForm}>Cancel</button>
                <button type="submit" className="btn-save" disabled={isUploading}>
                  {isUploading ? 'Uploading...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
