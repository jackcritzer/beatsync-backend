# Use official Node.js image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package files first (for better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy remaining application files
COPY . .

# Generate Prisma client binaries
RUN npx prisma generate

# Build the TypeScript code
RUN npm run build

# Expose port 3000 (or the port your backend runs on)
EXPOSE 3000

# Command to start the backend
CMD ["npm", "start"]