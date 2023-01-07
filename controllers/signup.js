
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
  
exports.postLoginsUser = (async(req,res,next) =>{
  console.log('e mai')
    const email = req.body.email
    const password = req.body.password;
   

   try {
   
    const res1 = await Signup.findAll({ where: { email: email } });
   
    //console.log(res1.length)
    if (res1.length !== 0) {
      const res2 = await Signup.findAll({ where: { password: password } });
      //console.log(res2.length)
      if (res2.length !== 0) {
        res.json({success: true });
        //console.log('sss')
      } else {
        res.json({ password: "incorrect" });
      }
   } else {
      res.json({ success: false });
    }
    
  }
   catch (error) {
    console.log(error)
   }
    
})
  