import { BlogPost, parseMarkdown, processBlogPost } from './blogUtils';

// Cache for loaded blogs to avoid re-processing
let blogCache: BlogPost[] | null = null;

/**
 * Load all blog posts from the posts directory
 * Uses Vite's import.meta.glob for dynamic imports
 */
export async function loadAllBlogs(): Promise<BlogPost[]> {
  // Return cached blogs if available
  if (blogCache) {
    return blogCache;
  }

  try {
    // Use Vite's glob import to get all markdown files (updated syntax)
    const modules = import.meta.glob('/src/blogs/posts/*.md', { 
      query: '?raw',
      import: 'default'
    });

    const blogPromises: Promise<BlogPost>[] = [];

    // Process each markdown file
    for (const [path, moduleLoader] of Object.entries(modules)) {
      const filename = path.split('/').pop() || '';
      
      blogPromises.push(
        (async () => {
          try {
            // Load the raw markdown content
            const markdownContent = await moduleLoader() as string;
            
            // Parse the markdown and frontmatter
            const rawPost = parseMarkdown(markdownContent, filename);
            
            // Process into final BlogPost format
            const processedPost = await processBlogPost(rawPost);
            
            return processedPost;
          } catch (error) {
            console.error(`Error processing blog post ${filename}:`, error);
            throw error;
          }
        })()
      );
    }

    // Wait for all blogs to be processed
    const blogs = await Promise.all(blogPromises);
    
    // Sort by date (newest first) and cache
    blogCache = blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return blogCache;
  } catch (error) {
    console.error('Error loading blogs:', error);
    throw new Error('Failed to load blog posts');
  }
}

/**
 * Load a specific blog post by slug
 */
export async function loadBlogBySlug(slug: string): Promise<BlogPost | null> {
  const blogs = await loadAllBlogs();
  return blogs.find(blog => blog.slug === slug) || null;
}

/**
 * Get blog posts with pagination
 */
export async function getBlogsPaginated(page: number = 1, pageSize: number = 10): Promise<{
  blogs: BlogPost[];
  totalPages: number;
  currentPage: number;
  totalBlogs: number;
}> {
  const allBlogs = await loadAllBlogs();
  const totalBlogs = allBlogs.length;
  const totalPages = Math.ceil(totalBlogs / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  return {
    blogs: allBlogs.slice(startIndex, endIndex),
    totalPages,
    currentPage: page,
    totalBlogs
  };
}

/**
 * Get recent blog posts
 */
export async function getRecentBlogs(count: number = 5): Promise<BlogPost[]> {
  const blogs = await loadAllBlogs();
  return blogs.slice(0, count);
}

/**
 * Get blogs by tag
 */
export async function getBlogsByTag(tag: string): Promise<BlogPost[]> {
  const blogs = await loadAllBlogs();
  return blogs.filter(blog => 
    blog.tags.some(blogTag => 
      blogTag.toLowerCase() === tag.toLowerCase()
    )
  );
}

/**
 * Search blogs
 */
export async function searchBlogsAsync(searchTerm: string): Promise<BlogPost[]> {
  const blogs = await loadAllBlogs();
  const term = searchTerm.toLowerCase();
  
  return blogs.filter(blog =>
    blog.title.toLowerCase().includes(term) ||
    blog.description.toLowerCase().includes(term) ||
    blog.content.toLowerCase().includes(term) ||
    blog.tags.some(tag => tag.toLowerCase().includes(term))
  );
}

/**
 * Get all available tags
 */
export async function getAllTagsAsync(): Promise<string[]> {
  const blogs = await loadAllBlogs();
  const tagSet = new Set<string>();
  
  blogs.forEach(blog => {
    blog.tags.forEach(tag => tagSet.add(tag));
  });
  
  return Array.from(tagSet).sort();
}

/**
 * Clear the blog cache (useful for development/testing)
 */
export function clearBlogCache(): void {
  blogCache = null;
}

/**
 * Get blog statistics
 */
export async function getBlogStats(): Promise<{
  totalBlogs: number;
  totalTags: number;
  authors: string[];
  dateRange: { oldest: string; newest: string } | null;
}> {
  const blogs = await loadAllBlogs();
  
  if (blogs.length === 0) {
    return {
      totalBlogs: 0,
      totalTags: 0,
      authors: [],
      dateRange: null
    };
  }
  
  const tags = await getAllTagsAsync();
  const authors = [...new Set(blogs.map(blog => blog.author))];
  const dates = blogs.map(blog => blog.date).sort();
  
  return {
    totalBlogs: blogs.length,
    totalTags: tags.length,
    authors,
    dateRange: {
      oldest: dates[0],
      newest: dates[dates.length - 1]
    }
  };
} 