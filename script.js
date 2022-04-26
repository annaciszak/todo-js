window.addEventListener("load", () => {
  const add_btn = document.getElementById("add_task_button");
  let input = document.getElementById("todo_input");
  let todo_array = {};
  todo_array[Date.now()] = {
    value: "Zrobić zakupy",
    done: false,
    deleted: false,
  };
  todo_array[Date.now() + 10] = {
    value: "Posprzątać w kuchni",
    done: false,
    deleted: false,
  };

  display_list();

  let edit_mode = false;
  let edited_task_id = 0;

  function display_list() {
    const list = document.getElementsByClassName("todo__list")[0];
    list.innerHTML = "";

    for (const [key, value] of Object.entries(todo_array)) {
      if (!value.deleted) {
        const li = document.createElement("li");
        const btn_group = document.createElement("span");
        btn_group.classList.add("btn_group");

        const checkmark = document.createElement("i");
        checkmark.classList.add("checkmark", "far", "fa-circle");

        const task_text = document.createElement("span");
        task_text.classList.add("task-text");
        task_text.innerText = value.value;

        li.addEventListener("click", (e) => {
          if (
            e.target == e.currentTarget ||
            e.target == li.firstChild ||
            e.target == li.children[1]
          ) {
            li.classList.toggle("done-item");
            checkmark.classList.toggle("fa-check-circle");
            checkmark.classList.toggle("fa-circle");
            li.firstChild.classList.toggle("done");
            value.done = !value.done;
          }
        });

        const delete_btn = document.createElement("i");
        delete_btn.classList.add("fas", "fa-trash", "trash");

        delete_btn.addEventListener("click", (e) => {
          e.target.parentNode.parentNode.style.opacity = 0;
          setTimeout(() => {
            e.target.parentNode.parentNode.style.display = "none";
          }, 450);
          value.deleted = true;
        });

        const edit_btn = document.createElement("i");
        edit_btn.classList.add("fas", "fa-edit", "edit");

        edit_btn.addEventListener("click", () => {
          edit_mode = true;
          edited_task_id = key;
          input.value = li.innerText;
          add_btn.value = "Save";
        });

        btn_group.appendChild(delete_btn);
        btn_group.appendChild(edit_btn);
        li.appendChild(checkmark);
        li.appendChild(task_text);
        li.appendChild(btn_group);
        li.classList.add("todo__list-item");
        list.appendChild(li);
      }
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
      todo_array[Date.now()] = { value: new_task, done: false, deleted: false };
    }
    display_list();
  });
});
