/**
 * @typedef {{
 *  target: object,
 *  currentTarget: object
 * }} MouseEventParams
 */

import { HTMLElements } from "./HTMLElements";
import { MyLocalStorage } from "./MyLocalStorage";

export class ToDo {
  /**
   * @constructor
   */
  constructor() {
    this.tasks = [];
    this.edit_target = null;
    this.localStorage = new MyLocalStorage();
  }

  /**
   * Delete the task from todo list.
   * @listens document#mousedown
   * @param {document#event:mousedown} e
   * @param {number} task_id - The task id.
   */
  deleteTask(e, task_id) {
    const { parentNode } = e.target.parentNode;
    parentNode.style.opacity = 0;
    setTimeout(() => {
      parentNode.style.display = "none";
      this.displayList();
    }, 400);

    this.tasks = this.tasks.filter((element) => element.id != task_id);

    this.localStorage.setTasks(this.tasks);
  }

  /**
   * Toggle edit mode by Event.
   * @param {Object} e - Pointer event from clicking Save icon.
   */
  toggleEditIcon(element) {
    element.classList.toggle("fa-edit");
    element.classList.toggle("fa-save");
  }

  /**
   * Toggle edit mode by clicking Save icon.
   * @param {Object} e - Pointer event from clicking save icon.
   * @param {Object} task - The task being edited.
   */
  toggleEditMode(element, task) {
    const task_input = element;
    if (task.edit_mode) {
      task_input.removeAttribute("readonly");
      task_input.removeAttribute("disabled");
      task_input.focus();
    } else {
      task_input.setAttribute("readonly", true);
      task_input.setAttribute("disabled", true);
    }
    task.value = task_input.value;
    this.localStorage.setTasks(this.tasks);
  }

  /**
   * Add new task to list.
   * @param {Object} e - Pointer event from clicking on Add button.
   */
  addTask(e) {
    if (HTMLElements.input.value != "") {
      let localItems = this.localStorage.getTasks();
      if (localItems == null) {
        this.tasks = [];
      } else {
        this.tasks = localItems;
      }
      this.tasks.unshift({
        value: HTMLElements.input.value,
        done: false,
        edit_mode: false,
        id: Date.now(),
      });
      this.localStorage.setTasks(this.tasks);
    }
    e.preventDefault();
    this.displayList();
  }

  /**
   * Displays list of tasks.
   */
  displayList() {
    const list = document.querySelector("ul.todo__list");
    list.innerHTML = "";
    let localItems = this.localStorage.getTasks();
    if (localItems == null) {
      this.tasks = [];
    } else {
      this.tasks = localItems;
    }

    for (let task of this.tasks) {
      const li = document.createElement("li");
      const btn_group = document.createElement("span");
      btn_group.classList.add("btn_group");
      const checkmark = document.createElement("i");

      const task_input = document.createElement("input");
      task_input.classList.add("task-text");
      task_input.setAttribute("value", task.value);
      task_input.setAttribute("type", "text");
      task_input.setAttribute("data-cy", "task__text");
      task_input.setAttribute("readonly", true);
      task_input.setAttribute("disabled", true);
      task_input.onblur = (e) => {
        task.edit_mode = false;
        this.edit_target = null;
        this.toggleEditIcon(e.target.parentNode.children[2].children[1]);
        this.toggleEditMode(e.target, task);
      };

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
          if (!task.done) {
            checkmark.classList.add("fa-check-circle");
            checkmark.classList.remove("fa-circle");
          } else {
            checkmark.classList.remove("fa-check-circle");
            checkmark.classList.add("fa-circle");
          }
          li.classList.toggle("done-item");
          li.firstChild.classList.toggle("done");
          task_input.classList.toggle("done_task-text");
          task.done = !task.done;
        }
        this.localStorage.setTasks(this.tasks);
      });

      li.addEventListener("mouseenter", (e) => {
        if (!task.done) {
          checkmark.classList.add("fa-check-circle");
          checkmark.classList.remove("fa-circle");
        }
      });

      li.addEventListener("mouseleave", (e) => {
        if (!task.done) {
          checkmark.classList.remove("fa-check-circle");
          checkmark.classList.add("fa-circle");
        }
      });

      const delete_btn = document.createElement("i");
      delete_btn.classList.add("fas", "fa-trash", "trash");
      delete_btn.setAttribute("data-cy", "trash__icon");

      delete_btn.addEventListener("click", (e) => this.deleteTask(e, task.id));

      const edit_btn = document.createElement("i");
      edit_btn.classList.add("fas", "fa-edit", "edit");

      edit_btn.addEventListener("click", (e) => {
        if (!task.done) {
          if (e.target == this.edit_target) {
            task.edit_mode = false;
            this.edit_target = null;
            this.toggleEditIcon(e.target);
            this.toggleEditMode(
              e.target.parentNode.parentNode.children[1],
              task
            );
          } else if (this.edit_target == null) {
            task.edit_mode = true;
            this.edit_target = e.target;
            this.toggleEditIcon(e.target);
            this.toggleEditMode(
              e.target.parentNode.parentNode.children[1],
              task
            );
          }
        }
      });

      task_input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          task.edit_mode = !task.edit_mode;
          this.toggleEditIcon(e.target.parentNode.children[2].children[1]);
          this.toggleEditMode(e.target, task);
        }
      });

      btn_group.appendChild(delete_btn);
      btn_group.appendChild(edit_btn);
      li.appendChild(checkmark);
      li.appendChild(task_input);
      li.appendChild(btn_group);
      li.classList.add("todo__list-item");
      li.setAttribute("data-cy", "todo__list-item");
      list.appendChild(li);
    }
    HTMLElements.input.value = "";
  }
}
