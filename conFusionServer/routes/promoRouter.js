const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());
const authenticate = require('../authenticate');
const Promos = require('../node_models/promos');

promoRouter.route('/')
.get((req,res,next) =>{
    Promos.find({})
    .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(promos);
    },(err) => next(err))
    .catch((err) => next(err));    
})
.post(authenticate.verifyUser,(req,res,next) => {
    Promos.create(req.body)
    .then((promos) => {
        res.statusCode = 201;
        res.setHeader('Content-type','application/json');
        res.json(promos);
    },(err) => next(err))
    .catch((err) => next(err));  
})
.put(authenticate.verifyUser,(req,res,next) =>{
    res.end("PUT method is not allowed at /promo/");
})
.delete(authenticate.verifyUser,(req,res,next) => {
   Promos.remove({})
   .then((resp) =>{
    res.statusCode = 201;
    res.setHeader('Content-type','application/json');
    res.json(resp);
},(err) => next(err))
.catch((err) => next(err));
});

promoRouter.route('/:promoId')
.get((req,res,next) =>{
    Promos.findById(req.params.promoId)
    .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(promos);
    },(err) => next(err))
    .catch((err) => next(err));    
})
.post(authenticate.verifyUser,(req,res,next) => {
    res.end("POST method is not allowed at /promo/"+req.params.promoId);  
})
.put(authenticate.verifyUser,(req,res,next) =>{
    Promos.findByIdAndUpdate(req.params.promoId,{ $set : req.body},{new : true})
    .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(promos);
    },(err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser,(req,res,next) => {
   Promos.findByIdAndRemove(req.params.promoId)
   .then((resp) =>{
    res.statusCode = 201;
    res.setHeader('Content-type','application/json');
    res.json(resp);
},(err) => next(err))
.catch((err) => next(err));
});


module.exports = promoRouter;