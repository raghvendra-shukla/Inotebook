const express=require("express");
const User=require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require("../middelware/fetchuser");

const JWT_SECRET="Rannyisagood$boy";

// Route1:create a user using post: ./api/auth/ 
router.post('/createuser',[
  body("name").isLength({min:3}),
  body("email").isEmail(),
  body("passward").isLength({min:5})
], async (req, res) => {
  let success=false;
    // obj={
    //     name:"ranny",
    //     age:20
    // }
    // res.json(obj);
    // res.send("THis is me");
    // console.log(req.body);
    // res.send(req.body);
    // const user=User(req.body);
    // user.save();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try{
    let user=await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).json({ errors: "invalid email" });
    }
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.passward, salt);
    user= await User.create({
      name: req.body.name,
      email:req.body.email,
      passward:secpass,});
      // res.json(user);
      // .then(user => res.json(user))
      const data={
        user:{
          id:user.id
        }
      }
      const Authtoken=jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,Authtoken});
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
    // err=>{console.log(err)
    // res.json({error:"Please enter a valid email", message: err.message})})

  });
// Route2:creating a login endpoint using post request
  router.post('/login',[
    body("email").isEmail(),
    body("passward","passward cannot be blank").isLength({})
  ], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,passward}=req.body;
    try{
      let user=await User.findOne({email});
      if(!user){
        return res.status(400).json({ errors: "user does not exist" });
      }

      const passwardCompare= await bcrypt.compare(passward,user.passward);
      if(!passwardCompare){
        return res.status(400).json({ errors: "user does not exist" });
      }

      const data={
        user:{
          id:user.id
        }
      }
      const Authtoken=jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,Authtoken});
      }
      catch(error){
        console.error(error.message);
        res.status(500).send("Internal error occured");
      }

    });

    // Route3:creating a getuser endpoint using post request
  router.post('/getuser',fetchuser,async (req, res) => {
    try{
      userid=req.user.id;
      const user=await User.findById(userid).select("-passward");
      res.send(user);
      }
      catch(error){
        console.error(error.message);
        res.status(500).send("Internal  server error occured");
      }

    });

module.exports=router