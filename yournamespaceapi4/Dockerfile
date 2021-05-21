FROM rustlang/rust:nightly-buster-slim AS base

WORKDIR /app
EXPOSE 8000

FROM rustlang/rust:nightly-buster-slim AS build
WORKDIR /build
RUN rustup update
COPY ["Cargo.toml", "./"]
COPY ["Rocket.toml", "./"]
COPY ./src ./src
RUN cargo build --verbose
WORKDIR "/build/."

ENTRYPOINT ["cargo", "run"]
