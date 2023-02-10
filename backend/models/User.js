const mongoose=require('mongoose');
const { Schema } = mongoose;
const Usrerschema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  mobile:{
    type:String,
    required:true
  }
});
module.exports=mongoose.model("user",Usrerschema);