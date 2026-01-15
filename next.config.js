const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add any other configurations you need here
}

module.exports = withSentryConfig(
  nextConfig,
  {
    silent: true,
    org: "mailkalender",
    project: "javascript-nextjs",
  },
  {
    widenClientFileUpload: true,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
  }
)