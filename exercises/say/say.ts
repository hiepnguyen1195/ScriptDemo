interface English{
    [key:number]: string;
}
const say: English = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    20: 'twenty',
    30: 'thirty',
    40: 'forty',
    50: 'fifty',
    60: 'sixty',
    70: 'seventy',
    80: 'eighty',
    90: 'ninety',
    100: 'hundred',
    1000: 'thousand'
}
export default class Say{
    inEnglish(value: number){
        let result: string = '';
        if(value < 0 || value > 999999999){
            throw new Error('Number must be between 0 and 999,999,999,999.');
        }
        if(value<100){
            return this.read100(value);
        }
        return this.read(value,1);
    }

    read(num: number, lv: number){

    }

    read100(value: number): string{
        let result: string = '';
        let n:number;
        console.log(value);
        if(value<20){
            result = say[value];
            console.log(result);
            if(value>10){
                result += 'teen';
            }
        }
        else{
            result += say[value];
            n = value%10;
            if(n !== 0){
                result +='-'+say[n];
            }
        }
        
        return result;
    }
}