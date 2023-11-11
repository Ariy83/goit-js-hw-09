import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formInput: document.querySelector('.form'),
};

refs.formInput.addEventListener('submit', onFormBtnSubmit);

function onFormBtnSubmit(e) {
  e.preventDefault();

  let firstDelay = +e.target.elements.delay.value;
  let delayStep = +e.target.elements.step.value;
  let amountPromises = +e.target.elements.amount.value;

  for (let i = 0; i < amountPromises; i++) {
    let delay = firstDelay + i * delayStep;
    let position = i;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position + 1} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
