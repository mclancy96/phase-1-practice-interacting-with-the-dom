const likeButton = document.querySelector('#heart')
const plusButton = document.querySelector('#plus')
const minusButton = document.querySelector('#minus')
const buttons = [likeButton, plusButton, minusButton]
const pauseButton = document.querySelector('#pause')
const commentForm = document.querySelector('#document-form')
const counter = document.querySelector('#counter')
const likeList = document.querySelector('.likes')
let activeIntervalId;

document.addEventListener('DOMContentLoaded', () => {
  repeatFunctionCall(changeTimer(1), 1000)
  plusButton.addEventListener('click', changeTimer(1))
  minusButton.addEventListener('click', changeTimer(-1))
  pauseButton.addEventListener('click', handlePause)
  likeButton.addEventListener('click', addLike)
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
    repeatFunctionCall(changeTimer(1), 1000)
  } else {
    stopFunctionCall();
  }
}

const addLike = () => {
  const num = counter.textContent;
  const potentialLikeElement = document.querySelector(`#like-${num}`)
  if (potentialLikeElement) {
    incrementLikeString(potentialLikeElement)
  } else {
    createLikeElement(num)
  }
}

const createLikeElement = (forNum) => {
  const likeEl = document.createElement('li')
  likeEl.id = `like-${forNum}`
  likeEl.textContent = createLikeString(forNum, 1)
  likeEl.setAttribute('count', 1)
  likeList.appendChild(likeEl)
}

const incrementLikeString = (likeElement) => {
  const num = likeElement.id.split('-')[1]
  const count = Number.parseInt(likeElement.getAttribute('count'))
  likeElement.textContent = createLikeString(num, count + 1)
  likeElement.setAttribute('count', count + 1)
}

const createLikeString = (num, likeCount) => {
  if (likeCount === 1) {
    return `${num} has been liked ${likeCount} time`
  }
  return `${num} has been liked ${likeCount} times`
}
