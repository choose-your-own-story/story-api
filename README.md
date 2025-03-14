[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

# Choose your own story API
Backend for Choose your own story product.

This API provides the endpoints for two different websites:

1. The reader website: Endpoints here allow listing existing stories, and getting their content
2. The editor's backend website: Endpoints here allow the editor/creator to create stories, upload images, see 
ramification of their stories, etc.

## Development Stack
We have used TypeScript for the main development language and Postgre as the database. 

The application has been containerized using docker for local development and for now, the same image is being used in prod in a k8s orchesteor.
The readme assumes the developer has docker-compose installed as well.

## Current Production URL
We are currently hosting the application in private server. Example url:

```shell script
curl --location 'https://story-maker-api.jrojaspin.com.ar/api/library/genre' 
```

# Local Development
1. Create your own .env file
```shell script
cp .env.dist .env
```

2. Run the command 
```shell script
docker compose up api
``` 

3. Update local database

Update local config so to point to a local instance of the database (docker container)

```
docker compose up liquibase-local
```
