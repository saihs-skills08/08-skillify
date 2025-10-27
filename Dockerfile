# Stage 1: Build dependencies and Next.js application
FROM node:18-alpine AS builder

# Install pnpm using corepack (if not already enabled)
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy pnpm-lock.yaml and package.json for dependency installation
COPY pnpm-lock.yaml ./
COPY package.json ./

# Install dependencies, including devDependencies for building
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application for production (standalone output)
RUN pnpm run build

# Stage 2: Create the final production image
FROM node:18-alpine AS runner

WORKDIR /app

# Set environment variables for Next.js standalone mode
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy only the necessary files from the builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js application
CMD ["node", "server.js"]
