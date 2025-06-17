# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port your app runs on (e.g., 8080)
EXPOSE 8080

# Start the app
CMD ["npm", "start"]