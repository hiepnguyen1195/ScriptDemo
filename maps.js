let map = new Map([
    ["Name", "Nguyen Van A"],
    ["Email", "abc@gmail.com"],
    ["Website", "abc.net"]
]);

//add elem
map.set('Address', 'Ha noi');

//delete
map.delete("Website");

//count elem
console.log(map.size);

console.log(map);

//check elem exist
console.log(map.has('domain')); // False
//console.log(map.has('Name')); // True

//foreach
map.forEach((value, key) => {
    console.log(key + ' - ' + value);
});

//mapping
let maps = new Map()
    .set(1, 'a')
    .set(2, 'b')
    .set(3, 'c')
    .set(4, 'd')
    .set(5, 'e');
let map1 = new Map(
    [...maps].map(
        ([key, value]) => [key, key + '-' + value]
    )
);

//filler
let map2 = new Map(
    [...maps].filter(
        ([key, value]) => key % 2 == 0
    )
);

console.log(map1, map2);