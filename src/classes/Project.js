export default class Project {
  constructor(title, id, tasks, dateCreated = new Date()) {
    this.title = title;
    this.id = id;
    this.tasks = tasks;
    this.dateCreated = dateCreated;
  }

  addTask = (task) => {
    this.tasks.push(task);
  };

  removeTask = (taskToRemove) => {
    this.tasks = task2.filter(task, () => task !== taskToRemove);
  };
}
