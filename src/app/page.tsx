"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */
const PROJECTS = [
  {
    name: "BilChat",
    tagline: "AI Educational Platform",
    impact: "Full-stack AI platform used by ~50 teachers. 20,000+ lines. Sole developer.",
    story: "BilFen Schools needed a way to generate curriculum-aligned content with AI. I built BilChat from scratch — RAG pipeline over Turkey's K-12 curriculum, multi-agent AI system, homework scanner processing ~300 assignments/week, and a real-time quiz game adopted by 15+ classrooms.",
    tech: ["React 19", "TypeScript", "FastAPI", "Supabase", "pgvector", "Gemini", "Docker"],
    metrics: "20,000+ LOC · ~50 teachers · ~60% less prep time",
    link: "https://bi-lgenerator.vercel.app/",
    visual: { type: "video" as const, src: "/videos/bilchat.mp4", poster: "/images/bilchat-1.png" },
  },
  {
    name: "RAG Pipeline Evaluation",
    tagline: "IEEE Conference Paper",
    impact: "Compared 3 RAG architectures across 20+ metrics. Co-authored IEEE conference paper.",
    story: "Capstone research evaluating how embedding and retrieval choices affect chatbot accuracy, speed, and safety. Best architecture achieved 86.2 F1 with only 0.77% hallucination rate. Fastest hit 13ms latency at 75 QPS.",
    tech: ["Python", "PyTorch", "FAISS", "HuggingFace", "ColBERT", "NVIDIA A100"],
    metrics: "86.2 F1 · 0.77% hallucination · 13ms latency",
    link: "/Conferencebulut_.pdf",
    visual: { type: "svg" as const, src: "/images/rag.svg" },
  },
  {
    name: "YoloMode",
    tagline: "VS Code Extension",
    impact: "Developer automation tool. 3,800+ downloads, 5-star rating. v3.1.1.",
    story: "YoloMode auto-accepts everything in Gemini CLI — agent steps, terminal commands, code edits. Uses Chrome DevTools Protocol to accept steps directly. Hands-free YOLO mode for agentic development.",
    tech: ["TypeScript", "VS Code API", "CDP Protocol"],
    metrics: "3,800+ downloads · 5-star rating",
    link: "https://marketplace.visualstudio.com/items?itemName=mrkeles61.yolomode",
    visual: { type: "svg" as const, src: "/images/yolomode.svg" },
  },
  {
    name: "Email Outreach Automation",
    tagline: "Agentic AI System",
    impact: "Agentic email system. 1,500+ emails/week, 11% response rate.",
    story: "Built an end-to-end outreach pipeline using Claude Code as the AI brain and Google Apps Script for delivery. Auto follow-ups, reply detection, analytics dashboard. Deployed for university sponsorship campaigns.",
    tech: ["Claude Code", "Apps Script", "Google Workspace"],
    metrics: "1,500+ emails/wk · 11% response · ~2% spam",
    link: "#",
    visual: { type: "svg" as const, src: "/images/email.svg" },
  },
  {
    name: "WellWorks Turkey",
    tagline: "Freelance Client Project",
    impact: "23-page React SPA. Built ~70% faster using AI-augmented development.",
    story: "Dual-brand pharmacy website with store locator, pre-rendered pages for SEO. Built with Claude Code agentic workflow — demonstrating how AI tools accelerate real client delivery.",
    tech: ["React", "Vite", "Tailwind CSS", "Leaflet", "Vercel"],
    metrics: "23-page SPA · ~70% faster dev",
    link: "https://wellworksturkey.com",
    visual: { type: "video" as const, src: "/videos/wellworks.mp4", poster: "/images/wellworks-1.png" },
  },
];

const EXPERIENCE = [
  { period: "2025 – 2026", title: "Software Developer", company: "BilFen Schools, Istanbul", desc: "Sole developer of BilChat AI platform" },
  { period: "2024 – now", title: "Freelance Web Developer", company: "Remote", desc: "AI-augmented development with Claude Code" },
  { period: "2025", title: "Erasmus+ Exchange", company: "HKA Karlsruhe, Germany", desc: "ML, Agile, AI coursework" },
  { period: "2022 – 2026", title: "B.Sc. Computer Engineering", company: "Istanbul Kültür University", desc: "Capstone: RAG Pipeline Evaluation (IEEE paper)" },
];

const TECH = [
  { category: "AI / Automation", skills: "Agentic AI, RAG Pipelines, LLM Integration, Multi-Agent Systems" },
  { category: "Frontend", skills: "React 19, TypeScript, Tailwind CSS, Framer Motion, GSAP" },
  { category: "Backend", skills: "FastAPI, Express.js, Supabase, PostgreSQL, Redis, Docker" },
  { category: "Tools", skills: "VS Code Extension Dev, Git, Vercel, FAISS, HuggingFace" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/mrkeles61" },
  { label: "LinkedIn", href: "https://linkedin.com/in/erenkeles615" },
  { label: "Resume", href: "/Eren_Keles_Resume_EN.pdf" },
  { label: "Email", href: "mailto:eren@keles.dev" },
];

/* ═══════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════ */
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
        document.querySelectorAll("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          });
        });
      } catch {}
    })();
  }, []);
}

/* ═══════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastY.current && y > 200);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0C0A09]/80 backdrop-blur-md border-b border-[#292524]" : ""}`}
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-lg font-bold tracking-tight text-[#FAFAF9]">EK</button>
        <div className="flex items-center gap-6 text-sm text-[#A8A29E]">
          {[["Work", "work"], ["Experience", "experience"], ["Contact", "contact"]].map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} className="hidden transition-colors hover:text-[#F97316] sm:block">{label}</button>
          ))}
          <a href="/Eren_Keles_Resume_EN.pdf" target="_blank" className="rounded-full border border-[#44403C] px-3 py-1 text-[#FAFAF9] transition-all hover:border-[#F97316] hover:text-[#F97316]">Resume ↗</a>
        </div>
      </nav>
    </motion.header>
  );
}

function Hero() {
  const name = "Eren Keleş";
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-20">
      {/* Subtle warm radial glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" style={{ background: "radial-gradient(ellipse, #F97316, transparent 70%)" }} />
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="flex flex-wrap" style={{ letterSpacing: "-3px" }}>
          {name.split("").map((c, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 50, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.5, delay: 0.15 + i * 0.04, ease: "easeOut" }} className="inline-block text-[clamp(48px,10vw,96px)] font-black text-[#FAFAF9]">
              {c === " " ? "\u00A0" : c}
            </motion.span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="mt-4 text-xl font-medium text-[#F97316] md:text-2xl">
          AI Developer & Automation Engineer
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }} className="mt-6 max-w-2xl text-lg leading-relaxed text-[#A8A29E]">
          I build AI systems that ship — from a 20,000-line platform serving 50+ teachers to published research. Currently seeking an Erasmus+ traineeship in Europe.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }} className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full bg-[#F97316] px-6 py-2.5 text-sm font-semibold text-[#0C0A09] transition-all hover:bg-[#FB923C]">View Work ↓</button>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="rounded-full border border-[#44403C] px-5 py-2.5 text-sm text-[#A8A29E] transition-all hover:border-[#F97316] hover:text-[#FAFAF9]">{s.label}</a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / 1500, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function ProofBar() {
  return (
    <section className="border-y border-[#292524] py-12" data-reveal>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 px-6 text-center md:gap-16">
        {[
          { n: 20000, s: "+", label: "lines of code shipped" },
          { n: 3800, s: "+", label: "extension downloads" },
          { n: 86, s: ".2", label: "F1 score (IEEE paper)" },
        ].map((d) => (
          <div key={d.label} className="space-y-1">
            <p className="font-mono text-3xl font-bold text-[#FAFAF9] md:text-4xl"><CountUp target={d.n} suffix={d.s} /></p>
            <p className="text-sm text-[#78716C]">{d.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectVisual({ project }: { project: (typeof PROJECTS)[0] }) {
  const ref = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.3 });
  useEffect(() => {
    if (project.visual.type !== "video" || !ref.current) return;
    if (inView) ref.current.play().catch(() => {});
    else ref.current.pause();
  }, [inView, project.visual.type]);

  return (
    <div ref={containerRef} className="overflow-hidden rounded-xl bg-[#1C1917] ring-1 ring-[#292524] transition-transform duration-500 group-hover:scale-[1.02]">
      {project.visual.type === "video" ? (
        <video ref={ref} src={project.visual.src} poster={project.visual.poster} muted loop playsInline className="aspect-video w-full object-cover" />
      ) : (
        <img src={project.visual.src} alt={project.name} className="aspect-video w-full object-cover" />
      )}
    </div>
  );
}

function Projects() {
  return (
    <section id="work" className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#F97316]" data-reveal>Selected Work</p>
        <h2 className="mt-2 text-4xl font-bold text-[#FAFAF9] md:text-5xl" data-reveal>Projects</h2>
        <div className="mt-20 space-y-32">
          {PROJECTS.map((p, i) => (
            <div key={p.name} className={`group grid items-center gap-12 md:grid-cols-2 ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`} data-reveal>
              <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}><ProjectVisual project={p} /></div>
              <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
                <p className="font-mono text-xs uppercase tracking-widest text-[#78716C]">{p.tagline}</p>
                <h3 className="mt-2 text-2xl font-bold text-[#FAFAF9] md:text-3xl">{p.name}</h3>
                <p className="mt-2 font-mono text-sm text-[#F97316]">{p.metrics}</p>
                <p className="mt-4 leading-relaxed text-[#A8A29E]">{p.story}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (<span key={t} className="rounded-md bg-[#292524] px-2 py-0.5 font-mono text-[11px] text-[#A8A29E]">{t}</span>))}
                </div>
                {p.link !== "#" && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#F97316] transition-colors hover:text-[#FB923C]">
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
    <section id="experience" className="border-t border-[#292524] py-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#F97316]" data-reveal>Background</p>
        <h2 className="mt-2 text-4xl font-bold text-[#FAFAF9] md:text-5xl" data-reveal>Experience</h2>
        <div className="mt-16 space-y-0">
          {EXPERIENCE.map((e, i) => (
            <div key={i} className="grid gap-4 border-b border-[#292524] py-8 md:grid-cols-[180px_1fr]" data-reveal>
              <p className="font-mono text-sm text-[#F97316]">{e.period}</p>
              <div>
                <h3 className="text-lg font-semibold text-[#FAFAF9]">{e.title}</h3>
                <p className="text-[#A8A29E]">{e.company}</p>
                <p className="mt-1 text-sm text-[#78716C]">{e.desc}</p>
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
    <section className="border-t border-[#292524] py-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#F97316]" data-reveal>Toolkit</p>
        <h2 className="mt-2 text-4xl font-bold text-[#FAFAF9] md:text-5xl" data-reveal>Tech Stack</h2>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {TECH.map((t) => (
            <div key={t.category} className="rounded-xl border border-[#292524] bg-[#1C1917]/50 p-6" data-reveal>
              <h3 className="font-mono text-sm font-medium uppercase tracking-widest text-[#F97316]">{t.category}</h3>
              <p className="mt-3 leading-relaxed text-[#A8A29E]">{t.skills}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-[#292524] py-32">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-4xl font-bold text-[#FAFAF9] md:text-5xl" data-reveal>Let&apos;s work together</h2>
        <p className="mt-4 text-lg text-[#A8A29E]" data-reveal>Seeking Erasmus+ traineeship in AI/automation in Europe — Summer 2026</p>
        <a href="mailto:eren@keles.dev" className="mt-8 inline-block rounded-full bg-[#F97316] px-8 py-3 text-lg font-semibold text-[#0C0A09] transition-all hover:bg-[#FB923C] hover:scale-105" data-reveal>eren@keles.dev</a>
        <div className="mt-8 flex flex-wrap justify-center gap-4" data-reveal>
          {SOCIALS.filter((s) => s.label !== "Email").map((s) => (
            <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="rounded-full border border-[#44403C] px-5 py-2 text-sm text-[#A8A29E] transition-all hover:border-[#F97316] hover:text-[#FAFAF9]">{s.label} →</a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#292524] py-8">
      <div className="mx-auto max-w-6xl px-6 text-center text-sm text-[#78716C]">© 2026 Eren Keleş · Built with Next.js</div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */
export default function Home() {
  useLenis();
  useGsapReveal();
  return (
    <>
      <Nav />
      <Hero />
      <ProofBar />
      <Projects />
      <Experience />
      <TechStack />
      <Contact />
      <Footer />
    </>
  );
}
