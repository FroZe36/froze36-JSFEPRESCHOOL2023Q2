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
let sliderWidth;
if(window.innerWidth >= 1460) {
  sliderWidth = 1400
} else if (window.innerWidth <= 768) {
  sliderWidth = 450
} else {
  sliderWidth = slider.clientWidth
  showSlide(sliderWidth / 3 - 17)
}
window.addEventListener('resize', e => {
  sliderWidth = slider.clientWidth;
  if (e.target.innerWidth > 1460) {
    showSlide(sliderWidth);
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
  if (sliderWidth <= 450 && slider.clientWidth < 1400) {
    wrapperSlider.style.transform = `translateX(${-(
      sliderWidth * sliderIndex
    )}px)`;
  } else {
    wrapperSlider.style.transform = `translateX(${-(
      ((sliderWidth + 25) / 3) *
      sliderIndex
    )}px)`;
  }
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

//---------------------------Slider at Favorites---------------------------

const labelsOfWeather = document.querySelectorAll('.favorites-label');
const favoritesContainer = document.querySelectorAll('.favorites__container-card');
const btnFavoritesCard = document.querySelectorAll('.favorites__card-button');
const winter = [
  {
    titleBook: 'The Book Eaters',
    bookAuthor: 'By Sunyi Dean',
    text: `An unusual sci-fi story about a book eater woman who tries desperately to save her dangerous mind-eater son from tradition and certain death. Complete with dysfunctional family values, light Sapphic romance, and a strong, complex protagonist. Not for the faint of heart.`,
    buy: false,
    img: './assets/img/winter/sunyi_dean.jpg',
  },
  {
    titleBook: 'Cackle',
    bookAuthor: 'By Rachel Harrison',
    text: `Are your Halloween movies of choice The Witches of Eastwick and Practical Magic? Look no further than here - where a woman recovering from a breakup moves to a quaint town in upstate New York and befriends a beautiful witch.`,
    buy: false,
    img: './assets/img/winter/rachel_harrison.jpg',
  },
  {
    titleBook: 'Dante: Poet of the Secular World',
    bookAuthor: 'By Erich Auerbach',
    text: `Auerbach's engaging book places the 'Comedy' within the tradition of epic, tragedy, and philosophy in general, arguing for Dante's uniqueness as one who raised the individual and his drama of soul into something of divine significance—an inspired introduction to Dante's main themes.`,
    buy: false,
    img: './assets/img/winter/dante.jpg',
  },
  {
    titleBook: 'The Last Queen',
    bookAuthor: 'By Clive Irving',
    text: `A timely and revelatory new biography of Queen Elizabeth (and her family) exploring how the Windsors have
  evolved and thrived as the modern world has changed around them.`,
    buy: false,
    img: './assets/img/winter/queen.jpg',
  },
];
const spring = [
  {
    titleBook: 'The Body',
    bookAuthor: 'By Stephen King',
    text: `Powerful novel that takes you back to a nostalgic time, exploring both the beauty and danger and loss of
    innocence that is youth.`,
    buy: false,
    img: './assets/img/spring/stephen_king.jpg',
  },
  {
    titleBook: 'Carry: A Memoir of Survival on Stolen Land',
    bookAuthor: 'By Toni Jenson',
    text: `This memoir about the author's relationship with gun violence feels both expansive and intimate, resulting
    in a lyrical indictment of the way things are.`,
    buy: false,
    img: './assets/img/spring/toni_jenson.jpg',
  },
  {
    titleBook: 'Days of Distraction',
    bookAuthor: 'By Alexandra Chang',
    text: `A sardonic view of Silicon Valley culture, a meditation on race, and a journal of displacement and
    belonging, all in one form-defying package of spare prose.`,
    buy: false,
    img: './assets/img/spring/alexandra_chang.jpg',
  },
  {
    titleBook: 'Dominicana',
    bookAuthor: 'By Angie Cruz',
    text: `A fascinating story of a teenage girl who marries a man twice her age with the promise to bring her to
    America. Her marriage is an opportunity for her family to eventually immigrate. For fans of Isabel Allende
    and Julia Alvarez.`,
    buy: false,
    img: './assets/img/spring/angie_cruz.jpg',
  },
];
const summer = [
  {
    titleBook: 'Crude: A Memoir',
    bookAuthor: 'By Pablo Fajardo & ​​Sophie Tardy-Joubert',
    text: `Drawing and color by Damien Roudeau | This book illustrates the struggles of a group of indigenous
    Ecuadoreans as they try to sue the ChevronTexaco company for damage their oil fields did to the Amazon and
    her people`,
    buy: false,
    img: './assets/img/summer/palbo_fajardo.jpg',
  },
  {
    titleBook: 'Let My People Go Surfing',
    bookAuthor: 'By Yvon Chouinard',
    text: `Chouinard—climber, businessman, environmentalist—shares tales of courage and persistence from his
    experience
    of founding and leading Patagonia, Inc. Full title: Let My People Go Surfing: The Education of a Reluctant
    Businessman, Including 10 More Years of Business Unusual.`,
    buy: false,
    img: './assets/img/summer/yvon_chouinard.jpg',
  },
  {
    titleBook: 'The Octopus Museum: Poems',
    bookAuthor: 'By Brenda Shaughnessy',
    text: `This collection of bold and scathingly beautiful feminist poems imagines what comes after our current age
    of
    environmental destruction, racism, sexism, and divisive politics.`,
    buy: false,
    img: './assets/img/summer/brenda_shaughnnesy.jpg',
  },
  {
    titleBook: 'Shark Dialogues: A Novel',
    bookAuthor: 'By Kiana Davenport',
    text: `An epic saga of seven generations of one family encompasses the tumultuous history of Hawaii as a Hawaiian
    woman gathers her four granddaughters together in an erotic tale of villains and dreamers, queens and
    revolutionaries, lepers and healers.`,
    buy: false,
    img: './assets/img/summer/kiana_davenport.jpg',
  },
];
const autumn = [
  {
    titleBook: 'Casual Conversation',
    bookAuthor: 'By Renia White',
    text: `White's impressive debut collection takes readers through and beyond the concepts of conversation and the
    casual - both what we say to each other and what we don't, examining the possibilities around how we
    construct and communicate identity.`,
    buy: false,
    img: './assets/img/autumn/riana_white.jpg',
  },
  {
    titleBook: 'The Great Fire',
    bookAuthor: 'By Lou Ureneck',
    text: `The harrowing story of an ordinary American and a principled Naval officer who, horrified by the burning
    of
    Smyrna, led an extraordinary rescue effort that saved a quarter of a million refugees from the Armenian
    Genocide`,
    buy: false,
    img: './assets/img/autumn/lou_ureneck.jpg',
  },
  {
    titleBook: 'Rickey: The Life and Legend',
    bookAuthor: 'By Howard Bryant',
    text: `With the fall rolling around, one can't help but think of baseball's postseason coming up! And what better
    way to prepare for it than reading the biography of one of the game's all-time greatest performers, the
    Man
    of Steal, Rickey Henderson?`,
    buy: false,
    img: './assets/img/autumn/howard_bryant.jpg',
  },
  {
    titleBook: 'Slug: And Other Stories',
    bookAuthor: 'By Megan Milks',
    text: `Exes Tegan and Sara find themselves chained together by hairballs of codependency. A father and child
    experience the shared trauma of giving birth to gods from their wounds.`,
    buy: false,
    img: './assets/img/autumn/megan_milks.jpg',
  },
];
function fadeIn(elem, timeout, display) {
  elem.style.opacity = 0;
  elem.style.display = display || 'block';
  elem.style.transition = `opacity ${timeout}ms`;
  setTimeout(() => {
    elem.style.opacity = 1;
  }, 10);
}
function fadeOut(elem, timeout) {
  elem.style.opacity = 1;
  elem.style.transition = `opacity ${timeout}ms`;
  elem.style.opacity = 0;
  setTimeout(() => {
    elem.style.display = 'none';
  }, timeout);
}
labelsOfWeather.forEach((item, index) => {
  item.addEventListener('click', () => {
    activeLabel(index);
    showContainerOfBooks(index, 1000);
  });
});
function showContainerOfBooks(index, timeout) {
  favoritesContainer.forEach((item, i) => {
    fadeOut(item, timeout);
  });
  setTimeout(() => {
    fadeIn(favoritesContainer[index], timeout, 'grid');
  }, timeout);
}
showContainerOfBooks(0);
function activeLabel(index) {
  labelsOfWeather.forEach(item =>
    item.classList.remove('favorites-label_active'),
  );
  labelsOfWeather[index].classList.add('favorites-label_active');
}

//---------------------------Slider at Favorites---------------------------