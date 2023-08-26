// Declare global variables
let timer;
let isPaused = true;
let remainingTime = 2 * 60 * 60 + 15 * 60;  // Default remaining time in seconds

// Get DOM elements for timer display and controls
const timeDisplay = document.getElementById("time");
const startPauseBtn = document.getElementById("startPauseBtn");

// Audio elements for various cues
const audioStart = new Audio('/assets/sound_goodluck.mp3');
const audioHalftime = new Audio('/assets/sound_half.mp3');
const audioFinal = new Audio('/assets/sound_final.mp3');
const audioGameOver = new Audio('/assets/sound_game_over.mp3');

// Flags to ensure halftime and final audio cues are played only once
let halftimeAudioPlayed = false;
let finalAudioPlayed = false;

// Event listener for 'setTime' button
document.getElementById('setTime').addEventListener('click', function () {
  // Parse and validate user inputs
  const hours = parseInt(document.getElementById('hoursInput').value) || 0;
  const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
  const seconds = parseInt(document.getElementById('secondsInput').value) || 0;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
    alert('Invalid time input. Please enter a valid time.');
    return;
  }

  // Update the remaining time and display
  remainingTime = hours * 3600 + minutes * 60 + seconds;
  updateDisplay();

  // Pause the timer when a new time is set
  clearInterval(timer);
  isPaused = true;
  startPauseBtn.textContent = 'Start';
  timeDisplay.classList.remove("paused");
});

// Function to update timer display and handle color changes and audio cues
function updateDisplay() {
  // Convert remaining time to hours, minutes, and seconds
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  // Update the timer display
  timeDisplay.textContent = `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Handle color changes and audio cues
  if (remainingTime < 15 * 60) {
    timeDisplay.style.color = 'red';
    if (!finalAudioPlayed) {
      audioFinal.play();
      finalAudioPlayed = true;
    }
  } else if (remainingTime < 4050) {  // Changed to 4050 seconds for 01:07:30
    timeDisplay.style.color = 'yellow';
    if (!halftimeAudioPlayed) {
      audioHalftime.play();
      halftimeAudioPlayed = true;
    }
  } else {
    timeDisplay.style.color = 'white';
    halftimeAudioPlayed = false;
    finalAudioPlayed = false;
  }
}


// Function to start or pause the timer
function toggleTimer() {
  if (isPaused) {
    timer = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
        updateDisplay();
      } else {
        clearInterval(timer);
        audioGameOver.play();
      }
    }, 1000);
    startPauseBtn.textContent = 'Pause';
    audioStart.play();
  } else {
    clearInterval(timer);
    startPauseBtn.textContent = 'Start';

    // Stop all currently playing audio
    audioStart.pause();
    audioStart.currentTime = 0;
    audioHalftime.pause();
    audioHalftime.currentTime = 0;
    audioFinal.pause();
    audioFinal.currentTime = 0;
  }

  isPaused = !isPaused;
  timeDisplay.classList.toggle("paused");
}

// Function to reset the timer to its default state
function resetTimer() {
  clearInterval(timer);
  isPaused = true;
  startPauseBtn.textContent = 'Start';
  timeDisplay.classList.remove("paused");
  remainingTime = 2 * 60 * 60 + 15 * 60;
  halftimeAudioPlayed = false;
  finalAudioPlayed = false;

  // Stop all currently playing audio
  audioStart.pause();
  audioStart.currentTime = 0;
  audioHalftime.pause();
  audioHalftime.currentTime = 0;
  audioFinal.pause();
  audioFinal.currentTime = 0;

  updateDisplay();
}