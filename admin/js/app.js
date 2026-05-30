async function loadComponent(id,file){

  const response =
  await fetch(file);

  const html =
  await response.text();

  document.getElementById(id)
  .innerHTML = html;
}

loadComponent(
  "sidebar-container",
  "partial/sidebar.html"
);

loadComponent(
  "header-container",
  "partial/header.html"
);

loadComponent(
  "content-container",
  "page/dashboard.html"
);

loadComponent(
  "footer-container",
  "partial/footer.html"
);