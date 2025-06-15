FROM ocaml/opam:ubuntu-24.04-ocaml-5.1

# Install Python 3.10+ and development headers
USER root
RUN apt-get update && apt-get install -y \
    python3 \
    python3-dev \
    python3-pip \
    autoconf \
    && rm -rf /var/lib/apt/lists/*

# Switch back to opam user
USER opam
WORKDIR /home/opam

# Copy project files
COPY --chown=opam:opam . pyfinalo/
WORKDIR /home/opam/pyfinalo

# Install opam dependencies
RUN opam install . --deps-only --with-test

# Build and install pyfinalo
RUN eval $(opam env) && dune build && dune install

# Set PATH to include installed binaries
ENV PATH="/home/opam/.opam/default/bin:$PATH"

# Default command
CMD ["bash"]