class SumOfMultiples{
    arrNum: number[];
    constructor(arr: number[]){
        this.arrNum = arr;
    }

    to(num: number): number {
        let arrSum = new Set();
        let sum:number = 0;
        this.arrNum.forEach( value =>{
            let n = value; 
            while(n < num) {
                arrSum.add(n);
                n = n+value;
            }
            console.log("n: " + arrSum);
        })
        if(arrSum.size > 0)
        sum = [...arrSum].reduce((a, b) => a + b);
        console.log(sum);
        return sum;
    }
}
export default function (numbers: number[]) {
    return new SumOfMultiples(numbers);
}