const calculate = {
    add,
    subtract,
    multiply,
    division
} 

function add (a, b) {
    return a+b;
}

function subtract (a, b) {
    return a-b;
}

function multiply (a, b) {
    return a * b;
}

function division (a, b) {
    return a/b;
}

const x = 3;

module.exports = {
    calculate,
    x
};

// module.exports.calculate = calculate;
// module.exports.x = x;