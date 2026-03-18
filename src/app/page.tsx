"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false, loading: () => <div className="h-[300px] w-[300px]" /> },
);

/* ═══ DATA ═══ */
const PROJECTS = [
  {
    name: "BilChat",
    tagline: "AI Educational Platform",
    impact: "Full-stack AI platform used by ~50 teachers. 20,000+ lines. Sole developer.",
    story: "BilFen Schools needed a way to generate curriculum-aligned content with AI. I built BilChat from scratch — RAG pipeline over Turkey's K-12 curriculum, multi-agent AI system, homework scanner processing ~300 assignments/week, and a real-time quiz game adopted by 15+ classrooms.",
    tech: ["React 19", "TypeScript", "FastAPI", "Supabase", "pgvector", "Gemini", "Docker"],
    metrics: "20,000+ LOC · ~50 teachers · ~60% less prep time",
    link: "https://bi-lgenerator.vercel.app/",
    visual: { type: "video" as const, src: "/videos/bilchat.mp4", poster: "/videos/bilchat-poster.jpg" },
  },
  {
    name: "RAG Pipeline Evaluation",
    tagline: "IEEE Conference Paper",
    impact: "Compared 3 RAG architectures across 20+ metrics. Co-authored IEEE conference paper.",
    story: "Capstone research evaluating how embedding and retrieval choices affect chatbot accuracy, speed, and safety. Best architecture achieved 86.2 F1 with only 0.77% hallucination rate. Fastest hit 13ms latency at 75 QPS.",
    tech: ["Python", "PyTorch", "FAISS", "HuggingFace", "ColBERT", "NVIDIA A100"],
    metrics: "86.2 F1 · 0.77% hallucination · 13ms latency",
    link: "/Conferencebulut_.pdf",
    visual: { type: "image" as const, src: "/images/rag.svg" },
  },
  {
    name: "YoloMode",
    tagline: "VS Code Extension · \"Stop clicking Accept.\"",
    impact: "Developer automation tool. 3,800+ downloads, 5-star rating.",
    story: "Developer automation tool for Antigravity IDE and Agent Manager. Auto-accepts agent steps, terminal commands, and code edits — hands-free YOLO mode for agentic development. Uses Chrome DevTools Protocol to accept steps directly in the side panel.",
    tech: ["TypeScript", "VS Code API", "CDP Protocol"],
    metrics: "3,800+ downloads · 5-star · v3.1.1",
    link: "https://marketplace.visualstudio.com/items?itemName=mrkeles61.yolomode",
    visual: { type: "image" as const, src: "/images/yolomode.svg" },
  },
  {
    name: "Email Outreach Automation",
    tagline: "Agentic AI System",
    impact: "Agentic email system. 1,500+ emails/week, 11% response rate.",
    story: "Built an end-to-end outreach pipeline using Claude Code as the AI brain and Google Apps Script for delivery. Auto follow-ups, reply detection, analytics dashboard. Deployed for Haliç University — secured sponsorship deals.",
    tech: ["Claude Code", "Apps Script", "Google Workspace"],
    metrics: "1,500+ emails/wk · 11% response · ~2% spam",
    link: "#",
    visual: { type: "dashboard" as const },
  },
  {
    name: "WellWorks Turkey",
    tagline: "Freelance Client Project",
    impact: "23-page React SPA. Built ~70% faster using AI-augmented development.",
    story: "Dual-brand pharmacy website with store locator, pre-rendered pages for SEO. Built with Claude Code agentic workflow — demonstrating how AI tools accelerate real client delivery.",
    tech: ["React", "Vite", "Tailwind CSS", "Leaflet", "Vercel"],
    metrics: "23-page SPA · ~70% faster dev",
    link: "https://wellworksturkey.com",
    visual: { type: "video" as const, src: "/videos/wellworks.mp4", poster: "/videos/wellworks-poster.jpg" },
  },
];

const EXPERIENCE = [
  { period: "2025 – 2026", title: "Software Developer", company: "BilFen Schools, Istanbul", desc: "Sole developer of BilChat AI platform" },
  { period: "2024 – now", title: "Freelance Web Developer", company: "Remote", desc: "AI-augmented development with Claude Code" },
  { period: "2025", title: "Erasmus+ Exchange", company: "HKA Karlsruhe, Germany", desc: "ML, Agile, AI coursework" },
  { period: "2022 – 2026", title: "B.Sc. Computer Engineering", company: "Istanbul Kültür University", desc: "Capstone: RAG Pipeline Evaluation (IEEE paper)" },
];

const TECH = [
  { cat: "AI / Automation", skills: "Agentic AI, RAG Pipelines, LLM Integration, Multi-Agent Systems" },
  { cat: "Frontend", skills: "React 19, TypeScript, Tailwind CSS, Framer Motion, GSAP" },
  { cat: "Backend", skills: "FastAPI, Express.js, Supabase, PostgreSQL, Redis, Docker" },
  { cat: "Tools", skills: "VS Code Extension Dev, Git, Vercel, FAISS, HuggingFace" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/mrkeles61" },
  { label: "LinkedIn", href: "https://linkedin.com/in/erenkeles615" },
  { label: "Resume", href: "/Eren_Keles_Resume_EN.pdf" },
  { label: "Email", href: "mailto:eren@keles.dev" },
];

/* ═══ HOOKS ═══ */
function useLenis() {
  useEffect(() => {
    let l: any;
    (async () => {
      try {
        const Lenis = (await import("lenis")).default;
        l = new Lenis({ duration: 1.2 });
        const raf = (t: number) => { l.raf(t); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
      } catch {}
    })();
    return () => l?.destroy();
  }, []);
}

function useGsapReveal() {
  useEffect(() => {
    (async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        document.querySelectorAll("[data-reveal]").forEach((el, i) => {
          gsap.from(el, {
            y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
            delay: i * 0.02,
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          });
        });
      } catch {}
    })();
  }, []);
}

/* ═══ COMPONENTS ═══ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    const h = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastY.current && y > 200);
      lastY.current = y;
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const to = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-[#E7E5E4] bg-[#FFFBF5]/80 backdrop-blur-md" : ""}`}
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-lg font-bold tracking-tight text-[#1C1917]">EK</button>
        <div className="flex items-center gap-6 text-sm text-[#57534E]">
          {[["Work", "work"], ["Experience", "experience"], ["Contact", "contact"]].map(([l, id]) => (
            <button key={id} onClick={() => to(id)} className="hidden transition-colors hover:text-[#EA580C] sm:block">{l}</button>
          ))}
          <a href="/Eren_Keles_Resume_EN.pdf" target="_blank" className="rounded-full border border-[#E7E5E4] px-3.5 py-1 text-[#1C1917] transition-all hover:border-[#EA580C] hover:text-[#EA580C]">Resume ↗</a>
        </div>
      </nav>
    </motion.header>
  );
}

function Hero() {
  const name = "Eren Keleş";
  return (
    <section className="relative flex min-h-[90vh] flex-col justify-center px-6 pt-20">
      <div className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.15]" style={{ background: "radial-gradient(ellipse, #FFF1E0, transparent 70%)" }} />
      <div className="mx-auto grid w-full max-w-5xl items-center gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <h1 className="flex flex-wrap" style={{ letterSpacing: "-3px" }}>
            {name.split("").map((c, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 50, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.5, delay: 0.1 + i * 0.04, ease: "easeOut" }} className="inline-block text-[clamp(48px,10vw,72px)] font-black text-[#1C1917]">
                {c === " " ? "\u00A0" : c}
              </motion.span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="mt-3 text-xl font-medium text-[#EA580C] md:text-2xl">
            AI Developer & Automation Engineer
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }} className="mt-5 max-w-xl text-lg leading-relaxed text-[#57534E]">
            I build AI systems that ship — from a 20,000-line platform serving 50+ teachers to published research. Currently seeking an Erasmus+ traineeship in Europe.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full bg-[#EA580C] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#C2410C]">View Work ↓</button>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="rounded-full border border-[#E7E5E4] px-5 py-2.5 text-sm text-[#57534E] transition-all hover:border-[#EA580C] hover:text-[#EA580C]">{s.label}</a>
            ))}
          </motion.div>
        </div>
        {/* Lottie animation — hero character */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="hidden md:block">
          <DotLottieReact
            src="https://lottie.host/2cf110ee-77e0-4150-9a0f-3220965e2e4e/ZhpxkOPabs.lottie"
            loop
            autoplay
            style={{ width: 320, height: 320 }}
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══ EMAIL OUTREACH MOCK DASHBOARD ═══ */
function EmailDashboardMock() {
  return (
    <div className="rounded-2xl bg-[#1C1917] p-5 font-mono text-white shadow-lg sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-stone-400">Outreach Dashboard</p>
          <p className="text-sm font-medium">Haliç University Campaign</p>
        </div>
        <span className="rounded bg-green-500/20 px-2 py-0.5 text-[10px] text-green-400">Live</span>
      </div>
      <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { label: "Sent", val: "1,547", sub: "this week", color: "text-orange-400" },
          { label: "Opened", val: "623", sub: "40.3%", color: "text-orange-300" },
          { label: "Replied", val: "170", sub: "11%", color: "text-orange-200" },
          { label: "Spam", val: "31", sub: "~2%", color: "text-stone-300" },
        ].map((d) => (
          <div key={d.label} className="rounded-lg bg-stone-800 p-2.5">
            <p className="text-[10px] text-stone-400">{d.label}</p>
            <p className={`text-lg font-bold ${d.color}`}>{d.val}</p>
            <p className="text-[10px] text-stone-500">{d.sub}</p>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <p className="mb-1.5 text-[10px] text-stone-400">Daily send volume</p>
        <div className="flex items-end gap-[3px] h-14">
          {[65, 80, 45, 90, 72, 88, 95, 60, 85, 78, 92, 70, 88, 82].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-orange-500/60 transition-colors hover:bg-orange-400" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <div className="space-y-1.5">
        <p className="text-[10px] text-stone-400">Recent activity</p>
        {[
          { dot: "bg-green-400", text: "Reply from TechCorp GmbH — \"Interested, let's schedule...\"", time: "2m ago" },
          { dot: "bg-blue-400", text: "Opened by 3 recipients at DataFlow Systems", time: "15m ago" },
          { dot: "bg-orange-400", text: "Auto follow-up sent to 12 contacts (Day 3)", time: "1h ago" },
        ].map((a, i) => (
          <div key={i} className="flex items-center gap-2 text-[11px]">
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`} />
            <span className="truncate text-stone-300">{a.text}</span>
            <span className="ml-auto shrink-0 text-stone-500">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ PROJECT VISUAL ═══ */
function ProjectVisual({ project }: { project: (typeof PROJECTS)[0] }) {
  const ref = useRef<HTMLVideoElement>(null);
  const cRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cRef, { amount: 0.3 });
  useEffect(() => {
    if (project.visual.type !== "video" || !ref.current) return;
    if (inView) ref.current.play().catch(() => {});
    else ref.current.pause();
  }, [inView, project.visual.type]);

  return (
    <div ref={cRef} className="project-visual overflow-hidden rounded-2xl border border-[#E7E5E4] bg-[#FFF7ED] shadow-[0_8px_32px_rgba(234,88,12,0.06)]">
      {project.visual.type === "video" ? (
        <video ref={ref} src={project.visual.src} poster={project.visual.poster} muted loop playsInline preload="metadata" className="aspect-video w-full object-cover" />
      ) : project.visual.type === "dashboard" ? (
        <EmailDashboardMock />
      ) : (
        <img src={project.visual.src} alt={project.name} className="aspect-video w-full object-cover" loading="lazy" />
      )}
    </div>
  );
}

function Projects() {
  return (
    <section id="work" className="py-32">
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#EA580C]" data-reveal>Selected Work</p>
        <h2 className="mt-2 text-4xl font-bold text-[#1C1917] md:text-5xl" data-reveal>Projects</h2>
        <div className="mt-20 space-y-28">
          {PROJECTS.map((p, i) => (
            <div key={p.name} className={`project-card group grid items-center gap-10 rounded-2xl p-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(234,88,12,0.08)] md:grid-cols-2 ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`} data-reveal>
              <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}><ProjectVisual project={p} /></div>
              <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
                <p className="font-mono text-xs uppercase tracking-widest text-[#A8A29E]">{p.tagline}</p>
                <h3 className="mt-2 text-2xl font-bold text-[#1C1917] md:text-3xl">{p.name}</h3>
                <p className="mt-2 font-mono text-sm text-[#EA580C]">{p.metrics}</p>
                <p className="mt-4 leading-relaxed text-[#57534E]">{p.story}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => <span key={t} className="rounded-md bg-[#FFF1E0] px-2 py-0.5 font-mono text-[11px] text-[#57534E]">{t}</span>)}
                </div>
                {p.link !== "#" && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#EA580C] transition-colors hover:text-[#C2410C]">
                    {p.link.endsWith(".pdf") ? "Read Paper →" : "View Live →"}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="border-t border-[#E7E5E4] bg-[#FFF7ED] py-32">
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#EA580C]" data-reveal>Background</p>
        <h2 className="mt-2 text-4xl font-bold text-[#1C1917] md:text-5xl" data-reveal>Experience</h2>
        <div className="mt-16">
          {EXPERIENCE.map((e, i) => (
            <div key={i} className="grid gap-4 border-b border-[#E7E5E4] py-8 md:grid-cols-[180px_1fr]" data-reveal>
              <p className="font-mono text-sm text-[#EA580C]">{e.period}</p>
              <div>
                <h3 className="text-lg font-semibold text-[#1C1917]">{e.title}</h3>
                <p className="text-[#57534E]">{e.company}</p>
                <p className="mt-1 text-sm text-[#A8A29E]">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStack() {
  return (
    <section className="border-t border-[#E7E5E4] py-32">
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#EA580C]" data-reveal>Toolkit</p>
        <h2 className="mt-2 text-4xl font-bold text-[#1C1917] md:text-5xl" data-reveal>Tech Stack</h2>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {TECH.map((t) => (
            <div key={t.cat} className="rounded-xl border border-[#E7E5E4] bg-[#FFF7ED]/50 p-6" data-reveal>
              <h3 className="font-mono text-sm font-medium uppercase tracking-widest text-[#EA580C]">{t.cat}</h3>
              <p className="mt-3 leading-relaxed text-[#57534E]">{t.skills}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-[#1C1917] py-32">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-4xl font-bold text-[#FAFAF9] md:text-5xl" data-reveal>Let&apos;s work together</h2>
        <p className="mt-4 text-lg text-[#A8A29E]" data-reveal>Seeking Erasmus+ traineeship in AI/automation in Europe — Summer 2026</p>
        <a href="mailto:eren@keles.dev" className="mt-8 inline-block rounded-full bg-[#EA580C] px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-[#F97316] hover:scale-105" data-reveal>eren@keles.dev</a>
        <div className="mt-8 flex flex-wrap justify-center gap-4" data-reveal>
          {SOCIALS.filter((s) => s.label !== "Email").map((s) => (
            <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="rounded-full border border-[#44403C] px-5 py-2 text-sm text-[#A8A29E] transition-all hover:border-[#EA580C] hover:text-[#FAFAF9]">{s.label} →</a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#292524] bg-[#1C1917] py-8">
      <div className="mx-auto max-w-5xl px-6 text-center text-sm text-[#78716C]">© 2026 Eren Keleş · Built with Next.js</div>
    </footer>
  );
}

/* ═══ PAGE ═══ */
export default function Home() {
  useLenis();
  useGsapReveal();
  return (
    <>
      <Nav />
      <Hero />
      <Projects />
      <Experience />
      <TechStack />
      <Contact />
      <Footer />
    </>
  );
}
