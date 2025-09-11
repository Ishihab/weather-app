FROM nginx:latest
COPY index.html style.css script.js /usr/share/nginx/html/
