# Use an official Node.js runtime as a base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run" ,"start:dev"]

# Redis
# docker pull redis:7-alpine
# docker run -d --name redis-c --network local -v redis-v:/data -p 6379:6379 redis:7-alpine --requirepass root
# docker run -d --name redis-c --network local -v redis-v:/data -p 6379:6379 redis:7-alpine --requirepass root

# docker build -t demo -f .\Dockerfile .
# docker run --name demo-c --network local -v D:\docker\test\src:/app/src -p 3000:3000 -e REDIS_HOST=redis-c -e REDIS_PORT=6379 -e REDIS_PASSWORD=root demo:latest