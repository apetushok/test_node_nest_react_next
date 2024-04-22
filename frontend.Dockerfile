# Use the official Node.js image as base
FROM node:21

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY client/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY client/. .

# Expose port 3000
EXPOSE 3000

# Start the Node.js application
CMD [ "npm", "run", "dev" ]
