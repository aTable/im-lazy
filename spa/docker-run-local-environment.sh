# for some reason vscode launch.json and docker isnt playing nice so this file is how you start the local debug server and environment
docker run --rm \
  -v $PWD/src:/frontend/src \
  -v $PWD/public:/frontend/public \
  -v $PWD/.env:/frontend/.env \
  -v $PWD/.env.development:/frontend/.env.development \
  -v $PWD/.env.production:/frontend/.env.production \
  -v $PWD/.eslintcache:/frontend/.eslintcache \
  -v $PWD/.eslintrc:/frontend/.eslintrc \
  -v $PWD/.nvmrc:/frontend/.nvmrc \
  -v $PWD/.prettierignore:/frontend/.prettierignore \
  -v $PWD/.prettierrc.json:/frontend/.prettierrc.json \
  -v $PWD/codegen.yml:/frontend/codegen.yml \
  -v $PWD/graphql.schema.json:/frontend/graphql.schema.json \
  -v $PWD/tsconfig.json:/frontend/tsconfig.json \
  -v $PWD/typedoc.json:/frontend/typedoc.json \
  --network=host \
  -e REACT_APP_SERVER_URI=http://localhost:9080 \
  yournamespacewebclient:latest