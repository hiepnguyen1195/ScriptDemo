class CircularBuffer<T>{
    size: number;
    buffer: T[] = [];
    constructor(size:number){
        this.size = size; // tra ve kich thuoc mang truyen vao
    }
    write(value: T){ // them phan tu vao mang
        if(this.buffer.length >= this.size){ // neu do dai mang lon hon size truyen vao
            throw new BufferOverflowError(); 
        }
        this.buffer.push(value); // them phan tu vao cuoi mang
    }
    read(){
        if(this.buffer.length === 0){ // neu mang empty
            throw new BufferEmptyError();
        }
        return this.buffer.shift(); // xoa phan tu dau mang
    }
    forceWrite(value: T){
        if(this.buffer.length === this.size){ // neu do dai mang = size xoa 1 phan tu de them 1 phan tu moi
            this.read();
        }
        this.buffer.push(value);
    }
    clear(){
        this.buffer = []; //set mang empty
    }

}
export class BufferOverflowError extends Error{
    constructor(){
        super("buffer is full");
    }
}
export class BufferEmptyError extends Error{
    constructor(){
        super("buffer is empty");
    }
}
export default CircularBuffer;