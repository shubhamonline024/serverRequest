const http = require("http");
const url = require("url");
const util = require("util");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); // Parse URL + query parameters

  // ---------------------------
  // Route: "/"
  // ---------------------------
  if (parsedUrl.pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end(util.inspect(req, { showHidden: false, depth: null }));
  }

  // ---------------------------
  // Route: "/info"
  // ---------------------------
  if (parsedUrl.pathname === "/info") {
    const importantInfo = {
      metadata: {
        method: req.method,
        url: req.url,
        httpVersion: req.httpVersion,
        protocol: req.socket.encrypted ? "HTTPS" : "HTTP",
      },

      headers: req.headers,

      queryParameters: parsedUrl.query,

      bodyNotice:
        "Body not automatically captured. Use middleware like body-parser or manually collect data in data/event listeners.",

      cookies: req.headers.cookie || null,

      clientInfo: {
        ip: req.socket.remoteAddress,
        port: req.socket.remotePort,
        tlsInfo: req.socket.getPeerCertificate
          ? req.socket.getPeerCertificate()
          : "Not TLS / No certificate",
      },

      timing: {
        timestamp: new Date().toISOString(),
      },
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(importantInfo, null, 2));
  }

  // ---------------------------
  // Fallback for unknown routes
  // ---------------------------
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
});

server.listen(80, () => {
  console.log("Server Started on port 80");
});
