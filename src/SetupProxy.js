// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Specify the path you want to proxy
    createProxyMiddleware({
      target: 'https://ap-south-1.aws.data.mongodb-api.com', // Your API's base URL
      changeOrigin: true, // Needed for virtual hosted sites
      pathRewrite: {
        '^/api': '', // Remove the '/api' prefix when forwarding the request
      },
      headers: {
        'Content-Type': 'application/json',
      //'Access-Control-Request-Headers': '*',
      'Access-Control-Allow-Origin':'*',
       'Access-Control-Request-Headers': 'Authorization',
      'api-key': 'wuEh2kEn5CAUrdOXeTt9APRp2l5ZjrI3556N0RdjYVGSWBuK5OR4AQ9KC5a22v3S',
      },
    })
  );
};
