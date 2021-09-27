import UI from "../modules/UI";
import Task from "../classes/Task";
import LocalStorage from "../modules/LocalStorage";
import { format, getHours, getMinutes, setHours, setMinutes } from "date-fns";

const AddTaskForm = (displayTitle, taskToUpdate) => {
  //set up the data if we are updating a task
  let hours;
  let minutes;
  let dateInputValue;
  let timeInputValue = "";
  let priority;
  if (taskToUpdate) {
    dateInputValue = format(new Date(taskToUpdate.dueDate), "yyyy'-'MM'-'dd");
    hours = getHours(new Date(taskToUpdate.dueDate));
    hours = hours < 10 ? "0" + hours : hours;
    minutes = getMinutes(new Date(taskToUpdate.dueDate));
    minutes = minutes < 10 ? "0" + minutes : minutes;
    timeInputValue = hours + ":" + minutes;
    priority = taskToUpdate.priority;
  }

  const addTaskForm = document.createElement("form");
  addTaskForm.innerHTML = `
  ${displayTitle ? "<h4>Add New Task</h4>" : ""}
  <div class=" form-floating mb-3">
    <input type="text" class="form-control" id="taskTitle" minlength="5" placeholder = "My Task" value = "${
      taskToUpdate ? taskToUpdate.title : ""
    }" required>
    <label for="taskTitle" class="form-label">Task Title</label>
    <div  class="form-text">Please enter a descriptive name.</div>
  </div>

  <div class="form-floating mb-3">
    <textarea class="form-control" id="taskDescription" minlength="5" placeholder="Please enter a description" style="height: 100px" required >${
      taskToUpdate ? taskToUpdate.description : ""
    }</textarea>
    <label for="taskDescription" class="form-label">Task Description</label>
  </div>
 <div class="row">
  <div class="form-floating mb-3 col">
    <input type="date" class="form-control" id="dueDate"  value = "${
      taskToUpdate ? dateInputValue : ""
    }" placeholder="Enter a date" required>
    <label for = "dueDate" class="form-label">Due Date</label>
  </div>
  <div class=" form-floating mb-3 col">
    <input type="time" class="form-control" placeholder = "Enter a time" id="dueTime" value="${timeInputValue}" required>
    <label for="dueTime" class="form-label">Due Time</label>
  </div>
 </div>

  <label>Priority</label>
  <div class="mb-3">
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="priorityOptions"  id="high" value="high" ${
          !priority || priority === "high" ? "checked" : ""
        }>
        <label class="form-check-label text-danger" for="high">High</label>
      </div>
      <div class="form-check form-check-inline">
         <input class="form-check-input" type="radio" name="priorityOptions"     id="medium" value="medium" ${
           priority === "medium" ? "checked" : ""
         }>
        <label class="form-check-label text-warning" for="medium">Medium</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="priorityOptions"    id="low" value="low" ${
          priority === "low" ? "checked" : ""
        }>
        <label class="form-check-label text-success" for="low">Low</label>
      </div>
  </div>

  <div>
    <button type="submit" class="btn btn-dark me-3 id="submit-add-task-form">Submit</button>
    <button type="button" class="btn btn-light" id = "cancel-add-task-form">Cancel</button>
  </div>
    `;

  addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskTitleInput = document.getElementById("taskTitle");
    const taskDescriptionInput = document.getElementById("taskDescription");
    const taskDueDateInput = document.getElementById("dueDate");
    const taskDueTimeInput = document.getElementById("dueTime");

    const priorityRadios = document.querySelectorAll(
      "input[name=priorityOptions]"
    );

    const newTaskTitle = taskTitleInput.value;
    const newTaskDescription = taskDescriptionInput.value;
    const newTaskDueDate = taskDueDateInput.value;
    const newTaskDueTime = taskDueTimeInput.value;
    const timeArray = newTaskDueTime.split(":");
    let newTaskDueDateTime = setHours(new Date(newTaskDueDate), +timeArray[0]);
    newTaskDueDateTime = setMinutes(
      new Date(newTaskDueDateTime),
      +timeArray[1]
    );
    let newTaskPriority;
    priorityRadios.forEach((radio) => {
      if (radio.checked) {
        newTaskPriority = radio.value;
      }
    });

    const newTask = new Task(
      newTaskTitle,
      newTaskDescription,
      newTaskDueDateTime,
      newTaskPriority
    );

    if (!taskToUpdate) {
      LocalStorage.addTaskToProject(UI.getSelectedProject(), newTask);
    } else {
      newTask.id = taskToUpdate.id;
      newTask.dateAdded = taskToUpdate.dateAdded;
      newTask.projectId = taskToUpdate.projectId;
      LocalStorage.updateTask(newTask);

      //remove the backdrop
      const backdropEl = document.getElementById("backdrop");
      if (backdropEl) {
        backdropEl.remove();
        document.body.style.overflowY = "auto";
      }
    }

    UI.updateSelectedProject();
    UI.displayProject(UI.getSelectedProject());

    taskTitleInput.value = "";
    taskDescriptionInput.value = "";
    taskDueDateInput.value = "";
    taskDueTimeInput.value = "";
    priorityRadios[0].checked = true;
  });

  return { addTaskForm };
};

export default AddTaskForm;
