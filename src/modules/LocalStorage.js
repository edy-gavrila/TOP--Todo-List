import { addDays, format, isWithinInterval, subDays } from "date-fns";
import Project from "../classes/Project";
import Task from "../classes/Task";

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
    let data = JSON.parse(localStorage.getItem(PROJECTS));
    if (!data) {
      return [];
    }
    return data.map((dataEl) => {
      if (!dataEl.tasks) {
        return[];
      }
      const tasks = dataEl.tasks.map((taskEl) => {
        const newTask = new Task(
          taskEl.title,
          taskEl.description,
          taskEl.dueDate,
          taskEl.priority,
          taskEl.id,
          taskEl.dateAdded
        );
        newTask.completed = taskEl.completed;
        newTask.projectId = taskEl.projectId;
        return newTask;
      });
      return new Project(dataEl.title, dataEl.id, tasks, dataEl.dateCreated);
    });
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

  const getProjectFromLocalStorage = (projectId) => {
    if (!projectId) {
      return null;
    }

    const savedProjects = loadProjectsFromLocalStorage();
    const projectToReturn = savedProjects.find(
      (project) => project.id === projectId
    );
    if (!projectToReturn) {
      return null;
    }

    return new Project(
      projectToReturn.title,
      projectToReturn.id,
      projectToReturn.tasks,
      projectToReturn.dateCreated
    );
  };

  const addTaskToProject = (project, task) => {
    task.projectId = project.id;
    const projects = loadProjectsFromLocalStorage();
    const index = projects.findIndex((proj) => proj.id === project.id);
    if (index < 0) {
      console.log("AddTaskToProject, Error getting project");
      return;
    }
    projects[index].addTask(task);

    localStorage.setItem(PROJECTS, JSON.stringify(projects));
  };

  const deleteTask = (task) => {
    if (!task) {
      return;
    }
    const savedProjects = loadProjectsFromLocalStorage();
    const taskProject = savedProjects.find(
      (project) => project.id === task.projectId
    );
    const updatedTasks = taskProject.tasks.filter(
      (taskEl) => taskEl.id !== task.id
    );
    taskProject.tasks = updatedTasks;
    localStorage.setItem(PROJECTS, JSON.stringify(savedProjects));
  };

  //update local storage with the new task provided as a parameter
  const updateTask = (task) => {
    if (!task) {
      return;
    }
    const savedProjects = loadProjectsFromLocalStorage();
    const projectIndex = savedProjects.findIndex(
      (proj) => proj.id === task.projectId
    );
    if (projectIndex < 0) {
      return;
    }
    const projectToUpdate = savedProjects[projectIndex];
    const taskIndex = projectToUpdate.tasks.findIndex(
      (taskEl) => taskEl.id === task.id
    );
    projectToUpdate.tasks[taskIndex] = task;
    localStorage.setItem(PROJECTS, JSON.stringify(savedProjects));
  };

  //create a project made of tasks due to be completed today
  const getTodayTasksProject = () => {
    const todaysDate = format(Date.now(), "dd:MM");
    let todaysTasks = [];
    const allProjects = loadProjectsFromLocalStorage();
    if (!allProjects) {
      return null;
    }
    allProjects.forEach((project) => {
      if (!project.tasks) {
        return;
      }
      project.tasks.forEach((task) => {
        if (todaysDate === format(new Date(task.dueDate), "dd:MM")) {
          const newTask = new Task(
            task.title,
            task.description,
            task.dueDate,
            task.priority,
            task.id,
            task.dateAdded
          );
          newTask.completed = task.completed;
          newTask.projectId = task.projectId;
          todaysTasks.push(newTask);
        }
      });
    });
    return new Project("Today's Tasks", "today", todaysTasks);
  };

  //create a project of tasks due to be completed today.
  const getThisWeekTasksProject = () => {
    const thisWeekTasks = [];
    let dayOfWeek = new Date(Date.now()).getDay();
    if (dayOfWeek === 0) {
      dayOfWeek = 6;
    } else {
      dayOfWeek -= 1;
    }
    const todaysDate = new Date(Date.now()).getDate();
    const thisWeekDateInterval = {
      start: subDays(Date.now(), dayOfWeek),
      end: addDays(Date.now(), 6),
    };

    const allProjects = loadProjectsFromLocalStorage();
    allProjects.forEach((project) => {
      if (!project.tasks) {
        return;
      }
      project.tasks.forEach((task) => {
        if (isWithinInterval(new Date(task.dueDate), thisWeekDateInterval)) {
          const newTask = new Task(
            task.title,
            task.description,
            task.dueDate,
            task.priority,
            task.id,
            task.dateAdded
          );
          newTask.completed = task.completed;
          newTask.projectId = task.projectId;
          thisWeekTasks.push(newTask);
        }
      });
    });
    return new Project("This Week's Tasks", "week", thisWeekTasks);
  };

  return {
    addProjectToLocalStorage,
    loadProjectsFromLocalStorage,
    removeProjectFromLocalStorage,
    addTaskToProject,
    deleteTask,
    getProjectFromLocalStorage,
    updateTask,
    getTodayTasksProject,
    getThisWeekTasksProject,
  };
})();

export default LocalStorage;
