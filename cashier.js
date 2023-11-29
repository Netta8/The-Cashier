//The Cashier
function createCashCounter() {
  const cashBox = [
    { 50: 10 },
    { 20: 10 },
    { 10: 10 },
    { 5: 25 },
    { 2: 25 },
    { 1: 25 },
    { 0.5: 25 },
    { 0.2: 25 },
    { 0.1: 25 },
    { 0.05: 25 },
    { 0.02: 25 },
    { 0.01: 25 },
  ];

  return function cashCounter(price, costumerPaid) {
    let changeForTheCostumer = costumerPaid - price; //calculating the change to be given to the customer

    if (changeForTheCostumer < 0) {
      //If the change is negative I can tell how much more the customer should pay
      return (
        "You should pay " +
        (-1 * changeForTheCostumer).toFixed(2) +
        " Euro more"
      );
    }
    //responsible for calculating and returning the number of notes/coins that the cashier needs to give to the customer as change.
    let result = [];

    for (let i = 0; i < cashBox.length; i++) {
      let cashInCashier = Object.keys(cashBox[i])[0]; // get the current note from the array of notes

      console.log("This is the cashInCashier: ", cashInCashier);

      let count = Math.floor(changeForTheCostumer / cashInCashier);
      //The for loop iterates through each element in the cashBox array. For each element, it extracts the note value using Object.keys(cashBox[i])[0] which returns the first key in the current object in the loop. The note variable is then used to calculate the number of the money (notes/coins) needed by the customer by dividing the remaining change (changeForTheCostumer) by the value of the note.

      console.log("This is the COUNT: ", count);

      if (count > 0 && cashBox[i][cashInCashier] >= count) {
        //If there are enough notes/coins of the current denomination in the cashBox to give the customer the required amount of change, then a new object is added to the result array with the note value as a string and the count of notes as its value.
        result.push({ [cashInCashier + " Euro"]: count });
        changeForTheCostumer -= count * cashInCashier;
        cashBox[i][cashInCashier] -= count; //subtract the number of notes we used for the original array
        console.log("how much left??", cashBox[i][cashInCashier]);
      }
    }

    if (changeForTheCostumer > 0.01) {
      //If there are not enough change in the cashBox it will give me a note the there is no change available
      return "No change available";
    }

    return result; //returns the result array, which contains the notes and coins to be given as change.
  };
}

let cashCounter = createCashCounter();

console.log("result 1: ", cashCounter(3.75, 50)); //[ { '20 Euro': 2 }, { '5 Euro': 1 }, { '1 Euro': 1 },  { '0.2 Euro': 1 },  { '0.02 Euro': 2 }]
//console.log("result 2: ", cashCounter(3.75, 20)); // [ { '10 Euro': 1 },  { '5 Euro': 1 },  { '1 Euro': 1 },  { '0.2 Euro': 1 },  { '0.02 Euro': 2 }]
//console.log("result 3: ", cashCounter(4.5, 20)); // [ { '10 Euro': 1 }, { '5 Euro': 1 }, { '0.5 Euro': 1 } ]
//console.log("result 4: ", cashCounter(4, 3)); // You should pay 1.00 Euro more
//console.log("result 5: ", cashCounter(4.5, 1000)); //No change available
