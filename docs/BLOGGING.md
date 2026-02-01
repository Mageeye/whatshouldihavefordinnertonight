# Blogging Guide

## Creating a Blog Post

To create a new blog post, simply create a new `.mdx` file in the `content/blog/` directory.

### File Naming

- Use kebab-case for filenames
- Example: `my-awesome-post.mdx`
- The filename (without `.mdx`) becomes the URL slug

### Frontmatter

Each post must include frontmatter at the top of the file:

```mdx
---
title: Your Post Title
date: 2024-01-15
description: A brief description of your post
tags:
  - tag1
  - tag2
  - tag3
coverImage: /images/your-image.jpg  # Optional
---

Your post content here...
```

### Required Fields

- `title`: The post title
- `date`: Publication date (YYYY-MM-DD format)
- `description`: Brief description for the blog index
- `tags`: Array of tags (optional but recommended)

### Optional Fields

- `coverImage`: Path to cover image (relative to `public/` directory)

### Content

Write your post content in Markdown below the frontmatter:

```mdx
---
title: My First Post
date: 2024-01-15
description: This is my first blog post
tags:
  - welcome
---

# My First Post

This is the content of my post. I can use **Markdown** syntax.

## Sections

I can create sections, lists, and more.

- Item 1
- Item 2
- Item 3
```

### Images

To add images to your posts:

1. Place images in the `public/images/` directory
2. Reference them in your MDX: `![Alt text](/images/your-image.jpg)`
3. For cover images, use the `coverImage` frontmatter field

### Example Post

See `content/blog/welcome.mdx` for a complete example.

## Publishing

1. Create your `.mdx` file in `content/blog/`
2. Add frontmatter with required fields
3. Write your content in Markdown
4. Commit and push to your repository
5. The post will appear on `/blog` automatically

## Future Enhancements

The current system is filesystem-based. Future enhancements may include:

- CMS integration (Contentful, Sanity, etc.)
- Rich text editor
- Image optimization
- Draft/publish workflow
- Author management
- Comments system

For now, keep it simple and use the filesystem approach.
