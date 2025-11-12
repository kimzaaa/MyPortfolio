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
  image: string;
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

// Auto-scrolling horizontal awards carousel
const AWARD_CARD_WIDTH = 380;
const AutoAwardsCarousel = ({ awards }: { awards: Award[] }) => {
  const [focusedAward, setFocusedAward] = React.useState<Award | null>(null);
  const marqueeAwards = React.useMemo(() => [...awards, ...awards, ...awards], [awards]);
  const totalWidth = React.useMemo(() => awards.length * AWARD_CARD_WIDTH, [awards.length]);

  if (!awards.length) return null;

  return (
    <>
      <div className="relative overflow-hidden -mx-6 md:-mx-12">
        <motion.div
          className="flex gap-6 px-6"
          animate={{ x: [0, -totalWidth] }}
          transition={{
            duration: awards.length * 8,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {marqueeAwards.map((award, idx) => (
            <motion.div
              key={`${award.title}-${idx}`}
              className="flex-none w-[360px] cursor-pointer"
              onHoverStart={() => setFocusedAward(award)}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full overflow-hidden border-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-blue-900/40 backdrop-blur shadow-2xl hover:shadow-blue-500/30 transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.7), rgba(37,99,235,0.5)), url(${award.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge className="rounded-full px-4 py-1.5 text-sm font-bold bg-white/90 text-slate-900">
                      {award.year}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 text-white">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-heading text-xl tracking-tight uppercase leading-tight line-clamp-2">
                        {award.title}
                      </h3>
                      <p className="text-sm text-blue-200 mt-1">{award.org}</p>
                    </div>
                    <p className="text-sm text-white/90 leading-relaxed line-clamp-3">
                      {award.notes}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        {/* Fade edges for infinite scroll effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/40 to-transparent" />
      </div>

      {/* Focused Award Modal Overlay */}
      <AnimatePresence>
        {focusedAward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            onMouseLeave={() => setFocusedAward(null)}
            onClick={() => setFocusedAward(null)}
          >
            {/* Backdrop blur */}
            <motion.div
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(12px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
              className="absolute inset-0 bg-black/60"
            />
            
            {/* Focused Card */}
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="relative z-10 w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="overflow-hidden border-2 border-blue-500/30 bg-gradient-to-br from-slate-900 via-slate-900/95 to-blue-900/60 backdrop-blur-xl shadow-2xl">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                    style={{
                      backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.6), rgba(37,99,235,0.4)), url(${focusedAward.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                  <div className="absolute top-6 right-6">
                    <Badge className="rounded-full px-6 py-2 text-lg font-bold bg-white text-slate-900 shadow-lg">
                      {focusedAward.year}
                    </Badge>
                  </div>
                  <button
                    onClick={() => setFocusedAward(null)}
                    className="absolute top-6 left-6 h-10 w-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transition-all hover:scale-110"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
                <CardContent className="p-8 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="font-heading text-3xl md:text-4xl tracking-tight uppercase leading-tight">
                        {focusedAward.title}
                      </h3>
                      <p className="text-lg text-blue-200 mt-2 font-semibold">{focusedAward.org}</p>
                    </div>
                    <div className="h-px bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-transparent" />
                    <p className="text-base md:text-lg text-white/90 leading-relaxed">
                      {focusedAward.notes}
                    </p>
                    <div className="pt-4">
                      <Badge variant="outline" className="rounded-full px-4 py-2 text-sm border-blue-400/50 text-blue-200">
                        🏆 Achievement Unlocked
                      </Badge>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
    <div className="relative h-full flex flex-col">
      <div className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/40 backdrop-blur-md shadow-xl p-3 md:p-4 flex-1 flex flex-col min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current.title}-${index}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="h-full"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-black/5 dark:border-white/10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.6), rgba(37,99,235,0.4)), url(${current.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
                {current.tags.map((tag) => (
                  <Badge key={`${current.title}-${tag}`} className="rounded-2xl px-3 py-1.5 text-xs md:text-sm bg-white/90 backdrop-blur text-slate-900 font-semibold">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="absolute left-4 right-4 bottom-4 space-y-3 text-white">
                <div className="font-heading text-2xl md:text-3xl tracking-tight uppercase leading-tight drop-shadow-lg">{current.title}</div>
                <p className="text-sm md:text-base text-white/90 leading-relaxed line-clamp-3 drop-shadow">{current.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {current.links.map((link) => (
                    <a key={`${current.title}-${link.label}`} href={link.href} target="_blank" rel="noreferrer">
                      <Button variant="secondary" size="sm" className="gap-2 rounded-2xl text-xs bg-white/90 hover:bg-white text-slate-900 font-semibold">
                        <ExternalLink size={14} />
                        {link.label}
                      </Button>
                    </a>
                  ))}
                </div>
              </div>

              {projects.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous project"
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-slate-800 hover:bg-white shadow-lg transition-all hover:scale-110"
                  >
                    <ChevronLeft size={18} className="mx-auto" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next project"
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-slate-800 hover:bg-white shadow-lg transition-all hover:scale-110"
                  >
                    <ChevronRight size={18} className="mx-auto" />
                  </button>
                </>
              )}
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
    initial={{ opacity: 0, y: 100, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: false, amount: 0.2, margin: "-100px" }}
    transition={{ 
      duration: 1.2, 
      ease: [0.16, 1, 0.3, 1],
      opacity: { duration: 0.8 }
    }}
    className="w-full min-h-screen flex flex-col justify-center px-6 md:px-12 py-16 relative"
  >
    <motion.div 
      className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] via-purple-500/[0.02] to-cyan-500/[0.03] pointer-events-none rounded-3xl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
    <motion.div 
      className="relative z-10"
      initial={{ filter: "blur(10px)" }}
      whileInView={{ filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {children}
    </motion.div>
  </motion.section>
);

const Title = ({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) => (
  <motion.div 
    className="flex items-center gap-3 mb-6"
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: false }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  >
    {icon && (
      <motion.div 
        className="p-2 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 backdrop-blur-sm border border-white/10"
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {icon}
      </motion.div>
    )}
    <motion.h2 
      className="font-heading text-3xl md:text-4xl tracking-[0.08em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {children}
    </motion.h2>
  </motion.div>
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
    <div className="min-h-screen transition-colors relative overflow-x-hidden">
      {/* Dynamic animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 dark:from-black dark:via-slate-950 dark:to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent animate-gradient-shift" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent animate-gradient-shift-reverse" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      {/* Floating 3D orbs with blur effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-[100px]"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-[40%] right-[15%] w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/25 to-pink-500/25 blur-[120px]"
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[50%] w-80 h-80 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-[110px]"
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* About Intro */}
      <motion.section
        id="about"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden w-full min-h-screen flex"
      >
        <div className="absolute inset-0 opacity-50" />
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
        initial={{ opacity: 0, y: 80, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full overflow-visible bg-transparent min-h-screen flex items-center"
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
      <>
        {/* Projects Section */}
        <Section id="projects">
          <Title icon={<Briefcase />}>Projects</Title>
          <div className="grid gap-10 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] xl:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]">
            {/* Complex & Showable - Fixed/Sticky */}
            <div className="lg:sticky lg:top-24 self-start lg:h-[calc(100vh-8rem)] flex flex-col overflow-hidden">
              <div className="space-y-2 mb-4 flex-none">
                <span className="text-xs font-semibold tracking-[0.28em] uppercase text-blue-600/70 dark:text-blue-300/70">Featured Carousel</span>
                <h3 className="font-heading text-2xl tracking-[0.12em] uppercase leading-none">Complex & Showable</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">A rotating highlight of the builds I reach for</p>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden">
                {featuredProjects.length ? (
                  <Card className="h-full flex flex-col p-4 lg:p-5 border-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-blue-600/20 text-white shadow-2xl">
                    <div className="text-xs uppercase tracking-[0.24em] text-white/60 mb-3 flex-none">Swipe or watch the loop</div>
                    <div className="flex-1 min-h-0 overflow-hidden">
                      <ProjectCarousel projects={featuredProjects} />
                    </div>
                  </Card>
                ) : (
                  <div className="rounded-3xl border border-dashed border-white/40 bg-white/10 p-6 text-sm text-white/70">
                    Add another project and it will appear here as a featured story.
                  </div>
                )}
              </div>
            </div>

            {/* Launch-ready builds - Scrollable */}
            <div className="relative lg:h-[calc(100vh-8rem)] flex flex-col">
              {/* Fixed header */}
              <div className="space-y-2 mb-6 flex-none">
                <span className="text-xs font-semibold tracking-[0.28em] uppercase text-slate-500 dark:text-slate-400">Project Stack</span>
                <h3 className="font-heading text-xl tracking-[0.16em] uppercase">Launch-ready builds</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Browse the rest of the roadmap-friendly work. Each cards links out to repos, demos, or case studies.</p>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 lg:overflow-y-auto lg:pr-2 scrollbar-thin lg:pb-8">
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
              {/* Fade effect at bottom */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-black to-transparent" />
            </div>
          </div>
        </Section>

        {/* Awards Section */}
        <Section id="awards">
          <Title icon={<Award />}>Awards & Recognition</Title>
          <AutoAwardsCarousel awards={AWARDS} />
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
      </>

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
