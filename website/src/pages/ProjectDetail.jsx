import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../data/constants';
import DOMPurify from 'dompurify';
import { useAnalytics } from '../hooks/useAnalytics';
import { ProjectImageCarousel } from '../components/ui/ProjectImageCarousel';

const CADModelViewer = React.lazy(() =>
  import('../components/ui/CADModelViewer').then(m => ({ default: m.CADModelViewer }))
);

const isSafeUrl = (url) => {
  try {
    const { protocol } = new URL(url);
    return protocol === 'https:' || protocol === 'http:';
  } catch { return false; }
};

const createMarkup = (html) => ({
  __html: DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'a', 'code', 'pre',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote',
      'img', 'figure', 'figcaption',
      'table', 'thead', 'tbody', 'tr', 'td', 'th',
      'div', 'span',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'alt', 'src', 'width', 'height', 'class'],
    FORCE_BODY: true,
  }),
});

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.08, ease: 'easeOut' },
  }),
};

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { track } = useAnalytics();
  const project = PROJECTS?.find(p => p.id === projectId);

  useEffect(() => {
    if (!project) {
      track('project_not_found', { project_id: projectId });
    }
  }, [project, projectId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!project) {
    return (
      <div className="pt-28 pb-24 px-4 min-h-screen flex items-center justify-center">
        <div className="technic-module p-8 text-center max-w-sm">
          <div className="section-label mb-2">Error 404</div>
          <h1 className="font-heading font-bold text-primary text-2xl mb-4">
            Module Not Found
          </h1>
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary-sub hover:text-primary transition-colors duration-200 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Return to Inventory
          </button>
        </div>
      </div>
    );
  }

  const isOperational = project.status === 'Completed' || project.status === 'Active';
  const projectImages = project.images?.filter(img => img.url) ?? [];
  const hasCadModel = Boolean(project.cad_model_url);
  const featuredImage = !hasCadModel ? projectImages[0] ?? null : null;
  const carouselImages = !hasCadModel ? projectImages.slice(1) : projectImages;

  return (
    <motion.div
      className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen"
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <motion.button
          variants={fadeUp}
          custom={0}
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary hover:text-primary transition-colors duration-200 mb-10"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Component Inventory
        </motion.button>

        {/* Section 1: Hero — 2-col */}
        <motion.div variants={fadeUp} custom={1} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Left: CAD Model Viewer or Featured Image */}
          {hasCadModel ? (
            <React.Suspense fallback={
              <div className="technic-module flex items-center justify-center" style={{ minHeight: '360px' }}>
                <span className="font-mono text-xs text-primary-muted uppercase tracking-widest">Loading_CAD_Model...</span>
              </div>
            }>
              <CADModelViewer modelUrl={project.cad_model_url} cameraView={project.cad_camera_view} modelRotation={project.cad_model_rotation} />
            </React.Suspense>
          ) : featuredImage ? (
            <div className="technic-module flex items-center justify-center p-4" style={{ minHeight: '360px' }}>
              <img
                src={featuredImage.url}
                alt={featuredImage.alt || project.title}
                className="max-h-80 w-full object-contain rounded-lg"
              />
            </div>
          ) : (
            <div className="technic-module flex items-center justify-center" style={{ minHeight: '360px' }}>
              <span className="font-mono text-xs text-primary-muted uppercase tracking-widest">No_Preview_Available</span>
            </div>
          )}

          {/* Right: Title + Meta */}
          <div className="flex flex-col justify-center gap-4 lg:pl-4">
            <p className="font-mono text-xs text-primary tracking-widest uppercase">
              DEPLOYMENT_REF: {project.year}
            </p>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-primary tracking-tighter uppercase leading-none relative pr-14 sm:pr-16">
              <span
                className="italic text-accent"
                style={{ textShadow: '4px 4px 0px rgba(50, 50, 50, 0.7)' }}
              >
                {project.title}
              </span>
              {project.icon && (
                <span className="absolute right-0 top-0 bottom-0 flex items-center">
                  <project.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary" aria-hidden="true" />
                </span>
              )}
            </h1>
            <p className="font-body text-primary-sub text-base leading-relaxed">
              {project.description}
            </p>
            <div className="flex gap-3 flex-wrap">
              {project.github && isSafeUrl(project.github) && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('external_link_clicked', { type: 'github', project_id: project.id })}
                  className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-4 py-2.5 border-2 border-primary bg-primary text-background rounded-xl transition-all duration-150 hover:-translate-x-px hover:-translate-y-px active:translate-x-0 active:translate-y-0"
                  style={{ boxShadow: '4px 4px 0px 0px #031632' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '6px 6px 0px 0px #031632'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0px 0px #031632'; }}
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  View_Github
                </a>
              )}
              {project.demo && isSafeUrl(project.demo) && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('external_link_clicked', { type: 'demo', project_id: project.id })}
                  className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-4 py-2.5 border-2 border-primary bg-background text-primary rounded-xl transition-all duration-150 hover:-translate-x-px hover:-translate-y-px active:translate-x-0 active:translate-y-0"
                  style={{ boxShadow: '4px 4px 0px 0px #031632' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '6px 6px 0px 0px #031632'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0px 0px #031632'; }}
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  Live_Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Section 2: Specs + Carousel — 3-col */}
        <motion.div variants={fadeUp} custom={2} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

          {/* Left: Technical Specs Panel */}
          <div className="bg-primary text-background border-2 border-primary p-6 rounded-2xl" style={{ boxShadow: '8px 8px 0px 0px #FFBF00' }}>
            <h2 className="font-heading font-black text-xl tracking-tight uppercase mb-6">Technical_Specifications</h2>

            {project.size && (
              <div className="mb-5">
                <p className="text-accent/80 text-[10px] font-bold tracking-[0.2em] mb-1 uppercase">
                  Complexity_Index
                </p>
                <div className="flex gap-1 mb-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-3 flex-1 rounded-sm ${i < project.size ? 'bg-background' : 'bg-background/10'}`}
                    />
                  ))}
                </div>
                <p className="font-mono text-[10px] text-background/40 text-right">{project.size}/10</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 mb-5">
              <div className="border border-background/20 rounded-lg p-2.5">
                <p className="text-accent/80 text-[10px] font-bold tracking-[0.2em] mb-1 uppercase">Year</p>
                <p className="font-mono text-xs text-background">{project.year}</p>
              </div>
              <div className="border border-background/20 rounded-lg p-2.5">
                <p className="text-accent/80 text-[10px] font-bold tracking-[0.2em] mb-1 uppercase">Status</p>
                <p className={`font-mono text-xs ${isOperational ? 'text-green-400' : 'text-background/60'}`}>
                  {project.status}
                </p>
              </div>
            </div>

            <p className="text-accent/80 text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
              Tech_Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(project.technologies || project.tags || []).map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-1 bg-white/10 border border-background/20 text-background/80 uppercase font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: 3D Image Carousel */}
          <div className="lg:col-span-2 technic-module p-5">
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">
              System_Schematics
            </p>
            {carouselImages.length > 0 ? (
              <ProjectImageCarousel images={carouselImages} />
            ) : (
              <div className="flex items-center justify-center h-40">
                <span className="font-mono text-xs text-primary-muted uppercase tracking-widest">
                  No_Schematics_Available
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Section 3: Execution Log / Body */}
        <motion.div variants={fadeUp} custom={3} className="technic-module p-6 mb-10">
          <div className="flex items-center justify-between border-b-2 border-primary pb-3 mb-6">
            <p className="font-mono text-xs text-primary tracking-widest uppercase">
              Execution_Log // {project.title}
            </p>
            <span className="font-mono text-[10px] text-primary-muted uppercase border border-primary/20 px-2 py-0.5 rounded">
              Field_Notes
            </span>
          </div>
          {project.detailed_description ? (
            <div
              className="prose prose-sm max-w-none text-primary-sub prose-headings:font-heading prose-headings:text-primary prose-strong:text-primary prose-a:text-primary dark:prose-invert"
              dangerouslySetInnerHTML={createMarkup(project.detailed_description)}
            />
          ) : (
            <p className="font-body text-primary-sub leading-relaxed">{project.description}</p>
          )}
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ProjectDetail;
