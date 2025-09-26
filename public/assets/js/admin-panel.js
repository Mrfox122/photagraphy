// public/assets/js/admin-panel.js
const createUserForm = document.getElementById('createUserForm');
const messageEl = document.getElementById('message');

createUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const downloadLink = document.getElementById('downloadLink').value;
    const previewUrlsText = document.getElementById('previewUrls').value;
    const previewUrls = previewUrlsText.split(',').map(url => url.trim());

    try {
        // Send a POST request to the backend API
        const response = await axios.post('/.netlify/functions/api/admin/create-client', {
            username,
            password,
            downloadLink,
            previewUrls
        });
        
        // Display success message
        messageEl.textContent = response.data.message;
        messageEl.style.color = 'green';
        createUserForm.reset();

    } catch (error) {
        // Display error message
        console.error('Error creating user:', error);
        messageEl.textContent = error.response.data.message || 'An error occurred. Please try again.';
        messageEl.style.color = 'red';
    }
});