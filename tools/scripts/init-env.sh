#!/usr/bin/env bash

set -e

EXAMPLE_FILE=".env.example"
ENV_FILE=".env"

# Check that .env.example exists
if [ ! -f "$EXAMPLE_FILE" ]; then
  echo "❌ File $EXAMPLE_FILE not found."
  exit 1
fi

# Check that .env does NOT exist
if [ -f "$ENV_FILE" ]; then
  echo "❌ The file $ENV_FILE already exists. Please delete it manually if you want to regenerate it."
  exit 1
fi

# Copy the file
cp "$EXAMPLE_FILE" "$ENV_FILE"
echo "✅ .env file generated from $EXAMPLE_FILE"

# Function to replace placeholders with generated secrets
generate_secret() {
  local key="$1"
  local length="$2"
  local format="$3" # hex or base64

  if [ "$format" = "hex" ]; then
    secret=$(openssl rand -hex "$length")
  else
    # base64, default
    secret=$(openssl rand -base64 "$length")
  fi

  # Escape slashes for sed replacement if any
  secret_escaped=$(printf '%s\n' "$secret" | sed -e 's/[\/&]/\\&/g')

  # Replace in .env, preserving the comment
  sed -i "s/^\($key=\)[^ #]*/\1$secret_escaped/" "$ENV_FILE"
}

# Generate tokens based on your example keys and formats
generate_secret "ACCESS_TOKEN_SECRET" 48 "base64"
generate_secret "REFRESH_TOKEN_SECRET" 48 "base64"
generate_secret "CHROME_TOKEN" 32 "hex"

echo "🔐 Secrets generated and updated in $ENV_FILE"