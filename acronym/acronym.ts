export default class Acronym{
    static parse(input: string): string{
        let acronym: string = '';
        let arrAcr = input.match(/[A-Z]+[a-z]*|[a-z]+/g); //Khớp ít nhất 1 chuỗi đằng trước và số lượng ký tự theo sau bất kỳ
        console.log(arrAcr);
        if(arrAcr){
            arrAcr.forEach(value=>{
                acronym += value.substr(0,1).toUpperCase();
            })
        }
        return acronym;
    }
}