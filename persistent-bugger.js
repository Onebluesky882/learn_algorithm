/* 
Write a function, persistence, that takes in a positive parameter num and returns its multiplicative persistence, which is the number of times you must multiply the digits in num until you reach a single digit.

For example (Input --> Output):

39 --> 3 (because 3*9 = 27, 2*7 = 14, 1*4 = 4 and 4 has only one digit, there are 3 multiplications)
999 --> 4 (because 9*9*9 = 729, 7*2*9 = 126, 1*2*6 = 12, and finally 1*2 = 2, there are 4 multiplications)
4 --> 0 (because 4 is already a one-digit number, there is no multiplication)

*/
function persistence(num) {

  let count = num.toString().split("");

  let multi = 0;

  while (count.length !== 1) {

    let total = 1;

    for (let i = 0; i < count.length; i++) {

      total = total * Number(count[i]);

    }

    count = total.toString().split("");

    multi++;

  }

  return multi;

}
persistence();
