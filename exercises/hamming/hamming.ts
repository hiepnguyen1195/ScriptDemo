export default class Hamming{
    compute(dna1: string, dna2: string): number{
        let n: number = 0;
        let arrDna1 = dna1.split('');
        let arrDna2 = dna2.split('');
        if(arrDna1.length != arrDna2.length){
            throw new Error('DNA strands must be of equal length.');
        }
        for(let i = 0; i < arrDna1.length; i++){
            if(arrDna1[i] != arrDna2[i]){
                n++;
            }
        }
        return n;
    }
}