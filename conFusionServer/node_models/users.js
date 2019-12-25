const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const user = new Schema({
    firstname :{
        type : String,
        default : ''
    },
    lastname : {
        type : String,
        default : ''
    },
    facebookId : String,
    admin:{
        type:Boolean,
        default : false
    }

});
user.plugin(passportLocalMongoose);
module.exports  = mongoose.model('User',user); 