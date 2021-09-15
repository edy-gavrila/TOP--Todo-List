import "bootstrap/dist/css/bootstrap.min.css";
import icon from "../../assets/appicon.png";

const NavBar = () => {
  const navBar = document.createElement("nav");
  navBar.ariaCurrent = "page";
  navBar.classList.add(
    "navbar",
    "navbar-expand-md",
    "navbar-dark",
    "bg-dark",
    "py-3"
  );

  navBar.innerHTML = `
  <div class="container-fluid">
  <div> 
  <a class="navbar-brand" href="#"><img src = ${icon} width="64" height = "auto" ></a>
  <a class="navbar-brand" href="#">Taskapp</a>
  </div>
 
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-md-0">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Inbox</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Today</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Projects
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><a class="dropdown-item" href="#">Project 1</a></li>
          <li><a class="dropdown-item" href="#">Project 2</a></li>
        </ul>
      </li>
    </ul>
  </div>
</div>
  `;

  return { navBar };
};

export default NavBar;
