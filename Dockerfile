# Use official Node.js LTS image
FROM node:18-slim

# Set working directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy app source code
COPY . .

# Set environment variable to production
ENV NODE_ENV=production

# Expose the port used by the app
EXPOSE 8080

# Start the app
CMD ["npm", "start"]