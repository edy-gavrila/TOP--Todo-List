import { differenceInHours, format, intervalToDuration } from "date-fns";
import LocalStorage from "../modules/LocalStorage";
import UI from "../modules/UI";
import AddTaskForm from "./AddTaskForm";
import ModalForm from "./ModalForm";

const TaskCard = (task, number) => {
  const formattedDateAdded = format(
    new Date(task.dateAdded),
    "'+' dd/LL/yy ',' HH:mm "
  );

  const taskCard = document.createElement("div");
  taskCard.classList.add("task-card", "my-3", `card-priority-${task.priority}`);

  let hoursLeft = differenceInHours(new Date(task.dueDate), Date.now());

  if (hoursLeft <= 0) {
    hoursLeft = "Overdue";
  } else {
    hoursLeft += " Hrs";
  }

  if (task.completed) {
    hoursLeft = "Completed";
  }

  taskCard.innerHTML = `
  ${task.completed ? "<i class='bi bi-check-lg task-completed-mark'></i>" : ""}
  <h1 class="task-number">#${number + 1} ${task.title}</h1>
  <div class="card-divider card-priority-${task.priority}"></div>
  <p class="task-text">${task.description}</p>
  <div class="d-flex justify-content-end">
  <h2 class="info-bubble">${hoursLeft}</h2>
  </div>
  `;

  //task details elements
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "p-3"
  );
  detailsContainer.innerHTML = `
  <div class="info-bubble card-priority-${task.priority}">${formattedDateAdded}</div>
  `;
  const markTaskCompletedBtn = document.createElement("button");
  markTaskCompletedBtn.classList.add(
    "btn",
    "btn-outline-light",
    "task-completed-btn"
  );
  markTaskCompletedBtn.innerHTML = !task.completed
    ? "Completed"
    : "Not Completed";
  markTaskCompletedBtn.addEventListener("click", () => {
    if (!task.completed) {
      task.markCompleted();
    } else {
      task.markNotCompleted();
    }
    LocalStorage.updateTask(task);
    UI.displayProject(UI.getSelectedProject());
  });
  detailsContainer.appendChild(markTaskCompletedBtn);

  taskCard.appendChild(detailsContainer);

  //delete task button
  const deleteTaskBtn = document.createElement("button");
  deleteTaskBtn.classList.add("delete-task-btn");
  deleteTaskBtn.innerHTML = "<i class='bi bi-trash'></i>";

  deleteTaskBtn.addEventListener("click", () => {
    LocalStorage.deleteTask(task);
    UI.updateSelectedProject();
    UI.displayProject(UI.getSelectedProject());
  });
  taskCard.appendChild(deleteTaskBtn);

  //edit task button
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-task-btn");
  editBtn.innerHTML = "<i class='bi bi-pencil-square'></i>";
  editBtn.addEventListener("click", () => {
    UI.displayFormModal(task);
  });

  taskCard.appendChild(editBtn);

  return { taskCard };
};

export default TaskCard;
