const DIM = 37;
let mesh = [];
let row = 0;
let column = 0;

function log(msg) {
	console.log(msg + "(" + row + ", " + column + ")");
}

function render(){
	let script = document.getElementById("script");
	drawShape("log", eval(script.value));
	let div = document.getElementById("div");
	let previous = document.getElementById("table");
	if (previous != null){
		div.removeChild(previous);
	}
	let table = document.createElement("table");
	table.setAttribute("id", "table");
	for(let i=0; i<DIM; i++){
		let row = document.createElement("tr");
		for(let j=0; j<DIM; j++){
			let cell = document.createElement("td");
			if (mesh[i][j] == "*"){
				cell.setAttribute("class", "black");
			}
			row.appendChild(cell);
		}
		table.appendChild(row);
	}
	div.appendChild(table);
}

function clear() {
	for (let i = 0; i < DIM; i++) {
		mesh[i] = [];
		for (let j = 0; j < DIM; j++) {
			mesh[i][j] = " ";
		}
	}
	row = 0;
	column = 0;
}

function show() {
	let str = "";
	for(let j=0; j< DIM+2; j++){
		str += "-";
	}
	str += "\n";
	for (let i = 0; i < DIM; i++) {
		str += "|";
		for (let j = 0; j < DIM; j++) {
			str += mesh[i][j];
		}
		str += "|\n";
	}
	for(let j=0; j< DIM+2; j++){
		str += "-";
	}
	console.log(str);
}

function draw(direction, distance) {
	if (direction == undefined) {
		mesh[row][column] = "*";
	} else {
		for (let i = 0; i < distance - 1; i++) {
			draw();
			shift(direction);
		}
		draw();
	}
}

function shift(direction, distance) {
	if (distance != undefined) {
		for (let i = 0; i < distance; i++) {
			shift(direction);
		}
	} else {
		if (direction == "north") {
			row--;
		} else if (direction == "south") {
			row++;
		} else if (direction == "east") {
			column++;
		} else if (direction == "west") {
			column--;
		}
	}
}

function isOnEdge(direction) {
	if (direction == "north") {
		return row == 0;
	}
	if (direction == "south") {
		return row == DIM - 1;
	}
	if (direction == "east") {
		return column == DIM - 1;
	}
	if (direction == "west") {
		return column == 0;
	}
}

function getDistanceEdge(direction) {
	if (direction == "north") {
		return row;
	}
	if (direction == "south") {
		return DIM - row - 1;
	}
	if (direction == "east") {
		return column;
	}
	if (direction == "west") {
		return DIM - column - 1;
	}
}

function getDimension() {
	return DIM;
}

function drawShape(msg, script) {
	console.log(msg);
	clear();
	for(sentence of script){
		sentence.exec();
	}
	show();
}

function oDraw(direction, distance){
	this.direction = direction;
	this.distance = distance;

	this.exec = function() {
		draw(direction, distance);
	}
}

function Draw(direction, distance){
	if (typeof distance == "object"){
		return new oDraw(direction, distance.eval());
	} else {
		return new oDraw(direction, distance);
	}
}

function oShift(direction, distance){
	this.direction = direction;
	this.distance = distance;

	this.exec = function() {
		shift(direction, distance);
	}
}

function Shift(direction, distance){
	return new oShift(direction, distance);
}

function oIsOnEdge(direction) {
	this.direction = direction;

	this.eval = function(){
		return isOnEdge(direction);
	}
}

function IsOnEdge(direction){
	return new oIsOnEdge(direction);
}

function oNot(condition){
	this.condition = condition;

	this.eval = function(){
		return !condition.eval();
	}
}

function Not(condition){
	return new oNot(condition);
}

function oAnd(left, right){
	this.left = left;
	this.right = right;

	this.eval = function(){
		return left.eval() && right.eval();
	}
}

function And(left, right){
	return new oAnd(left, right);
}

function oOr(left, right){
	this.left = left;
	this.right = right;

	this.eval = function(){
		return left.eval() || right.eval();
	}
}

function Or(left, right){
	return new oOr(left, right);
}

function oDoWhile(body, condition){
	this.body = body;
	this.condition = condition;

	this.exec = function() {
		do {
			for(sentence of body){
				sentence.exec();
			}
		} while (condition.eval());
	}
}

function DoWhile(body, condition){
	return new oDoWhile(body, condition);
}

function oWhile(condition, body){
	this.condition = condition;
	this.body = body;

	this.exec = function() {
		while (condition.eval()) {
			for(sentence of body){
				sentence.exec();
			}
		};
	}
}

function While(condition, body){
	return new oWhile(condition, body);
}

function oGetDimension(){

	this.eval = function() {
		return getDimension();
	}
}

function GetDimension(){
	return new oGetDimension();
}

function oGetDistanceEdge(direction){
	this.direction = direction;

	this.eval = function() {
		return getDistanceEdge(direction);
	}
}

function GetDistanceEdge(direction){
	return new oGetDistanceEdge(direction);
}

function GetDimension(){
	return new oGetDimension();
}

function oEquals(left, right){
	this.left = left;
	this.right = right;

	this.eval = function() {
		let leftEval = this.left;
		if (typeof this.left == "object"){
			leftEval = left.eval();
		} 
		let rightEval = this.right;
		if (typeof this.right == "object"){
			rightEval = right.eval();
		} 
		return leftEval == rightEval;
	}
}

function Equals(left, right){
	return new oEquals(left, right);
}

function oPlus(left, right){
	this.left = left;
	this.right = right;

	this.eval = function() {
		let leftEval = this.left;
		if (typeof this.left == "object"){
			leftEval = left.eval();
		} 
		let rightEval = this.right;
		if (typeof this.right == "object"){
			rightEval = right.eval();
		} 
		return leftEval + rightEval;
	}
}

function Plus(left, right){
	return new oPlus(left, right);
}

function oMinus(left, right){
	this.left = left;
	this.right = right;

	this.eval = function() {
		let leftEval = this.left;
		if (typeof this.left == "object"){
			leftEval = left.eval();
		} 
		let rightEval = this.right;
		if (typeof this.right == "object"){
			rightEval = right.eval();
		} 
		return leftEval - rightEval;
	}
}

function Minus(left, right){
	return new oMinus(left, right);
}

function oIf(condition, then, esle){
	this.condition = condition;
	this.then = then;
	this.esle = esle;

	this.exec = function(){
		let eval = condition.eval();
		if (eval){
			for(sentence of then){
				sentence.exec();
			}
		} else if (esle != undefined){
			for(sentence of esle){
				sentence.exec();
			}
		}
	}
}

function If(condition, then, esle){
	return new oIf(condition, then, esle);
}

// drawShape("linea horizontal", eval(''+
// '['+
// 'DoWhile(['+
// 'Draw(),'+
// 'Shift("east")'+
// '],'+
// 'Not('+
// 'IsOnEdge("east")'+
// ')'+
// '),'+
// 'Draw()'+
// ']'));

// drawShape("linea horizontal", 
// 	[
// 		DoWhile([
// 				Draw(),
// 				Shift("east")
// 			],
// 			Not(
// 				IsOnEdge("east")
// 			)
// 		),
// 		Draw()
// 	]
// );

// drawShape("linea horizontal", 
// 	[
// 		Draw(),
// 		While (
// 			Not(
// 				IsOnEdge("east")
// 			),
// 			[
// 				Shift("east"),
// 				Draw(),
// 		])
// 	]
// );

// // drawShape("linea horizontal", () => {
// // 	draw();
// // 	while (!isOnEdge("east")) {
// // 		shift("east");
// // 		draw();
// // 	}
// // });

// drawShape("linea horizontal con 5", 
// 	[
// 		Draw("east", 5),
// 	]
// );

// drawShape("linea horizontal con GetDimension", 
// 	[
// 		Draw("east", GetDimension()),
// 	]
// );

// // drawShape("linea horizontal", () => {
// // 	draw("east", getDimension());
// // });

// drawShape("linea punteada", 
// 	[
// 		DoWhile(
// 			[
// 				Draw(),
// 				Shift("east", 2)
// 			],
// 			Not(
// 				IsOnEdge("east")
// 			)
// 		),
// 		Draw()
// 	]
// );


// // drawShape("linea punteada", () => {
// // 	do {
// // 		draw();
// // 		shift("east", 2);
// // 	} while (!isOnEdge("east"));
// // 	draw();
// // });

drawShape("linea diagonal", 
	[
		DoWhile(
			[
				Draw(),
				Shift("east"),
				Shift("south"),
			],
			Not(
				IsOnEdge("east")
			)),
		Draw()
	]
);

// // drawShape("linea diagonal", () => {
// // 	do {
// // 		draw();
// // 		shift("east");
// // 		shift("south");
// // 	} while (!isOnEdge("east"));
// // 	draw();
// // });

// drawShape("punto central", 
// 	[
// 		DoWhile(
// 			[
// 				Shift("east"),
// 				Shift("south"),
// 			],
// 			Not(
// 				Equals(
// 					GetDistanceEdge("east"),
// 					GetDistanceEdge("west")
// 				)
// 			)
// 		),
// 		Draw(),
// 	]
// );

// // drawShape("punto central", () => {
// // 	do {
// // 		shift("east");
// // 		shift("south");
// // 	} while (getDistanceEdge("east") != getDistanceEdge("west"));
// // 	draw();
// // });

// drawShape("cuadrado central", 
// 	[
// 		DoWhile(
// 			[
// 				Shift("east"),
// 				Shift("south"),
// 			],
// 			Not(
// 				Equals(
// 					GetDistanceEdge("east"),
// 					GetDistanceEdge("west")
// 				)
// 			)
// 		),
// 		Shift("west"),
// 		Shift("north"),
// 		Draw("east", 3),
// 		Draw("south", 3),
// 		Draw("west", 3),
// 		Draw("north", 3)
// 	]
// );


// // drawShape("cuadrado central", () => {
// // 	do {
// // 		shift("east");
// // 		shift("south");
// // 	} while (getDistanceEdge("east") != getDistanceEdge("west"));
// // 	shift("west");
// // 	shift("north");
// // 	draw("east", 3);
// // 	draw("south", 3);
// // 	draw("west", 3);
// // 	draw("north", 3);
// // });

// drawShape("sin la 2,2", 
// 	[
// 		DoWhile(
// 			[
// 				DoWhile(
// 					[
// 						If(
// 							Not(
// 								And(
// 									Equals(
// 										GetDistanceEdge("north"),
// 										2
// 									),
// 									Equals(
// 										GetDistanceEdge("east"),
// 										2
// 									)	
// 								)
// 							),
// 							Draw()
// 						),
// 						Shift("east"),
// 					],
// 					Not(
// 						IsOnEdge("east")
// 					)
// 				),
// 				Shift("south"),
// 				DoWhile(
// 					[
// 						Shift("west"),
// 					],
// 					Not(
// 						IsOnEdge("west")
// 					)
// 				)
// 			],
// 			Not(
// 				IsOnEdge("south")
// 			)
// 		),
// 		DoWhile(
// 			[
// 				Draw(),
// 				Shift("east"),
// 			],
// 			Not(
// 				IsOnEdge("east")
// 			)
// 		)
// 	]
// );

drawShape("linea xxx", 
	[
		DoWhile(
			[
				If(
					Equals(
						0,
						Minus(
							GetDistanceEdge("east"),
							GetDistanceEdge("north")
						)
					),
					[
						Draw()
					]
				),
				If(
					And(
						IsOnEdge("east"),
						Not(
							IsOnEdge("south")
						)
					),
					[
						DoWhile(
							[
								Shift("west")
							],
							Not(
								IsOnEdge("west")
							)
						),
						Shift("south")
					],
					[
						Shift("east")
					]
				)
			],
			Not(
				And(
					IsOnEdge("east"),
					IsOnEdge("south")
				)
			)
		),
		If(
			Equals(
				0,
				Minus(
					GetDistanceEdge("west"),
					GetDistanceEdge("north")
				)
			),
			[
				Draw()
			]
		)
	]
);