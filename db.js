const mongoose = require("mongoose");
require('dotenv').config();
//connection
const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//default connection
const db = mongoose.connection;

//event listeners
db.on('connected',()=>{
  console.log('connected to mongoDB');
});
db.on('error',()=>{
  console.log('Error: ', err);
});
db.on('disconnected',()=>{
  console.log('MongoDB disconnected');
});

//export data connection
module.exports = db;