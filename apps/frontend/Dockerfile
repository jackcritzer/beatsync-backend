# apps/frontend/Dockerfile

FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 (Next.js default for `start`)
EXPOSE 3000

# Start the app in production mode
CMD ["npm", "start"]