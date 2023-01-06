
const Signup = require('../models/signup') 

  
exports.postSignupUser = (async (req,res,next) =>{
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
 
  
  try {
     const response = await Signup.findAll({ where: { email: email } });
     console.log(response);
     if(response.length === 0 ){
     await Signup.create({
        name: name,
        email: email,
        password: password,
        
      });
       res.json({ alreadyexisting: false });
     }
     else{
      res.json({ alreadyexisting: true });
     }
  } catch (error) {
    console.log(error)
  }
} )
  
  