## 本地 html 服务器
http-server -p 8001

## 本地 server 服务器
localhost:3000

## 通过 nginx 反向代理完成本地前后端联调

## nginx 配置
#user  nobody;
user volibear owner;
worker_processes  2;
events {
    worker_connections  1024;
}
http {

    server {
        listen       8080;
        server_name  localhost;

        location / {
            proxy_pass http://localhost:8001;
        }

        location /api/ {
            proxy_pass http://localhost:3000;
            proxy_set_header Host $host;
        }
    }

    include servers/*;
    include /Users/volibear/upload/upload.conf;
}