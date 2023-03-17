const http = require('http');
const hostname = '127.0.0.1';
const port = 5000;

const server = http.createServer((req, res) => {
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello World')

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Hello Arjun</h1>');
    res.end('Hello World');
})

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
})
