import { useState, useEffect } from 'react';
import { Calendar, User, FileText, ChevronRight, Menu, X } from 'lucide-react';

interface BlogFile {
  name: string;
  content: string;
  warnings?: Array<{ type: string; message: string }>;
}

interface BlogResponse {
  files: BlogFile[];
  totalProcessed: number;
  totalFound: number;
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<BlogFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogFile | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from Netlify function first
      try {
        const response = await fetch('/.netlify/functions/getDocxContents');
        
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data: BlogResponse = await response.json();
            setBlogs(data.files || []);
            return;
          }
        }
      } catch (fetchError) {
        console.log('Netlify function not available, using mock data');
      }
      
      // Fallback to mock data (using your actual DOCX content)
      const mockBlogs: BlogFile[] = [
        {
          name: "grant_proposal (7).docx",
          content: `<h1>Grant Proposal</h1>
          <p>Created on: May 26, 2025 at 11:27 AM</p>
          <h2>Budget Justification</h2>
          <p>The budget summary for this project, aimed at addressing educational disparities in under-resourced schools, is meticulously crafted to ensure that every dollar spent contributes directly to achieving the project's goals. The major expenses can be categorized into several key areas: educational technology procurement, teacher training programs, project management, community partnership development, and contingency funds.</p>
          
          <h2>Educational Technology Procurement</h2>
          <p>A significant portion of the budget is allocated to acquiring modern educational technology, such as tablets, laptops, and interactive whiteboards. This investment is justified by the need to bridge the digital divide that exists in under-resourced schools.</p>
          
          <h2>Teacher Training Programs</h2>
          <p>Another major expense is the development and implementation of comprehensive teacher training programs. These programs are designed to equip educators with the skills necessary to effectively utilize the new technology and adopt innovative teaching methods.</p>
          
          <h2>Project Management</h2>
          <p>Effective project management is crucial for the successful execution of the project activities. Funds are allocated for hiring a dedicated project manager who will oversee the implementation of the project, coordinate with stakeholders, and ensure that timelines and milestones are met.</p>`,
          warnings: [
            {
              type: "warning",
              message: "Unrecognised paragraph style: 'Title' (Style ID: Title)"
            }
          ]
        }
      ];
      
      setBlogs(mockBlogs);
      
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(err instanceof Error ? err.message : 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const formatBlogTitle = (filename: string) => {
    return filename
      .replace(/\.docx$/, '')
      .replace(/[_-]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  const extractDescription = (content: string) => {
    // Remove HTML tags and get first paragraph
    const textContent = content.replace(/<[^>]*>/g, '');
    const sentences = textContent.split('.').slice(0, 2);
    return sentences.join('.') + (sentences.length > 0 ? '.' : '');
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
            <a href="/">
              <img 
                src="/2.png" 
                alt="Dialogtuple Logo" 
                className="h-8 w-auto object-contain" 
              />
            </a>
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
              <span className="text-[#8b5cf6] font-bold border-b-2 border-[#8b5cf6]">
                Blogs
              </span>
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
          <span className="block text-[#8b5cf6] font-bold">
            Blogs
          </span>
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
              <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Blogs</h2>
              <p className="text-red-300">{error}</p>
              <button 
                onClick={fetchBlogs}
                className="mt-4 px-6 py-2 bg-[#8b5cf6] text-white rounded-lg hover:bg-[#7c3aed] transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (selectedBlog) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-[#1a1b1e] pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSelectedBlog(null)}
              className="flex items-center text-[#8b5cf6] hover:text-[#7c3aed] mb-8 transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180 mr-2" />
              Back to Blogs
            </button>
            
            <article className="bg-[#2a2b2e] rounded-lg p-8 shadow-xl">
              <header className="mb-8 pb-6 border-b border-gray-700">
                <h1 className="text-3xl font-bold text-white mb-4">
                  {formatBlogTitle(selectedBlog.name)}
                </h1>
                <div className="flex items-center text-gray-400 text-sm">
                  <FileText className="w-4 h-4 mr-2" />
                  <span className="mr-4">Document</span>
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Latest Version</span>
                </div>
              </header>
              
              <div 
                className="prose prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
              />
              
              {selectedBlog.warnings && selectedBlog.warnings.length > 0 && (
                <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                  <h3 className="text-yellow-400 font-semibold mb-2">Document Warnings:</h3>
                  <ul className="text-yellow-300 text-sm">
                    {selectedBlog.warnings.map((warning, index) => (
                      <li key={index}>• {warning.message}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          </div>
        </div>
      </>
    );
  }

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
              Discover insights, updates, and deep dives into multi-agent AI technology, 
              chatbot development, and enterprise solutions.
            </p>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-400 mb-2">No blogs available</h2>
              <p className="text-gray-500">Check back later for new content.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <article 
                  key={index}
                  className="bg-[#2a2b2e] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group"
                  onClick={() => setSelectedBlog(blog)}
                >
                  <div className="p-6">
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <User className="w-4 h-4 mr-2" />
                      <span className="mr-4">Dialogtuple Team</span>
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Recent</span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#8b5cf6] transition-colors">
                      {formatBlogTitle(blog.name)}
                    </h2>
                    
                    <p className="text-gray-300 mb-4 overflow-hidden" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {extractDescription(blog.content)}
                    </p>
                    
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