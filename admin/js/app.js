// --- PROTEKSI HALAMAN (MENGGUNAKAN SUPABASE) ---
async function checkUserSession() {
  try {
    // Mengecek apakah ada data pengguna (sesi) yang sedang login di Supabase
    const { data: { session }, error } = await supabase.auth.getSession();
    
    // Jika terjadi error atau tidak ada sesi (belum login)
    if (error || !session) {
      // Tendang kembali ke halaman login
      window.location.href = 'page/login.html';
    }
  } catch (err) {
    console.error("Gagal memeriksa sesi:", err);
    window.location.href = 'page/login.html';
  }
}

// Jalankan fungsi pengecekan sesi segera setelah file app.js dimuat
checkUserSession();
// -----------------------------------------------

async function loadComponent(id, file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
  } catch (error) {
    console.error(`Gagal memuat komponen ${file}:`, error);
  }
}

// Memuat komponen UI Admin
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

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

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

  // Desktop: 15:25:30
  const desktopTime = `${jam}:${menit}:${detik}`;

  // Mobile: 15:25
  const mobileTime = `${jam}:${menit}`;

  const desktopClock = document.getElementById("live-time");
  const mobileClock = document.getElementById("mobile-time");

  if (desktopClock) desktopClock.textContent = desktopTime;
  if (mobileClock) mobileClock.textContent = mobileTime;
}

updateClock();
setInterval(updateClock, 1000);

// --- FUNGSI LOGOUT (MENGGUNAKAN SUPABASE) ---
async function logoutUser() {
  try {
    // Meminta Supabase untuk menghapus sesi di server/browser
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
    
    // (Opsional) Hapus sisa-sisa localStorage jika Anda masih sempat menyimpannya
    localStorage.removeItem('userEmail');
    
    // Kembali ke folder 'page' untuk memuat login.html
    window.location.href = 'page/login.html'; 
    
  } catch (error) {
    console.error("Error saat logout:", error.message);
    alert("Gagal logout. Silakan coba lagi.");
  }
}