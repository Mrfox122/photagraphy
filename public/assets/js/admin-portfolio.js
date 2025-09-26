// public/assets/js/admin-portfolio.js
document.addEventListener('DOMContentLoaded', fetchPortfolioImages);

const uploadForm = document.getElementById('uploadForm');
const portfolioGrid = document.getElementById('portfolioGrid');
const uploadMessage = document.getElementById('uploadMessage');

// Handles image upload form submission
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(uploadForm);

    try {
        uploadMessage.textContent = 'Uploading...';
        uploadMessage.style.color = '#333';

        // Send a POST request to the backend with the image file
        const res = await axios.post('/.netlify/functions/api/portfolio/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        uploadMessage.textContent = res.data.message;
        uploadMessage.style.color = 'green';
        uploadForm.reset();
        
        // Refresh the gallery display
        fetchPortfolioImages();

    } catch (error) {
        console.error('Upload Error:', error);
        uploadMessage.textContent = error.response?.data?.message || 'Upload failed. Please try again.';
        uploadMessage.style.color = 'red';
    }
});

// Fetches all current portfolio images from the database and displays them
async function fetchPortfolioImages() {
    try {
        const res = await axios.get('/.netlify/functions/api/portfolio');
        displayImages(res.data);
    } catch (error) {
        console.error('Error fetching portfolio images:', error);
        portfolioGrid.innerHTML = '<p>Could not load portfolio.</p>';
    }
}

// Dynamically creates and displays the image gallery
function displayImages(images) {
    portfolioGrid.innerHTML = '';
    if (images.length === 0) {
        portfolioGrid.innerHTML = '<p>No photos in the portfolio yet.</p>';
        return;
    }

    images.forEach(image => {
        const div = document.createElement('div');
        div.classList.add('gallery-item');
        div.innerHTML = `
            <img src="${image.imageUrl}" alt="${image.title}">
            <button onclick="deleteImage('${image._id}')">Delete</button>
        `;
        portfolioGrid.appendChild(div);
    });
}

// Handles the deletion of an image
async function deleteImage(id) {
    if (confirm('Are you sure you want to delete this photo?')) {
        try {
            await axios.delete(`/.netlify/functions/api/portfolio/${id}`);
            // Refresh the gallery display after deletion
            fetchPortfolioImages();
        } catch (error) {
            console.error('Error deleting image:', error);
            alert('Failed to delete image.');
        }
    }
}