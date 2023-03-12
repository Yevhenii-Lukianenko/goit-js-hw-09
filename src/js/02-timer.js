import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),

  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.addEventListener('click', startTimer);

// do disabled btn by default
refs.startBtn.disabled = true;

// record the selected date and timer activity
let selectedDate = null;

// record the date selection options
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(date) {
    if (date[0] < options.defaultDate) {
      refs.startBtn.disabled = true;
      return Notify.failure('Please choose a date in the future');
    }
    refs.startBtn.disabled = false;
    selectedDate = date[0];
  },
};

// bind options to the input field
flatpickr(refs.inputDate, options);

// convert milliseconds
function convertMs(ms) {
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
}

//start the timer and put it on the display
function startTimer() {
  refs.startBtn.disabled = true;
  refs.inputDate.disabled = true;

  const intervalId = setInterval(() => {
    let timeLeft = selectedDate - new Date();

    // stop timer
    if (timeLeft <= 0) {
      clearInterval(intervalId);
      refs.startBtn.disabled = true;
      refs.inputDate.disabled = false;
      return Notify.success('Congrats!!! Time out!!! ');
    }

    // put value on the display
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
  }, 1000);
}

function addLeadingZero(value) {
  if (value < 10) {
    return value.toString().padStart(2, '0');
  }
  return value;
}

// add styles to the window
const body = document.querySelector('body');
const timer = body.querySelector('.timer');
const field = body.querySelectorAll('.field');
const value = body.querySelectorAll('.value');
const label = body.querySelectorAll('.label');

body.style.backgroundColor = '#2e2e2e';

timer.style.display = 'flex';
timer.style.justifyContent = 'center';
timer.style.gap = '40px';
timer.style.marginTop = '300px';

timer.style.color = '#fbfbfb';
value.forEach(el => {
  el.style.fontSize = '50px';
});

label.forEach(el => {
  el.style.fontSize = '15px';
});

field.forEach(el => {
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.alignItems = 'center';
});
