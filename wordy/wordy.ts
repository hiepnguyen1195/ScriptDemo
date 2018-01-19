class WordProblem{
    question: string;
    constructor(question: string){
        this.question = question;
    }
    answer(): number{
        const operation = ['plus','minus','multiplied','divided'];
        let requestion = this.question.slice(0, -1).split(' ');
        console.log(requestion,requestion[3]);
        if(requestion.length <= 6 ){
            if(requestion.includes('plus')){
                let result =  parseInt(requestion[2]) + parseInt(requestion[4]);
                return result;
            }
            if(requestion.includes('minus')){
                let result =  parseFloat(requestion[2]) - parseFloat(requestion[4]);
                return result;
            }
            if(requestion.includes('multiplied')){
                let result =  parseInt(requestion[2]) * parseInt(requestion[5]);
                console.log(2);
                return result;
            }
            if(requestion.includes('divided')){
                let result =  parseInt(requestion[2]) / parseInt(requestion[5]);
                return result;
            }
        }
        console.log(1);
        return 0;
    }
}
let ArgumentError;
export {WordProblem,ArgumentError}