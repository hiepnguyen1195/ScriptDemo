
function* count(){
    var start = 0;
    while(true) {
      yield start;
      ++start;
    }
  }
  
  var iterator = count();
  
console.log(iterator.next());   // {value: 0, done: false}
console.log(iterator.next());   // {value: 1, done: false}
console.log(iterator.next());   // {value: 2, done: false}
iterator.return();

// generators matching
let fibonacci = function* (numbers) {
  let pre = 0, cur = 1;
  while (numbers-- > 0) {
      [ pre, cur ] = [ cur, pre + cur ];
      yield cur;
  }
}

for (let n of fibonacci(20))
console.log(n);

let numbers = [ ...fibonacci(20) ];
console.log(numbers);
