node -v
cnpm i
npm run remote-serve-pro
sudo ls
sudo cp -r dist/* /myblog/web/dist/
sudo sh deleteDocker.sh
sudo docker build -t nginxblog .
sudo docker run --name nginxblog -d -p 80:80 --restart unless-stopped  -v /myblog/nginx/nginx.conf:/etc/nginx/nginx.conf -v  /myblog/nginx/conf.d:/etc/nginx/conf.d  -v /myblog/web/dist:/usr/share/nginx/html -d nginxblog

