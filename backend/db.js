const mongoose=require("mongoose");
mongoose.set("strictQuery", false); 
const monguri="mongodb://localhost:27017/test";
const connecttomongo=()=>{
    mongoose.connect(monguri,()=>{
        console.log("db conected");
    })
}
module.exports=connecttomongo;