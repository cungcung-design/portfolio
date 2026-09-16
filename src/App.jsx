import { lazy, Suspense, useState } from "react";
import { FaWhatsapp, FaFacebookF, FaTiktok, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import Lanyard from "./components/Lanyard/Lanyard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import Reveal from "./components/Reveal/Reveal";
import LineReveal from "./components/Reveal/LineReveal";
import WhatsAppFloat from "./components/WhatsAppFloat";
import ContactFormModal from "./components/ContactFormModal/ContactFormModal";
import WhatsAppModal from "./components/WhatsAppModal/WhatsAppModal";
import { skillGroups } from "./data";
import { socialLinks } from "./socials";
import InViewLazy from "./components/InViewLazy";
import { publicAsset } from "./publicAsset";

const socialIcons = {
  facebook: FaFacebookF,
  tiktok: FaTiktok,
  instagram: FaInstagram,
  telegram: FaTelegramPlane,
};

const ProjectsGrid = lazy(() => import("./components/ProjectsGrid"));
const ProjectModal = lazy(() => import("./components/ProjectModal/ProjectModal"));

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [whatsAppOpen, setWhatsAppOpen] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <main className="max-w-7xl mx-auto w-full min-w-0 px-4 sm:px-6 pb-8">
        <div className="hero grid w-full min-w-0 grid-cols-1 md:grid-cols-2 items-center pt-16 md:pt-24 lg:pt-28 pb-14 md:pb-20 gap-10 md:gap-12 xl:gap-16">
          <div className="min-w-0">
            <Reveal variant="up" delay={0} duration={500}>
              <div className="flex items-center gap-3 mb-7 bg-transparent w-fit max-w-full py-2 px-1 rounded-2xl">
                <img src={publicAsset("assets/cruz.png")} className="w-10 rounded-md" width="40" height="40" fetchPriority="high" />
                <q className="text-ui text-base text-[#A78BFA] md:text-[1.0625rem]">Junior Full-Stack Developer</q>
              </div>
            </Reveal>

            <Reveal as="h1" variant="up" delay={80} duration={550} className="text-hero mb-7 text-white">
              Hi, I&apos;m <span className="text-[#8B5CF6]">Cruz</span>
            </Reveal>

            <Reveal variant="up" delay={140} duration={550}>
              <BlurText
                text="A passionate junior developer who enjoys turning ideas into modern, reliable, and user-friendly web and mobile applications"
                delay={45}
                stepDuration={0.22}
                animateBy="words"
                direction="top"
                className="text-body mb-9 text-zinc-400"
              />
            </Reveal>

            <Reveal variant="up" delay={200} duration={500}>
              <div className="flex flex-col items-start gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  {socialLinks.map((social) => {
                    const Icon = socialIcons[social.id];
                    return (
                      <a
                        key={social.id}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="social-icon"
                      >
                        <Icon size={17} aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <a
                    href={publicAsset("assets/CV.pdf")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-btn-primary"
                  >
                    View CV
                  </a>

                  <a
                    href="#project"
                    className="hero-btn-secondary"
                  >
                    Explore My Projects
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal variant="scale" delay={160} duration={600} className="flex min-w-0 justify-center md:justify-end -translate-y-4 md:-translate-y-10">
            <ProfileCard
              name="Cruz"
              title="Junior Developer"
              handle="N Z Cung JB"
              status="Online"
              contactText="Contact Me"
              avatarUrl={publicAsset("assets/cruz.png")}
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => setContactOpen(true)}
            />
          </Reveal>
        </div>

        {/* About */}
        <div
          className="section-gap w-full min-w-0 overflow-x-clip rounded-3xl border-[5px] border-violet-500/40 shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] px-4 py-8 sm:px-6 md:py-10"
          id="about"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-8 md:gap-10">
            <div className="flex min-w-0 items-center border-b border-violet-500/30 pb-8 md:border-b-0 md:border-r md:pr-8 md:pb-0 lg:pr-10">
              <div className="w-full min-w-0 text-left">
                <Reveal as="h2" variant="up" duration={550} className="text-section mb-5 text-white">
                  About Me
                </Reveal>

                <BlurText
                  text="Hi, I'm Cruz, a Computer Science student at INTI University, Malaysia, and a Junior Full-Stack Developer. I enjoy building real-world applications and have experience with React, Node.js, Python, FastAPI, Django, Laravel, Flutter, and databases. I've completed 6 projects, including e-commerce platforms, a Smart POS, a SaaS dashboard, and a mobile app. I'm passionate about learning, solving problems, and growing through real-world development experience."
                  delay={40}
                  stepDuration={0.22}
                  animateBy="words"
                  direction="top"
                  className="text-body mb-8 break-words text-gray-300"
                />

                <LineReveal
                  className="mb-2 flex w-full min-w-0 flex-col items-center gap-y-5 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left sm:gap-y-0"
                  lineAs="div"
                  delay={2200}
                  stagger={160}
                  duration={520}
                  lines={[
                    <>
                      <p className="text-stat mb-1">
                        6<span className="text-violet-500">+</span>
                      </p>
                      <p className="text-label text-zinc-400">Projects Completed</p>
                    </>,
                    <>
                      <p className="text-stat mb-1">
                        1st<span className="text-violet-500"> Year</span>
                      </p>
                      <p className="text-label text-zinc-400">Computer Science Student</p>
                    </>,
                    <>
                      <p className="text-stat mb-1">
                        1<span className="text-violet-500">+</span>
                      </p>
                      <p className="text-label text-zinc-400">Year of Experience</p>
                    </>,
                  ]}
                  lineClassName="w-full min-w-0 sm:flex-1"
                />
              </div>
            </div>

            <Reveal variant="scale" delay={120} duration={650} className="flex w-full min-w-0 max-w-full items-center justify-center overflow-x-clip md:pl-8 lg:pl-10">
              <Lanyard position={[0, 0, 13]} gravity={[0, -40, 0]} />
            </Reveal>
          </div>
        </div>

        {/* Skills */}
        <div className="tools section-gap w-full min-w-0 overflow-x-clip" id="skills">
          <Reveal as="h1" variant="up" duration={550} className="text-section mb-3">
            Tools & Technologies
          </Reveal>
          <Reveal as="p" variant="up" delay={80} duration={500} className="text-muted w-full max-w-xl opacity-50">
            My Professional Skills
          </Reveal>

          {skillGroups.map((group) => (
            <div key={group.title} className="mt-10 min-w-0">
              <Reveal
                as="h2"
                variant="up"
                duration={500}
                className="text-subhead mb-4 border-l-2 border-violet-500 pl-4 text-white"
              >
                {group.title}
              </Reveal>
              <div className="tools-box grid w-full min-w-0 grid-cols-2 gap-3 min-[480px]:gap-4 md:grid-cols-3 lg:grid-cols-4">
                {group.items.map((tool, itemIndex) => (
                  <Reveal
                    key={tool.id}
                    variant="up"
                    delay={Math.min(itemIndex * 60, 360)}
                    duration={500}
                    className="group flex h-full min-h-[4.5rem] min-w-0 items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900/60 p-2.5 shadow-lg backdrop-blur-md transition-all duration-300 min-[480px]:p-3 lg:hover:bg-zinc-800/80"
                  >
                    <img
                      src={tool.gambar}
                      alt={tool.nama}
                      loading="lazy"
                      decoding="async"
                      className={`h-10 w-10 shrink-0 object-contain rounded-lg bg-zinc-800 p-2 transition-all duration-300 min-[480px]:h-12 min-[480px]:w-12 lg:group-hover:bg-zinc-900 ${tool.invert ? "invert" : ""}`}
                    />
                    <div className="flex min-w-0 flex-col">
                      <div className="break-words">
                        <ShinyText
                          text={tool.nama}
                          disabled={false}
                          speed={3}
                          className="text-ui block text-sm font-semibold sm:text-[0.9375rem]"
                        />
                      </div>
                      <p className="text-label break-words text-zinc-400">{tool.ket}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Project */}
        <div className="project section-gap w-full min-w-0" id="project" />
        <Reveal as="h1" variant="up" duration={550} className="text-section mb-2 text-center">
          Project
        </Reveal>
        <Reveal
          as="p"
          variant="up"
          delay={80}
          duration={500}
          className="text-muted mx-auto max-w-3xl px-1 text-center opacity-50 break-words"
        >
          Showcasing a selection of projects that reflect my skills, creativity, and passion for building meaningful digital experiences.
        </Reveal>
        <div className="project-box mt-10 w-full min-w-0 overflow-x-clip bg-transparent">
          <div className="relative h-auto min-w-0 bg-transparent">
            <InViewLazy>
              <ProjectsGrid onItemClick={handleProjectClick} />
            </InViewLazy>
          </div>
        </div>

        {/* Contact */}
        <div className="kontak section-gap w-full min-w-0" id="contact">
          <Reveal
            as="h1"
            variant="up"
            duration={550}
            className="text-section text-center"
          >
            Let&apos;s work together
          </Reveal>
          <Reveal
            as="p"
            variant="up"
            delay={80}
            duration={500}
            className="text-muted mx-auto mt-3 max-w-xl px-1 text-center text-zinc-300"
          >
            Have a project, job opportunity, or just want to say hello?
          </Reveal>

          <Reveal variant="up" delay={120} duration={550} className="mt-8">
            <div className="flex w-full min-w-0 flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="text-ui inline-flex min-h-12 w-full items-center justify-center rounded-full border border-gray-700 bg-[#1a1a1a] px-6 py-3 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-[#222] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 active:scale-[0.98] sm:w-auto"
              >
                Send Message
              </button>
              <button
                type="button"
                onClick={() => setWhatsAppOpen(true)}
                aria-label="Open WhatsApp contact options"
                className="text-ui inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#25D366]/35 bg-[#121612] px-6 py-3 text-[0.9375rem] font-semibold text-zinc-100 transition-colors hover:border-[#25D366]/65 hover:bg-[#162016] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] active:scale-[0.98] sm:w-auto"
              >
                <FaWhatsapp size={18} aria-hidden="true" />
                WhatsApp
              </button>
            </div>
          </Reveal>

          <Reveal
            as="p"
            variant="up"
            delay={160}
            duration={500}
            className="text-label mt-5 text-center text-zinc-500"
          >
            Available for freelance &amp; junior roles
          </Reveal>
        </div>
      </main>

      <WhatsAppFloat onClick={() => setWhatsAppOpen(true)} />
      <ContactFormModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <WhatsAppModal isOpen={whatsAppOpen} onClose={() => setWhatsAppOpen(false)} />

      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal
            isOpen={!!selectedProject}
            onClose={handleCloseModal}
            project={selectedProject}
          />
        </Suspense>
      )}
    </>
  );
}

export default App;
