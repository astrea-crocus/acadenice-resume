#!/bin/bash
set -e

pause() {
  local timeout=${1:-3}
  local prompt=${2:-"Press Enter to continue (timeout ${timeout} seconds)..."}
  read -t "$timeout" -p "$prompt" || true
  echo
}

echo "----------------------------------------------------------------------------------------------------"

echo "Checking if services are running..."
if docker compose ps -q | grep -q .; then
  echo "Services are running, stopping them..."
  docker compose down
  echo "✅ Services stopped."
else
  echo "✅ No running services found."
fi

echo "----------------------------------------------------------------------------------------------------"

pause 3

echo "Checking NX_CLOUD_ACCESS_TOKEN"

if [ ! -f .env ]; then
  echo "❌ .env file not found! Aborting."
  exit 1
fi

NX_TOKEN=""
if [ -f .env ]; then
  NX_TOKEN=$(grep '^NX_CLOUD_ACCESS_TOKEN=' .env | cut -d '=' -f2- | tr -d ' ')
fi

if [ -z "$NX_TOKEN" ]; then
  echo "⚠️ NX_CLOUD_ACCESS_TOKEN is not set. The build will continue without it."
  pause 0 "Press Enter to continue..."
  docker buildx build --progress=auto --load -f ./Dockerfile ./
else
  export NX_CLOUD_ACCESS_TOKEN="$NX_TOKEN"
  echo "✅ NX_CLOUD_ACCESS_TOKEN is set. Building app image with buildx with NX_CLOUD_ACCESS_TOKEN secret..."
  docker buildx build --secret id=nx_token,env=NX_CLOUD_ACCESS_TOKEN --progress=auto --load -f ./Dockerfile ./
fi

echo "Build finished."

echo "----------------------------------------------------------------------------------------------------"

pause 3

echo "Starting services..."
docker compose up -d
echo "Services started."
