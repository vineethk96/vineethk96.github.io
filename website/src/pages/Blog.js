import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../data/constants';

const Blog = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Blog & <span className="gradient-text">Notes</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Thoughts on connected systems, IoT architecture, and the intersection of technology and design.
            Exploring how we can build better connected products for the mass market.
          </p>
        </motion.div>

        {/* Blog Posts */}
        <motion.div className="space-y-8" variants={containerVariants}>
          {BLOG_POSTS.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link to={`/blog/${post.id}`} className="block">
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                {/* Gradient accent bar */}
                <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500"></div>

                <div className="p-8">
                  <div className="flex items-start space-x-6">
                    {/* Cover image or icon */}
                    {post.cover_image?.thumbnail_url ? (
                      <img
                        src={post.cover_image.thumbnail_url}
                        alt={post.cover_image.alt || post.title}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex-shrink-0">
                        <BookOpen className="w-8 h-8" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1">
                      {/* Meta */}
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.publish_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.read_time} min read</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl font-bold mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More */}
                      <div className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-300">
                        <span>Read full article</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* Coming Soon */}
        <motion.div variants={itemVariants} className="mt-16">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              More Articles Coming Soon
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto mb-6">
              I'm constantly exploring new ideas in IoT systems, connected product design, and urban technology.
              Subscribe to get notified when new articles are published.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
              <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Topics of Interest */}
        <motion.div variants={itemVariants} className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Topics I Write About
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'IoT Architecture',
              'System Design',
              'Urban Technology',
              'Product Strategy',
              'Embedded Systems',
              'Connected Products',
              'Smart Cities',
              'Design Process'
            ].map((topic) => (
              <div
                key={topic}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors duration-300"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {topic}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Blog;
