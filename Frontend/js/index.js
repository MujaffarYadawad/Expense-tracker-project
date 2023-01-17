 
const token = localStorage.getItem("token");

function saveToLocalStorage(event) {
  event.preventDefault();
  const expenseAmount = event.target.expenseAmount.value;
  const expenseDescription = event.target.expenseDescription.value;
  const category = event.target.category.value;

  const obj = {
    expenseAmount,
    expenseDescription,
    category,
  };
  axios
    .post("http://localhost:3000/expense/postExpenses", obj ,{headers:{'Authorization':token}})
    .then((res) => {
      showItemsOnScreen(res.data);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

function showLeaderboard() {
 // console.log('ssha')
  const inputElement = document.createElement('button')
  
  //inputElement.type = "button";
  inputElement.textContent = "Show Leaderboard";
  document.getElementById("leaderboard").appendChild(inputElement);
  inputElement.onclick =  async () => {
   // const token = localStorage.getItem("token");
    const userLeaderBoardArray = await axios.get("http://localhost:3000/premium/showLeaderboard",{ headers: { Authorization: token } }
    )
    //console.log("userLeader->>",userLeaderBoardArray);
    console.log("showLeaderBoard-->>");
    var leaderboardElem = document.getElementById("leaderboard")
    leaderboardElem.innerHTML += `<h1>Leader Board<h1>`
    userLeaderBoardArray.data.forEach((userDetails) => {
      leaderboardElem.innerHTML += `<li> Name -  ${userDetails.name} Total Expense - ${userDetails.total_cost} </li>`;
    })
    
  };
}
function showPremiuMessage() {
  document.getElementById("rzp-btn").style.visibility = "hidden";
  document.getElementById("message").innerHTML = "You are a premium user";
//  const child = document.getElementById("rzp-btn")
//   const parent = document.getElementById("message") 
//   parent.removeChild(child)
}
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
 

window.addEventListener("DOMContentLoaded", () => {

  // premium  user 
  const isadmin = localStorage.getItem('isadmin')
  const decodeToken = parseJwt(token)

 // console.log('decodeToken-->',decodeToken)

  const ispremiumuser = decodeToken.ispremiumuser
  if(ispremiumuser){
    showPremiuMessage()
    showLeaderboard()
    download()

  }
  // getting expenses
  axios.get("http://localhost:3000/expense/getExpenses", {headers:{'Authorization':token}})
    .then((res) => {
      for (var i = 0; i < res.data.length; i++) {
        showItemsOnScreen(res.data[i]);
      }
      console.log(res);
    })
    .catch((err) => console.log(err));
});

function showItemsOnScreen(item) {
  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseDescription").value = "";
  document.getElementById("category").value = "";

  const parentNode = document.getElementById("listOfItems");
  const childHTML = `<li id=${item.id}> ${item.expenseAmount} - ${item.expenseDescription} - ${item.category} 
                        <button onclick=deleteItem('${item.id}')>Delete</button>
                        <button onclick=editItem('${item.expenseAmount}','${item.expenseDescription}','${item.category}','${item.id}')>Edit</button>
  </li>`;

  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function editItem(expenseAmount, expenseDescription, category, itemId) {
  document.getElementById("expenseAmount").value = expenseAmount;
  document.getElementById("expenseDescription").value = expenseDescription;
  document.getElementById("category").value = category;

  deleteItem(itemId);
}

function deleteItem(itemId) {
  axios.delete(`http://localhost:3000/expense/deleteExpenses/${itemId}`, {headers:{'Authorization':token}})

    .then((res) => {
      removeFromScreen(itemId);
    })
    .catch((err) => console.log(err));
}

function removeFromScreen(itemId) {
  const parentNode = document.getElementById("listOfItems");
  const childNodeToBeDeleted = document.getElementById(itemId);

  parentNode.removeChild(childNodeToBeDeleted);
}
 async function download() {
  try {
    //console.log("dowload report");
    const response = await axios.get("http://localhost:3000/user/download", {headers: { Authorization: token }});

    if (response.status === 201) {
      //the bcakend is essentially sending a download link
      //  which if we open in browser, the file would download
      var a = document.createElement("a");
      a.href = response.data.fileUrl;
      a.download = "myexpense.csv";
      a.click();
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

document.getElementById("rzp-btn").onclick = async function(e) {
  response = await axios.get('http://localhost:3000/purchase/premiumMembership', {headers:{'Authorization':token}})
  console.log(response)
  var options = {
    "key": response.data.key_id, // Enter the key id generated from dashboard
    "order_id": response.data.order.id, //for one timef payment
    "prefill": {
      "name": "Test User",
      "email": "test.user@example.com",
      "contact": "9999999999",
    },

    "handler": 
    async function (response) { 
      await axios.post("http://localhost:3000/purchase/updateTransactonStatus",{

            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          },
          { headers: { Authorization: token } }
        )
        
          alert("You are a Premiem User Now");
          
          
           document.getElementById("rzp-btn").style.visibility = "hidden";
           document.getElementById("message").innerHTML = "You are a premium user";
           console.log("pp user");
           localStorage.setItem('isadmin', true)
           showLeaderboard();
           download();
         
        
    },
  };

  const rzp1 = new Razorpay(options);
  rzp1.open();

  e.preventDefault();

  rzp1.on("paynemet.failed", function (response) {
    console.log(response);
    alert("something went wrong");
  });

};


