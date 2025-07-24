const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Points to your db.json
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH requests you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    // You can modify data here before it's saved
    // For example, add a timestamp or unique ID if json-server doesn't provide it automatically for your specific needs
    req.body.timestamp = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// Use default router
server.use(router);

const port = process.env.PORT || 3001; // Use environment variable for port in production

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
  console.log(`Access products: http://localhost:${port}/products`);
  console.log(`Access orders: http://localhost:${port}/orders`);
});