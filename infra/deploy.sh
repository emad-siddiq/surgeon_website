#!/usr/bin/env bash
#
# Build and deploy the site to Cloudflare Pages.
#
#   ./infra/deploy.sh            # build + deploy to production (main branch)
#
# One-time prerequisite: `npx wrangler login` with the Cloudflare account
# that owns ghulamsiddiq.com (emadsiddiq98@gmail.com).
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

SITE_URL="https://ghulamsiddiq.com"
PROJECT="ghulamsiddiq"
# Pin the account so wrangler never falls back to a cached/other account
# (this login has access to more than one).
export CLOUDFLARE_ACCOUNT_ID="accc8f7c0b6b0f109962eddd3ff093b7"

if ! npx wrangler whoami >/dev/null 2>&1; then
  echo "error: wrangler is not authenticated. Run: npx wrangler login" >&2
  exit 1
fi

echo "==> Building (SITE_URL=$SITE_URL)"
SITE_URL="$SITE_URL" npm run build

# Cloudflare Pages hard-rejects any single file over 25 MiB. Catch it here
# rather than half-way through an upload (the videos are the usual suspects).
oversized="$(find dist -type f -size +25M || true)"
if [ -n "$oversized" ]; then
  echo "error: files exceed the 25 MiB Pages limit — compress before deploying:" >&2
  echo "$oversized" >&2
  exit 1
fi

echo "==> Deploying dist/ to Pages project '$PROJECT'"
npx wrangler pages deploy dist \
  --project-name "$PROJECT" \
  --branch main \
  --commit-dirty=true

echo "==> Done: https://ghulamsiddiq.com (also ghulamsiddiq.pages.dev)"
