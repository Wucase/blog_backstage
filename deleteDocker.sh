
#!/bin/bash
# 获取容器的id
cid=`docker ps | grep nginxblog | awk '{print $1}'`
# 判断容器是否存在，存在则进行删除，否则退出
if [ -z $cid ];
 then
   sudo docker stop nginxblog
   sudo docker rm nginxblog
   sudo docker rmi nginxblog
   echo "删除成功"
fi
