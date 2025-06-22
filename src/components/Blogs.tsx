import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, User, FileText, ChevronRight, Menu, X, Search, Tag, ArrowLeft } from 'lucide-react';
import { BlogPost } from '../utils/blogUtils';
import { loadAllBlogs, loadBlogBySlug, getAllTagsAsync } from '../utils/blogLoader';

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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => navigate('/blogs')}
              className="flex items-center text-[#8b5cf6] hover:text-[#7c3aed] mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Blogs
            </button>
            
            <article className="bg-[#2a2b2e] rounded-lg p-8 shadow-xl">
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
                
                <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>{currentBlog.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(currentBlog.date)}</span>
                  </div>
                </div>
                
                <p className="text-lg text-gray-300 mb-4">
                  {currentBlog.description}
                </p>
                
                {currentBlog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
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
              </header>
              
              <div 
                className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-[#8b5cf6] prose-strong:text-white prose-code:text-[#8b5cf6] prose-pre:bg-[#1a1b1e] prose-pre:border prose-pre:border-gray-700"
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
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover insights, updates, and deep dives into AI technology, 
              automation, and enterprise solutions.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#2a2b2e] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#8b5cf6] transition-colors"
              />
            </div>
            
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
              <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-400 mb-2">
                {searchTerm || selectedTag ? 'No blogs match your criteria' : 'No blogs available'}
              </h2>
              <p className="text-gray-500">
                {searchTerm || selectedTag ? 'Try adjusting your search or filter.' : 'Check back later for new content.'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <article 
                  key={blog.slug}
                  className="bg-[#2a2b2e] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group"
                  onClick={() => navigate(`/blogs/${blog.slug}`)}
                >
                  {blog.image && (
                    <div className="h-48 overflow-hidden bg-gray-800 flex items-center justify-center">
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <User className="w-4 h-4 mr-2" />
                      <span className="mr-4">{blog.author}</span>
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{formatDate(blog.date)}</span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#8b5cf6] transition-colors">
                      {blog.title}
                    </h2>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3">
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
                          <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded text-xs">
                            +{blog.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center text-[#8b5cf6] font-semibold group-hover:text-[#7c3aed] transition-colors">
                      <span>Read More</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 