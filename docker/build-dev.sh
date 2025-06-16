#!/bin/bash
set -e

echo "Building pyfinalo development Docker image..."
docker build -f docker/Dockerfile.dev -t pyfinalo-dev .
echo "Dev build complete! Run with: docker run -it pyfinalo-dev"
echo "Image size: $(docker images pyfinalo-dev:latest --format "{{.Size}}")"
