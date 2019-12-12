const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');

const host = 'localhost';
const port = 8000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json())
app.use('/dishes',dishRouter);



app.use(express.static(__dirname+"/public"));

app.use(
(req,res,next) => {
    res.statusCode =200;
    res.setHeader('Content-type','text/html');
    res.end("<h1>this is an express server.</h1>");
}
);

const server = http.createServer(app);
server.listen(port,host,() => {
    console.log(`server is up and running on http://${host}:${port}`);
});