let timer;
let isPaused = true;
let remainingTime = 2 * 60 * 60 + 15 * 60;

const timeDisplay = document.getElementById("time");
const startPauseBtn = document.getElementById("startPauseBtn");

document.getElementById('setTime').addEventListener('click', function () {
  const hours = parseInt(document.getElementById('hoursInput').value) || 0;
  const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
  const seconds = parseInt(document.getElementById('secondsInput').value) || 0;

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
    alert('Invalid time input. Please enter a valid time.');
    return;
  }

  remainingTime = hours * 3600 + minutes * 60 + seconds;
  updateDisplay();
});


function updateDisplay() {
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  timeDisplay.textContent = `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (remainingTime <= 15 * 60) {
    timeDisplay.style.color = 'red';
  } else if (remainingTime <= 60 * 60) {
    timeDisplay.style.color = 'yellow';
  } else {
    timeDisplay.style.color = 'white';
  }
}


function toggleTimer() {
  if (isPaused) {
    timer = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
        updateDisplay();
      } else {
        clearInterval(timer);
      }
    }, 1000);
    startPauseBtn.textContent = 'Pause';
  } else {
    clearInterval(timer);
    startPauseBtn.textContent = 'Start';
  }

  isPaused = !isPaused;
  timeDisplay.classList.toggle("paused");
}


function resetTimer() {
  clearInterval(timer);
  isPaused = true;
  startPauseBtn.textContent = 'Start';
  timeDisplay.classList.remove("paused");
  remainingTime = 2 * 60 * 60 + 15 * 60;
  updateDisplay();
}

updateDisplay();
