const publicSiteUrl = process.env.PUBLIC_SITE_URL;

function fail(message) {
  console.error(`Cloudflare deployment blocked: ${message}`);
  process.exit(1);
}

if (!publicSiteUrl) {
  fail(
    'PUBLIC_SITE_URL is required. Set it to the final HTTPS canonical origin.',
  );
}

let parsedUrl;

try {
  parsedUrl = new URL(publicSiteUrl);
} catch {
  fail('PUBLIC_SITE_URL must be an absolute URL.');
}

if (parsedUrl.protocol !== 'https:') {
  fail('PUBLIC_SITE_URL must use HTTPS.');
}

if (
  parsedUrl.hostname === 'modelforge.example' ||
  parsedUrl.hostname.endsWith('.example')
) {
  fail('PUBLIC_SITE_URL cannot use a reserved example domain.');
}

if (
  parsedUrl.pathname !== '/' ||
  parsedUrl.search !== '' ||
  parsedUrl.hash !== '' ||
  parsedUrl.username !== '' ||
  parsedUrl.password !== ''
) {
  fail(
    'PUBLIC_SITE_URL must contain only the canonical origin, without a path or credentials.',
  );
}

console.log(`Cloudflare canonical origin: ${parsedUrl.origin}`);
