This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Google Analytics (GA4) setup

This project includes a small GA4 integration that sends custom click events for the Yes/No buttons.

Steps to enable:

1. Create a GA4 property and copy the Measurement ID (looks like G-XXXXXXXXXX).
2. Set the ID in Vercel as an environment variable named `NEXT_PUBLIC_GA_ID` or locally in `.env.local`:

```env
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

3. Deploy to Vercel or run locally (`npm run dev`) — the layout injects `gtag.js` and the page sends events via `lib/gtag.js`.

Notes:

- Events are sent using `window.gtag('event', ...)`. If you want to track additional fields add calls to `lib/gtag.js`.
- For privacy-sensitive sites consider using server-side forwarding or a privacy-first provider.

## Node version

This project is configured to use Node 24. There are three ways to make your environment use Node 24:

- The `engines` field in `package.json` requests Node 24.x (Vercel respects this during builds).
- Use nvm: the repository includes an `.nvmrc` file containing `24`.
- Use any tool that reads `.node-version` (file included) to pin the runtime.

If you need to run a different Node version locally, update `.nvmrc` or the `engines` field accordingly.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
