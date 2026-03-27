import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useMediaQuery(query, { defaultValue = false, initializeWithValue = true } = {}) {
  const IS_SERVER = typeof window === "undefined";

  const getMatches = (q) => {
    if (IS_SERVER) return defaultValue;
    return window.matchMedia(q).matches;
  };

  const [matches, setMatches] = useState(() => {
    if (initializeWithValue) return getMatches(query);
    return defaultValue;
  });

  const handleChange = () => setMatches(getMatches(query));

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);
    handleChange();
    matchMedia.addEventListener("change", handleChange);
    return () => matchMedia.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

const duration = 0.15;
const transition = { duration, ease: [0.32, 0.72, 0, 1] };
const springConfig = { type: "spring", stiffness: 100, damping: 30, mass: 0.1 };

function NavButton({ direction, onClick, disabled }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`w-10 h-10 rounded-full border-2 border-primary bg-background flex items-center justify-center transition-all duration-150 ${
        disabled
          ? 'opacity-40 cursor-not-allowed pointer-events-none'
          : 'hover:bg-amber-400 hover:-translate-x-px hover:-translate-y-px active:translate-x-0 active:translate-y-0'
      }`}
      style={{ boxShadow: "4px 4px 0px 0px #031632" }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.boxShadow = "6px 6px 0px 0px #031632"; }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.boxShadow = "4px 4px 0px 0px #031632"; }}
      disabled={disabled}
    >
      {direction === "left"
        ? <ChevronLeft className="w-4 h-4 text-primary" />
        : <ChevronRight className="w-4 h-4 text-primary" />
      }
    </button>
  );
}

const Carousel = memo(({ handleClick, cards, isCarouselActive, rotation }) => {
  const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
  const cylinderWidth = isScreenSizeSm ? 825 : 1350;
  const faceCount = cards.length;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);
  const transform = useTransform(
    rotation,
    (value) => `rotate3d(0, 1, 0, ${value}deg)`
  );

  return (
    <div
      className="flex h-full items-start justify-center bg-transparent pt-14"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <motion.div
        drag={isCarouselActive ? "x" : false}
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{
          transform,
          rotateY: rotation,
          width: cylinderWidth,
          transformStyle: "preserve-3d",
        }}
        onDrag={(_, info) =>
          isCarouselActive && rotation.set(rotation.get() + info.offset.x * 0.05)
        }
        onDragEnd={(_, info) => {
          if (!isCarouselActive) return;
          animate(rotation, rotation.get() + info.velocity.x * 0.05, springConfig);
        }}
      >
        {cards.map((project, i) => {
          const imgUrl = project.images?.[0]?.thumbnail_url;
          return (
            <motion.div
              key={`key-${project.id}-${i}`}
              className="absolute flex h-full origin-center items-start justify-center rounded-xl p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(project)}
            >
              <div className="w-full border-2 border-primary bg-background rounded-xl overflow-hidden cursor-pointer">
                {imgUrl ? (
                  <motion.img
                    src={imgUrl}
                    alt={project.title}
                    className="pointer-events-none w-full object-cover aspect-square"
                    initial={{ filter: "blur(4px)" }}
                    animate={{ filter: "blur(0px)" }}
                    transition={transition}
                  />
                ) : (
                  <div className="w-full aspect-square flex items-center justify-center bg-background p-2">
                    <span className="font-mono text-xs text-primary/30 uppercase tracking-wider text-center">
                      No Image
                    </span>
                  </div>
                )}
                <div className="px-2 py-1.5" style={{ backgroundColor: "#031632" }}>
                  <div className="font-mono text-xs truncate" style={{ color: "#f0eee9" }}>
                    {project.title}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
});

function ThreeDPhotoCarousel({ projects = [], isPowered = false }) {
  const navigate = useNavigate();
  const cards = useMemo(() => projects, [projects]);
  const rotation = useMotionValue(0);
  const faceCount = projects.length;
  const stepDeg = faceCount > 0 ? 360 / faceCount : 0;

  const handleClick = (project) => {
    if (!isPowered) return;
    navigate(`/projects/${project.id}`);
  };

  const handlePrev = () => animate(rotation, rotation.get() + stepDeg, springConfig);
  const handleNext = () => animate(rotation, rotation.get() - stepDeg, springConfig);

  return (
    <motion.div layout className="relative flex flex-col items-center">
      <div className="relative h-[350px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          cards={cards}
          isCarouselActive={isPowered}
          rotation={rotation}
        />
      </div>
      <div className="flex items-center gap-6 mt-3">
        <NavButton direction="left" onClick={handlePrev} disabled={!isPowered} />
        <NavButton direction="right" onClick={handleNext} disabled={!isPowered} />
      </div>
    </motion.div>
  );
}

export { ThreeDPhotoCarousel };
