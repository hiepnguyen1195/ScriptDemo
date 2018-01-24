export default class Beer{
    
    static verse = (value: number): string => {
        let result = `${value} bottles of beer on the wall, ${value} bottles of beer.
Take one down and pass it around, ${value - 1} ${(value - 1) === 1 ? 'bottle': 'bottles'} of beer on the wall.
`
        if(value === 1 ){
            result = `${value} bottle of beer on the wall, ${value} bottle of beer.
Take it down and pass it around, no more bottles of beer on the wall.
`
        }
        if(value === 0 ){
            result = `No more bottles of beer on the wall, no more bottles of beer.
Go to the store and buy some more, 99 bottles of beer on the wall.
`
        }
        return result;
    }
    static sing = (end: number = 99, start: number = 0) => {
        let result: string = '';
        for(let i = end; i >= start; i-- ){
            result += Beer.verse(i);
            if(i != start){
                result += '\n';
            }
        }
        return result;
    }
}