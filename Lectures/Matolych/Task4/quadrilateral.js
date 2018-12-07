// Class to create a four-sided shape that is not self-intersecting
class SimpleQuadrilateral {
    /**
     * @param {number[]} sides Array of four sides' values
     */
    constructor(sides) {
        if (Array.isArray(sides) && sides.length === 4 && sides.every(elt => Number.isInteger(elt))) {
            this.sides = {top: sides[0], right: sides[1], bottom: sides[2], left: sides[3]};
        } else {
            throw new TypeError("Invalid arguments");
        }
    }
    
    /**
     * Creates a quadrilateral with random edges between two numbers
     * @param {number} min The smallest side a shape may have
     * @param {number} max The largest side a shape may have
     */
    static random(min, max) {
        return new SimpleQuadrilateral([...Array(4)].map(() => randomInteger(min, max)));
    }

    get perimeter() {
        return Object.values(this.sides).reduce((a, b) => a + b);
    } 

    /**
     * @type {string}
     */
    get type() {
        let sides = Object.values(this.sides);
        if (sides.every(side => side === sides[0])) return "square";
        if (sides.filter((_, i) => i % 2 === 0).every((side, _, arr) => side === arr[0]) && 
            sides.filter((_, i) => i % 2 === 1).every((side, _, arr) => side === arr[0])) return "parallelogram";
        // ...
        return "quadrilateral";
    }

    toString() {
        return JSON.stringify(this.sides, null, 2);
    }
}

/**
 * Generates random integer between two numbers
 * @param {number} min The smallest integer the method may return
 * @param {number} max The largest integer the method may return
 */
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = SimpleQuadrilateral;



