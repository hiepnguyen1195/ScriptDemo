export default class Raindrops{
    convert(num: number){
        let result: string = '';
        let arrDiv: number[] = [];
        let rai = new Map([
            [3, 'Pling'],
            [5, 'Plang'],
            [7, 'Plong']
        ]);
        
        for(let i = 1; i <= num; i++ ){
            if(num%i === 0){
                arrDiv.push(i);
            }
        }
        
        arrDiv.forEach( value =>{
            if(rai.has(value)){
                result += rai.get(value);
            }
        });
        if(result === ''){
            result = num.toString();
        }
        return result;
    }
}
