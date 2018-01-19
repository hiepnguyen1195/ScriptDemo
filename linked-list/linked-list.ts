// khoi tao class Node
class Node<T>{
    value: T;
    next: Node<T> | null;
    prev: Node<T> | null;
    //khoi tao gia tri cho node
    constructor(value: T){
        this.value = value;
    }
    // lay gia tri node phia truoc
    getNext(): Node<T> | null{
        return this.next;
    }
    //set gia tri cho node phia truoc
    setNext(newNext: Node<T> | null){
        this.next = newNext;
    }
    //lay gia tri node phai sau
    getPrev(): Node<T> | null{
        return this.prev;
    }
    //set gia tri node phai sau
    setPrev(newPrev: Node<T> | null){
        this.prev= newPrev;
    }
    // lay gia tri cua node
    getValue(): T {
        return this.value;
    }
}
class LinkedList<T>{
    counts: number = 0;   // dem so node
    head: Node<T> | null; // khai bao node dau
    tail: Node<T> | null; // khia bao node sau
    // chen gia tri phia truoc
    unshift(value: T){
        if (this.head) { // kiem tra ton tai node dau
            const newHead = new Node<T>(value);
            newHead.setNext(this.head); 
            this.head.setPrev(newHead);
            this.head = newHead;
        }else{ // neu khong co gan node dau = node cuoi
            this.head = new Node<T>(value);
            this.tail = this.head;
        }
        this.counts ++;
    }
    // xoa gia tri phia truoc
    shift(): T | null{
        if(!this.head){ // kiem tra co node dau
            return null; // ko co tra ve null
        }
        const value = this.head.getValue();
        this.head = this.head.getNext(); // gan node dau bang node sau
        if(this.head){
            this.head.setPrev(null); // xoa vi tri truoc node dau
        }else{
            this.head = this.tail = null;
        }
        this.counts--;
        return value; // tra ve gia tri node vua xoa
    }
    // them gia tri phia sau
    push(value: T){
        if(this.tail){
            let newTail = new Node<T>(value);
            newTail.setPrev(this.tail);
            this.tail.setNext(newTail);
            this.tail= newTail
        }else{
            this.tail = new Node<T>(value);
            this.head = this.tail
        }
        this.counts++;
    }
    // xoa gia tri phia sau
    pop():T | null{
        if(!this.tail){
            return null;
        }
        let value = this.tail.getValue();
        this.tail = this.tail.getPrev();
        if(this.tail){
            this.tail.setNext(null);
        }else{
            this.tail= this.head =null;
        }
        this.counts --;
        return value;
    }
    // dem so not
    count(): number{
        return this.counts;
    }
}
export default LinkedList