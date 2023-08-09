'use strict';
console.log(`
Верстка валидная + 10;
Верстка семантическая + 16;
Верстка соответствует макету +54;
Выполненый общие требования к верстке +20;
`);
console.table(
  [
    ['header', 1],
    ['main', 1],
    ['footer', 1],
    ['section', 6],
    ['h1', 1, 1],
    ['h2', 5],
    ['nav', 1],
    ['ul:has(li>a)', 2],
    ['button', 7],
    ['input', 2],
  ].reduce((acc, [selector, min, max = Infinity]) => {
    const { length } = document.querySelectorAll(selector);
    acc[selector] = {
      min,
      max,
      present: length,
      'in range': min <= length && length <= max ? '✅' : '⛔',
    };
    return acc;
  }, {}),
);

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