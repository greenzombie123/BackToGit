// Compile to JS
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// tsc 'name of file'
//Congif
//Basic Types
var hit = 4;
var what = false;
var joke = 4;
joke = true;
var stuff = ["a", "b", "c"];
var dontknow = [1, false, true];
var stupp = { jk: 12 };
//Tuple
var box = [1, true, "d"];
//Tuple rray
var block = [
    [1, 2],
    [1000, 3.2],
];
//Union
var opo = true;
opo = 12;
//Enum
var Direction1;
(function (Direction1) {
    Direction1[Direction1["Up"] = 4] = "Up";
    Direction1[Direction1["Down"] = 5] = "Down";
    Direction1[Direction1["Left"] = 6] = "Left";
    Direction1[Direction1["Right"] = 7] = "Right";
})(Direction1 || (Direction1 = {}));
var Direction2;
(function (Direction2) {
    Direction2["Up"] = "Up";
    Direction2["Down"] = "Down";
    Direction2["Left"] = "Left";
    Direction2["Right"] = "Right";
})(Direction2 || (Direction2 = {}));
console.log(Direction1.Down);
//Objects
var person = { name: "Bill", age: 12 };
var dude = { name: "Fred", age: 12 };
//Type Assertation - Treat an entity as a different type
var cid = 1;
var customerId = cid;
var customerId1 = cid;
// Function
function addNum(x, y) {
    return x + y;
}
//Void
function sendMessage(message) {
    console.log(message);
}
var bro = { name: "Fred", age: 12 };
bro.name = "d";
bro;
var subtractNumber = function (x, y) { return x - y; };
var multiplyNUmber = function (x, y) { return x * y; };
var FirstYearStudent = /** @class */ (function () {
    function FirstYearStudent(name) {
        this.name = name;
    }
    FirstYearStudent.prototype.introduce = function () {
        console.log("My name is ".concat(this.name));
    };
    return FirstYearStudent;
}());
//Sub Class
var SuperFirstYearStudent = /** @class */ (function (_super) {
    __extends(SuperFirstYearStudent, _super);
    function SuperFirstYearStudent(name, rank) {
        var _this = _super.call(this, name) || this;
        _this.rank = rank;
        return _this;
    }
    return SuperFirstYearStudent;
}(FirstYearStudent));
var Animal = /** @class */ (function () {
    function Animal(name, type, size) {
        this.name = name;
        this.type = type;
        this.size = size;
    }
    Animal.prototype.makeNoise = function () {
        return "".concat(this.name, " made some noise!");
    };
    return Animal;
}());
var animal1 = new Animal("Dog", "German Shepard", 12);
animal1;
// Generics
function getArray(items) {
    return new Array().concat(items);
}
var numArray = getArray([1, 2, 3, 4]);
var strArray = getArray(['A', 'G', 'Mario']);
numArray.push(9);
