# E-commerce Store Demo

A modern e-commerce store built with Next.js, TypeScript, and Tailwind CSS. This project demonstrates a fully functional e-commerce platform with features like product browsing, cart management, user authentication, and secure payments.

## Features

- 🛍️ Product browsing and search
- 🛒 Shopping cart functionality
- 👤 User authentication
- 💳 Secure payments with Stripe
- 📱 Responsive design
- 🔒 Secure user data handling

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Deployment**: AWS

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ecommerce-store.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env`
   - Fill in your environment variables

4. Set up the database:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Project Structure

```
src/
  app/              # Next.js app directory
    (auth)/         # Authentication routes
    (shop)/         # Shop routes
    api/            # API routes
  components/       # Reusable components
  lib/             # Utility functions
  types/           # TypeScript types
```

## Contributing

This is a demo project, but feel free to use it as a template for your own e-commerce store.

## License

MIT License
