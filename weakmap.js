
var weak = new WeakMap();
 
// list key 
var key1 = {};
var key2 = {};
 
// add value
weak.set(key1, "value 01");
weak.set(key2, "value 02");
 
// get value
console.log(weak.get(key1)); // value 01
console.log(weak.get(key2)); // value 02
 
// check exist
var other_key = {};
console.log(weak.has(key1)); // true
console.log(weak.has(other_key)); // false
 
// delete elem
weak.delete(key1);
console.log(weak.get(key1)); // Undefined