import { HTMLElements } from "./HTMLElements";

export class ToDo {
  tasks = [];

  delete_task(e, task_id) {
    e.target.parentNode.parentNode.style.opacity = 0;
    setTimeout(() => {
      e.target.parentNode.parentNode.style.display = "none";
    }, 450);

    this.tasks = this.tasks.filter((element) => element.id != task_id);
  }

  edit_task(e, task) {
    const task_input = e.target.parentNode.parentNode.children[1];
    e.target.classList.toggle("fa-edit");
    e.target.classList.toggle("fa-save");
    // HTMLElements.input.value = HTMLElements.li.innerText;
    if (task.edit_mode) {
      task_input.removeAttribute("readonly");
      task_input.removeAttribute("disabled");
      task_input.focus();
    } else {
      task_input.setAttribute("readonly", true);
      task_input.setAttribute("disabled", true);
    }
    task.value = task_input.value;
  }

  add_task(e) {
    if (HTMLElements.input.value != "") {
      this.tasks.unshift({
        value: HTMLElements.input.value,
        done: false,
        edit_mode: false,
        id: Date.now(),
      });
    }
    e.preventDefault();
    this.display_list();
  }

  display_list() {
    const list = document.getElementsByClassName("todo__list")[0];
    list.innerHTML = "";

    for (let task of this.tasks) {
      const li = document.createElement("li");
      const btn_group = document.createElement("span");
      btn_group.classList.add("btn_group");
      const checkmark = document.createElement("i");

      const task_input = document.createElement("input");
      task_input.classList.add("task-text");
      task_input.setAttribute("value", task.value);
      task_input.setAttribute("type", "text");
      task_input.setAttribute("readonly", true);
      task_input.setAttribute("disabled", true);

      if (task.done) {
        checkmark.classList.add("checkmark", "far", "fa-check-circle", "done");
        li.classList.add("done-item");
        task_input.classList.add("done_task-text");
      } else {
        checkmark.classList.add("checkmark", "far", "fa-circle");
      }

      li.addEventListener("click", (e) => {
        if (
          (e.target == e.currentTarget ||
            e.target == li.firstChild ||
            e.target == li.children[1]) &&
          !task.edit_mode
        ) {
          li.classList.toggle("done-item");
          checkmark.classList.toggle("fa-check-circle");
          checkmark.classList.toggle("fa-circle");
          li.firstChild.classList.toggle("done");
          task_input.classList.toggle("done_task-text");
          task.done = !task.done;
        }
      });

      const delete_btn = document.createElement("i");
      delete_btn.classList.add("fas", "fa-trash", "trash");

      delete_btn.addEventListener("click", (e) => this.delete_task(e, task.id));

      const edit_btn = document.createElement("i");
      edit_btn.classList.add("fas", "fa-edit", "edit");

      edit_btn.addEventListener("click", (e) => {
        task.edit_mode = !task.edit_mode;
        this.edit_task(e, task);
      });

      btn_group.appendChild(delete_btn);
      btn_group.appendChild(edit_btn);
      li.appendChild(checkmark);
      li.appendChild(task_input);
      li.appendChild(btn_group);
      li.classList.add("todo__list-item");
      list.appendChild(li);
    }
    HTMLElements.input.value = "";
  }
}

console.log("dupa");
