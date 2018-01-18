// tách dữ liệu được lưu trữ bên trong array hoac object và gán chúng cho các biến riêng biệt.

//Array Destructuring 

let characters = ['a', 'b', 'c'];
let [d, e, f] = characters;

console.log(d, e, f); // a b c

let message = 'Hello';
let [a, b] = message;
let [x, y, ...z] = message;

console.log(a, b);    // H e
console.log(x, y, z); // H e ['l', 'l', 'o']


var foo = ['one', 'two', 'three'];

var [one, two, three] = foo;
console.log(one); // "one"
console.log(two); // "two"

// Swapping variables
var a = 1;
var b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1

//Object Destructuring
var date = {
    day : 10,
    month : 06,
    year : 2016
}
var {day : d, month : m, year : y, minute :m = 1} = date;
 
console.log("Day: " + d);
console.log("Month: " + m);
//nested arrays
let numbers = [1, [2, 3, 4], 5];
let [a, [b, c, d], e] = numbers;
console.log(a, b, c, d, e); // 1 2 3 4 5

//Nested object and array destructuring
var metadata = {
    title: 'Scratchpad',
    translations: 
       {
        locale: 'de',
        localization_tags: [],
        last_edit: '2014-04-14T08:43:37',
        url: '/de/docs/Tools/Scratchpad',
        title: 'JavaScript-Umgebung'
       }
    ,
    url: '/en-US/docs/Tools/Scratchpad'
};

var {title: englishTitle, translations: {title: localeTitle}} = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle);  // "JavaScript-Umgebung"
//For of iteration and destructuring
var people = [
    {
      name: 'Mike Smith',
      family: {
        mother: 'Jane Smith',
        father: 'Harry Smith',
        sister: 'Samantha Smith'
      },
      age: 35
    },
    {
      name: 'Tom Jones',
      family: {
        mother: 'Norah Jones',
        father: 'Richard Jones',
        brother: 'Howard Jones'
      },
      age: 25
    }
];
  
for (var {name: n, family: {father: f}} of people) {
    console.log('Name: ' + n + ', Father: ' + f);
}