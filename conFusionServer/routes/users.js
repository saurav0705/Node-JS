var express = require('express');
var router = express.Router();
var User = require('../node_models/users');
var bodyParser = require('body-parser');
router.use(bodyParser.json());

var passport = require('passport');

/* GET users listing. */
router.get('',(req,res,next)=>{
 res.statusCode =200;
 res.end("you are in users");
});


router.post('/signup',(req,res,next)=>{
  User.register(new User({username:req.body.username}),req.body.password,(err,user)=>{
    if(err){
      res.statusCode = 500;
      res.setHeader('Content-type','application/json');
      res.json({err:err})
    }
    else{
      passport.authenticate('local')(req,res,()=>{
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json({success:true,status: "Registration Succesfull"})
      });
    }
  });
});

router.post('/login',passport.authenticate('local'), (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-type','application/json');
  res.json({status:"You are succesfully logged In",success:true});
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
