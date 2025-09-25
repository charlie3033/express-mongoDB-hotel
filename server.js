const express = require('express');
const app = express();
require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.set('json spaces',2)

app.get('/',(req,res)=>{
  res.send('hello world');
});


const personRoutes = require('./routes/personRoutes')
app.use('/person',personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menuItem',menuRoutes);



app.listen(PORT,()=>{
  console.log(`Server is listening at ${PORT}`)
});