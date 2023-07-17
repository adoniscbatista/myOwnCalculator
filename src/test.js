const clickedButtonsArray = ['2', '5', '+', '2', '5'];

const updated = clickedButtonsArray.toString()
console.log(updated);


const str = "Hi! I am turning all this words into elements of an array"
const newArray = str.split(" ")
console.log(newArray)
console.log(Array.from(str))

const isNaN1 = "IsNaN"
const isNaN2 = "IsNaN"
const isANumber = 123
const isANumber1 = 123

console.log(isNaN(isANumber))
console.log(isNaN(34))
console.log(isNaN(isNaN1))
console.log(!isNaN(isNaN2))
console.log(!isNaN(isANumber1))
