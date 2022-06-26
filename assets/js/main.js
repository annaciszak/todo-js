import { ToDo } from "./ToDo";
import { HTMLElements } from "./HTMLElements";

window.addEventListener("load", () => {
  let todo = new ToDo();

  todo.display_list();

  HTMLElements.add_btn.addEventListener("click", todo.add_task.bind(todo));

  // window.addEventListener("click", function (e) {
  //   if (!document.querySelector("li.todo__list-item").contains(e.target)) {
  //     document.querySelector("input.task-text").setAttribute("readonly", true);
  //     document.querySelector("input.task-text").setAttribute("disabled", true);
  //   } else {
  //   }
  // });
});
