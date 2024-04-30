//song1 - Tu Me Vuelves Loco - Frankie Ruiz
//song2 - Eres Mía - Romeo Santos
//song3 - Santa - Rvssian, Rauw Alejandro, Ayra Starr

// Define audio player and other necessary elements
const audio = document.querySelector("#audioPlayer");
const playPauseButton = document.getElementById("play-pause-button");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const songTitle = document.querySelector("#songTitle");
const songArtist = document.querySelector("#songArtist");
const songImg = document.querySelector("#songImg");
const backgroundBlur = document.querySelector(".backgroundBlur");

// Define an array of audio files with their corresponding details
const audioFiles = [
  {
    title: "Tu Me Vuelves Loco",
    artist: "Frankie Ruiz",
    img: "./images/song1.jpg",
    file: "./music/song1.mp3",
  },
  {
    title: "Eres Mía",
    artist: "Romeo Santos",
    img: "./images/song2.jpg",
    file: "./music/song2.mp3",
  },
  {
    title: "Santa",
    artist: "Rvssian, Rauw Alejandro, Ayra Starr",
    img: "./images/song3.jpg",
    file: "./music/song3.mp3",
  },
];

let currentTrackIndex = 0;

// Function to load a track based on its index in the audioFiles array
function loadTrack(index) {
  audio.src = audioFiles[index].file;
  audio.load();
  audio.play();
  songTitle.textContent = audioFiles[index].title;
  songArtist.textContent = audioFiles[index].artist;
  songImg.innerHTML = `
        <img src="${audioFiles[index].img}" />
    `;
}

// Load the initial track
loadTrack(currentTrackIndex);

// Event listener for previous button
prevButton.addEventListener("click", () => {
  isPlaying = true;
  currentTrackIndex =
    (currentTrackIndex - 1 + audioFiles.length) % audioFiles.length;
  loadTrack(currentTrackIndex);
  checkIsPlaying();
  changeBackground(currentTrackIndex);
});

// Event listener for next button
nextButton.addEventListener("click", () => {
  isPlaying = true;
  currentTrackIndex = (currentTrackIndex + 1) % audioFiles.length;
  loadTrack(currentTrackIndex);
  checkIsPlaying();
  changeBackground(currentTrackIndex);
});

// Event listener for when the audio ends, to play the next track
audio.addEventListener("ended", () => {
  currentTrackIndex = (currentTrackIndex + 1) % audioFiles.length;
  loadTrack(currentTrackIndex);
});

// Function to change the background image based on the current track
function changeBackground(songIndex) {
  const body = document.body;
  const song = audioFiles[songIndex];
  if (song) {
    backgroundBlur.style.backgroundImage = `url('${song.img}')`;
  }
}

// Function to toggle play/pause functionality
let isPlaying = false;

function checkIsPlaying() {
  if (isPlaying) {
    audio.pause();
    playPauseButton.innerHTML = `
            <div class="playStopIcons">
                <ion-icon name="pause"></ion-icon>
            </div>
        `;
    playPauseButton.innerHTML = `
            <div class="playStopIcons">
                <ion-icon name="play"></ion-icon>
            </div>
        `;
  } else {
    audio.play();
    playPauseButton.innerHTML = `
            <div class="playStopIcons">
                <ion-icon name="pause"></ion-icon>
            </div>
        `;
  }
  isPlaying = !isPlaying;
}
// Initial check for play/pause button state
checkIsPlaying();

// Event listener for play/pause button
playPauseButton.addEventListener("click", () => {
  checkIsPlaying();
});

// Event listener for updating progress bar based on audio playback
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const progressWidth = (currentTime / duration) * 100 + "%";
  progress.style.width = progressWidth;
});

// Event listener for seeking through the audio using progress bar
progressBar.addEventListener("click", (e) => {
  const progressBarRect = progressBar.getBoundingClientRect();
  const clickX = e.clientX - progressBarRect.left;
  const progressBarWidth = progressBarRect.width;
  const seekTime = (clickX / progressBarWidth) * audio.duration;
  audio.currentTime = seekTime;
});

// Event listener to reset play/pause button when audio ends
audio.addEventListener("ended", () => {
  playPauseButton.innerHTML = `
        <div class="playStopIcons">
            <ion-icon name="pause"></ion-icon>
        </div>
    `;
  isPlaying = false;
});
