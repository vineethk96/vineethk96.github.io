import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { BLOG_POSTS } from '../data/constants';
import { useAnalytics } from '../hooks/useAnalytics';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const createMarkup = (html) => ({
  __html: DOMPurify.sanitize(html, {
    FORBID_ATTR: ['style', 'onerror', 'onclick', 'onload'],
    FORBID_TAGS: ['style', 'link', 'script'],
  })
});

const BlogDetail = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const { track } = useAnalytics();
  const blog = BLOG_POSTS.find(b => b.id === blogId);

  useEffect(() => {
    if (!blog) {
      track('blog_not_found', { blog_id: blogId });
    }
  }, [blog, blogId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Blog Post Not Found
          </h1>
          <button
            onClick={() => navigate('/blog')}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-8"
    >
      {/* Back Button */}
      <motion.button
        variants={itemVariants}
        onClick={() => navigate('/blog')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Blog
      </motion.button>

      {/* Cover Image Hero */}
      {blog.cover_image?.url && (
        <motion.div variants={itemVariants} className="mb-8 rounded-xl overflow-hidden">
          <img
            src={blog.cover_image.url}
            alt={blog.cover_image.alt || blog.title}
            className="w-full max-h-96 object-cover"
          />
        </motion.div>
      )}

      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            {blog.publish_date}
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            {blog.read_time} min read
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          {blog.excerpt}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Blog Content */}
          <motion.div variants={itemVariants}>
            <div className="prose dark:prose-invert max-w-none">
              {blog.content ? (
                <div dangerouslySetInnerHTML={createMarkup(blog.content)} />
              ) : (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {blog.excerpt}
                </p>
              )}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">
                Enjoyed this post?
              </h3>
              <p className="mb-4">
                Connect with me to discuss more about IoT and connected systems.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => track('unimplemented_feature_clicked', { feature: 'share_article', blog_id: blog.id })}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Share Article
                </button>
                <button
                  onClick={() => track('unimplemented_feature_clicked', { feature: 'follow_author' })}
                  className="border border-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Follow for More
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tags */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Article Info */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Article Information
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Published:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {blog.publish_date}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Read Time:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {blog.read_time} min read
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Author:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  Vineeth Kirandumkara
                </span>
              </div>
            </div>
          </motion.div>

          {/* Related Projects */}
          {blog.related_projects?.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Related Projects
              </h3>
              <div className="space-y-2">
                {blog.related_projects.map((projectId) => (
                  <Link
                    key={projectId}
                    to={`/projects/${projectId}`}
                    className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    <LinkIcon size={14} />
                    {projectId}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Newsletter Signup */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              📧 Stay Updated
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Get notified when new articles are published.
            </p>
            <button
              onClick={() => track('unimplemented_feature_clicked', { feature: 'newsletter_subscribe' })}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetail;
