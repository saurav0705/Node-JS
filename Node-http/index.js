const http = require('http');
const host = 'localhost';
const port = 8000;


const server = http.createServer((req,res) => {
    console.log(req.headers);

    res.statusCode=200;
    res.setHeader('Content-type','text/html');
    res.end('<h1>helloooooooooooo</h1>');
});


server.listen(port,host,() => {
    console.log(`server started successfully on port ${port} and on host ${host}`);
});