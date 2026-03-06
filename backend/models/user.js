const { required } = require('joi');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userschema = new mongoose.Schema(
    {
        username:{type:String,required:true},
        email:{type:String, required:true, unique:true},
        password:{type:String,required:true}
    }
);

const usermodel = mongoose.model('users',userschema);
module.exports = usermodel;