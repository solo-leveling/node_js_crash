function delayFunc(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

console.log("Start");
delayFunc(2000).then(() => console.log("After 2 sec"));
console.log("End");

function divideFunc(num1, num2, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num2 === 0) {
        reject("can't be divided by 0");
      } else {
        resolve(num1 / num2);
      }
    }, time);
  });
}

divideFunc(3, 0, 3000)
  .then((resolve) => console.log(resolve, "res"))
  .catch((reject) => console.log(reject, "err"));
