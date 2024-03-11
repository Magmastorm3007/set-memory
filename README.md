### Package: set-memory

This package is designed to set the NODE_OPTIONS for memory limit configuration on Linux/Unix based systems, aiding deployment on low memory machines and preventing heap overflow issues in JavaScript and TypeScript programs.Stay Updated for future versions

#### Installation
To install the package globally, execute the following command:
```bash
npm i -g set-memory
```
#### Running the commands
For a specific limit/custom limit
```bash
set-memory <Number>
```
For auto memory allocation as per guidelines with some space for swapping

```bash
set-memory-auto
```

