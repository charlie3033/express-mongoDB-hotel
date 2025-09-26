const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const person = require('./../models/person');

passport.use(new LocalStrategy(async (username, password, done)=>{
  try{
    // console.log('received credentials: ',username,password);
    const user = await person.findOne({username:username});
    if(!user){
      return done(null, false, { message:'Incorrect Username'});
    }
    const isPasswordMatch = user.password === password ? true:false;
    if(isPasswordMatch){
      return done(null,user);
    }else{
      return done(null, false, {message: 'Incorrect password'});
    }
  }catch(err){
    return done(err);
  }
}));

module.exports = passport;