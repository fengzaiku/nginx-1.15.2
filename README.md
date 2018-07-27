这是一个windows环境下的一个简单的nginx服务器配置，本项目包括：
nginx反向代理nginx-反向代理.conf
nginx负载均衡nginx.conf
nginx使用include引用外部配置等

1,打开www目录下的express-server-9010/express-server-9011 npm install
2，安装完成上面的以来之后，以下面的方式打开：
    一：分别在对应的目录下npm run dev
    二：如果想要使用pm2可以安装PM2打开,我的是全局安装的：
        全局安装：pm2 install pm2 -g
        分别在对应的目录下pm2 start ecosystem.config.js
3，在nginx.exe目录下start nginx.exe启动nginx
4，页面打开locahost




