class BinarySearchTree{
    _data: number;
    _left: BinarySearchTree; // khai bao left la 1 class tree
    _right: BinarySearchTree;// khai bao right la 1 class tree

    constructor(data:number){
        this._data = data; 
    }
    get data(): number{
        return this._data; // tra ve gia tri cua nut
    }
    insert(value: number){ 
        if(value <= this._data){ // neu gia tri truyen vao nho hon hoac bang nut cha add nhanh trai
            return this.insertLeft(value);
        }
        if(value > this._data){ // neu gia tri truyen vao lon hon nut cha add nhanh trai
            return this.insertRight(value);
        }
    }
    insertLeft(value: number){ 
        if(!this._left){ // chua co nhanh trai thi tao moi
            this._left = new BinarySearchTree(value); // tao nhanh trai moi voi gia tri la value
        }else{
            this._left.insert(value); // tiep tuc kiem tra gia tri truyen vao de chon nhanh
        }
    }
    insertRight(value: number){
        if(!this._right){
            this._right = new BinarySearchTree(value); // tao moi nhanh phai voi gia tri tuyen vao la value
        }else{
            this._right.insert(value);
        }
    }
    get left(): BinarySearchTree{  
        return this._left;   // tra ve gia tri la 1 cay nhanh trai
    }
    get right(): BinarySearchTree{ 
        return this._right;  // tra ve gia tri la 1 cay nhanh phai
    }
    each(bst: (data: number) =>  void): void{ // void: trả về hàm mà ko trả lại 1 giá trị
        if(this._left){ // duyệt từ giá trị thấp nhất của nhánh bên trái
            this._left.each(bst); // tiếp tục duyệt nhánh trái
        }
        bst(this._data); // nếu ko có nhánh trái hoặc duyệt hết nhánh trái thì trả về giá trị của nút duyệt hiện tại
        if(this._right){
            this._right.each(bst); // tiếp tục duyệt nhánh phải
        }
    }

}
export default BinarySearchTree