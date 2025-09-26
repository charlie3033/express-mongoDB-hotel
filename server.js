const express = require('express');
const app = express();
require('./db');
require('dotenv').config();
const passport = require('./middleware/auth')

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
app.set('json spaces',2)

//middleware function
const logRequest = (req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next();
}
app.use(logRequest)


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session:false})

app.get('/',(req,res)=>{
  res.send('hello world');
});


const personRoutes = require('./routes/personRoutes')
app.use('/person', localAuthMiddleware, personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menuItem', menuRoutes);



app.listen(PORT,()=>{
  console.log(`Server is listening at ${PORT}`)
});