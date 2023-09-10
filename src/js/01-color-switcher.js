const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}

refs.stopBtn.setAttribute("disabled", "");
// let timerId = null;

refs.startBtn.addEventListener("click", onStartBtnClick);

function onStartBtnClick() {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    refs.startBtn.setAttribute("disabled", "");
    refs.stopBtn.removeAttribute("disabled");
}

refs.startBtn.addEventListener("click", onStopBtnClick);

function onStopBtnClick() {
    clearInterval(timerId);
    refs.stopBtn.setAttribute("disabled", "");
    refs.startBtn.removeAttribute("disabled");
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
