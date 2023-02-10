const connecttomongo=require('./db');
connecttomongo();
const express = require('express')
const app = express()
const port = 5000
const cors=require("cors");
app.use(cors())
const User=require("./models/User");
app.use(express.json());

app.use("/user",require("./routes/auth"));




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})