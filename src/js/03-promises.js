import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', e => {
  e.preventDefault();

  let delay = Number(e.currentTarget.delay.value);
  let step = Number(e.currentTarget.step.value);
  let amount = Number(e.currentTarget.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });
    delay = delay + step;
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promiseValue = { position, delay };

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      // Fulfill
      resolve(promiseValue);
    } else {
      // Reject
      reject(promiseValue);
    }
  });
}
