export function keep(arr:number[], method: any ) {
    let result: number[] = [];
    arr.forEach((e: number) => e < 10 && result.push(e));
    return result;
}
export function discard() {
    let result: number[] = [];
    return result;
}