class ModernSaaSLoginForm extends FormUtils.LoginFormBase {
    constructor() {
        super({
            submitButtonSelector: '.submit-btn',
            formGroupSelector: '.input-group',
            hideOnSuccess: ['.signup-link'],
            validators: {
                email: FormUtils.validateEmail,
                password: (v) => {
                    if (!v) return { isValid: false, message: 'Password is required' };
                    if (v.length < 6) return { isValid: false, message: 'Password must be at least 6 characters' };
                    return { isValid: true };
                },
            },
        });
    }

    decorate() {
        if (this.passwordToggle && this.passwordInput) {
            this.passwordInput.addEventListener('input', () => {
                this.passwordToggle.style.color =
                    this.passwordInput.type === 'text' ? '#635BFF' : '#8792a2';
            });
        }
    }
}

// Inisialisasi bawaan form
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FITUR TOGGLE PASSWORD (Mata untuk melihat/menyembunyikan password)
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');

    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            
            // Ubah warna ikon mata saat diklik
            passwordToggle.style.color = type === 'text' ? '#635BFF' : '#8792a2';
        });
    }

    // 2. FITUR LOGIN SUPABASE
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Mencegah halaman refresh dan URL berubah

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Validasi sederhana
            if (email !== "" && password.length >= 6) {
                const submitBtn = document.querySelector('.submit-btn');
                submitBtn.classList.add('loading'); // Putar animasi loading

                try {
                    // --- PROSES LOGIN KE SUPABASE ---
                    const { data, error } = await supabase.auth.signInWithPassword({
                        email: email,
                        password: password,
                    });

                    submitBtn.classList.remove('loading');

                    if (error) {
                        alert("Gagal Login: " + error.message);
                    } else {
                        // Jika login berhasil
                        loginForm.style.display = 'none'; 
                        document.getElementById('successMessage').classList.add('show');
                        
                        setTimeout(() => {
                            window.location.href = '../index.html'; 
                        }, 1500);
                    }
                } catch (err) {
                    submitBtn.classList.remove('loading');
                    console.error("Sistem error:", err);
                    alert("Terjadi kesalahan sistem, silakan coba lagi.");
                }
            } else {
                alert("Mohon isi email dengan benar dan password minimal 6 karakter.");
            }
        });
    }
});