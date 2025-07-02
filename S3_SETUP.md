# Using S3 for Dynamic Blog Posts

This application can fetch blog posts and images directly from an Amazon S3 bucket at runtime. This allows you to add new markdown files without redeploying the site.

## 1. Bucket Structure

```
<your-bucket>/
├── index.json            # list of markdown files
├── posts/
│   └── <post>.md         # markdown articles
└── images/
    └── <image files>
```

- **index.json** – JSON array containing the filenames found in the `posts/` directory, e.g.:
  ```json
  [
    "2025-06-23-sample-post.md",
    "2025-06-25-another-post.md"
  ]
  ```
- **posts/** – contains the markdown files. These use the same front‑matter format as local posts.
- **images/** – any images referenced from the S3 posts. Use relative paths (e.g. `my-image.png`).

## 2. CORS Configuration

Enable CORS on the bucket to allow `GET` requests from your domain (e.g. `https://your-site.netlify.app`). A typical CORS configuration is:

```xml
<CORSConfiguration>
  <CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <AllowedHeader>*</AllowedHeader>
  </CORSRule>
</CORSConfiguration>
```

## 3. Environment Variable

Set the environment variable `VITE_S3_BASE_URL` in Netlify (or your hosting provider). The value should be the public URL to the bucket root, for example:

```
https://my-blog-bucket.s3.amazonaws.com
```

## 4. Adding a New Post

1. Upload the markdown file to the `posts/` folder.
2. Upload any referenced images to the `images/` folder.
3. Update `index.json` to include the new markdown file name.
   - The website will fetch `index.json` on page load and automatically display the new post.

Image paths inside the markdown front‑matter should be relative when stored in S3:

```yaml
image: "hero.png"        # resolves to <bucket>/images/hero.png
```

If the path starts with `/` or `http`, it will be used as provided (for local images or external URLs).

## 5. Local Posts

Markdown files placed inside `src/blogs/posts/` continue to work alongside the S3 posts. Both sources are combined automatically.

---
By following this structure you can publish new articles by simply uploading files to S3 and editing `index.json`; no rebuild is required.
