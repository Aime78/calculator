

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

    let number = attribute;
    // Check to see that the computation is done
    const resultChild = resultDisplay.lastElementChild;
    if (!resultChild == false && (number == 'add' || number == 'subtract' || number == 'multiply' || number == 'divide' || number == 'equal')) {
        return;
    }


    if ((number == 'add' || number == 'subtract' || number == 'multiply' || number == 'divide' || number == 'equal') && array2.length == 0) return;

    if (number == 'add' || number == 'subtract' || number == 'multiply' || number == 'divide') {
        if (operatorClicked.length == 0) {
            
            //const display = document.createElement('span');
            //operator = symbolSelect(number);
            //display.textContent = `${operator}`;
            //display.classList.add('sign');
            //value.appendChild(display);

            operatorClicked.push(number);
        }
    }
    console.log(operatorClicked);
    const dot2 = array2.find(dot => dot == '.');
    const dot1 = array1.find(dot => dot == '.');

    // store the values
    if (operatorClicked.length >= 1 && (!isNaN(number) || (number == '.' && !dot1))) {
        //const value = document.querySelector('.value');
        const display = document.createElement('span');
        display.textContent = `${number}`;
        value.appendChild(display);
        array1.push(number);
    }

    else {
        if (!isNaN(number) || (number == '.' && !dot2)) {
            //const value = document.querySelector('.value');
            const display = document.createElement('span');
            display.textContent = `${number}`;
            value.appendChild(display);
            array2.push(number);
        }
    }

    // delete the values
    if (number == 'delete') {
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
    else if (number == 'clear') {
        array2.splice(0, array2.length);
        array1.splice(0, array1.length);
        operatorClicked.splice(0, operatorClicked.length);
        resultArray.splice(0, resultArray.length);
    }
    


    //console.log(`dot: ${dot}`);
    console.log(`array1: ${array1}`);
    console.log(`array2: ${array2}`);

   





    let result;
    
    // Operation
    if (number == 'add' || number == 'subtract' || number == 'multiply' || number == 'divide' || number == 'equal') {
        console.log(`resultarraylength before: ${resultArray.length}`);

        //value.appendChild(display);

        if (resultArray.length == 0 && array1.length != 0) {
            result = operation(array2, operatorClicked, array1);
            resultArray.push(result);

            array1.splice(0, array1.length); 
            console.log(`1: ${resultArray}`);
            console.log(`resultarraylength after: ${resultArray.length}`);

        }
        else if (array1.length != 0 && resultArray.length != 0) {
            
            result = operation(resultArray, operatorClicked, array1);
            resultArray[0] = result; 
            array1.splice(0, array1.length);
            
            console.log(`2: ${resultArray}`);
        }
        operatorClicked[0] = number;
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

    console.log(change);
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
        //console.log(`result: ${resultArray[0]}`)
        if (!resultChild == false) {
            return;
        }
        const display = document.createElement('span');
        display.textContent = `${resultArray[0]}`;
        resultDisplay.appendChild(display);
    }

    
}));



function operation(a, b, c) {
    let firstArgument = arguments[0].join('');
    firstArgument = Number(firstArgument);
    let secondArgument = arguments[1].join('');
    let thirdArgument = arguments[2].join('');
    thirdArgument = Number(thirdArgument);

    console.log(firstArgument, secondArgument, thirdArgument);
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