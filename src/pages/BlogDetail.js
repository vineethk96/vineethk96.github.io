import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Clock, User } from 'lucide-react';
import { BLOG_POSTS } from '../data/constants';
import ImageCarousel from '../components/ImageCarousel';

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

const BlogDetail = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const blog = BLOG_POSTS.find(b => b.id === blogId);

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

      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          {blog.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <User size={16} />
            {blog.author || 'Vineeth Kirandumkara'}
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            {blog.date}
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            {blog.readTime || '5 min read'}
          </div>
          <div className="flex items-center gap-1">
            <Tag size={16} />
            {blog.category}
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
          {/* Featured Image or Carousel */}
          <motion.div variants={itemVariants}>
            <ImageCarousel 
              images={blog.images || [
                {
                  url: '/api/placeholder/800/400',
                  alt: `${blog.title} - Featured Image`,
                  caption: 'Blog post featured image'
                }
              ]} 
              title={blog.title} 
            />
          </motion.div>

          {/* Blog Content */}
          <motion.div variants={itemVariants}>
            <div className="prose dark:prose-invert max-w-none">
              {blog.content ? (
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              ) : (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Introduction
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {blog.description || blog.excerpt}
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Key Insights
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    This blog post explores important concepts in {blog.category.toLowerCase()} 
                    and provides practical insights for developers and technologists.
                  </p>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-400">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      💡 Key Takeaway
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Understanding these concepts is crucial for building modern, scalable applications 
                      that meet today's performance and user experience standards.
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Implementation Details
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    The practical implementation involves careful consideration of architecture patterns, 
                    performance optimization, and user experience design principles.
                  </p>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Code Example
                    </h3>
                    <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                      <code>{`// Example implementation
const example = {
  technology: "${blog.tags?.[0] || 'React'}",
  implementation: "Modern best practices",
  performance: "Optimized for scale"
};

console.log("Building with:", example);`}</code>
                    </pre>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Conclusion
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    These insights provide a foundation for continued learning and development 
                    in the rapidly evolving technology landscape.
                  </p>
                </div>
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
                Connect with me to discuss more about {blog.category.toLowerCase()} and technology.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Share Article
                </button>
                <button className="border border-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
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
                  {blog.date}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Category:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {blog.category}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Read Time:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {blog.readTime || '5 min read'}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Author:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {blog.author || 'Vineeth Kirandumkara'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Related Topics */}
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Related Topics
            </h3>
            <div className="space-y-2">
              {['Web Development', 'React', 'JavaScript', 'UI/UX Design', 'Performance'].map((topic, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  {topic}
                </div>
              ))}
            </div>
          </motion.div>

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
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetail;
