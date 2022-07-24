export class MyLocalStorage {
  /**
   * Set tasks saved in local storage.
   * @param {Object[]} tasks - List of tasks to save in local storage.
   */
  setTasks(tasks) {
    localStorage.setItem("localTasks", JSON.stringify(tasks));
  }

  /**
   * Get tasks from local storage.
   */
  getTasks() {
    return JSON.parse(localStorage.getItem("localTasks"));
  }
}
