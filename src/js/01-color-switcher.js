const bodyRef = document.body;
const startBtnRef = bodyRef.querySelector('[data-start]');
const stopBtnRef = bodyRef.querySelector('[data-stop]');

let timerChange = null;

startBtnRef.addEventListener('click', changeColor);
stopBtnRef.addEventListener('click', stopChangeColor);

function changeColor() {
  startBtnRef.disabled = true;
  timerChange = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChangeColor() {
  clearInterval(timerChange);
  startBtnRef.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
