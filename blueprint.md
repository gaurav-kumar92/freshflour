
# Project Blueprint

## Overview

This project is a modern, server-rendered e-commerce application built with Next.js and styled with a clean, professional aesthetic. Product data is managed externally in a Google Sheet and fetched at build time and on-demand using the Google Sheets API. The application is designed to be fast, scalable, and easy to maintain.

## Core Features & Design

*   **Framework:** Next.js with App Router
*   **Styling:** CSS Modules, with a focus on responsive design, modern typography, and a visually balanced layout.
*   **Data Source:** Google Sheets, accessed via the Google Sheets API.
*   **Routing:**
    *   `/`: Home page displaying a curated list of best-selling products.
    *   `/products/[sku]`: Dynamic product detail pages generated for each unique product SKU.
    *   `/cart`: A client-side rendered shopping cart page.
*   **Components:**
    *   `Header`: A responsive header containing the site logo, navigation, and a dynamic cart icon.
    *   `Navigation`: A responsive and clean navigation bar.
    *   `ProductCard`: A reusable card for displaying product summaries.
    *   `Footer`: A simple and elegant site footer.
*   **Design Philosophy:**
    *   **Colors:** A professional palette centered around a primary green (`#2E8B57`), with clean whites and soft grays for backgrounds and text.
    *   **Typography:** Clear Sans-serif fonts (e.g., system default) with strong hierarchical sizing for titles, prices, and descriptions.
    *   **Layout:** Use of CSS Flexbox and Grid for responsive and organized page structures. Emphasis on white space to create a premium feel.
    *   **Visuals:** High-quality product imagery is central to the design.

## Completed Features

### Parsing Error Resolution
- Diagnosed and resolved a critical parsing error in `lib/googlesheets.ts` that was preventing the application from compiling.
- The error was caused by an improperly formatted template literal in a `console.error` statement.
- Replaced the faulty line with a robust version using simple string concatenation, ensuring the code will parse correctly and eliminating the error.


### Gateway Timeout and Image Loading Resolution

- Diagnosed and resolved a `504 Gateway Timeout` error.
- The root cause was identified as missing Google Sheets API credentials in the environment variables.
- Created a `.env.local` file with placeholder credentials for `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, and `SPREADSHEET_ID`.
- Instructed the user to replace the placeholders with their actual credentials to re-establish the connection to the Google Sheet.
- Fixed a persistent image loading issue by modifying `next.config.js`.
- The `images.remotePatterns` configuration was updated to allow images from any hostname (`'**'`), removing previous restrictions to specific domains. This ensures all product and category images render correctly across the application.

### Shopping Cart Functionality (Implemented)

A full-featured shopping cart has been integrated into the application, providing a seamless user experience from product selection to checkout preparation.

*   **Cart State Management (`lib/CartContext.tsx`):**
    *   A React Context now holds the array of cart items, persisting the state to `localStorage` to save the cart between sessions.
    *   A `CartProvider` wraps the application, managing cart state and providing functions to `addToCart`, `removeFromCart`, `updateQuantity`, and `clearCart`.

*   **Global Integration (`app/layout.tsx`):**
    *   The root layout is wrapped with the `CartProvider`, making the cart accessible globally.

*   **Dynamic Header (`components/Header.tsx`):**
    *   The header is a client component that displays a real-time count of the total items in the cart.
    *   The cart icon links directly to the cart page.

*   **Interactive "Add to Cart" Button (`app/products/[sku]/AddToCartButton.tsx`):**
    *   A dedicated client component handles adding products to the cart from the product detail page.
    *   This button is integrated into the server-rendered product page, following Next.js best practices.

*   **Cart Details Page (`app/cart/page.tsx`):**
    *   A new, client-rendered page at `/cart` displays a detailed view of the cart's contents.
    *   Users can view product details, adjust item quantities (`+`/`-` buttons), and remove items from the cart.
    *   An order summary provides a subtotal and leads to a (currently placeholder) checkout button.

### UI and Data Corrections (Implemented)

A series of refinements and bug fixes have been applied to improve the user interface and ensure data accuracy across the application.

*   **Header and Navigation:**
    *   Resolved an issue where a duplicate shopping cart icon was displayed in the header.
    *   The main navigation menu has been repositioned to be right-aligned for a more standard and balanced layout.

*   **Image and Data Display:**
    *   Corrected the "Shop by Category" carousel to accurately display the `bread.png` image for the "Artisanal Breads" category as specified in the data source.
    *   Fixed the "Best Sellers" section to correctly display the local `flour3.jpg` image, overriding incorrect data from the external Google Sheet.
