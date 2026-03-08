// Check if user is logged in
auth.onAuthStateChanged((user) => {
    if (!user && !window.location.href.includes('index.html')) {
        window.location.href = 'index.html';
    }
    
    // Show username on dashboard
    if (user && document.getElementById('userName')) {
        document.getElementById('userName').textContent = user.email;
    }
});

// Login form handler
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorDiv = document.getElementById('errorMessage');
            
            try {
                await auth.signInWithEmailAndPassword(email, password);
                window.location.href = 'dashboard.html';
            } catch (error) {
                errorDiv.textContent = 'Invalid email or password';
            }
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            await auth.signOut();
            window.location.href = 'index.html';
        });
    }
});
