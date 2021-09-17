import UI from "../modules/UI";
import LocalStorage from "../modules/LocalStorage";

const ProjectList = (projects) => {
  let projectList = document.createElement("p");
  projectList.innerText = "No projects added yet...";

  if (projects.length === 0) {
    return { projectList };
  }
  projectList = document.createElement("ul");

  projects.forEach((project) => {
    const projectListItem = document.createElement("li");
    projectListItem.classList.add("project-list-item");
    projectListItem.innerHTML = `<i class="bi bi-list-check"></i>&nbsp;${project.title}`;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-project-btn");
    deleteButton.innerHTML = "<i class='bi bi-x'></i></button>";

    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      LocalStorage.removeProjectFromLocalStorage(project);
      UI.loadProjects();
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
