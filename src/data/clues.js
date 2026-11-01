// Each category has five clues, worth 100-500 points.
export const categories = [
  {
    name: "Basics",
    clues: [
      { value: 100, question: "This keyword declares a block-scoped variable that can be reassigned.", answer: "let" },
      { value: 200, question: "The expression typeof null returns this string.", answer: "\"object\"" },
      { value: 300, question: "This operator compares two values without type coercion.", answer: "=== (strict equality)" },
      { value: 400, question: "Function declarations can be called before they appear in the code because of this behaviour.", answer: "Hoisting" },
      { value: 500, question: "A declared variable that has not been assigned a value holds this value.", answer: "undefined" }
    ]
  },
  {
    name: "Arrays",
    clues: [
      { value: 100, question: "This method adds an element to the end of an array and returns the new length.", answer: "push()" },
      { value: 200, question: "This method returns a new array containing the result of calling a function on every element.", answer: "map()" },
      { value: 300, question: "This method returns the first element that satisfies a test function.", answer: "find()" },
      { value: 400, question: "This method combines every element of an array into a single value using an accumulator.", answer: "reduce()" },
      { value: 500, question: "The value of [1, 2, 3].indexOf(4).", answer: "-1" }
    ]
  },
  {
    name: "Async",
    clues: [
      { value: 100, question: "A Promise starts out pending, then becomes fulfilled or this.", answer: "Rejected" },
      { value: 200, question: "This keyword pauses an async function until a Promise settles.", answer: "await" },
      { value: 300, question: "This static method resolves when every given Promise resolves, or rejects as soon as one rejects.", answer: "Promise.all()" },
      { value: 400, question: "Promise callbacks are queued as these, which run before setTimeout callbacks.", answer: "Microtasks" },
      { value: 500, question: "setTimeout(fn, 0) runs fn at this point relative to the currently running synchronous code.", answer: "After the call stack is empty" }
    ]
  },
  {
    name: "Gotchas",
    clues: [
      { value: 100, question: "The result of 0.1 + 0.2 === 0.3.", answer: "false" },
      { value: 200, question: "The result of \"5\" + 3.", answer: "\"53\"" },
      { value: 300, question: "The result of NaN === NaN.", answer: "false" },
      { value: 400, question: "In a non-strict function called on its own in a browser, this refers to this global object.", answer: "window" },
      { value: 500, question: "Arrow functions do not have their own this; they take it from this kind of scope.", answer: "Lexical (enclosing) scope" }
    ]
  }
];
