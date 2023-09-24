'use strict';

const audio = new Audio();
const btnToggle = document.querySelector('.btn-toogle');
const audioCurrentTime = document.querySelector('.audio-player__current-time');
const audioDurationTime = document.querySelector(
  '.audio-player__duration-time',
);
const audioTimeline = document.querySelector('.audio-player__timeline');
const audioProgress = document.querySelector('.audio-player__progress');
const audioPrev = document.querySelector('.btn-backward');
const audioNext = document.querySelector('.btn-forward');
let backgroundImg = document.querySelector('#background');
let audioPlayerImg = document.querySelector('.music-cover');
let audioSingerName = document.querySelector('.audio-player__singer');
let audioTrackName = document.querySelector('.audio-player__track-name');
let i = 0;
const musicArr = [
  {
    singer: 'Beyounce',
    trackName: "Don't hurt yourself",
    link: './assets/audio/beyonce.mp3',
    img: './assets/img/lemonade.png',
  },
  {
    singer: 'Dua Lipa',
    trackName: "Don't Start Now",
    link: './assets/audio/assets_audio_dontstartnow.mp3',
    img: './assets/img/dontstartnow.png',
  },
];
audio.src = musicArr[i].link;
backgroundImg.src = musicArr[i].img;
audioPlayerImg.src = musicArr[i].img;
audioSingerName.textContent = musicArr[i].singer;
audioTrackName.textContent = musicArr[i].trackName;

audio.addEventListener('loadedmetadata', () => {
  audioCurrentTime.textContent = getTimeCodeFromNum(audio.currentTime);
  audioDurationTime.textContent = getTimeCodeFromNum(audio.duration);
});

audioTimeline.addEventListener('click', e => {
  const timelineWidth = window.getComputedStyle(audioTimeline).width;
  const toSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
  audio.currentTime = toSeek;
  audio.play();
  audioPlayerImg.style.transform = 'scale(1.2)';
  btnToggle.src = './assets/svg/pause.png';
});

setInterval(() => {
  audioProgress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
  audioCurrentTime.textContent = getTimeCodeFromNum(audio.currentTime);
  if (audio.ended) {
    i = i === musicArr.length ? 0 : i + 1;
    changeTrack();
  }
}, 250);

function changeTrack() {
  audio.src = musicArr[i].link;
  audio.play();
  btnToggle.src = './assets/svg/pause.png';
  audioPlayerImg.style.transform = 'scale(1.2)';
  backgroundImg.src = musicArr[i].img;
  audioPlayerImg.src = musicArr[i].img;
  audioSingerName.textContent = musicArr[i].singer;
  audioTrackName.textContent = musicArr[i].trackName;
}
audioPrev.addEventListener('click', () => {
  i = i < musicArr.length - 1 ? musicArr.length - 1 : i - 1;
  changeTrack();
});
audioNext.addEventListener('click', () => {
  i = i >= musicArr.length - 1 ? 0 : i + 1;
  changeTrack();
});

btnToggle.addEventListener('click', e => {
  if (audio.paused) {
    btnToggle.src = './assets/svg/pause.png';
    audioPlayerImg.style.transform = 'scale(1.2)';
    audio.play();
  } else {
    btnToggle.src = './assets/svg/play.png';
    audioPlayerImg.style.transform = 'scale(1)';
    audio.pause();
  }
});

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60,
  ).padStart(2, 0)}`;
}
console.log(`
1.Вёрстка +10
  1.1 вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека +5
  1.2 в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2.Кнопка Play/Pause +10
  2.1 есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5
  2.2 внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5
3.При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10
4.При смене аудиотрека меняется изображение - обложка аудиотрека +10
5.Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10
6.Отображается продолжительность аудиотрека и его текущее время проигрывания +10
7.Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо
Оценка: 70 баллов
`);
