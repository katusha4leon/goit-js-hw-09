import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
   seconds: document.querySelector('span[data-seconds]'),
   minutes: document.querySelector('span[data-minutes]'),
   hours: document.querySelector('span[data-hours]'),
   days: document.querySelector('span[data-days]'),
};

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

startBtn.setAttribute("disabled", "");

input.addEventListener('input', onInput);
startBtn.addEventListener('click', onBtnClick);

function onInput() {
   const selectedDate = flatpickrInstance.selectedDates[0];
   const remainingTime = selectedDate - new Date();
   if (remainingTime > 0) {
      startBtn.disabled = false;
   } else {
      Notify.failure('Please choose a date in the future');
   }
}

function onBtnClick() {
   const selectedDate = flatpickrInstance.selectedDates[0];
   input.setAttribute("disabled", "");
   startBtn.setAttribute("disabled", "");
   let timerId = setInterval(() => {
      const remainingTime = selectedDate - new Date();
      if (remainingTime < 0) {
         clearInterval(timerId);
         input.removeAttribute("disabled", "");
         return;
      }
      convertMs(remainingTime);
   }, 1000);
}

function convertMs(ms) {
   const second = 1000;
   const minute = second * 60;
   const hour = minute * 60;
   const day = hour * 24;
   const days = addLeadingZero(Math.floor(ms / day));
   const hours = addLeadingZero(Math.floor((ms % day) / hour));
   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
   const seconds = addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
   );
   elements.seconds.textContent = seconds;
   elements.minutes.textContent = minutes;
   elements.hours.textContent = hours;
   elements.days.textContent = days;
   return { days, hours, minutes, seconds };
}
   
function addLeadingZero(value) {
   return value.toString().padStart(2, '0');
}
   
const options = {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
   onClose(selectedDates) {
      selectedDates[0];
   },
};

const flatpickrInstance = flatpickr(input, options);
