"use strict";

const account1 = {
  owner: "Dmitrii Fokeev",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2023-04-23T17:01:17.194Z",
    "2023-04-26T23:36:17.929Z",
    "2023-04-27T10:51:36.790Z",
  ],
  currency: "RUB",
  locale: "pt-PT",
};

const account2 = {
  owner: "Anna Filimonova",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Polina Filimonova",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  pin: 3333,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "es-PE",
};

const account4 = {
  owner: "Stanislav Ivanchenko",
  movements: [430, 1000, 700, 50, 90],
  pin: 4444,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
  ],
  currency: "USD",
  locale: "ru-RU",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const allBalance = accounts.map((value) => value.movements).flat().reduce((acc, value) => acc + value, 0);
let sorted = false;
let currentAccount;
let timer;
createLogIn(accounts);



function formatMovementDate(date) {

  const calcDaysPassed = function(date1, date2) {
    return Math.round((date1 - date2) / (1000 * 60 * 60 * 24));
  };
  const daysPassed = calcDaysPassed(new Date(), date);
  
  if (daysPassed === 0) return "Сегодня";
  if (daysPassed === 1) return "Вчера";
  if (daysPassed === 2) return "Прошло 2 дня";
  if (daysPassed === 3) return "Прошло 3 дня";
  if (daysPassed === 4) return "Прошло 4 дня";
  if (daysPassed === 5) return "Прошло 5 дней";
  if (daysPassed === 6) return "Прошло 6 дней";
  if (daysPassed === 7) return "Прошло 7 дней";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours() + 1).padStart(2, "0");
  const minutes = String(date.getMinutes() + 1).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}


function displayMovements(acc, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort ? [...acc.movements].sort((a, b) => a - b) : acc.movements;
  movs.forEach(function(value, key) {
    const type = value > 0 ? "deposit" : "withdrawal";
    const word = value > 0 ? "зачисление" : "снятие";
    const date = new Date(acc.movementsDates[key]);
    const displayDate = formatMovementDate(date);
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">
        ${key + 1} ${word}
      </div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${value}₽</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}


function updateUi(currentAccount) {
  displayMovements(currentAccount);
  calculateBalance(currentAccount);
  calculateSummary(currentAccount.movements);
}


function createLogIn(accs) {
  accs.forEach(function(value) {
    value.logIn = value.owner.toLowerCase().split(" ").map(function(value) {
      return value[0];
    }).join("");
  });
}


function calculateBalance(arr) {
  arr.balance = arr.movements.reduce(function(acc, value) {
    return acc + value;
  });
  labelBalance.textContent = `${arr.balance}₽`;
}


function calculateSummary(arr) {
  const sumIn = arr.filter((value) => value > 0).reduce((acc, value) => acc + value, 0);
  labelSumIn.textContent = `${sumIn}₽`;

  const sumOut = arr.filter((value) => value < 0).reduce((acc, value) => acc + value, 0);
  labelSumOut.textContent = `${Math.abs(sumOut)}₽`;

  labelSumInterest.textContent = `${sumIn + sumOut}₽`;
}

function startLogOut() {
  let time = 600;
  function tick() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${seconds}`;
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = "0";
    }
    time--;
  }
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
}


btnLogin.addEventListener('click', function(elem) {
  elem.preventDefault();
  currentAccount = accounts.find((acc) => acc.logIn === inputLoginUsername.value);
  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    if (timer) {
      clearInterval(timer);
    }
    timer = startLogOut();
    updateUi(currentAccount);
    inputLoginUsername.value = inputLoginPin.value = "";
    containerApp.style.opacity = '1';

    const local = navigator.language;
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "long",
      hour12: false,
    };
    labelDate.textContent = Intl.DateTimeFormat(local, options).format(
      new Date()
    );
  }
});


btnTransfer.addEventListener('click', function(elem) {
  elem.preventDefault();
  const recieveAcc = accounts.find((acc) => acc.logIn === inputTransferTo.value);
  const amount = Number(inputTransferAmount.value);
  if (recieveAcc && amount > 0 && currentAccount.balance >= amount && recieveAcc.logIn !== currentAccount.logIn) {
    currentAccount.movements.push(-amount);
    recieveAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    clearInterval(timer);
    timer = startLogOut();
    updateUi(currentAccount);
    inputTransferAmount.value = inputTransferTo.value = "";
  }
});


btnClose.addEventListener('click', function(elem) {
  elem.preventDefault();
  if (inputCloseUsername.value === currentAccount.logIn && Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(function(acc) {
      return acc.logIn === currentAccount.logIn;
    });
    accounts.splice(index, 1);
    containerApp.style.opacity = "0";
    inputCloseUsername.value = inputClosePin.value = "";
  }
});


btnLoan.addEventListener('click', function(elem) {
  elem.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0) {
    currentAccount.movementsDates.push(new Date().toISOString());
    currentAccount.movements.push(amount);
    clearInterval(timer);
    timer = startLogOut();
    updateUi(currentAccount);
  }
  inputLoanAmount.value = "";
});


btnSort.addEventListener('click', function(elem) {
  elem.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

