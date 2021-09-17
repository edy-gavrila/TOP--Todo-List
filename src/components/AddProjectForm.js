import Project from "../classes/Project";
import LocalStorage from "../modules/LocalStorage";
import UI from "../modules/UI";

const AddProjectForm = () => {
  const addProjectForm = document.createElement("form");
  addProjectForm.classList.add("needs-validation");

  addProjectForm.innerHTML = `
<div class="mb-3">
    <label for="projectTitle" class="form-label">Project Title</label>
    <input type = "text" class ="form-control" minlength = "3" id = "projectTitle" required>
    <div class="invalid-feedback">
      Please choose a username.
    </div>
    <div class = "form-text">Min 3 characters long</div>
</div>
<div class="row g-3 align-itmes-center">
    <button type="submit" class="btn btn-dark" >Create</button>
    <button type="button" class="btn btn-light" id = "add-project-form-cancel">Cancel</button>
</div>

`;

  addProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Submitting");
    const projectTitleInput = document.getElementById("projectTitle");
    const newProjectTitle = projectTitleInput.value;

    const projectToAdd = new Project(newProjectTitle);
    LocalStorage.addProjectToLocalStorage(projectToAdd);

    UI.loadProjects();
  });

  return { addProjectForm };
};

export default AddProjectForm;
