let currentSlide = 0;  // Start with the first slide
let lightboxVisible = false;  // Start with the lightbox hidden
let startX = 0;  // Start X position of the swipe
let endX = 0;  // End X position of the swipe

// Function to handle keydown events
function handleKeydown(e) {
    const slider = document.querySelector('.slider');
    const slides = slider.getElementsByClassName('slide');
    const lightbox = document.getElementById('lightbox');

    if (e.keyCode === 13) { // Enter key
        toggleLightbox(slides, lightbox);
    } else if (e.keyCode === 27) { // Escape key
        hideLightbox(lightbox);
    } else if (e.keyCode === 37 || e.keyCode === 39) { // left or right arrow key
        navigateSlides(e.keyCode, slides);
    }

    e.preventDefault();  // Prevent the default behavior
}

// Function to handle touch events
function handleTouch(e) {
    const slider = document.querySelector('.slider');
    const slides = slider.getElementsByClassName('slide');

    if (e.type === 'touchstart') {
        startX = e.touches[0].clientX;
    } else if (e.type === 'touchmove') {
        endX = e.touches[0].clientX;
    } else if (e.type === 'touchend') {
        if (startX < endX) {  // Swipe right
            currentSlide = Math.max(currentSlide - 1, 0);  // Don't go below 0
        } else if (startX > endX) {  // Swipe left
            currentSlide = (currentSlide + 1) % slides.length;  // Loop back to the first image
        }
        navigateSlides(null, slides);
    }
}

function toggleLightbox(slides, lightbox) {
    if (lightboxVisible) {
        lightbox.style.display = 'none';
        lightboxVisible = false;
    } else {
        lightbox.style.display = 'block';
        lightbox.style.backgroundImage = `url(${slides[currentSlide].src})`;
        lightboxVisible = true;
    }
}

function hideLightbox(lightbox) {
    if (lightboxVisible) {
        lightbox.style.display = 'none';
        lightboxVisible = false;
    }
}

function navigateSlides(keyCode, slides) {
    // Remove the 'enlarged' class from the current slide
    for (let slide of slides) {
        slide.classList.remove('enlarged');
    }

    if (keyCode === 37) { // left arrow key
        currentSlide = Math.max(currentSlide - 1, 0);  // Don't go below 0
    } else if (keyCode === 39) { // right arrow key
        currentSlide = (currentSlide + 1) % slides.length;  // Loop back to the first image
    }

    // Add the 'enlarged' class to the new current slide
    slides[currentSlide].classList.add('enlarged');
}

// Add event listeners for keydown and touch events
window.addEventListener('keydown', handleKeydown);
window.addEventListener('touchstart', handleTouch);
window.addEventListener('touchmove', handleTouch);
window.addEventListener('touchend', handleTouch);




// click navigation
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('imageSlider');
    const slides = slider.getElementsByClassName('slide');
    const lightbox = document.getElementById('lightbox');
    let middlePosition = 0;
    let scrollDistance = 0;

    // Event listener for image click
    for (let i = 0; i < slides.length; i++) {
        slides[i].addEventListener('click', function (event) {
            // Show the lightbox
            lightbox.style.display = 'block';
            lightbox.style.backgroundImage = `url(${event.target.src})`;

            // Update currentSlide
            currentSlide = Array.from(slides).indexOf(event.target);

            // Get the middle position of the clicked image
            middlePosition = event.target.getBoundingClientRect().left + event.target.getBoundingClientRect().width / 2;
            scrollDistance = middlePosition - window.innerWidth / 2;

            console.log("click scroll", scrollDistance);

            // Smoothly scroll to the middle position
            window.scrollBy({
                left: scrollDistance,
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Event listener for lightbox click
    lightbox.addEventListener('click', function () {
        lightbox.style.display = 'none';
    });
});