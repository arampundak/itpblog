---

---


---
Im keeping a small journal of my progression throughout the weeks, i write here simple thoughts and things to remember.
I created [[Hello World]] to summarize basic knowledge given by codeacademy.

Let’s review what we’ve learned this lesson:

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
#### Part 3: Document

[](https://github.com/ellennickles/code-your-way-s26/tree/main/week2#part-3-document-1)

- Documenting your weekly progress and reflections will be valuable for tracking your growth. Use this outline to guide your documentation:
    - **What did you work on this week?** (topics, exercises, mini-projects, etc.)
    - **What clicked?** (concepts or techniques that made sense or felt useful)
    - **What was challenging?** (any points of confusion, how you approached them, and whether you found a solution or decided to revisit them later)
    - **What’s next?** (next steps and any lingering questions to explore)
- [Submit here](https://forms.gle/HaUJ7Mg74TJHxrJe8)
