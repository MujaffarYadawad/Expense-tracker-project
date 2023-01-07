 async function signup(event){
 event.preventDefault()
 const name= event.target.name.value;
 const email =event.target.email.value;
 const password = event.target.password.value;
  const signupDetails = {
    name ,
    email, 
    password ,
  }
  console.log(signupDetails)
  try{
     const res = await axios.post("http://localhost:3000/expense/postSignupUser", signupDetails)
     console.log(res);
     
     
     if(res.status === 200){
       window.location.href="../login/login.html" //redirect to login page
       console.log('login')
     }
     else{
      throw new Error('failed to Signup');
     }
  }
  catch(err){
    console.log(err)
    document.body.innerHTML += `<div style="color:red;">${err}</div>`
  }
  
  
}