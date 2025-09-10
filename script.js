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
let value = NaN;
let secValue = NaN;
let operator = '';

function restartVar() {
	value = NaN;
	secValue = NaN;
	operator = '';
}

function restartVarButValue(saveValue) {
	value = saveValue;
	secValue = NaN;
	operator = '';
	RESULT_FLAG = 1;
	return saveValue;
}

function resultFlagHandler() {
	calcDisplay.innerText = '';
	RESULT_FLAG = 0;
}

function sumOperation() {
	return parseFloat(restartVarButValue(Number(value) + Number(secValue)).toFixed(5));
}

function subOperation() {
	return parseFloat(restartVarButValue(Number(value) - Number(secValue)).toFixed(5));
}

function multiOperation() {
	return parseFloat(restartVarButValue(Number(value) * Number(secValue)).toFixed(5));
}

function divOperation() {
	if (Number(secValue) === 0) {
		restartVar();
		RESULT_FLAG = 1;
		return "Error";
	}
	return parseFloat(restartVarButValue(Number(value) / Number(secValue)).toFixed(5));
}

function addOperator(oper) {
	if (calcDisplay.innerText.length === 0 || RESULT_FLAG) {
		operator = oper
		return
	}

	if (isNaN(value)) {
		value = Number(calcDisplay.innerText);
	} else if (isNaN(secValue)) {
		secValue = Number(calcDisplay.innerText);
	} 
	calcDisplay.innerText = ''

	if (!isNaN(value) && !isNaN(secValue) && operator != '') {
		calcDisplay.innerText = callMathOperation();
		if (oper == '=')
			restartVar();
	}
	
	if (oper != '=')
		operator = oper
}

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

function addEfect(target) {
	target.classList.add('temp-efect');

	setTimeout(() => {
		target.classList.remove('temp-efect')
	}, 200)
}

const eventHandler = (target) => {
	const str = calcDisplay.innerText;

	if (RESULT_FLAG && target.matches('.number'))
		resultFlagHandler();

	if (target.matches('.number')) 
		calcDisplay.innerText += target.innerText;
	else if (target === cleanBtn) {
		restartVar();
		calcDisplay.innerText = '';
	}
	else if (target === backSpace) {
		let newStr = str.split('').slice(0, -1).join('');
		calcDisplay.innerText = newStr;
	} else if (target === sumBtn)
		addOperator('+');
	else if (target === minusBtn)
		addOperator('-');
	else if (target === multiBtn)
		addOperator('x');
	else if (target === divisionBtn)
		addOperator('/');
	else if (target === equalBtn)
		addOperator('=');
	else if (target === dotBtn)
		addDot();
	else
		return;
	
	addEfect(target);
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