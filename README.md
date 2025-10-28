# Maison Elaris - Tembri Project

A full-stack web application for Maison Elaris, featuring a modern marketing website with integrated CMS, CRM, and newsletter management system.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Atlas)
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer (supports SMTP, SendGrid, Mailgun, AWS SES)
- **File Upload**: Multer with support for local/S3/Cloudinary storage

## 📁 Project Structure

```
tembri/
├── frontend/                 # Next.js frontend application
│   ├── public/              # Static assets (images, fonts, etc.)
│   │   ├── logo.webp
│   │   ├── Flot.webp
│   │   ├── card.webp
│   │   ├── card1.webp, card2.webp, card3.webp
│   │   ├── services/        # Service page images
│   │   ├── companies/       # Partner/client logos
│   │   ├── news/           # News/articles images
│   │   └── elaris banners/ # Campaign banners
│   ├── src/
│   │   ├── app/            # Next.js App Router pages
│   │   │   ├── page.tsx                    # Home page
│   │   │   ├── about/                      # About Us page
│   │   │   ├── services/                   # Services page
│   │   │   ├── work/                       # Portfolio/Work page
│   │   │   ├── location/                   # Location page
│   │   │   ├── news/                       # News/Blog listing
│   │   │   │   └── [slug]/                 # Individual article pages
│   │   │   ├── connect/                    # Contact pages
│   │   │   │   ├── page.tsx               # Main contact selection
│   │   │   │   ├── general-inquiries/     # General inquiry form
│   │   │   │   ├── pr-partnerships/       # PR & partnerships form
│   │   │   │   └── careers/               # Career inquiries
│   │   │   └── dashboard/                  # Admin dashboard
│   │   │       ├── page.tsx               # Dashboard home
│   │   │       ├── articles/              # Article management
│   │   │       │   ├── page.tsx          # Articles list
│   │   │       │   ├── new/              # Create article
│   │   │       │   └── [id]/edit/        # Edit article
│   │   │       ├── careers/               # Job posting management
│   │   │       ├── crm/                   # Customer relationship management
│   │   │       ├── newsletter/            # Newsletter management
│   │   │       └── profile/               # User profile
│   │   ├── components/      # Reusable React components
│   │   │   ├── Header.tsx              # Site header/navigation
│   │   │   ├── Footer.tsx              # Site footer
│   │   │   ├── RichTextEditor.tsx      # WYSIWYG editor for articles
│   │   │   ├── DashboardLayout.tsx     # Dashboard wrapper
│   │   │   ├── CircularGallery.tsx     # Animated project gallery
│   │   │   ├── LogoLoop.tsx           # Partner logo carousel
│   │   │   └── ui/                    # UI primitives (buttons, cards, etc.)
│   │   ├── lib/            # Utility functions and API clients
│   │   │   ├── api.ts                 # API client functions
│   │   │   └── gsap.ts                # GSAP configuration
│   │   ├── hooks/          # Custom React hooks
│   │   │   ├── useGSAP.ts
│   │   │   └── useScrollAnimation.ts
│   │   └── store/          # State management (Zustand)
│   │       └── useStore.ts
│   ├── package.json
│   └── next.config.js
│
├── backend/                 # Express.js backend API
│   ├── config/             # Configuration files
│   │   ├── database.js            # MongoDB connection
│   │   └── swagger.js             # API documentation
│   ├── controllers/        # Request handlers
│   │   ├── auth.js               # Authentication endpoints
│   │   ├── articles.js           # Article CRUD operations
│   │   ├── careers.js            # Job posting management
│   │   ├── crm.js                # CRM customer management
│   │   ├── subscribers.js        # Newsletter subscriber management
│   │   └── newsletters.js        # Newsletter campaign management
│   ├── middleware/         # Express middleware
│   │   ├── auth.js               # JWT authentication
│   │   ├── authorize.js          # Role-based authorization
│   │   ├── errorHandler.js       # Global error handling
│   │   └── upload.js             # File upload handling
│   ├── models/             # Data models and schemas
│   │   ├── Article.js
│   │   ├── Career.js
│   │   ├── Customer.js
│   │   ├── Subscriber.js
│   │   └── Newsletter.js
│   ├── routes/             # API route definitions
│   │   ├── auth.js
│   │   ├── articles.js
│   │   ├── careers.js
│   │   ├── crm.js
│   │   ├── subscribers.js
│   │   └── newsletters.js
│   ├── utils/              # Utility functions
│   │   ├── emailService.js       # Email sending service
│   │   ├── dbOperations.js       # Database helpers
│   │   └── validators.js         # Input validation
│   ├── uploads/            # Uploaded files (local storage)
│   ├── .env               # Environment variables
│   ├── app.js             # Express app configuration
│   ├── server.js          # Server entry point
│   └── package.json
│
└── README.md              # This file
```

## 🎨 Key Features

### Public Website
- **Home Page**: Animated hero section with rotating taglines, project carousel, and company logos
- **Services**: Interactive service cards with expandable details
- **About Us**: Company story, team, and values
- **Work/Portfolio**: Showcase of projects and case studies
- **Location**: Office locations and contact information
- **News/Blog**: Articles and company updates
- **Contact Forms**: 
  - General inquiries
  - PR & partnerships
  - Career inquiries

### Admin Dashboard
- **Article Management**: Create, edit, publish, and manage blog posts with rich text editor
- **Career Management**: Post job openings and manage applications
- **CRM**: Customer relationship management with lead tracking
- **Newsletter**: Create and send email campaigns to subscribers
- **Analytics**: View engagement metrics and statistics

## 📝 Content Management Guide

### Managing Articles/Blog Posts

1. **Navigate to Dashboard**
   - Login at `/dashboard`
   - Click on "Articles" in the sidebar

2. **Create New Article**
   - Click "New Article" button
   - Fill in required fields:
     - Title
     - Content (using rich text editor)
     - Short description (for previews)
     - Full description
     - Category
     - Tags (comma-separated)
     - Featured image
   - Set status (draft/published)
   - Click "Save"

3. **Edit Existing Article**
   - Click on article from list
   - Click "Edit" button
   - Make changes
   - Click "Update Article"

4. **Rich Text Editor Features**
   - **Text Formatting**: Bold, Italic, Underline
   - **Headings**: H1, H2, H3 (no auto-bold, affects selected text only)
   - **Lists**: Bullet and numbered lists
   - **Alignment**: Left, center, right
   - **Font Size**: Dropdown menu with 7 size options
   - Note: Headings maintain regular font weight unless manually bolded

### Managing Images

#### Frontend Images
Located in `frontend/public/`:

1. **Logo**: `/logo.webp` - Site logo (header/footer)
2. **Hero Images**: 
   - `/Flot.webp` - Floating card on homepage
   - `/card.webp`, `/card1.webp`, `/card2.webp`, `/card3.webp` - Service cards
3. **Service Page**: `/services/` folder
   - `backwriting.webp` - Hero background
   - `image1.webp`, `image2.webp` - Service section images
   - `choose.webp` - "Why Choose" section image
4. **Company Logos**: `/companies/` folder - Partner/client logos
5. **Banners**: `/elaris banners/` - Marketing campaign banners
   - Organized by device size (PC, Tablet, Mobile)

**To Update Images**:
- Replace the file in the appropriate folder
- Keep the same filename OR update the import in the component
- Use WebP format for optimal performance
- Recommended sizes:
  - Logo: 180x90px
  - Hero images: 800x800px
  - Service cards: 400x600px
  - Company logos: 200x100px

### Managing Contact Form Submissions

**Email Notifications**:
- All general inquiries and PR partnership forms send emails to: `hello@maisonelaris.com`
- Submissions are also saved to the CRM database
- Access submissions via Dashboard → CRM

**Email Configuration** (Backend):
Located in `backend/.env`:
```env
# Email Settings
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@maisonelaris.com
FROM_NAME=Maison Elaris
```

### Managing Services Content

**Location**: `frontend/src/app/services/page.tsx`

**To Update Services**:
1. Open the file
2. Find the service section (Service 01-05)
3. Update:
   - Title
   - Description
   - Includes list
   - "Perfect for" section
4. Save and deploy

### Managing Navigation Menu

**Location**: `frontend/src/components/Header.tsx`

**Menu Items**:
- Desktop: Slide-down menu (center of header)
- Mobile: Hamburger menu (right side)

**To Add/Remove Menu Items**:
1. Find the navigation section (around line 200)
2. Add/remove Link components:
```tsx
<Link 
  href="/your-page" 
  className="text-white text-lg lg:text-xl font-heading font-light hover:text-[#ffe9c7] transition-colors duration-300"
  onClick={toggleSlideMenu}
>
  Your Page Name
</Link>
```

### Managing Footer Content

**Location**: `frontend/src/components/Footer.tsx`

Update:
- Company information
- Social media links
- Contact details
- Copyright text

## 🎭 Animations

The site uses GSAP for animations:

- **Home Page**: Card rotation, text cycling, scroll-triggered animations
- **Services**: Sticky card animation on scroll
- **All Pages**: Smooth transitions and hover effects

**To Modify Animations**:
- Find animation code in respective page components
- Look for `useGSAP` hooks
- Adjust timing, easing, and effects as needed
- Test on different screen sizes

## 🗄️ Database Collections

MongoDB collections:
- `users` - Admin users
- `articles` - Blog posts/news
- `careers` - Job postings
- `applications` - Job applications
- `customers` - CRM contacts
- `activities` - CRM activity logs
- `subscribers` - Newsletter subscribers
- `newsletters` - Email campaigns
- `notifications` - System notifications
- `auditlogs` - Activity audit trail

## 🔐 Authentication & Authorization

**Roles**:
- `admin` - Full access
- `editor` - Content management
- `sales` - CRM access
- `viewer` - Read-only access

**Protected Routes**:
All `/dashboard/*` routes require authentication.

## 📧 Email Configuration

The system supports multiple email providers:
- SMTP (Gmail, Outlook, etc.)
- SendGrid
- Mailgun
- AWS SES

**Setup**:
1. Choose provider in `.env`: `EMAIL_PROVIDER=smtp`
2. Configure credentials
3. Test email sending via dashboard

## 🚀 Deployment

Both frontend and backend are deployed on **Vercel**.

### Frontend Deployment (Vercel)

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Select the `frontend` directory as root

2. **Configure Build Settings**
   ```
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Set Environment Variables** (in Vercel Dashboard):
   - `NEXT_PUBLIC_API_URL` - Backend API URL (e.g., https://your-backend.vercel.app)

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy on every push to main branch

### Backend Deployment (Vercel)

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Select the `backend` directory as root

2. **Configure Build Settings**
   ```
   Framework Preset: Other
   Root Directory: backend
   Build Command: npm install
   Output Directory: ./
   Install Command: npm install
   ```

3. **Set Environment Variables** (in Vercel Dashboard):
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://your-connection-string
   JWT_SECRET=your-jwt-secret-key
   JWT_EXPIRE=24h
   JWT_REFRESH_SECRET=your-refresh-secret-key
   JWT_REFRESH_EXPIRE=7d
   
   # Email Configuration
   EMAIL_PROVIDER=smtp
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   FROM_EMAIL=noreply@maisonelaris.com
   FROM_NAME=Maison Elaris
   REPLY_TO_EMAIL=hello@maisonelaris.com
   
   # CORS (set to your frontend URL)
   CORS_ORIGIN=https://www.maisonelaris.com
   CORS_CREDENTIALS=true
   
   # Storage (if using cloud storage)
   STORAGE_PROVIDER=cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Create vercel.json** in backend root:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```

5. **Deploy**
   - Click "Deploy"
   - Note the backend URL and add it to frontend's `NEXT_PUBLIC_API_URL`

### Post-Deployment Checklist
- [ ] Verify frontend can communicate with backend
- [ ] Test all API endpoints
- [ ] Check email sending functionality
- [ ] Verify file uploads work (if using cloud storage)
- [ ] Test authentication flow
- [ ] Submit sitemap to Google Search Console
- [ ] Configure custom domain (if applicable)
- [ ] Set up SSL certificate (automatic with Vercel)

## 📱 Responsive Design

The site is fully responsive:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Test on all breakpoints before deploying.

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**
   - Check file paths in `public/` folder
   - Verify image format (WebP recommended)
   - Clear Next.js cache: `rm -rf .next`

2. **API errors**
   - Check backend is running
   - Verify CORS settings in backend `.env`
   - Check MongoDB connection

3. **Email not sending**
   - Verify SMTP credentials
   - Check email service logs
   - Test with development email service

4. **Animations not working**
   - Ensure GSAP is installed: `npm install gsap`
   - Check browser console for errors
   - Verify ScrollTrigger is registered

## 📞 Support

For technical issues or questions about content management:
- **Tech Support**: ahmedjaziri41@gmail.com
- **General Inquiries**: hello@maisonelaris.com
- **Dashboard**: Access via admin login

## 📄 License

Proprietary - All rights reserved by Maison Elaris

---

**Last Updated**: January 2025
**Version**: 1.0.0

