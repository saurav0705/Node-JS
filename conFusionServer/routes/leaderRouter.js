const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
const Leaders = require('../node_models/leaders');
const authenticate = require('../authenticate');
var cors = require('./cors');

leaderRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next) =>{
    Leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(leaders);
    },(err) => next(err))
    .catch((err) => next(err));    
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    Leaders.create(req.body)
    .then((leaders) => {
        res.statusCode = 201;
        res.setHeader('Content-type','application/json');
        res.json(leaders);
    },(err) => next(err))
    .catch((err) => next(err));  
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) =>{
    res.end("PUT method is not allowed at /leaders/");
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
   Leaders.remove({})
   .then((resp) =>{
    res.statusCode = 201;
    res.setHeader('Content-type','application/json');
    res.json(resp);
},(err) => next(err))
.catch((err) => next(err));
});

leaderRouter.route('/:leaderId')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next) =>{
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(leader);
    },(err) => next(err))
    .catch((err) => next(err));    
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    res.end("POST method is not allowed at /leaders/"+req.params.leaderId);  
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) =>{
    Leaders.findByIdAndUpdate(req.params.leaderId,{ $set : req.body},{new : true})
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(leader);
    },(err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
   Leaders.findByIdAndRemove(req.params.leaderId)
   .then((resp) =>{
    res.statusCode = 201;
    res.setHeader('Content-type','application/json');
    res.json(resp);
},(err) => next(err))
.catch((err) => next(err));
});

module.exports = leaderRouter;