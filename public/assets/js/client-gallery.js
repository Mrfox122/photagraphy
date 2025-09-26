// public/assets/js/client-gallery.js
const galleryTitle = document.getElementById('galleryTitle');
const photoPreviews = document.getElementById('photoPreviews');
const downloadButton = document.getElementById('downloadButton');

document.addEventListener('DOMContentLoaded', async () => {
    // Get the username from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('client');

    if (!username) {
        galleryTitle.textContent = 'Access Denied';
        photoPreviews.innerHTML = '<p>Please log in to view a gallery.</p>';
        return;
    }

    try {
        const response = await axios.get(`/.netlify/functions/api/gallery?username=${username}`);
        const { previewUrls, downloadLink } = response.data;

        // Display the client's name in the title
        galleryTitle.textContent = `${username}'s Gallery`;

        // Display photo previews
        if (previewUrls.length > 0) {
            previewUrls.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                img.alt = 'Photo Preview';
                photoPreviews.appendChild(img);
            });
        } else {
            photoPreviews.innerHTML = '<p>No preview photos available.</p>';
        }

        // Show the download button and link it to the gallery URL
        if (downloadLink) {
            downloadButton.style.display = 'inline-block';
            downloadButton.href = downloadLink;
        }

    } catch (error) {
        console.error('Error fetching gallery:', error);
        galleryTitle.textContent = 'Gallery Not Found';
        photoPreviews.innerHTML = '<p>An error occurred or the gallery could not be found.</p>';
    }
});