import AddTaskForm from "./AddTaskForm";
import Backdrop from "./Backdrop";

const EditTaskModalForm = (taskToUpdate) => {
  const { addTaskForm } = AddTaskForm(false, taskToUpdate);
  const { backdrop } = Backdrop();

  const formContainer = document.createElement("div");
  formContainer.classList.add(
    "container-fluid",
    "row",
    "justify-content-center",
    "m-0"
  );

  const formColumn = document.createElement("div");
  formColumn.classList.add(
    "col",
    "col-md-9",
    "col-lg-6",
    "modal-form-card",
    "p-3",
    "m-0",
    "rounded"
  );
  formColumn.appendChild(addTaskForm);

  formContainer.appendChild(formColumn);
  backdrop.appendChild(formContainer);
  

  return { editTaskModalForm: backdrop };
};

export default EditTaskModalForm;
