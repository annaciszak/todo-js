function add() {
  let new_task = document.getElementsByClassName("todo__input")[0].value;
  let list = document.getElementsByClassName("todo__list")[0];
  let li = document.createElement("li");
  li.innerHTML = new_task;
  list.appendChild(li);
  document.getElementById("todo").value = "";
}

// function displayToDoList(){
//   // for(let item in doto_list){
//   doto_list.forEach(function(item){
//     let task = document.createElement("li");
//     list.appendChild(task);
//     task.innerHTML = item;

//   });
// }
