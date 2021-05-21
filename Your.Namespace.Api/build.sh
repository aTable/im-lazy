PROJECT_NAME=yournamespaceapi
REGISTRY_URI="localhost:5000"
CURRENT_COMMIT_HASH=$(git rev-parse HEAD)
TAG_NAME="$PROJECT_NAME:$CURRENT_COMMIT_HASH"
FULL_TAG_NAME="$REGISTRY_URI/$TAG_NAME"

docker build -t "$TAG_NAME" .
docker image tag "$TAG_NAME" "$FULL_TAG_NAME"
docker push "$FULL_TAG_NAME"
#  docker pull "$FULL_TAG_NAME"