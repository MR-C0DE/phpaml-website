# PHPAML official website

This repository is the single source for the official bilingual PHPAML website. It contains the English-first pages, French routes, documentation, release metadata, download verification, and the official brand assets.

## Quality checks

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run release:check
```

Release metadata is centralized in `app/release.ts`. Update it only after the matching GitHub release and all installer/checksum assets exist.

The project is currently pre-stable. The generated output and hosting caches are ignored and must not be committed.

## News administration storage

The news editor uses exactly one storage backend for the lifetime of a server
process. Set `NEWS_STORAGE_DRIVER` explicitly in every deployed environment:

```dotenv
# Cloudflare production
NEWS_STORAGE_DRIVER=d1
NEWS_ADMIN_ORIGIN=https://phpaml.com

# Or MongoDB
# NEWS_STORAGE_DRIVER=mongodb
# NEWS_MONGODB_URI=mongodb+srv://...
# NEWS_MONGODB_DATABASE=phpaml_news

# Or a persistent filesystem on one host
# NEWS_STORAGE_DRIVER=file
# NEWS_STORAGE_FILE=/absolute/persistent/path/news-posts.json
```

The application never switches to another backend after a storage error. An
unavailable selected backend returns HTTP `503`, preventing writes from being
split across D1, MongoDB and a local file. File storage uses an atomic lock file
and atomic replacement, so multiple Node processes on the same persistent
filesystem can write safely. It is not intended for independent hosts that do
not share a filesystem.

Administrative mutations require an authenticated session and an exact
`Origin` match against `NEWS_ADMIN_ORIGIN`. Custom request headers are not
accepted as proof of origin.

## Governance and license

Read [CONTRIBUTING.md](CONTRIBUTING.md), the [Code of Conduct](CODE_OF_CONDUCT.md), and the [security policy](SECURITY.md) before participating. The website source is open-source software licensed under the [MIT License](LICENSE).
