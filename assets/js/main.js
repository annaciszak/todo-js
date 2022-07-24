import { ToDo } from "./ToDo";
import { HTMLElements } from "./HTMLElements";

window.addEventListener("load", () => {
  const todo = new ToDo();

  todo.displayList();

  todo.tasks.forEach((task) => task.edit_mode == false);

  HTMLElements.add_btn.addEventListener("click", todo.addTask.bind(todo));
});
