
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

*   **Header:** A persistent header with logo, navigation, and cart icon.
*   **Homepage Sections:** Includes Hero, Category Carousel, Best Sellers, Why Choose Us, New Launch, Testimonials, and Our Story sections.
*   **Footer:** A consistent footer with social media links and copyright.
*   **Dynamic Product Pages:** A dynamic routing system (`/products/[slug]`) to display individual product details.
*   **Dynamic Homepage Content (via Google Sheets):**
    *   **Section Visibility:** Homepage sections can be toggled on or off from a Google Sheet.
    *   **"Our Story" Content:** The text for the "Our Story" section is fetched dynamically.
    *   **Testimonials Content:** The testimonials (quote and name) are fetched dynamically from a Google Sheet. The design is text-only.

## Current Plan

This plan details the correction of a bug in the "Testimonials" section.

*   **Bug Fix:** Corrected an error in the `components/Testimonials.tsx` file that was causing extra backslash characters to appear around the testimonial quotes.
*   **Update Blueprint:** The `blueprint.md` file has been updated to reflect this correction.
