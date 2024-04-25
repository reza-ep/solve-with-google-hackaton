FROM nginx

# Copy HTML files
COPY html /usr/share/nginx/html

# Copy Nginx configuration file
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Serve static files from node_modules directory
COPY node_modules /usr/share/nginx/html/node_modules
