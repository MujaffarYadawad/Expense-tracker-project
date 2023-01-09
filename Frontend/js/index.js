function saveToLocalStorage(event){
  event.preventDefault();
   const expenseAmount = event.target.expenseAmount.value;
   const expenseDescription = event.target.expenseDescription.value;
   const category = event.target.category.value;

   const obj = {
   expenseAmount,
   expenseDescription,
   category
   }
    axios.post("http://localhost:3000/expense/postExpenses",obj)
    .then((res) => {
      showItemsOnScreen(res.data);
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
    
}
  
  window.addEventListener("DOMContentLoaded", () => {
   axios.get("http://localhost:3000/expense/getExpenses")
   .then((res) => {
    for(var i=0; i<res.data.length; i++){
      showItemsOnScreen(res.data[i]) 
    }
    console.log(res)
  })
  .catch((err) => console.log(err))

})

function showItemsOnScreen(item) {

  document.getElementById('expenseAmount').value ='';
  document.getElementById('expenseDescription').value ='';
  document.getElementById('category').value ='';

 
  const parentNode = document.getElementById('listOfItems');
  const childHTML = `<li id=${item.id}> ${item.expenseAmount} - ${item.expenseDescription} - ${item.category} 
                        <button onclick=deleteItem('${item.id}')>Delete</button>
                        <button onclick=editItem('${item.expenseAmount}','${item.expenseDescription}','${item.category}','${item.id}')>Edit</button>
  </li>`
                 
  parentNode.innerHTML = parentNode.innerHTML + childHTML

}

function editItem(expenseAmount,expenseDescription,category,itemId){
  
document.getElementById('expenseAmount').value = expenseAmount;
document.getElementById('expenseDescription').value = expenseDescription;
document.getElementById('category').value = category;

deleteItem(itemId)
}

function deleteItem(itemId) {
   
  axios.delete(`http://localhost:3000/expense/deleteExpenses/${itemId}`)
  
  .then((res) => {
     removeFromScreen(itemId)
  })
  .catch((err) => console.log(err))
}

function removeFromScreen(itemId) {
  const parentNode = document.getElementById('listOfItems')
  const childNodeToBeDeleted = document.getElementById(itemId);
   
  parentNode.removeChild(childNodeToBeDeleted)
}