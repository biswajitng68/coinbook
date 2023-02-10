const mongoose=require("mongoose");
const monguri="mongodb://localhost:27017";
const connecttomongo=()=>{
    mongoose.connect(monguri,()=>{
        console.log("db conected");
    })
}
module.exports=connecttomongo;