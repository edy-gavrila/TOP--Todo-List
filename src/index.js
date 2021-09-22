import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./style.css";

import UI from "./modules/UI";

//image
import appicon from "./assets/appicon.png";
document.getElementById("appicon").src = appicon;

//load projects
UI.initializeInterface();
UI.loadProjects();
