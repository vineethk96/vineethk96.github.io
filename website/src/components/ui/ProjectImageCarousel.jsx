import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
} from './carousel';

function ProjectImageCarousel({ images = [] }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') setLightboxIndex(i => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setLightboxIndex(i => Math.min(images.length - 1, i + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, images.length]);

  if (!images.length) {
    return (
      <div className="flex items-center justify-center h-40">
        <span className="font-mono text-xs text-primary-muted uppercase tracking-widest">
          No_Schematics_Available
        </span>
      </div>
    );
  }

  const lightboxImage = lightboxIndex !== null ? images[lightboxIndex] : null;

  return (
    <>
      <div className="relative w-full">
        <Carousel>
          <CarouselContent>
            {images.map((image, i) => (
              <CarouselItem key={i}>
                <div className="w-full">
                  <div
                    className="relative w-full h-64 flex items-center justify-center overflow-hidden rounded border border-primary/20 bg-black/10 cursor-pointer group"
                    onClick={() => setLightboxIndex(i)}
                    title="Click to enlarge"
                  >
                    <img
                      src={image.medium_url || image.url}
                      alt={image.alt || `Project image ${i + 1}`}
                      className="max-w-full max-h-full object-contain object-center transition-transform duration-200 group-hover:scale-[1.02]"
                      draggable={false}
                    />
                    {(image.caption || image.alt) && (
                      <span className="absolute bottom-2 left-2 text-[10px] px-2 py-1 bg-primary border border-background/20 text-background/80 uppercase font-mono">
                        {image.caption || image.alt}
                      </span>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNavigation
            loop
            alwaysShow
            classNameButton="w-10 h-10 border-2 border-primary bg-background text-primary flex items-center justify-center transition-all duration-150 hover:bg-amber-400 hover:-translate-x-px hover:-translate-y-px active:translate-x-0 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px_#031632] hover:shadow-[6px_6px_0px_0px_#031632]"
          />
          <CarouselIndicator
            className="absolute bottom-2 z-50"
            classNameButtonActive="rounded-none rotate-45 bg-amber-400"
            classNameButton="rounded-full bg-black/30 hover:bg-zinc-100/60"
          />
        </Carousel>
      </div>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 p-2 rounded border border-primary/30 bg-primary/80 text-accent hover:bg-primary transition-colors"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Image counter */}
            <span className="absolute top-4 left-4 font-mono text-xs text-accent/70 uppercase tracking-widest">
              {lightboxIndex + 1} / {images.length}
            </span>

            {/* Prev arrow */}
            <button
              className="absolute left-4 p-2 rounded border border-primary/30 bg-primary/80 text-accent hover:bg-primary transition-colors disabled:opacity-20"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => Math.max(0, i - 1)); }}
              disabled={lightboxIndex === 0}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Next arrow */}
            <button
              className="absolute right-4 p-2 rounded border border-primary/30 bg-primary/80 text-accent hover:bg-primary transition-colors disabled:opacity-20"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => Math.min(images.length - 1, i + 1)); }}
              disabled={lightboxIndex === images.length - 1}
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>

            {/* Image content */}
            <motion.div
              className="flex flex-col items-center max-w-5xl max-h-[90vh] px-16"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage.original_url || lightboxImage.url}
                alt={lightboxImage.alt || `Project image ${lightboxIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded border border-primary/20"
                draggable={false}
              />
              {(lightboxImage.caption || lightboxImage.alt) && (
                <p className="mt-3 font-mono text-xs text-accent/60 uppercase tracking-widest text-center">
                  {lightboxImage.caption || lightboxImage.alt}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { ProjectImageCarousel };
