episode - 2

1) what is node.js
2) JavaScript runtime
3) chrome v8 javascript engine
4) event-driven architecture
5) asynchronous I/O
6) server-side scripting
7) non-blocking I/O
8) wherever is JS, there is JavaScript engine. Whether on browser, laptop, smartwatch, etc.
9) Ryan Dahl - developer
1:59 history screenshot - part 1
10) Web assembly engine
11) ECMA Script standards - (rules)
12) ES6
13) server => nodeJs (c++) => v8 + super power(API on server , modules)
14) Node Js is a C++ application with v8 embedded into it.
15) v8 is a c++ code?
JS----------------------------
High level language (c++)     |
machine code<-------------------
assembly code
binary code


episode -3
1) node -v
2) npm -v
3) node REPL (read, evaluate, print, loop)
4) in browser, "window", "this"
5) global object ? "global"
15:00 revisit this concept
6) "globalThis" - it is common and standard in each browser  and make it compatible to each.
7)


_________________________________________________

episode - 4

1) how to call other module in other - using "require()" function
2) how to combine so many function and constant in a object and export it
3) Learn and read about "How memory space is created and managed"
4)configuration file 
5) package.json ?
6) common JS(cjs) vs ES module (mjs)
default is "cjs"
27:58 take screenshot


________________________________________________________

episode -5

1) how are variables and functions are private in different modules?
- IIFE and require statement
* require statement is wrapping code inside IIFE
2) from where "module.exports" coming from
3) all the code of the module is wrapped inside a function (IIFE)
IIFE - Immediately invoked function expression

// function (module, require) {
    require
}