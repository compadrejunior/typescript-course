# Chapter 9: Modules and Namespaces

- [Chapter 9: Modules and Namespaces](#chapter-9-modules-and-namespaces)
  - [Introduction](#introduction)
  - [Splitting your Code into Multiple Files](#splitting-your-code-into-multiple-files)
  - [Namespaces](#namespaces)
  - [Modules](#modules)

## Introduction

When creating a large application with TypeScript usually require using multiple script files instead of just one big .ts file. But how can we reuse our code in TypeScript and organize it in a readable way to improve readability, reuse and separation of concerns.

Here's were Modules and Namespaces can help us. 

## Splitting your Code into Multiple Files

There are two main options to split your code in TypeScript:

**Namespaces & File Bundling**

- Use Namespace code syntax to group code
- Per-file or bundled compilation is possible (less imports to manage)

**ES6 Imports/Exports**

- Use ES6 import/export syntax
- Per-file compilation but single `<script>` import
- Bundling via third-party tools (e.g. Webpack) is possible.

## Namespaces

Namespaces in TypeScript are a way to group related code under a single name, which can help avoid naming collisions and make code more organized and easier to understand. They are particularly useful in large codebases or when integrating multiple libraries that might have overlapping names.

**Syntax**

A namespace is defined using the `namespace` keyword followed by the name of the `namespace`. The body of the namespace is enclosed in curly braces `{}`. Here's the basic syntax:

```TypeScript
namespace MyNamespace {
    // Code goes here
}
```

**Example**

```TypeScript
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
  const lettersRegexp = /^[A-Za-z]+$/;
  const numberRegexp = /^[0-9]+$/;
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }
  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}
// Some samples to try
let strings = ["Hello", "98052", "101"];
// Validators to use
let validators: { [s: string]: Validation.StringValidator } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
// Show whether each string passed each validator
for (let s of strings) {
  for (let name in validators) {
    console.log(
      `"${s}" - ${
        validators[name].isAcceptable(s) ? "matches" : "does not match"
      } ${name}`
    );
  }
}
```

In this example, we’ll move all validator-related entities into a namespace called `Validation`. Because we want the interfaces and classes here to be visible outside the namespace, we preface them with export. Conversely, the variables `lettersRegexp` and `numberRegexp` are implementation details, so they are left `unexported` and will not be visible to code outside the `namespace`. In the test code at the bottom of the file, we now need to qualify the names of the types when used outside the namespace, e.g. `Validation`.`LettersOnlyValidator`.

**Nested Namespaces**

Namespaces can be nested within other namespaces to create a hierarchy of namespaces.

```TypeScript
namespace MyNamespace {
    export namespace InnerNamespace {
        export class InnerClass {
            constructor(public name: string) {}
        }
    }
}

// Usage
let instance = new MyNamespace.InnerNamespace.InnerClass("Hello");
console.log(instance.name); // Output: Hello
```
**Splitting Across Files**

To declare and use multiple files namespaces in TypeScript, you can use the namespace keyword to define a namespace across multiple files. Here's how you can do it:

1. **Defining a Namespace in Multiple Files**: You can define a namespace in multiple parts and multiple files. The final namespace is the combination of all the individual parts. For example:

    ```TypeScript
    // File 1: namespacePart1.ts
    namespace MyNamespace {
        export function myFunction1() {
            // Function logic here
        }
    }

    // File 2: namespacePart2.ts
    namespace MyNamespace {
        export function myFunction2() {
            // Function logic here
        }
    }
    ```
2. **Using Namespaces Across Files**: After defining the namespace in multiple files, you can access the namespace and its members by referencing the files where the namespace is defined. For instance:
    
    ```TypeScript
    /// <reference path="namespacePart1.ts" />
    /// <reference path="namespacePart2.ts" />

    MyNamespace.myFunction1(); // Call function from namespacePart1.ts
    MyNamespace.myFunction2(); // Call function from namespacePart2.ts
    ```
3. Compiling and Loading Code: When using multiple files with namespaces, it's important to ensure that TypeScript compiles and loads all the necessary code. You can achieve this by concatenating the output from the TypeScript compiler using the outFile option.

> [!NOTE]
> It's worth noting that while namespaces are still available in TypeScript, organizing and managing code using ES6 modules is often recommended, as modules are easier to maintain and manage, and can be scoped across multiple files.

**Use Cases**

1. **Organizing Code**: Namespaces are useful for organizing code into logical groups, making it easier to navigate and understand. This is particularly helpful in large projects or when working with multiple libraries.

2. **Avoiding Naming Collisions**: When using multiple libraries or modules, there's a risk of naming collisions. Namespaces can help avoid this by providing a unique scope for each library or module.

3. **Integrating External Libraries**: When integrating external libraries into your TypeScript project, namespaces can be used to encapsulate the library's code, making it clear where the code comes from and preventing naming conflicts with your own code.

4. **Modular Development**: Namespaces can be used to create a modular structure for your application, where each module is defined within its own namespace. This can help in managing dependencies and making the codebase more maintainable.

**Conclusion**

Namespaces in TypeScript are a powerful feature for organizing code, avoiding naming collisions, and integrating external libraries. They provide a way to group related code under a single name, making the codebase more structured and easier to navigate. Whether you're working on a small project or a large application, namespaces can help keep your code organized and maintainable.


## Modules

In TypeScript, modules are used to organize code into reusable units. They provide a way to encapsulate and structure code, making it easier to manage and maintain large-scale applications. 

External modules, also known as ES6 modules, are the modern approach to organizing code in TypeScript. They use the export and import keywords to define and consume modules. Here's an example of the syntax for external modules:

```TypeScript
// File 1: module1.ts
export function myFunction1() {
    // Function logic here
}

// File 2: module2.ts
// Import single object
import { myFunction1 } from './module1';

//import several objects
import { myFunction1, myFunction2 } from './module1';

// Import all objects
import * from './module1';

// Using alias
import { myFunction1 as validator } from './module1';
```

> [!IMPORTANT]
> Import statements will execute only once when the first file is imported. That means, if your import a module is imported in two files, it will run only in the first file it is imported. Although it can be used everywhere it's imported thereafter.

**Benefits and Use Cases**

- **Encapsulation**: Modules allow for encapsulation of code, preventing global namespace pollution and providing a clear boundary for the code within the module.
- **Reusability**: Modules promote code reusability by allowing components to be easily imported and used in different parts of the application.
- **Organization**: They help in organizing code into logical units, making it easier to understand and maintain.
- **Dependency Management**: Modules facilitate dependency management by specifying and loading dependencies between multiple files.

Overall, modules in TypeScript offer a structured and scalable approach to building and organizing applications, promoting code reusability, maintainability, and encapsulation.

By leveraging modules, developers can create more modular, maintainable, and scalable applications, making it easier to manage and extend codebases as projects grow in complexity.

---

[[<< Previous]](../Chapter-08/README.md) [[^Top]](#chapter-9-modules-and-namespaces) [[Next >>]](../Chapter-10/README.md)