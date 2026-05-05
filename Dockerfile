FROM nginx:1.27-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy portal static files
COPY index.html   /usr/share/nginx/html/
COPY styles.css   /usr/share/nginx/html/
COPY icons.jsx    /usr/share/nginx/html/
COPY data.jsx     /usr/share/nginx/html/
COPY shell.jsx    /usr/share/nginx/html/
COPY page-home.jsx      /usr/share/nginx/html/
COPY page-showcase.jsx  /usr/share/nginx/html/
COPY page-hub.jsx       /usr/share/nginx/html/

# Swap in our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
