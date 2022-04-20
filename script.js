window.addEventListener("load", () => {
  const add_btn = document.getElementById("add_task_button");
  let input = document.getElementById("todo_input");
  let todo_array = {};
  let edit_mode = false;
  let edited_task_id = 0;

  function display_list() {
    const list = document.getElementsByClassName("todo__list")[0];
    list.innerHTML = "";

    for (const [key, value] of Object.entries(todo_array)) {
      const li = document.createElement("li");

      li.addEventListener("click", (e) => {
        if (e.target == e.currentTarget) {
          li.classList.toggle("done");
          value.done = !value.done;
        }
      });

      const delete_btn = document.createElement("i");
      delete_btn.classList.add("fas", "fa-trash", "trash");

      delete_btn.addEventListener("click", () => {
        delete todo_array[key];
        delete_btn.parentNode.remove();
      });

      const edit_btn = document.createElement("i");
      edit_btn.classList.add("fas", "fa-edit", "edit");

      edit_btn.addEventListener("click", () => {
        edit_mode = true;
        edited_task_id = key;
        input.value = li.innerText;
        add_btn.value = "Save";
      });

      li.innerHTML = value.value;
      li.appendChild(delete_btn);
      li.appendChild(edit_btn);
      li.classList.add("todo__list-item");
      list.appendChild(li);
    }
    document.getElementById("todo_input").value = "";
  }

  add_btn.addEventListener("click", () => {
    if (edit_mode) {
      const edited_task = todo_array[edited_task_id];
      edited_task.value = input.value;
      edit_mode = false;
      add_btn.value = "Add";
    } else {
      const new_task = document.getElementById("todo_input").value;
      todo_array[Date.now()] = { value: new_task, done: false };
    }
    display_list();
  });
});
