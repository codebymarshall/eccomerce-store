FROM node:20-slim

WORKDIR /workspace

# Install basic development tools
RUN apt-get update && apt-get install -y \
    git \
    procps \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Create .next directory
RUN mkdir -p .next

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"] 