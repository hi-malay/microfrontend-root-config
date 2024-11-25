# Use a base Node.js image
FROM node:18

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the project
RUN yarn build

# Expose the port the app runs on
EXPOSE 9000

# Command to run the app
CMD ["yarn", "start"]
