async function signup(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;
  const signupDetails = {
    name,
    email,
    password,
  };
  console.log(signupDetails);
  try {
    const res = await axios.post(
<<<<<<< HEAD
      "http://localhost:3000/user/postUser",
=======
      "http://54.95.147.222:3000/user/postUser",
>>>>>>> 7d854a8e3ec5166219c5affecf78c44f70da8151
      signupDetails
    );
    console.log(res);

    if (res.data.alreadyexisting === false) {
      //if user not existed then only creat new user
      console.log("ssuc");
      window.alert("Account is crated succussfully");
      window.location.href = "../login/login.html"; // redirect to login page
      console.log("login");
    } else {
      throw new Error("failed to Signup , account is already exist");
    }
  } catch (err) {
    console.log(err);
    document.body.innerHTML += `<div style="color:red;">${err}</div>`;
  }
}
