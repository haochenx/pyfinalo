#!/bin/bash

# Check for running and stopped pyfinalo containers
RUNNING_CONTAINERS=""
STOPPED_CONTAINERS=""

# Check for running containers
if docker ps --format "{{.Names}}" 2>/dev/null | grep -q "^pyfinalo-dev$"; then
    RUNNING_CONTAINERS="$RUNNING_CONTAINERS pyfinalo-dev"
fi
if docker ps --format "{{.Names}}" 2>/dev/null | grep -q "^pyfinalo$"; then
    RUNNING_CONTAINERS="$RUNNING_CONTAINERS pyfinalo"
fi

# Check for stopped but not removed containers
if docker ps -a --format "{{.Names}}" 2>/dev/null | grep -q "^pyfinalo-dev$" && \
   ! docker ps --format "{{.Names}}" 2>/dev/null | grep -q "^pyfinalo-dev$"; then
    STOPPED_CONTAINERS="$STOPPED_CONTAINERS pyfinalo-dev"
fi
if docker ps -a --format "{{.Names}}" 2>/dev/null | grep -q "^pyfinalo$" && \
   ! docker ps --format "{{.Names}}" 2>/dev/null | grep -q "^pyfinalo$"; then
    STOPPED_CONTAINERS="$STOPPED_CONTAINERS pyfinalo"
fi

# Report findings
if [ -n "$RUNNING_CONTAINERS" ]; then
    echo "⚠️  Warning: Pyfinalo container(s) still running:"
    for container in $RUNNING_CONTAINERS; do
        echo "  - $container"
    done
    echo ""
    echo "To stop and remove the container(s), run:"
    for container in $RUNNING_CONTAINERS; do
        echo "  docker stop $container && docker rm $container"
    done
    echo ""
    exit 1
fi

if [ -n "$STOPPED_CONTAINERS" ]; then
    echo "⚠️  Warning: Pyfinalo container(s) exist but are stopped:"
    for container in $STOPPED_CONTAINERS; do
        echo "  - $container"
    done
    echo ""
    echo "To remove the container(s), run:"
    for container in $STOPPED_CONTAINERS; do
        echo "  docker rm $container"
    done
    echo ""
    exit 1
fi

exit 0