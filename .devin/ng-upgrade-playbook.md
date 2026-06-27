# Angular Upgrade Playbook (stub)

Branch convention: `upgrade/ng-<version>` (e.g. `upgrade/ng-15`, `upgrade/ng-19`).

## Hop sequence

1. Verify Node/TS meet floor for target version
2. Run `ng update @angular/core@<N> @angular/cli@<N>`
3. Run `ng update @angular/material@<N>` (MDC migration at v15)
4. Run `ng update @ngrx/store@<N>`
5. Run full test suite (unit → e2e → visual regression)
6. Address Bucket C judgment cells per Decision Guide

## Specimens in this repo (Trade Operations Console)

| ID | Location | Expected handling |
|----|----------|-------------------|
| A1–A3 | package.json, .nvmrc | Auto version/env bumps |
| A2 | TestBed.get, relativeLinkResolution, toPromise, APP_INITIALIZER | ng update schematics |
| B | Entire src/app | Defer modernization |
| C1 | order-detail flex-layout | Codemod → CSS grid/flex + visual regression |
| C2 | order-detail Material + SASS | MDC bridge + visual regression |
| C3 | notifications/ timing logic | Characterization test first |
| C4 | packages/legacy-trend-widget | Async decision memo at peer-dep block |

## Fleet

See [README.md](../README.md) — parallel with `angular-upgrade` (Client Servicing Console).
