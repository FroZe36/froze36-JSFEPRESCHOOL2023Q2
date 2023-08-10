'use strict';
console.log(`
Верстка валидная + 10;
Верстка семантическая + 16;
Верстка соответствует макету +54;
Выполненый общие требования к верстке +20;
`);

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
  if((!burgerMenu.classList.contains('active') || !headerList.contains(e.target)) && !burgerMenu.contains(e.target)) {
    close()
  }
});
