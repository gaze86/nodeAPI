const http = require("node:http");

//Common JS => modulos clasicos de node
const dittoJson = require("./pokemon/ditto.json");

const processRequest = (req, res) => {
  const { method, url } = req;

  switch (method) {
    case "GET":
      switch (url) {
        case "/pokemon/ditto":
          res.setHeader("Content-Type", " application/json; charset=utf-8");
          return res.end(JSON.stringify(dittoJson));

        default:
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html;charset=utf-8");
          return res.end("<h1>404</h1>");
      } //End of GET

    case "POST":
      switch (url) {
        case "/pokemon":
          let body = "";

          //escuchar el evento data
          req.on("data", (chunk) => {
            body += chunk.toString();
          });

          req.on("end", () => {
            
            const data = JSON.parse(body);
            
            //Llamar a bd para guardar los datos
            res.writeHead(201, {
              "Content-Type": "application/json; charset=utf-8",
            });
            data.timestamp = Date.now();
            res.end(JSON.stringify(data));
          });
          break;
        default: //for POST
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html;charset=utf-8");
          return res.end("<h1>404</h1>");
      } //End pof switch POST
  }
}; //End of switch (method)

const server = http.createServer(processRequest);

server.listen(1234, () => {
  console.log(`El puerto es http://localhost:${1234}`);
});
