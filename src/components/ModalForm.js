import AddTaskForm from "./AddTaskForm";

const ModalForm = (taskToUpdate) => {
  const { addTaskForm } = AddTaskForm(false, taskToUpdate);
  const backdrop = document.createElement("div");
  backdrop.classList.add(
    "backdrop",
    "d-flex",
    "flex-column",
    "justify-content-center"
  );
  backdrop.setAttribute("id", "backdrop");

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
    "rounded"
  );
  formColumn.appendChild(addTaskForm);

  formContainer.appendChild(formColumn);

  document.body.style.overflow = "hidden";
  backdrop.appendChild(formContainer);
  backdrop.addEventListener("click", (e) => {
    if (e.target.id !== "backdrop") {
      return;
    }
    backdrop.remove();
    document.body.style.overflow = "scroll";
  });

  return { modalForm: backdrop };
};

export default ModalForm;
