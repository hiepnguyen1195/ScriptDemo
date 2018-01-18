interface Function<T>{
    (val: T ): boolean
}
export function keep<T>(arr:T[], fn: Function<T> ): T[] {
    let result: T[] = [];
    arr.forEach((val: T)=>{
        if(fn(val)){
            result.push(val);
        }
    });
    return result;
}
export function discard<T>(arr:T[], fn: Function<T> ): T[] {
    let result: T[] = [];
    arr.forEach((val: T)=>{
        if(!fn(val)){
            result.push(val);
        }
    });
    return result;
}