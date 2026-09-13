// ProjectGrid.jsx
// Replaces the SlideShow carousel with a clean, minimal editorial grid.
// Matches the Interests section's visual language: flat dark slate cards,
// thin borders, one cyan accent color, no per-card gradient thumbnails.
// Clicking a card opens a detail modal.
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

// ---- 1. Tag color maps ---------------------------------------------------
const tagColors = {
  LibGDX: "bg-red-700",
  Javascript: "bg-yellow-400",
  Django: "bg-green-700",
  Python: "bg-teal-700",
  "Html/Css": "bg-orange-600",
  JQuery: "bg-red-700",
  PostgreSQL: "bg-blue-600",
  Docker: "bg-blue-800",
  SQL: "bg-blue-500",
  QGIS: "bg-lime-900",
  UI: "bg-emerald-600",
  Laravel: "bg-purple-600",
  PHP: "bg-indigo-700",
  Java: "bg-orange-500",
  MySQL: "bg-sky-700",
  SQLServer: "bg-slate-700",
  PyTorch: "bg-orange-700",
  Transformers: "bg-amber-600",
  "ESM-2": "bg-cyan-700",
  Bioinformatics: "bg-emerald-700",
  RandomForest: "bg-lime-700",
  OpenAI: "bg-emerald-800",
  VectorDB: "bg-indigo-700",
  NLP: "bg-violet-700",
  PowerPlatform: "bg-fuchsia-700",
  Leaflet: "bg-green-600",
  GeneticAlgorithms: "bg-rose-700",
  Simulation: "bg-sky-800",
  "Scikit-Learn": "bg-orange-600",
  Optuna: "bg-purple-700",
  SpaCy: "bg-teal-800",
  TextBlob: "bg-pink-700",
  GloVe: "bg-cyan-800",
};

const textColors = {
  LibGDX: "text-red-300",
  Javascript: "text-yellow-100",
  Django: "text-green-200",
  Python: "text-teal-200",
  "Html/Css": "text-orange-200",
  JQuery: "text-red-300",
  PostgreSQL: "text-blue-200",
  Docker: "text-blue-200",
  SQL: "text-blue-200",
  QGIS: "text-lime-200",
  UI: "text-emerald-100",
  Laravel: "text-purple-200",
  PHP: "text-indigo-200",
  Java: "text-orange-200",
  MySQL: "text-sky-200",
  SQLServer: "text-slate-200",
  PyTorch: "text-orange-200",
  Transformers: "text-amber-100",
  "ESM-2": "text-cyan-200",
  Bioinformatics: "text-emerald-200",
  RandomForest: "text-lime-200",
  OpenAI: "text-emerald-200",
  VectorDB: "text-indigo-200",
  NLP: "text-violet-200",
  PowerPlatform: "text-fuchsia-200",
  Leaflet: "text-green-200",
  GeneticAlgorithms: "text-rose-200",
  Simulation: "text-sky-200",
  "Scikit-Learn": "text-orange-200",
  Optuna: "text-purple-200",
  SpaCy: "text-teal-200",
  TextBlob: "text-pink-200",
  GloVe: "text-cyan-200",
};

const getTagColor = (tag) => tagColors[tag] || "bg-gray-500";
const getTextColor = (tag) => textColors[tag] || "text-white";

// ---- 2. Single card --------------------------------------------------------
// Flat slate card, thin border, cyan accent only on hover/focus — same
// language as your Interests cards. No gradient thumbnail block.
const ProjectCard = ({ project, onOpen }) => {
  const tagList = project.tags.split(",");
  const primaryTag = tagList[0];
  return (
    <button
      onClick={() => onOpen(project)}
      className="group flex flex-col text-left w-full min-h-[200px] rounded-2xl border border-slate-500/25 bg-slate-900/30 p-6 transition-colors duration-300 hover:border-cyan-400/60 hover:bg-slate-800/50 focus:outline-none focus-visible:border-cyan-400/60"
    >
      {/* Thin accent rule instead of a big gradient block */}
      <div className="h-[3px] w-10 rounded-full bg-cyan-400/70 transition-all duration-300 group-hover:w-16" />

      <h3 className="my-4 font-serif text-lg md:text-xl font-medium leading-snug text-slate-100">
        {project.title}
      </h3>
      <p className="my-2 text-slate-300 font-serif text-base md:text-lg sm:text-justify leading-relaxed">
        {project.description}
      </p>

      {/* Meta row */}
      <div className="mt-4 flex items-center gap-2 text-xs md:text-sm font-serif text-slate-400">
            <span
            className={`px-2 py-0.5 rounded-full font-semibold ${getTagColor(
                primaryTag
            )} ${getTextColor(primaryTag)}`}
            >
            {primaryTag}
            </span>
            <span>+{tagList.length - 1} technologies</span>
      </div>
    </button>
  );
};

// ---- Touch/coarse-pointer detection (same pattern as InterestCard) --------
function useIsCoarsePointer() {
  const [isCoarse, setIsCoarse] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsCoarse(mql.matches);
    const handleChange = (e) => setIsCoarse(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);
  return isCoarse;
}

// ---- 3. Detail modal -------------------------------------------------------
const ProjectModal = ({ project, onClose }) => {
  const isCoarse = useIsCoarsePointer();

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    // Push a history entry so the back button/gesture closes the modal
    // instead of navigating away from the page (works on desktop and mobile).
    window.history.pushState({ modal: true }, "");
    const handlePopState = () => onClose();
    window.addEventListener("popstate", handlePopState);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleClose = () => {
    // If we pushed a history entry, go back to remove it cleanly;
    // popstate then triggers onClose. Otherwise close directly.
    if (window.history.state?.modal) {
      window.history.back();
    } else {
      onClose();
    }
  };

  const tagList = project.tags.split(",");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2"
      onClick={handleClose}
    >
      <div
        className="bg-slate-800 border border-slate-700/60 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-5 md:p-10">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 bg-slate-800/70 hover:bg-slate-700 rounded-full p-2 text-slate-200 transition-colors"
            aria-label="Close"
          >
            <IoClose size={20} />
          </button>

          <div className="h-[3px] w-10 rounded-full bg-cyan-400/70" />
          <h2 className="text-2xl font-serif font-semibold text-white mt-10 mb-5">
            {project.title}
          </h2>
          <p className="font-serif text-slate-300 text-lg leading-relaxed mb-6 text-justify hyphens-auto whitespace-pre-line">
            {project.fullDescription}
          </p>
          <div className="flex flex-wrap gap-2">
            {tagList.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getTagColor(
                  tag
                )} ${getTextColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom close button — only rendered on touch/coarse-pointer devices */}
          {isCoarse && (
            <button
              onClick={handleClose}
              className="w-full mt-8 px-6 py-3 rounded-full border border-slate-600 text-slate-200 text-sm font-medium active:bg-slate-700 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ---- 4. Grid container ------------------------------------------------------
const LGLIMIT = 6;
const SMALLLIMIT = 3;
const LGBREAKPOINT = "(min-width: 1024px)";

function ProjectGrid({ slides }) {
  const [activeProject, setActiveProject] = useState(null);
  const [limit, setLimit] = useState(SMALLLIMIT);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(LGBREAKPOINT);
    const applyLimit = (matchesLg) => setLimit(matchesLg ? LGLIMIT : SMALLLIMIT);
    applyLimit(mql.matches);
    const handleChange = (e) => applyLimit(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const visibleSlides = expanded ? slides : slides.slice(0, limit);
  const hasMore = slides.length > limit;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleSlides.map((project) => (
          <ProjectCard key={project.title} project={project} onOpen={setActiveProject} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="px-6 py-2.5 rounded-full border border-slate-600 text-slate-200 text-sm font-medium hover:border-slate-400 hover:bg-slate-800 transition-colors"
          >
            {expanded ? "See less" : `See ${slides.length - limit} more`}
          </button>
        </div>
      )}

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </div>
  );
}

export default ProjectGrid;
