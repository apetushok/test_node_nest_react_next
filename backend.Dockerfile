# Use the official Node.js image as base
FROM node:21

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY backend/. .

# Expose port 5000
EXPOSE 5000

# Start the Node.js application
CMD [ "npm", "run", "start:dev" ]
