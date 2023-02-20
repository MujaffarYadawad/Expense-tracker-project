async function login(event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;

  //console.log(email)

  const loginDetails = {
    email: email,
    password: password,
  };
  console.log(loginDetails);
  try {
    console.log("rrr");
    const res = await axios.post(
      "http://43.207.54.88:3000/user/postLoginUser",
      loginDetails
    );
    //console.log(res)
    //console.log('cc')

    if (res.data.success == true) {
      localStorage.setItem("token", res.data.token);
      window.alert("User Logged In Successfully");

      window.location.href = "../index/index.html";
    } else if (res.data.password == "incorrect") {
      window.alert("Password is Incorrect");
    } else {
      window.alert("User Not Registered");
    }
  } catch (err) {
    console.log(err);
  }
}

