import Project from "../classes/Project";

const PROJECTS = "Projects";
const LocalStorage = (() => {
  const addProjectToLocalStorage = (project) => {
    let storedProjects = loadProjectsFromLocalStorage();
    console.log(storedProjects);
    if (!storedProjects) {
      storedProjects = [];
    }
    storedProjects.push(project);

    localStorage.setItem(PROJECTS, JSON.stringify(storedProjects));
  };

  const loadProjectsFromLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem(PROJECTS));
    return data.map(
      (dataEl) =>
        new Project(dataEl.title, dataEl.id, dataEl.tasks, dataEl.dateCreated)
    );
  };

  return { addProjectToLocalStorage, loadProjectsFromLocalStorage };
})();

export default LocalStorage;
