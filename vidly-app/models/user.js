const mongoose =require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:255
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    isAdmin :{
        type:Boolean,
        default:false
    }
});
userSchema.methods.generateAuthToken = function (){
    const token =jwt.sign({_id: this._id ,isAdmin:this.isAdmin},config.get("jwtPrivateKey"));
    return token;
}
const User = mongoose.model("user",userSchema);

function validateUser(user) {
    const schema = {
      name: Joi.string().min(3).max(255).required(),
      email: Joi.string().min(5).max(250).required().email(),
      password: Joi.string().min(8).required(),
    };
  
    return Joi.validate(user, schema);
  }
  
  exports.User = User; 
  exports.validate = validateUser;