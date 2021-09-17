export const URGENT = "urgent";
export const NORMAL = "normal";
export const HIGH = "high";

export default class Task {
  constructor(
    id = Math.random(),
    title,
    description,
    dateAdded = new Date(),
    dueDate = "N/A",
    priority = ""
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dateAdded = dateAdded;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}
