
const http = require("http");
const app = require("./App")
const config = require("./configs/default");

const port = config.port;

const server = http.createServer(app);

server.listen(port, ()=> console.log(`server on Port ${port}`))



