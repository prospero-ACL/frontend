#!/usr/bin/env bash
set -e

# Collect only the files we care about with TS extensions.
changed_files=()
for file in "$@"; do
  if [[ -f "$file" && ("$file" == *.ts || "$file" == *.tsx) ]]; then
    changed_files+=("$file")
  fi
done

if [ ${#changed_files[@]} -eq 0 ]; then
  echo "No changed files to lint."
  exit 0
fi

echo "Linting files: ${changed_files[*]}"

# Now run ESLint (or use npm run lint -- if that accepts file args).
npm run lint:file -- "${changed_files[@]}"
