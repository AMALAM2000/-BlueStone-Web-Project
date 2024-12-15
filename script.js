document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('main-image');
    const thumbnailContainer = document.getElementById('thumbnail-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const addToCartBtn = document.getElementById('add-to-cart');
    const confirmationMessage = document.getElementById('confirmation-message');
  
    let images = [];
    let currentIndex = 0;
  
    // Fetch images from Picsum API
    async function fetchImages() {
      const response = await fetch('https://picsum.photos/v2/list?page=2&limit=6');
      images = await response.json();
      populateCarousel();
    }
  
    // Populate the carousel
    function populateCarousel() {
      if (images.length > 0) {
        mainImage.src = images[currentIndex].download_url;
        thumbnailContainer.innerHTML = '';
        images.forEach((img, index) => {
          const thumbnail = document.createElement('img');
          thumbnail.src = img.download_url;
          thumbnail.alt = `Thumbnail ${index + 1}`;
          thumbnail.className = index === currentIndex ? 'active' : '';
          thumbnail.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
          });
          thumbnailContainer.appendChild(thumbnail);
        });
      }
    }
  
    // Update carousel on navigation
    function updateCarousel() {
      mainImage.src = images[currentIndex].download_url;
      document.querySelectorAll('.thumbnails img').forEach((thumb, index) => {
        thumb.className = index === currentIndex ? 'active' : '';
      });
    }
  
    // Carousel navigation buttons
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel();
    });
  
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
    });
  
    // Add to cart functionality
    addToCartBtn.addEventListener('click', () => {
      confirmationMessage.textContent = 'Product added to cart!';
      setTimeout(() => (confirmationMessage.textContent = ''), 3000);
    });
  
    // Initialize
    fetchImages();
  });
  