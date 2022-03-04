const http = require('http');
const fs = require('fs')

const hostname = '127.0.0.1';
const port = 3000;

let file_text = "Hello World";

fs.readFile('./songs/file.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  file_text = data;
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(file_text);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
