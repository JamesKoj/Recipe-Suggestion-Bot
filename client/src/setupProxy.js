// Redirects to localhost:5000 when using api urls on the development server

const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function(app) {
    app.use(createProxyMiddleware("/api", { target: "http://localhost:5000" }));
};