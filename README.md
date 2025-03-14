# Next.js E-Commerce Store

A modern, full-featured e-commerce store built with Next.js, TypeScript, Tailwind CSS, and PostgreSQL.

## Features

- **User Authentication**: Sign up, login, and profile management using NextAuth.js
- **Product Listings**: Browse products with dynamic filtering and search
- **Product Details**: View detailed product information, images, and reviews
- **Shopping Cart**: Add/remove items with a persistent cart
- **Checkout Process**: Secure checkout with Stripe integration
- **User Dashboard**: Order history and account management
- **Admin Panel**: Manage products, orders, and users
- **Responsive Design**: Optimized for mobile and desktop
- **SEO Friendly**: Server-side rendering for better search engine visibility

## Tech Stack

- **Frontend**:
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - React Hook Form
  - Zustand (State Management)

- **Backend**:
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL Database

- **Authentication**:
  - NextAuth.js

- **Payments**:
  - Stripe

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ecommerce-store.git
   cd ecommerce-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local` and fill in your values

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ecommerce-store/
├── prisma/                  # Database schema and migrations
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── api/             # API routes
│   │   ├── (routes)/        # App routes
│   │   └── page.tsx         # Default page
│   ├── components/          # React components
│   │   ├── ui/              # UI components
│   │   ├── product/         # Product-related components
│   │   ├── cart/            # Cart-related components
│   │   ├── checkout/        # Checkout-related components
│   │   └── auth/            # Authentication components
│   ├── lib/                 # Utility functions and services
│   ├── hooks/               # Custom React hooks
│   ├── providers/           # Context providers
│   ├── store/               # State management (Zustand)
│   └── types/               # TypeScript type definitions
└── ...                      # Configuration files
```

## Deployment

The application can be deployed to any platform that supports Next.js applications, such as:

- Vercel
- AWS (EC2, Lambda, ECS)
- Netlify
- Docker

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [your-email@example.com](mailto:your-email@example.com)

Project Link: [https://github.com/yourusername/ecommerce-store](https://github.com/yourusername/ecommerce-store)
