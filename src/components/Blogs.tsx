import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, User, FileText, ChevronRight, Menu, X, Search, Tag, ArrowLeft } from 'lucide-react';
import { BlogPost } from '../utils/blogUtils';
import { loadAllBlogs, loadBlogBySlug, getAllTagsAsync } from '../utils/blogLoader';
import { searchBlogs, filterBlogsByTag, getAllTags } from '../utils/blogUtils';

export default function Blogs() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [currentBlog, setCurrentBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    loadBlogData();
  }, [slug]);

  const loadBlogData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (slug) {
        // Load individual blog post
        const blog = await loadBlogBySlug(slug);
        if (blog) {
          setCurrentBlog(blog);
        } else {
          setError('Blog post not found');
        }
      } else {
        // Load all blogs for listing
        const [allBlogs, tags] = await Promise.all([
          loadAllBlogs(),
          getAllTagsAsync()
        ]);
        setBlogs(allBlogs);
        setAvailableTags(tags);
        setCurrentBlog(null);
      }
    } catch (err) {
      console.error('Error loading blog data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = searchTerm === '' || 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === '' || 
      blog.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase());
    
    return matchesSearch && matchesTag;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#benefits', label: 'Benefits' },
    { href: '/#features', label: 'Features' },
    { href: '/#how-it-works', label: 'How It Works' }
  ];

  const Navigation = () => (
    <nav className="fixed w-full bg-[#0f1012]/90 backdrop-blur-md border-b border-[#2a2b2e] z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/">
              <img 
                src="/2.png" 
                alt="Dialogtuple Logo" 
                className="h-8 w-auto object-contain" 
              />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-8 px-8 py-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 font-semibold hover:text-[#8b5cf6] transition-all duration-200 hover:scale-105"
                >
                  {link.label}
                </a>
              ))}
              <Link 
                to="/blogs"
                className="text-[#8b5cf6] font-bold border-b-2 border-[#8b5cf6]"
              >
                Blogs
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-[#8b5cf6] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-6 py-6 space-y-6 bg-[#0f1012]/95 backdrop-blur-md border-t border-[#2a2b2e]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-gray-300 hover:text-[#8b5cf6] transition-all duration-200 hover:translate-x-2"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/blogs"
            className="block text-[#8b5cf6] font-bold"
          >
            Blogs
          </Link>
        </div>
      </div>
    </nav>
  );

  const handleShare = (platform: string, blog: BlogPost) => {
    const url = `${window.location.origin}/blogs/${blog.slug}`;
    const title = blog.title;
    const description = blog.description;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        return;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const SocialShareButtons: React.FC<{ blog: BlogPost; compact?: boolean }> = ({ blog, compact = false }) => (
    <div className={`flex items-center ${compact ? 'space-x-2' : 'space-x-3 mt-4'}`}>
      {!compact && <span className="text-sm text-gray-600 dark:text-gray-400">Share:</span>}
      <button
        onClick={() => handleShare('twitter', blog)}
        className="text-blue-400 hover:text-blue-600 transition-colors"
        title="Share on Twitter"
      >
        <svg className={`${compact ? 'w-4 h-4' : 'w-5 h-5'}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      </button>
      <button
        onClick={() => handleShare('linkedin', blog)}
        className="text-blue-700 hover:text-blue-900 transition-colors"
        title="Share on LinkedIn"
      >
        <svg className={`${compact ? 'w-4 h-4' : 'w-5 h-5'}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </button>
      <button
        onClick={() => handleShare('facebook', blog)}
        className="text-blue-600 hover:text-blue-800 transition-colors"
        title="Share on Facebook"
      >
        <svg className={`${compact ? 'w-4 h-4' : 'w-5 h-5'}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </button>
      {!compact && (
        <button
          onClick={() => handleShare('copy', blog)}
          className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          title="Copy link"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      )}
    </div>
  );

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-[#1a1b1e] pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b5cf6]"></div>
              <span className="ml-4 text-white text-lg">Loading blogs...</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-[#1a1b1e] pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-8 text-center">
              <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Blog</h2>
              <p className="text-red-300 mb-4">{error}</p>
              <button 
                onClick={() => navigate('/blogs')}
                className="px-6 py-2 bg-[#8b5cf6] text-white rounded-lg hover:bg-[#7c3aed] transition-colors"
              >
                Back to Blogs
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Individual blog post view
  if (currentBlog) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-[#1a1b1e] pt-32 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => navigate('/blogs')}
              className="flex items-center text-[#8b5cf6] hover:text-[#7c3aed] mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Blogs
            </button>
            
            <article className="bg-[#2a2b2e] rounded-lg p-8 md:p-12 shadow-xl">
              <header className="mb-8 pb-6 border-b border-gray-700">
                {currentBlog.image && (
                  <div className="w-full h-64 bg-gray-800 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                    <img 
                      src={currentBlog.image} 
                      alt={currentBlog.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
                
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {currentBlog.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-200 text-sm mb-4">
                  <div className="flex items-center">
                    {currentBlog.authorPicture ? (
                      <img 
                        src={currentBlog.authorPicture} 
                        alt={currentBlog.author}
                        className="w-8 h-8 rounded-full object-cover mr-2"
                      />
                    ) : (
                      <User className="w-4 h-4 mr-2" />
                    )}
                    <span>{currentBlog.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(currentBlog.date)}</span>
                  </div>
                </div>
                
                <p className="text-lg text-gray-100 mb-4">
                  {currentBlog.description}
                </p>
                
                {currentBlog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentBlog.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-[#8b5cf6]/20 text-[#8b5cf6] rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <SocialShareButtons blog={currentBlog} />
              </header>
              
              <div 
                className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-100 prose-a:text-[#8b5cf6] prose-strong:text-white prose-code:text-[#8b5cf6] prose-pre:bg-[#1a1b1e] prose-pre:border prose-pre:border-gray-700 prose-blockquote:text-gray-100 prose-li:text-gray-100 prose-img:max-w-full prose-img:h-auto prose-img:rounded-lg prose-img:mx-auto prose-img:block"
                dangerouslySetInnerHTML={{ __html: currentBlog.content }}
              />
            </article>
          </div>
        </div>
      </>
    );
  }

  // Blog listing view
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#1a1b1e] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Blog
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Discover insights, updates, and deep dives into AI technology, 
              automation, and enterprise solutions.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#2a2b2e] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#8b5cf6] transition-colors"
              />
            </div>
            
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="pl-10 pr-8 py-3 bg-[#2a2b2e] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#8b5cf6] transition-colors appearance-none min-w-[200px]"
              >
                <option value="">All Tags</option>
                {availableTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 text-white mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">
                {searchTerm || selectedTag ? 'No blogs match your criteria' : 'No blogs available'}
              </h2>
              <p className="text-white">
                {searchTerm || selectedTag ? 'Try adjusting your search or filter.' : 'Check back later for new content.'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredBlogs.map((blog) => (
                <Link
                  key={blog.slug}
                  to={`/blogs/${blog.slug}`}
                  className="group bg-[#2a2b2e] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:shadow-[#8b5cf6]/25 hover:-translate-y-1"
                >
                  {blog.image && (
                    <div className="aspect-video bg-gray-800 overflow-hidden">
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center text-white text-sm mb-3">
                      {blog.authorPicture ? (
                        <img 
                          src={blog.authorPicture} 
                          alt={blog.author}
                          className="w-6 h-6 rounded-full object-cover mr-2"
                        />
                      ) : (
                        <User className="w-4 h-4 mr-2" />
                      )}
                      <span className="mr-4">{blog.author}</span>
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{formatDate(blog.date)}</span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#8b5cf6] transition-colors">
                      {blog.title}
                    </h2>
                    
                    <p className="text-white mb-4 line-clamp-3">
                      {blog.excerpt || blog.description}
                    </p>
                    
                    {blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-[#8b5cf6]/10 text-[#8b5cf6] rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-700 text-white rounded text-xs">
                            +{blog.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 