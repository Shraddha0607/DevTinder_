Set-1

1️⃣ What is Node.js and how is it different from JavaScript in the browser?

Node.js is a JavaScript runtime that allows JavaScript to run outside the browser, mainly on the server side.
In the browser, JS can only access UI APIs, but in Node.js it can access file system, OS, network, and backend APIs.

2️⃣ What role does the Chrome V8 engine play in Node.js?

V8 is the engine that converts JavaScript into machine code.
Node.js embeds V8 inside it so that JavaScript can run on servers, not just browsers.

3️⃣ What do you mean by event-driven and non-blocking architecture in Node.js?

Node.js uses an event loop that runs tasks based on events and callbacks.
Tasks that take time (I/O) run in background without blocking execution — this makes Node non-blocking and highly scalable.

4️⃣ What is the difference between synchronous and asynchronous I/O?

Synchronous I/O: Code waits until a task completes — blocking.

Asynchronous I/O: Task runs in the background, and the program continues executing — non-blocking.

Example:
Synchronous → fs.readFileSync()
Asynchronous → fs.readFile()

5️⃣ Who created Node.js and why was it invented?

Node.js was created by Ryan Dahl in 2009 to build high-performance, scalable server applications that can handle many simultaneous connections.

6️⃣ What is the purpose of global, window, and globalThis? How are they different?

window — global object in browser

global — global object in Node.js

globalThis — a universal global object available in both environments (standardized)

7️⃣ What is Node REPL and when do you use it?

REPL means Read–Evaluate–Print–Loop.
It is an interactive terminal where you can run JavaScript line-by-line for testing and debugging small code snippets.

8️⃣ What is the difference between CommonJS and ES Modules? Which one is default in Node.js?
Feature	CommonJS (CJS)	ES Modules (MJS)
Import	require()	import
Export	module.exports	export
Default in Node	✅ Yes	❌ Unless "type":"module" is added

Node uses CommonJS by default.

9️⃣ What is package.json and why is it important in Node.js projects?

package.json is the configuration file of a Node project.
It contains project details, dependencies, scripts, versions, and metadata — the project cannot be managed properly without it.

🔟 How do you import and export modules in Node.js? (“require” and “module.exports”)

Export a function or object 👇

module.exports = calculateSum;


Import it 👇

const calculateSum = require("./sum.js");

⭐ Bonus Answers
🔥 Why is Node.js written in C++?

Because C++ gives high performance, low-level control, and direct OS access, and it allows embedding the V8 engine efficiently.

🔥 How does V8 convert JavaScript to machine code?

V8 parses JS → creates AST → optimizes it using Just-In-Time (JIT) compilation → generates machine code for fast execution.

🔥 Why does Node.js perform well for high-concurrency applications?

Because Node uses:

Event loop

Asynchronous + non-blocking I/O
So one thread can handle thousands of simultaneous requests efficiently without waiting for slow tasks.


_______________________________________________________________

Set -2
