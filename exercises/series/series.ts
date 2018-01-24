export default class Series{
    series: string;
    digits :number [] = [];
    constructor(series: string){
        this.series = series;
        this.digits = this.getDigits();
    }
    
    getDigits(): number[]{
        return [...this.series].map((digit) => parseInt(digit)) // chuyen string ve mang cac so
    }

    slices(size: number): number[][]{
        let arrNumber: number[][] = [];
        let arr = this.digits; // gan arr bang mang cac so
        if(arr.length< size){
            throw new Error('errors');
        }
        for(let i = 0; i < arr.length - size + 1; i++){ 
            arrNumber.push(arr.slice(i, size+i));
            console.log(i, arrNumber);
        }
        return arrNumber;
    }
    
}