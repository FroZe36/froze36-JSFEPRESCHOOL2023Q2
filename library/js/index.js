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
