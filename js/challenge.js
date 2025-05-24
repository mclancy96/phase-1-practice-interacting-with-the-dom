const likeButton = document.querySelector('#heart')
const plusButton = document.querySelector('#plus')
const minusButton = document.querySelector('#minus')
const buttons = [likeButton, plusButton, minusButton]
const pauseButton = document.querySelector('#pause')
const commentForm = document.querySelector('#document-form')
const counter = document.querySelector('#counter')
let activeIntervalId;

document.addEventListener('DOMContentLoaded', () => {
  repeatFunctionCall(changeTimer(1), 1001)
  plusButton.addEventListener('click', changeTimer(1))
  minusButton.addEventListener('click', changeTimer(-1))
  pauseButton.addEventListener('click', handlePause)
})

const changeTimer = (amountByWhichToChange) => {
  return () => {
    counter.textContent = (Number.parseInt(counter.textContent) + amountByWhichToChange).toString()
  }
}

const repeatFunctionCall = (funcToRun, frequency) => {
  if (activeIntervalId) {
    clearInterval(activeIntervalId);
  }
  activeIntervalId = setInterval(funcToRun, frequency);
  return activeIntervalId;
}

const stopFunctionCall = () => {
  if (activeIntervalId) {
    clearInterval(activeIntervalId);
    activeIntervalId = null;
    return true;
  }
  return false;
}

const handlePause = () => {
  startStopTimer();
  togglePaused();
}

const togglePaused = () => {
  for (const button of buttons) {
    button.toggleAttribute('disabled')
  }
  pauseButton.textContent = pauseButton.textContent === 'resume' ? 'pause' : 'resume'
}

const startStopTimer = () => {
  if (pauseButton.textContent === 'resume') {
    repeatFunctionCall(changeTimer(1), 1001)
  } else {
    stopFunctionCall();
  }
}
