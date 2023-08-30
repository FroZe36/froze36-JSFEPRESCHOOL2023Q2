'use strict';
//TASK 1
console.log(`
Верстка валидная + 10;
Верстка семантическая + 16;
Верстка соответствует макету +54;
Выполненый общие требования к верстке +20;
`);
//TASK 2
console.log(`
1.Вёрстка соответствует макету. Ширина экрана 768px +26
2.Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12
3.На ширине экрана 768рх реализовано адаптивное меню +12
`);

//---------------------------Burger menu---------------------------
const burgerMenu = document.querySelector('.header__burger');
const headerList = document.querySelector('.header__list');
const navItems = document.querySelectorAll('.header__list-item');
burgerMenu.addEventListener('click', () => {
  headerList.classList.toggle('active');
  burgerMenu.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});
function close() {
  headerList.classList.remove('active');
  burgerMenu.classList.remove('active');
  document.body.classList.remove('no-scroll');
}
navItems.forEach(item => item.addEventListener('click', close));
document.addEventListener('click', e => {
  if (
    (!burgerMenu.classList.contains('active') ||
      !headerList.contains(e.target)) &&
    !burgerMenu.contains(e.target)
  ) {
    close();
  }
});

//---------------------------Slider---------------------------
const slider = document.querySelector('.about__slider');
const wrapperSlider = document.querySelector('.about__wrapper-slides');
const slides = document.querySelectorAll('.about__wrapper-img');
const slidesNavigation = document.querySelectorAll('.button-wrapper');
const sliderBtnPrev = document.querySelector('.about__slider-array_left');
const sliderBtnNext = document.querySelector('.about__slider-array_right');

let sliderIndex = 0;
let sliderWidth = 450;
window.addEventListener('resize', e => {
  sliderWidth = slider.clientWidth;
  if (e.target.innerWidth > 1460) {
    showSlide(sliderWidth + 25);
  }
  if (e.target.innerWidth < 1460) {
    showSlide(sliderWidth / 3 - 17);
  }
  if (e.target.innerWidth <= 768) {
    showSlide(sliderWidth);
  }
});
sliderBtnPrev.addEventListener('click', prevSlide);
sliderBtnNext.addEventListener('click', nextSlide);
function nextSlide() {
  sliderIndex++;
  rollSlider();
  activeSlide(sliderIndex);
}
function prevSlide() {
  sliderIndex--;
  rollSlider();
  activeSlide(sliderIndex);
}
function showSlide(widthNum) {
  slides.forEach(item => {
    item.style.width = `${widthNum}px`;
  });
  rollSlider();
}
function rollSlider() {
  if (sliderIndex <= 0) {
    sliderIndex = 0;
    sliderBtnPrev.disabled = true;
  } else {
    sliderBtnPrev.disabled = false;
  }
  if (sliderIndex >= slides.length - 1) {
    sliderIndex = slides.length - 1;
    sliderBtnNext.disabled = true;
  } else {
    sliderBtnNext.disabled = false;
  }
  if (sliderWidth > 450 && sliderIndex >= 3) {
    sliderIndex = 2;
    slidesNavigation[sliderIndex].firstElementChild.classList.add(
      'circle-button_active',
      (slidesNavigation[sliderIndex].firstElementChild.disabled = true),
    );
  }
  if (sliderWidth <= 450) {
    wrapperSlider.style.transform = `translateX(${-(
      sliderWidth * sliderIndex
    )}px)`;
  } else
    wrapperSlider.style.transform = `translateX(${-(
      (sliderWidth / 3) *
      sliderIndex
    )}px)`;
}
rollSlider();
function activeSlide(index) {
  slidesNavigation.forEach(item =>
    item.firstElementChild.classList.remove('circle-button_active'),
  );
  slidesNavigation[index].firstElementChild.classList.add(
    'circle-button_active',
    (slidesNavigation[index].firstElementChild.disabled = true),
  );
  slidesNavigation.forEach(item => {
    if (!item.firstElementChild.classList.contains('circle-button_active')) {
      item.firstElementChild.disabled = false;
    }
  });
}
activeSlide(sliderIndex);
slidesNavigation.forEach((item, index) => {
  item.addEventListener('click', () => {
    sliderIndex = index;
    rollSlider();
    activeSlide(index);
  });
});
