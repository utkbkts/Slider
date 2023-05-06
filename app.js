const smallImages = document.querySelectorAll('.sliders-item img');
const bigImage = document.querySelector('.activeimg');
let slideIndex = 0;

function showSlide(n) {
  const newSrc = smallImages[n].src;
  const currentBigSrc = bigImage.src;
  bigImage.style.opacity = 0;
  bigImage.style.transition = "1s";
  setTimeout(function() {
    bigImage.src = newSrc;
    smallImages[slideIndex].src = currentBigSrc;
    bigImage.style.opacity = 1;
  }, 3000);
  smallImages.forEach(function(image) {
    image.classList.remove('active');
  });
  smallImages[n].classList.add('active');
  slideIndex = n;
}

// Otomatik geçiş fonksiyonu
function autoSlide() {
  slideIndex++;
  if (slideIndex >= smallImages.length) {
    slideIndex = 0;
  }
  showSlide(slideIndex);
}

// Otomatik geçişin ayarlanması
let autoSlideInterval = setInterval(autoSlide, 3000);

// Otomatik geçişin durdurulması fare ile slider üzerindeyken
const slider = document.querySelector('.sliders-active');
slider.addEventListener('mouseover', function() {
  clearInterval(autoSlideInterval);
});

// Otomatik geçişin tekrar başlaması fare slider üzerinden çıkıldığında
slider.addEventListener('mouseout', function() {
  autoSlideInterval = setInterval(autoSlide, 8000);
});

// Klavye kontrolü
document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowLeft') {
    slideIndex--;
    if (slideIndex < 0) {
      slideIndex = smallImages.length - 1;
    }
    showSlide(slideIndex);
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 4000);
  } else if (event.code === 'ArrowRight') {
    slideIndex++;
    if (slideIndex >= smallImages.length) {
      slideIndex = 0;
    }
    showSlide(slideIndex);
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 7000);
  }
});

// Küçük resimlere tıklama olayı
smallImages.forEach(function(smallImage, index) {
  smallImage.addEventListener('click', function() {
    showSlide(index);
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 5000);
  });
});
