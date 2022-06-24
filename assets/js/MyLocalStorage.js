export class MyLocalStorage {
  set_tasks(tasks) {
    localStorage.setItem("localTasks", JSON.stringify(tasks));
  }

  get_tasks() {
    return JSON.parse(localStorage.getItem("localTasks"));
  }
}
