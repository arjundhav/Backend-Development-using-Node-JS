const http = require('http');
const url= require('url');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 5001;

const mimeTypes = {
    "html": "text/html",
};

http.createServer((req,res)=>{
    var myuri =url.parse(req.url).pathname
    var filename = path.join(process.cwd(),unescape(myuri));
    console.log('Loading '+ filename);

    var loadFile;
    
    try{
        loadFile =fs.lstatSync(filename)
    }catch(error){
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.write('404 Not Found');
        res.end();
        return;
    }

    if(loadFile.isFile()){
       var mimeType = mimeTypes[path.extname(filename.split('.').reverse()[0])];
       res.writeHead(200,{'Content-Type':mimeType});

       var filestream = fs.createReadStream(filename)
       filestream.pipe(res);
    }else if(loadFile.isDirectory()){
        res.writeHead(302,{
            'Location':'index.html'
        });
        res.end();
    }else{
        res.writeHead(500,{'Content-Type':'text/plain'});
        res.write('500 Internal Error');
        res.end();
    }
}).listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
})

