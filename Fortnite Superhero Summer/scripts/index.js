const scrollBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 1500) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');
let slideIndex = 0;
let autoSlideInterval;

function showSlide(index) {
  if (index >= slider.children.length) {
      slideIndex = 0;
  } 
  else if (index < 0) {
    slideIndex = slider.children.length - 1;
  } 
  else {
    slideIndex = index;
  }
            
  slider.style.transform = `translateX(-${slideIndex * 100}%)`;
            
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === slideIndex);
    });
}

function nextSlide() {
  showSlide(slideIndex + 1);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 2500);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

nextBtn.addEventListener('click', () => {
  nextSlide();
  stopAutoSlide();
  startAutoSlide();
});

prevBtn.addEventListener('click', () => {
showSlide(slideIndex - 1);
  stopAutoSlide();
  startAutoSlide();
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showSlide(i);
    stopAutoSlide();
    startAutoSlide();
  });
});

slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);

startAutoSlide();

function checkCalendarAccess(e) {
  const currentUser = localStorage.getItem('currentUser');
  
  if (!currentUser) {
    e.preventDefault();
    alert('Пожалуйста, войдите в систему для доступа к данной странице.');
    window.location.href = './pages/signin.html';
  }
}

document.addEventListener('DOMContentLoaded', function() {

  const calendarLinks = document.querySelectorAll('a.calendar');
  
  calendarLinks.forEach((link, index) => {
    link.id = `calendarLink${index}`;
    link.addEventListener('click', checkCalendarAccess);
  });
});