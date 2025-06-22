import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkFrontmatter from 'remark-frontmatter';

// Interface for blog post metadata
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  authorPicture?: string;
  description: string;
  tags: string[];
  image?: string;
  content: string;
  excerpt?: string;
}

// Interface for raw blog data before processing
export interface RawBlogPost {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    author: string;
    authorPicture?: string;
    description: string;
    tags: string[];
    image?: string;
    slug?: string;
  };
  content: string;
}

/**
 * Simple frontmatter parser that works in the browser
 */
function parseFrontmatter(markdownContent: string): { data: any; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = markdownContent.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content: markdownContent };
  }
  
  const [, frontmatterYaml, content] = match;
  const data: any = {};
  
  // Simple YAML parsing for basic key-value pairs
  const lines = frontmatterYaml.split('\n');
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) continue;
    
    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = trimmedLine.substring(0, colonIndex).trim();
    let value = trimmedLine.substring(colonIndex + 1).trim();
    
    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    // Handle arrays (simple format: ["item1", "item2"])
    if (value.startsWith('[') && value.endsWith(']')) {
      try {
        data[key] = JSON.parse(value);
      } catch {
        // Fallback: split by comma and clean up
        data[key] = value.slice(1, -1).split(',').map(item => 
          item.trim().replace(/^["']|["']$/g, '')
        );
      }
    } else {
      data[key] = value;
    }
  }
  
  return { data, content };
}

/**
 * Parse markdown content and extract frontmatter
 */
export function parseMarkdown(markdownContent: string, filename: string): RawBlogPost {
  const { data: frontmatter, content } = parseFrontmatter(markdownContent);
  
  // Generate slug from filename if not provided in frontmatter
  const slug = frontmatter.slug || generateSlugFromFilename(filename);
  
  return {
    slug,
    frontmatter: {
      title: frontmatter.title || 'Untitled',
      date: frontmatter.date || new Date().toISOString().split('T')[0],
      author: frontmatter.author || 'Unknown Author',
      authorPicture: frontmatter.authorPicture,
      description: frontmatter.description || '',
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      image: frontmatter.image,
      slug: frontmatter.slug
    },
    content
  };
}

/**
 * Convert markdown content to HTML
 */
export async function markdownToHtml(markdownContent: string): Promise<string> {
  const result = await remark()
    .use(remarkFrontmatter)
    .use(remarkHtml, { sanitize: false })
    .process(markdownContent);
  
  return result.toString();
}

/**
 * Process raw blog post data into final BlogPost format
 */
export async function processBlogPost(rawPost: RawBlogPost): Promise<BlogPost> {
  const htmlContent = await markdownToHtml(rawPost.content);
  const excerpt = generateExcerpt(rawPost.content);
  
  return {
    slug: rawPost.slug,
    title: rawPost.frontmatter.title,
    date: rawPost.frontmatter.date,
    author: rawPost.frontmatter.author,
    authorPicture: rawPost.frontmatter.authorPicture,
    description: rawPost.frontmatter.description,
    tags: rawPost.frontmatter.tags,
    image: rawPost.frontmatter.image,
    content: htmlContent,
    excerpt
  };
}

/**
 * Generate a slug from filename
 */
function generateSlugFromFilename(filename: string): string {
  return filename
    .replace(/\.md$/, '') // Remove .md extension
    .replace(/^\d{4}-\d{2}-\d{2}-/, '') // Remove date prefix if present
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate an excerpt from markdown content
 */
function generateExcerpt(content: string, maxLength: number = 200): string {
  // Remove markdown formatting and get plain text
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  // Find the last complete sentence within the limit
  const truncated = plainText.substring(0, maxLength);
  const lastSentenceEnd = Math.max(
    truncated.lastIndexOf('.'),
    truncated.lastIndexOf('!'),
    truncated.lastIndexOf('?')
  );
  
  if (lastSentenceEnd > maxLength * 0.7) {
    return truncated.substring(0, lastSentenceEnd + 1);
  }
  
  // If no good sentence break, cut at word boundary
  const lastSpace = truncated.lastIndexOf(' ');
  return truncated.substring(0, lastSpace) + '...';
}

/**
 * Sort blog posts by date (newest first)
 */
export function sortBlogsByDate(blogs: BlogPost[]): BlogPost[] {
  return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Filter blogs by tag
 */
export function filterBlogsByTag(blogs: BlogPost[], tag: string): BlogPost[] {
  return blogs.filter(blog => 
    blog.tags.some(blogTag => 
      blogTag.toLowerCase() === tag.toLowerCase()
    )
  );
}

/**
 * Search blogs by title, description, or content
 */
export function searchBlogs(blogs: BlogPost[], searchTerm: string): BlogPost[] {
  const term = searchTerm.toLowerCase();
  return blogs.filter(blog =>
    blog.title.toLowerCase().includes(term) ||
    blog.description.toLowerCase().includes(term) ||
    blog.content.toLowerCase().includes(term) ||
    blog.tags.some(tag => tag.toLowerCase().includes(term))
  );
}

/**
 * Get all unique tags from blog posts
 */
export function getAllTags(blogs: BlogPost[]): string[] {
  const tagSet = new Set<string>();
  blogs.forEach(blog => {
    blog.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
} 