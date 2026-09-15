import React, { useState, useEffect } from 'react';
import { FiX, FiGithub } from 'react-icons/fi';

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      const prevHtml = document.documentElement.style.overflow;
      const prevBody = document.body.style.overflow;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = prevHtml;
        document.body.style.overflow = prevBody;
      };
    }
    return undefined;
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain bg-black/70 p-4 sm:items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`my-auto w-full max-w-lg max-h-[min(92dvh,900px)] overflow-y-auto overscroll-contain rounded-2xl border border-violet-500/50 bg-zinc-900 shadow-2xl shadow-violet-500/20 transform transition-transform duration-300 scroll-y-touch ${isClosing ? 'animate-out' : 'animate-in'}`}
      >
        <img
          src={project.image}
          alt={project.title}
          className="h-44 w-full object-cover rounded-t-2xl sm:h-56"
        />

        <div className="flex flex-col gap-4 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 pr-2">
              <h2 className="text-xl font-bold text-white break-words sm:text-2xl">{project.title}</h2>
              {project.tech && (
                <p className="mt-2 text-sm font-semibold text-zinc-300 break-words">
                  {project.tech}
                </p>
              )}
            </div>
            <button
              onClick={handleClose}
              className="shrink-0 rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
              aria-label="Close project details"
            >
              <FiX size={24} />
            </button>
          </div>

          <p className="text-base leading-relaxed text-zinc-300 break-words">
            {project.fullDescription}
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent bg-violet-600 p-3 px-5 font-semibold transition-colors hover:bg-violet-700"
              >
                <span>Live Demo ↗</span>
              </a>
            )}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent bg-violet-600 p-3 px-5 font-semibold transition-colors hover:bg-violet-700"
            >
              <FiGithub />
              <span>GitHub ↗</span>
            </a>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        @keyframes scaleOut {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.95); opacity: 0; }
        }
        .animate-out {
          animation: scaleOut 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
