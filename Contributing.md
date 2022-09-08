## JavaScript Best Practices and Style Guide

•	Give variables and functions meaningful names
```sh
Eg. 
let emptyFieldError = ‘This is a required field’;
```

•	Always declare variables with var, let or const
```sh
Eg. 
let description = ‘some description’; <- good example
description = ‘some description’; <- bad example
```

•	Use camelCasing for JavaScript variables
```sh
Eg. 
let emptyFieldError <- good example
let emptyfielderror <- bad example
```

•	Add a space on both sides of operators 
-	Except for the not (!) operator, which should not have a space
```sh
Eg. 
let description = ‘some description; <- good example
let description=’some description’; <- bad example

```

•	Indent code 4 spaces (one tab) for readability
```sh
Eg.
function myFunction() {
	// my indented code
}
```

•	End a simple statement with a semicolon
```sh
Eg. let statement = ‘a simple statement’;
```

•	Curly braces should start on the same line as their statement, with the closing brace on a new line
```sh
Eg.
if (condition) {
    // do something
}
```

•	Include a space after a comma in arrays
```sh
Eg. let myArray = [item1, item2, item3];
```

•	Include a space between an object property and value
•	Do not add a comma after the last property-value pair in an object
```sh
Eg.
let myObject = {
name: ‘John’,
age: 30
}
```

•	Do not include unused variables

•	Use double quotes for JSX attribute value strings, use single quotes for all other JS
```sh
Eg.
import axios from ‘axios’; <- single quotes for JS
<input type=”text” name=”description” /> <- double quotes for JSX
```

•	Use curly braces for JavaScript inside of markup 
```sh
Eg.
<input type=”number” name=”price” value={price} />
```

•	Use the filename as the component name
```sh
Eg. import Signin from ‘./views/Signin’
```

•	Include a single space in a self-closing tag
```sh
Eg. 
<Footer /> <- good example
<Footer/> <- bad example
```

•	No spaces within JSX curly braces
```sh
Eg. <input type=”text” value={name} />
```
•	JSX tags that span more than one line should be wrapped in parentheses
```sh
Eg.
render() {
  return (
	<ParentComponent>
		<ChildComponent />
	</ParentComponent>
);
}
```

•	Comment your name above your own section of code to attribute your work. If there are multiple contributors in one file, also comment where your code section ends.
```sh
Eg.
In JavaScript
// Richard’s Code 
	some code here
// Richard’s Code ENDS

or

In JSX
{/* Richard’s Code */}
	 some code here
{/* Richard’s Code ENDS */}
```
