'use trict';
//Tuple
let x: [string, number];
x = ['hello', 10];
//array
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

//enum liet ke
enum Color {Red = 1, Green, Blue};
let colorName: string = Color[2]; //Green

//any: gan gtri voi kieu dl bat ki
let list: any[] = [1, true, 'feed'];
list[1] = 100;

console.log(list); //[1, 100, "feed"]

// void : ko co kieu dl, tỏng funcion ko tra ve dl
function warnUser(): void {
    alert("This is my warning message");
}

//null & undefined
let u: undefined = undefined;
let n: null = null;

//never : ko tra ve gtri gi
function error(message: string): never {
    throw new Error(message);
}

//Type assertions: ep kieu
let someValue: any = "this is a string";
let strLength1: number = (<string>someValue).length;
let strLength2: number = (someValue as string).length;

