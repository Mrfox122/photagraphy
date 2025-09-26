document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/components/footer.html');
    const footerHtml = await response.text();
    const footerElement = document.querySelector('footer');
    if (footerElement) {
      footerElement.innerHTML = footerHtml;
    }
  } catch (error) {
    console.error('Error loading footer:', error);
  }
});