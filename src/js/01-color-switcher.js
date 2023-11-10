const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};
refs.btnStart.addEventListener('click', onBtnStartClick);
refs.btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
  colorSwitcher.start();
}
function onBtnStopClick() {
  colorSwitcher.stop();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const colorSwitcher = {
  setIntervalID: null,
  disabledStart: false,

  start() {
    if (this.disabledStart) return;
    this.disabledStart = true;
    this.setIntervalID = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  },

  stop() {
    clearInterval(this.setIntervalID);
    this.disabledStart = false;
  },
};
