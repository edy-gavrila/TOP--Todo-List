import AddProjectForm from "../components/AddProjectForm";
import LocalStorage from "./LocalStorage";
import ProjectList from "../components/ProjectList";
import AddTaskForm from "../components/AddTaskForm";

const UI = (() => {
  const sideBarButtons = document.querySelectorAll(".sidebar-btn");
  const addProjectButton = document.getElementById("add-project-button");
  const projectsContainer = document.getElementById("projects-container");
  const projectListContainer = document.getElementById(
    "project-list-container"
  );
  const taskCardsContainer = document.getElementById("task-cards-container");
  const { addProjectForm } = AddProjectForm();
  const { addTaskForm } = AddTaskForm();

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

  //removes the add task form
  const removeAddTaskForm = () => {
    if (addTaskForm) {
      addTaskForm.remove();
    }
    const addTaskButton = document.querySelector(".add-task-btn");
    if (addTaskButton) {
      addTaskButton.classList.remove("invisible");
    }
  };

  //displays the add project form
  const displayAddProjectForm = () => {
    addProjectButton.classList.add("invisible");
    projectsContainer.appendChild(addProjectForm);
    const cancelButton = document.getElementById("add-project-form-cancel");

    cancelButton.addEventListener("click", removeAddProjectForm);
  };

  //load projects from local storage and display them in the sidebar
  const loadProjects = () => {
    projectListContainer.innerHTML = "";
    projects = LocalStorage.loadProjectsFromLocalStorage();
    const { projectList } = ProjectList(projects);
    projectListContainer.appendChild(projectList);
  };

  //display project details
  const displayProject = (project) => {
    if (!project) {
      return;
    }
    selectedProject = project;
    taskCardsContainer.innerHTML = `
    <div >
      <h1 class="mb-0">${project.title}</h1> 
      <small>Date Created: ${project.dateCreated}</small>

    </div>
    `;
    const addTaskButton = document.createElement("button");
    addTaskButton.classList.add("btn", "add-task-btn");
    addTaskButton.innerHTML = `<i class="bi bi-plus-lg"></i> Add Task`;
    addTaskButton.addEventListener("click", displayAddTaskForm);
    taskCardsContainer.appendChild(addTaskButton);
    console.log(selectedProject);
  };

  const displayAddTaskForm = () => {
    const addTaskButton = document.querySelector(".add-task-btn");
    addTaskButton.classList.add("invisible");

    taskCardsContainer.appendChild(addTaskForm);
    const cancelButton = document.getElementById("cancel-add-task-form");
    cancelButton.addEventListener("click", removeAddTaskForm);
  };

  addProjectButton.addEventListener("click", displayAddProjectForm);

  const getSelectedProject = () => selectedProject;

  return {
    displayAddProjectForm,
    loadProjects,
    displayProject,
    getSelectedProject,
  };
})();

export default UI;
