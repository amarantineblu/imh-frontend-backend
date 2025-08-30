#!/usr/bin/env bash
# scripts/setup.sh
# Robust setup script for IMH Frontend (Laravel + Inertia.js + React)
set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

function info() { echo -e "${YELLOW}[INFO]${NC} $1"; }
function success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
function error() { echo -e "${RED}[ERROR]${NC} $1"; }

# 1. Check prerequisites
info "Checking prerequisites..."
command -v php >/dev/null 2>&1 || { error "PHP is not installed."; exit 1; }
command -v composer >/dev/null 2>&1 || { error "Composer is not installed."; exit 1; }
command -v node >/dev/null 2>&1 || { error "Node.js is not installed."; exit 1; }
command -v npm >/dev/null 2>&1 || { error "npm is not installed."; exit 1; }
command -v sqlite3 >/dev/null 2>&1 || info "sqlite3 not found. If using SQLite, please install it."

# 2. Copy .env if not present
if [ ! -f .env ]; then
  info "Copying .env.example to .env..."
  cp .env.example .env
else
  info ".env already exists."
fi

# 3. Install PHP dependencies
info "Installing PHP dependencies..."
composer install --prefer-dist --no-interaction --optimize-autoloader

# 4. Install Node.js dependencies
info "Installing Node.js dependencies..."
npm install --legacy-peer-deps

# 5. Generate Laravel application key
if ! grep -q '^APP_KEY=\w\+' .env; then
  info "Generating Laravel application key..."
  php artisan key:generate
else
  info "APP_KEY already set."
fi

# 6. Set permissions for storage and cache
info "Setting permissions for storage and bootstrap/cache..."
chmod -R 775 storage bootstrap/cache || info "Could not set permissions. Please check manually if you have issues."

# 7. Run database migrations
info "Running database migrations..."
php artisan migrate --force

# 8. (Optional) Seed the database
if grep -q 'DB_SEED=true' .env; then
  info "Seeding the database..."
  php artisan db:seed
fi

# 9. Build frontend assets
info "Building frontend assets..."
npm run build

success "Setup complete!"
echo -e "\nTo start the application:\n  php artisan serve\n\nFor development mode (hot reload):\n  npm run dev\n"
