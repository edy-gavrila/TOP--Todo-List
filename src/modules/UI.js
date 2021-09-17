import AddProjectForm from "../components/AddProjectForm";
import LocalStorage from "./LocalStorage";

const UI = (() => {
  const sideBarButtons = document.querySelectorAll(".sidebar-btn");
  const addProjectButton = document.getElementById("add-project-button");
  const projectsContainer = document.getElementById("projects-container");
  const projectList = document.getElementById("project-list");
  const taskCardsContainer = document.getElementById("task-cards-container");
  const { addProjectForm } = AddProjectForm();

  let selectedProject = null;
  let projects = null;

  //side effect for button
  sideBarButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sideBarButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");
    });
  });

  //removes the add project form
  const removeAddProjectForm = () => {
    if (addProjectForm) {
      addProjectForm.remove();
    }
    if (addProjectButton) {
      addProjectButton.classList.remove("invisible");
    }
  };

  //displays the add project form
  const displayAddProjectForm = () => {
    addProjectButton.classList.add("invisible");
    projectsContainer.appendChild(addProjectForm);
    const cancelButton = document.getElementById("add-project-form-cancel");

    cancelButton.addEventListener("click", removeAddProjectForm);
  };

  addProjectButton.addEventListener("click", displayAddProjectForm);

  //load projects from local storage and display them in the sidebar
  const loadProjects = () => {
    projectList.innerHTML = "";
    projects = LocalStorage.loadProjectsFromLocalStorage();
    if (!projects) {
      return;
    }
    projects.forEach((project) => {
      const projectListItem = document.createElement("li");
      projectListItem.classList.add("project-list-item");
      projectListItem.innerHTML = `<i class="bi bi-list-check"></i>&nbsp;${project.title}<button class="delete-project-btn"><i class="bi bi-x"></i></button>`;
      projectListItem.addEventListener("click", () => {
        displayProject(project.id);
      });
      projectList.appendChild(projectListItem);
    });
    selectedProject = projects[0];
  };

  //display project details
  const displayProject = (id) => {
    if (!projects) {
      return;
    }
    const projectToDisplay = projects.find((el) => el.id === id);

    taskCardsContainer.innerHTML = `
    <div class="p-5">
    <h1>${projectToDisplay.title}</h1>
    </div>
    
    `;


  };

  const displayTasks = (tasks) => {};

  return { displayAddProjectForm, displayTasks, loadProjects };
})();

export default UI;
