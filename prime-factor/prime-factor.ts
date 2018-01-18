let calculatePrimeFactors = (prime: number) :number[] => {
    let result: number[] = [];
    let n: number = 2;
    while(prime !== 1){
        if(prime % n === 0){
            result.push(n);
            prime = prime/n;
        }else{
            n++;
        }
    }
    return result;
    
}
export {calculatePrimeFactors};