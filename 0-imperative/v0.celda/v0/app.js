const { Console } = require("./console");

const console = new Console();
const DIM = 19;
let grid = "\n";
for (let i = 0; i < DIM; x++) {
    for (let j = 0; j < DIM; y++) {
        if (i == 1 && j == 1) {
            grid += "0";
        } else {
            grid += "1";
        }
    }
    grid += "\n";
}
console.writeln(grid);
