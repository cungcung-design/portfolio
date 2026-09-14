import "remixicon/fonts/remixicon.css";

const Footer = () => {
  return (
    <div className="section-gap pb-8 flex flex-col items-center relative z-10 max-w-7xl mx-auto w-full px-6">
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between gap-6">
        <h1 className="text-lg md:text-xl font-bold">
          Portofolio
        </h1>

        <div className="flex gap-3">
          <a href="https://github.com/cungcung-design" target="_blank" rel="noopener noreferrer"><i className="ri-github-fill ri-2x"></i></a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
