# soical_vue

运行Server
```
cd server
npm install
```

创建server Docker
```
sudo docker build -t my-node ./server
```

docker 运行mongodb
```
sudo docker run -d -p 27017:27017 -v "$(pwd)"/db:/data/db --name mongodb mongo:latest
```

docker运行server
```
sudo docker run -d --name my-node --link mongodb:mongodb -p 3001:3000 my-node
```

docker-compose运行
```
docker-compose up -d
```