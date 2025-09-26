// public/assets/js/contact.js
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Execute reCAPTCHA to get a token
    grecaptcha.ready(function() {
        grecaptcha.execute('YOUR_RECAPTCHA_SITE_KEY', { action: 'submit' }).then(async function(token) {

            // Gather form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            try {
                // Send data and token to your backend
                const response = await axios.post('/.netlify/functions/api/resend', {
                    name,
                    email,
                    subject,
                    message,
                    token // Send the reCAPTCHA token
                });
                
                formStatus.textContent = response.data.message;
                formStatus.style.color = 'green';
                contactForm.reset();

            } catch (error) {
                console.error('Submission Error:', error);
                formStatus.textContent = error.response.data.message || 'Failed to send message.';
                formStatus.style.color = 'red';
            }
        });
    });
});