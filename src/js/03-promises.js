import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};
   
form.addEventListener('submit', onBtnClick);

function onBtnClick (event) {
  event.preventDefault();
      
  const delay = Number(event.target.delay.value);
  const step = Number(event.target.step.value);
  const amount = Number(event.target.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    Promise.resolve()
      .then(() => {
      return createPromise(i, delay + (i - 1) * step)
      .then((promise) => {
        Notify.success(`Fulfilled promise ${promise.position} in ${promise.delay}ms`);
      })
      .catch((error) => {
        Notify.failure(`Rejected promise ${error.position} in ${error.delay}ms`);
      });
    });
  }
};