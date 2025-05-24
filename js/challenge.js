const likeButton = document.querySelector('#heart')
const plusButton = document.querySelector('#plus')
const minusButton = document.querySelector('#minus')
const buttons = [likeButton, plusButton, minusButton]
const pauseButton = document.querySelector('#pause')
const commentForm = document.querySelector('#document-form')
const counter = document.querySelector('#counter')

document.addEventListener('DOMContentLoaded', () => {
  repeatFunctionCall(changeTimer(1), 1001)
  plusButton.addEventListener('click', changeTimer(1))
  minusButton.addEventListener('click', changeTimer(-1))
  pauseButton.addEventListener('click', togglePaused)
})

const changeTimer = (amountByWhichToChange) => {
  return () => {
    counter.textContent = (Number.parseInt(counter.textContent) + amountByWhichToChange).toString()
  }
}

const repeatFunctionCall = (funcToRun, frequency) => {
  let intervalId = setInterval(funcToRun, frequency);
  return intervalId;
}

const togglePaused = () => {
  for (const button of buttons) {
    button.toggleAttribute('disabled')
  }
  pauseButton.textContent = pauseButton.textContent === 'resume' ? 'pause' : 'resume'
}
