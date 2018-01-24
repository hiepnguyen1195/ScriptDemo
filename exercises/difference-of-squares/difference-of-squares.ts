export default class Squares{
    _num: number;
    squareOfSums: number;
    sumOfSquares: number;
    difference: number;
    constructor(num: number){
        this._num = num;
        this.squareOfSums = this.SquareOfSums();
        this.sumOfSquares = this.SumOfSquares();
        this.difference = this.Difference();
    }
    SquareOfSums = (): number => {
        let squa: number = 0;
        for(let i = 1; i <= this._num; i++){
            squa += i;
        }
        return squa*squa;
    }
    SumOfSquares = (): number => {
        let sum: number = 0;
        for(let i = 1; i <= this._num; i++){
            sum += i*i;
        }
        return sum;
    }
    Difference = (): number =>{
        return this.squareOfSums - this.sumOfSquares;
    }
}