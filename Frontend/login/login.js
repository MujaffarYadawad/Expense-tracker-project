 async function login(event){
   event.preventDefault()
   const email = event.target.email
   const password = event.target.password

   const loginDetails = {
    email: email,
    password: password
   }
     console.log(loginDetails)
     try{
      const log = await axios.post('https://crudcrud.com/api/46133d51d1a24e928badd868a141e6a1/log', loginDetails)
      console.log(log)
     }
     catch(err){
      console.log(err)
     }
      

     
    
}