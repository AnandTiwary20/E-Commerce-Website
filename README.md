Github Link -https://github.com/AnandTiwary20/E-Commerce-Website

# How To run it ?

1- cd @latest
2- npm i 
3- npm i prop-types
4- npm run dev

----------------------------------------------------------------------------------

# Project Overview

- useEffect to fetch details of a selected product based on
  route parameters when the component mounts. Store the fetched data in the
  component’s state  (✓)
- Error Handling: Implement error handling to manage failed data fetch requests
  gracefully. (✓)
- Redux for more complex state management. (✓)
- Create actions, reducers, and selectors to manage the state of cart items. (✓)
- Implement routing using React Router. (✓)
- Implement code splitting and lazy loading for components using React.lazy and
Suspense for all the components. Implement lazy loading for images. (✓)
- Apply CSS for styling. Ensure the application is responsive and works well on different screen sizes. (✓)
- Add a button in each ProductItem to add the product to the cart. Add a button in each CartItem to remove the product from the cart. (✓)


-------------------------------------------------------------------------------------------------------------------------------------------------------------------
Modern React E-Commerce Cart

A lightweight, responsive shopping cart system built with React.
The project focuses on clean UI, modular structure, and practical cart functionality — including quantity management, checkout preview, and error-safe operations.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🗂️ Folder Structure

├── Components/                      # Reusable UI components
│ ├── Cart.jsx                       # Shopping cart component
│ ├── CartItem.jsx                   # Individual cart item
│ ├── Checkout.jsx                   # Checkout process
│ ├── LazyImage.jsx                  # Image loading component
│ ├── Navbar.jsx                     # Navigation bar
│ ├── NotFound.jsx                   # 404 page
│ ├── ProductDetail.jsx              # Product details view
│ ├── ProductItem.jsx                # Single product card
│ └── ProductList.jsx                # Product listing
│
├── app/                             # App configuration
│ ├── store.jsx                      # Redux store setup
│ └── hooks.jsx                      # Redux hooks
│
├── assets/                          # Static assets
│ └── images/                        # Image files
│
├── context/                         # React Context
│ └── CartContext.jsx                # Cart state management
│
├── features/                        # Feature modules
│ ├── cart/                          # Cart functionality
│ │ └── cartSlice.jsx                # Redux cart slice
│ └── search/                        # Search functionality
│ └── searchSlice.jsx                # Redux search slice
│
├── hooks/                           # Custom hooks
│ └── useProducts.jsx                # Products data fetching
│
├── pages/                           # Page components
│ ├── Home.jsx                       # Home page
│ └── ProductPage.jsx                # Product listing page
│
└── styles/                          # Global styles
└── amazonGrid.css                   # Main styles

--------------------------------------------------------------------------------------------------

🚀 Features

Add / Remove Items — fully dynamic cart updates

Quantity Management — increase or decrease product count inline

Real-time Price Calculation — automatic total and subtotal updates

Responsive Layout — adaptive design for all screen sizes

Checkout Summary — sticky order overview with totals

PropTypes Validation — strict prop-type checking for safer code

Clean CSS Architecture — modular SCSS-like structure for scalability
---------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🧩 Tech Stack

**Frontend**
- React (with Hooks)

**Styling**
- Plain CSS (modular, BEM-like convention)

**Type Safety**
- PropTypes

**Build Tool**
- Vite / Create React App

**Icons**
-React icons

**Fonts**
- Inter, system-ui fallback
- -----------------------------------------------------------------------------------------

---------------------------------------------------------------------------------------------------------------------------------------------------------------

