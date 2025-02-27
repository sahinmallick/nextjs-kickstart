# Next.js Kickstart

This is a Next.js 15.2 starter template designed to accelerate project setup. It includes Prisma ORM, Lucia authentication (server session), and built-in support for Google and credential-based login.

## Features

- **Next.js 15.2** - The latest Next.js version for optimal performance
- **Prisma ORM** - Database management with an easy-to-use schema and migrations
- **Lucia Auth** - Secure authentication with server sessions
- **Google & Credential Login** - Pre-configured authentication strategies
- **Tailwind CSS** - Modern styling with utility-first approach
- **ESLint & Prettier** - Code quality and formatting enforced out-of-the-box
- **ShadCN UI** - Accessible UI primitives for better user experience
- **Framer Motion** - Smooth animations and interactions

## Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/aquib399/nextjs-kickstart.git
cd nextjs-kickstart
npm install --legacy-peer-deps --force
```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
DATABASE_URL="your_database_url"
DIRECT_DATABASE_URL="your_raw_database_url_without_params"
GOOGLE_CLIENT_ID="your_google_oauth_client_id"
GOOGLE_CLIENT_SECRET="your_google_oauth_client_secret"
```

## Google OAuth Setup

1. Create Google OAuth Credentials
2. Configure Google OAuth Consent Screen
3. Enable OAuth API
   - For "Authorized Domains" use:
     ```
     http://localhost:3000
     ```
   - For "Authorized redirect URIs" use:
     ```
     http://localhost:3000/api/auth/callback/google
     ```
   - Copy Client Id and Client Secret and paste it into .env

## Available Scripts

Run the development server:

```sh
npm run dev
```

Build and start the production server:

```sh
npm run build && npm run start
```

Format the codebase:

```sh
npm run format
```

Lint the codebase:

```sh
npm run lint
```

For a fresh build (Windows):

```sh
npm run freshbuild
```

For a fresh build (Linux):

```sh
npm run freshbuild:linux
```

## License

This project is licensed under the MIT License.
