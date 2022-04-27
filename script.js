

// Math operators
const add = function(a, b) {
    return a + b;
  };
  
  const subtract = function(a, b) {
      return a - b;
  };

  const multiply = function(a, b) {
    return a * b;
};

const divide = function(a, b) {
    return a / b;
};

// variables
let array1 = [];
let array2 = [];
let operatorClicked = [];
let resultArray = [];
let operator;
const value = document.querySelector('.value');
const resultDisplay = document.querySelector('.result');


let buttons = Array.from(document.querySelectorAll('button'));
buttons.forEach(button => button.addEventListener('click', function(e) {
    const element = e.target;
    const attribute = element.getAttribute('id');

    let buttonClicked = attribute;

    // Check to see that the computation is done
    const resultChild = resultDisplay.lastElementChild;
    if (!resultChild == false && (buttonClicked == 'add' || buttonClicked == 'subtract' || buttonClicked == 'multiply' || buttonClicked == 'divide' || buttonClicked == 'equal')) {
        return;
    }


    if ((buttonClicked == 'add' || buttonClicked == 'subtract' || buttonClicked == 'multiply' || buttonClicked == 'divide' || buttonClicked == 'equal') && array2.length == 0) return;

    if (buttonClicked == 'add' || buttonClicked == 'subtract' || buttonClicked == 'multiply' || buttonClicked == 'divide') {
        if (operatorClicked.length == 0) {

            operatorClicked.push(buttonClicked);
        }
    }
    
    const dot2 = array2.find(dot => dot == '.');
    const dot1 = array1.find(dot => dot == '.');

    // store the values
    if (operatorClicked.length >= 1 && (!isNaN(buttonClicked) || (buttonClicked == '.' && !dot1))) {
        
        const display = document.createElement('span');
        display.textContent = `${buttonClicked}`;
        value.appendChild(display);
        array1.push(buttonClicked);
    }

    else {
        if (!isNaN(buttonClicked) || (buttonClicked == '.' && !dot2)) {
            //const value = document.querySelector('.value');
            const display = document.createElement('span');
            display.textContent = `${buttonClicked}`;
            value.appendChild(display);
            array2.push(buttonClicked);
        }
    }

    // delete the values
    if (buttonClicked == 'delete') {
        if (operatorClicked.length == 0) {
            array2.splice(array2.length - 1, array2.length);
        }
        else if (array1.length == 0) {
            operatorClicked.splice(operatorClicked.length - 1, operatorClicked.length);
        }
        else if (array1.length != 0) {
            array1.splice(array1.length - 1, array1.length);
        }
        
        
    }
    else if (buttonClicked == 'clear') {
        array2.splice(0, array2.length);
        array1.splice(0, array1.length);
        operatorClicked.splice(0, operatorClicked.length);
        resultArray.splice(0, resultArray.length);
    }

    let result;
    
    // Operation
    if (buttonClicked == 'add' || buttonClicked == 'subtract' || buttonClicked == 'multiply' || buttonClicked == 'divide' || buttonClicked == 'equal') {

        // Operation for the first time
        if (resultArray.length == 0 && array1.length != 0) {
            result = operation(array2, operatorClicked, array1);
            resultArray.push(result);

            array1.splice(0, array1.length); 
        }
        // Operations after the first one
        else if (array1.length != 0 && resultArray.length != 0) {
            
            result = operation(resultArray, operatorClicked, array1);
            resultArray[0] = result; 

            array1.splice(0, array1.length);
            
        }
        operatorClicked[0] = buttonClicked;
    }
}));

// Operators display
let operators = Array.from(document.querySelectorAll('.operators'));

operators.forEach(operator => operator.addEventListener('click', function(e) {
    const element = e.target;
    const symbolName = element.getAttribute('id');

    // When user changes the symbol
    const lastChild = value.lastElementChild;
    if (!lastChild) return;

    // Check to see that the computation is done
    const resultChild = resultDisplay.lastElementChild;
    if (!resultChild == false) {
        return;
    }

    const lastChildClass = lastChild.getAttribute('class');
    if (lastChildClass == 'sign') {
        operator = symbolSelect(symbolName);
        lastChild.textContent = `${operator}`;
    }

    // When the symbol has been entered for the first time
    else {
        const display = document.createElement('span');
        operator = symbolSelect(symbolName);
        display.textContent = `${operator}`;
        display.classList.add('sign');
        value.appendChild(display);
    }

}));

// Clear, delete and final answer
const changeBtn = Array.from(document.querySelectorAll('.changeBtn'));

changeBtn.forEach(change => change.addEventListener('click', function(e) {
    const element = e.target;
    const change = element.getAttribute('id');

    const span = Array.from(document.querySelectorAll('span'));
    if (!span) return;
    
    const lastChild = value.lastElementChild;
    if (!lastChild) return;

    // Check to see that the computation is done
    const resultChild = resultDisplay.lastElementChild;

    if (change == 'delete') {
        if (!resultChild == false) {
            return;
        }
        lastChild.remove();

    }
    else if (change == 'clear') {
        for (let i = 0; i < span.length; i++) {
            span[i].remove();
        }
    }
    else if (change == 'equal') {
        if (!resultChild == false) {
            return;
        }
        const display = document.createElement('span');
        display.textContent = `${resultArray[0]}`;
        resultDisplay.appendChild(display);
    }

    
}));


// computation custom function
function operation(a, b, c) {
    let firstArgument = arguments[0].join('');
    firstArgument = Number(firstArgument);

    let secondArgument = arguments[1].join('');

    let thirdArgument = arguments[2].join('');
    thirdArgument = Number(thirdArgument);

    if (secondArgument == 'add') {
        let result = add(firstArgument, thirdArgument);
        if (!Number.isInteger(result)) {
            result = result.toFixed(2);
        }
        return result;
    }
    else if (secondArgument == 'subtract') {
        let result = subtract(firstArgument, thirdArgument);
        if (!Number.isInteger(result)) {
            result = result.toFixed(2);
        }
        return result;
    }
    else if (secondArgument == 'multiply') {
        let result = multiply(firstArgument, thirdArgument);
        if (!Number.isInteger(result)) {
            result = result.toFixed(2);
        }
        return result;
    }
    else if (secondArgument == 'divide') {
        let result = divide(firstArgument, thirdArgument);
        if (!Number.isInteger(result)) {
            result = result.toFixed(2);
        }
        return result;
    }
    
}

// Custom function of operators
function symbolSelect (symbol) {
    let sign;
    if (symbol == 'add') {
        sign = '+';
        return sign;
    }
    else if (symbol == 'subtract') {
        sign = '-';
        return sign;
    }
    else if (symbol == 'multiply') {
        sign = 'x';
        return sign;
    }
    else if (symbol == 'divide') {
        sign = '/';
        return sign;
    }
}