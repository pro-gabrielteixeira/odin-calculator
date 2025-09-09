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

function sumOperation() {
	const str = calcDisplay.innerText;
	let a = str.split('+')[0];
	let b = str.split('+')[1];
	return Number(a) + Number(b)
}

function subOperation() {
	const str = calcDisplay.innerText;
	let a = str.split('-')[0];
	let b = str.split('-')[1];
	return a - b
}

function multiOperation() {
	const str = calcDisplay.innerText;
	let a = str.split('x')[0];
	let b = str.split('x')[1];
	return a * b
}

function divOperation() {
	const str = calcDisplay.innerText;
	let a = str.split('/')[0];
	let b = str.split('/')[1];
	return a / b
}

function isThereOtherOperator() {
	let check = 0;
	const str = calcDisplay.innerText;
	if (str.length === 0)
		return 0;
	for (let i = 0; i < str.length; i++)
		if ((str[i] > '9' || str[i] < '0') && str[i] != '.')
			check++;
	return check >= 1 ? 1 : 0;
}

function addSum() {
	const str = calcDisplay.innerText;
	if (str.length === 0)
		return
	if (isThereOtherOperator())
		getResult();
	calcDisplay.innerText += '+'
}

function addSub() {
	const str = calcDisplay.innerText;
	if (str.length === 0)
		return
	if (isThereOtherOperator())
		getResult();
	calcDisplay.innerText += '-'
}

function addMulti() {
	const str = calcDisplay.innerText;
	if (str.length === 0)
		return
	if (isThereOtherOperator())
		getResult();
	calcDisplay.innerText += 'x';
}

function addDiv() {
	const str = calcDisplay.innerText;
	if (str.length === 0)
		return
	if (isThereOtherOperator())
		getResult();
	calcDisplay.innerText += '/'
}

function isThereADot() {
	let checkDot = 0;
	const str = calcDisplay.innerText;
	if (str.length === 0)
		return 1;
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
	const str = calcDisplay.innerText;
	if (str.length === 0)
		return 0;
	for (let i = 0; i < str.length; i++)
		if (str[i] > '9' || str[i] < '0') {
			if (str[i] === '/')
				return divOperation();
			if (str[i] === 'x')
				return multiOperation();
			if (str[i] === '-')
				return subOperation();
			if (str[i] === '+')
				return sumOperation();
		}
}

function getResult() {
	if (isThereOtherOperator())
		calcDisplay.innerText = callMathOperation();
}

const eventHandler = (target) => {
	if (RESULT_FLAG) {
		if (target.matches('.number'))
			calcDisplay.innerText = '';
		RESULT_FLAG = 0;
	} 
	if (target.matches('.number'))
		calcDisplay.innerText += target.innerText;
	else if (target === cleanBtn)
		calcDisplay.innerText = '';
	else if (target === backSpace) {
		let str = calcDisplay.innerText;
		str = str.split('').slice(0, -1).join('');
		calcDisplay.innerText = str;
	} else if (target === sumBtn)
		addSum();
	else if (target === minusBtn)
		addSub();
	else if (target === multiBtn)
		addMulti();
	else if (target === divisionBtn)
		addDiv()
	else if (target === equalBtn) {
		RESULT_FLAG = 1;
		getResult();
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