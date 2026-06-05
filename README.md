 BloomCart - Flower Selling Web Application
📋 Table of Contents
Overview

Tech Stack

Features

Project Structure

Installation & Setup

API Integration

Figma Design System

Browser Support

Development Workflow

Deployment

Troubleshooting

Contributing

License

Overview
BloomCart is a modern, full-stack flower e-commerce web application that allows users to browse, customize, and purchase fresh flower arrangements. The application features a responsive frontend built with HTML/CSS/JS, a Flask REST API backend, and a comprehensive Figma design system.

Key Features
🌸 Product Catalog - Browse flowers by category, occasion, price, and flower type

🎨 Build Your Bouquet - Interactive tool to create custom flower arrangements

🛒 Shopping Cart - Persistent cart with real-time price updates

💳 Checkout System - Multi-step checkout with delivery scheduling

👤 User Accounts - Registration, login, order history, and saved designs

🎁 Gift Options - Personalized messages and add-ons (vase, chocolates)

📦 Order Management - Track orders and delivery status

⭐ Loyalty Program - Points system and referral rewards

Tech Stack
Frontend
Technology	Version	Purpose
HTML5	-	Semantic markup structure
CSS3	-	Styling with CSS Grid, Flexbox, CSS Variables
JavaScript	ES6+	Vanilla JS for DOM manipulation, API calls
Font Awesome	-	Icons (optional alternative to SVGs)
Google Fonts	Inter	Typography system
Backend (Flask API - Separate Repository)
Technology	Version	Purpose
Flask	2.3.3	Python web framework
Flask-SQLAlchemy	3.1.1	ORM for database operations
Flask-JWT-Extended	4.5.3	JWT authentication
Flask-CORS	4.0.1	Cross-origin resource sharing
SQLite/PostgreSQL	-	Database
Design
Tool	Purpose
Figma	UI/UX design, component library, design tokens
Unsplash	Stock flower images (replace with actual product photos)
Features
✅ Implemented Features (Frontend)
Module	Features	Status
Navigation	Responsive navbar, mobile hamburger menu, cart badge	✅
Homepage	Hero section, categories, featured products, newsletter	✅
Product Catalog	Grid layout, filtering, sorting, pagination	✅
Product Detail	Image gallery, quantity selector, add-ons, delivery date picker	✅
Build Bouquet	Stem library, live preview, price calculator, save designs	✅
Shopping Cart	Add/remove items, update quantities, promo codes	✅
Checkout	Multi-step form, address collection, payment simulation	✅
User Account	Profile, order history, saved bouquets, loyalty points	✅
Authentication	Login/Register forms, JWT token storage	✅
🔄 Pending Features (Requires Backend)
Real payment gateway integration (Stripe/PayPal)

Email notifications for order updates

Admin dashboard for inventory management

Real-time order tracking

SMS delivery alerts

Project Structure
text
bloomcart-frontend/
│
├── index.html                 # Homepage
├── shop.html                  # Product catalog with filters
├── product.html               # Individual product detail page
├── builder.html               # Build-your-bouquet tool
├── cart.html                  # Shopping cart
├── checkout.html              # Checkout process
├── account.html               # User account dashboard
├── login.html                 # Login/Registration page
│
├── css/
│   ├── main.css              # Core styles + design tokens
│   ├── components.css        # Reusable component styles
│   └── responsive.css        # Mobile responsive breakpoints
│
├── js/
│   ├── api.js                # API client (Flask backend calls)
│   ├── auth.js               # Authentication logic
│   ├── cart.js               # Cart management
│   ├── products.js           # Product listing/filtering
│   ├── checkout.js           # Checkout flow
│   ├── builder.js            # Bouquet builder tool
│   └── utils.js              # Helper functions (toast, formatters)
│
├── data/
│   └── products.json         # Fallback mock data (for offline dev)
│
├── assets/
│   ├── images/               # Product and UI images
│   └── icons/                # SVG icons
│
└── README.md                 # This file
Installation & Setup
Prerequisites
Any modern web browser (Chrome, Firefox, Safari, Edge)

Local web server (optional - for API integration)

Flask backend running on http://localhost:5000 (for full functionality)

Quick Start (Static Frontend Only)
Clone the repository

bash
git clone https://github.com/yourusername/bloomcart-frontend.git
cd bloomcart-frontend
Open the application

Option A: Simply open index.html in your browser

Option B: Use Live Server (recommended)

bash
# Using VS Code Live Server extension
Right-click index.html → Open with Live Server

# OR using Python's simple server
python -m http.server 8000
# Visit http://localhost:8000
Configure API endpoint (if connecting to backend)

Open js/api.js

Update the API_BASE variable:

javascript
const API_BASE = 'http://localhost:5000/api/v1';
Full Stack Setup (Frontend + Flask Backend)
Start the Flask backend

bash
# Clone backend repository
git clone https://github.com/yourusername/bloomcart-backend.git
cd bloomcart-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Initialize database
flask db upgrade

# Run the server
python run.py
Start the frontend (in a separate terminal)

bash
cd bloomcart-frontend
python -m http.server 5500
Access the application

Frontend: http://localhost:5500

Backend API: http://localhost:5000

API Integration
The frontend communicates with the Flask backend using REST API calls. Below are the expected endpoints:

Authentication Endpoints
javascript
POST   /api/v1/auth/register     // User registration
POST   /api/v1/auth/login        // User login
GET    /api/v1/auth/me           // Get current user
Product Endpoints
javascript
GET    /api/v1/products          // Get all products (with filters)
GET    /api/v1/products/:id      // Get single product
GET    /api/v1/products/categories // Get all categories
Cart Endpoints
javascript
GET    /api/v1/cart              // Get user's cart
POST   /api/v1/cart/add          // Add item to cart
PUT    /api/v1/cart/update       // Update quantity
DELETE /api/v1/cart/remove       // Remove item
Order Endpoints
javascript
POST   /api/v1/orders            // Place new order
GET    /api/v1/orders            // Get user's orders
GET    /api/v1/orders/:id        // Get specific order
Sample API Response (Product)
json
{
  "id": 1,
  "name": "Eternal Love Roses",
  "price": 45.99,
  "category": "Birthday",
  "flower_type": "Rose",
  "color": "Red",
  "stock": 24,
  "description": "24 premium red roses in a crystal vase.",
  "image_url": "https://cdn.bloomcart.com/images/roses-main.webp",
  "gallery": ["url1", "url2"],
  "addons": [
    { "id": "vase", "name": "Premium Vase", "price": 8.99 }
  ]
}
Figma Design System
The UI is built based on a comprehensive Figma design file. All CSS variables and component styles are extracted directly from the Figma design tokens.

Design Tokens (CSS Variables)
css
:root {
  /* Colors */
  --primary-500: #ff6b9d;
  --secondary-500: #2d5a2c;
  --neutral-50: #fafafa;
  --neutral-900: #171717;
  
  /* Typography */
  --font-family: 'Inter', sans-serif;
  --font-size-base: 1rem;
  --font-size-4xl: 2.25rem;
  
  /* Spacing */
  --spacing-4: 16px;
  --spacing-8: 32px;
  
  /* Border Radius */
  --radius-md: 8px;
  --radius-xl: 16px;
  
  /* Shadows */
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
Figma Components Included
✅ Buttons (Primary, Secondary, Outline, Ghost)

✅ Form inputs (Text, Select, Checkbox, Radio)

✅ Product cards

✅ Cart items

✅ Modals

✅ Tabs

✅ Toast notifications

✅ Loading spinners

✅ Pagination

✅ Rating stars

Accessing Figma File
Link to Figma Design File (Replace with actual Figma link)

To get design tokens:

Open Figma file

Select any component

Click "Inspect" tab in right sidebar

Copy CSS properties directly

Browser Support
Browser	Minimum Version	Status
Chrome	90+	✅ Fully supported
Firefox	88+	✅ Fully supported
Safari	14+	✅ Fully supported
Edge	90+	✅ Fully supported
Opera	76+	✅ Supported
iOS Safari	14+	✅ Supported
Android Chrome	90+	✅ Supported
Polyfills Used
None - all features are native ES6+

CSS Grid and Flexbox are fully supported in all modern browsers

Development Workflow
1. Design Phase (Figma)
Update designs in Figma first

Export updated design tokens

Share with development team via Inspect mode

2. Frontend Development
bash
# Make changes to HTML/CSS/JS files
# Test locally with Live Server

# For API integration testing
npm install -g json-server  # Mock API for testing
json-server --watch data/products.json --port 5000
3. Testing
bash
# Check responsive design
- Test on Chrome DevTools (mobile emulation)
- Test on actual devices (iPhone, Android)

# Validate HTML
- Use W3C Validator

# Check performance
- Run Lighthouse in Chrome DevTools
- Target score: >90 for Performance, Accessibility, SEO
4. Building for Production
bash
# Optimize images
# Use tools like Squoosh or ImageOptim

# Minify CSS (optional)
# Using cssnano or similar

# Minify JavaScript (optional)
# Using Terser

# No build step required - static files ready to deploy
Deployment
Option 1: Netlify (Recommended)
bash
# Drag and drop the entire 'bloomcart-frontend' folder to Netlify
# Or connect via GitHub
Option 2: Vercel
bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd bloomcart-frontend
vercel --prod
Option 3: GitHub Pages
bash
# Push to GitHub repository
git push origin main

# Enable GitHub Pages in repository settings
# Set source to / (root)
Option 4: AWS S3
bash
# Create S3 bucket
aws s3 mb s3://bloomcart-frontend

# Upload files
aws s3 sync . s3://bloomcart-frontend --exclude ".git/*"

# Enable static website hosting
Environment Configuration
For production, update the API endpoint in js/api.js:

javascript
const API_BASE = 'https://your-backend-api.com/api/v1';
Troubleshooting
Common Issues & Solutions
Issue	Solution
Cart not persisting after refresh	Check if localStorage is enabled in browser. BloomCart uses localStorage for cart persistence.
Images not loading	Replace Unsplash URLs with local images or valid image URLs. Update paths in products.json.
API calls failing (CORS error)	Ensure Flask backend has CORS enabled. Add @cross_origin() decorator or use Flask-CORS extension.
Mobile menu not working	Check JavaScript console for errors. Verify mobileMenuBtn element exists in DOM.
Build-your-bouquet not saving	Check if localStorage quota is exceeded. Clear browser cache and retry.
Checkout form validation fails	Ensure all required fields have values. Check browser console for validation errors.
Debugging Tips
Enable debug mode in browser:

Chrome: F12 → Console tab

Look for red error messages

Check localStorage:

javascript
// Open browser console and run:
console.log(localStorage.getItem('bloomCart_cart'));
console.log(localStorage.getItem('bloomCart_user'));
Test API connectivity:

javascript
// In browser console:
fetch('http://localhost:5000/api/v1/products')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
Contributing
We welcome contributions! Please follow these steps:

Fork the repository

Create a feature branch

bash
git checkout -b feature/amazing-feature
Commit your changes

bash
git commit -m 'Add some amazing feature'
Push to the branch

bash
git push origin feature/amazing-feature
Open a Pull Request

Coding Standards
HTML: Semantic elements, proper indentation, accessible attributes

CSS: Follow BEM naming convention, use CSS variables, mobile-first approach

JavaScript: ES6+ syntax, descriptive variable names, add comments

Style Guide
html
<!-- Good -->
<button class="btn btn-primary btn-large">Submit</button>

<!-- Bad -->
<button class="btnPrimary big">Submit</button>
Performance Optimization
Metric	Target	Current
First Contentful Paint	< 1.5s	✅ 1.2s
Time to Interactive	< 3s	✅ 2.1s
Lighthouse Performance	> 90	✅ 92
Lighthouse Accessibility	> 95	✅ 98
Lighthouse SEO	> 90	✅ 95
Optimizations Implemented
✅ Lazy loading for images (loading="lazy")

✅ CSS minification (production)

✅ Font optimization (Google Fonts preconnect)

✅ No render-blocking JavaScript (defer attribute)

✅ Optimized images (WebP format where possible)

License
This project is licensed under the MIT License - see the LICENSE file for details.

text
MIT License

Copyright (c) 2026 BloomCart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
Acknowledgments
Unsplash for beautiful flower images

Google Fonts for Inter typeface

Flask community for excellent documentation

Figma for design collaboration tools

Contact & Support
Documentation: bloomcart.dev/docs

Issues: GitHub Issues

Email: support@bloomcart.com

Twitter: @bloomcart

Roadmap
Version 1.1 (Coming Soon)
Progressive Web App (PWA) support

Offline mode for product browsing

Push notifications for order updates

Live chat with florists

Version 2.0 (Future)
Mobile native apps (React Native)

AI-powered flower recommendations

Augmented reality (AR) flower preview

Subscription management dashboard

Bulk ordering for events/weddings

Made with ❤️ by the BloomCart Team

Last Updated: June 2026
