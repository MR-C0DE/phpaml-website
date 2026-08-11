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
