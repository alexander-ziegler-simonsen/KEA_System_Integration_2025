# header

# required
to run docker images - https://www.docker.com/
code editor - https://code.visualstudio.com/
to connect to our mongoDB docker image - https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode

docker image - https://hub.docker.com/_/mongo/ 

# docker image settings

$ docker run --name mongo_04b -d mongo:tag

docker run --name mongo_04b -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password -e mongo:lastest