'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const [i, el] = movements;
// console.log(movements);
// const movement = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(Math.abs(-4000));
/////////////////////////////////////////////////
// for (const [i, el] of movements.entries()) {
//   // console.log(i, el);
//   if (el > 0) {
//     console.log(`movement ${i + 1}:you deposited ${el}`);
//   } else {
//     console.log(`movement ${i + 1}: you withdraw ${Math.abs(el)}`);
//   }
// }
// console.log(`------Different-------`);
// currencies.forEach(function (value, key) {
//   console.log(`${key},${value}`);
// });
// function myFunction(julia, kate) {
//   const julia2 = [...julia];
//   julia2.splice(0, 1);
//   julia2.splice(-2);
//   const final = [...julia2, ...kate];

//   final.forEach(function (el, i) {
//     el >= 3
//       ? console.log(`Dog no ${i + 1} is an adult and is ${el} years old`)
//       : console.log(`Dog no ${i + 1} is still a puppy 🐶`);
//   });
// }
// myFunction([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// console.log(`-------TEST DATA 2---------` );
// const test1 = [3, 5, 2, 12, 7];
// const test2 = [9, 15, 6, 8, 3];
// const julia3 = [...test1];
// julia3.splice(0, 1);
// julia3.splice(-2);
// const final2 = [...julia3, ...test2];
// final2.forEach(function (el2, i2) {
//   el2 >= 3
//     ? console.log(`Dog no ${i2 + 1} is an adult and is ${el2} years old`)
//     : console.log(`Dog no ${i2 + 1} is still a puppy 🐶`);
// });
//

containerMovements.innerHTML = ' ';
function displayValue(mov) {
  mov.forEach(function (el, i) {
    const type = el > 0 ? 'deposit' : 'withdrawal';

    const html = `

        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date"></div>
          <div class="movements__value">${el.toFixed(2)}€</div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

console.log(accounts);
// console.log(accounts.username);

function balance(acc) {
  acc.balance = acc.movements.reduce(function (acu, curr) {
    return acu + curr;
  });
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
}

const euroToUUsd = 1.1;

function displaySummury(mov) {
  const posval = mov.filter(function (mov) {
    return mov > 0;
  });
  const sinVal = posval.reduce(function (acc, curr) {
    return acc + curr;
  });
  labelSumIn.textContent = `${sinVal.toFixed(2)}€`;
}
// displaySummury(account1.movements);

function displaySummury2(mov) {
  const posval2 = mov.filter(function (mov) {
    return mov < 0;
  });
  const sinVal2 = posval2.reduce(function (acc, curr) {
    return acc + curr;
  });
  labelSumOut.textContent = `${Math.abs(sinVal2).toFixed(2)}€`;

  const interest = mov
    .filter(function (mov) {
      return mov > 0;
    })
    .map(function (mov) {
      return (mov * 1.2) / 100;
    })
    .filter(function (mov) {
      return mov >= 1;
    })
    .reduce(function (acc, curr) {
      return acc + curr;
    });
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
}
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
// displaySummury2(account1.movements);
// let currentAccount;
// btnLogin.addEventListener('click', function (e) {
//   e.preventDefault();

//   currentAccount = accounts.find(
//     accs => accs.user === inputCloseUsername.value
//   );
//   console.log(currentAccount);

//   if (currentAccount?.pin === Number(inputLoginPin.value)) {
//     console.log('login');

//     labelWelcome.textContent = `Welcome back,${
//       currentAccount.owner.split(' ')[0]
//     }`;
//     containerApp.style.opacity = 100;
//     inputCloseUsername.value = inputLoginPin.value = '';
// balance(currentAccount.movements);
// displaySummury(currentAccount);
// displaySummury2(currentAccount);
// displayValue(currentAccount.movements);
//   }
// });
const updateUI = function (acc) {
  // Display movements
  displayValue(acc.movements);

  // Display balance
  balance(currentAccount);

  // Display summary
  // displaySummary(acc);
  // displaySummary2(acc);
};

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
    displaySummury(currentAccount.movements);
    displaySummury2(currentAccount.movements);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiver = accounts.find(function (acc) {
    return acc.username === inputTransferTo.value;
  });

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiver != currentAccount
  ) {
    currentAccount.movements.push(-amount);
    receiver.movements.push(amount);
    updateUI(currentAccount);
    displaySummury2(currentAccount.movements);
    displaySummury(currentAccount.movements);
  }
  inputTransferAmount.value = inputTransferTo.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(function (acc) {
      return acc.username === currentAccount.username;
    });
    // console.log(index);
    accounts.splice(index);
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = '';
    labelWelcome.textContent = 'Login to get started';
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(Number(inputLoanAmount.value));
  console.log(amount);
  if (
    amount > 0 &&
    currentAccount.movements.some(function (mov) {
      return mov >= amount * 0.1;
    })
  ) {
    console.log(`button clicked`);
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
    displaySummury(currentAccount.movements);
    displaySummury2(currentAccount.movements);
  }
  inputLoanAmount.value = '';
});
btnSort.addEventListener('click', function (acc) {
  return currentAccount.movements.sort();
});
//

// btnTransfer.addEventListener('click', function (e) {
//   e.preventDefault();
//   const amount = Number(inputTransferAmount.value);
//   const receiverAcc = accounts.find(
//     acc => acc.username === inputTransferTo.value
//   );
//   inputTransferAmount.value = inputTransferTo.value = '';

//   if (
//     amount > 0 &&
//     receiverAcc &&
//     currentAccount.balance >= amount &&
//     receiverAcc?.username !== currentAccount.username
//   ) {
//     // Doing the transfer
//     currentAccount.movements.push(-amount);
//     receiverAcc.movements.push(amount);

//     // Update UI
//     updateUI(currentAccount);
//   }
// });

// InputFunction(accounts);
// console.log(accounts);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const deposits = movements.filter(function (val) {
//   return val > 0;
// });
// console.log(deposits);
// console.log(movements);
// const withdrawals = movements.filter(function (val) {
//   return val < 0;
// });
// console.log(withdrawals);
// for (const [i, el] of movements.entries( )) console.log(i, el);
// withdrawals.forEach(function (y, i) {
//   console.log(i, y);
// });
function age(ages) {
  const humanAges = ages
    .map(el => (el <= 2 ? 2 * el : 16 + el * 4))
    .filter(el => el >= 18)
    .reduce((acc, val, i, arr) => acc + val / arr.length, 0);

  // console.log(humanAges);
}
age([5, 2, 4, 1, 15, 8, 3]);
const bankDepositsSum = accounts
  .flatMap(function (acc) {
    return acc.movements;
  })
  .filter(function (acc) {
    return acc > 0;
  })
  .reduce(function (acc, el) {
    return acc + el;
  });

console.log(bankDepositsSum);
const deposits1000 = accounts
  .flatMap(function (acc) {
    return acc.movements;
  })
  .filter(function (acc) {
    return acc > 1000;
  }).length;
console.log(deposits1000);

// const obj = accounts
//   .flatMap(function (acc) {
//     return acc.movements;
//   })
//   .reduce(
//     function (acc, el) {
//       return el > 0 ? (acc.deposit += el) : (acc.withdrawal += el);
//     },
//     { deposit: 0, withdrawal: 0 }
//   );
// console.log(obj);

// This Is A Nice Title
function convert(word) {
  return word
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(' ');
}
console.log(convert(`hEllo I am vIshnU`));

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(function (acc) {
  return (acc.recemmendedFood = acc.weight ** 0.75 * 20);
});
console.log(dogs);

const dogSarah = dogs.find(function (acc) {
  return acc.owners.includes('Sarah');
});
if (dogSarah.curFood > dogSarah.recemmendedFood) {
  console.log('Sarah dog is eating too much');
} else {
  console.log('No its fyn');
}

console.log(dogSarah);

const eatingTooMuch = dogs
  .filter(dog => dog.curFood > dog.recemmendedFood)
  .flatMap(dog => dog.owners);

console.log(eatingTooMuch);

const eatingTooLittle = dogs
  .filter(dog => dog.curFood < dog.recemmendedFood)
  .flatMap(dog => dog.owners);

console.log(eatingTooLittle);
console.log(
  dogs.some(function (dog) {
    return dog.curFood === dog.recemmendedFood;
  })
);
