# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-05-26

### Added

- Dual ESM/CJS build output for the `combo-ui-vue` package.
- Configurable logger utility (replaces `console.log` in production builds).
- Accessibility attributes (`aria-*`, `role`) to Spinner, Tooltip, and Popover components.
- `prefers-reduced-motion` media queries for all CSS animations.
- 173 tests covering all CSS generators (up from 51).
- `CONTRIBUTING.md` guide for contributors.

### Changed

- Button focus color now uses `currentColor` instead of a hardcoded blue value.

### Fixed

- Memory leak in `useComboUI` composable — subscriber cleanup is now performed correctly on component unmount.
