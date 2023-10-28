[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

# Choose your own story API
Backend for Choose your own story website.

This API provides the endpoints for two different websites:

1. The reader website: Endpoints here allow listing existing stories, and getting their content
2. The editor's backend website: Endpoints here allow the editor/creator to create stories, upload images, see 
ramification of their stories, etc.

## Development Stack
We have used TypeScript for the main language and Postgre as the database. We run the production server in a K8S server.

The application has been containerized using docker for local development and for now, the same image is being used in prod.

## Current Production URL
```shell script
curl --location 'https://story-maker-api.jrojaspin.com.ar/api/library/genre' \
--header 'User-Id: 1' \
--header 'App-Id: 1' \
--header 'Content-Type: application/json'
```

# Development
1. Create a `.env` file from the template `.env.dist`
2. Run the command 
```shell script
docker-compose up api
``` 

#### Updating the image in the docker repository
While standing in the root directory
```shell script
docker build -t jotaram/story-maker-api:<x.y.z> .
docker image push jotaram/story-maker-api:<x.y.z>
```
