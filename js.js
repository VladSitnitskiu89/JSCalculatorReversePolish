function OnLoad() {
	while(true) {
		let input = prompt("Введите выражение, дробные числа через точку");
		input.replace(" ", "");
		alert("Ответ: " + CalcReversePolish(input));
	}
}

const STANDART_OPERATORS = [ "(", ")", "+", "-", "*", "/", "^"];

function Separate(input){
	let output = [];
	let pos = 0;
	while (pos < input.length){
		s = "" + input[pos];
		if (!STANDART_OPERATORS.includes(input[pos])) {
			for (let i = pos + 1; i < input.length && !STANDART_OPERATORS.includes(input[i]); i++) {
				s += input[i];
			}
		}
		output.push(s);
		pos += s.length;
	}
	return output;
}

function GetPriority(s) {
	switch (s)
	{
		case "(":
		case ")":
			return 0;
		case "+":
		case "-":
			return 1;
		case "*":
		case "/":
			return 2;
		case "^":
			return 3;
		default:
			return 4;
	}
}

function ConvertToPostfixNotation(input) {
	inputSeparated = Separate(input);
	outputSeparated = [];
	let stack = [];
	inputSeparated.forEach(function(c) {
		if (STANDART_OPERATORS.includes(c)) {
			if (stack.length > 0 && c !== "(") {
				if (c === ")") {
					s = stack.pop();
					while (s !== "(") {
						outputSeparated.push(s);
						s = stack.pop();
					}
				}
				else if (GetPriority(c) > GetPriority(stack[stack.length-1])) {
					stack.push(c);
				}
				else {
					while (stack.length > 0 && GetPriority(c) <= GetPriority(stack[stack.length-1])) {
						outputSeparated.push(stack.pop());
					}
					stack.push(c);
				}
			}
			else {
				stack.push(c);
			}
		}
		else {
			outputSeparated.push(c);
		}
	});
	if (stack.length > 0) {
		stack.slice().reverse().forEach(function(c) {
			outputSeparated.push(c);
		});
		
	}
	return outputSeparated;
}

function CalcReversePolish(input) {
  let outputSeparated = ConvertToPostfixNotation(input);
  let stack =[];
  if(outputSeparated === '') {
    return 0;
  }
  for(let i = 0; i < outputSeparated.length; i++) {
		if(!isNaN(outputSeparated[i]) && isFinite(outputSeparated[i])) {
			stack.push(outputSeparated[i]);
		}
		else {
			let a = Number(stack.pop());
			let b = Number(stack.pop());
			switch (outputSeparated[i])
			{
				case "+":
					stack.push(a + b);
					break;
				case "-":
					stack.push(b - a);
					break;
				case "*":
					stack.push(a * b)
					break;
				case "/":
					stack.push(b / a);
					break;
				case "^":
					stack.push(Math.pow(b, a));
					break;
			}

		}
}
	if(stack.length > 1) {
		return "ERROR";
	}
	else {
		return stack[0];
	}
}
