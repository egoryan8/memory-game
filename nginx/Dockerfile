FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/.ssl/ /etc/nginx/ssl/

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"];
