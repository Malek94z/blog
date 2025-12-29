# 📝 How to Add Blog Posts

Your CV landing page now has a beautiful blog section! Here's how to add new posts.

## 🎯 Quick Guide

### Adding a New Blog Post

1. **Open `index.html`**
2. **Find the Blog Section** (search for `<!-- Blog Section -->`)
3. **Copy one of the existing blog cards** (the entire `<article class="blog-card">...</article>` block)
4. **Paste it before the "More Coming Soon" card**
5. **Update the content**:

```html
<article class="blog-card" data-aos="fade-up" data-aos-delay="100">
    <div class="blog-card-header">
        <div class="blog-category">Your Category</div>
        <div class="blog-date">Month Year</div>
    </div>
    <h3 class="blog-title">Your Blog Post Title</h3>
    <p class="blog-excerpt">
        Your blog post excerpt or summary goes here. Keep it concise and engaging.
    </p>
    <div class="blog-footer">
        <div class="blog-read-time">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="8" cy="8" r="6"/>
                <path d="M8 4v4l3 2"/>
            </svg>
            <span>5 min read</span>
        </div>
        <a href="#" class="blog-read-more">
            Read More
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </a>
    </div>
</article>
```

## 📋 What to Customize

### 1. **Category** (blog-category)
Change the category text. Examples:
- Engineering
- Leadership
- Product
- Career
- Technology
- Personal

### 2. **Date** (blog-date)
Update with the month and year:
- December 2024
- January 2025
- etc.

### 3. **Title** (blog-title)
Your blog post title - make it catchy!

### 4. **Excerpt** (blog-excerpt)
A brief summary of your post (2-3 sentences)

### 5. **Read Time** (blog-read-time)
Estimate how long it takes to read:
- 3 min read
- 5 min read
- 10 min read

### 6. **Link** (blog-read-more)
Update the `href="#"` to link to:
- A separate HTML page: `href="blog/post-title.html"`
- An external blog: `href="https://medium.com/@yourpost"`
- A PDF: `href="blog/post.pdf"`

## 🎨 Animation Delays

For smooth animations, increment the `data-aos-delay` for each new post:
- First post: `data-aos-delay="100"`
- Second post: `data-aos-delay="200"`
- Third post: `data-aos-delay="300"`
- Fourth post: `data-aos-delay="400"`

## 📝 Example: Adding Your First Real Post

Let's say you want to add a post about "My Journey to Columbia Business School":

```html
<article class="blog-card" data-aos="fade-up" data-aos-delay="100">
    <div class="blog-card-header">
        <div class="blog-category">Career</div>
        <div class="blog-date">January 2025</div>
    </div>
    <h3 class="blog-title">My Journey to Columbia Business School</h3>
    <p class="blog-excerpt">
        Reflecting on the decision to pursue an Executive MBA while working full-time, 
        and how it transformed my approach to product management and leadership.
    </p>
    <div class="blog-footer">
        <div class="blog-read-time">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="8" cy="8" r="6"/>
                <path d="M8 4v4l3 2"/>
            </svg>
            <span>8 min read</span>
        </div>
        <a href="blog/columbia-journey.html" class="blog-read-more">
            Read More
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </a>
    </div>
</article>
```

## 🗂️ Creating Full Blog Posts

If you want to create full blog post pages:

1. **Create a `blog` folder** in your project directory
2. **Create individual HTML files** for each post (e.g., `columbia-journey.html`)
3. **Use a simple template** with your same styling
4. **Link to them** from the blog cards

### Simple Blog Post Template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Post Title - Malek Ziad</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
    <article style="max-width: 800px; margin: 100px auto; padding: 2rem;">
        <a href="../index.html#blog" style="color: var(--primary);">← Back to CV</a>
        
        <h1 style="margin-top: 2rem;">Your Post Title</h1>
        <p style="color: var(--text-muted);">January 2025 • 8 min read</p>
        
        <div style="margin-top: 2rem; line-height: 1.8; color: var(--text-secondary);">
            <!-- Your blog content here -->
            <p>Your blog post content...</p>
        </div>
    </article>
</body>
</html>
```

## 💡 Pro Tips

1. **Keep excerpts short** - 2-3 sentences max
2. **Use descriptive titles** - Make people want to click
3. **Update regularly** - Even if it's just once a month
4. **Link to external blogs** - You can link to Medium, Dev.to, etc.
5. **Remove sample posts** - Delete the placeholder posts once you add real ones

## 🎯 Quick Checklist

When adding a new post:
- [ ] Updated category
- [ ] Updated date
- [ ] Updated title
- [ ] Updated excerpt
- [ ] Updated read time
- [ ] Updated link (if applicable)
- [ ] Incremented animation delay
- [ ] Tested the link works

---

**Your blog section is ready to showcase your thoughts and expertise!** ✨
