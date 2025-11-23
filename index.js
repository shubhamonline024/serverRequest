const http = require("http");
const util = require("util");

const myServer = http.createServer((req, res) => {
  res.end(util.inspect(req, { showHidden: false, depth: null }));
});

myServer.listen(80, () => {
  console.log("Server Started");
});
