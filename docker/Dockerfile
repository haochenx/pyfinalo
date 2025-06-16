# Build stage
FROM ocaml/opam:ubuntu-24.04-ocaml-5.1 AS builder

# Install build dependencies
USER root
RUN apt-get update && apt-get install -y \
    python3 \
    python3-dev \
    autoconf \
    && rm -rf /var/lib/apt/lists/*

# Switch back to opam user
USER opam
WORKDIR /home/opam

# Copy project files
COPY --chown=opam:opam . pyfinalo/
WORKDIR /home/opam/pyfinalo

# Install opam dependencies and build
RUN opam install . --deps-only --with-test
RUN eval $(opam env) && dune build && dune install --prefix=/home/opam/install

# Runtime stage
FROM ubuntu:24.04

# Install Python runtime and libraries needed by pyml
RUN apt-get update && apt-get install -y \
    python3 \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd -m pyfinalo
USER pyfinalo
WORKDIR /home/pyfinalo

# Copy only the built executable from builder stage
COPY --from=builder /home/opam/install/bin/pyfinalo_py /usr/local/bin/pyfinalo_py

# Set PATH
ENV PATH="/usr/local/bin:$PATH"

# Default command
CMD ["pyfinalo_py"]
