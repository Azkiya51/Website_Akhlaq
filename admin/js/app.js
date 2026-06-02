async function loadComponent(id, file) {
  const response = await fetch(file);
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

loadComponent("sidebar-container", "partial/sidebar.html");
loadComponent("header-container", "partial/header.html");
loadComponent("footer-container", "partial/footer.html");

function loadPage(page) {
  loadComponent("content-container", `page/${page}.html`);
}

loadPage("dashboard");

function setActiveMenu(element) {
  document.querySelectorAll(".menu-item").forEach((item) => item.classList.remove("active"));

  element.classList.add("active");
}
