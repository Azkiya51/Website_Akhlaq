// ==========================================
// 1. INISIALISASI SUPABASE
// ==========================================
// PENTING: Ganti URL dan Key di bawah ini dengan milik Anda dari Dashboard Supabase
// (Project Settings -> API)
const SUPABASE_URL = 'https://vegpnlpoghshbutgkvrt.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlZ3BubHBvZ2hzaGJ1dGdrdnJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzODU5MDgsImV4cCI6MjA5NTk2MTkwOH0.szFYpmEUMA8JdhwqRoIL8zK90rNTkWcEy5xP2JrhZk0';

// Membuat client Supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// ==========================================
// 2. LOGIKA UI & NAVIGASI (Bawaan Template)
// ==========================================

// Sembunyikan mobile menu collapse secara otomatis saat tautan diklik
const mobileLinks = document.querySelectorAll(".mobile-link");
const menuEl = document.getElementById("mobile-menu");
if(menuEl) {
  const bsCollapse = new bootstrap.Collapse(menuEl, { toggle: false });
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      bsCollapse.hide();
    });
  });
}

// Efek bayangan Navbar saat digulir
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 10) {
    navbar.classList.add("shadow-sm");
  } else {
    navbar.classList.remove("shadow-sm");
  }
});


// ==========================================
// 3. LOGIKA FORMULIR & PILIHAN URGENSI
// ==========================================

const form = document.getElementById("consultation-form");
const formContainer = document.getElementById("form-container");
const successMessage = document.getElementById("success-message");
const submitBtn = document.getElementById("submit-btn");

const urgencySelector = document.getElementById("urgency-selector");
const btnRendah = document.getElementById("btn-rendah");
const btnSedang = document.getElementById("btn-sedang");
const btnUrgent = document.getElementById("btn-urgent");

const formAreaStandard = document.getElementById("form-area-standard");
const areaUrgent = document.getElementById("area-urgent");

const personalInfoGroup = document.getElementById("personal-info-group");
const topicGroup = document.getElementById("topic-group");
const messageLabel = document.getElementById("message-label");
const submitText = document.getElementById("submit-text");
const messageInput = document.getElementById("message");

let currentUrgency = "sedang";

window.selectUrgency = function (level) {
  currentUrgency = level;

  // Reset semua tombol ke kondisi awal
  const defaultClass = "cursor-pointer border border-2 border-slate-200 rounded-3 p-3 h-100 plain-transition";
  btnRendah.className = defaultClass;
  btnSedang.className = defaultClass;
  btnUrgent.className = defaultClass;

  btnRendah.querySelector(".transition-target-h4").className = "fw-bold text-slate-800 mb-0 transition-target-h4";
  btnRendah.querySelector(".transition-target-p").className = "text-slate-500 mb-0 transition-target-p";
  btnSedang.querySelector(".transition-target-h4").className = "fw-bold text-slate-800 mb-0 transition-target-h4";
  btnSedang.querySelector(".transition-target-p").className = "text-slate-500 mb-0 transition-target-p";
  btnUrgent.querySelector(".transition-target-h4").className = "fw-bold text-slate-800 mb-0 transition-target-h4";
  btnUrgent.querySelector(".transition-target-p").className = "text-slate-500 mb-0 transition-target-p";

  btnRendah.style.borderColor = "var(--slate-200)";
  btnRendah.style.backgroundColor = "transparent";
  btnSedang.style.borderColor = "var(--slate-200)";
  btnSedang.style.backgroundColor = "transparent";
  btnUrgent.style.borderColor = "var(--slate-200)";
  btnUrgent.style.backgroundColor = "transparent";

  // Ubah visual komponen form secara dinamis
  if (level === "rendah") {
    btnRendah.className = "cursor-pointer border border-2 border-blue-500 bg-opacity-10 bg-primary rounded-3 p-3 h-100 plain-transition";
    btnRendah.style.backgroundColor = "#eff6ff";
    btnRendah.style.borderColor = "#3b82f6";
    btnRendah.querySelector(".transition-target-h4").className = "fw-bold text-blue-800 mb-0 transition-target-h4";
    btnRendah.querySelector(".transition-target-p").className = "text-blue-700 mb-0 transition-target-p";

    form.classList.remove("d-none");
    formAreaStandard.classList.remove("d-none");
    areaUrgent.classList.add("d-none");

    personalInfoGroup.classList.add("d-none");
    topicGroup.classList.add("d-none");
    document.getElementById("name").removeAttribute("required");
    document.getElementById("contact").removeAttribute("required");
    document.getElementById("topic").removeAttribute("required");

    messageLabel.innerHTML = 'Ketik keluhan atau perasaanmu di sini <span class="text-danger">*</span>';
    messageInput.setAttribute("required", "true");
    submitText.innerText = "Kirim Pesan (Anonim)";
    submitBtn.className = "btn w-100 bg-blue-500 text-white fw-bold py-3 rounded-3 plain-transition d-flex justify-content-center align-items-center gap-2";
    submitBtn.style.backgroundColor = "#3b82f6";
    
  } else if (level === "sedang") {
    btnSedang.className = "cursor-pointer border border-2 border-primary-500 bg-primary-50 rounded-3 p-3 h-100 plain-transition";
    btnSedang.style.backgroundColor = "var(--primary-50)";
    btnSedang.style.borderColor = "var(--primary-500)";
    btnSedang.querySelector(".transition-target-h4").className = "fw-bold text-primary-800 mb-0 transition-target-h4";
    btnSedang.querySelector(".transition-target-p").className = "text-primary-700 mb-0 transition-target-p";

    form.classList.remove("d-none");
    formAreaStandard.classList.remove("d-none");
    areaUrgent.classList.add("d-none");

    personalInfoGroup.classList.remove("d-none");
    topicGroup.classList.remove("d-none");
    document.getElementById("name").setAttribute("required", "true");
    document.getElementById("contact").setAttribute("required", "true");
    document.getElementById("topic").setAttribute("required", "true");

    messageLabel.innerHTML = "Ceritakan sedikit tentang apa yang sedang kamu rasakan (Opsional)";
    messageInput.removeAttribute("required");
    submitText.innerText = "Jadwalkan Sesi Deep Talk";
    submitBtn.className = "btn w-100 bg-primary-600 text-white fw-bold py-3 rounded-3 plain-transition d-flex justify-content-center align-items-center gap-2";
    submitBtn.style.backgroundColor = "var(--primary-600)";
    
  } else if (level === "urgent") {
    btnUrgent.className = "cursor-pointer border border-2 border-red-500 bg-opacity-10 bg-danger rounded-3 p-3 h-100 plain-transition";
    btnUrgent.style.backgroundColor = "#fef2f2";
    btnUrgent.style.borderColor = "#ef4444";
    btnUrgent.querySelector(".transition-target-h4").className = "fw-bold text-red-800 mb-0 transition-target-h4";
    btnUrgent.querySelector(".transition-target-p").className = "text-red-700 mb-0 transition-target-p";

    form.classList.add("d-none");
    areaUrgent.classList.remove("d-none");
  }
};


// ==========================================
// 4. LOGIKA PENGIRIMAN DATA KE SUPABASE
// ==========================================

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (form.checkValidity()) {
      // Ubah tombol jadi loading
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Memproses...';
      submitBtn.disabled = true;
      submitBtn.classList.add("opacity-75");

      // Ambil nilai dari inputan form
      const messageVal = messageInput.value;
      let nameVal = null;
      let contactVal = null;
      let topicVal = null;

      // Jika urgensi 'sedang', maka nama, kontak, dan topik wajib diisi dan kita ambil datanya
      if (currentUrgency === "sedang") {
        nameVal = document.getElementById("name").value;
        contactVal = document.getElementById("contact").value;
        topicVal = document.getElementById("topic").value;
      }

      try {
        // Eksekusi insert ke database Supabase
            const { data, error } = await supabaseClient
          .from('konsultasi')
          .insert([
            {
              urgency: currentUrgency,
              name: nameVal,
              contact: contactVal,
              topic: topicVal,
              message: messageVal
            }
          ]);

        // Jika terjadi error dari database
        if (error) throw error;

        // Jika berhasil, tampilkan layar sukses
        form.classList.add("d-none");
        urgencySelector.classList.add("d-none");
        successMessage.classList.remove("d-none");

      } catch (error) {
        console.error('Error saat menyimpan data:', error.message);
        alert("Maaf, terjadi kesalahan saat mengirim pesan. Pastikan konfigurasi Supabase Anda benar.");
      } finally {
        // Kembalikan status tombol ke keadaan semula
        submitBtn.innerHTML = '<span id="submit-text">' + (currentUrgency === "rendah" ? "Kirim Pesan (Anonim)" : "Jadwalkan Sesi Deep Talk") + '</span> <i class="fa-solid fa-paper-plane"></i>';
        submitBtn.disabled = false;
        submitBtn.classList.remove("opacity-75");
      }

    } else {
      // Trigger validasi HTML5 jika ada field wajib yang kosong
      form.reportValidity();
    }
  });
}

// ==========================================
// 5. FUNGSI RESET FORMULIR
// ==========================================
window.resetForm = function () {
  if (form) form.reset();
  successMessage.classList.add("d-none");
  urgencySelector.classList.remove("d-none");
  window.selectUrgency("sedang"); // Default kembali ke "sedang"
};