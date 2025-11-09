import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Moon, Sun, Github, Linkedin, Mail, Music4, Award, Briefcase, ExternalLink, Trophy, Piano, Mic2, Youtube, Instagram, MapPin } from "lucide-react";
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

const CAROUSEL_ITEM_HEIGHT = 320;

const ProjectCarousel = ({ projects }: { projects: Project[] }) => {
  const marqueeProjects = React.useMemo(() => [...projects, ...projects], [projects]);
  const totalHeight = React.useMemo(() => projects.length * CAROUSEL_ITEM_HEIGHT, [projects.length]);

  if (!projects.length) {
    return null;
  }

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

// -----------------------------
// UI Helpers
// -----------------------------
const Section = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16"
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
type TabKey = "projects" | "awards" | "activities";
const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "projects", label: "Projects", icon: <Briefcase size={18} /> },
  { key: "awards", label: "Awards", icon: <Trophy size={18} /> },
  { key: "activities", label: "Activities", icon: <Music4 size={18} /> },
];

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [active, setActive] = useState<TabKey>("projects");

  React.useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  const activeIndex = useMemo(() => Math.max(0, tabs.findIndex((t) => t.key === active)), [active]);
  const tabIndicatorWidth = 100 / tabs.length;

  return (
    <div className="min-h-screen transition-colors">
      {/* About Intro */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50 dark:from-black dark:via-black dark:to-slate-900" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/10" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-purple-200/40 blur-3xl dark:bg-purple-500/10" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 md:px-8 pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="grid gap-12 md:grid-cols-[1.1fr_.9fr] items-start min-h-[60vh]">
            <div className="flex flex-col justify-center gap-10 max-w-3xl">
              <span className="font-heading text-sm md:text-base tracking-[0.32em] uppercase text-blue-600/80 dark:text-blue-400/80">
                {PROFILE.headline}
              </span>
              <div className="space-y-4">
                <h1 className="font-heading text-5xl md:text-7xl tracking-[0.06em] leading-none uppercase">
                  {PROFILE.name}
                </h1>
                <p className="text-xl md:text-2xl font-semibold tracking-tight text-blue-600/80 dark:text-blue-300/80">
                  {PROFILE.role}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base opacity-80">
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 px-4 py-2 text-blue-700 dark:text-blue-200">
                  <MapPin size={16} /> {PROFILE.location}
                </span>
                <a href={`mailto:${PROFILE.email}`} className="inline-flex">
                  <Button className="h-11 px-6 text-sm md:text-base gap-2 rounded-2xl">
                    <Mail size={16} />
                    Contact
                  </Button>
                </a>
                <a href="#projects" className="inline-flex">
                  <Button variant="outline" className="h-11 px-6 text-sm md:text-base gap-2 rounded-2xl">
                    <Briefcase size={16} />
                    View Projects
                  </Button>
                </a>
              </div>
              <div className="flex flex-wrap gap-3">
                {PROFILE.social.map((s) => {
                  const SocialIcon = ICON_MAP[s.icon];
                  return (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="inline-flex">
                      <Button variant="ghost" size="sm" className="gap-2 rounded-2xl">
                        {SocialIcon && <SocialIcon size={16} />}
                        {s.label}
                      </Button>
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="hidden md:block">
              <ProjectCarousel projects={PROJECTS} />
            </div>
          </div>
          <div className="mt-10 md:mt-12 md:hidden">
            <ProjectCarousel projects={PROJECTS} />
          </div>
        </div>
      </motion.section>

      <Section>
        <div className="relative overflow-hidden rounded-[32px] border border-black/5 dark:border-white/10 bg-white/90 dark:bg-white/5 backdrop-blur">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 left-10 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-500/10" />
            <div className="absolute bottom-[-4rem] right-10 h-64 w-64 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-500/10" />
          </div>
          <div className="relative grid gap-12 p-8 md:p-16 lg:grid-cols-[1.3fr_.9fr]">
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="font-heading text-xs tracking-[0.28em] uppercase text-blue-600/70 dark:text-blue-400/70">
                  About
                </span>
                <p className="text-xl md:text-2xl leading-relaxed text-gray-700 dark:text-gray-200">
                  {PROFILE.blurb}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {PROFILE.keywords.map((k) => (
                  <Badge key={k} className="rounded-2xl px-3 py-1 text-sm">
                    {k}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${PROFILE.email}`}>
                  <Button className="h-12 px-6 text-sm md:text-base gap-2 rounded-2xl">
                    <Mail size={16} />
                    Connect
                  </Button>
                </a>
                <a href="#projects">
                  <Button variant="outline" className="h-12 px-6 text-sm md:text-base gap-2 rounded-2xl">
                    <ExternalLink size={16} />
                    Explore Projects
                  </Button>
                </a>
              </div>
            </div>
            <div className="space-y-6">
              <Card className="border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] opacity-60">Location</div>
                    <div className="mt-1 text-base font-semibold">{PROFILE.location}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] opacity-60">Email</div>
                    <div className="mt-1 text-sm font-medium break-all">{PROFILE.email}</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5">
                <CardContent className="p-6 space-y-3">
                  <div className="text-xs uppercase tracking-[0.16em] opacity-60">Find me online</div>
                  <div className="flex flex-wrap gap-2">
                    {PROFILE.social.map((s) => {
                      const SocialIcon = ICON_MAP[s.icon];
                      return (
                        <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                          <Badge className="gap-2 py-2 px-3 rounded-2xl inline-flex items-center text-sm">
                            {SocialIcon && <SocialIcon size={16} />}
                            {s.label}
                          </Badge>
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur border-b border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <a href="#about" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/10 grid place-items-center text-blue-600 font-bold group-hover:bg-blue-600/20 transition-colors">Y</div>
            <div>
              <div className="font-heading text-xl md:text-2xl leading-none tracking-[0.12em] uppercase group-hover:tracking-[0.18em] transition-all">{PROFILE.name}</div>
              <div className="text-xs md:text-sm opacity-70">{PROFILE.role}</div>
            </div>
          </a>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <a href={`mailto:${PROFILE.email}`} className="hidden sm:block">
              <Button variant="secondary" className="gap-2"><Mail size={16}/> Contact</Button>
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-2 md:px-8 pb-3">
          <div
            className="relative rounded-2xl bg-gray-100 dark:bg-white/10 p-1 grid"
            style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
          >
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`relative z-10 flex items-center justify-center gap-2 py-2 rounded-xl text-sm md:text-base font-semibold transition-colors ${active === t.key ? "" : "opacity-60"}`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
            <motion.span
              layout
              className="absolute inset-y-1 rounded-xl bg-white dark:bg-black shadow-sm border border-black/10 dark:border-white/10"
              style={{ width: `${tabIndicatorWidth}%` }}
              animate={{ x: `${activeIndex * tabIndicatorWidth}%` }}
              transition={{ type: "spring", stiffness: 250, damping: 28 }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {active === "projects" && (
          <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Section id="projects">
              <Title icon={<Briefcase />}>Projects</Title>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROJECTS.map((p) => (
                  <Card key={p.title} className="overflow-hidden group">
                    <div className="aspect-[4/3]" style={{ backgroundImage: `url(${p.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-lg font-bold leading-tight">{p.title}</div>
                          <div className="text-sm opacity-70">{p.subtitle}</div>
                        </div>
                        <div className="flex gap-2">
                          {p.tags.map((t) => (
                            <Badge key={t} className="rounded-xl">{t}</Badge>
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed opacity-80">{p.description}</p>
                      <div className="mt-4 flex gap-2 flex-wrap">
                        {p.links.map((l) => (
                          <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
                            <Button size="sm" variant="outline" className="gap-2 rounded-xl">
                              <ExternalLink size={14} /> {l.label}
                            </Button>
                          </a>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Section>
          </motion.div>
        )}

        {active === "awards" && (
          <motion.div key="awards" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
          </motion.div>
        )}

        {active === "activities" && (
          <motion.div key="activities" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Section>
        <div className="py-12 text-center text-sm opacity-70">
          © {new Date().getFullYear()} {PROFILE.name}. Built with React, Tailwind v4, and Framer Motion.
        </div>
      </Section>
    </div>
  );
}
