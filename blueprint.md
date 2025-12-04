
# Project Blueprint

## Overview

This document outlines the design, features, and development plan for the Fresh Flour application. It serves as a single source of truth to ensure consistency and clarity throughout the development process.

## Style and Design

The application aims for a modern, clean, and visually appealing aesthetic.

*   **Color Palette:**
    *   Primary Green: `#2E8B57` (SeaGreen)
    *   Darker Green (Hover): `#256d47`
    *   Background: `#fff` (White)
    *   Borders: `#eaeaea`
*   **Typography:** The application will use a clean, modern sans-serif font. The current implementation uses the default `Inter` font from Next.js.
*   **Iconography:** Icons are used to enhance understanding and navigation (e.g., shopping cart).
*   **Component Styling:** The project uses CSS Modules for component-level styling, promoting modularity and avoiding style conflicts.

## Implemented Features

*   **Header:**
    *   A persistent header is present on all pages.
    *   **Logo:** A bold, green "Fresh Flour" logo that links to the homepage.
    *   **Navigation:** A responsive navigation menu that includes links for "Monthly subscription," "Category," "Contact," and a shopping cart icon. The navigation adapts to mobile screens using a burger menu.
*   **Homepage Hero:**
    *   A full-width hero section with a background image and a dark overlay.
    *   A prominent "The Finest Flours, Delivered Fresh" title and a subtitle.
    *   A clear call-to-action "Shop Now" button.
*   **Category Carousel:**
    *   A "Shop by Category" section with a horizontally scrolling list of flour types.
*   **Best Sellers Section:**
    *   A grid of the top-selling flour products, each with an image, name, and price.
*   **Why Choose Us Section:**
    *   A section highlighting the key benefits of the brand, such as "Quality Ingredients," "Fast Delivery," and "Best Prices," with accompanying icons.
*   **New Launch Section:**
    *   A promotional section for a new product with a call-to-action.
*   **Testimonials Section:**
    *   A section to display customer feedback with quotes, names, and images.
*   **Our Story Section:**
    *   A section to share the brand's narrative with a two-column layout for text and an image.
*   **Footer:**
    *   A footer with social media links and a copyright notice. The background is a consistent green color (`#2E8B57`).
*   **Dynamic Homepage Sections:**
    *   The homepage sections can be toggled on or off using a connected Google Sheet, allowing for content management without code changes.

## Current Plan

The previous development plan is complete. The application now includes a fully featured homepage with dynamic content capabilities. The next steps are open for new feature requests or refinements.
