# Use the official nginx image as the base
FROM nginx:alpine

# Remove the default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy your static HTML files into the nginx container
COPY . /usr/share/nginx/html

# Expose port 80 to the host so you can access your app
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
