import Project from "../classes/Project";

const PROJECTS = "Projects";
const LocalStorage = (() => {
  const addProjectToLocalStorage = (project) => {
    let storedProjects = loadProjectsFromLocalStorage();
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

  const removeProjectFromLocalStorage = (project) => {
    const storedProjects = loadProjectsFromLocalStorage();
    if (!storedProjects) {
      return;
    }
    const updatesStoredProjects = storedProjects.filter(
      (element) => element.id !== project.id
    );
    localStorage.setItem(PROJECTS, JSON.stringify(updatesStoredProjects));
  };

  return {
    addProjectToLocalStorage,
    loadProjectsFromLocalStorage,
    removeProjectFromLocalStorage,
  };
})();

export default LocalStorage;
