/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
import { 
  Send, 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  ChevronRight,
  Eye,
  Edit3,
  Save,
  Upload,
  Type as TypeIcon,
  Mail,
  User,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

// --- Types ---

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

interface BlogPost {
  id: number;
  title: string;
  date: string;
}

interface SiteContent {
  siteName: string;
  heroLine1: string;
  heroLine2: string;
  introHeading: string;
  introDesc: string;
  aboutTitle: string;
  aboutText: string;
  workTitle: string;
  blogTitle: string;
  contactTitle: string;
  menuAbout: string;
  menuWork: string;
  menuBlog: string;
  menuContact: string;
  projects: Project[];
  blogPosts: BlogPost[];
}

// --- Initial Content ---

const initialContent: SiteContent = {
  siteName: "AI Design Contents Lab",
  heroLine1: "AI Design",
  heroLine2: "Contents Lab",
  introHeading: "Future of Creativity",
  introDesc: "AI 디자인 콘텐츠 랩은 트렌디하고 고효율의 디자인, 광고, 그리고 AI 생성 비디오 및 이미지를 제작합니다. 우리는 기술과 예술의 경계를 허물어 새로운 시각적 경험을 제안합니다. 인공지능이 선사하는 무한한 가능성을 현실의 디자인으로 구현합니다.",
  aboutTitle: "ABOUT",
  aboutText: "우리는 단순한 연구소를 넘어, 실질적인 비즈니스 가치를 창출하는 크리에이티브 파트너입니다. 최신 AI 기술을 활용하여 브랜드의 메시지를 가장 현대적이고 효율적인 방식으로 전달합니다. 인공지능이 선사하는 무한한 가능성을 현실의 디자인으로 구현합니다.",
  workTitle: "WORK",
  blogTitle: "BLOG",
  contactTitle: "CONTACT",
  menuAbout: "ABOUT",
  menuWork: "WORK",
  menuBlog: "BLOG",
  menuContact: "CONTACT",
  projects: [
    { id: 1, title: "AI Visual Identity", category: "BRANDING", image: "https://picsum.photos/seed/lab-work-1/1600/1000" },
    { id: 2, title: "Generative Ad Film", category: "VIDEO", image: "https://picsum.photos/seed/lab-work-2/1600/1000" },
    { id: 3, title: "Neural UI System", category: "DESIGN", image: "https://picsum.photos/seed/lab-work-3/1600/1000" },
    { id: 4, title: "Synthetic Portraits", category: "PHOTOGRAPHY", image: "https://picsum.photos/seed/lab-work-4/1600/1000" },
  ],
  blogPosts: [
    { id: 1, title: "The Generative Era", date: "2026.03.15" },
    { id: 2, title: "Efficiency in Design", date: "2026.03.10" },
    { id: 3, title: "AI Advertisement Trends", date: "2026.03.05" },
  ]
};

// --- Components ---

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [cursorScale, setCursorScale] = useState(1);

  // Custom Cursor Logic
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, textarea')) {
        setCursorScale(2.5);
      } else {
        setCursorScale(1);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isAdmin) {
    return <AdminDashboard content={content} setContent={setContent} onExit={() => setIsAdmin(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-accent selection:text-black">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-accent rounded-full z-[9999] pointer-events-none cursor-glow mix-blend-difference"
        animate={{ scale: cursorScale }}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50">
        <nav className="max-w-full px-12 h-24 flex items-center justify-between">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl font-black tracking-tighter neon-text hover:scale-105 transition-transform"
          >
            {content.siteName}
          </button>
          
          <div className="flex items-center gap-12">
            {[
              { id: 'about', label: content.menuAbout },
              { id: 'work', label: content.menuWork },
              { id: 'blog', label: content.menuBlog },
              { id: 'contact', label: content.menuContact },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-[12px] font-bold tracking-[0.3em] text-white/60 transition-colors hover:text-accent"
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main>
        {/* MASSIVE Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
          <div className="scanline-overlay"></div>
          
          <motion.div 
            onMouseEnter={() => setIsHeroHovered(true)}
            onMouseLeave={() => setIsHeroHovered(false)}
            className="relative z-20 w-full text-center select-none"
          >
            <h1 
              className={`dot-matrix-text font-black leading-[0.85] transition-all duration-300 tracking-tighter w-full px-4 ${
                isHeroHovered ? 'text-accent neon-text-strong' : 'text-sub-accent animate-pulse-sub'
              }`}
              style={{ fontSize: 'clamp(4rem, 18vw, 22rem)' }}
            >
              <span dangerouslySetInnerHTML={{ __html: content.heroLine1 }}></span>
              <br />
              <span dangerouslySetInnerHTML={{ __html: content.heroLine2 }}></span>
            </h1>
          </motion.div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
            <div className="w-px h-24 bg-gradient-to-b from-accent to-transparent"></div>
            <span className="text-[10px] tracking-[0.6em] uppercase font-bold">Explore</span>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-40 px-12 max-w-full">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              {content.introHeading}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="content-text mt-12 max-w-4xl"
            >
              {content.introDesc}
            </motion.p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-40 px-12 bg-zinc-950/30">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
            <div>
              <h2 className="section-title">{content.aboutTitle}</h2>
            </div>
            <div className="space-y-12">
              <p className="content-text">
                {content.aboutText}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 border border-white/5 bg-white/[0.02] rounded-sm group hover:border-accent/30 transition-colors">
                  <h4 className="text-accent text-xs font-black tracking-[0.3em] mb-4 uppercase">AI Production</h4>
                  <p className="text-white/40 text-sm leading-relaxed">High-fidelity AI generated video and image assets for modern brands.</p>
                </div>
                <div className="p-8 border border-white/5 bg-white/[0.02] rounded-sm group hover:border-accent/30 transition-colors">
                  <h4 className="text-accent text-xs font-black tracking-[0.3em] mb-4 uppercase">Efficient Design</h4>
                  <p className="text-white/40 text-sm leading-relaxed">Trendy and fast design systems optimized for digital impact.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="py-40 px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="section-title">{content.workTitle}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-24">
              {content.projects.map((project) => (
                <motion.div 
                  key={project.id}
                  whileHover={{ y: -15 }}
                  className="group relative aspect-[16/10] bg-zinc-900 overflow-hidden rounded-sm border border-white/5"
                >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-all duration-1000 grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-12 translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                    <p className="text-accent text-[10px] font-black tracking-[0.4em] mb-3">{project.category} 0{project.id}</p>
                    <h3 className="text-3xl font-black tracking-tighter uppercase">{project.title}</h3>
                    <div className="mt-6 flex items-center gap-3 text-white/40 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      View Project <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-40 px-12 bg-zinc-950/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="section-title">{content.blogTitle}</h2>
            
            <div className="mt-24 space-y-1">
              {content.blogPosts.map((post, i) => (
                <div key={post.id} className="group flex flex-col md:flex-row gap-12 items-center py-16 border-b border-white/5 hover:bg-white/[0.02] px-12 transition-all">
                  <div className="text-accent font-black text-2xl italic opacity-30 group-hover:opacity-100 transition-opacity">0{i + 1}</div>
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                  </div>
                  <div className="text-white/20 text-xs font-bold tracking-[0.3em] uppercase">{post.date}</div>
                  <ChevronRight className="text-white/10 group-hover:text-accent transition-colors group-hover:translate-x-2" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-40 px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
            <div>
              <h2 className="section-title">{content.contactTitle}</h2>
              <p className="content-text mt-12 max-w-md">
                당신의 비전을 AI 기술로 현실화합니다. 지금 바로 문의하세요.
              </p>
            </div>

            <form 
              action="https://formspree.io/f/mojknnog" 
              method="POST"
              className="space-y-10"
            >
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black ml-1">Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="w-full bg-transparent border-b border-white/10 py-5 focus:outline-none focus:border-accent transition-colors text-xl font-light"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black ml-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full bg-transparent border-b border-white/10 py-5 focus:outline-none focus:border-accent transition-colors text-xl font-light"
                  placeholder="Your Email"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black ml-1">Message</label>
                <textarea 
                  name="message"
                  rows={4}
                  required
                  className="w-full bg-transparent border-b border-white/10 py-5 focus:outline-none focus:border-accent transition-colors text-xl font-light resize-none"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="bg-accent text-black font-black py-6 px-16 rounded-sm hover:bg-white transition-all flex items-center gap-6 group uppercase tracking-[0.2em] text-sm shadow-[0_0_30px_rgba(3,244,221,0.2)]"
              >
                Send Message
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-32 px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">
          <div className="text-3xl font-black tracking-tighter text-white/80 uppercase">
            {content.siteName}
          </div>
          
          <button 
            onClick={() => setIsAdmin(true)}
            className="text-[10px] text-zinc-900 hover:text-zinc-700 transition-colors tracking-[0.6em] uppercase font-black"
          >
            Admin Login
          </button>
        </div>
      </footer>
    </div>
  );
}

// --- Admin Dashboard Component ---

function AdminDashboard({ 
  content, 
  setContent, 
  onExit 
}: { 
  content: SiteContent, 
  setContent: (c: SiteContent) => void,
  onExit: () => void 
}) {
  const [localContent, setLocalContent] = useState(content);
  const [activeTab, setActiveTab] = useState<'content' | 'messages' | 'fonts'>('content');

  const handleSave = () => {
    setContent(localContent);
    alert('Site content updated successfully.');
  };

  const updateField = (key: keyof SiteContent, value: any) => {
    setLocalContent(prev => ({ ...prev, [key]: value }));
  };

  const updateProject = (id: number, field: keyof Project, value: string) => {
    const newProjects = localContent.projects.map(p => p.id === id ? { ...p, [field]: value } : p);
    updateField('projects', newProjects);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex cursor-auto">
      {/* Sidebar */}
      <aside className="w-80 border-r border-white/5 flex flex-col bg-black">
        <div className="p-12 border-b border-white/5">
          <h2 className="text-xs tracking-[0.4em] font-black text-accent uppercase">LAB CONTROL</h2>
        </div>
        <nav className="flex-1 p-8 space-y-3">
          <button 
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center gap-5 px-6 py-5 rounded-sm transition-all ${activeTab === 'content' ? 'bg-accent text-black shadow-[0_0_30px_rgba(3,244,221,0.3)]' : 'text-white/40 hover:bg-white/5'}`}
          >
            <LayoutDashboard size={22} />
            <span className="text-xs font-black uppercase tracking-widest">Content</span>
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center gap-5 px-6 py-5 rounded-sm transition-all ${activeTab === 'messages' ? 'bg-accent text-black shadow-[0_0_30px_rgba(3,244,221,0.3)]' : 'text-white/40 hover:bg-white/5'}`}
          >
            <Mail size={22} />
            <span className="text-xs font-black uppercase tracking-widest">Inquiries</span>
          </button>
          <button 
            onClick={() => setActiveTab('fonts')}
            className={`w-full flex items-center gap-5 px-6 py-5 rounded-sm transition-all ${activeTab === 'fonts' ? 'bg-accent text-black shadow-[0_0_30px_rgba(3,244,221,0.3)]' : 'text-white/40 hover:bg-white/5'}`}
          >
            <TypeIcon size={22} />
            <span className="text-xs font-black uppercase tracking-widest">Fonts</span>
          </button>
        </nav>
        <div className="p-8 border-t border-white/5">
          <button 
            onClick={onExit}
            className="w-full flex items-center gap-5 px-6 py-5 text-red-500/60 hover:text-red-500 hover:bg-red-500/5 rounded-sm transition-all"
          >
            <LogOut size={22} />
            <span className="text-xs font-black uppercase tracking-widest">Exit Lab</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-24 border-b border-white/5 px-12 flex items-center justify-between bg-black/40 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex items-center gap-4 text-white/30 text-[11px] uppercase tracking-[0.4em] font-black">
            <FileText size={16} />
            <span>Dashboard / {activeTab.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-8">
            <button 
              onClick={onExit}
              className="text-[11px] font-black text-white/40 hover:text-white transition-colors flex items-center gap-3 uppercase tracking-widest"
            >
              <Eye size={16} /> Preview
            </button>
            <button 
              onClick={handleSave}
              className="bg-accent text-black px-10 py-4 rounded-sm text-[11px] font-black hover:bg-white transition-all flex items-center gap-3 uppercase tracking-widest shadow-[0_0_30px_rgba(3,244,221,0.2)]"
            >
              <Save size={16} /> Update Site
            </button>
          </div>
        </header>

        <div className="p-16 max-w-6xl">
          {activeTab === 'content' ? (
            <div className="space-y-20">
              <section className="space-y-12">
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-14 h-14 rounded-sm bg-accent/10 flex items-center justify-center text-accent border border-accent/20">
                    <Edit3 size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Global Content</h3>
                    <p className="text-[11px] text-white/30 uppercase tracking-widest mt-2">Modify all text strings across the interface.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-12">
                  {/* Hero Section */}
                  <div className="space-y-8 p-10 bg-zinc-900/50 rounded-sm border border-white/5">
                    <h4 className="text-[11px] uppercase tracking-[0.5em] text-accent font-black">Hero Section (Massive Text)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] text-white/30 uppercase tracking-widest font-black">Line 1</label>
                        <input 
                          value={localContent.heroLine1} 
                          onChange={(e) => updateField('heroLine1', e.target.value)}
                          className="w-full bg-black border border-white/10 rounded-sm px-5 py-4 text-sm focus:border-accent outline-none font-mono"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] text-white/30 uppercase tracking-widest font-black">Line 2</label>
                        <input 
                          value={localContent.heroLine2} 
                          onChange={(e) => updateField('heroLine2', e.target.value)}
                          className="w-full bg-black border border-white/10 rounded-sm px-5 py-4 text-sm focus:border-accent outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Intro Section */}
                  <div className="space-y-8 p-10 bg-zinc-900/50 rounded-sm border border-white/5">
                    <h4 className="text-[11px] uppercase tracking-[0.5em] text-accent font-black">Intro & Descriptions</h4>
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-[10px] text-white/30 uppercase tracking-widest font-black">Main Heading</label>
                        <input 
                          value={localContent.introHeading} 
                          onChange={(e) => updateField('introHeading', e.target.value)}
                          className="w-full bg-black border border-white/10 rounded-sm px-5 py-4 text-sm focus:border-accent outline-none"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] text-white/30 uppercase tracking-widest font-black">Korean Description</label>
                        <textarea 
                          value={localContent.introDesc} 
                          onChange={(e) => updateField('introDesc', e.target.value)}
                          rows={4}
                          className="w-full bg-black border border-white/10 rounded-sm px-5 py-4 text-sm focus:border-accent outline-none resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Work Section */}
                  <div className="space-y-8 p-10 bg-zinc-900/50 rounded-sm border border-white/5">
                    <h4 className="text-[11px] uppercase tracking-[0.5em] text-accent font-black">Work Portfolio</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {localContent.projects.map((project) => (
                        <div key={project.id} className="p-6 bg-black border border-white/5 rounded-sm space-y-4">
                          <div className="space-y-2">
                            <label className="text-[9px] text-white/20 uppercase font-black">Title</label>
                            <input 
                              value={project.title} 
                              onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                              className="w-full bg-zinc-900 border border-white/5 rounded-sm px-4 py-2 text-xs focus:border-accent outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] text-white/20 uppercase font-black">Category</label>
                            <input 
                              value={project.category} 
                              onChange={(e) => updateProject(project.id, 'category', e.target.value)}
                              className="w-full bg-zinc-900 border border-white/5 rounded-sm px-4 py-2 text-xs focus:border-accent outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Blog Section */}
                  <div className="space-y-8 p-10 bg-zinc-900/50 rounded-sm border border-white/5">
                    <h4 className="text-[11px] uppercase tracking-[0.5em] text-accent font-black">Blog Posts</h4>
                    <div className="space-y-6">
                      {localContent.blogPosts.map((post) => (
                        <div key={post.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-black border border-white/5 rounded-sm">
                          <div className="space-y-2">
                            <label className="text-[9px] text-white/20 uppercase font-black">Post Title</label>
                            <input 
                              value={post.title} 
                              onChange={(e) => {
                                const newPosts = localContent.blogPosts.map(p => p.id === post.id ? { ...p, title: e.target.value } : p);
                                updateField('blogPosts', newPosts);
                              }}
                              className="w-full bg-zinc-900 border border-white/5 rounded-sm px-4 py-2 text-xs focus:border-accent outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] text-white/20 uppercase font-black">Date</label>
                            <input 
                              value={post.date} 
                              onChange={(e) => {
                                const newPosts = localContent.blogPosts.map(p => p.id === post.id ? { ...p, date: e.target.value } : p);
                                updateField('blogPosts', newPosts);
                              }}
                              className="w-full bg-zinc-900 border border-white/5 rounded-sm px-4 py-2 text-xs focus:border-accent outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ) : activeTab === 'messages' ? (
            <div className="space-y-12">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-14 h-14 rounded-sm bg-accent/10 flex items-center justify-center text-accent border border-accent/20">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Inquiry Log</h3>
                  <p className="text-[11px] text-white/30 uppercase tracking-widest mt-2">Manage messages received via Formspree.</p>
                </div>
              </div>

              <div className="space-y-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-8 bg-zinc-900/50 border border-white/5 rounded-sm flex items-start gap-8 group hover:border-accent/30 transition-all">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/20">
                      <User size={24} />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-black uppercase tracking-widest">Client Name {i}</h4>
                        <span className="text-[10px] text-white/20 uppercase font-bold">Today, 14:20</span>
                      </div>
                      <p className="text-xs text-accent/80 font-mono">client{i}@example.com</p>
                      <p className="text-xs text-white/50 leading-relaxed max-w-3xl">
                        This is a simulated message from the contact form. In a production environment, you would manage these via your Formspree dashboard or a custom API integration.
                      </p>
                    </div>
                    <button className="p-3 text-white/10 hover:text-accent transition-colors">
                      <MessageSquare size={22} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-16">
              <div className="flex items-center gap-6 mb-12">
                <div className="w-14 h-14 rounded-sm bg-accent/10 flex items-center justify-center text-accent border border-accent/20">
                  <Upload size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Typography Lab</h3>
                  <p className="text-[11px] text-white/30 uppercase tracking-widest mt-2">Upload custom font assets to override site styles.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="p-16 border-2 border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center gap-8 bg-white/[0.01] hover:bg-white/[0.03] transition-all group cursor-pointer">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:text-accent group-hover:bg-accent/10 transition-all">
                    <Upload size={40} />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-black uppercase tracking-[0.3em] mb-3">Drop .TTF / .WOFF</p>
                    <p className="text-[10px] text-white/20 uppercase tracking-widest">Maximum file size: 10MB</p>
                  </div>
                </div>

                <div className="space-y-8 p-10 bg-zinc-900/50 rounded-sm border border-white/5">
                  <h4 className="text-[11px] uppercase tracking-[0.5em] text-accent font-black">Active Typography</h4>
                  <div className="space-y-5">
                    <div className="flex items-center justify-between p-5 bg-black border border-white/5 rounded-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/5 flex items-center justify-center text-[11px] font-black">Aa</div>
                        <span className="text-xs font-black uppercase tracking-widest">Inter (Default)</span>
                      </div>
                      <span className="text-[10px] text-accent uppercase font-black">System</span>
                    </div>
                    <div className="flex items-center justify-between p-5 bg-black border border-white/5 rounded-sm opacity-40">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/5 flex items-center justify-center text-[11px] font-black">Ab</div>
                        <span className="text-xs font-black uppercase tracking-widest">Custom Font 01</span>
                      </div>
                      <span className="text-[10px] text-white/20 uppercase font-black">Inactive</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
