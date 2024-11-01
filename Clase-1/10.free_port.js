
// Obeteer el primer puesto disponible
const net = require("node:net"); // -> Conectarse atraves de TCP

function findAvailablePort(desiredPort) {

  return new Promise((resolve, reject) => {

    const server = net.createServer();

    server.listen(desiredPort, () => {
      const { port } = server.address();
      server.close( ()=>{
        resolve(port);
      });
    });

    server.on('error', (error)=>{

      if(error.code === 'EADDRINUSE'){
        findAvailablePort(0)  
            .then(port => resolve(port))
      } else
      {
        reject(err)
      }
    });
  });
};

module.exports = { findAvailablePort };
