function Mesh(dim) {
	const DIM = 5;
	this.mesh = [];
	this.row = 0;
	this.column = 0;

	this.log = function (msg) {
		console.log(msg + "(" + row + ", " + column + ")");
	}

	this.clear = function () {
		for (let i = 0; i < DIM; i++) {
			mesh[i] = [];
			for (let j = 0; j < DIM; j++) {
				mesh[i][j] = " ";
			}
		}
		row = 0;
		column = 0;
	}

	this.show = function () {
		let str = "";
		for (let i = 0; i < DIM; i++) {
			for (let j = 0; j < DIM; j++) {
				str += mesh[i][j];
			}
			str += "\n";
		}
		console.log(str);
	}

	this.draw = function (direction, distance) {
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

	this.shift = function (direction, amount) {
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

	this.isOnEdge = function (direction) {
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

	this.getDistanceEdge = function (direction) {
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

	this.getDimension = function () {
		return DIM;
	}

	this.drawShape = function (msg, script) {
		console.log(msg);
		this.clear();
		that = this;
		script.apply(this, null);
		this.show();
	}

}

function f() {
	function g() {
		return 2;
	}
	return {
		g, g, g;
	}
}
let mesh = new Mesh(5);

mesh.drawShape("linea horizontal", () => {
	do {
		that.draw();
		that.shift("east")
	} while (!that.isOnEdge("east"));
	that.draw();
});

// mesh.drawShape("linea horizontal", () => {
// 	draw();
// 	while (!isOnEdge("east")) {
// 		shift("east");
// 		draw();
// 	}
// });

// mesh.drawShape("linea horizontal", () => {
// 	draw("east", getDimension());
// });


// mesh.drawShape("linea punteada", () => {
// 	do {
// 		draw();
// 		shift("east", 2);
// 	} while (!isOnEdge("east"));
// 	draw();
// });

// mesh.drawShape("linea diagonal", () => {
// 	do {
// 		draw();
// 		shift("east");
// 		shift("south");
// 	} while (!isOnEdge("east"));
// 	draw();
// });

// mesh.drawShape("punto central", () => {
// 	do {
// 		shift("east");
// 		shift("south");
// 	} while (getDistanceEdge("east") != getDistanceEdge("west"));
// 	draw();
// });

// mesh.drawShape("cuadrado central", () => {
// 	do {
// 		shift("east");
// 		shift("south");
// 	} while (getDistanceEdge("east") != getDistanceEdge("west"));
// 	shift("west");
// 	shift("north");
// 	draw("east", 3);
// 	draw("south", 3);
// 	draw("west", 3);
// 	draw("north", 3);
// });
