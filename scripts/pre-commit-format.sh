#!/usr/bin/env bash
set -e

# Collect only the files we care about with TS or JSON extensions.
changed_files=()
for file in "$@"; do
  if [[ -f "$file" && ("$file" == *.ts || "$file" == *.tsx || "$file" == *.json) ]]; then
    changed_files+=("$file")
  fi
done

if [ ${#changed_files[@]} -eq 0 ]; then
  echo "No changed files to format."
  exit 0
fi

echo "Formatting files: ${changed_files[*]}"

npm run format:file -- "${changed_files[@]}" && git add "${changed_files[@]}"
