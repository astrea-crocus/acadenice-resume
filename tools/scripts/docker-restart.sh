#!/bin/bash
set -e

pause() {
  local timeout=${1:-1}
  local prompt=${2:-"Press Enter to continue (timeout ${timeout} seconds)..."}
  read -t "$timeout" -p "$prompt" || true
  echo
}

# Detect compose file
COMPOSE_FILE=""
if [ -f "docker-compose.yml" ]; then
  COMPOSE_FILE="docker-compose.yml"
elif [ -f "compose.yml" ]; then
  COMPOSE_FILE="compose.yml"
else
  echo "❌ No docker-compose.yml or compose.yml found! Aborting."
  exit 1
fi
echo "ℹ️ Using compose file: $COMPOSE_FILE"

# Detect app image from compose file
APP_IMAGE=$(awk '/app:/ {found=1} found && /image:/ {print $2; exit}' "$COMPOSE_FILE")
if [ -z "$APP_IMAGE" ]; then
  echo "❌ Could not detect the 'app' image from $COMPOSE_FILE"
  exit 1
fi
echo "ℹ️ Detected app image: $APP_IMAGE"

echo "----------------------------------------------------------------------------------------------------"
echo "Checking if services are running..."
if docker compose -f "$COMPOSE_FILE" ps -q | grep -q .; then
  echo "Services are running, stopping them..."
  docker compose -f "$COMPOSE_FILE" down
  echo "✅ Services stopped."
else
  echo "✅ No running services found."
fi

echo "----------------------------------------------------------------------------------------------------"
pause 1

echo "Checking NX_CLOUD_ACCESS_TOKEN..."
if [ ! -f .env ]; then
  echo "❌ .env file not found! Aborting."
  exit 1
fi

NX_TOKEN=$(grep '^NX_CLOUD_ACCESS_TOKEN=' .env | cut -d '=' -f2- | tr -d ' ')
if [ -z "$NX_TOKEN" ]; then
  echo "⚠️ NX_CLOUD_ACCESS_TOKEN is not set. Build will continue without it."
  pause 0 "Press Enter to continue..."
  docker buildx build \
    --progress=tty \
    --load \
    -t "$APP_IMAGE" \
    -f ./Dockerfile ./
else
  export NX_CLOUD_ACCESS_TOKEN="$NX_TOKEN"
  echo "✅ NX_CLOUD_ACCESS_TOKEN is set. Building app image with buildx and secret..."
  docker buildx build \
    --secret id=nx_token,env=NX_CLOUD_ACCESS_TOKEN \
    --progress=tty \
    --load \
    -t "$APP_IMAGE" \
    -f ./Dockerfile ./
fi

echo "✅ Build finished."
echo "----------------------------------------------------------------------------------------------------"
pause 1

echo "Starting services..."
docker compose -f "$COMPOSE_FILE" up -d --force-recreate
echo "✅ Services started."
