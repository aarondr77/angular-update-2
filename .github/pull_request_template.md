## Summary

<!-- Describe the upgrade hop and scope of changes -->

## Decision Guide checklist

- [ ] Reviewed [/.devin/bofa-angular-migration-decisions.md](.devin/bofa-angular-migration-decisions.md)
- [ ] Bucket A changes applied via `ng update` schematics where applicable
- [ ] Bucket B modernization deferred (no standalone / `@if` / `provideHttpClient()` unless explicitly scoped)
- [ ] Bucket C judgment cells documented with test or visual-regression evidence
- [ ] a11y checks green (jest-axe / Cypress-axe)
- [ ] CI pipeline green

## Test plan

- [ ] `npm ci --legacy-peer-deps`
- [ ] `npm run lint`
- [ ] `npm test`
- [ ] `npm run build:prod`
- [ ] `npm run e2e`

## Known debt / escalations

<!-- C4 decision memos, MDC bridge notes, flex-layout replacement, etc. -->
