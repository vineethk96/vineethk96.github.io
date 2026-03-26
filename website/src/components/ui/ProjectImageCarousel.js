import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react";
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

const imgTransition = { duration: 0.15, ease: [0.32, 0.72, 0, 1] };
const springConfig = { type: "spring", stiffness: 100, damping: 30, mass: 0.1 };

function NavButton({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-full border-2 border-primary bg-background flex items-center justify-center transition-all duration-150 hover:bg-amber-400 hover:-translate-x-px hover:-translate-y-px active:translate-x-0 active:translate-y-0"
      style={{ boxShadow: "4px 4px 0px 0px #031632" }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "6px 6px 0px 0px #031632"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "4px 4px 0px 0px #031632"; }}
    >
      {direction === "left"
        ? <ChevronLeft className="w-4 h-4 text-primary" />
        : <ChevronRight className="w-4 h-4 text-primary" />
      }
    </button>
  );
}

const ImageCylinder = memo(({ images, rotation }) => {
  const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
  const cylinderWidth = isScreenSizeSm ? 600 : 900;
  const faceCount = images.length;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);
  const transform = useTransform(
    rotation,
    (value) => `rotate3d(0, 1, 0, ${value}deg)`
  );

  return (
    <div
      className="flex h-full items-start justify-center bg-transparent pt-8"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <motion.div
        drag="x"
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{
          transform,
          rotateY: rotation,
          width: cylinderWidth,
          transformStyle: "preserve-3d",
        }}
        onDrag={(_, info) => rotation.set(rotation.get() + info.offset.x * 0.05)}
        onDragEnd={(_, info) => {
          animate(rotation, rotation.get() + info.velocity.x * 0.05, springConfig);
        }}
      >
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="absolute flex h-full origin-center items-start justify-center rounded-xl p-2"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
            }}
          >
            <div className="w-full border-2 border-primary rounded-xl overflow-hidden">
              {img.url ? (
                <motion.img
                  src={img.thumbnail_url || img.url}
                  alt={img.alt || `Image ${i + 1}`}
                  className="pointer-events-none w-full object-cover aspect-[4/3]"
                  initial={{ filter: "blur(4px)" }}
                  animate={{ filter: "blur(0px)" }}
                  transition={imgTransition}
                />
              ) : (
                <div className="w-full aspect-[4/3] flex items-center justify-center bg-background">
                  <span className="font-mono text-xs text-primary/30 uppercase tracking-wider">
                    No Image
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});

function ProjectImageCarousel({ images = [] }) {
  const imgs = useMemo(() => images, [images]);
  const rotation = useMotionValue(0);
  const faceCount = imgs.length;
  const stepDeg = faceCount > 0 ? 360 / faceCount : 0;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (faceCount === 0) return;
    const unsubscribe = rotation.on("change", (val) => {
      const idx = Math.round((-val / stepDeg) % faceCount + faceCount) % faceCount;
      setActiveIndex(idx);
    });
    return unsubscribe;
  }, [rotation, stepDeg, faceCount]);

  const handlePrev = () => animate(rotation, rotation.get() + stepDeg, springConfig);
  const handleNext = () => animate(rotation, rotation.get() - stepDeg, springConfig);

  if (faceCount === 0) return null;

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative h-[260px] w-full overflow-hidden">
        <ImageCylinder images={imgs} rotation={rotation} />
      </div>
      <div className="flex items-center gap-6 mt-3">
        <NavButton direction="left" onClick={handlePrev} />
        <span className="font-mono text-xs text-primary/50 tracking-widest tabular-nums">
          {String(activeIndex + 1).padStart(2, '0')} / {String(faceCount).padStart(2, '0')}
        </span>
        <NavButton direction="right" onClick={handleNext} />
      </div>
    </div>
  );
}

export { ProjectImageCarousel };
