/**
 * CrocLab subdomain router for app landing pages + app-ads.txt.
 *
 * Routes:
 * - https://focuscroc.croclab.dev/* -> https://croclab.dev/focuscroc/*
 * - https://dreamtone.croclab.dev/* -> https://croclab.dev/dreamtone/*
 * - https://{app}.croclab.dev/app-ads.txt -> plain text app-ads response
 */

const APP_MAP = {
  "focuscroc.croclab.dev": {
    pathPrefix: "/focuscroc",
    appAdsLine: "google.com, pub-1881159980871370, DIRECT, f08c47fec0942fa0",
  },
  "dreamtone.croclab.dev": {
    pathPrefix: "/dreamtone",
    appAdsLine: "google.com, pub-1881159980871370, DIRECT, f08c47fec0942fa0",
  },
};

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const host = url.hostname.toLowerCase();

  const app = APP_MAP[host];
  if (!app) {
    return new Response("Not found", { status: 404 });
  }

  if (url.pathname === "/app-ads.txt") {
    return new Response(app.appAdsLine + "\n", {
      status: 200,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "public, max-age=300",
      },
    });
  }

  const isStaticAsset =
    url.pathname.startsWith("/_astro/") ||
    url.pathname.startsWith("/images/") ||
    url.pathname.startsWith("/assets/") ||
    url.pathname === "/favicon.png" ||
    url.pathname === "/og-image.png" ||
    url.pathname === "/robots.txt" ||
    url.pathname === "/sitemap-index.xml";

  // Keep static assets at root paths.
  // Routing strategy for subdomains:
  // - "/" => app landing page (/focuscroc/ or /dreamtone/)
  // - other paths => main site same path (so nav/footer links work normally)
  let proxiedPath;
  if (isStaticAsset) {
    proxiedPath = url.pathname;
  } else if (url.pathname === "/") {
    proxiedPath = app.pathPrefix + "/";
  } else {
    proxiedPath = url.pathname;
  }

  const target = "https://croclab.dev" + proxiedPath + url.search;

  return fetch(target, {
    method: request.method,
    headers: request.headers,
  });
}
