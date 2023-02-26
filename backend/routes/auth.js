const express=require("express");
const router = express.Router();
const User=require("../models/Userupdate");
var jwt=require("jsonwebtoken")


 const JWT_SECRET = 'Biswa#12545nag@123';
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
      const authtoken=jwt.sign({email:user.email},JWT_SECRET);
      success = true;
      res.json({ success,authtoken})
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  
  
  });
  
  
//ROUTE-4:Add Expense for any day
router.post("/add_User_Expense_Daily", async (req, res) => {
  try {
    const { token, year, month, day, field, value,info } = req.body;
     console.log(req.body);
     const email = jwt.verify(token, JWT_SECRET).email;
    console.log(email);
    User.findOne(
      {
        email: email,
        details: { $elemMatch: { year: year, month: month, day: day } },
      },
      async (err, user) => {
        // console.log("2");
         console.log(user);
        if (user) {
          // console.log("3");
          User.updateOne(
            {
              email: email,
              details: { $elemMatch: { year: year, month: month, day: day } },
            },
            { $push: { "details.$.expense": { type: field, val: value,info: info } } },
            async (error, ans) => {
              if (error) res.send(error);
              else {
                console.log(ans);
                if(ans.modifiedCount===1)
                res.send({ message: "successfully stored 2", ans });
              }
            }
          );
        } else {
          // console.log("4");
          User.updateOne(
            { email: email },
            {
              $push: {
                details: {
                  year: year,
                  month: month,
                  day: day,
                  expense: [{ type: field, val: value ,info: info}],
                },
              },
            },
            async (error, ans) => {
              if (error) res.send(error);
              else {
                // console.log("5");
                console.log(ans);
                if(ans.modifiedCount===1)
                res.send({ message: "successfully stored 1", ans });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
});

//ROUTE-5:Fetch total expense for a day
router.post("/fetch_User_Expense_Sum_Daily", async (req, res) => {
  try {
    const { token, year, month, day } = req.body;
    const email = jwt.verify(token, JWT_SECRET).email;
    const f = User.aggregate([
      { $match: { email:email } },
      { $unwind: "$details" },
      {
        $match: {
          "details.year": year,
          "details.month": month,
          "details.day": day,
        },
      },
      { $unwind: "$details.expense" },
      {
        $group: {
          _id: "$details.day",
          sum: { $sum: "$details.expense.val" },
        },
      },
    ]).exec((err, daily_Expense) => {
      if (err) {
        console.log(err);
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "Failure" }));
        res.sendStatus(500);
      } else {
        res.send(daily_Expense);
      }
    });
  } catch (err) {
    // res.send(err);
    console.log(err);
  }
});

//ROUTE-6:Fetch total expense for a month
router.post("/fetch_User_Expense_Sum_Monthly", async (req, res) => {
  try {
    const { token, year, month } = req.body;
    const email = jwt.verify(token, JWT_SECRET).email;
    const f = User.aggregate([
      { $match: { email: email } },
      { $unwind: "$details" },
      { $match: { "details.year": year, "details.month": month } },
      { $unwind: "$details.expense" },
      {
        $group: {
          _id: "$details.month",
          sum: { $sum: "$details.expense.val" },
        },
      },
    ]).exec((err, monthly_Expense) => {
      if (err) {
        console.log(err);
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "Failure" }));
        res.sendStatus(500);
      } else {
        res.send(monthly_Expense);
      }
    });
  } catch (err) {
    // res.send(err);
    console.log(err);
  }
});

//ROUTE-7:Fetch total expense for a year
router.post("/fetch_User_Expense_Sum_Yearly", async (req, res) => {
  try {
    const { token, year } = req.body;
    const email = jwt.verify(token, JWT_SECRET).email;

    const f = User.aggregate([
      { $match: { email: email } },
      { $unwind: "$details" },
      { $match: { "details.year": year } },
      { $unwind: "$details.expense" },
      {
        $group: {
          _id: "$details.year",
          sum: { $sum: "$details.expense.val" },
        },
      },
    ]).exec((err, yearly_Expense) => {
      if (err) {
        console.log(err);
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "Failure" }));
        res.sendStatus(500);
      } else {
        res.send(yearly_Expense);
      }
    });
  } catch (err) {
    // res.send(err);
    console.log(err);
  }
});

//ROUTE-8:Fetch all expense details for a given day
router.post("/fetch_User_Expense_Details_Daily", async (req, res) => {
  try {
    const { token, year, month, day } = req.body;
    console.log(req.body);
    const email = jwt.verify(token, JWT_SECRET).email;

    const f = User.aggregate([
      { $match: { email:email } },
      { $unwind: "$details" },
      {
        $match: {
          "details.year": year,
          "details.month": month,
          "details.day": day,
        },
      },
      { $project: { _id: 0, "details.expense": 1 } },
    ]).exec((err, yearly_Expense) => {
      if (err) {
        console.log(err);
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "Failure" }));
        res.sendStatus(500);
      } else {
        res.send(yearly_Expense);
      }
    });
  } catch (err) {
    // res.send(err);
    console.log(err);
  }
});

//ROUTE-9:Fetch day-wise expense for a given month
router.post("/fetch_User_Expense_Details_Monthly", async (req, res) => {
  try {
    const { token, year, month } = req.body;
    const email = jwt.verify(token, JWT_SECRET).email;
    console.log(email);
    const f = User.aggregate([
      { $match: { email: email } },
      { $unwind: "$details" },
      { $match: { "details.year": year, "details.month": month } },
      { $unwind: "$details.expense" },
      {
        $group: {
          _id: "$details.day",
          sum: { $sum: "$details.expense.val" },
        },
      },
      { $sort: { _id: 1 } },
    ]).exec((err, monthly_Expense) => {
      if (err) {
        console.log(err);
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "Failure" }));
        res.sendStatus(500);
      } else {
        res.send(monthly_Expense);
      }
    });
    // .toArray((error, ans) => {
    //   if (error) res.send({ error: error.message });
    //   if (ans.length) {
    //     res.json(ans);
    //   } else res.send({ data: "no doc found" });
    // });
  } catch (err) {
    // res.send(err);
    console.log(err);
  }
});

//ROUTE-10:Fetch month-wise expense for a given year
router.post("/fetch_User_Expense_Details_Yearly", async (req, res) => {
  try {
    const { token, year } = req.body;
     const email = jwt.verify(token, JWT_SECRET).email;
     console.log(email);
    const f = User.aggregate([
      { $match: { email: email } },
      { $unwind: "$details" },
      { $match: { "details.year": year } },
      { $unwind: "$details.expense" },
      {
        $group: {
          _id: "$details.month",
          sum: { $sum: "$details.expense.val" },
        },
      },
      { $sort: { _id: 1 } },
    ]).exec((err, yearly_Expense) => {
      if (err) {
        console.log(err);
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ message: "Failure" }));
        res.sendStatus(500);
      } else {
        res.send(yearly_Expense);
      }
    });
  } catch (err) {
    res.send(err);
    // console.log(err);
  }
});

module.exports=router;