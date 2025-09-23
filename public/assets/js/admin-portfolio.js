// public/assets/js/admin-portfolio.js
document.addEventListener('DOMContentLoaded', fetchPortfolioImages);

const uploadForm = document.getElementById('uploadForm');
const portfolioGrid = document.getElementById('portfolioGrid');
const uploadMessage = document.getElementById('uploadMessage');

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(uploadForm);

    try {
        const res = await axios.post('/api/portfolio/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        uploadMessage.textContent = res.data.message;
        uploadMessage.style.color = 'green';
        uploadForm.reset();
        fetchPortfolioImages();
    } catch (error) {
        console.error(error);
        uploadMessage.textContent = 'Upload failed. Please try again.';
        uploadMessage.style.color = 'red';
    }
});

async function fetchPortfolioImages() {
    try {
        const res = await axios.get('/api/portfolio');
        displayImages(res.data);
    } catch (error) {
        console.error('Error fetching portfolio images:', error);
        portfolioGrid.innerHTML = '<p>Could not load portfolio.</p>';
    }
}

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

async function deleteImage(id) {
    if (confirm('Are you sure you want to delete this photo?')) {
        try {
            await axios.delete(`/api/portfolio/${id}`);
            fetchPortfolioImages();
        } catch (error) {
            console.error('Error deleting image:', error);
            alert('Failed to delete image.');
        }
    }
}