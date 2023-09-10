import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
   input: document.querySelector('#datetime-picker'),
   startBtn: document.querySelector('button[data-start]'),
   spanDays: document.querySelector('span[data-days]'),
   spanHours: document.querySelector('span[data-hours]'),
   spanMinutes: document.querySelector('span[data-minutes]'),
   spanSeconds: document.querySelector('span[data-seconds]'),
   msToEvent: 0,
   options: {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onChange(selectedDates) {
         elements.msToEvent = selectedDates[0] - elements.options.defaultDate;
         if (elements.msToEvent > 0) {
            elements.startBtn.removeAttribute("disabled");
            timer(elements.msToEvent);
         } else {
            Notify.warning('Please choose the future date');
            elements.startBtn.setAttribute("disabled", "");
         };
      },
   },
};

flatpickr(elements.input, elements.options);
elements.startBtn.setAttribute("disabled", "");

function timer(time) {
   convertMs(time);
   const { days, hours, minutes, seconds } = convertMs(elements.msToEvent);
   elements.spanDays.textContent = addLeadingZero(days);
   elements.spanHours.textContent = addLeadingZero(hours);
   elements.spanMinutes.textContent = addLeadingZero(minutes);
   elements.spanSeconds.textContent = addLeadingZero(seconds);
};

elements.startBtn.addEventListener("click", onBtnClick);

function onBtnClick() {
   elements.input.setAttribute("disabled", "");
   elements.startBtn.setAttribute("disabled", "");
   const timerId = setInterval(() => {
      elements.msToEvent -= 1000;
      timer(elements.msToEvent);
      if (elements.msToEvent < 1000) {
         clearInterval(timerId);
         elements.input.removeAttribute("disabled", "");
         Notify.success('Congratulations. Discounts are active');
      }
  }, 1000);
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
};