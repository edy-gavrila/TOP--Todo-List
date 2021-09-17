const TaskCard = (project) => {
  const TaskCard = document.createElement("div");
  TaskCard.classList.add("card");
  TaskCard.innerHTML = `
    <div class="card-header">
    ${project.title}
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
    `;
};
