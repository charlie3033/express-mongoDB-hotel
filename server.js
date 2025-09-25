const express = require('express');
const app = express();
require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.set('json spaces',2)

const port=3000;

app.get('/',(req,res)=>{
  res.send('hello world');
});


const personRoutes = require('./routes/personRoutes')
app.use('/person',personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menuItem',menuRoutes);


app.listen(port,()=>{
  console.log(`Server is listening at ${port}`)
});