import AddProjectForm from "./AddProjectForm";
import Backdrop from "./Backdrop";

const AddProjectModal = () => {
  const { backdrop } = Backdrop();
  document.body.style.overflow = "hidden";
  const { addProjectForm } = AddProjectForm();

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
  formColumn.appendChild(addProjectForm);

  formContainer.appendChild(formColumn);
  backdrop.appendChild(formContainer);

  return { addProjectModal: backdrop };
};
export default AddProjectModal;
