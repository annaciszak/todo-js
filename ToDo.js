import { HTMLElements } from "./HTMLElements";

export class ToDo {
  tasks = [];

  delete_task(e, task_id) {
    e.target.parentNode.parentNode.style.opacity = 0;
    setTimeout(() => {
      e.target.parentNode.parentNode.style.display = "none";
    }, 450);

    this.tasks = this.tasks.filter((element) => element.id != task_id);
    console.log(this.tasks);
  }

  edit_task(task) {
    task.edit_mode = true;
    HTMLElements.input.value = HTMLElements.li.innerText;
    HTMLElements.add_btn.value = "Save";
  }

  add_task() {
    if (HTMLElements.input.value != "") {
      this.tasks.unshift({
        value: HTMLElements.input.value,
        done: false,
        edit_mode: false,
        id: Date.now(),
      });
    }
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

      if (task.done) {
        checkmark.classList.add("checkmark", "far", "fa-check-circle", "done");
        li.classList.add("done-item");
      } else {
        checkmark.classList.add("checkmark", "far", "fa-circle");
      }

      const task_text = document.createElement("span");
      task_text.classList.add("task-text");
      task_text.innerText = task.value;

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
          task.done = !task.done;
        }
      });

      const delete_btn = document.createElement("i");
      delete_btn.classList.add("fas", "fa-trash", "trash");

      delete_btn.addEventListener("click", (e) => this.delete_task(e, task.id));

      const edit_btn = document.createElement("i");
      edit_btn.classList.add("fas", "fa-edit", "edit");

      edit_btn.addEventListener("click", (e) => this.edit_task(task));

      btn_group.appendChild(delete_btn);
      btn_group.appendChild(edit_btn);
      li.appendChild(checkmark);
      li.appendChild(task_text);
      li.appendChild(btn_group);
      li.classList.add("todo__list-item");
      list.appendChild(li);
    }
    HTMLElements.input.value = "";
  }
}

console.log("dupa");
