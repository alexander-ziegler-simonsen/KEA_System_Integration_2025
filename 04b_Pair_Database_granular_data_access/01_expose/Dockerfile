# copied from my code, which I wrote, from the group project in DLS and Full stack

# Use the official MongoDB base image
FROM mongo:latest

# Set the working directory to /docker-entrypoint-initdb.d
# MongoDB will automatically run scripts in this directory when starting the container
# we are jumping to this folder
WORKDIR /docker-entrypoint-initdb.d

# Copy the initialization script into the container
COPY init.sh /docker-entrypoint-initdb.d/
COPY .env /docker-entrypoint-initdb.d/

# Expose MongoDB's default port
EXPOSE 27017
