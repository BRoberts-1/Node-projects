// Section 30 - Node, V8, Libuv and C++

// Node runs on Google's V8 engine. Without V8 Node would be impossible to execute JS because the V8 engine converts the JS code to machine code.

// Node's architecture has another depenedency beside the V8 engine, and that is the Libuv library. It is a open source library with a focus on asynchronous I/O(ie it gives Node access to the underlying computer OS, file system, networking, and more.)

// Libuv library also implements the event loop and the thread pool. The event loop executes the callback functions and network I/O, while the thread pool is for more heavy work like file access and compression etc.

// V8 and Libuv are written in JS and C++, and because of this we have access to all the JS functions in those programs.

// Other dependencies for Node are Http-parser to parse http, C-ares: for DNS requests, OpenSSL for cryptography, and also Zlib for compression.

///////////////////////////////////////////////////////////
// Section 31 - Processes, Threads, and the Thread Pool

// When we run Node, there is a process running(ie instance of program execution on a computer) Node is basically written in C++, C, and JS.

// We have access to this process variable whenever it is running.

// Node.js runs in a single thread(ie a sequence of instructions for executing a program). You must be very careful about not blocking that single thread.

// It runs like this: 1. Initialize program 2. Execute 'top-level' code 3. Require modules 4. Register event callbacks 5. Starts event loop(this is the main piece of Node, most of the work is done here.) Some tasks are too heavy and would block the single thread, so they are, instead, sent to the thread pool to be executed. There are by default 4 threads running in background from this thread pool, and they allow Node to function without stopping.

// The thread pool can be configured to have up to 128 threads, but 4 is usually enough. The event loop can offload heavy tasks to the thread pool. This all happens automatically.

// Heavy tasks offloaded to thread pool are: File system APIs, Cryptography, Compression, DNS lookups.

//////////////////////////////////////////////////////////////////////////
// Section 32 - The Node.js Event Loop

// The heart of the Node.js architecture.

// There is the Node.js process and the single thread and the event loop.

// The event loop processes all the applicatoin code that is inside the callback functions(i.e. all NON-top-level code).

// Node.js is build around callback functions ie Event-driven architecture.

// Events are: A new HTTP request, a timer expired, a file that is finished being read. All of these have callback functions which will then trigger the event loop.

// Event-driven architecure has events that are emitted, event loops picks them up, and the callback functions for these events are called/executed. The event loop orchestrates all of this and offloads any other processing to the thread pool.

// When we start our application the event loop starts running immediately.

// The event loop has many phases, and each phase has its own callback queue. All callbacks are processed in each queue before it enters the next phase.

// There are 4 phases of the event loop:

// Phase 1 - Expired timer callbacks e.g. the setTimer() function.
// Phase 2 - I/O polling(looking for I/O events to put in queue) and execution of I/O callbacks. I/O in Node.js mainly refers to networking and file access. 99% of Node.js code will be in this phase because this is the bulk of the code written in Node.js.
// Phase 3 - setImmediate callbacks are special timers with callbacks used to be executed immediately after the I/O polling phase and are used in some advanced use cases.
// Phase 4 - Close callbacks are used for when a web server or web socket closes i.e. shuts down.

// There are two other queues that occur during the event loop:

// 1) Process.nextTick() queue and
// 2) Other microtasks queue which resolves promises e.e. to an API fetching data

// Both of these last two queues are executed between the other phases of the event loop ie in-between the 4 phases. Each of the main 4 phases has to finish first and then it loops around again to the beginning to start over. Any event that belongs in those 4 phases has to wait until the next go-around to be executed.

// Each loop is called a tick. It checkes to see if there are any pending timers or I/O tasks, and if not, it will exit the program otherwise it continues running the event loop to do another tick. So e.g. when our app Node Farm was waiting for an HTTP requests it continues to run. Also, reading and writing to a file it

// Knowing the event loop well will help you to write your own performance based code and debug it if something happens.

// It is the event loop that allows Node.js to use asynchronous programming, making it the most important feature in Node.js. This also makes it different from other languages that start new threads for each new user. Node.js is single thread and has the event loop orchestrate and offload tasks to the thread pool to ensure the single thread is not blocked, which would slow down the server completely.

// Tips for writing non-blocking code in Node.js:

// Don't use sync versions of functions in fs, crypto, or zlib modules in your callback functions. Only use sync in top-level code.

// Don't perform complex calculations e.g. loops inside of loops which will slow down or block the thread.

// Be careful using large JSON objects because JSON.parse() and JSON.stringify() will cause a slow down if ojects are too big

// Don't use too complex regular expression e.g. nested quantifiers or back references because again, like large JSON objects, it can take a long time to process and block the event loop.
