# Chapter 3 : The TypeScript Compiler and Configuration
- [Chapter 3 : The TypeScript Compiler and Configuration](#chapter-3--the-typescript-compiler-and-configuration)
  - [Compiling TypeScript](#compiling-typescript)
  - [The Watch Mode](#the-watch-mode)
  - [Configuring TypeScript for your project](#configuring-typescript-for-your-project)

## Compiling TypeScript

As we saw in Chapter 1, TypeScript is not executed by the browser or any runtime environment. So whenever we need to run our code, we need to convert all .ts files into valid .js (JavaScript) files. This process is called *transpilation*. But to simplify things, we will call it compilation for now on.

There are many ways to compile our code:

```bash
# If TypeScript is globally installed
tsc [filename.ts]

# If TypeScript is not globally available
npx tsc [filename.ts]

# If you set source and target folders in your tsconfig.json file
tsc -p tsconfig.json

# or
npx tsc -p tsconfig.json

# or simply
tsc
```

If not specified in the tsconfig.json file, TypeScript will output the .js files in the same directory of the source folder. This is intended to build multiple files without having to specify each single file name.

We will see later how to specify compiling options.

## The Watch Mode

As you might imagine, having to type a command every time we need to run and test our code is an annoying task. So TypeScript compiler `tsc` has an option called *watch mode*. 

The watch mode will automatically detect any changes in our TypeScript code and instantly compile into JavaScript.

To run the watch mode, simply add the --watch option after the `tsc` command. For example:

```bash
tsc --watch
```

The terminal window will be run indefinitely, until we stop the command.

```bash
[23:05:08] File change detected. Starting incremental compilation...

[23:05:08] Found 0 errors. Watching for file changes.
```

Now we can make changes to our code anytime and we will see the results in the terminal. 

```TypeScript
// Define some function
function printSomething(a: number, b: number): void {
  console.log(a + b);
}

// Pass invalid type values to the function: this might fail
console.log(add(1, '2'));
```

If we write any TypeScript error, we will see the errors in the terminal.

```bash
[23:06:36] File change detected. Starting incremental compilation...

src/CompilerError.ts:7:20 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

7 console.log(add(1, '2'));
                     ~~~

[23:06:36] Found 1 error. Watching for file changes.
```

We can simply fix our code and save again and the errors are gone.

```TypeScript
// Pass valid type values to the function: this will work
console.log(add(1, 2));
```

```bash
[23:07:31] File change detected. Starting incremental compilation...

[23:07:31] Found 0 errors. Watching for file changes.
```

This process continue until we stop working and cancel the task with Ctrl + C in the terminal. 


## Configuring TypeScript for your project

In the previous topics we saw that if we don't specify a source and target folders for our project, TypeScript will generate all the output files in the same folders as the source file.

Also, anytime we need to compile a file or a list of file, we need to specify their names in the `tsc` command. 

In big projects, with many files and folders, this might get messy, so it's important to setup a source folder for our TypeScript file and target folder for our JavaScript files. 

The first step to setup your project is to create an initial configuration file `tsconfig.json`. To do this, we should type `tsc --init` in the root folder of our project. 

The tsc command will create a configuration file wit default settings. There is a long list of options in this file that we might be interested to change in the future. 

We can check the documentation for more details about the project configuration options: [TSConfig Reference](https://www.typescriptlang.org/tsconfig). But for now we only need to set three options: 

- `rootDir`: This property is used to specify the root directory of your input files.

- `outDir`: The outDir option in the tsconfig.json file is used to specify the output directory for the compiled JavaScript files. 

It's a common pattern to organize your project with the following structure (although you can organize it any way your prefer):

```bash
my_project
|-- tsconfig.json
|-- src/
|   |-- a.ts
|   |-- b.ts
|   |-- c.ts
|-- dist/
|   |-- a.js
|   |-- b.js
|   |-- c.js
```

In the example above, `my_project` is the project folder where tsconfig.json should reside.

The `src` folder is where we add our TypeScript files. It may contain sub folders as well. 

The `dist` folder is where the compiled JavaScript files will be generated. Another common name for the output folder is `build`. 

You might choose the names whatever you want. Just keep in mind that maintaining a common pattern can help other developers to understand your code and CI tools and scripts to easily refer to your code, since this pattern is expected. 

Let's change the `tsconfig.json` options to reflect this structure. For the sake of simplicity, we will omit any option we are not using at this moment. 

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist", 
  },
}
```

Now, when we compile with the `tsc` command in the root folder, and it will respect the configurations we set. 

> [!TIP]
> You don't need to use the `tsc --init` command to create a configuration file. If you are an experienced TypeScript developer, you may find better to just create the file manually and add just the options you need. 

You can control in a more fine grained way what to build with the `include` and `exclude` options. 

`include` will only build the files and/or folders specified in this option. 
`exclude` will ignore the files and/or folders specified in this option.

Both options accept glob patterns to filter the content it will look for. 

include and exclude support wildcard characters to make glob patterns:

- `*` matches zero or more characters (excluding directory separators)
- `?` matches any one character (excluding directory separators)
- `**/` matches any directory nested to any level

If the last path segment in a pattern does not contain a file extension or wildcard character, then it is treated as a directory, and files with supported extensions inside that directory are included (e.g. .ts, .tsx, and .d.ts by default, with .js and .jsx if allowJs is set to true).

--- 

[[<< Previous]](../Chapter-02/README.md) [[^Top]](#chapter-3--the-typescript-compiler-and-configuration) [[Next >>]](../Chapter-04/README.md)
