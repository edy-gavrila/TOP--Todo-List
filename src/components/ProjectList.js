import UI from "../modules/UI";
import LocalStorage from "../modules/LocalStorage";

const ProjectList = (projects) => {
  let projectList = document.createElement("p");
  projectList.innerText = "No projects added yet...";

  if (projects.length === 0) {
    return { projectList };
  }
  projects = projects.filter((proj) => proj.id !== "inbox");
  projectList = document.createElement("div");
  projectList.classList.add("d-flex", "flex-column");

  projects.forEach((project) => {
    const projectListItem = document.createElement("button");
    projectListItem.classList.add("btn", "sidebar-btn", "my-1");
    projectListItem.innerHTML = `

    <i class="bi bi-list-check"></i>&nbsp;${project.title}`;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-project-btn");
    deleteButton.innerHTML = "<i class='bi bi-x'></i></button>";

    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      LocalStorage.removeProjectFromLocalStorage(project);
      UI.loadProjects();
      UI.displayProject(LocalStorage.getProjectFromLocalStorage("inbox"));
    });

    projectListItem.appendChild(deleteButton);
    projectListItem.addEventListener("click", () => {
      UI.displayProject(project);
    });
    projectList.appendChild(projectListItem);
  });

  return { projectList };
};

export default ProjectList;
