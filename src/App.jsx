import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import ScrambledText from "./components/ScrambledText/ScrambledText";
import SplitText from "./components/SplitText/SplitText";
import Lanyard from "./components/Lanyard/Lanyard";
import GlassIcons from "./components/GlassIcons/GlassIcons";
import { skillGroups, listProject } from "./data";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import ProjectModal from "./components/ProjectModal/ProjectModal"; // <-- IMPORT MODAL
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

function App() {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null); // null = modal tertutup

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };
  // -------------------------

  useEffect(() => {
    const isReload =
      performance.getEntriesByType("navigation")[0]?.type === "reload";

    if (isReload) {
      // Ambil path tanpa hash
      const baseUrl = window.location.origin + "/portofolio/";
      window.location.replace(baseUrl);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="hero grid md:grid-cols-2 items-center pt-14 md:pt-20 pb-10 md:pb-14 xl:gap-12 gap-10 grid-cols-1">
          <div className="animate__animated animate__fadeInUp animate__delay-3s">
            <div className="flex items-center gap-3 mb-6 bg-transparent w-fit py-2 px-1 rounded-2xl">
              <img src="./assets/cruz.png" className="w-8 rounded-md" />
              <q className="text-sm">Junior Full-Stack Developer</q>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">
              <ShinyText text="Hi I'm Cruz" disabled={false} speed={3} className='custom-class' />
            </h1>
            <BlurText
              text="A passionate full-stack developer who enjoys turning ideas into modern, reliable, and user-friendly web and mobile applications."
              delay={150}
              animateBy="words"
              direction="top"
              className="mb-7 text-sm md:text-base text-zinc-300"
            />
            <div className="flex items-center sm:gap-3 gap-2">
              <a 
                href="./assets/CV.pdf" 
                download="Faris_Edrik_Prayoga_CV.pdf" 
                className="text-sm font-semibold bg-[#1a1a1a] py-2.5 px-5 rounded-full border border-gray-700 hover:bg-[#222] transition-colors"
              >
                <ShinyText text="Download CV" disabled={false} speed={3} className="custom-class" />
              </a>

              <a href="#project" className="text-sm font-semibold bg-[#1a1a1a] py-2.5 px-5 rounded-full border border-gray-700 hover:bg-[#222] transition-colors">
                <ShinyText text="Explore My Projects" disabled={false} speed={3} className="custom-class" />
              </a>
            </div>

          </div>
          <div className="flex justify-center md:justify-end -translate-y-3 md:-translate-y-8 animate__animated animate__fadeInUp animate__delay-4s">
            <ProfileCard
              name="Cruz"
              title="Junior Developer"
              handle="N Z Cung JB"
              status="Online"
              contactText="Contact Me"
              avatarUrl="./assets/cruz.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            />
          </div>
        </div>
        {/* tentang */}
        <div className="section-gap mx-auto w-full max-w-[1600px] rounded-3xl border-[5px] border-violet-500/40 shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] px-5 py-5 md:px-6 md:py-5" id="about">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 pt-0 px-4 md:px-6" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            <div className="basis-full md:basis-7/12 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-violet-500/30 pb-6 md:pb-0">
              {/* Kolom kiri */}
              <div className="flex-1 text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  About Me
                </h2>

                <BlurText
                  text="Hi, I’m Cruz, a Computer Science student at INTI University, Malaysia, and a Junior Full-Stack Developer. I enjoy building real-world applications and have experience with React, Node.js, Python, FastAPI, Django, Laravel, Flutter, and databases. I’ve completed 6 projects, including e-commerce platforms, a Smart POS, a SaaS dashboard, and a mobile app. I’m passionate about learning, solving problems, and growing through real-world development experience."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-sm md:text-base leading-relaxed mb-6 text-gray-300"
                />

                <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-y-5 sm:gap-y-0 mb-3 w-full">
                  <div>
                    <h1 className="text-2xl md:text-3xl mb-1">
                      6<span className="text-violet-500">+</span>
                    </h1>
                    <p className="text-sm">Projects Completed</p>
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl mb-1">
                      1st<span className="text-violet-500"> Year</span>
                    </h1>
                    <p className="text-sm">Computer Science Student</p>
                  </div>
                  <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600" data-aos-once="true">
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
            <div className="basis-full md:basis-5/12 pl-0 md:pl-8 overflow-hidden max-w-full flex justify-center">
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
              <div className="tools-box grid w-full grid-cols-2 gap-3 min-[480px]:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5">
                {group.items.map((tool) => (
                  <div
                    key={tool.id}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay={tool.dad}
                    data-aos-once="true"
                    className="group flex h-full min-h-[4.5rem] min-w-0 items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900/60 p-2.5 shadow-lg backdrop-blur-md transition-all duration-300 min-[480px]:p-3 lg:hover:bg-zinc-800/80"
                  >
                    <img
                      src={tool.gambar}
                      alt={tool.nama}
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
        <div className="project section-gap" id="project" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true"></div>
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-2" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">Project</h1>
        <p className="text-sm md:text-base text-center opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">Showcasing a selection of projects that reflect my skills, creativity, and passion for building meaningful digital experiences.</p>
        <div className="project-box mt-10 bg-transparent" >

          <div className="relative h-auto bg-transparent" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true" >
            <ChromaGrid
              items={listProject}
              onItemClick={handleProjectClick} // Kirim fungsi untuk handle klik
              radius={500}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
        </div>
        {/* Project */}


        {/* Kontak */}
        <div className="kontak section-gap" id="contact">
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

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  )
}

export default App
