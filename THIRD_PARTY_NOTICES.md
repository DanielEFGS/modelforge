# Third-party notices

ModelForge's JavaScript dependency graph was reviewed on 2026-08-27. Direct runtime dependencies use MIT or ISC licenses. The lockfile also contains transitive and build-time packages under Apache-2.0, BSD, ISC, MIT, MPL-2.0, CC0-1.0, CC-BY-4.0, BlueOak-1.0.0, Python-2.0, and a Sharp platform package declared as Apache-2.0 AND LGPL-3.0-or-later.

Notable non-MIT-family transitive components:

- Lightning CSS — MPL-2.0: https://github.com/parcel-bundler/lightningcss
- Sharp platform binaries/libvips — Apache-2.0 AND LGPL-3.0-or-later: https://sharp.pixelplumbing.com
- caniuse-lite data — CC-BY-4.0: https://github.com/browserslist/caniuse-lite
- MDN data — CC0-1.0: https://github.com/mdn/data
- argparse — Python-2.0: https://github.com/nodeca/argparse
- BlueOak-licensed transitive utilities: https://blueoakcouncil.org/license/1.0.0

This summary is not a replacement for the license files shipped in installed packages. Regenerate the inventory with `pnpm licenses list --prod` whenever dependencies change.
