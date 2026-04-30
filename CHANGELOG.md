# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog
and this project adheres to Semantic Versioning.

---

## [Unreleased]

### Added

- Initial project scaffolding
- CLI commands: `safe-install <package>`, `safe-install -i <package>`, `safe-install -f <package>`
- Metadata-based risk analysis (scripts, age, maintainers)
- Version-specific package scanning support
- In-memory + file caching with TTL
- Optional `.safeinstallrc` configuration support
- Multi-package scanning: `safe-install <package1> <package2>...`
- JSON support for cli usage: `safe-install <package> --json`
- Added exit code support for cli

### Fixed

- Correct handling of versioned packages (e.g. `lodash@4.17.21`)
- Cache TTL enforcement on read

---
