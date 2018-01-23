export default class Anagram{
    input: string;
    constructor(input: string){
        this.input = input;
    }
    matches(...theArgs: string[]): string[]{
        let inputSort = this.input.toLowerCase().split('').sort().join(''); //sap xep ki tu trong chuoi kiem tra
        let result: string[] = [];
        theArgs.forEach(value => {
            if(value.toLowerCase() === this.input.toLowerCase()){
                return;
            }
            let valueSort = value.toLowerCase().split('').sort().join(''); // sap xep ki tu trong chuoi can kiem tra
            if(valueSort === inputSort){
                result.push(value);
            }
        })
        
        return result;
    }
}