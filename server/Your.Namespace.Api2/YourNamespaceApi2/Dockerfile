FROM rustlang/rust:nightly-slim AS base

WORKDIR /app
EXPOSE 8000

FROM rustlang/rust:nightly-slim AS build
WORKDIR /src
COPY ["Cargo.toml", "./"]
COPY . .
RUN cargo build --verbose
WORKDIR "/src/."

ENTRYPOINT ["cargo", "run"]
