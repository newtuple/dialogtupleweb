# Blog System Structure & Design

## Overview

This document outlines the design and structure of the DialogTuple blog system, which automatically processes markdown files and renders them as blog posts during the build process.

## Directory Structure

```
src/blogs/
├── posts/                          # Markdown blog posts
│   ├── 2024-01-15-getting-started-with-dialogtuple.md
│   └── [YYYY-MM-DD-post-title.md]  # Naming convention
├── images/                         # Blog post images
│   ├── getting-started.jpg
│   └── [image-files]
└── BLOG_STRUCTURE.md               # This documentation
```

## Markdown File Format

### Frontmatter Structure

Each markdown file must include YAML frontmatter at the top:

```yaml
---
title: "Your Blog Post Title"
date: "YYYY-MM-DD"
author: "Author Name"
description: "Brief description for SEO and previews"
tags: ["tag1", "tag2", "category"]
image: "/blogs/images/featured-image.jpg"  # Optional
slug: "custom-url-slug"                    # Optional, auto-generated if not provided
---
```

### Required Fields
- `title`: Blog post title
- `date`: Publication date in YYYY-MM-DD format
- `author`: Author name
- `description`: Brief description (used for SEO and previews)
- `tags`: Array of tags for categorization

### Optional Fields
- `image`: Featured image path (relative to public directory)
- `slug`: Custom URL slug (auto-generated from filename if not provided)

### Content Guidelines

After the frontmatter, write your content in standard markdown:

```markdown
# Main Heading

Your introduction paragraph here.

## Section Heading

### Subsection

- Bullet points
- Are supported

1. Numbered lists
2. Work too

**Bold text** and *italic text* are supported.

`Inline code` and code blocks:

```javascript
const example = "Code blocks with syntax highlighting";
```

[Links](https://example.com) and images work:

![Alt text](/blogs/images/your-image.jpg)
```

## File Naming Convention

Use the following naming pattern for consistency:

```
YYYY-MM-DD-post-title-slug.md
```

Examples:
- `2024-01-15-getting-started-with-dialogtuple.md`
- `2024-02-20-advanced-ai-features.md`
- `2024-03-10-customer-success-stories.md`

## Technical Architecture

### Core Components

1. **blogUtils.ts** - Core processing utilities
   - Markdown parsing and frontmatter extraction
   - HTML conversion with remark
   - Excerpt generation
   - Search and filtering functions

2. **blogLoader.ts** - File discovery and loading
   - Automatic markdown file discovery using Vite's `import.meta.glob()`
   - Caching for performance
   - Pagination and advanced querying

3. **Blog Components** (React)
   - `Blogs.tsx` - Blog listing page
   - `BlogPost.tsx` - Individual blog post display
   - `BlogCard.tsx` - Blog preview cards

### Processing Pipeline

```
Markdown File → Parse Frontmatter → Convert to HTML → Cache → Render
```

1. **Discovery**: Vite scans `src/blogs/posts/*.md` at build time
2. **Parsing**: Extract frontmatter and content using gray-matter
3. **Processing**: Convert markdown to HTML using remark
4. **Caching**: Store processed posts in memory for performance
5. **Rendering**: Display in React components with Tailwind styling

### URL Structure

- `/blogs` - Blog listing page
- `/blogs/[slug]` - Individual blog post
- `/blogs/tag/[tag]` - Posts filtered by tag

## Features

### Automatic Processing
- ✅ Auto-discovery of new markdown files
- ✅ Frontmatter parsing and validation
- ✅ Markdown to HTML conversion
- ✅ Excerpt generation
- ✅ Slug generation from filenames

### Content Management
- ✅ Tag-based categorization
- ✅ Author attribution
- ✅ Date-based sorting
- ✅ Featured images support
- ✅ SEO-friendly metadata

### User Experience
- ✅ Search functionality
- ✅ Tag filtering
- ✅ Pagination
- ✅ Responsive design
- ✅ Fast loading with caching

### Developer Experience
- ✅ TypeScript support
- ✅ Hot reload in development
- ✅ Build-time processing
- ✅ Error handling and validation

## Usage Workflow

### Adding a New Blog Post

1. **Create the markdown file**:
   ```bash
   touch src/blogs/posts/2024-03-15-new-blog-post.md
   ```

2. **Add frontmatter and content**:
   ```markdown
   ---
   title: "Your New Blog Post"
   date: "2024-03-15"
   author: "Your Name"
   description: "Description of your post"
   tags: ["tutorial", "feature"]
   ---
   
   # Your content here
   ```

3. **Add images** (if needed):
   ```bash
   cp your-image.jpg src/blogs/images/
   ```

4. **Commit and deploy**:
   ```bash
   git add .
   git commit -m "Add new blog post"
   git push
   ```

The blog post will automatically appear on the website after deployment!

### Development Testing

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Performance Considerations

### Caching Strategy
- Blog posts are cached after first load
- Cache is cleared in development for hot reload
- Production builds include all posts in bundle

### Build Optimization
- Markdown processing happens at runtime (not build time)
- Images should be optimized before adding
- Large blogs may benefit from pagination

### SEO Benefits
- Static generation for better search indexing
- Proper meta tags from frontmatter
- Clean URLs with custom slugs
- Fast loading times

## Extending the System

### Adding New Fields
To add new frontmatter fields, update:
1. `BlogPost` interface in `blogUtils.ts`
2. `parseMarkdown` function to handle the new field
3. Components to display the new field

### Custom Processing
Add new remark plugins in `markdownToHtml` function:
```typescript
const result = await remark()
  .use(remarkFrontmatter)
  .use(remarkHtml)
  .use(newPlugin) // Add here
  .process(markdownContent);
```

### Advanced Features
Future enhancements could include:
- Syntax highlighting for code blocks
- Table of contents generation
- Related posts suggestions
- Reading time estimation
- Social sharing integration

## Troubleshooting

### Common Issues

1. **Frontmatter not parsing**
   - Check YAML syntax with proper indentation
   - Ensure `---` delimiters are on separate lines

2. **Images not loading**
   - Verify image paths are correct
   - Images should be in `src/blogs/images/`
   - Use absolute paths: `/blogs/images/image.jpg`

3. **Build errors**
   - Check TypeScript types match interfaces
   - Verify all required frontmatter fields are present

4. **Cache issues in development**
   - Use `clearBlogCache()` function
   - Restart development server

### Debug Mode

Enable debug logging by adding to your component:
```typescript
console.log('Loaded blogs:', await loadAllBlogs());
```

## Contributing

When adding new blog posts:
1. Follow the naming convention
2. Include all required frontmatter fields
3. Optimize images before adding
4. Test locally before committing
5. Use descriptive commit messages

---

*This system is designed to be simple, fast, and developer-friendly while providing a rich blogging experience for users.* 