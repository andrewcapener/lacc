#!/bin/bash
set -euo pipefail

# Claude Code on the web: install dependencies at session start so builds,
# linters, and tests work immediately. Synchronous so nothing races ahead of a
# half-installed node_modules. npm install (not ci) to reuse the cached container.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

npm install
