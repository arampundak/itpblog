---

---


---
Im keeping a small journal of my progression throughout the weeks, i write here simple thoughts and things to remember.
I created [[Hello World]] to summarize basic knowledge given by codeacademy.

CodeAcadmy: Let’s review what we’ve learned this lesson:
- Boolean expressions are statements that can be either `True` or `False`
- A boolean variable is a variable that is set to either `True` or `False`.
- We can create boolean expressions using relational operators:
    - `==`: Equals
    - `!=`: Not equals
    - `>`: Greater than
    - `>=`: Greater than or equal to
    - `<`: Less than
    - `<=`: Less than or equal to
- `if` statements can be used to create control flow in your code.
- `else` statements can be used to execute code when the conditions of an `if` statement are not met.
- `elif` statements can be used to build additional checks into your `if` statements

NYU Library training:
- Lists
- Dictionaries
- Loops - for / while
- Working with strings
- Functions

---

I went through:
- Boolean Expressions - a statement that can either be true or false (= bool)
- Relational Operators - `==` or `!=`
- Conditional Statements uses boolean
		`:`. That tells the computer that what’s coming next is what should be executed if the condition is met.

**if**
```
# Enter a user name here, make sure to make it a string()
user_name = "angela_catlady_87"

if user_name == "Dave":
	print("Get off my computer Dave!")
if user_name == "angela_catlady_87":
	print("I know its tou, Dave! Go away!")
```
`and` both conditionals needs to be true
`or` only one conditional needs to be true
`not`

```
credits = 120

gpa = 1.8

if not credits >= 120:
	print("You do not have enough credits to graduate.")
if not gpa >= 2.0:
	print("Your GPA is not high enough to graduate.")
if not (credits >= 120) and not (gpa >= 2.0):
	print("You do not meet either requirement to graduate!")
```

`else` + `if` = `elif`
First, the `if` statement is checked, then each `elif` statement is checked from top to bottom, then finally the `else` code is executed if none of the previous conditions have been met. 
Checks each condition sequentially and only prints one message.
```
grade = 86

if grade >= 90:
	print("A")
elif grade >= 80:
	print("B")
elif grade >= 70:
	print("C")
elif grade >= 60:
	print("D")
else:
	print("F")
```


---
#### Part 4: (FOR EVERYONE) Prepare for next week (plan ahead—this might take a few days!)

[](https://github.com/ellennickles/code-your-way-s26/tree/main/week2#part-4-for-everyone-prepare-for-next-week-plan-aheadthis-might-take-a-few-days)

Next week, we'll experiment with GitHub Copilot Pro, an AI-powered coding assistant, in Visual Studio Code.

While a free version of Copilot ([Copilot Free](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/about-github-copilot-free)) is available, it has limitations. However, as a student, you can access the Pro version for free.

1. If you don’t already have one, create a [GitHub account](https://github.com/).
2. Sign up for a free [GitHub Education account](https://github.com/education/students).
3. Once verified as a student, [request free GitHub Copilot Pro access](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/managing-your-github-copilot-pro-subscription/getting-free-access-to-copilot-pro-as-a-student-teacher-or-maintainer). (Approval might take several days.)
---
NYU's Library 3 hour session:
https://tutorials-1-spring.rcnyu.org/user/aap9316/tree/shared/QUAN_IntroPython?redirects=1
https://tutorials-1-spring.rcnyu.org/user/aap9316/notebooks/shared/QUAN_IntroPython/introduction_to_python.ipynb

**Lists**
like arrays, anything goes into a list, general structure to hold, a container. can be counted from the back with `[-1]` list them `[0:3]` step 2 at a time `[::2]` 
`.append` - add item to a list
`.pop` - remove element from a list
`+` in lists - concatenate them

Challenge 2
Write some code that picks a student from your list `my_students` at random
Hint: you can always round down a decimal number to an integer with the `int(x)` function:
int( 4.6 ) ## this equals 4

```
from random import *
import random
my_students
random_integer = random.randint(1, 5)
x = random_integer
#x = int(x)

my_index = x
print(my_students[my_index])
print("is chosen from:")
print(my_students)
```

or you can also do:
```
my_students[int(random()*8)]
or
my_students[int(random()*len(my_students))]
```

**Dictionaries**
Dictionaries can live inside a list and vice versa
```
student1 = {
    "name" : "Alice",
    "netid": "az123",
    "currently_enrolled": True,
    "credits_completed": 32,
    "school": "GSAS",
    "enrolled_in": ["Intro to Python", "Fundamental Algorithms"]
}

student2 = {
    "name" : "Xiaojing",
    "netid": "xa746",
    "currently_enrolled": True,
    "credits_completed": 16,
    "school": "Wagner",
    "enrolled_in": [
        "Intro to Python",
        "Natural Language Processing",
        "Urban Planning",
        "Shakespeare"]
}

student_profiles = [student1, student2]
student_profiles[0]["name"]
```
from `student_profiles[0]` we will get -> the whole dictionary of student1
from `student_profiles[0]["name"]` we will get -> alice

**For Loop**
```
## Print each element of a list
for i in my_students:
    print(i)
```

**Working with strings**
`.replace` 

**Functions**
Reuse a piece of code over time