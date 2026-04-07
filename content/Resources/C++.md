### About strings for code
In C++, a String is wrapped in quote marks `"like this"`. So if you want to put quote marks **inside** a string, the compiler gets confused:
```cpp
"{" on": true}"  // compiler thinks the string ends at the 2nd "
```
The backslash is an **escape character** — it tells the compiler "this quote mark is part of the string, not the end of it":
```cpp
"{\"on\": true}"  // compiler understands the whole thing is one string
```
It's like saying "this quote mark is literal, don't interpret it."