#!/bin/bash
set -e

echo "Building pyfinalo Docker image..."
docker build -f docker/Dockerfile -t pyfinalo .
echo "Build complete! Run with: docker run -it pyfinalo"