const express = require('express')
const router = express.Router();
const person = require('./../models/person');

router.post('/',async (req,res)=>{
  try{
    const newPerson = new person(req.body);
    const savedPerson = await newPerson.save();
    console.log('data saved');
    res.status(200).json(savedPerson);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
  }
});


router.get('/',async(req,res)=>{
  try{
    const data = await person.find();
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }
});

router.get('/:worktype',async(req,res)=>{
  try{
    const worktype=req.params.worktype;
    if(worktype == "chef" || worktype== "manager" || worktype == "waiter"){
      const data = await person.find({work: worktype});
      res.status(200).json(data);
    }else{
      res.status(404).json({error:"Invalid work type"});
    }
  }catch(err){
    console.log(err);
    res.status(500).json({error:"Internal Server Error"});
  }
});

router.put('/:id',async(req,res)=>{
  try{
    const id = req.params.id;
    const response = await person.findByIdAndUpdate(id, req.body,{
      new: true,
      runValidators : true
    });

    if(!response){
      return res.status(404).json({error:'person not found'});
    }

    res.status(200).json({output:'data updated successfully'})
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'});
  }
});

router.delete('/:id',async(req,res)=>{
  try{
    const id = req.params.id;
    const response = await person.findByIdAndDelete(id);
    if(!response){
      return res.status(404).json({error:"Person not found"});
    }
    res.status(200).json({output:"data deleted successfully"});
  }catch(err){
    console.log(err);
    res.status(500).json({error:"Internal Server Error"});
  }
});

module.exports = router;