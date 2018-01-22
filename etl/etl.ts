function transform(old: {[key: string]: string[]}): {[key: string]: number}{
    let expected: {[key: string]: number}= {};

    Object.entries(old).forEach(([key, value]) => {
        // console.log(value);
        value.forEach( char => {
            expected[char.toLowerCase()] = parseInt(key);
        })
    });
    
    return expected;
}
export default transform