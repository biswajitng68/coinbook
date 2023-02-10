const express=require("express");
const router = express.Router();
const User=require("../models/User");
// const cors=require("cors");
// const app=express


// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/sign', async (req, res) => {
  // If there are errors, return Bad request and the errors
  try {
    let success=false;
    // Check whether the user with this email exists already
    let user = await User.findOne({ email:req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }

    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: req.body.password,
      mobile: req.body.mobile,
      email: req.body.email,
    });

success=true;
    // res.json(user)
    res.json({success})

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

//login route
router.post('/login',  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
  
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false
        return res.status(400).json({ error: "Please try to login with correct credentials" });
      }
  
      //const passwordCompare = await bcrypt.compare(password, user.password);
      if (!(password==user.password)) {
        success = false
        return res.status(400).json({ success, error: "Please try to login with correct credentials" });
      }
  
      //
      success = true;
      res.json({ success})
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  
  
  });
  

module.exports=router;