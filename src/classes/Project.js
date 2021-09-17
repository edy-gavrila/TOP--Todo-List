export default class Project {
  constructor(title, id, tasks, dateCreated = new Date()) {
    this.title = title;
    if (id) {
      this.id = id;
    } else {
      this.id = Math.random();
    }
    if (tasks) {
      this.tasks = tasks;
    } else {
      this.tasks = [];
    }
    this.dateCreated = dateCreated;
  }

  addTask = (task) => {
    this.tasks.push(task);
  };

  removeTask = (taskToRemove) => {
    this.tasks = task2.filter(task, () => task !== taskToRemove);
  };
}
