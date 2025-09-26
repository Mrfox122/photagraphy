// public/assets/js/client-login.js
const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('loginButton');
const loginMessage = document.getElementById('loginMessage');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        loginButton.disabled = true;
        loginButton.textContent = 'Logging in...';

        const response = await axios.post('/.netlify/functions/api/auth/login', {
            username,
            password,
        });

        // Upon successful login, redirect to the client gallery page
        window.location.href = `/client-gallery.html?client=${username}`;

    } catch (error) {
        console.error('Login error:', error);
        loginMessage.textContent = 'Invalid username or password.';
        loginMessage.style.color = 'red';
        loginButton.disabled = false;
        loginButton.textContent = 'Login';
    }
});