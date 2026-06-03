async function checkUserSession() {
  try {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    
    if (error || !session) {
      window.location.href = '/page/login.html';
    }
  } catch (err) {
    window.location.href = '/page/login.html';
  }
}

checkUserSession();

async function loadComponent(id, file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
  } catch (error) {
  }
}

loadComponent("sidebar-container", "partial/sidebar.html");
loadComponent("header-container", "partial/header.html");
loadComponent("footer-container", "partial/footer.html");

function loadPage(page, title) {
  loadComponent("content-container", `page/${page}.html`);
  const pageTitle = document.getElementById("page-title");
  if (pageTitle) {
    pageTitle.textContent = title;
  }
}

function setActiveMenu(element) {
  document.querySelectorAll(".menu-item").forEach((item) => item.classList.remove("active"));
  element.classList.add("active");
}

function updateDate() {
  const today = new Date();
  const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
  const tanggal = today.toLocaleDateString("id-ID", options);
  const dateElement = document.getElementById("current-date");
  if (dateElement) {
    dateElement.textContent = tanggal;
  }
}

setTimeout(updateDate, 500);

function updateClock() {
  const now = new Date();
  const jam = String(now.getHours()).padStart(2, "0");
  const menit = String(now.getMinutes()).padStart(2, "0");
  const detik = String(now.getSeconds()).padStart(2, "0");
  
  const desktopTime = `${jam}:${menit}:${detik}`;
  const mobileTime = `${jam}:${menit}`;
  
  const desktopClock = document.getElementById("live-time");
  const mobileClock = document.getElementById("mobile-time");
  
  if (desktopClock) desktopClock.textContent = desktopTime;
  if (mobileClock) mobileClock.textContent = mobileTime;
}

updateClock();
setInterval(updateClock, 1000);


function logout() {

    const konfirmasi = confirm(
        "Yakin ingin logout?"
    );

    if (konfirmasi) {

        localStorage.removeItem("isLogin");

        window.location.href = "../page/login.html";

    }
}
