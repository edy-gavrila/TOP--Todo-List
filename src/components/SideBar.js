import "./SideBar.css";

const Sidebar = () => {
  const sideBar = document.createElement("div");
  sideBar.classList.add("sidebar-container");
  sideBar.innerHTML = "Sidebar";
  return { sideBar };
};

export default Sidebar;
