
const Signup = require('../models/signup') 
const bcrpt = require('bcrypt')
const saltRounds = 10;

exports.postSignupUser = (async (req,res,next) =>{
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
 
  
  try {
    bcrpt.hash(password, saltRounds, async (err, hash) =>{
         const response = await Signup.findAll({ where: { email: email } });
         console.log(response);
         if (response.length === 0) {
           await Signup.create({
             name: name,
             email: email,
             password: hash,
           })
           res.json({ alreadyexisting: false });
         } else {
           res.json({ alreadyexisting: true });
         }

    })
  
  } catch (error) {
    console.log(error)
  }
} )
  
exports.postLoginsUser = (async(req,res,next) =>{
  console.log('e mai')
    const email = req.body.email
    const password = req.body.password;
   

   try {
   
    const user = await Signup.findAll({ where: { email: email } });
   
    //console.log(res1.length)
    if (user.length !== 0) {
      const res2 = await Signup.findAll({ where: { password: password } });
      bcrpt.compare(password, user[0].password, async function (err, result) {
        if(err){
          console.log(err)
        }
           
      //console.log(res2.length)
      if (result === true) {
        res.json({success: true });
        //console.log('sss')
      } else {
        res.json({ password: "incorrect" });
      }

      })
   
   } else {
      res.json({ success: false });
    }
    
  }
   catch (error) {
    console.log(error)
   }
    
})
  