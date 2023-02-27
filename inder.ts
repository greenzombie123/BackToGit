// Compile to JS

// tsc 'name of file'

//Congif

//Basic Types

let hit: number = 4;
let what: boolean = false;
let joke: any = 4;
joke = true;
let stuff: string[] = ["a", "b", "c"];
let dontknow: any[] = [1, false, true];
let stupp: object = { jk: 12 };

//Tuple
let box: [number, boolean, string] = [1, true, "d"];
//Tuple rray
let block: [number, number][] = [
  [1, 2],
  [1000, 3.2],
];

//Union
let opo: number | boolean = true;
opo = 12;

//Enum
enum Direction1 {
  Up = 4,
  Down,
  Left,
  Right,
}

enum Direction2 {
  Up = "Up",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}

console.log(Direction1.Down);

//Objects

const person: {
  name: string;
  age: number;
} = { name: "Bill", age: 12 };

type human = {
  name: string;
  age: number;
};

const dude: human = { name: "Fred", age: 12 };

//Type Assertation - Treat an entity as a different type

let cid: any = 1;
let customerId = <number>cid;
let customerId1 = cid as number;

// Function

function addNum(x: number, y: number): number {
  return x + y;
}

//Void

function sendMessage(message: string | boolean): void {
  console.log(message);
}

//Interface

interface humanInterface {
  // ? makes the property optional
  // readyonly makes the prop unsettable
  name: string;
  readonly age: number;
  birthDate?: Date;
}

const bro: humanInterface = { name: "Fred", age: 12 };

bro.name = "d";

bro;

interface Subtract {
  (x: number, y: number): number;
}

const subtractNumber: Subtract = (x: number, y: number): number => x - y;
const multiplyNUmber: Subtract = (x: number, y: number): number => x * y;

// Classes

interface StudentInterface {
  name: string;
  introduce(): void;
}

class FirstYearStudent implements StudentInterface {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  introduce(): void {
    console.log(`My name is ${this.name}`);
  }
}

//Sub Class
class SuperFirstYearStudent extends FirstYearStudent {
  rank: number;
  constructor(name: string, rank: number) {
    super(name);
    this.rank = rank;
  }
}

class Animal {
  name: string;
  private type: string;
  protected size: number;
  constructor(name: string, type: string, size: number) {
    this.name = name;
    this.type = type;
    this.size = size;
  }
  makeNoise() {
    return `${this.name} made some noise!`;
  }
}

const animal1 = new Animal("Dog", "German Shepard", 12);

animal1;

// Generics
function getArray<T>(items:T[]):T[]{
    return new Array().concat(items)
}

let numArray = getArray<number>([1,2,3,4])
let strArray = getArray<string>(['A', 'G', 'Mario'])

numArray.push(9)

