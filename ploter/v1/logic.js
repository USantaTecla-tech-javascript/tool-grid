const DIM = 5;
let mesh = [];
let row = 0;
let column = 0;

function log(msg) {
	console.log(msg + "(" + row + ", " + column + ")");
}

function clear() {
	for (let i = 0; i < dim; i++) {
		mesh[i] = [];
		for (let j = 0; j < dim; j++) {
			mesh[i][j] = " ";
		}
	}
	row = 0;
	column = 0;
}

function show() {
	let str = "";
	for (let i = 0; i < dim; i++) {
		for (let j = 0; j < dim; j++) {
			str += mesh[i][j];
		}
		str += "\n";
	}
	console.log(str);
}

function draw(direction, distance) {
	if (direction == undefined) {
		mesh[row][column] = "*";
		log("draw");
	} else {
		for (let i = 0; i < distance - 1; i++) {
			draw();
			shift(direction);
		}
		draw();
	}
}

function shift(direction, amount) {
	if (amount != undefined) {
		for (let i = 0; i < amount; i++) {
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
		log("shift");
	}
}

function isOnEdge(direction) {
	if (direction == "north") {
		return row == 0;
	}
	if (direction == "south") {
		return row == dim - 1;
	}
	if (direction == "east") {
		return column == dim - 1;
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
		return dim - row - 1;
	}
	if (direction == "east") {
		return column;
	}
	if (direction == "west") {
		return dim - column - 1;
	}
}

function getDimension() {
	return dim;
}

function drawShape(msg, script) {
	console.log(msg);
	clear();
	script();
	show();
}

drawShape("linea horizontal", () => {
	do {
		draw();
		shift("east")
	} while (!isOnEdge("east"));
	draw();
});

drawShape("linea horizontal", () => {
	draw();
	while (!isOnEdge("east")) {
		shift("east");
		draw();
	}
});

drawShape("linea horizontal", () => {
	draw("east", getDimension());
});


drawShape("linea punteada", () => {
	do {
		draw();
		shift("east", 2);
	} while (!isOnEdge("east"));
	draw();
});

drawShape("linea diagonal", () => {
	do {
		draw();
		shift("east");
		shift("south");
	} while (!isOnEdge("east"));
	draw();
});

drawShape("punto central", () => {
	do {
		shift("east");
		shift("south");
	} while (getDistanceEdge("east") != getDistanceEdge("west"));
	draw();
});

drawShape("cuadrado central", () => {
	do {
		shift("east");
		shift("south");
	} while (getDistanceEdge("east") != getDistanceEdge("west"));
	shift("west");
	shift("north");
	draw("east", 3);
	draw("south", 3);
	draw("west", 3);
	draw("north", 3);
});
