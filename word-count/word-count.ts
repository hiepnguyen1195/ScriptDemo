export default class Words{
    count(input: string): Map<string,number>{

        let mapString = new Map<string, number>();
        let arrRex = input.replace(/\n|\t/g,' ');
        let arrInput = arrRex.toLowerCase().split(' ');
        console.log(arrInput);
        let n = 1;
        let num = n;
        arrInput.forEach(value => {
            if(value.trim() != ''){
                if(mapString.has(value)){
                    mapString.set(value, num += 1)
                }else{
                    mapString.set(value, n)
                }
            }
            
            // console.log(mapString);
        })
        console.log(mapString);
        return mapString;
    }
}