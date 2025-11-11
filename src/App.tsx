import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Github, Linkedin, Mail, Music4, Award, Briefcase, ExternalLink, Piano, Mic2, Youtube, Instagram, MapPin, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import profileData from "./data/profile.json";
import projectsData from "./data/projects.json";
import awardsData from "./data/awards.json";
import activitiesData from "./data/activities.json";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";

// -----------------------------
// Data
// -----------------------------
const ICON_MAP = {
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  instagram: Instagram,
  piano: Piano,
  mic: Mic2,
  music: Music4,
} satisfies Record<string, LucideIcon>;

type IconKey = keyof typeof ICON_MAP;

type Profile = {
  name: string;
  role: string;
  headline: string;
  blurb: string;
  location: string;
  email: string;
  heroImage: string;
  social: { label: string; icon: IconKey; href: string }[];
  keywords: string[];
  skills?: { category: string; items: { name: string; level: string }[] }[];
};

type Project = {
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  links: { label: string; href: string }[];
  image: string;
};

type Award = {
  title: string;
  org: string;
  year: string;
  notes: string;
};

type Activity = {
  title: string;
  icon: IconKey;
  items: string[];
};

const PROFILE = profileData as Profile;
const PROJECTS = projectsData as Project[];
const AWARDS = awardsData as Award[];
const ACTIVITIES = activitiesData as Activity[];

// Auto-scrolling marquee carousel for the hero/profile section
const CAROUSEL_ITEM_HEIGHT = 320;
const AutoProjectMarquee = ({ projects }: { projects: Project[] }) => {
  const marqueeProjects = React.useMemo(() => [...projects, ...projects], [projects]);
  const totalHeight = React.useMemo(() => projects.length * CAROUSEL_ITEM_HEIGHT, [projects.length]);

  if (!projects.length) return null;

  return (
    <div className="relative h-[520px] overflow-hidden">
      <motion.div
        className="flex flex-col gap-6"
        animate={{ y: [0, -totalHeight] }}
        transition={{
          duration: Math.max(projects.length * 7, 16),
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {marqueeProjects.map((project, idx) => (
          <div
            key={`${project.title}-${idx}`}
            className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/85 dark:bg-white/10 backdrop-blur px-6 md:px-7 py-6 shadow-lg flex flex-col gap-5"
          >
            <div
              className="h-40 md:h-44 rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden bg-gray-200/40 dark:bg-white/10"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.65), rgba(37,99,235,0.35)), url(${project.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={`${project.title}-${tag}-${idx}`} className="rounded-2xl px-3 py-1 text-xs md:text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div>
                <div className="font-heading text-xl md:text-2xl tracking-tight uppercase">
                  {project.title}
                </div>
                <div className="text-xs md:text-sm opacity-70 mt-1">
                  {project.subtitle}
                </div>
              </div>
              <p className="text-sm md:text-base opacity-80 leading-relaxed line-clamp-4">
                {project.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a key={`${project.title}-${link.label}-${idx}`} href={link.href} target="_blank" rel="noreferrer">
                  <Button variant="outline" size="sm" className="gap-2 rounded-2xl">
                    <ExternalLink size={14} />
                    {link.label}
                  </Button>
                </a>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/90 dark:from-black/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 dark:from-black/80 to-transparent" />
    </div>
  );
};

// Manual switch carousel for projects section
const ProjectCarousel = ({ projects }: { projects: Project[] }) => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!projects.length) {
      setIndex(0);
      return;
    }
    setIndex((prev) => (prev >= projects.length ? 0 : prev));
  }, [projects.length]);

  if (!projects.length) {
    return null;
  }

  const current = projects[index];
  const handlePrev = () => setIndex((idx) => (idx - 1 + projects.length) % projects.length);
  const handleNext = () => setIndex((idx) => (idx + 1) % projects.length);

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/40 backdrop-blur-md shadow-xl p-4 md:p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current.title}-${index}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-black/5 dark:border-white/10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.5), rgba(37,99,235,0.35)), url(${current.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

              <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                {current.tags.map((tag) => (
                  <Badge key={`${current.title}-${tag}`} className="rounded-2xl px-3 py-1 text-[10px] md:text-xs bg-white/80 backdrop-blur text-slate-900">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="absolute left-4 right-4 bottom-4 space-y-1.5 text-white">
                <div className="font-heading text-xl md:text-2xl tracking-tight uppercase leading-tight line-clamp-2 drop-shadow">{current.title}</div>
                <div className="text-xs md:text-sm text-white/80 line-clamp-2">{current.subtitle}</div>
              </div>

              {projects.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous project"
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 text-slate-800 hover:bg-white shadow"
                  >
                    <ChevronLeft size={16} className="mx-auto" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next project"
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 text-slate-800 hover:bg-white shadow"
                  >
                    <ChevronRight size={16} className="mx-auto" />
                  </button>
                </>
              )}
            </div>

            <div className="mt-4 space-y-3 text-slate-900 dark:text-white">
              <p className="text-sm md:text-base opacity-90 leading-relaxed line-clamp-5">{current.description}</p>
              <div className="flex flex-wrap gap-3">
                {current.links.map((link) => (
                  <a key={`${current.title}-${link.label}`} href={link.href} target="_blank" rel="noreferrer">
                    <Button variant="outline" size="sm" className="gap-2 rounded-2xl">
                      <ExternalLink size={14} />
                      {link.label}
                    </Button>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {projects.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {projects.map((_, idx) => (
            <button
              key={`indicator-${idx}`}
              type="button"
              onClick={() => setIndex(idx)}
              aria-label={`Show project ${idx + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                idx === index
                  ? "bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.45)]"
                  : "bg-slate-300/80 dark:bg-white/20 hover:bg-blue-500/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// -----------------------------
// UI Helpers
// -----------------------------
const Section = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="w-full min-h-screen flex flex-col justify-center px-6 md:px-12 py-16"
  >
    {children}
  </motion.section>
);

const Title = ({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6">
    {icon && <div className="p-2 rounded-2xl bg-gray-100 dark:bg-white/10">{icon}</div>}
    <h2 className="font-heading text-3xl md:text-4xl tracking-[0.08em] uppercase">{children}</h2>
  </div>
);

// -----------------------------
// Main Component
// -----------------------------
// Sections now rendered sequentially (no tabs). Old TabKey/tabs removed.

export default function App() {
  // Force dark mode only.
  React.useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => {
      document.documentElement.classList.add("dark");
    };
  }, []);
  // Removed tab state; sections are always rendered in order.
  const [ripples, setRipples] = useState<number[]>([]);
  const [showAllProjects, setShowAllProjects] = useState(false);


  // Tab indicator logic removed.

  const handleProjectCircleClick = () => {
    const rippleId = Date.now();
    setRipples((prev) => [...prev, rippleId]);

    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    window.setTimeout(() => {
      setRipples((prev) => prev.filter((id) => id !== rippleId));
    }, 850);
  };

  // Map skill level to a percentage for a small visual indicator
  const skillLevelToPct = (level?: string) => {
    switch ((level || "").toLowerCase()) {
      case "expert":
        return 100;
      case "proficient":
        return 76;
      case "familiar":
        return 52;
      default:
        return 48;
    }
  };

  // Utility to sanitize a string for use in SVG ids
  const sanitizeId = (s?: string) => (s || "").replace(/[^a-zA-Z0-9-_]/g, "-");

  // Pick a small palette and try to infer a level for a keyword from PROFILE.skills
  const KEYWORD_PALETTES = [
    ["#2563EB", "#06B6D4"],
    ["#06B6D4", "#9333EA"],
    ["#F97316", "#F43F5E"],
    ["#10B981", "#059669"],
    ["#8B5CF6", "#06B6D4"],
    ["#F59E0B", "#EF4444"],
  ];

  const getKeywordMeta = (kw?: string) => {
    const k = (kw || "").trim();
    const lower = k.toLowerCase();

    // try to pull a level from PROFILE.skills by fuzzy matching
    let level: string | undefined;
    for (const cat of PROFILE.skills || []) {
      for (const item of cat.items || []) {
        const name = (item.name || "").toLowerCase();
        if (!name) continue;
        if (name.includes(lower) || lower.includes(name) || name.replace(/\W/g, "").includes(lower.replace(/\W/g, ""))) {
          level = item.level;
          break;
        }
      }
      if (level) break;
    }

    // pick a palette deterministically so the same keyword keeps the same color
    const palette = KEYWORD_PALETTES[k.length % KEYWORD_PALETTES.length];
    const bg = `linear-gradient(90deg, ${palette[0]}, ${palette[1]})`;
    return { bg, level };
  };

  // We'll render all categories as separate cards. Each card has its own manual prev/next controls for cycling skills.

  function CategoryCard({
    category,
    forcedIndex,
    onRequestIndex,
  }: {
    category: { category: string; items: { name: string; level: string }[] };
    // if provided, the card will show this index (controlled mode)
    forcedIndex?: number;
    // request to change shown index (used when prev/next clicked in controlled mode)
    onRequestIndex?: (newIndex: number) => void;
  }) {
    const items = category.items || [];
    const [index, setIndex] = React.useState(0);

  // Manual controls handled via handlePrev/handleNext below (or controlled by parent)

    const handlePrev = () => {
      const newIdx = ((forcedIndex ?? index) - 1 + items.length) % items.length;
      if (onRequestIndex) onRequestIndex(newIdx);
      else setIndex(newIdx);
    };

    const handleNext = () => {
      const newIdx = ((forcedIndex ?? index) + 1) % items.length;
      if (onRequestIndex) onRequestIndex(newIdx);
      else setIndex(newIdx);
    };

    const cur = items[forcedIndex ?? index];
    if (!cur) return null;

    const pct = skillLevelToPct(cur.level);
    // larger donut for clearer readability
    const r = 32;
    const c = 2 * Math.PI * r;
    const gid = sanitizeId(category.category || "cat");

    return (
      <div className="w-full justify-self-end">
        <div className="group relative rounded-2xl bg-white/80 dark:bg-black/20 p-4 w-[240px] md:w-[280px] shadow-md hover:shadow-2xl transition-transform transform hover:-translate-y-1">
          <div className="absolute -inset-px rounded-2xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-300">{category.category}</div>
            <div className="flex items-center gap-2">
              <button onClick={handlePrev} aria-label="Previous skill" className="p-1 rounded-md bg-white/70 dark:bg-black/10 border border-black/5 dark:border-white/6 hover:bg-white">
                <ChevronLeft size={14} />
              </button>
              <div className="text-xs opacity-60">{(forcedIndex ?? index) + 1}/{items.length}</div>
              <button onClick={handleNext} aria-label="Next skill" className="p-1 rounded-md bg-white/70 dark:bg-black/10 border border-black/5 dark:border-white/6 hover:bg-white">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={cur.name} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.32 }} className="mt-3 flex items-center gap-4">
              <svg width="84" height="84" viewBox="0 0 84 84" className="flex-none">
                <defs>
                  <linearGradient id={`g-${gid}`} x1="0%" x2="100%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                <g transform="translate(42,42)">
                  <circle r={r} fill="transparent" stroke="#eef2f7" strokeWidth={7} />
                  <motion.circle
                    r={r}
                    fill="transparent"
                    stroke={`url(#g-${gid})`}
                    strokeWidth={7}
                    strokeLinecap="round"
                    strokeDasharray={c}
                    initial={{ strokeDashoffset: c }}
                    animate={{ strokeDashoffset: c * (1 - pct / 100) }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  />
                  <text x="0" y="5" textAnchor="middle" className="font-semibold" style={{ fontSize: 13, fill: '#0f172a', opacity: 0.95 }}>{Math.round(pct)}%</text>
                </g>
              </svg>

              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{cur.name}</div>
                <div className="text-xs opacity-70 mt-1">{cur.level}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // --- Global autoplay across all category items (flattened sequence) ---
  const flattened = React.useMemo(() => {
    const arr: { catIdx: number; itemIdx: number }[] = [];
    (PROFILE.skills || []).forEach((cat, ci) => {
        (cat.items || []).forEach((_, ii) => arr.push({ catIdx: ci, itemIdx: ii }));
    });
    return arr;
  }, [PROFILE.skills]);

  const [flatIndex, setFlatIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (!flattened.length || paused) return;
    const id = window.setInterval(() => {
      setFlatIndex((i) => (i + 1) % flattened.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [flattened, paused]);

  const getForcedIndexForCat = (catIdx: number) => {
    const cur = flattened[flatIndex];
    return cur?.catIdx === catIdx ? cur.itemIdx : undefined;
  };

  const handleRequestIndex = (catIdx: number, newLocalIdx: number) => {
    const found = flattened.findIndex((e) => e.catIdx === catIdx && e.itemIdx === newLocalIdx);
    if (found >= 0) setFlatIndex(found);
  };

  const featuredCount = PROJECTS.length > 1 ? Math.min(3, PROJECTS.length - 1) : 1;
  const featuredProjects = PROJECTS.slice(0, featuredCount);
  const listProjects = PROJECTS.slice(featuredCount);
  const listPreviewCount = 4;
  const visibleProjects = showAllProjects ? listProjects : listProjects.slice(0, listPreviewCount);
  const canShowSeeMore = !showAllProjects && listProjects.length > listPreviewCount;

  // Build placeholder items to pad the list visually
  const minListCards = showAllProjects ? 6 : listPreviewCount;
  const placeholdersNeeded = Math.max(0, minListCards - visibleProjects.length);
  const placeholderProjects: Project[] = Array.from({ length: placeholdersNeeded }).map((_, i) => ({
    title: `Coming soon #${i + 1}`,
    subtitle: "Case study and repo in progress",
    tags: ["Placeholder"],
    description: "I rotate fresh showcases in as soon as the breakdowns are demo-ready. Check back for new builds soon.",
    links: [],
    image: "", // gradient-only background
  }));
  const displayProjects: Project[] = [...visibleProjects, ...placeholderProjects];

  

  return (
    <div className="min-h-screen transition-colors">
      {/* About Intro */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden w-full min-h-screen flex"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50 dark:from-black dark:via-black dark:to-slate-900" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/10" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-purple-200/40 blur-3xl dark:bg-purple-500/10" />
        </div>
  <div className="relative w-full px-6 md:px-12 py-24 md:py-32 flex items-center">
          <div className="grid gap-12 md:grid-cols-[1.1fr_.9fr] items-center w-full">
            <div className="flex flex-col justify-center gap-0 max-w-3xl mt-10 md:mt-35">
              <span className="font-heading text-sm md:text-base tracking-[0.1em] uppercase text-blue-600/80 dark:text-blue-400/80">
                {PROFILE.headline}
              </span>
              <div className="space-y-0">
                <h1 className="font-heading text-5xl md:text-7xl tracking-[0.06em] leading-none uppercase">
                  {PROFILE.name}
                </h1>
                <p className="text-xl md:text-2xl font-semibold tracking-tight text-blue-600/80 dark:text-blue-300/80">
                  {PROFILE.role}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {PROFILE.social.map((s) => {
                  const SocialIcon = ICON_MAP[s.icon];
                  return (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="inline-flex">
                      <Button variant="ghost" size="icon" className="rounded-2xl">
                        {SocialIcon && <SocialIcon size={18} />}
                        <span className="sr-only">{s.label}</span>
                      </Button>
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="hidden md:block">
              <AutoProjectMarquee projects={PROJECTS} />
            </div>
          </div>
          <div className="mt-10 md:mt-12 md:hidden">
            <AutoProjectMarquee projects={PROJECTS} />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-center">
          <motion.button
            type="button"
            aria-label="Scroll to projects"
            whileTap={{ scale: 0.88 }}
            onClick={handleProjectCircleClick}
            className="pointer-events-auto h-16 w-16 rounded-full bg-blue-600 text-white shadow-2xl flex items-center justify-center hover:bg-blue-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/60 transition-colors relative overflow-visible"
          >
            <ChevronDown size={28} />
            {ripples.map((ripple) => (
              <motion.span
                key={ripple}
                className="absolute inset-0 rounded-full border-2 border-blue-200"
                initial={{ opacity: 0.6, scale: 1 }}
                animate={{ opacity: 0, scale: 3.4 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
            ))}
          </motion.button>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full overflow-visible bg-transparent"
      >
        <div className="relative w-full px-6 md:px-12 py-12">
          <div className="w-full">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] items-start">
              {/* Left: About text and quick actions (wide, airy) */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="font-heading text-sm tracking-[0.18em] uppercase text-blue-600/80 dark:text-blue-400/80">About</span>
                  <p className="text-xl md:text-2xl leading-relaxed text-gray-800 dark:text-gray-200 max-w-none">{PROFILE.blurb}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {PROFILE.keywords.map((k, idx) => {
                    const meta = getKeywordMeta(k);
                    return (
                      <motion.div
                        key={k}
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: idx * 0.04, duration: 0.36 }}
                        className="inline-flex"
                      >
                        <div
                          title={meta.level ? `${meta.level} • ${k}` : k}
                          style={{ backgroundImage: meta.bg }}
                          className="rounded-full px-4 py-1 text-sm font-semibold text-white shadow-md flex items-center gap-2 transform transition-transform hover:scale-105"
                        >
                          <span className="leading-none">{k}</span>
                          {meta.level && (
                            <span className="text-[10px] opacity-90 bg-white/20 px-2 py-0.5 rounded-full">
                              {meta.level}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                  <a href={`mailto:${PROFILE.email}`}>
                    <Button className="h-12 px-6 text-sm gap-2 rounded-2xl">
                      <Mail size={16} /> Connect
                    </Button>
                  </a>
                  <a href="#projects">
                    <Button variant="outline" className="h-12 px-6 text-sm gap-2 rounded-2xl">
                      <ExternalLink size={16} /> Explore Projects
                    </Button>
                  </a>
                </div>
              </div>

              {/* Right: Minimal, right-anchored UI with a skills carousel */}
              <div className="flex flex-col items-end gap-4">
                {/* skills grid: right-anchored category cards in a responsive grid */}
                <div className="w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-20 justify-items-end auto-rows:auto">
                    {PROFILE.skills?.map((cat, catIdx) => (
                      <div key={cat.category} className="justify-self-end w-full" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
                        <CategoryCard
                          category={cat}
                          forcedIndex={getForcedIndexForCat(catIdx)}
                          onRequestIndex={(newIdx) => handleRequestIndex(catIdx, newIdx)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Header removed per request */}

      {/* Content (sequential sections) */}
      <div>
        {/* Projects Section */}
        <Section id="projects">
          <Title icon={<Briefcase />}>Projects</Title>
          <div className="grid gap-10 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] xl:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]">
            <div className="space-y-6 lg:sticky lg:top-32 self-start">
              <div className="space-y-2">
                <span className="text-xs font-semibold tracking-[0.28em] uppercase text-blue-600/70 dark:text-blue-300/70">Featured Carousel</span>
                <h3 className="font-heading text-2xl tracking-[0.12em] uppercase leading-none">Complex & Showable</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">A rotating highlight of the builds I reach for first during deep-dive demos.</p>
              </div>
              {featuredProjects.length ? (
                <Card className="p-4 lg:p-5 border-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-blue-600/20 text-white shadow-2xl">
                  <div className="text-xs uppercase tracking-[0.24em] text-white/60 mb-3">Swipe or watch the loop</div>
                  <ProjectCarousel projects={featuredProjects} />
                </Card>
              ) : (
                <div className="rounded-3xl border border-dashed border-white/40 bg-white/10 p-6 text-sm text-white/70">
                  Add another project and it will appear here as a featured story.
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold tracking-[0.28em] uppercase text-slate-500 dark:text-slate-400">Project Stack</span>
                <h3 className="font-heading text-xl tracking-[0.16em] uppercase">Launch-ready builds</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Browse the rest of the roadmap-friendly work. Each cards links out to repos, demos, or case studies.</p>
              </div>

              <div className="space-y-5">
                {displayProjects.map((p) => {
                  const isPlaceholder = p.tags?.includes("Placeholder");
                  return (
                    <Card key={`list-${p.title}`} className={`p-5 transition-shadow ${isPlaceholder ? "border-dashed opacity-90" : "hover:shadow-lg"}`}>
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        <div
                          className="h-36 w-full sm:w-48 rounded-2xl overflow-hidden bg-slate-200/40 dark:bg-white/10 flex-none border border-black/5 dark:border-white/10"
                          style={{
                            backgroundImage: isPlaceholder
                              ? `linear-gradient(135deg, rgba(15,23,42,0.12), rgba(37,99,235,0.18))`
                              : `linear-gradient(135deg, rgba(15,23,42,0.2), rgba(37,99,235,0.25)), url(${p.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                        <div className="flex-1 space-y-3 min-w-0">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="text-lg font-semibold leading-tight truncate">{p.title}</div>
                              <div className="text-sm opacity-70 truncate">{p.subtitle}</div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {p.tags.map((t) => (
                                <Badge key={`${p.title}-list-tag-${t}`} className={`rounded-xl ${t === "Placeholder" ? "opacity-70" : ""}`}>
                                  {t}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm leading-relaxed opacity-80 line-clamp-4">{p.description}</p>
                          {!isPlaceholder && (
                            <div className="flex flex-wrap gap-2">
                              {p.links.map((l) => (
                                <a key={`${p.title}-list-link-${l.label}`} href={l.href} target="_blank" rel="noreferrer">
                                  <Button size="sm" variant="outline" className="gap-2 rounded-xl">
                                    <ExternalLink size={14} /> {l.label}
                                  </Button>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {canShowSeeMore && (
                <div className="flex justify-center">
                  <Button size="sm" variant="secondary" className="gap-2 rounded-2xl" onClick={() => setShowAllProjects(true)}>
                    See more projects
                    <ChevronDown size={14} />
                  </Button>
                </div>
              )}

              {showAllProjects && listProjects.length > listPreviewCount && (
                <div className="flex justify-center">
                  <Button size="sm" variant="ghost" className="gap-2 rounded-2xl" onClick={() => setShowAllProjects(false)}>
                    Show fewer
                    <ChevronDown size={14} className="transform rotate-180" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Section>

        {/* Awards Section */}
        <Section id="awards">
          <Title icon={<Award />}>Awards</Title>
          <div className="grid md:grid-cols-2 gap-6">
            {AWARDS.map((a) => (
              <Card key={a.title}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xl font-bold">{a.title}</div>
                      <div className="text-sm opacity-70">{a.org}</div>
                    </div>
                    <Badge variant="outline" className="rounded-xl">{a.year}</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed opacity-80">{a.notes}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* Activities Section */}
        <Section id="activities">
          <Title icon={<Music4 />}>Other Activities</Title>
          <div className="grid md:grid-cols-3 gap-6">
            {ACTIVITIES.map((act) => {
              const ActivityIcon = ICON_MAP[act.icon];
              return (
                <Card key={act.title}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-gray-100 dark:bg-white/10">
                        {ActivityIcon && <ActivityIcon size={18} />}
                      </div>
                      <div className="text-lg font-semibold">{act.title}</div>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm opacity-80">
                      {act.items.map((item, idx) => (
                        <li key={idx} className="leading-relaxed">• {item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Section>
      </div>

      {/* Footer */}
      <Section>
        <footer className="max-w-4xl mx-auto flex flex-col items-center gap-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 px-4 py-2 text-blue-700 dark:text-blue-200">
              <MapPin size={16} /> {PROFILE.location}
            </span>
            <a href={`mailto:${PROFILE.email}`}>
              <Button className="h-11 px-6 gap-2 rounded-2xl">
                <Mail size={16} />
                Contact
              </Button>
            </a>
          </div>
          <div className="text-sm opacity-70">
            © {new Date().getFullYear()} {PROFILE.name}. Built with React, Tailwind v4, and Framer Motion.
          </div>
        </footer>
      </Section>
    </div>
  );
}
