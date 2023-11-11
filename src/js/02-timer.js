import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.btnStart.disabled = true;
refs.btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  timer.start();
  timer.deadline = picker[0];
}

let picker = [];

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Report.warning('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;
    }
    return picker.push(selectedDates[0].getTime());
  },
};

const fp = flatpickr('#datetime-picker', options);

const timer = {
  inrevalID: null,
  disabledStart: false,
  deadline: null,

  start() {
    if (this.disabledStart) return;
    this.disabledStart = true;
    this.setIntervalID = setInterval(() => {
      this.tick();
    }, 1000);
  },

  stop() {
    clearInterval(this.inrevalID);
    this.disabledStart = false;
  },

  tick() {
    const currentTime = Date.now();
    const diff = this.deadline - currentTime;
    const time = this.convertMs(diff);
    if (diff < 0) {
      this.stop();
      return;
    }
    renderTime(time);
  },

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  },
};

function renderTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = timer.addLeadingZero(hours);
  refs.minutes.textContent = timer.addLeadingZero(minutes);
  refs.seconds.textContent = timer.addLeadingZero(seconds);
}
