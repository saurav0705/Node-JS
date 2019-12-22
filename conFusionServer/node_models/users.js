const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({

    username:
    {
        required:true,
        unique:true,
        type:String,
    },
    password:{
        type:String,
        required:true,

    },
    admin:{
        type:Boolean,
        default : false
    }

});

module.exports  = mongoose.model('User',user); 