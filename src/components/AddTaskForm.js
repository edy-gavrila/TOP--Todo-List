import UI from "../modules/UI";

const AddTaskForm = () => {
  const addTaskForm = document.createElement("form");
  addTaskForm.innerHTML = `
  <div class=" form-floating mb-3">
    <input type="text" class="form-control" id="taskTitle" minlength="5" placeholder = "My Task">
    <label for="taskTitle" class="form-label">Task Title</label>
    <div  class="form-text">Please enter a descriptive name.</div>
  </div>

  <div class="form-floating mb-3">
    <textarea class="form-control" id="taskDescription" minlength="5" placeholder="Please enter a description" style="height: 100px" ></textarea>
    <label for="taskDescription" class="form-label">Task Description</label>
  </div>

  <div class="form-floating mb-3">
    <input type="date" class="form-control" id="dueDate"  placeholder="Enter a date" >
    <label for = "dueDate" class="form-label" >Due Date</label>
  </div>

  <label>Priority</label>
  <div class="mb-3">
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="priorityOptions"  id="high" value="high" checked>
        <label class="form-check-label text-danger" for="high">High</label>
      </div>
      <div class="form-check form-check-inline">
         <input class="form-check-input" type="radio" name="priorityOptions"     id="medium" value="medium">
        <label class="form-check-label text-warning" for="medium">Medium</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="priorityOptions"    id="inlineRadio3" value="low">
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
    console.log("Adding task...");
    console.log(UI.getSelectedProject());
  });

  return { addTaskForm };
};

export default AddTaskForm;
