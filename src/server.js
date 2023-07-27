// const http = require('http');
 
// const requestListener = (request, response) => {
//     response.setHeader('Content-Type', 'text/html');
 
//     response.statusCode = 200;
//     response.end('<h1>Halo HTTP Server Dari Laptop!</h1>');
// };
 
// const server = http.createServer(requestListener);
 
// const port = 9000;
// const host = 'localhost';
 
// server.listen(port, host, () => {
//     console.log(`Server berjalan pada http://${host}:${port}`);
// });
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();