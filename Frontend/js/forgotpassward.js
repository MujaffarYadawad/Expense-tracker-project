 async function forgotpassword(event) {
  event.preventDefault();
  //console.log('forgot password')
   //const form = new FormData(event.target);
   const email = event.target.email.value;

   const userDetails = {
      email
   };

   //console.log(userDetails);

   try {
    const res = await axios.post("https://crudcrud.com/api/e0023ca99852413fa78d8d88074c4937/forgotpass", userDetails);
    
    //console.log(res)
    
   } catch (err) {
    console.log(err)
      document.body.innerHTML += `<div style="color:red;">${err} <div>`;
   }
 
}