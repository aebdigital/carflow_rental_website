# 🚗 AutoPožičovňa - Car Rental Website

A modern, full-featured car rental website built with React and Vite. This application provides a complete solution for car rental businesses, featuring vehicle browsing, booking system, date availability checking, and administrative tools.

## 🌟 Features

### 🎯 Core Functionality
- **Vehicle Fleet Management** - Browse and search through available cars
- **Real-time Availability** - Check car availability for specific dates
- **Advanced Booking System** - Complete rental process with customer registration
- **Date Selection** - Interactive calendar with unavailable dates highlighting
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### 📱 User Interface
- **Modern Slovak UI** - Fully localized in Slovak language
- **Interactive Car Cards** - Detailed vehicle information with images
- **Filter & Search** - Filter by category, transmission, fuel type, and price
- **Date Range Picker** - Visual calendar for rental period selection
- **Professional Design** - Clean, modern interface with excellent UX

### 🔧 Technical Features
- **React 18** - Latest React with modern hooks and features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing and navigation
- **API Integration** - Backend communication for cars and bookings
- **Form Validation** - Comprehensive form validation and error handling

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aebdigital/carflow_rental_website.git
   cd carflow_rental_website
   ```

2. **Install dependencies**
   ```bash
   cd car-rental-frontend
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3005` to view the application.

## 📂 Project Structure

```
carflow_rental_website/
├── car-rental-frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Button.jsx       # Custom button component
│   │   │   ├── CarCard.jsx      # Vehicle display card
│   │   │   ├── CarImage.jsx     # Car image with fallback
│   │   │   ├── DatePicker.jsx   # Interactive date selector
│   │   │   ├── Header.jsx       # Navigation header
│   │   │   └── Footer.jsx       # Site footer
│   │   ├── pages/               # Page components
│   │   │   ├── HomePage.jsx     # Landing page
│   │   │   ├── FleetPage.jsx    # Vehicle browsing
│   │   │   ├── CarDetailsPage.jsx # Individual car details
│   │   │   ├── BookingPage.jsx  # Booking process
│   │   │   ├── AboutPage.jsx    # Company information
│   │   │   ├── ContactPage.jsx  # Contact form and info
│   │   │   └── FAQPage.jsx      # Frequently asked questions
│   │   ├── services/            # API communication
│   │   │   └── api.js           # Backend API calls
│   │   ├── App.jsx              # Main application component
│   │   ├── main.jsx             # Application entry point
│   │   └── index.css            # Global styles and Tailwind
│   ├── public/                  # Static assets
│   ├── package.json             # Dependencies and scripts
│   ├── vite.config.js           # Vite configuration
│   └── tailwind.config.js       # Tailwind CSS configuration
├── .gitignore                   # Git ignore rules
└── README.md                    # Project documentation
```

## 🎨 Pages Overview

### 🏠 **Homepage (`/`)**
- Hero section with company introduction
- Featured vehicles showcase
- Company statistics and values
- Customer testimonials
- Call-to-action sections

### 🚗 **Fleet Page (`/fleet`)**
- Complete vehicle listing with filtering
- Date range selection for availability
- Search and sort functionality
- Category-based filtering (transmission, fuel type, price)
- Real-time availability checking

### 🔍 **Car Details (`/car/:id`)**
- Detailed vehicle information and specifications
- High-quality images with gallery
- Booking form with date selection
- Pricing calculator
- Feature highlights and descriptions

### 📋 **Booking Process (`/booking`)**
- Multi-step booking wizard
- Customer information collection
- Date and location selection
- Price calculation and confirmation
- Account creation for new customers

### ℹ️ **About Page (`/about`)**
- Company history and story
- Mission and vision statements
- Core values and principles
- Team information and statistics

### 📞 **Contact Page (`/contact`)**
- Contact form with validation
- Business hours and location info
- Multiple contact methods
- Interactive map placeholder

### ❓ **FAQ Page (`/faq`)**
- Comprehensive frequently asked questions
- Expandable question/answer format
- Topics covering rental policies, insurance, payments

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Installation
npm install          # Install dependencies
npm ci              # Clean install for production
```

## 🎯 Key Components

### `<CarCard />` - Vehicle Display
- Displays vehicle information in a card format
- Shows availability status for selected dates
- Includes pricing, features, and specifications
- Responsive design with hover effects

### `<DatePicker />` - Date Selection
- Interactive calendar component
- Highlights unavailable dates
- Validates date ranges
- Supports Slovak localization

### `<Header />` - Navigation
- Responsive navigation menu
- Mobile hamburger menu
- Active page highlighting
- Call-to-action buttons

## 🌐 Localization

The entire application is localized in **Slovak language**:
- All user interface text
- Form labels and validation messages
- Error messages and notifications
- Date formats and currency (EUR)
- Business information and contact details

## 🎨 Styling & Design

- **Tailwind CSS** for utility-first styling
- **Custom CSS variables** for brand colors
- **Responsive design** with mobile-first approach
- **Modern color scheme** with accent colors
- **Professional typography** using Inter font
- **Consistent spacing** and layout patterns

## 🔗 API Integration

The frontend integrates with a backend API for:
- **Vehicle data** - Fetching car information and availability
- **Booking system** - Processing reservations and customer data
- **Authentication** - User login and registration
- **Admin functions** - Fleet and booking management

## 📱 Responsive Design

- **Desktop** - Full-featured layout with sidebars and detailed views
- **Tablet** - Adapted layout with collapsible navigation
- **Mobile** - Touch-optimized interface with simplified navigation
- **Cross-browser** - Compatible with modern browsers

## 🚀 Deployment

The application can be deployed to various platforms:
- **Netlify** - Automatic deployment from Git
- **Vercel** - Optimized for React applications
- **GitHub Pages** - Static site hosting
- **Traditional hosting** - Standard web hosting with build files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Email: info@autopozicovna.sk
- Phone: +421 123 456 789
- Website: Visit the contact page for more information

---

**Built with ❤️ for the Slovak car rental market** 