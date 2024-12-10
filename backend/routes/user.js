const express = require("express");
const zod = require("zod");
const User = require("../models/user");
// const Transaction = require("./models/transction");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

const signupBody = zod.object({
    email: zod.string().email(),
    name: zod.string(),
    phoneNumber: zod.number(),
    password: zod.string(),
});

router.get('/user', (req, res) => {
    res.json({
        message:"user"
    }).status(200);
})

router.post("/signup", async (req, res) => {
    // const { success } = signupBody.safeParse(req.body);
    // if (!success) {
    //   return res.status(411).json({
    //     message: "Incorrect inputs",
    //   });
    // }
  
    const existingUser = await User.findOne({
      email: req.body.email,
    });
  
    if (existingUser) {
      return res.status(411).json({
        message: "Email already taken",
      });
    }
  
    const { email, name, phoneNumber, password } = req.body;
  
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      email:email,
      name:name,
      phoneNumber:phoneNumber,
      password: password,
    });
    const userId = newUser._id;
    newUser.save();
  
    const token = jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET
    );
  
    res.status(200).json({
      message: "User created successfully",
      token: token,
    });
});

const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string(),
});

router.post('/signin', async (req, res)=>{
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Incorrect inputs",
      });
    }

    const existingUser = await User.findOne({
        email: req.body.email,
    });
    
    if (!existingUser) {
        return res.status(411).json({
            message: "Email is not registered",
        });
    }
})

module.exports = router;