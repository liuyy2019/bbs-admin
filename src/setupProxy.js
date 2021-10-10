const proxy = require('http-proxy-middleware')
module.exports = function(app) {
    app.use(
        proxy.createProxyMiddleware('/mock', {  //带有api是需要转发的请求
            target: 'https://www.fastmock.site/mock/9e3ae85cf3b95e7678cf9a694459d7f5',  // 这里是服务器地址
            changeOrigin: true,//值为布尔值, 为true时, 本地就会虚拟一个服务器接收你的请求并代你发送该请求,
            pathRewrite: {'^/mock': ''}
        }),
        proxy.createProxyMiddleware('/v1',{
            target:'http://127.0.0.1:8080',
            changeOrigin:true,
            // pathRewrite:{'^/api2':''}
        })
    )
};