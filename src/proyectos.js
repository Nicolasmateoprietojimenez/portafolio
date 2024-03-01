let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-images img');
const totalSlides = slides.length;

function showSlide(index) {
  if (index < 0) {
    currentIndex = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentIndex = 0;
  }
  
  const offset = -currentIndex * 100;
  document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

// Mostrar la primera imagen al cargar la página
showSlide(currentIndex);
