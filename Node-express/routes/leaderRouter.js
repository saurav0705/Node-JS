const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all( (req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-type','text/plain');
    next();
})
.get((req,res,next) =>{
    res.end("Leader :: this is GET method of leader url.");
})
.post((req,res,next) => {
    res.end(`Leader :: this is POST method of leader url. Body data is ${req.body}`);
})
.put((req,res,next) =>{
    res.end("Leader :: this is PUT method of leader url.");
})
.delete((req,res,next) => {
    res.end("Leader :: this is DELETE method of leader url.");
});

leaderRouter.route('/:leaderId')
.all( (req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-type','text/plain');
    next();
})
.get((req,res,next) =>{
    res.end("Leader ID :: this is GET method of leader url.Leader ID is "+req.params.leaderId);
})
.post((req,res,next) => {
    res.end(`Leader ID :: this is POST method of leader url. Body data is ${req.body}.Leader ID is ${req.params.leaderId}`);
})
.put((req,res,next) =>{
    res.end("Leader ID :: this is PUT method of leader url.Leader ID is "+req.params.leaderId);
})
.delete((req,res,next) => {
    res.end("Leader ID :: this is DELETE method of leader url.Leader ID is "+req.params.leaderId);
});

module.exports = leaderRouter;