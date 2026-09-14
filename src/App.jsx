import { lazy, Suspense, useState } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import Lanyard from "./components/Lanyard/Lanyard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
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
      <main className="max-w-7xl mx-auto w-full px-6">

        <div className="hero grid w-full md:grid-cols-2 items-center pt-16 md:pt-24 lg:pt-28 pb-14 md:pb-20 xl:gap-16 gap-12 grid-cols-1">
          <div>
            <div className="flex items-center gap-3 mb-7 bg-transparent w-fit py-2 px-1 rounded-2xl">
              <img src={publicAsset("assets/cruz.png")} className="w-10 rounded-md" width="40" height="40" fetchPriority="high" />
              <q className="text-base md:text-lg">Junior Full-Stack Developer</q>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-7">
              <ShinyText text="Hi I'm Cruz" disabled={false} speed={3} className='custom-class' />
            </h1>
            <BlurText
              text="A passionate full-stack developer who enjoys turning ideas into modern, reliable, and user-friendly web and mobile applications."
              delay={150}
              animateBy="words"
              direction="top"
              className="mb-9 text-base md:text-lg text-zinc-300"
            />
            <div className="flex items-center sm:gap-4 gap-3">
              <a 
                href={publicAsset("assets/CV.pdf")} 
                download="Faris_Edrik_Prayoga_CV.pdf" 
                className="text-base font-semibold bg-[#1a1a1a] py-3 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors"
              >
                <ShinyText text="Download CV" disabled={false} speed={3} className="custom-class" />
              </a>

              <a href="#project" className="text-base font-semibold bg-[#1a1a1a] py-3 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors">
                <ShinyText text="Explore My Projects" disabled={false} speed={3} className="custom-class" />
              </a>
            </div>

          </div>
          <div className="flex justify-center md:justify-end -translate-y-4 md:-translate-y-10">
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
          </div>
        </div>
        {/* tentang */}
        <div className="section-gap w-full rounded-3xl border-[5px] border-violet-500/40 shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] px-5 py-12 md:px-6 md:py-14" id="about">
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 md:gap-8 px-4 md:px-6" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            <div className="basis-full md:basis-7/12 flex items-center pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-violet-500/30 pb-8 md:pb-0">
              {/* Kolom kiri */}
              <div className="w-full text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
                  About Me
                </h2>

                <BlurText
                  text="Hi, I’m Cruz, a Computer Science student at INTI University, Malaysia, and a Junior Full-Stack Developer. I enjoy building real-world applications and have experience with React, Node.js, Python, FastAPI, Django, Laravel, Flutter, and databases. I’ve completed 6 projects, including e-commerce platforms, a Smart POS, a SaaS dashboard, and a mobile app. I’m passionate about learning, solving problems, and growing through real-world development experience."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-sm md:text-base leading-relaxed mb-8 text-gray-300"
                />

                <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between text-center sm:text-left gap-y-5 sm:gap-y-0 mb-6 w-full">
                  <div className="w-full sm:flex-1">
                    <h1 className="text-2xl md:text-3xl mb-1">
                      6<span className="text-violet-500">+</span>
                    </h1>
                    <p className="text-sm">Projects Completed</p>
                  </div>
                  <div className="w-full sm:flex-1">
                    <h1 className="text-2xl md:text-3xl mb-1">
                      1st<span className="text-violet-500"> Year</span>
                    </h1>
                    <p className="text-sm">Computer Science Student</p>
                  </div>
                  <div className="w-full sm:flex-1" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600" data-aos-once="true">
                    <h1 className="text-2xl md:text-3xl mb-1">
                      1<span className="text-violet-500">+</span>
                    </h1>
                    <p className="text-sm">Year of Experience</p>
                  </div>
                </div>


                <ShinyText
                  text="Working with heart, creating with mind."
                  disabled={false}
                  speed={3}
                  className="text-sm md:text-base text-violet-400"
                />
              </div>
            </div>

            {/* Kolom kanan */}
            <div className="basis-full md:basis-5/12 min-w-0 pl-0 md:pl-8 overflow-hidden max-w-full flex items-center justify-center">
              <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
            </div>
          </div>

        </div>
        <div className="tools section-gap w-full overflow-x-hidden">
          <h1 className="text-2xl md:text-3xl font-bold mb-3" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" >Tools & Technologies</h1>
          <p className="w-2/5 text-sm md:text-base opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">My Professional Skills</p>

          {skillGroups.map((group, index) => (
            <div key={group.title} className="mt-10">
              <h2
                className="text-lg md:text-xl font-semibold mb-4 text-white tracking-tight border-l-2 border-violet-500 pl-4"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once="true"
              >
                {group.title}
              </h2>
              <div className="tools-box grid w-full grid-cols-2 gap-3 min-[480px]:gap-4 md:grid-cols-3 lg:grid-cols-4">
                {group.items.map((tool) => (
                  <div
                    key={tool.id}
                    className="group flex h-full min-h-[4.5rem] min-w-0 items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900/60 p-2.5 shadow-lg backdrop-blur-md transition-all duration-300 min-[480px]:p-3 lg:hover:bg-zinc-800/80"
                  >
                    <img
                      src={tool.gambar}
                      alt={tool.nama}
                      loading="lazy"
                      decoding="async"
                      className={`h-12 w-12 shrink-0 object-contain rounded-lg bg-zinc-800 p-2 transition-all duration-300 lg:group-hover:bg-zinc-900 ${tool.invert ? "invert" : ""}`}
                    />
                    <div className="flex min-w-0 flex-col overflow-hidden">
                      <div className="truncate">
                        <ShinyText
                          text={tool.nama}
                          disabled={false}
                          speed={3}
                          className="block text-sm font-semibold sm:text-base"
                        />
                      </div>
                      <p className="truncate text-xs text-zinc-400 sm:text-sm">{tool.ket}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* tentang */}

        {/* Project */}
        <div className="project section-gap w-full" id="project" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true"></div>
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-2" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">Project</h1>
        <p className="text-sm md:text-base text-center opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">Showcasing a selection of projects that reflect my skills, creativity, and passion for building meaningful digital experiences.</p>
        <div className="project-box mt-10 w-full bg-transparent" >

          <div className="relative h-auto bg-transparent" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true" >
            <InViewLazy>
              <ProjectsGrid onItemClick={handleProjectClick} />
            </InViewLazy>
          </div>
        </div>
        {/* Project */}


        {/* Kontak */}
        <div className="kontak section-gap w-full" id="contact">
          <h1
            className="text-2xl md:text-3xl mb-2 font-bold text-center"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            Contact
          </h1>
          <p
            className="text-sm md:text-base text-center mb-8 opacity-50"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
            data-aos-once="true"
          >
            Get in touch with me
          </p>

          <div className="mx-auto w-full max-w-xl">
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="500"
              data-aos-once="true"
            >
              <div className="rounded-2xl bg-[linear-gradient(145deg,transparent_35%,#e81cff,#40c9ff)] p-[2px]">
                <form
                  action="https://formsubmit.co/rissoppa21@gmail.com"
                  method="POST"
                  className="flex w-full flex-col gap-5 rounded-[14px] bg-[#212121] px-6 py-8 sm:px-8"
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
                    className="mt-2 w-[40%] min-w-[120px] cursor-pointer self-start rounded-md border border-[#414141] bg-[#313131] px-4 py-3 text-sm font-semibold text-[#717171] transition-colors hover:border-white hover:bg-white hover:text-[#212121] active:scale-95"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Kontak */}
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
  )
}

export default App
