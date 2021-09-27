import AddProjectForm from "../components/AddProjectForm";
import LocalStorage from "./LocalStorage";
import ProjectList from "../components/ProjectList";
import AddTaskForm from "../components/AddTaskForm";
import { format } from "date-fns";
import TaskCard from "../components/TaskCard";
import Project from "../classes/Project";
import EditTaskModalForm from "../components/EditTaskModalForm";
import AddProjectModal from "../components/AddProjectModal";

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

  //load today's tasks
  const loadTodaysTasks = () => {
    const todayTasksProject = LocalStorage.getTodayTasksProject();
    displayProject(todayTasksProject);
  };

  //load this weeks tasks
  const loadThisWeekTasks = () => {
    const thisWeekTasksProject = LocalStorage.getThisWeekTasksProject();
    displayProject(thisWeekTasksProject);
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
      console.log("No Project/Invalid Project");
      return;
    }
    selectedProject = project;
    let dateCreated = "";
    if (
      project.id !== "inbox" &&
      project.id !== "today" &&
      project.id !== "week"
    ) {
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
    if (
      project.tasks.length === 0 &&
      (project.id === "today" || project.id === "week")
    ) {
      const message = document.createElement("p");
      message.classList.add("mt-3");
      if (project.id === "today") {
        message.innerText = `Rejoice! No tasks are due today...`;
      } else {
        message.innerText = `Rejoice! No tasks are due this week...`;
      }

      taskCardsContainer.appendChild(message);
    }
    project.tasks.forEach((task, idx) => {
      const { taskCard } = TaskCard(task, idx);
      taskCardsContainer.appendChild(taskCard);
    });
    if (project.id !== "today" && project.id !== "week") {
      const addTaskButton = document.createElement("button");
      addTaskButton.classList.add("btn", "add-task-btn");
      addTaskButton.innerHTML = `<i class="bi bi-plus-lg"></i> Add Task`;
      addTaskButton.addEventListener("click", displayAddTaskForm);
      taskCardsContainer.appendChild(addTaskButton);
    }
  };

  //closes the active modal
  const closeModal = () => {
    const backdropEl = document.getElementById("backdrop");
    if (backdropEl) {
      backdropEl.remove();
      document.body.style.overflowY = "auto";
    }
  };

  //displays the form for adding a task
  const displayAddTaskForm = () => {
    const addTaskButton = document.querySelector(".add-task-btn");
    addTaskButton.classList.add("invisible");

    taskCardsContainer.appendChild(addTaskFormWithTitle);
    const cancelButton = document.getElementById("cancel-add-task-form");
    cancelButton.addEventListener("click", removeAddTaskForm);
  };

  //Displays the modal for editing a existing task
  const displayEditTaskFormModal = (taskToUpdate) => {
    const { editTaskModalForm } = EditTaskModalForm(taskToUpdate);
    const modalFormContainer = document.getElementById("backdropContainer");
    modalFormContainer.appendChild(editTaskModalForm);

    const cancelButton = document.getElementById("cancel-add-task-form");
    cancelButton.addEventListener("click", closeModal);
  };

  const getSelectedProject = () => selectedProject;
  const setSelectedProject = (project) => {
    selectedProject = project;
  };

  //updates the interface after a project has been changed
  const updateSelectedProject = () => {
    if (!selectedProject) {
      return;
    }

    if (selectedProject.id === "today") {
      loadTodaysTasks();
      return;
    }
    if (selectedProject.id === "week") {
      loadThisWeekTasks();
      return;
    }
    const updatedProject = LocalStorage.getProjectFromLocalStorage(
      selectedProject.id
    );
    setSelectedProject(updatedProject);
  };

  //Displays the modal for adding a project in case the sidebar is not visible
  const displayAddProjectModal = () => {
    const { addProjectModal } = AddProjectModal();
    const modalFormContainer = document.getElementById("backdropContainer");
    modalFormContainer.appendChild(addProjectModal);
    const cancelBtn = document.getElementById("add-project-form-cancel");
    cancelBtn.addEventListener("click", closeModal);
  };

  //loads all projects into the navbar
  const loadNavBarProjectsList = () => {
    let projects = LocalStorage.loadProjectsFromLocalStorage();
    projects = projects.filter((project) => project.id !== "inbox");
    if (!projects) {
      return [];
    }
    const navBarProjectsDropdown = document.getElementById(
      "navBarProjectsDropDown"
    );
    navBarProjectsDropdown.innerHTML = "";

    const projectList = [];
    let inboxEl = document.createElement("li");
    inboxEl.innerHTML = `<a class="dropdown-item" href="#">Inbox</a>`;
    inboxEl.addEventListener("click", loadInboxProject);
    projectList.push(inboxEl);

    let dueTodayEl = document.createElement("li");
    dueTodayEl.innerHTML = `<a class="dropdown-item" href="#">Due Today</a>`;
    dueTodayEl.addEventListener("click", loadTodaysTasks);
    projectList.push(dueTodayEl);

    let dueThisWeekEl = document.createElement("li");
    dueThisWeekEl.innerHTML = `<a class="dropdown-item" href="#">Due This Week</a>`;
    dueThisWeekEl.addEventListener("click", loadThisWeekTasks);
    projectList.push(dueThisWeekEl);

    const lineBreak1 = document.createElement("li");
    lineBreak1.innerHTML = " <hr class='dropdown-divider' />";
    projectList.push(lineBreak1);

    projects.forEach((project) => {
      const listEl = document.createElement("li");
      listEl.innerHTML = `<a class="dropdown-item" href="#">${project.title}</a>`;
      listEl.addEventListener("click", () => {
        displayProject(project);
      });
      projectList.push(listEl);
    });

    if (projects.length > 0) {
      const lineBreak2 = document.createElement("li");
      lineBreak2.innerHTML = " <hr class='dropdown-divider' />";
      projectList.push(lineBreak2);
    }

    const addProjectLink = document.createElement("li");
    addProjectLink.innerHTML = `<a class="dropdown-item" href="#">...Add New Project</a>`;
    addProjectLink.addEventListener("click", (e) => {
      //Todo implement a modal to create a new peoject
      console.log("Adding Project...");
      displayAddProjectModal();
    });
    projectList.push(addProjectLink);

    projectList.forEach((listEl) => {
      navBarProjectsDropdown.appendChild(listEl);
    });
  };

  //Initial setup of the interface
  const initializeInterface = () => {
    const inboxBtn = document.getElementById("inbox");
    const dueTodayBtn = document.getElementById("today");
    const dueThisWeekBtn = document.getElementById("week");
    const inboxNavLink = document.getElementById("navBarInboxLink");
    const dueTodayNavLink = document.getElementById("navBarDueTodayLink");
    const dueThisWeekNavLink = document.getElementById("navBarDueThisWeekLink");

    inboxBtn.addEventListener("click", loadInboxProject);
    dueTodayBtn.addEventListener("click", loadTodaysTasks);
    dueThisWeekBtn.addEventListener("click", loadThisWeekTasks);
    inboxNavLink.addEventListener("click", loadInboxProject);
    dueTodayNavLink.addEventListener("click", loadTodaysTasks);
    dueThisWeekNavLink.addEventListener("click", loadThisWeekTasks);

    loadInboxProject();
    loadNavBarProjectsList();
    addProjectButton.addEventListener("click", displayAddProjectForm);
  };

  return {
    displayAddProjectForm,
    loadProjects,
    displayProject,
    getSelectedProject,
    setSelectedProject,
    updateSelectedProject,
    initializeInterface,
    displayEditTaskFormModal,
    closeModal,
    loadNavBarProjectsList,
  };
})();

export default UI;
