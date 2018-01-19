"use strict";
exports.__esModule = true;
var BinarySearchTree = /** @class */ (function () {
    function BinarySearchTree(data) {
        this._data = data;
    }
    Object.defineProperty(BinarySearchTree.prototype, "data", {
        get: function () {
            return this._data; // tra ve gia tri cua nut
        },
        enumerable: true,
        configurable: true
    });
    BinarySearchTree.prototype.insert = function (value) {
        if (value <= this._data) {
            return this.insertLeft(value);
        }
        if (value > this._data) {
            return this.insertRight(value);
        }
    };
    BinarySearchTree.prototype.insertLeft = function (value) {
        if (!this._left) {
            this._left = new BinarySearchTree(value); // tao nhanh trai moi voi gia tri la value
        }
        else {
            this._left.insert(value); // tiep tuc kiem tra gia tri truyen vao de chon nhanh
        }
    };
    BinarySearchTree.prototype.insertRight = function (value) {
        if (!this._right) {
            this._right = new BinarySearchTree(value); // tao moi nhanh phai voi gia tri tuyen vao la value
        }
        else {
            this._right.insert(value);
        }
    };
    Object.defineProperty(BinarySearchTree.prototype, "left", {
        get: function () {
            return this._left; // tra ve gia tri la 1 cay nhanh trai
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BinarySearchTree.prototype, "right", {
        get: function () {
            return this._right; // tra ve gia tri la 1 cay nhanh phai
        },
        enumerable: true,
        configurable: true
    });
    BinarySearchTree.prototype.each = function (bst) {
        if (this._left) {
            this._left.each(bst); // tiếp tục duyệt nhánh trái
        }
        bst(this._data); // nếu ko có nhánh trái hoặc duyệt hết nhánh trái thì trả về giá trị của nút duyệt hiện tại
        if (this._right) {
            this._right.each(bst); // tiếp tục duyệt nhánh phải
        }
    };
    return BinarySearchTree;
}());
exports["default"] = BinarySearchTree;
