const calcDisplay = document.querySelector('#my-display');
const container = document.querySelector('.container')

const backSpace = document.querySelector('#back-space');
const cleanBtn = document.querySelector('#clean');
const divisionBtn = document.querySelector('#division');
const multiBtn = document.querySelector('#multiplication');
const minusBtn = document.querySelector('#minus');
const sumBtn = document.querySelector('#sum');
const dotBtn = document.querySelector('#dot');
const equalBtn = document.querySelector('#button-equal');

const zero = document.querySelector('#number-zero');
const one = document.querySelector('#number-one');
const two = document.querySelector('#number-two');
const three = document.querySelector('#number-three');
const four = document.querySelector('#number-four');
const five = document.querySelector('#number-five');
const six = document.querySelector('#number-six');
const seven = document.querySelector('#number-seven');
const eight = document.querySelector('#number-eight');
const nine = document.querySelector('#number-nine');


let RESULT_FLAG = 0;
let value = 0;
let secValue = 0;
let operator = '';

function restartVar() {
	value = 0;
	secValue = 0;
	operator = '';
}

function restartVarButValue(saveValue) {
	value = saveValue;
	secValue = 0;
	operator = '';
	return saveValue
}

function resultFlagHandler() {
	calcDisplay.innerText = '';
	RESULT_FLAG = 0;
}

function sumOperation() {
	return restartVarButValue(Number(value) + Number(secValue));
}

function subOperation() {
	return restartVarButValue(Number(value) - Number(secValue));
}

function multiOperation() {
	return restartVarButValue(Number(value) * Number(secValue));
}

function divOperation() {
	if (Number(secValue) === 0) {
		RESULT_FLAG = 1;
		restartVar();
		return "Error";
	}
	return restartVarButValue(Number(value) / Number(secValue));
}

function addOperator(oper) {
	if (value != 0 && !RESULT_FLAG) {
		getResult();
		RESULT_FLAG = 1;
	} else {
		value = Number(calcDisplay.innerText);
		calcDisplay.innerText = ''
	}
	operator = oper
}


// Decimal (.) operations and checks

function isThereADot() {
	let checkDot = 0;
	const str = calcDisplay.innerText;
	for (let i = 0; i < str.length; i++)
		if (str[i] > '9' || str[i] < '0') {
			if (str[i] === '.')
				checkDot++
			else if (checkDot == 1)
				checkDot = 0;
		}
	return checkDot == 1 ? 1 : 0;
}

function addDot() {
	if (!isThereADot())
		calcDisplay.innerText += '.';
}

// Operator check

function isThereOtherOperator() {
	return operator == '' ? 0 : 1;
}

// Call Operations

function callMathOperation() {
	if (operator === '/')
		return divOperation();
	else if (operator === 'x')
		return multiOperation();
	else if (operator === '-')
		return subOperation();
	else if (operator === '+')
		return sumOperation();

}

function getResult() {
	if (isThereOtherOperator()) {
		secValue = Number(calcDisplay.innerText);
		calcDisplay.innerText = callMathOperation();
	}
}

// Events Handler

const eventHandler = (target) => {
	const str = calcDisplay.innerText;

	if (RESULT_FLAG)
		resultFlagHandler();

	if (target.matches('.number')) 
		calcDisplay.innerText += target.innerText;
	else if (str.length === 0)
		return
	else if (target === cleanBtn) {
		restartVar();
		calcDisplay.innerText = '';
	}
	else if (target === backSpace) {
		newStr = str.split('').slice(0, -1).join('');
		calcDisplay.innerText = newStr;
	} else if (target === sumBtn)
		addOperator('+');
	else if (target === minusBtn)
		addOperator('-');
	else if (target === multiBtn)
		addOperator('x');
	else if (target === divisionBtn)
		addOperator('/')
	else if (target === equalBtn) {
		getResult();
		// RESULT_FLAG = 1;
	}
	else if (target === dotBtn)
		addDot();
	else
		return;
	
	target.classList.add('temp-efect');

	setTimeout(() => {
		target.classList.remove('temp-efect')
	}, 200)
}

container.addEventListener('click', e => eventHandler(e.target))

document.addEventListener('keydown', e => {
	if (e.key === '1')
		eventHandler(one)
	else if (e.key === '2')
		eventHandler(two)
	else if (e.key === '3')
		eventHandler(three)
	else if (e.key === '4')
		eventHandler(four)
	else if (e.key === '5')
		eventHandler(five)
	else if (e.key === '6')
		eventHandler(six)
	else if (e.key === '7')
		eventHandler(seven)
	else if (e.key === '8')
		eventHandler(eight)
	else if (e.key === '9')
		eventHandler(nine)
	else if (e.key === '0')
		eventHandler(zero)
	else if (e.key === '/')
		eventHandler(divisionBtn)
	else if (e.key === '*')
		eventHandler(multiBtn)
	else if (e.key === '-')
		eventHandler(minusBtn)
	else if (e.key === '+')
		eventHandler(sumBtn)
	else if (e.key === 'Enter' || e.key == "=")
		eventHandler(equalBtn)
	else if (e.key === 'Escape')
		eventHandler(cleanBtn)
	else if (e.key === '.')
		eventHandler(dotBtn)
	else if (e.key === 'Backspace')
		eventHandler(backSpace)
})