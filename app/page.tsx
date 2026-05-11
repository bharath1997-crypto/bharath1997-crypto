import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import About from "@/components/About";
import Contact from "@/components/Contact";
import AccessibilityDrawer from "@/components/AccessibilityDrawer";

export default function Home() {
  return (
    <>
      {/* ── Sticky Nav ─────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D1B2A]/90 backdrop-blur-sm border-b border-white/5">
        <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Wordmark */}
          <span className="text-white font-semibold tracking-tight text-sm">
            BN<span className="text-[#378ADD]">.</span>
          </span>

          {/* Nav links */}
          <ul className="hidden sm:flex items-center gap-8 text-sm text-gray-400">
            {[
              ["Projects",       "#projects"],
              ["Experience",     "#experience"],
              ["Skills",         "#skills"],
              ["Education",      "#education"],
              ["About",          "#about"],
              ["Contact",        "#contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="hover:text-[#378ADD] transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile: single CTA */}
          <a
            href="#projects"
            className="sm:hidden text-xs text-[#378ADD] border border-[#378ADD]/40 px-3 py-1 rounded-full"
          >
            Projects ↓
          </a>
        </nav>
      </header>

      <main className="pt-14">
        {/* Hero — dark navy */}
        <section id="hero">
          <Hero />
        </section>

        {/* Stats — accent strip */}
        <section id="stats">
          <Stats />
        </section>

        {/* Projects vault */}
        <section id="projects" className="scroll-mt-14">
          <Projects />
        </section>

        {/* Experience timeline */}
        <section id="experience" className="scroll-mt-14">
          <Timeline />
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-mt-14">
          <Skills />
        </section>

        {/* Education */}
        <section id="education" className="scroll-mt-14">
          <Education />
        </section>

        {/* Certifications */}
        <section id="certifications" className="scroll-mt-14">
          <Certifications />
        </section>

        {/* About Section */}
        <section id="about" className="scroll-mt-14">
          <About />
        </section>

        {/* Contact / Footer */}
        <section id="contact" className="scroll-mt-14">
          <Contact />
        </section>
      </main>

      {/* Floating Accessibility Drawer */}
      <AccessibilityDrawer />
    </>
  );
}
