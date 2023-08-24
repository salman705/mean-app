# Use an official Node.js as the base image
FROM node:latest

# Create a directory for the Angular app
RUN mkdir /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install app dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the Angular app without --prod flag
RUN ng build

# Expose the port that the app will run on (assuming it's 80)
EXPOSE 3100

# Command to run the app
CMD ["npm", "start"]
