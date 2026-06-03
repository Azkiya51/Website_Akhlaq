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
    new ModernSaaSLoginForm();

    const loginForm = document.getElementById('loginForm');
    
    // Tambahkan kata 'async' di sini
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault(); 

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email !== "" && password.length >= 6) {
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.classList.add('loading'); // Putar animasi loading

            // --- PROSES LOGIN KE SUPABASE ---
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            submitBtn.classList.remove('loading'); // Hentikan animasi loading

            if (error) {
                // Jika login gagal (password salah, email tidak ada, dll)
                alert("Gagal Login: " + error.message);
            } else {
                // Jika login berhasil
                loginForm.style.display = 'none'; 
                document.getElementById('successMessage').classList.add('show');
                
                // Supabase otomatis menyimpan sesi di dalam memori browser,
                // jadi kita bisa langsung pindah halaman.
                setTimeout(() => {
                    window.location.href = '../index.html'; 
                }, 1500);
            }
        }
    });
});