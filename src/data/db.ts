// ─────────────────────────────────────────────────────────────────────────────
// Static Portfolio Data — No backend needed.
// Edit the arrays below to update your portfolio content.
// ─────────────────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  year: string;
  status: 'active' | 'completed';
  desc_text: string;
  image_url?: string;
  images?: string[];
  link_url?: string;
  pinned?: boolean;
  position?: number;
  tech_stack?: string[];
  created_at?: string;
}

export interface Certificate {
  id: string;
  file_url: string;
  link_url?: string;
  title: string;
  issuer: string;
  icon_url?: string;
  category?: string;
  created_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: string;
  created_at?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  content: string;
  status: 'unread' | 'read';
  created_at?: string;
  date?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS — add / remove / edit entries here.
// Set `pinned: true` to show a project on the homepage.
// ─────────────────────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Code Mania',
    year: '2026',
    status: 'active',
    desc_text:
      'A gamified interactive coding education platform supporting Python, JavaScript, and C++ challenges. Features progress tracking, leaderboards, and student/admin portals built for a 5-person team as project lead.',
    image_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1774506103/portfolio_upload/uwun69hxuqvvqs1uydjp.jpg',
    images: [
      // Add more screenshot URLs here to show in the carousel
      // 'https://res.cloudinary.com/...',
    ],
    link_url: 'https://codemania.fun',
    pinned: true,
    position: 0,
    tech_stack: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    ],
  },

  {
    id: '3',
    title: 'New York Times Clone',
    year: '2024',
    status: 'completed',
    desc_text:
      'A pixel-perfect front-end clone of the New York Times website, replicating the layout, typography, and editorial style of the iconic news platform using HTML and CSS.',
    image_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1774505357/portfolio_upload/hr4kcizvb4jmaicmjedh.jpg',
    images: [
      // Add more screenshot URLs here
    ],
    link_url: undefined,
    pinned: true,
    position: 2,
    tech_stack: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    ],
  },
  {
    id: '4',
    title: 'Squirl',
    year: '2026',
    status: 'completed',
    desc_text:
      'A modern web application designed to help users organize, save, and manage their links, content, and resources efficiently.',
    image_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1785811541/e6f8f9f4-590c-4004-a00a-f659e0bebfcc_sepb53.jpg',
    images: [
      'https://res.cloudinary.com/dwutjobga/image/upload/v1785825860/ed70bc62-5f1a-49c6-82cd-4ff4af61def2_oe5dwg.jpg',
      'https://res.cloudinary.com/dwutjobga/image/upload/v1785825862/978c9494-f7a8-4bb6-85c2-f51b122f5a9a_vey033.jpg',
      'https://res.cloudinary.com/dwutjobga/image/upload/v1785825862/3966405f-d74f-46f4-aa3e-913d6b0d6bfe_krebyu.jpg'
    ],
    link_url: undefined,
    pinned: true,
    position: 3,
    tech_stack: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    ],
  },
  {
    id: '5',
    title: 'Bayad Tracker',
    year: '2026',
    status: 'completed',
    desc_text:
      'A financial payment tracking utility designed for logging shared expenses, bills, and payment statuses among users.',
    image_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1785825984/BayadTracker_jtvooz.jpg',
    images: [
      'https://res.cloudinary.com/dwutjobga/image/upload/v1785826887/ea95ea15-a4a2-441a-bb13-430d57c7c1d1_z8t2ba.jpg',
      'https://res.cloudinary.com/dwutjobga/image/upload/v1785826887/97240976-2f3d-48c5-ba57-c797fc90da7d_vk2x4q.jpg',
      'https://res.cloudinary.com/dwutjobga/image/upload/v1785826887/a4b72c6d-27ff-4c6a-a17c-fc7409a08f8a_je4ybe.jpg',
      'https://res.cloudinary.com/dwutjobga/image/upload/v1785826887/0a32b588-07fc-4882-b20c-f0097fccfb7c_vwhf5g.jpg',
      'https://res.cloudinary.com/dwutjobga/image/upload/v1785826887/e63b0013-a768-4f2d-a879-9d2f5f4c751f_vfxsj1.jpg',
      'https://res.cloudinary.com/dwutjobga/image/upload/v1785826887/dfcf95b8-548a-41e4-81f5-7d180cb29a70_v5b4jm.jpg'
    ],
    link_url: undefined,
    pinned: true,
    position: 4,
    tech_stack: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    ],
  },
];


// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATES — add your certificates here.
// `file_url` can be a PDF URL or an image URL.
// ─────────────────────────────────────────────────────────────────────────────
const CERTIFICATES: Certificate[] = [
  {
    id: '1', title: 'AI Fluency for Students', issuer: 'Anthropic',
    icon_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1775528284/portfolio_upload/vwbxn5atcqtlixrbgwax.webp',
    category: 'AI',
    file_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1774506318/portfolio_upload/ilgrw2iuoevrtmp3tkkq.pdf',
    link_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1774506318/portfolio_upload/ilgrw2iuoevrtmp3tkkq.pdf',
  },
  {
    id: '2', title: 'Introduction to Claude Cowork', issuer: 'Anthropic',
    icon_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1775528284/portfolio_upload/vwbxn5atcqtlixrbgwax.webp',
    category: 'AI',
    file_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1774506314/portfolio_upload/v5uezmtls5fyuwy2shny.pdf',
    link_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1774506314/portfolio_upload/v5uezmtls5fyuwy2shny.pdf',
  },
  {
    id: '3', title: 'Claude 101', issuer: 'Anthropic',
    icon_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1775528284/portfolio_upload/vwbxn5atcqtlixrbgwax.webp',
    category: 'AI',
    file_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1774506308/portfolio_upload/c2liifrovh1gbi8hrab3.pdf',
    link_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1774506308/portfolio_upload/c2liifrovh1gbi8hrab3.pdf',
  },
  {
    id: '4', title: 'Claud Code in Action', issuer: 'Anthropic',
    icon_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1775528284/portfolio_upload/vwbxn5atcqtlixrbgwax.webp',
    category: 'AI',
    file_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1774506304/portfolio_upload/rvwalrtlqzjxkpxa2xlt.pdf',
    link_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1774506304/portfolio_upload/rvwalrtlqzjxkpxa2xlt.pdf',
  },
  {
    id: '5', title: 'Claude with the Anthropic API', issuer: 'Anthropic',
    icon_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1775528284/portfolio_upload/vwbxn5atcqtlixrbgwax.webp',
    category: 'AI',
    file_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1774506299/portfolio_upload/abe8daj50rxqmp8udcmg.pdf',
    link_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1774506299/portfolio_upload/abe8daj50rxqmp8udcmg.pdf',
  },
  {
    id: '6', title: 'Introduction to Model Context Protocol', issuer: 'Anthropic',
    icon_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1775528284/portfolio_upload/vwbxn5atcqtlixrbgwax.webp',
    category: 'AI',
    file_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1774506293/portfolio_upload/qdmjgazm63wvlxzsiqss.pdf',
    link_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1774506293/portfolio_upload/qdmjgazm63wvlxzsiqss.pdf',
  },
  {
    id: '7', title: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic',
    icon_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1775528284/portfolio_upload/vwbxn5atcqtlixrbgwax.webp',
    category: 'AI',
    file_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1774506287/portfolio_upload/cfl9jdc4zkjkbq0hz5nq.pdf',
    link_url: 'https://res.cloudinary.com/dwutjobga/image/upload/v1774506287/portfolio_upload/cfl9jdc4zkjkbq0hz5nq.pdf',
  },
];






// ─────────────────────────────────────────────────────────────────────────────
// SKILLS — add your skills here.
// `icon` can be a full URL or a devicon CDN link (recommended).
// `category` must match one of the category titles in Portfolio.tsx:
//   'Frontend Development' | 'Backend Development' | 'Database & Infra'
//   | 'AI Tools & Automation' | 'Tools & Others'
// ─────────────────────────────────────────────────────────────────────────────
const SKILLS: Skill[] = [
  // ── Frontend ──
  {
    id: 's1',
    name: 'HTML',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    category: 'Frontend Development',
  },
  {
    id: 's2',
    name: 'CSS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    category: 'Frontend Development',
  },
  {
    id: 's3',
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    category: 'Frontend Development',
  },
  {
    id: 's4',
    name: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    category: 'Frontend Development',
  },
  {
    id: 's5',
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    category: 'Frontend Development',
  },
  {
    id: 's6',
    name: 'Next.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    category: 'Frontend Development',
  },
  {
    id: 's7',
    name: 'Figma',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    category: 'Frontend Development',
  },
  // ── Backend ──
  {
    id: 's8',
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    category: 'Backend Development',
  },
  {
    id: 's9',
    name: 'Python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    category: 'Backend Development',
  },
  {
    id: 's10',
    name: 'PHP',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    category: 'Backend Development',
  },
  {
    id: 's11',
    name: 'Java',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    category: 'Backend Development',
  },
  {
    id: 's12',
    name: 'C#',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
    category: 'Backend Development',
  },
  // ── Database & Infra ──
  {
    id: 's13',
    name: 'MySQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    category: 'Database & Infra',
  },
  {
    id: 's14',
    name: 'PostgreSQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    category: 'Database & Infra',
  },
  {
    id: 's15',
    name: 'Firebase',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    category: 'Database & Infra',
  },
  {
    id: 's16',
    name: 'Supabase',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
    category: 'Database & Infra',
  },
  {
    id: 's17',
    name: 'Docker',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    category: 'Database & Infra',
  },
  {
    id: 's18',
    name: 'Vercel',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
    category: 'Database & Infra',
  },
  // ── AI & Automation ──
  {
    id: 's19a',
    name: 'Claude',
    icon: 'https://res.cloudinary.com/dwutjobga/image/upload/v1775528284/portfolio_upload/vwbxn5atcqtlixrbgwax.webp',
    category: 'AI Tools & Automation',
  },
  {
    id: 's19b',
    name: 'Gemini',
    icon: 'https://res.cloudinary.com/dwutjobga/image/upload/v1775528564/portfolio_upload/fjeycint2aztq65rao3k.webp',
    category: 'AI Tools & Automation',
  },
  {
    id: 's19c',
    name: 'Framer',
    icon: 'https://res.cloudinary.com/dwutjobga/image/upload/v1775528741/portfolio_upload/lyhqxbihcqhqnxnlot02.png',
    category: 'AI Tools & Automation',
  },
  {
    id: 's19d',
    name: 'Antigravity',
    icon: 'https://res.cloudinary.com/dwutjobga/image/upload/v1775528511/portfolio_upload/hv0geodktoe8sk37hyfi.png',
    category: 'AI Tools & Automation',
  },
  // ── Tools & Others ──
  {
    id: 's20',
    name: 'Git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    category: 'Tools & Others',
  },
  {
    id: 's21',
    name: 'GitHub',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    category: 'Tools & Others',
  },
  {
    id: 's22',
    name: 'Unity',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg',
    category: 'Tools & Others',
  },
  {
    id: 's23',
    name: 'Cloudinary',
    icon: 'https://res.cloudinary.com/dwutjobga/image/upload/v1/portfolio_upload/cloudinary_icon.png',
    category: 'Tools & Others',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// db — same API surface as before, now returns static data instantly.
// ─────────────────────────────────────────────────────────────────────────────
export const db = {
  // Projects
  getProjects: async (): Promise<Project[]> => PROJECTS,
  getPinnedProjects: async (): Promise<Project[]> =>
    PROJECTS.filter((p) => p.pinned).slice(0, 9),
  saveProject: async (_project: Partial<Project>) => {
    console.warn('saveProject: static mode — no backend available');
  },
  deleteProject: async (_id: string) => {
    console.warn('deleteProject: static mode — no backend available');
  },
  togglePin: async (_id: string, _pinned: boolean) => {
    console.warn('togglePin: static mode — no backend available');
  },
  updateProjectPositions: async (_orderedProjects: Project[]) => {
    console.warn('updateProjectPositions: static mode — no backend available');
  },

  // Certificates
  getCerts: async (): Promise<Certificate[]> => CERTIFICATES,
  saveCert: async (_cert: Partial<Certificate>) => {
    console.warn('saveCert: static mode — no backend available');
  },
  deleteCert: async (_id: string) => {
    console.warn('deleteCert: static mode — no backend available');
  },

  // Skills
  getSkills: async (): Promise<Skill[]> => SKILLS,
  saveSkill: async (_skill: Partial<Skill>) => {
    console.warn('saveSkill: static mode — no backend available');
  },
  deleteSkill: async (_id: string) => {
    console.warn('deleteSkill: static mode — no backend available');
  },

  // Messages (contact form — no-op in static mode)
  getMessages: async (): Promise<Message[]> => [],
  addMessage: async (_msg: Omit<Message, 'id' | 'date' | 'status'>) => {
    console.warn('addMessage: static mode — no backend available');
  },
  deleteMessage: async (_id: string) => {
    console.warn('deleteMessage: static mode — no backend available');
  },
};
