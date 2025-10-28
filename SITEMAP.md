# Sitemap Documentation

## Overview

This document provides a complete overview of the website structure, navigation, and instructions for managing the sitemap for SEO purposes.

## 🗺️ Website Structure

### Public Pages

```
https://www.maisonelaris.com/
├── /                           # Home Page
├── /about                      # About Us
├── /services                   # Services Overview
├── /work                       # Portfolio/Case Studies
├── /location                   # Office Locations
├── /news                       # News/Blog Listing
│   └── /news/[slug]           # Individual Article Pages (dynamic)
├── /connect                    # Contact Selection Page
│   ├── /connect/general-inquiries    # General Inquiry Form
│   ├── /connect/pr-partnerships      # PR & Partnerships Form
│   └── /connect/careers              # Career Inquiries
└── /dashboard                  # Admin Dashboard (Protected)
    ├── /dashboard/articles            # Article Management
    │   ├── /dashboard/articles/new           # Create New Article
    │   └── /dashboard/articles/[id]/edit     # Edit Article
    ├── /dashboard/careers             # Career Management
    │   ├── /dashboard/careers/new            # Create New Job
    │   └── /dashboard/careers/[id]/edit      # Edit Job
    ├── /dashboard/crm                 # CRM Dashboard
    │   ├── /dashboard/crm/new                # Add New Customer
    │   └── /dashboard/crm/[id]               # Customer Details
    ├── /dashboard/newsletter          # Newsletter Management
    │   └── /dashboard/newsletter/new         # Create Campaign
    └── /dashboard/profile             # User Profile
```

## 📄 Page Details

### 1. Home Page (`/`)

**Purpose**: Main landing page showcasing company overview  
**Key Sections**:
- Animated hero section with rotating taglines
  - "WHERE STRATEGY MEETS STORY"
  - "DIGITAL-FIRST media intelligence"
  - "DATA-LED PERFORMANCE"
  - "CREATIVE IMPACT"
- Project carousel (circular gallery)
- Partner/client logos
- Social media section
- Newsletter signup

**SEO Elements**:
- Title: Home | Strategy, Creative, Media Excellence
- Meta Description: Integrated marketing communications agency delivering data-driven campaigns
- Keywords: marketing agency, creative strategy, media planning

**Update Frequency**: Static (updates require code changes)

---

### 2. About Us (`/about`)

**Purpose**: Company information, team, values, and story  
**Key Sections**:
- Company introduction
- Our Story
- Team members
- Values and approach
- Unlocking Growth section

**SEO Elements**:
- Title: About Us | Maison Elaris
- Meta Description: Learn about our borderless creative collective
- Keywords: about maison elaris, marketing agency team

**Update Frequency**: Quarterly or as needed

---

### 3. Services (`/services`)

**Purpose**: Detailed service offerings  
**Key Sections**:
- Hero with animated text
- Service categories (expandable):
  1. Strategic Media Planning & Buying
  2. Creative Content Development & Storytelling
  3. Data-Driven Marketing & Audience Intelligence
  4. Digital Transformation & Consultancy
  5. Retail Media & Commerce Strategy
- "Why Clients Choose Maison Elaris" (sticky cards)

**SEO Elements**:
- Title: Services | Strategy, Creative, Media, Retail & Analytics
- Meta Description: End-to-end IMC services
- Keywords: media planning, creative strategy, analytics, retail media

**Update Frequency**: Semi-annually or when services change

---

### 4. Work/Portfolio (`/work`)

**Purpose**: Showcase projects and case studies  
**Key Sections**:
- Featured projects
- Case studies
- Client logos
- Results and metrics

**SEO Elements**:
- Title: Our Work | Portfolio & Case Studies
- Meta Description: Explore our award-winning campaigns
- Keywords: marketing portfolio, case studies, campaign work

**Update Frequency**: Monthly (as new projects complete)

---

### 5. Location (`/location`)

**Purpose**: Office locations and contact information  
**Key Sections**:
- Office addresses
- Interactive maps
- Local contact details
- Operating hours

**SEO Elements**:
- Title: Locations | Maison Elaris Offices
- Meta Description: Find our global offices
- Keywords: office location, contact address

**Update Frequency**: As needed (office changes)

---

### 6. News/Blog (`/news`)

**Purpose**: Company news, articles, and insights  
**Dynamic Pages**: `/news/[slug]` for individual articles  

**Key Sections**:
- Featured articles
- Article grid with filters
- Categories
- Search functionality

**SEO Elements**:
- Listing Page Title: News & Insights | Maison Elaris
- Article Page Title: [Article Title] | Maison Elaris
- Meta Description: [Article excerpt]
- Keywords: [Article tags]

**Update Frequency**: Weekly or as articles are published

**Managing Article URLs**:
- URL format: `/news/article-title-slug`
- Slug is auto-generated from title
- Can be manually edited in dashboard
- Old URLs should redirect (301) if changed

---

### 7. Contact Pages (`/connect/*`)

**Purpose**: Multiple contact forms for different inquiry types

#### 7.1 Main Contact (`/connect`)
- Contact type selection
- Links to specific forms

#### 7.2 General Inquiries (`/connect/general-inquiries`)
- Contact form
- Sends email to hello@maisonelaris.com
- Saves to CRM

#### 7.3 PR & Partnerships (`/connect/pr-partnerships`)
- Partnership inquiry form
- Budget and timeline fields
- Sends email to hello@maisonelaris.com

#### 7.4 Careers (`/connect/careers`)
- Career inquiries
- Links to job postings

**SEO Elements**:
- Title: Contact Us | Maison Elaris
- Meta Description: Get in touch with our team
- Keywords: contact, inquiry, partnership

**Update Frequency**: Static (forms remain consistent)

---

### 8. Dashboard (`/dashboard/*`)

**Purpose**: Admin area for content management  
**Access**: Requires authentication  
**Note**: Not included in public sitemap.xml (noindex)

---

## 🔍 SEO Sitemap Management

### Generating sitemap.xml

**Location**: `frontend/public/sitemap.xml`

#### Automatic Generation

The sitemap should be dynamically generated to include:
1. All static pages
2. Dynamic article pages from database
3. Last modified dates
4. Change frequency
5. Priority values

#### Manual sitemap.xml Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- Home Page -->
  <url>
    <loc>https://www.maisonelaris.com/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- About Page -->
  <url>
    <loc>https://www.maisonelaris.com/about</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Services Page -->
  <url>
    <loc>https://www.maisonelaris.com/services</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Work Page -->
  <url>
    <loc>https://www.maisonelaris.com/work</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Location Page -->
  <url>
    <loc>https://www.maisonelaris.com/location</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- News Listing -->
  <url>
    <loc>https://www.maisonelaris.com/news</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Dynamic Article Pages -->
  <!-- These should be generated from database -->
  <url>
    <loc>https://www.maisonelaris.com/news/article-slug-example</loc>
    <lastmod>2025-01-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Contact Pages -->
  <url>
    <loc>https://www.maisonelaris.com/connect</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.maisonelaris.com/connect/general-inquiries</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.maisonelaris.com/connect/pr-partnerships</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://www.maisonelaris.com/connect/careers</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
</urlset>
```

### Priority Guidelines

- **1.0**: Homepage
- **0.9**: Main service pages
- **0.8**: About, Work, News listing
- **0.7**: Location, Connect
- **0.6**: Individual articles, sub-contact pages
- **0.5**: Secondary pages

### Change Frequency Guidelines

- **Daily**: News listing, frequently updated content
- **Weekly**: Home page, Work/Portfolio
- **Monthly**: Services, Articles, About
- **Yearly**: Contact pages, Location

---

## 📝 How to Update Sitemap

### Option 1: Automated Sitemap Generation (Recommended)

Create a sitemap generation script:

**Location**: `frontend/scripts/generate-sitemap.js`

```javascript
const fs = require('fs');
const path = require('path');

// Static pages
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/services', priority: '0.9', changefreq: 'monthly' },
  { url: '/work', priority: '0.8', changefreq: 'weekly' },
  { url: '/location', priority: '0.7', changefreq: 'yearly' },
  { url: '/news', priority: '0.8', changefreq: 'daily' },
  { url: '/connect', priority: '0.7', changefreq: 'yearly' },
  { url: '/connect/general-inquiries', priority: '0.6', changefreq: 'yearly' },
  { url: '/connect/pr-partnerships', priority: '0.6', changefreq: 'yearly' },
  { url: '/connect/careers', priority: '0.6', changefreq: 'monthly' },
];

async function generateSitemap() {
  const baseUrl = 'https://www.maisonelaris.com';
  const today = new Date().toISOString().split('T')[0];
  
  // Fetch dynamic article pages from API
  const articles = await fetch('http://localhost:5000/api/articles/public')
    .then(res => res.json())
    .catch(() => ({ data: { articles: [] } }));
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add static pages
  staticPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  // Add dynamic article pages
  if (articles.data && articles.data.articles) {
    articles.data.articles.forEach(article => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/news/${article.slug}</loc>\n`;
      xml += `    <lastmod>${article.updatedAt.split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += '  </url>\n';
    });
  }
  
  xml += '</urlset>';
  
  // Write to public folder
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml);
  console.log('✅ Sitemap generated successfully!');
}

generateSitemap();
```

**To Run**:
```bash
cd frontend
node scripts/generate-sitemap.js
```

**Add to package.json**:
```json
{
  "scripts": {
    "generate-sitemap": "node scripts/generate-sitemap.js",
    "build": "npm run generate-sitemap && next build"
  }
}
```

### Option 2: Next.js API Route

Create an API endpoint that generates sitemap dynamically:

**Location**: `frontend/src/app/sitemap.xml/route.ts`

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.maisonelaris.com';
  
  // Fetch articles from API
  const articlesRes = await fetch('http://localhost:5000/api/articles/public');
  const articles = await articlesRes.json();
  
  // Generate XML
  // ... (similar to script above)
  
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
```

### Option 3: Manual Update

1. Open `frontend/public/sitemap.xml`
2. Add new URLs as pages are created
3. Update `<lastmod>` dates when content changes
4. Save and redeploy

---

## 🤖 robots.txt

**Location**: `frontend/public/robots.txt`

```txt
# Allow all crawlers
User-agent: *
Allow: /

# Disallow dashboard
Disallow: /dashboard

# Sitemap location
Sitemap: https://www.maisonelaris.com/sitemap.xml
```

---

## 🔗 Internal Linking Strategy

### Navigation Links (Header/Footer)
- Home → All main pages
- About → Services, Work, Contact
- Services → Work, Contact
- Work → Services, Contact
- News → Individual articles
- Contact → All contact forms

### Content Links
- Articles → Related articles, Services
- Services → Work examples, Contact
- Work → Services used, Contact

---

## 📊 SEO Checklist

When adding a new page:
- [ ] Add to sitemap.xml
- [ ] Set unique title tag
- [ ] Write compelling meta description
- [ ] Add relevant keywords
- [ ] Set Open Graph tags
- [ ] Set Twitter Card tags
- [ ] Add canonical URL
- [ ] Create internal links from existing pages
- [ ] Submit to Google Search Console
- [ ] Test with Google Rich Results Test

---

## 📈 Monitoring

### Tools to Use
1. **Google Search Console**: Monitor indexing, errors
2. **Google Analytics**: Track traffic, behavior
3. **Sitemap Validators**: 
   - https://www.xml-sitemaps.com/validate-xml-sitemap.html
   - Google Search Console Sitemap Tool

### Regular Checks
- **Weekly**: Check for crawl errors
- **Monthly**: Review sitemap coverage
- **Quarterly**: Update change frequencies
- **Yearly**: Review and update priority values

---

## 🚀 Deployment Checklist

Before deploying to production:
- [ ] Regenerate sitemap with latest content
- [ ] Verify all URLs are accessible
- [ ] Test sitemap.xml loads properly
- [ ] Submit sitemap to Google Search Console
- [ ] Check robots.txt is correct
- [ ] Verify meta tags on all pages
- [ ] Test mobile-friendliness
- [ ] Check page load speeds

---

## 📞 Support

For sitemap or SEO questions:
- **Tech Support**: ahmedjaziri41@gmail.com
- **General Inquiries**: hello@maisonelaris.com
- **Dashboard**: Generate sitemap from admin panel (if implemented)

---

**Last Updated**: January 2025  
**Next Review**: April 2025

