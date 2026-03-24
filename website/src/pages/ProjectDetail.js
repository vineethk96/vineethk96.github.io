import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../data/constants';
import DOMPurify from 'dompurify';
import { useAnalytics } from '../hooks/useAnalytics';

const createMarkup = (html) => ({
  __html: DOMPurify.sanitize(html, {
    FORBID_ATTR: ['style', 'class'],
    FORBID_TAGS: ['style', 'link'],
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
  const [activeImage, setActiveImage] = useState(0);

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
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary/60 hover:text-primary transition-colors duration-200 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Return to Inventory
          </button>
        </div>
      </div>
    );
  }

  const images = project.images?.length
    ? project.images
    : [{ url: null, alt: project.title, caption: 'Project overview' }];

  const isOperational = project.status === 'Completed' || project.status === 'Active';

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
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary/50 hover:text-primary transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Component Inventory
        </motion.button>

        {/* Header */}
        <motion.div variants={fadeUp} custom={1} className="mb-6">
          <div className="section-label">Specification Sheet</div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-primary leading-tight">
            {project.title}
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="font-mono text-xs text-primary/40 uppercase tracking-wider">
              Deploy Ref: {project.year}
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  isOperational ? 'bg-success led-indicator' : 'bg-primary/30'
                }`}
                aria-hidden="true"
              />
              <span className={`font-mono text-xs uppercase tracking-wider ${
                isOperational ? 'text-success' : 'text-primary/40'
              }`}>
                {project.status || 'Unknown'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Left — Image + Description */}
          <div className="lg:col-span-3 space-y-5">
            {/* Image Viewer */}
            <motion.div variants={fadeUp} custom={2} className="technic-module overflow-hidden">
              <div className="relative aspect-video bg-faint border-b-2 border-primary">
                {images[activeImage]?.url ? (
                  <img
                    src={images[activeImage].url}
                    alt={images[activeImage].alt || project.title}
                    className="w-full h-full object-cover"
                  />
                ) : project.icon ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <project.icon className="w-20 h-20 text-primary/10" aria-hidden="true" />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-mono text-xs text-primary/20 uppercase tracking-wider">
                      No Image
                    </span>
                  </div>
                )}
                {/* Operational badge */}
                <div className={`absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 border-2 rounded-full font-mono text-xs uppercase tracking-wider ${
                  isOperational
                    ? 'border-success bg-background text-success'
                    : 'border-primary/30 bg-background text-primary/50'
                }`}>
                  {isOperational && (
                    <>
                      <span className="relative flex h-2 w-2" aria-hidden="true">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                      </span>
                    </>
                  )}
                  {isOperational ? 'Operational' : project.status}
                </div>
              </div>
              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`flex-shrink-0 w-16 h-12 border-2 overflow-hidden transition-all duration-150 ${
                        activeImage === i ? 'border-accent' : 'border-primary/20 hover:border-primary/50'
                      }`}
                    >
                      {img.url ? (
                        <img
                          src={img.thumbnail_url || img.url}
                          alt={img.alt || `Image ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-faint" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Overview */}
            <motion.div variants={fadeUp} custom={3} className="technic-module p-5">
              <div className="section-label mb-3">Overview</div>
              <p className="font-body text-primary/70 leading-relaxed mb-4">
                {project.description}
              </p>
              {project.detailed_description ? (
                <div
                  className="prose prose-sm max-w-none text-primary/70 prose-headings:font-heading prose-headings:text-primary prose-strong:text-primary"
                  dangerouslySetInnerHTML={createMarkup(project.detailed_description)}
                />
              ) : (
                <div className="space-y-3 text-primary/60">
                  <p className="font-body text-sm leading-relaxed">
                    This project demonstrates {(project.tags || []).slice(0, 3).join(', ')} in a
                    real-world application.
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            {/* CTAs */}
            <motion.div variants={fadeUp} custom={2} className="technic-module p-5">
              <div className="section-label mb-3">Access Points</div>
              <div className="space-y-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('external_link_clicked', { type: 'github', project_id: project.id })}
                    className="flex items-center gap-2 w-full px-4 py-2.5 border-2 border-primary bg-background rounded-xl hover:bg-primary hover:text-background font-mono text-xs uppercase tracking-wider transition-all duration-200"
                    style={{ boxShadow: '3px 3px 0px 0px #031632' }}
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    Source Code
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('external_link_clicked', { type: 'demo', project_id: project.id })}
                    className="flex items-center gap-2 w-full px-4 py-2.5 border-2 border-accent bg-accent text-primary rounded-xl hover:bg-accent/80 font-mono text-xs uppercase tracking-wider transition-all duration-200"
                    style={{ boxShadow: '3px 3px 0px 0px #031632' }}
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    Live Demo
                  </a>
                )}
                {!project.github && !project.demo && (
                  <div className="font-mono text-xs text-primary/30 uppercase tracking-wider">
                    No public links available
                  </div>
                )}
              </div>
            </motion.div>

            {/* Technical Specs */}
            <motion.div variants={fadeUp} custom={3} className="technic-module p-5">
              <div className="section-label mb-3">Technical Specs</div>
              <div className="space-y-3 text-sm mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-primary/40 uppercase tracking-wider">Year</span>
                  <span className="font-mono text-xs text-primary">{project.year}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-primary/40 uppercase tracking-wider">Status</span>
                  <span className={`font-mono text-xs uppercase tracking-wider ${isOperational ? 'text-success' : 'text-primary/60'}`}>
                    {project.status}
                  </span>
                </div>
                {project.size && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-xs text-primary/40 uppercase tracking-wider">Complexity</span>
                      <span className="font-mono text-xs text-primary">{project.size}/10</span>
                    </div>
                    {/* Complexity bar */}
                    <div className="h-1.5 bg-faint border border-muted overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-700"
                        style={{ width: `${(project.size / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Tech Stack */}
              <div className="section-label mb-2">Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {(project.technologies || project.tags || []).map((tech, i) => (
                  <span key={i} className="tag-pill">{tech}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default ProjectDetail;
