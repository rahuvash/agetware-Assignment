# agetware E-Commerce Application

agetware is a modern e-commerce application built using **React**, **Redux**, **TailwindCSS**, and other popular web technologies. The application allows users to browse products, view detailed product information, add products to the cart, and simulate a checkout process. It also includes an **Admin Dashboard**, **User Authentication**, and additional features like **searching**, **sorting**, and **lazy loading** for better performance.

## Table of Contents

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Installation](#installation)
4. [Routing](#routing)
5. [Advanced Features](#advanced-features)
6. [Deployment](#deployment)
7. [Testing](#testing)
8. [Project Structure](#project-structure)

## Features

### 1. **Home Page**
   - Displays a grid of products with key details (name, price, and image).
   - Includes a **Search Bar** to filter products by name or category.
   - Provides a **Sorting Dropdown** for sorting products by price or rating.

### 2. **Product Details Page**
   - Displays detailed information about the selected product (name, price, description, images, and ratings).
   - Includes an **Add to Cart** button to add the product to the shopping cart.

### 3. **Shopping Cart Page**
   - Displays products added to the cart, with the option to update the quantity or remove items.
   - Shows the total price of all items in the cart.
   - Includes a **Checkout** button (mocked action for now).

### 4. **Admin Dashboard**
   - Manage products (Add, Update, Delete) in the admin panel.

### 5. **User Authentication (Mocked)**
   - User authentication with a mock username and password.
   credentials
   - (user) username - rahuluser@gmail.com password - 123
   - (admin) username - rahuladmin@gmail.com password - 123

### 6. **Wishlist Feature** **
   - Allows users to save their favorite products to a wishlist.

### 7. **Performance Optimizations**
   - **Lazy Loading**: Images are lazily loaded to improve performance.
   - **Dynamic Imports**: Dynamic imports for better code splitting.

### 8. **Animations**
   - Smooth page transitions and interactions powered by **Framer Motion**.

## Technology Stack

- **React** for building the user interface.
- **Redux** for state management.
- **TailwindCSS** for responsive, utility-first styling.
- **React Router** for handling routing between pages.
- **Axios** for API requests.
- **Framer Motion** for animations and page transitions.
- **Fake Store API** for fetching product data.

## Installation

Follow the steps below to set up and run the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rahuvash/agetware-Assignment.git
   cd agetware-Assignment

    npm install
    npm start


src/
│
├── assets/               # Static files such as images
├── components/           # Reusable UI components (ProductCard, SearchBar, etc.)
├── pages/                # Application pages (HomePage, ProductDetailsPage, CartPage)
├── store/                # Redux store and slices (cart, wishlist, etc.)
├── App.js                # Main component
├── index.js              # React entry point
├── tailwind.config.js    # TailwindCSS configuration
├── postcss.config.js     # PostCSS configuration
├── package.json          # Project metadata and dependencies
└── .gitignore            # Git ignore file
