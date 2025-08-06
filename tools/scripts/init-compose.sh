#!/usr/bin/env bash

set -e

EXAMPLE_PATH="tools/compose/simple.example.yml"
TARGET_PATH="tools/compose/simple.yml"
LINK_PATH="compose.yml"

# Check that the example file exists
if [ ! -f "$EXAMPLE_PATH" ]; then
  echo "❌ Example file not found: $EXAMPLE_PATH"
  exit 1
fi

# Check that target files do not already exist
if [ -e "$TARGET_PATH" ]; then
  echo "❌ The file $TARGET_PATH already exists. Please delete it manually."
  exit 1
fi

if [ -e "$LINK_PATH" ]; then
  echo "❌ The link or file $LINK_PATH already exists. Please delete it manually."
  exit 1
fi

# Copy the example file
cp "$EXAMPLE_PATH" "$TARGET_PATH"
echo "✅ Copied: $EXAMPLE_PATH → $TARGET_PATH"

# Create the symbolic link
ln -s "$TARGET_PATH" "$LINK_PATH"
echo "✅ Symbolic link created: $LINK_PATH → $TARGET_PATH"
