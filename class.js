class baseModel {
    constructor(options = {}, data = []) { // class constructor
        this.name = 'Base'
        this.url = 'http://abc'
        this.data = data
        this.options = options
    }

    getName() { // class method
        console.log(`Class name: ${this.name}`)
    }
}
let base = new baseModel({name: 'a', url: 'b'}, [4,5]);
let base1 = new baseModel(undefined,[4,5]);
class AccountModel extends baseModel {
    constructor(options, data) {
        super({private: true}, ['32113123123', '524214691']) //call the parent method with super
        this.name = 'Account Model'
        this.url += '/accounts/'
    }
    get accountsData() { //calculated attribute getter
    // ... make XHR
        return this.data
    }
    set accountsData(data){
        this.data = data;
    }
}
let accounts = new AccountModel();
accounts.accountsData(4);

let accounts = new AccountModel(5)
accounts.getName()
console.log('Data is ', accounts.accountsData)

// example class shape
class Shape {
    constructor (id, x, y) {
        this.id = id;
        this.move(x, y);
    }
    move (x, y) {
        this.x = x;
        this.y = y;
    }
    toString () {
        return `Shape(${this.id})`
    }
}
class Rectangle extends Shape {
    constructor (id, x, y, width, height){
        super(id, x, y);
        this.width = width;
        this.height = height;
    }
    toString () {
        return "Rectangle > " + super.toString();
    }
    static defaultRectangle () {
        return new Rectangle("default", 0, 0, 100, 100);
    }
    set width(width) { 
        this._width = width;               
    }
    get width() { 
        return this._width;              
    }
    set height(height) { 
        this._height = height;           
    }
    get height() { 
        return this._height;               
    }
    get area() { 
        return this._width * this._height;
    }
}
class Circle extends Shape {
    constructor (id, x , y, radius) {
        super(id, x, y);
        this.radius = radius;
    }
    toString () {
        return "Circle > " + super.toString();
    }
    static defaultCircle () {
        return new Circle("default", 0, 0, 100);
    }
}
let cir = new Circle(3 ,4 ,5 ,6);
console.log(cir.toString());
// Static Members
var defRectangle = Rectangle.defaultRectangle();
var defCircle    = Circle.defaultCircle();
console.log(defCircle, defRectangle);
// Getter/Setter 
let r = new Rectangle(50, 20, 30);
console.log(r.area, r.height);


class StaticMethodCall {
    static staticMethod() {
        return 'Static method has been called';
    }
    anotherStaticMethod() {
        return 'not static';
    }
}
StaticMethodCall.staticMethod(); 