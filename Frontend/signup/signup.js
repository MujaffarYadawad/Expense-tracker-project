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
     const res = await axios.post("https://crudcrud.com/api/1b060f5b329a4d91b017bcdcc350a966/exp", signupDetails)
     console.log(res);
     console.log('hai')
     if(res.status=== 201){
       window.location.href="../login/login.html"  //redirect to login page
       console.log('login')
     }
     else{
      throw new Error('failed to login');
     }
  }
  catch(err){
    console.log(err)
    document.body.innerHTML += `<div style="color:red;">${err}</div>`
  }
  
  
}