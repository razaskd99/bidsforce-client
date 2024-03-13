# Use the official Node.js image as the base image
FROM node:20.10.0

# Set the working directory to /app/client
WORKDIR /app/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000 (Note: This is optional and might not be necessary depending on your use case)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
