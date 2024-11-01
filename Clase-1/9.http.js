const http = require('node:http'); //Peticiones HTTP

const {findAvailablePort} = require('./10.free_port.js');

const desiredPort = process.env.PORT ?? 3000;

const server = http.createServer( (req, res)=>{
  console.log('Request received');
  res.end('Hola mundo!!')
});

findAvailablePort(desiredPort).then(port =>{
  server.listen(port, ()=>{
    console.log(`El puerto es http://localhost:${server.address().port}`);
  });
});
