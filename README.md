# SHOP.CO E-Commerce Website

A modern, responsive e-commerce website built with HTML, CSS, Bootstrap, and JavaScript.

![SHOP.CO Logo](../Images/logo.png)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Pages](#pages)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

SHOP.CO is a fully responsive e-commerce platform that offers a wide range of products across multiple categories. The website features a modern UI design, user authentication, product browsing, detailed product views, and shopping cart functionality.

## Features

- Responsive design that works on desktop and mobile devices
- User authentication system (login/registration)
- Product catalog with multiple categories
- Product filtering and searching
- Detailed product pages with images, descriptions, and reviews
- Shopping cart functionality
- Newsletter subscription
- User-friendly navigation

## Project Structure

```
SHOP.CO/
├── HTML/
│   ├── Home.html
│   ├── productDetails.html
│   ├── shopPage.html
│   ├── cartPage.html
│   ├── login.html
│   └── register.html
├── Scripts/
│   ├── JS/
│   │   ├── bootstrap.bundle.min.js
│   │   └── all.min.js
│   ├── home.js
│   ├── productDetails.js
│   ├── shopPage.js
│   ├── login.js
│   └── register.js
├── Styles/
│   ├── CSS/
│   │   ├── bootstrap.min.css
│   │   ├── all.min.css
│   │   └── variables.css
│   ├── Home.css
│   ├── productDetails.css
│   ├── shopPage.css
│   ├── login.css
│   └── register.css
└── Images/
    ├── TimmedHero.png
    ├── VERSACE.svg
    ├── ZARA.svg
    ├── GUCCI.svg
    ├── PARDA.svg
    ├── CalvinClein.svg
    ├── Frame.svg
    ├── arrow.svg
    └── FooterIcons.svg
```

## Technologies Used

- **HTML5** - For structuring the web content
- **CSS3** - For styling the website
- **Bootstrap 5** - For responsive design and pre-built components
- **JavaScript** - For interactive functionality and form validation
- **Font Awesome** - For icons
- **Google Fonts** - For typography (Roboto font family)

## Implementation Notes

- The authentication system uses client-side validation for form inputs
- File paths in HTML files use relative paths (../Scripts/, ../Styles/) which may need adjustment based on your actual directory structure
- Currently, the authentication system is front-end only and would need to be connected to a backend service for actual user data storage and validation
- CSS variables are defined in variables.css for consistent styling across the site

## Pages

### Home Page

The main landing page featuring:
- Navigation bar with categories
- Hero section with call-to-action
- New arrivals section
- Top selling products
- Brand showcase
- Customer reviews carousel
- Newsletter subscription
- Footer with links and social media

### Shop Page

Product browsing page with:
- Category filtering
- Price range slider
- Product grid display
- Add to cart functionality

### Product Details Page

Individual product viewing page with:
- Product images
- Product information (name, price, discount)
- Color and size selection
- Quantity controls
- Add to cart button
- Product details and specifications
- Customer reviews and ratings

### Cart Page

Shopping cart page with:
- Product list with quantities
- Price calculations
- Checkout options

### Login Page

User authentication page with:
- Email input
- Password input
- Form validation (client-side)
- Login button
- Sign up link for new users
- Alert system for error messages

### Register Page

User registration page with:
- Full name input
- Email input
- Password creation with validation (minimum length requirement)
- Password confirmation
- Registration button
- Alert system for success/error messages
- Login link for existing users

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/shop-co.git
   ```

2. Navigate to the project directory:
   ```
   cd shop-co
   ```

3. Open the home page in your browser:
   ```
   open HTML/Home.html
   ```

## Usage

1. Browse the website by navigating through the menu items.
2. Use the search functionality to find specific products.
3. Filter products by category and price range.
4. View product details by clicking on product cards.
5. Add products to cart and proceed to checkout.
6. Register a new account or login with existing credentials to access user features.

### Authentication Flow

1. To register: 
   - Navigate to the register.html page
   - Complete all required fields (full name, email, password)
   - Submit the form to create your account
   - Upon successful registration, you will be directed to login

2. To login:
   - Navigate to the login.html page
   - Enter your email and password
   - Click the login button to access your account

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

© 2025 SHOP.CO. All Rights Reserved.