
var foo = ["Hello", "World"];
let bar = foo.map(value => {
    return value.length
});

console.log(bar);

//Arrow Function UpperCase
var domain = ["abcd", 'tesst', 'helloword'];
 
domain.map((val, key) => {
    console.log(key, val.toUpperCase());
});

//set timeout Arrow Function
setTimeout(() => {
    console.log('exxample test timeout !');
},3000)
