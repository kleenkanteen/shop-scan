/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

/** @type {import("next").NextConfig} */
module.exports = withPWA({
  headers: () => Promise.resolve([
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ]),
});

