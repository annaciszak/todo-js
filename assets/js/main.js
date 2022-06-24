import { ToDo } from "./ToDo";
import { HTMLElements } from "./HTMLElements";

window.addEventListener("load", () => {
  let todo = new ToDo();

  todo.display_list();

  HTMLElements.add_btn.addEventListener("click", todo.add_task.bind(todo));
});
