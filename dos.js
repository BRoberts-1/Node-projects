// Section 30 - Node, V8, Libuv and C++

// Node runs on googles V8 engine. Without V8 Node would be impossible to execute JS because the V8 engine converts the JS code to machine code.

// Node's architecture has another depenedency beside the V8 engine, and that is the libuv library. It is a open source library with a focus on asynchronous I/O(ie it gives Node access to the underlying computer OS, file system, networking, and more.)

// Libuv also implements the event loop and the thread pool. The event loop executes the callback functions and network I/O, while the thread pool is for more heavy work like file access and compression etc.

// V8 and Libuv and written in JS and C++, so because of this we have access to all the JS functions in those programs.

// Other dependencies for Node are http-parser to parse http, c-ares: for DNS requests, and OpenSSL for cryptography, and also zlib for compression.

///////////////////////////////////////////////////////////
// Section 31 - Processes, Threads, and the Thread Pool

// When we run Node, there is a process running(ie instance of program execution on a computer) Node is basically written in C++.

// We have access to this process variable whenever it is running.

// Node.js runs in a single thread(ie a sequence of instructions for executing a program). You must be very careful about not blocking that single thread.

// It runs like this: 1. Initialize program 2. Execute 'top-level' code 3. Require modules 4. Register event callbacks 5. Starts event loop(this is the main piece of Node, most of the work is done here.) Some tasks are too heavy and would block the single thread, so they are, instead, sent to the thread pool to be executed. There are by default 4 threads running in background from this thread pool, and they allow Node to function without stopping.

// The thread pool and be configured upto 128 threads, but 4 is usually enough. The event loop can offload heavy tasks to the thread pool. This all happens automatically.

// Heavy tasks offloaded to thread pool are: File system APIs, Cryptography, Compression, DNS lookups.

//////////////////////////////////////////////////////////////////////////
// Section 32 - The Node.js Event Loop
