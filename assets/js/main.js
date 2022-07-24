import { ToDo } from "./ToDo";
import { HTMLElements } from "./HTMLElements";

window.addEventListener("load", () => {
  const todo = new ToDo();

  todo.displayList();

  HTMLElements.add_btn.addEventListener("click", todo.addTask.bind(todo));
});
