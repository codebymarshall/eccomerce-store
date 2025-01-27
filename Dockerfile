FROM mcr.microsoft.com/devcontainers/javascript-node:18

WORKDIR /workspace

# Switch to root for initial setup
USER root

# Copy package files
COPY package*.json ./

# Install dependencies as root
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Create .next directory and set permissions
RUN mkdir -p .next && chown -R node:node .next

# Switch back to node user
USER node

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"] 