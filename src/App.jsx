import { lazy, Suspense, useState } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import Lanyard from "./components/Lanyard/Lanyard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import Reveal from "./components/Reveal/Reveal";
import { skillGroups } from "./data";
import InViewLazy from "./components/InViewLazy";
import { publicAsset } from "./publicAsset";

const ProjectsGrid = lazy(() => import("./components/ProjectsGrid"));
const ProjectModal = lazy(() => import("./components/ProjectModal/ProjectModal"));

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

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
                <q className="text-base md:text-lg">Junior Full-Stack Developer</q>
              </div>
            </Reveal>

            <Reveal as="h1" variant="up" delay={80} duration={550} className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-7">
              <ShinyText text="Hi I'm Cruz" disabled={false} speed={3} className="custom-class" />
            </Reveal>

            <Reveal variant="up" delay={140} duration={550}>
              <BlurText
                text="A passionate full-stack developer who enjoys turning ideas into modern, reliable, and user-friendly web and mobile applications"
                delay={45}
                stepDuration={0.22}
                animateBy="words"
                direction="top"
                className="mb-9 text-base md:text-lg text-zinc-300"
              />
            </Reveal>

            <Reveal variant="up" delay={200} duration={500}>
              <div className="flex flex-wrap items-center sm:gap-4 gap-3">
                <a
                  href={publicAsset("assets/CV.pdf")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold bg-[#1a1a1a] py-3 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors"
                >
                  <ShinyText text="View CV" disabled={false} speed={3} className="custom-class" />
                </a>

                <a
                  href="#project"
                  className="text-base font-semibold bg-[#1a1a1a] py-3 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors"
                >
                  <ShinyText text="Explore My Projects" disabled={false} speed={3} className="custom-class" />
                </a>
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
              onContactClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
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
                <Reveal as="h2" variant="up" duration={550} className="text-2xl md:text-3xl font-bold text-white mb-5">
                  About Me
                </Reveal>

                <Reveal
                  as="p"
                  variant="up"
                  delay={80}
                  duration={600}
                  className="text-sm md:text-base leading-relaxed mb-8 text-gray-300 break-words"
                >
                  Hi, I’m Cruz, a Computer Science student at INTI University, Malaysia, and a Junior Full-Stack Developer. I enjoy building real-world applications and have experience with React, Node.js, Python, FastAPI, Django, Laravel, Flutter, and databases. I’ve completed 6 projects, including e-commerce platforms, a Smart POS, a SaaS dashboard, and a mobile app. I’m passionate about learning, solving problems, and growing through real-world development experience.
                </Reveal>

                <div className="mb-2 flex w-full min-w-0 flex-col items-center gap-y-5 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
                  <Reveal variant="up" delay={140} duration={500} className="w-full min-w-0 sm:flex-1">
                    <h1 className="text-2xl md:text-3xl mb-1">
                      6<span className="text-violet-500">+</span>
                    </h1>
                    <p className="text-sm">Projects Completed</p>
                  </Reveal>
                  <Reveal variant="up" delay={200} duration={500} className="w-full min-w-0 sm:flex-1">
                    <h1 className="text-2xl md:text-3xl mb-1">
                      1st<span className="text-violet-500"> Year</span>
                    </h1>
                    <p className="text-sm">Computer Science Student</p>
                  </Reveal>
                  <Reveal variant="up" delay={260} duration={500} className="w-full min-w-0 sm:flex-1">
                    <h1 className="text-2xl md:text-3xl mb-1">
                      1<span className="text-violet-500">+</span>
                    </h1>
                    <p className="text-sm">Year of Experience</p>
                  </Reveal>
                </div>
              </div>
            </div>

            <Reveal variant="scale" delay={120} duration={650} className="flex w-full min-w-0 max-w-full items-center justify-center overflow-x-clip md:pl-8 lg:pl-10">
              <Lanyard position={[0, 0, 13]} gravity={[0, -40, 0]} />
            </Reveal>
          </div>
        </div>

        {/* Skills */}
        <div className="tools section-gap w-full min-w-0 overflow-x-clip">
          <Reveal as="h1" variant="up" duration={550} className="text-2xl md:text-3xl font-bold mb-3">
            Tools & Technologies
          </Reveal>
          <Reveal as="p" variant="up" delay={80} duration={500} className="w-full max-w-xl text-sm md:text-base opacity-50">
            My Professional Skills
          </Reveal>

          {skillGroups.map((group) => (
            <div key={group.title} className="mt-10 min-w-0">
              <Reveal
                as="h2"
                variant="up"
                duration={500}
                className="text-lg md:text-xl font-semibold mb-4 text-white tracking-tight border-l-2 border-violet-500 pl-4"
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
                          className="block text-sm font-semibold sm:text-base"
                        />
                      </div>
                      <p className="break-words text-xs text-zinc-400 sm:text-sm">{tool.ket}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Project */}
        <div className="project section-gap w-full min-w-0" id="project" />
        <Reveal as="h1" variant="up" duration={550} className="text-center text-2xl md:text-3xl font-bold mb-2">
          Project
        </Reveal>
        <Reveal
          as="p"
          variant="up"
          delay={80}
          duration={500}
          className="mx-auto max-w-3xl px-1 text-sm md:text-base text-center opacity-50 break-words"
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
        <div className="kontak section-gap w-full" id="contact">
          <Reveal as="h1" variant="up" duration={550} className="text-2xl md:text-3xl mb-2 font-bold text-center">
            Contact
          </Reveal>
          <Reveal as="p" variant="up" delay={80} duration={500} className="text-sm md:text-base text-center mb-8 opacity-50">
            Get in touch with me
          </Reveal>

          <div className="mx-auto w-full max-w-xl">
            <Reveal variant="up" delay={120} duration={600}>
              <div className="rounded-2xl bg-[linear-gradient(145deg,transparent_35%,#e81cff,#40c9ff)] p-[2px]">
                <form
                  action="https://formsubmit.co/rissoppa21@gmail.com"
                  method="POST"
                  className="flex w-full min-w-0 flex-col gap-5 rounded-[14px] bg-[#212121] px-4 py-6 sm:px-6 sm:py-8 md:px-8"
                  autoComplete="off"
                >
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="contact-name" className="mb-1.5 text-xs font-semibold text-[#717171]">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="Name"
                      placeholder="Name..."
                      className="w-full rounded-lg border border-[#414141] bg-transparent px-4 py-3 text-white placeholder-white/50 outline-none transition-colors focus:border-[#e81cff]"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="contact-email" className="mb-1.5 text-xs font-semibold text-[#717171]">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="Email"
                      placeholder="Email..."
                      className="w-full rounded-lg border border-[#414141] bg-transparent px-4 py-3 text-white placeholder-white/50 outline-none transition-colors focus:border-[#e81cff]"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="message" className="mb-1.5 text-xs font-semibold text-[#717171]">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows="4"
                      placeholder="Message..."
                      className="h-24 w-full resize-none rounded-lg border border-[#414141] bg-transparent px-4 py-3 text-white placeholder-white/50 outline-none transition-colors focus:border-[#e81cff]"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="mt-2 w-full cursor-pointer self-stretch rounded-md border border-[#414141] bg-[#313131] px-4 py-3 text-sm font-semibold text-[#717171] transition-colors hover:border-white hover:bg-white hover:text-[#212121] active:scale-95 sm:w-[40%] sm:min-w-[120px] sm:self-start"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </main>

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
