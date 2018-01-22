class WordProblem{
    question: string;
    constructor(question: string){
        this.question = question;
    }
    answer(): number{
        const operation = ['plus','minus','multiplied','divided'];
        let requestion = this.question.slice(0, -1).split(' '); // tach chuoi cau hoi thanh mang
        let arrOperation: string[] = []; // tao mang cac phep tinh
        requestion.forEach(value => {
            if(operation.includes(value)){
                arrOperation.push(value);
            }
        });
        // mang cac so
        let getNumbers = (): number[] => (this.question.match(/\^?-?\d+/g) || []).map((match) => parseInt(match, 10));
        let numbers: number[] = getNumbers();
        
        let result = numbers[0];  // gan ket qua bang so dau tien trong mang getNumbers
        
        if(getNumbers().length < 2){
            throw new ArgumentError();
        }
        
        console.log(arrOperation, numbers);
        let n = 1;
        arrOperation.forEach(value => {
            if(value === 'plus'){
                result += numbers[n];
            }
            if(value === 'minus'){
                result -= numbers[n];
            }
            if(value === 'multiplied'){
                result *= numbers[n];
            }
            if(value === 'divided'){
                result /= numbers[n];
            }
            n++;
        });
        return result;
    }
}
let ArgumentError: any;
export {WordProblem,ArgumentError}