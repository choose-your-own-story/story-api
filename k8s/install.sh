sed -e "s/\$API_SECRET/$API_SECRET/g" $GITHUB_WORKSPACE/k8s/k8s.yml | \
sed -e "s/\$DOCKER_IMAGE_VERSION/$(echo "$DOCKER_IMAGE_VERSION" | sed 's/\//\\\//g')/g" | \
sed -e "s/\$PUBLIC_PATH/$PUBLIC_PATH/g" | \
sed -e "s/\$POSTGRES_USER/$POSTGRES_USER/g" | \
sed -e "s/\$POSTGRES_PASSWORD/$POSTGRES_PASSWORD/g" | \
sed -e "s/\$POSTGRES_DB/$POSTGRES_DB/g" | \
sed -e "s/\$POSTGRES_HOST/$POSTGRES_HOST/g" | \
sed -e "s/\$POSTGRES_PORT/$POSTGRES_PORT/g" | \
sed -e "s/\$DO_SPACES_ENDPOINT/$DO_SPACES_ENDPOINT/g" | \
sed -e "s/\$DO_SPACES_KEY/$DO_SPACES_KEY/g" | \
sed -e "s/\$DO_SPACES_SECRET/$DO_SPACES_SECRET/g" | \
sed -e "s/\$DO_SPACES_NAME/$DO_SPACES_NAME/g" | kubectl apply -f -
