import AddProjectForm from "../components/AddProjectForm";
import LocalStorage from "./LocalStorage";
import ProjectList from "../components/ProjectList";
import AddTaskForm from "../components/AddTaskForm";
import { format } from "date-fns";
import TaskCard from "../components/TaskCard";
import Project from "../classes/Project";
import ModalForm from "../components/ModalForm";

const UI = (() => {
  const addProjectButton = document.getElementById("add-project-button");
  const projectsContainer = document.getElementById("projects-container");
  const projectListContainer = document.getElementById(
    "project-list-container"
  );
  const taskCardsContainer = document.getElementById("task-cards-container");
  const { addProjectForm } = AddProjectForm();
  const { addTaskForm: addTaskFormWithTitle } = AddTaskForm(true);

  let selectedProject = null;
  let projects = null;

  //load inbox project
  const loadInboxProject = () => {
    let inboxProject = LocalStorage.getProjectFromLocalStorage("inbox");
    if (!inboxProject) {
      inboxProject = new Project("Inbox", "inbox", []);
      LocalStorage.addProjectToLocalStorage(inboxProject);
    }
    displayProject(inboxProject);
  };

  //side effect for button
  const applySideBarButtonsEffect = () => {
    const sideBarButtons = document.querySelectorAll(".sidebar-btn");
    sideBarButtons.forEach((button) => {
      button.addEventListener("click", () => {
        sideBarButtons.forEach((btn) => {
          btn.classList.remove("active");
        });
        button.classList.add("active");
      });
    });
  };

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
    if (addTaskFormWithTitle) {
      addTaskFormWithTitle.remove();
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
    applySideBarButtonsEffect();
  };

  //display project details
  const displayProject = (project) => {
    if (!project) {
      return;
    }
    selectedProject = project;
    let dateCreated = "";
    if (project.id !== "inbox") {
      dateCreated =
        "Date Created: " +
        format(new Date(project.dateCreated), "dd/LLL/yyyy 'at' HH:mm ");
    }
    taskCardsContainer.innerHTML = `
    <div >
      <h1 class="mb-0">${project.title}</h1> 
      <small class="mb-3">${dateCreated}</small>

    </div>
    `;
    project.tasks.forEach((task, idx) => {
      const { taskCard } = TaskCard(task, idx);
      taskCardsContainer.appendChild(taskCard);
    });
    const addTaskButton = document.createElement("button");
    addTaskButton.classList.add("btn", "add-task-btn");
    addTaskButton.innerHTML = `<i class="bi bi-plus-lg"></i> Add Task`;
    addTaskButton.addEventListener("click", displayAddTaskForm);
    taskCardsContainer.appendChild(addTaskButton);
  };

  
  const displayAddTaskForm = () => {
    const addTaskButton = document.querySelector(".add-task-btn");
    addTaskButton.classList.add("invisible");

    taskCardsContainer.appendChild(addTaskFormWithTitle);
    const cancelButton = document.getElementById("cancel-add-task-form");
    cancelButton.addEventListener("click", removeAddTaskForm);
  };

  const displayFormModal = (taskToUpdate) => {
    const { modalForm } = ModalForm(taskToUpdate);
    const modalFormContainer = document.getElementById("backdropContainer");
    modalFormContainer.appendChild(modalForm);

    const cancelButton = document.getElementById("cancel-add-task-form");
    cancelButton.addEventListener("click", () => {
      const backdropEl = document.getElementById("backdrop");
      if (backdropEl) {
        backdropEl.remove();
      }
    });
  };

  addProjectButton.addEventListener("click", displayAddProjectForm);

  const getSelectedProject = () => selectedProject;
  const setSelectedProject = (project) => {
    selectedProject = project;
  };

  const updateSelectedProject = () => {
    if (!selectedProject) {
      return;
    }
    const updatedProject = LocalStorage.getProjectFromLocalStorage(
      selectedProject.id
    );
    setSelectedProject(updatedProject);
  };

  const initializeInterface = () => {
    const inboxBtn = document.getElementById("inbox");
    inboxBtn.addEventListener("click", loadInboxProject);
    loadInboxProject();
  };

  return {
    displayAddProjectForm,
    loadProjects,
    displayProject,
    getSelectedProject,
    setSelectedProject,
    updateSelectedProject,
    initializeInterface,
    displayFormModal,
  };
})();

export default UI;
