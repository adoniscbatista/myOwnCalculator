const math = require("mathjs");

let displayOnScreen = document.querySelector(".calculatorScreen");
let currentValueElement = displayOnScreen.querySelector(".currentValue");
let historyButtonsDisplay = displayOnScreen.querySelector(".historicButtons");
const buttons = document.querySelectorAll(".buttons");
let clickedButtonsArray = [];
let result = null;

buttons.forEach((buttons) => {
  buttons.addEventListener("click", (event) => {
    let clickedButton = event.target;
    let buttonValue = clickedButton.textContent;
    buttonValue = buttonValue === "X" ? "*" : buttonValue;
    clickedButtonsArray.push(buttonValue.toString());
    console.log(buttonValue);

    if (currentValueElement.textContent === "0") {
      currentValueElement.textContent = buttonValue;      
      if (buttonValue === ".") {
        currentValueElement.textContent = "0.";
        clickedButtonsArray = ["0."];
      } else if (buttonValue === "AC" || buttonValue === "Backspace") {
        clickedButtonsArray = [];
        currentValueElement.textContent = "0";
      } else if (
        buttonValue === "+" ||
        buttonValue === "-" ||
        buttonValue === "*" ||
        buttonValue === "/" ||
        buttonValue === "%" ||
        buttonValue === "+/-"
      ) {
        clickedButtonsArray = [];
        currentValueElement.textContent = "0";
      }
    } else if (buttonValue === "AC") {
      clickedButtonsArray = [];
      console.log("Pressed button: ", buttonValue);
      currentValueElement.textContent = "0";
    } else if (buttonValue === "⌫") {
      if (currentValueElement.textContent.length === 1) {
        currentValueElement.textContent = "0";
        clickedButtonsArray = [];
      } else if (currentValueElement.textContent === result.toString()) {
        return;
      } else {
        clickedButtonsArray = clickedButtonsArray.slice(0, -2);
        console.log("Updated Array: ", clickedButtonsArray);
        currentValueElement.textContent = clickedButtonsArray.join("");
      }
    } else if (
      buttonValue === "+" ||
      buttonValue === "-" ||
      buttonValue === "*" ||
      buttonValue === "/"
    ) {
      currentValueElement.textContent = buttonValue;
    } else if (buttonValue === "+/-") {
      clickedButtonsArray = clickedButtonsArray.slice(0, -3);
      const toggleSign = currentValueElement.textContent * -1;
      currentValueElement.textContent = toggleSign;
      clickedButtonsArray.push(toggleSign);
    } else {
      currentValueElement.textContent += buttonValue;
      console.log("Pressed button: ", buttonValue);
    }

    if (!clickedButtonsArray.includes("AC")) {
      historyButtonsDisplay.textContent = clickedButtonsArray
        .filter((button) => button !== "AC")
        .join("");
    } else {
      historyButtonsDisplay.textContent = clickedButtonsArray.join("");
    }
  });
});

const equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", () => {
  const expression = clickedButtonsArray.slice(0, -1).join("");
  console.log("Expression: ", expression);
  result = math.evaluate(expression);
  currentValueElement.textContent = result;
  clickedButtonsArray = [result.toString()];
  console.log("Result = ", result);
  historyButtonsDisplay.textContent += result;
});

const buttonsEffect = document.querySelectorAll(".buttons");

buttonsEffect.forEach((button) => {
  button.addEventListener("click", (event) => {
    const clickedButton = event.target;
    clickedButton.classList.add("button-pressed");
    setTimeout(() => {
      clickedButton.classList.remove("button-pressed");
    }, 100);
  });
});

// Modificações. Adicionar teclado. 19/07/23

document.addEventListener("keydown", (event) => {
  const keydown = event.key;
  
  if (currentValueElement.textContent === "0") {
    clickedButtonsArray.push(keydown)
    if (keydown === "0") {
      currentValueElement.textContent = "0";           
      console.log("keypressed:", keydown);
    } else if (keydown === ".") {
      currentValueElement.textContent = "0.";
      clickedButtonsArray = ["0."];
    } else if (
      keydown === "+" ||
      keydown === "-" ||
      keydown === "*" ||
      keydown === "/" ||
      keydown === "%" ||
      keydown === "Backspace"
    ) {
      clickedButtonsArray = [];
      currentValueElement.textContent = "0";
      console.log("keypressed: ", keydown)
    } else {
      currentValueElement.textContent = keydown;
    }
  } else if (
    keydown === "0" ||
    keydown === "1" ||
    keydown === "2" ||
    keydown === "3" ||
    keydown === "4" ||
    keydown === "5" ||
    keydown === "6" ||
    keydown === "7" ||
    keydown === "8" ||
    keydown === "9" ||
    keydown === "+" ||
    keydown === "-" ||
    keydown === "*" ||
    keydown === "/" ||
    keydown === "." ||
    keydown === "%"
  ) {
    clickedButtonsArray.push(keydown);
    currentValueElement.textContent += keydown;
    console.log(keydown, clickedButtonsArray);
  } else if (
    keydown === "Enter"
  ) {
    const clickEvent = new Event("click");
    equalButton.dispatchEvent(clickEvent)
  }
});