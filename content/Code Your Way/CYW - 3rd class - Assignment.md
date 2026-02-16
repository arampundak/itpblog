This week on CodeAcademy

 switch-case statements = match-case statements
 A switch statement is a control flow statement that executes a block of code, among many others, based on the value of a variable or expression.
- `match` is a keyword that marks the start of the match block.
- `expression` can be a variable, an arithmetic expression, a Boolean expression, or a Python object like a list, tuple, or string.
- The code inside a case block is executed for a single value of expression. For example, only if `expression` evaluates to `value_1` will the code inside the `case value_1` block be executed. If `expression` evaluates to `value_2`, then only the code inside the `case value_2` block will be executed.
- Only one case block is executed in the entire match block for any given value of `expression`. Once a case block is executed, the program’s control flow moves out of the match block.
- The `default` block is always present at the end of the match block. If `expression` matches none of the values in other case blocks, the code inside `case default` is executed.
```
user_name = "Dave"    
match user_name:    
    case "Dave":    
        print("Get off my computer Dave!")    
    case "angela_catlady_87":    
        print("I know it is you, Dave! Go away!")     
    case "Codecademy":    
        print("Access Granted.")    
    case default:    
        print("Username not recognized.")
```

I wrote all by myself this code:
```
import random

  

user_name = "Aram"

question = "Are you a cookie?"

answer = " "

random_number = random.randint(1, 9)

# print(random_number)

if random_number == 1:

answer = "Yes - definitely"

elif random_number == 2:

answer = "It is decidedly so"

elif random_number == 3:

answer = "Without a doubt"

elif random_number == 4:

answer = "Reply hazy, try again"

elif random_number == 5:

answer = "Ask again later"

elif random_number == 6:

answer = "Better not tell you now"

elif random_number == 7:

answer = "My sources say no"

elif random_number == 8:

answer = "Outlook not so good"

elif random_number == 9:

answer = "Very doubtful"

else:

answer = "Error"

  

print (user_name + " asks: " + question)

print ("Magic 8 balls answer: " + answer)
```

