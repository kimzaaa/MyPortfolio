import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Github, Linkedin, Mail, Music4, Award, Briefcase, UserRound, ExternalLink, Trophy, Piano, Mic2, Youtube, Instagram } from "lucide-react";
import { Card, CardContent } from "../src/components/ui/card";
import { Button } from "../src/components/ui/button";
import { Badge } from "../src/components/ui/badge";

// -----------------------------
// Data: edit these easily
// -----------------------------
const PROFILE = {
  name: "Your Name",
  role: "Software & Game Developer / Engineer",
  blurb:
    "I build playful, performant experiences across web, mobile, and games. I love clean UI, systems design, and shipping things people actually use.",
  location: "Bangkok, Thailand",
  email: "you@example.com",
  social: [
    { label: "GitHub", icon: <Github size={18} />, href: "https://github.com/yourname" },
    { label: "LinkedIn", icon: <Linkedin size={18} />, href: "https://linkedin.com/in/yourname" },
    { label: "YouTube", icon: <Youtube size={18} />, href: "https://youtube.com/@yourname" },
    { label: "Instagram", icon: <Instagram size={18} />, href: "https://instagram.com/yourname" },
  ],
  keywords: ["React", "TypeScript", "Unity", "Expo", "Shader Graph", "UI/UX", "Python"],
};

const PROJECTS = [
  {
    title: "Project Lumphini",
    subtitle: "AR GPS-based RPG in Bangkok's Lumphini Park",
    tags: ["Unity", "AR", "Mobile"],
    description:
      "Community-driven purification loops, pixel-art isometric look, and real-world exploration mechanics.",
    links: [{ label: "Repo", href: "#" }, { label: "Demo", href: "#" }],
    image: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "EventApp",
    subtitle: "Bangkok events with star-map UI and glass search",
    tags: ["React Native", "Expo", "Maps"],
    description:
      "City events with elegant filters, offline caching, and playful interactions.",
    links: [{ label: "Case Study", href: "#" }],
    image: "https://images.unsplash.com/photo-1554631221-f9603e6808be?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Astroplanters",
    subtitle: "Cozy top-down sci-fi farming on an exoplanet",
    tags: ["Unity", "C#", "Design"],
    description:
      "Modular domes, life-support systems, and companion AI gardeners across alien biomes.",
    links: [{ label: "Trailer", href: "#" }],
    image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1200&auto=format&fit=crop",
  },
];

const AWARDS = [
  { title: "TAIEC Round 2 Finalist", org: "Thailand AI Engineering Challenge", year: "2025",
    notes: "Implemented KNN, DBSCAN, and DAG scheduling from first principles." },
  { title: "NSC Game Development – Top Project", org: "National Software Contest", year: "2025",
    notes: "Serious zombie game with crate-drop systems and community feedback loop." },
  { title: "School Honors – Computer Science", org: "Debsirin College", year: "2024",
    notes: "Academic excellence, STEM leadership, and mentoring peers." },
];

const ACTIVITIES = [
  {
    title: "Piano & Music Performance",
    icon: <Piano size={18} />,
    items: [
      "Liszt – Liebesträume (complete)",
      "Chopin – Minute Waltz",
      "Ambient/game OST sketches for Astroplanters",
    ],
  },
  {
    title: "Choir / Vocal Ensemble",
    icon: <Mic2 size={18} />,
    items: [
      "School choir: tenor section lead",
      "Arranging simple SATB harmonies for events",
      "Collab covers on YouTube",
    ],
  },
  {
    title: "Community & Volunteering",
    icon: <Music4 size={18} />,
    items: [
      "Intro to Unity workshops for juniors",
      "Organizing local game-jam events",
      "EventApp beta testing with Thai students",
    ],
  },
];

// -----------------------------
// UI Helpers
// -----------------------------
const Section = ({ children }: { children: React.ReactNode }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="max-w-6xl mx-auto px-4 md:px-8"
  >
    {children}
  </motion.section>
);

const Title = ({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6">
    {icon && <div className="p-2 rounded-2xl bg-gray-100 dark:bg-white/10">{icon}</div>}
    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{children}</h2>
  </div>
);

// -----------------------------
// Main Component
// -----------------------------
type TabKey = "about" | "projects" | "awards" | "activities";
const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "about", label: "About", icon: <UserRound size={18} /> },
  { key: "projects", label: "Projects", icon: <Briefcase size={18} /> },
  { key: "awards", label: "Awards", icon: <Trophy size={18} /> },
  { key: "activities", label: "Activities", icon: <Music4 size={18} /> },
];

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [active, setActive] = useState<TabKey>("about");

  React.useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  const tabIndicatorX = useMemo(() => tabs.findIndex((t) => t.key === active) * 1, [active]);

  return (
    <div className="min-h-screen transition-colors">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur border-b border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/10 grid place-items-center text-blue-600 font-bold">Y</div>
            <div>
              <div className="text-xl md:text-2xl font-extrabold leading-none tracking-tight">{PROFILE.name}</div>
              <div className="text-xs md:text-sm opacity-70">{PROFILE.role}</div>
            </div>
          </div>

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
          <div className="relative rounded-2xl bg-gray-100 dark:bg-white/10 p-1 grid grid-cols-4">
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
              className="absolute inset-y-1 w-1/4 rounded-xl bg-white dark:bg-black shadow-sm border border-black/10 dark:border-white/10"
              animate={{ x: `${tabIndicatorX * 100}%` }}
              transition={{ type: "spring", stiffness: 250, damping: 28 }}
            />
          </div>
        </div>
      </div>

      {/* Hero */}
      <Section>
        <div className="py-10 md:py-16">
          <div className="grid md:grid-cols-[1.2fr_.8fr] gap-8 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
                Building bold, modern experiences
              </h1>
              <p className="mt-6 text-lg md:text-xl opacity-80 max-w-2xl">
                {PROFILE.blurb}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {PROFILE.keywords.map((k) => (
                  <Badge key={k} className="text-sm py-1 px-3 rounded-xl">{k}</Badge>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                {PROFILE.social.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="inline-flex">
                    <Button variant="ghost" className="gap-2">
                      {s.icon}
                      {s.label}
                      <ExternalLink size={14} className="opacity-60" />
                    </Button>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <motion.div
                className="rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-sm aspect-[4/3] bg-gray-100 dark:bg-white/10"
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1547658719-8c1e9b45f210?q=80&w=1600&auto=format&fit=crop)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Content */}
      <AnimatePresence mode="wait">
        {active === "about" && (
          <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Section>
              <Title icon={<UserRound />}>About Me</Title>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardContent className="p-6 leading-relaxed text-base md:text-lg">
                    <p>
                      I'm a developer who likes shipping delightful interactive products. My toolkit includes React/TypeScript on web, Expo/React Native on mobile, and Unity/C# for games.
                    </p>
                    <p className="mt-4">
                      I care about performance, accessibility, and tasteful motion. I write clean code, iterate quickly, and document as I go.
                    </p>
                    <p className="mt-4">
                      Currently based in <strong>{PROFILE.location}</strong>, exploring AR, shaders, and systems design.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-sm opacity-70">Contact</div>
                    <div className="mt-2 font-semibold">{PROFILE.email}</div>
                    <div className="mt-4 text-sm opacity-70">Availability</div>
                    <div className="mt-2 font-semibold">Open to internships & collabs</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {PROFILE.social.map((s) => (
                        <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                          <Badge className="gap-2 py-1 px-3 rounded-xl inline-flex items-center">
                            {s.icon}
                            {s.label}
                          </Badge>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Section>
          </motion.div>
        )}

        {active === "projects" && (
          <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Section>
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
            <Section>
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
            <Section>
              <Title icon={<Music4 />}>Other Activities</Title>
              <div className="grid md:grid-cols-3 gap-6">
                {ACTIVITIES.map((act) => (
                  <Card key={act.title}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-gray-100 dark:bg-white/10">{act.icon}</div>
                        <div className="text-lg font-semibold">{act.title}</div>
                      </div>
                      <ul className="mt-4 space-y-2 text-sm opacity-80">
                        {act.items.map((item, idx) => (
                          <li key={idx} className="leading-relaxed">• {item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
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
