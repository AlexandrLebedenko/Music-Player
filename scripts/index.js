const songs = [
  {
    title: "Lost in the City Lights",
    author: "Cosmo Sheldrake",
    src: "../music/lost-in-city-lights-145038.mp3",
    img: "../img/cover-1.jpg",
  },
  {
    title: "Forest Lullaby",
    author: "Lesfm",
    src: "../music/forest-lullaby-110624.mp3",
    img: "../img/cover-2.jpg",
  },
];
let currentSongIndex = 0;
const audio = document.querySelector(".audio");
const playBtn = document.querySelector(".control-btn--play");
const nextBtn = document.querySelector(".control-btn--next");
const prevBtn = document.querySelector(".control-btn--prev");
const currentTrackTime = document.querySelector(".time-row--current-time");
const durationTrackTime = document.querySelector(".time-row--duration-time");
const progressBar = document.querySelector(".progress-bar__time-line");
playBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
function playPause() {
  audio.paused ? audio.play() : audio.pause();
}
function nextSong() {
  // Add next button implementation
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
}
function prevSong() {
  // Add previous button implementation
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
}
function loadSong(index) {
  // Add load song implementation
  audio.src = songs[index].src;
  progressBar.value = 0;
  progressBar.style.background = `linear-gradient(to right, #c93b76 0%, #ffffff 0%)`;
  let songCover = document.querySelector(".img-box__item");
  let songName = document.querySelector(".song-name");
  let songAuthor = document.querySelector(".song-author");
  songCover.src = songs[index].img;
  songName.textContent = songs[index].title;
  songAuthor.textContent = songs[index].author;
  audio.play();
}
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}
audio.addEventListener("ended", nextSong);
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = audio.currentTime;
  currentTrackTime.textContent = formatTime(audio.currentTime);
  progressBar.style.background = `linear-gradient(to right, #c93b76 ${percent}%, #ffffff ${percent}%)`;
});
audio.addEventListener("loadedmetadata", () => {
  progressBar.max = audio.duration;
  durationTrackTime.textContent = formatTime(audio.duration);
});
progressBar.addEventListener("input", () => {
  audio.currentTime = progressBar.value;
});
// Initial load
loadSong(currentSongIndex);
