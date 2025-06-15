#!/bin/bash
set -e

echo "Building pyfinalo multi-stage Docker image..."
docker build -f docker/Dockerfile.multistage -t pyfinalo:multistage .
echo "Multi-stage build complete! Run with: docker run -it pyfinalo:multistage"