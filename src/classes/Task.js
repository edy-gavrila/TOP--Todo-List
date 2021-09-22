export default class Task {
  constructor(
    title,
    description,
    dueDate,
    priority,
    id,
    dateAdded = Date.now()
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    if (id) {
      this.id = id;
    } else {
      this.id = Math.random();
    }
    this.dateAdded = dateAdded;
    this.completed = false;
    this.projectId = null;
  }
  markCompleted = () => {
    this.completed = true;
  };
  markNotCompleted = () => {
    this.completed = false;
  };
}
