"use strict";
exports.__esModule = true;
var GradeSchool = /** @class */ (function () {
    function GradeSchool() {
        this.roster = new Map();
    }
    GradeSchool.prototype.addStudent = function (name, grade) {
        var students = this.roster.get(grade) || new Set();
        students.add(name);
        this.roster.set(grade, students);
    };
    GradeSchool.prototype.studentsInGrade = function (grade) {
        var toReturn = this.roster.get(grade) || new Set();
        return Array.from(toReturn).sort();
    };
    GradeSchool.prototype.studentRoster = function () {
        var temp = new Map();
        var keys = [];
        for (var _i = 0, _a = this.roster.keys(); _i < _a.length; _i++) {
            var key = _a[_i];
            keys.push(key);
        }
        keys.sort();
        for (var _b = 0, keys_1 = keys; _b < keys_1.length; _b++) {
            var each = keys_1[_b];
            var values = this.roster.get(each) || new Set();
            temp.set(each.toString(10), Array.from(values).sort());
        }
        return temp;
    };
    return GradeSchool;
}());
exports["default"] = GradeSchool;
