document.addEventListener('DOMContentLoaded', () => {
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');

    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            passwordToggle.style.color = type === 'text' ? '#635BFF' : '#8792a2';
        });
    }

    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username !== "" && password.length >= 6) {
                
                const email = username + "@bkcare.com";
                const submitBtn = document.querySelector('.submit-btn');
                submitBtn.classList.add('loading');

                try {
                    const { data, error } = await supabaseClient.auth.signInWithPassword({
                        email: email,
                        password: password,
                    });

                    submitBtn.classList.remove('loading');

                    if (error) {
                        alert("Gagal Login: " + error.message);
                    } else {
                        loginForm.style.display = 'none'; 
                        document.getElementById('successMessage').classList.add('show');
                        
                        setTimeout(() => {
                            window.location.href = '/'; 
                        }, 1500);
                    }
                } catch (err) {
                    submitBtn.classList.remove('loading');
                    alert("Terjadi kesalahan sistem, silakan coba lagi.");
                }
            } else {
                alert("Mohon isi username dan password minimal 6 karakter.");
            }
        });
    }
});