const Backdrop = () => {
  const backdrop = document.createElement("div");

  backdrop.classList.add(
    "backdrop",
    "d-flex",
    "flex-column",
    "justify-content-center"
  );
  backdrop.style.top = scrollY + "px";
  document.body.style.overflow = "hidden";
  backdrop.setAttribute("id", "backdrop");
  backdrop.addEventListener("click", (e) => {
    if (e.target.id !== "backdrop") {
      return;
    }
    backdrop.remove();
    document.body.style.overflowY = "auto";
  });

  return { backdrop };
};

export default Backdrop;
