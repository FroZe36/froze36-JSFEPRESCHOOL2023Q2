'use strict';
let search = '';
const CLIENT_ID = 'Client-ID 3kR8Ny4FbYf6yBjQNXMv1aO-kvn2jdUHYtPYykg7QIo';
const mainContainer = document.querySelector('main');
const input = document.querySelector('.header__input');
const logoSearch = document.querySelector(
  '.fa-solid.fa-magnifying-glass.fa-xl.header__logo-search',
);
const logoClose = document.querySelector(
  '.fa-solid.fa-xmark.fa-xl.header__logo-close',
);

window.addEventListener('DOMContentLoaded', () => {
  search = 'spring';
  showData(getData(search));
  input.focus();
});
async function getData(link) {
  let url = `https://api.unsplash.com/search/photos?query=${link}&per_page=30&orientation=landscape`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: CLIENT_ID,
    },
  });
  if (!res.ok) {
    console.log('ERROR');
  }
  const data = await res.json();
  return data;
}
function showData(data) {
  data.then(res => {
    res.results.map(item => {
      const img = document.createElement('img');
      img.classList.add('main__img');
      img.src = item.urls.regular;
      mainContainer.appendChild(img);
    });
  });
}
function removeData() {
  document
    .querySelectorAll('.main__img')
    .forEach(item => mainContainer.removeChild(item));
}
function handleSearch() {
  search = input.value;
  return search;
}
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    handleSearch();
    removeData();
    showData(getData(search));
  }
});
logoSearch.addEventListener('click', () => {
  handleSearch();
  removeData();
  showData(getData(search));
});
logoClose.addEventListener('click', () => {
  input.value = '';
  input.focus();
});
console.log(`
1.Вёрстка +10
на странице есть несколько фото и строка поиска +5
в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2.При загрузке приложения на странице отображаются полученные от API изображения +10
3.Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10
5.Поиск +30
при открытии приложения курсор находится в поле ввода +5
есть placeholder +5
автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
поисковый запрос можно отправить нажатием клавиши Enter +5
после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5
6.Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо

Оценка: 70 баллов
`)
