import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { BLOG_POSTS } from '../data/constants';
import { useAnalytics } from '../hooks/useAnalytics';

const createMarkup = (html) => ({
  __html: DOMPurify.sanitize(html, {
    FORBID_ATTR: ['style', 'onerror', 'onclick', 'onload'],
    FORBID_TAGS: ['style', 'link', 'script'],
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

const BlogDetail = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const { track } = useAnalytics();
  const blog = (BLOG_POSTS || []).find(b => b.id === blogId);

  useEffect(() => {
    if (!blog) {
      track('blog_not_found', { blog_id: blogId });
    }
  }, [blog, blogId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!blog) {
    return (
      <div className="pt-28 pb-24 px-4 min-h-screen flex items-center justify-center">
        <div className="technic-module p-8 text-center max-w-sm">
          <div className="section-label mb-2">Error 404</div>
          <h1 className="font-heading font-bold text-primary text-2xl mb-4">
            Article Not Found
          </h1>
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary/60 hover:text-primary transition-colors duration-200 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Return to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen"
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <motion.button
          variants={fadeUp}
          custom={0}
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary/50 hover:text-primary transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Field Notes
        </motion.button>

        {/* Cover Image */}
        {blog.cover_image?.url && (
          <motion.div
            variants={fadeUp}
            custom={1}
            className="technic-module overflow-hidden mb-6"
          >
            <img
              src={blog.cover_image.url}
              alt={blog.cover_image.alt || blog.title}
              className="w-full max-h-80 object-cover"
            />
          </motion.div>
        )}

        {/* Header */}
        <motion.div variants={fadeUp} custom={2} className="mb-6">
          <div className="section-label">Field Note</div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-primary leading-tight mb-3">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <div className="flex items-center gap-1.5 font-mono text-xs text-primary/40">
              <Calendar className="w-3 h-3" aria-hidden="true" />
              {blog.publish_date}
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs text-primary/40">
              <Clock className="w-3 h-3" aria-hidden="true" />
              {blog.read_time} min read
            </div>
          </div>
          <p className="font-body text-primary/60 leading-relaxed text-lg">
            {blog.excerpt}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-5">
            <motion.div variants={fadeUp} custom={3} className="technic-module p-6">
              <div
                className="prose prose-sm max-w-none text-primary/70 prose-headings:font-heading prose-headings:text-primary prose-headings:font-bold prose-strong:text-primary prose-a:text-accent prose-code:text-primary/80 prose-code:bg-faint prose-code:font-mono"
              >
                {blog.content ? (
                  <div dangerouslySetInnerHTML={createMarkup(blog.content)} />
                ) : (
                  <p className="font-body leading-relaxed">{blog.excerpt}</p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Tags */}
            {blog.tags?.length > 0 && (
              <motion.div variants={fadeUp} custom={3} className="technic-module p-4">
                <div className="section-label mb-3">Tags</div>
                <div className="flex flex-wrap gap-1.5">
                  {blog.tags.map((tag, i) => (
                    <span key={i} className="tag-pill">{tag}</span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Article Info */}
            <motion.div variants={fadeUp} custom={4} className="technic-module p-4">
              <div className="section-label mb-3">Article Info</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-mono text-xs text-primary/40 uppercase tracking-wider">Author</span>
                  <span className="font-mono text-xs text-primary">Vineeth K.</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-xs text-primary/40 uppercase tracking-wider">Published</span>
                  <span className="font-mono text-xs text-primary">{blog.publish_date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-xs text-primary/40 uppercase tracking-wider">Read Time</span>
                  <span className="font-mono text-xs text-primary">{blog.read_time} min</span>
                </div>
              </div>
            </motion.div>

            {/* Related Projects */}
            {blog.related_projects?.length > 0 && (
              <motion.div variants={fadeUp} custom={5} className="technic-module p-4">
                <div className="section-label mb-3">Related Projects</div>
                <div className="space-y-2">
                  {blog.related_projects.map((projectId) => (
                    <Link
                      key={projectId}
                      to={`/projects/${projectId}`}
                      className="flex items-center gap-2 font-mono text-xs text-primary/50 hover:text-primary transition-colors duration-200"
                    >
                      <LinkIcon className="w-3 h-3" aria-hidden="true" />
                      {projectId}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default BlogDetail;
