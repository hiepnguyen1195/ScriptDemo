class Prime{
    //kiem tra so nguyen to
    isPrime(pri: number): boolean{
        if(pri<2) return false;
        for(let i= 2; i<= Math.sqrt(pri); i++){
            if(pri %i == 0) return false;
        }
        return true;
    }
    // tra ve mang nguyen to theo do dai
    primeFactor(num:number): number[]{
        let factorsArray: number[]= [];
        let n:number = 2;

        for(n;;n++){
            if(this.isPrime(n)){
                factorsArray.push(n)
            }
            if(factorsArray.length === num) break;
        }
        
        return factorsArray;
    }

    nth(nthprime: number): number{
        if (nthprime === 0) {
            throw new Error('Prime is not possible')
        }
        let arrPrime:number[] = this.primeFactor(nthprime);
        let n = arrPrime.slice(-1)[0];
        return n;
    }
}
export {Prime}