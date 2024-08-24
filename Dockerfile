# Stage 1: Build the Go backend
FROM golang:1.20 as builder

# Set the working directory
WORKDIR /app

# Copy Go Modules and download dependencies
COPY ./backend/go.mod ./backend/go.sum ./
RUN go mod download

# Copy the rest of the backend code
COPY ./backend/ .

# Build the Go application
RUN go build -o main .

# Stage 2: Build the Docusaurus frontend
FROM node:18 as frontend-builder

# Set the working directory
WORKDIR /frontend

# Copy the Docusaurus project
COPY ./frontend/ .

# Install dependencies and build the frontend
RUN npm install
RUN npm run build

# Stage 3: Final stage to serve both frontend and backend
FROM alpine:latest

# Install a web server (Nginx) to serve static files and other dependencies
RUN apk --no-cache add ca-certificates && apk --no-cache add nginx

# Set the working directory
WORKDIR /root/

# Copy the built Go binary and Swagger docs
COPY --from=builder /app/main /usr/local/bin/
COPY --from=frontend-builder /frontend/build /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose the ports for frontend (80) and backend (8081)
EXPOSE 80 8081

# Start the Go backend and Nginx together
CMD /usr/local/bin/main & nginx -g 'daemon off;'
