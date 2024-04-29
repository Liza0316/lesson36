let time = window.DEFAULT_TIME;
let timerId;
let isRunning = false;

const timeDisplay = document.getElementById('time-display');
const progressBar = document.getElementById('progress-bar');
const timeButton = document.getElementById('time-button');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const pauseButton = document.getElementById('pause-button');
const modal = document.getElementById('modal');
const setTimeButton = document.getElementById('set-time');
const closeButton = document.getElementsByClassName('close')[0];

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function updateProgressBar() {
  progressBar.style.width = `${(time / window.DEFAULT_TIME) * 100}%`;
  progressBar.style.backgroundColor = isRunning ? 'red' : 'green';
}

function showModal() {
  modal.style.display = 'block';
}

function hideModal() {
  modal.style.display = 'none';
}

timeButton.addEventListener('click', function() {
  if (!timerId) {
    showModal();
  }
});

setTimeButton.addEventListener('click', function() {
  const minutes = parseInt(document.getElementById('minutes').value);
  const seconds = parseInt(document.getElementById('seconds').value);
  if (!isNaN(minutes) && !isNaN(seconds)) {
    time = (minutes * 60 + seconds) * 1000;
    timeDisplay.textContent = formatTime(time);
    hideModal();
  }
});

startButton.addEventListener('click', function() {
  if (!timerId) {
    timerId = setInterval(function() {
      if (time > 0) {
        time -= 1000;
        timeDisplay.textContent = formatTime(time);
        isRunning = true;
        updateProgressBar();
      } else {
        clearInterval(timerId);
        timerId = undefined;
        time = window.DEFAULT_TIME;
        timeDisplay.textContent = formatTime(time);
        isRunning = false;
        updateProgressBar();
      }
    }, 1000);
  }
});

resetButton.addEventListener('click', function() {
  time = window.DEFAULT_TIME;
  timeDisplay.textContent = formatTime(time);
  updateProgressBar();
  clearInterval(timerId);
  timerId = undefined;
  isRunning = false;
  updateProgressBar();
});

pauseButton.addEventListener('click', function() {
  clearInterval(timerId);
  timerId = undefined;
  isRunning = false;
  updateProgressBar();
});

closeButton.addEventListener('click', hideModal);

window.addEventListener('click', function(event) {
  if (event.target == modal) {
    hideModal();
  }
});

window.addEventListener('load', function() {
  timeDisplay.textContent = formatTime(window.DEFAULT_TIME);
  updateProgressBar();
});
