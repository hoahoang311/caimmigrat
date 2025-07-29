# CAimmigrat - Canadian Immigration Consultancy Website

A modern, responsive website built with Next.js 14, TypeScript, Tailwind CSS, and Shadcn/UI components for a Canadian immigration consultancy service. This project was inspired by the Esteem Immigration website and provides a professional, clean, and user-friendly interface tailored for immigration services.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first design that works on all devices
- **Professional UI**: Clean, trustworthy design using Shadcn/UI components
- **SEO Optimized**: Proper meta tags, semantic HTML, and Next.js optimizations
- **Accessibility**: ARIA labels, keyboard navigation, and high contrast colors
- **Form Validation**: Robust form validation using React Hook Form and Zod
- **Interactive Components**: Smooth animations and transitions

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── forms/             # Form components
│   │   ├── AssessmentForm.tsx
│   │   ├── ContactForm.tsx
│   │   └── NewsletterForm.tsx
│   ├── layout/            # Layout components
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   └── ui/                # Shadcn/UI components
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

## 📱 Pages and Components

### Pages
- **Home Page**: Hero section, features, immigration programs, assessment form, and CTA
- **Contact Page**: Contact information, contact form, Google Maps integration, and FAQ

### Key Components
- **Navbar**: Sticky navigation with mobile menu
- **Footer**: Contact info, newsletter signup, and social media links
- **AssessmentForm**: Free immigration assessment with validation
- **ContactForm**: Contact inquiry form with validation
- **NewsletterForm**: Email subscription form

## 🎨 Design Features

- **Color Scheme**: Professional navy blue, white, and green accents
- **Typography**: Inter font with clear hierarchy
- **Layout**: Mobile-first responsive design
- **Animations**: Subtle hover effects and transitions
- **Imagery**: Optimized images using Next.js Image component

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd caimmigration-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Environment Variables

Create a `.env.local` file based on `.env.local.example`:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
EMAIL_SERVICE_API_KEY=your_email_service_api_key
DATABASE_URL=your_database_connection_string
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_google_analytics_id
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## 🖼️ Image Configuration

The project includes a robust image loading system with multiple fallbacks:

### Hero Image System
- **Auto-Slideshow**: Cycles through 4 Canadian cities every 10 seconds (Vancouver, Toronto, Ottawa, Montreal)
- **Pause on Hover**: Slideshow pauses when user hovers over the image
- **Interactive Controls**: Click indicators to manually switch between cities
- **Smooth Transitions**: 1-second fade transitions between images
- **Loading States**: Elegant loading spinner during image transitions
- **Smart Fallbacks**: Automatic failover if external images fail to load
- **Local Backup**: Custom SVG placeholder (`/public/canada-placeholder.svg`)
- **Ultimate Fallback**: CSS gradient background with icons

### Next.js Image Configuration
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
      port: '',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'plus.unsplash.com',
      port: '',
      pathname: '/**',
    },
  ],
}
```

This ensures the website always displays properly, even if external images fail to load.

## 🎨 Styling Configuration

This project uses **Tailwind CSS v3.4.0** with traditional configuration:

- **CSS File**: `src/app/globals.css` - Contains Tailwind directives and custom CSS variables
- **Config File**: `tailwind.config.js` - Tailwind configuration with Shadcn/UI integration
- **PostCSS**: Configured with `tailwindcss` and `autoprefixer` plugins

**Important**: The project is configured to use Tailwind CSS v3 (not v4) for compatibility with Shadcn/UI components.

## 📞 Contact Information

The website includes contact information for the Mississauga office:

- **Address**: 601-165 Dundas St W, Mississauga, ON L5B 2N6
- **Phone**: +1 416-992-7429
- **Business Hours**: Monday-Friday 9:00 AM - 6:00 PM

## 🎯 Key Features Implementation

### Form Handling
- All forms use React Hook Form with Zod validation
- Form submissions are logged to console (ready for backend integration)
- Success states and error handling included

### Responsive Design
- Mobile-first approach using Tailwind CSS
- Responsive navigation with hamburger menu
- Optimized layouts for all screen sizes

### SEO Optimization
- Proper meta tags and Open Graph data
- Semantic HTML structure
- Optimized images with Next.js Image component
- Fast loading with Next.js optimizations

### Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast color scheme
- Screen reader friendly structure

## 🚀 Deployment

### AWS Amplify (Configured)

This project is pre-configured for AWS Amplify deployment with:

- ✅ **Static Export**: Optimized for Amplify hosting
- ✅ **Build Configuration**: `amplify.yml` included
- ✅ **Environment Variables**: Production-ready setup
- ✅ **Security Headers**: Built-in security features
- ✅ **Performance**: CDN and caching optimized

**Quick Deploy to Amplify:**
1. Push code to GitHub
2. Connect repository to AWS Amplify
3. Deploy automatically with included configuration

📖 **Detailed Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete step-by-step instructions.

### Alternative Platforms

The application also works on:
- **Vercel**: `npx vercel`  
- **Netlify**: Drag & drop `.next` folder
- **Any static hosting**: Use `npm run build` output

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for educational and commercial purposes. Please ensure you have proper rights to use any images or content.

## 🔮 Future Enhancements

- Backend API integration for form submissions
- Content Management System (CMS) integration
- Multi-language support
- Blog section for immigration news
- Client portal for case tracking
- Payment integration for services
- Advanced analytics and tracking

---

Built with ❤️ using Next.js 14, TypeScript, Tailwind CSS, and Shadcn/UI# caimmigrat
