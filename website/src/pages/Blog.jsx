import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../data/constants';
import { useAnalytics } from '../hooks/useAnalytics';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.07, ease: 'easeOut' },
  }),
};

const Blog = () => {
  const { track } = useAnalytics();
  const posts = BLOG_POSTS || [];

  return (
    <motion.div
      className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen"
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-5xl mx-auto">

        {/* Page Header */}
        <motion.header variants={fadeUp} custom={0} className="mb-8 border-l-8 border-accent pl-6">
          <p className="font-mono text-xs font-bold text-accent tracking-widest mb-2 uppercase">
            System_Documentation // Vol_01
          </p>
          <h1 className="font-heading font-extrabold text-5xl sm:text-7xl text-primary tracking-tighter uppercase leading-none">
            Blog:<br />
            <span
              className="italic text-accent"
              style={{ textShadow: '4px 4px 0px rgba(50, 50, 50, 0.7)' }}
            >
              Field_Notes
            </span>
          </h1>
        </motion.header>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {posts.map((post, i) => {
              const thumbnail = post.cover_image?.thumbnail_url || post.cover_image?.url;
              return (
                <motion.article key={post.id} variants={fadeUp} custom={i + 1}>
                  <Link
                    to={`/blog/${post.id}`}
                    onClick={() => track('blog_post_clicked', { post_id: post.id })}
                    className="group block"
                  >
                    <div className="technic-module-hover overflow-hidden h-full flex flex-col">
                      {/* Cover image or icon */}
                      <div className="relative border-b-2 border-primary overflow-hidden h-36 bg-faint flex-shrink-0">
                        {thumbnail ? (
                          <img
                            src={thumbnail}
                            alt={post.cover_image?.alt || post.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-10 h-10 text-primary-muted group-hover:text-primary-sub transition-colors duration-300" aria-hidden="true" />
                          </div>
                        )}
                        {/* Index badge */}
                        <div className="absolute top-2 left-2 font-mono text-xs text-background bg-primary px-2 py-0.5 uppercase tracking-wider">
                          #{String(i + 1).padStart(2, '0')}
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-4 flex-1 flex flex-col">
                        {/* Meta */}
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-1 font-mono text-xs text-primary-muted">
                            <Calendar className="w-3 h-3" aria-hidden="true" />
                            {new Date(post.publish_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </div>
                          <div className="flex items-center gap-1 font-mono text-xs text-primary-muted">
                            <Clock className="w-3 h-3" aria-hidden="true" />
                            {post.read_time} min
                          </div>
                        </div>

                        <h2 className="font-heading font-bold text-primary text-base leading-tight mb-2 group-hover:text-accent transition-colors duration-200">
                          {post.title}
                        </h2>

                        <p className="font-body text-xs text-primary-sub leading-relaxed mb-3 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {(post.tags || []).slice(0, 3).map((tag) => (
                            <span key={tag} className="tag-pill">{tag}</span>
                          ))}
                        </div>

                        <div className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-primary-muted group-hover:text-primary transition-colors duration-200">
                          Read Article
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <motion.div variants={fadeUp} custom={1} className="technic-module p-8 text-center mb-10">
            <BookOpen className="w-10 h-10 text-primary-muted mx-auto mb-3" aria-hidden="true" />
            <p className="font-mono text-xs text-primary-muted uppercase tracking-wider">
              No articles published yet
            </p>
          </motion.div>
        )}

        {/* Topics */}
        <motion.div variants={fadeUp} custom={posts.length + 2}>
          <div className="section-label mb-3">Topics</div>
          <div className="flex flex-wrap gap-2">
            {[
              'IoT Architecture',
              'System Design',
              'Urban Technology',
              'Product Strategy',
              'Embedded Systems',
              'Connected Products',
              'Smart Cities',
              'Design Process',
            ].map((topic) => (
              <span key={topic} className="tag-pill text-sm px-3 py-1.5">
                {topic}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Blog;
