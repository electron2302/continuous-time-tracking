FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*
COPY ctt-frontend/dist/* /usr/share/nginx/html/

EXPOSE 4200 80