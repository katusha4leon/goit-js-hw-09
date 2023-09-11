const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

stopBtn.setAttribute("disabled", "")
let timerId = null;

startBtn.addEventListener("click", onStartBtnClick);

function onStartBtnClick() {
  startBtn.setAttribute("disabled", "");
  stopBtn.removeAttribute("disabled");
  timerId = setInterval(() => {
     document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

stopBtn.addEventListener("click", onStopBtnClick);
function onStopBtnClick () {
   clearInterval(timerId);
   stopBtn.setAttribute("disabled", "");
   startBtn.removeAttribute("disabled");
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};