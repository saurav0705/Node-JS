const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./node_models/users');
var jwtStrategy = require('passport-jwt').Strategy;
var Extractjwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var config = require('./config');
var facebookTokenStrategy = require('passport-facebook-token');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user){
    return jwt.sign(user,config.secretKey,{expiresIn : 3600});
};

var opts = {};
opts.secretOrKey = config.secretKey;
opts.jwtFromRequest = Extractjwt.fromAuthHeaderAsBearerToken();

exports.jwtpassport= passport.use(new jwtStrategy(opts,(jwt_payload,done)=>{
    //console.log(jwt_payload);
    User.findOne({_id:jwt_payload._id},(err,user) =>{
        if(err){
            return done(err,false);
        }else if(user){
            return done(null,user);
        }
        else{
            return done(null ,false);
        }
    });
}));

exports.verifyUser = passport.authenticate('jwt',{session:false});
exports.verifyAdmin = function(req,res,next){
    //console.log("ADMIN-------------------------------------------------",req.user);
    if(req.user.admin){
    next();}
    else{
        var err = new Error('You are not authorized!');
        err.status = 403;
        return next(err);
    }
}


exports.facebookpassport = passport.use(new facebookTokenStrategy({
    clientID : config.facebook.clientID,
    clientSecret : config.facebook.clientSecret
},(accessToken, refreshToken, profile, done)=>{
    User.findOne({facebookId:profile.id},(err,user)=>{
        if(err)
            {return done(err,false);}

        if(err==null && user!=null)
            {
                return done(null,user);
            }
        else{
            user = new User({ username: profile.displayName });
            user.facebookId = profile.id;
            user.firstname = profile.name.givenName;
            user.lastname = profile.name.familyName;
            user.save((err, user) => {
                if (err)
                    return done(err, false);
                else
                    return done(null, user);
            })
        }
    });
}
));