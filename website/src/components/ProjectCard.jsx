import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-500/90 text-white';
    case 'In Progress':
      return 'bg-yellow-500/90 text-gray-900';
    case 'Planning':
      return 'bg-blue-500/90 text-white';
    default:
      return 'bg-gray-500/90 text-white';
  }
};

/**
 * Shared project card used by FeaturedProjects and ProjectGrid.
 * Accepts a `project` object with the full PROJECTS shape plus an optional `maxTags` limit.
 * `variant` is either "featured" (no status/year badge, 4-tag limit, "Learn more" CTA)
 * or "grid" (status badge, year label, github/demo links, "Case Study" CTA).
 */
const ProjectCard = ({ project, variant = 'grid' }) => {
  const [imgError, setImgError] = useState(false);

  const featuredImage =
    !imgError && project.images && project.images.length > 0
      ? project.images[0].medium_url
      : null;
  const imageAlt =
    project.images && project.images.length > 0
      ? project.images[0].alt
      : `${project.title} thumbnail`;

  const tags = variant === 'featured' ? project.tags.slice(0, 4) : project.tags;
  const projectLink = `/projects/${project.id}`;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className={`relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 ${variant === 'grid' ? 'h-full flex flex-col' : ''}`}>
        {/* Image or Gradient header */}
        <div className="relative h-48 lg:h-56 overflow-hidden">
          {featuredImage ? (
            <>
              <img
                src={featuredImage}
                alt={imageAlt}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
              {/* Dark overlay for images */}
              <div className="absolute inset-0 bg-black/30" />
            </>
          ) : (
            <>
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
              <div className="absolute inset-0 bg-black/10" />
              {/* Shimmer animation only on gradients */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: [-100, 300], opacity: [0, 0.5, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
              />
            </>
          )}

          {/* Icon */}
          <div className="absolute top-4 left-4 z-10">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
              <project.icon className="w-8 h-8 text-white" aria-hidden="true" />
            </div>
          </div>

          {variant === 'grid' && (
            <>
              {/* Status badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              {/* Year label */}
              <div className="absolute bottom-4 left-4 z-10">
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg">
                  <span className="text-white/90 text-sm font-medium">{project.year}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className={`p-6 ${variant === 'grid' ? 'flex-1 flex flex-col' : ''}`}>
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-600 transition-colors duration-300">
            {project.title}
          </h3>
          <p className={`text-primary-sub mb-4 ${variant === 'grid' ? 'flex-1 text-sm leading-relaxed' : 'line-clamp-3'}`}>
            {project.description}
          </p>

          {/* Tags */}
          <div className={`flex flex-wrap gap-2 ${variant === 'grid' ? 'mb-6' : 'mb-4'}`}>
            {tags.map((tag) => (
              <span
                key={tag}
                className={`py-1 text-xs font-medium bg-gray-100 text-primary-sub rounded-full ${variant === 'grid' ? 'px-2' : 'px-3'}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          {variant === 'grid' ? (
            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-primary-sub hover:text-primary-600 transition-colors duration-300"
                    aria-label={`${project.title} on GitHub`}
                  >
                    <Github className="w-5 h-5" aria-hidden="true" />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-primary-sub hover:text-primary-600 transition-colors duration-300"
                    aria-label={`${project.title} live demo`}
                  >
                    <ExternalLink className="w-5 h-5" aria-hidden="true" />
                  </a>
                )}
              </div>
              <Link
                to={projectLink}
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300 text-sm"
              >
                <span>Case Study</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <Link
              to={projectLink}
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300"
            >
              <span>Learn more</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
