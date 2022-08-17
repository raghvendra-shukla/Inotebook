const express=require("express");
const fetchuser = require("../middelware/fetchuser");
const router = express.Router();
const Notes=require('../models/Notes');
const { body, validationResult } = require('express-validator');
const { request } = require("express");

// Route1: fetchingAlluser using get request
router.get('/fetchalluser',fetchuser, async(req, res) => {
    try {
      const notes=await Notes.find({user:req.user.id});
      res.json(notes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal  server error occured");
    }
  });

// Route2: adding new note using post 
router.post("/addnotes",[
  body("title","please write a title of atleast 3-char").isLength({min:3}),
  body("description","please write a description of atleast 5-char").isLength({min:5}),
],fetchuser,async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try{
    const {title,description,tag}=req.body;
    const note=new Notes({
      title,description,tag,user:req.user.id
    });
    const saveData=await note.save();
    res.json(saveData);
  }catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

// Route3:Updateing the existing note
router.put("/updatenote/:id",fetchuser,async (req,res)=>{
  const {title,description,tag}=req.body;
  // creating a note object
  const newnote={};
  if(title){newnote.title=title};
  if(description){newnote.description=description};
  if(tag){newnote.tag=tag};
  //find the note to be update and update it
  let note=await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")};
  if(note.user.toString()!==req.user.id){
    return res.send("Not Allowed");
  }
  note=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
  res.json({note});
});

// Route:4 delete the using delete request
router.delete("/deletenote/:id",fetchuser,async (req,res)=>{
  //find the note to be delete and delete it
  try{
    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")};
    if(note.user.toString()!==req.user.id){
      return res.send("Not Allowed");
    }
    note=await Notes.findByIdAndDelete(req.params.id);
    res.json("Success:The note has been deleted");
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports=router