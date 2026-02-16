
## Comment
_ # Comments
## With

The **`with`** keyword in Python is used to wrap the execution of a block of code within methods defined by a context manager. It simplifies resource management — automatically handling setup and teardown operations like opening and closing files, acquiring and releasing locks, or connecting and disconnecting from databases.

When a block under `with` is executed:

1. The context manager’s `__enter__()` method is called.
2. The block of code inside the `with` statement runs.
3. The context manager’s `__exit__()` method is automatically called after the block finishes — even if an error occurs.
## from
The **`from`** keyword in Python is used to import specific items (such as [functions](https://www.codecademy.com/resources/docs/python/functions), [classes](https://www.codecademy.com/resources/docs/python/classes), or [variables](https://www.codecademy.com/resources/docs/python/variables)) from a module instead of importing the entire module. It helps keep the code cleaner and avoids unnecessary namespace clutter.

For example, instead of importing the entire `math` module, only the required functions can be imported.

## Data Type
- String type: `str`
- Boolean type: `bool`
- Binary types: `bytes`, `bytearray`, `memoryview`
- Number types: `int`, `float`, `complex`
- Sequence Types: `list`, `range`, `tuple`
- Set types: `set`, `frozenset`
- Dictionary type: `dict`
## Math
Squared is ** like ^, meaning 2^2 = 4 is 2 ** 2 = 4
## Try
The **`try`** keyword in Python is used to define a code block that may raise an exception, allowing errors to be caught and handled gracefully with `except`, and optionally complemented by `else` and `finally` clauses.

# Python Operators

**Operators** in Python programming are special symbols or keywords that perform operations on variables and values. They are fundamental building blocks that allow developers to manipulate data, perform calculations, make comparisons, and control program flow. Python operators take one or more operands (values or variables) and produce a result based on the specific operation being performed. There are seven different operators in Python:

1. **Arithmetic Operators**: Used to perform mathematical calculations like addition, subtraction, multiplication, and division.
2. **Assignment Operators**: Used to assign values to variables and update them with operations.
3. **Comparison Operators**: Used to compare two values and return a Boolean result (True or False).
4. **Logical Operators**: Used to combine multiple conditions and return a Boolean outcome.
5. **Bitwise Operators**: Used to perform operations at the binary (bit) level on integers.
6. **Membership Operators**: Used to test whether a value exists within a sequence such as a list or string.
7. **Identity Operators**: Used to check whether two variables refer to the exact same object in memory.
## Nice to know

**Escape characters**
\n for new line - Each `\n` is like pressing **Enter** before listing the next item.

**f string**
An **f-string** is a string that lets you **embed variables and expressions directly inside it**.
You mark it by putting an **`f` before the quotes**.
without:
```
total = 254.0
print("The total is $" + str(total))
```
with:
```
total = 254.0
print(f"The total is ${total}")
```