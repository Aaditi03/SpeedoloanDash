const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/Api',
    createProxyMiddleware({
      target: 'https://api.salaryontime.co.in',
     
    })
  );
};
