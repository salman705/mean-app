# Use an official Node.js as the base image
FROM node:latest

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Expose the port that the app runs on (assuming it's 3000)
EXPOSE 3000

# Command to run the app
CMD ["node", "server.js"]
