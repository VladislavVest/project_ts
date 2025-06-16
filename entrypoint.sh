#!/bin/bash

set -e

mkdir -p /workspace/original-repo
mkdir -p /workspace/migrated-repo

# Клонируем только один нужный репозиторий, если он не склонирован
if [ ! -d /workspace/original-repo/grunt ]; then
  echo "Клонирую grunt..."
  git clone https://github.com/gruntjs/grunt.git /workspace/original-repo/grunt
fi

# Открываем bash
exec bash
