# Website Content Management

This website now uses a JSON + JavaScript system to automatically generate project and blog content. No more manual HTML editing!

## How to Add New Projects

Edit `projects.json` and add a new object to the `projects` array:

```json
{
  "title": "Your Project Title",
  "githubUrl": "https://github.com/username/repo",
  "description": "Detailed description of your project...",
  "technologies": ["Tech1", "Tech2", "Tech3"]
}
```

### Example:
```json
{
  "title": "Data Pipeline Automation Tool",
  "githubUrl": "https://github.com/user/data-pipeline",
  "description": "An automated ETL pipeline that processes real-time data streams from multiple sources and stores them in a data warehouse.",
  "technologies": ["Python", "Apache Kafka", "PostgreSQL", "Docker"]
}
```

## How to Add New Blog Posts

Edit `blogs.json` and add a new object to the `blogs` array:

```json
{
  "title": "Your Blog Post Title",
  "url": "https://yourblog.com/post-url",
  "publishDate": "2024-02-01",
  "summary": "Brief summary of your blog post..."
}
```

### Fields:
- **title**: Blog post title (required)
- **url**: Link to the blog post (leave empty `""` if no URL)
- **publishDate**: Date in ISO format (YYYY-MM-DD)
- **summary**: Brief description of the blog post (required)

### Example:
```json
{
  "title": "Building Scalable Data Lakes with Modern Tools",
  "url": "https://yourblog.com/data-lakes-2024",
  "publishDate": "2024-02-01",
  "summary": "A comprehensive guide to building data lakes using modern technologies like Apache Iceberg, DuckDB, and cloud storage."
}
```

## Date Formatting

The system automatically converts dates from ISO format (`2024-02-01`) to readable format (`February 1, 2024`).

## File Structure

```
/
├── index.html          # Main HTML file (auto-updated)
├── projects.json       # Project data
├── blogs.json          # Blog data
├── css/style.css       # Styling (unchanged)
└── javascript/script.js # Dynamic loading logic
```

## Technical Details

- **No build process needed**: Pure client-side JavaScript
- **Automatic loading**: Content loads when page opens
- **Error handling**: Graceful fallbacks if JSON files are missing
- **Responsive design**: Works on all devices
- **Theming**: Supports dark/light themes
- **Multi-path fallback**: Tries multiple path approaches for maximum GitHub Pages compatibility

## Deployment

Simply push your changes to the repository. The website will automatically update with the new content from the JSON files.

## Removing Content

To remove a project or blog post, simply delete its object from the respective JSON array.

## Styling

All styling is handled automatically through existing CSS classes:
- `.project-link` for project titles
- `.blog-link` for blog titles (when URL provided)
- `.blog-date` for publish dates
- `.tag` for technology tags

No manual styling required!

## Troubleshooting

If content doesn't load:
1. Check browser console for path attempts and errors
2. Refresh the page to retry all paths
3. Ensure JSON files are valid and committed to repository
4. The system tries 4 different path approaches automatically