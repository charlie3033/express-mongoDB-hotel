const express = require('express');
const router = express.Router();
const menuItem = require('./../models/menuItem');

router.get('/',async(req,res)=>{
  try{
    const data = await menuItem.find();
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server error'});
  }
});

router.post('/',async(req,res)=>{
  try{
    const newItem = new menuItem(req.body);
    const savedItem = await newItem.save();
    res.status(200).json({output:'Item saved successfully'});
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'});
  }
});

router.get('/:taste',async(req,res)=>{
  try{
    const taste = req.params.taste;
    if( taste == 'sweet' || taste == 'spicy' || taste == 'sour'){
      const data = await menuItem.find({taste:taste});
      res.status(200).json(data);
    }else{
      res.status(404).json({error:'data does not exist'});
    }
    
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'});
  }
});

router.put('/:id',async(req,res)=>{
  try{
    const id = req.params.id;
    const response = await menuItem.findByIdAndUpdate(id,req.body,{
      new:true,
      runValidators:true
    });
    if(!response){
      return res.status(404).json({error:'no data found'});
    }
    res.status(200).json({output:"data updated successfully"});
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server error'});
  }
});

router.delete('/:id',async(req,res)=>{
  try{
    const id = req.params.id;
    const response = await menuItem.findByIdAndDelete(id);
    if(!response){
      res.status(404).json({error:'no data found'});
    }
    res.status(200).json({output:"data deleted successfully"});
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'});
  }
});

module.exports = router;