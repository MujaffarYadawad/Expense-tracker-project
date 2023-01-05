const Signup = require('../models/signup') 
 
exports.postSignupUser = (async(req,res,next) => {
  try{
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
 

  const signupObj = await Signup.create({
    name: name,
    email: email,
    password: password
  })
  res.json(signupObj)
 }
 catch(err){
  console.log(err);
 
 }
  

});