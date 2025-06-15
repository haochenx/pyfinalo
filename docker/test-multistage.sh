#!/bin/bash
set -e

echo "Testing pyfinalo multi-stage image..."

echo "1. Testing help/version:"
docker run --rm pyfinalo:multistage pyfinalo_py --help || echo "Help test completed"

echo "2. Testing basic Python script:"
echo 'import pyfinalo as p; print(p.show(p.add(p.len(p.str("hello")), p.int(3))))' | docker run -i --rm pyfinalo:multistage pyfinalo_py -

echo "3. Testing interactive mode (non-interactive):"
echo -e 'import pyfinalo as p\nprint(p.show(p.int(42)))\nexit()' | docker run -i --rm pyfinalo:multistage pyfinalo_py

echo "4. Checking image size:"
docker images pyfinalo:multistage

echo "Multi-stage image test complete!"