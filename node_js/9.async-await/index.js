function delayFunc(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function delayedGreet(name) {
  await delayFunc(3000);
  console.log(name);
}

delayedGreet("Hein");

async function division(num1, num2) {
  try {
    if (num2 === 0) throw new Error("Cannot be divided by 0");
    return num1 / num2;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}

async function mainFn() {
  console.log(await division(2, 10));
  console.log(await division(2, 0));
}

mainFn();
