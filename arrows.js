/**
  * Arrow functions have shorter syntax than function expressions.
  * These functions also lexically bind `this` value and are always anonymous.
  */
var foo = ["Hello", "World"];
let bar = foo.map(value => value.length);

console.log(bar);

//Arrow Function UpperCase
var domain = ["abcd", 'tesst', 'helloword'];
 
domain.map((val, key) => {
    console.log(val.toUpperCase());
});

//set timeout Arrow Function
setTimeout(() => {
    console.log('exxample test timeout !');
},3000)
