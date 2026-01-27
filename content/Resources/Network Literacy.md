#python #software 

Terminal - the interface
Command Line - the way to speak and write
The command line is the baby little brother of programming languages.


| pwd      | print working directory           |
| -------- | --------------------------------- |
| hostname | my computer's network name        |
| mkdir    | make directory                    |
| cd       | change directory                  |
| cd ..    | go back directory                 |
| cd ~     | go home                           |
| ls       | list directory                    |
| rmdir    | remove directory                  |
| pushd    | push directory                    |
| popd     | pop directory                     |
| cp       | copy a file or directory          |
| mv       | move a file or directory          |
| less     | page through a file               |
| cat      | print the whole file              |
| xargs    | execute arguments                 |
| find     | find files                        |
| grep     | grep                              |
| apropos  | find what man page is appropriate |
| env      | look at your environment          |
| echo     | print some arguments              |
| export   | export/set a new environment      |
| exit     | exit the shell                    |

The first command `pwd` tells you where you are. The second command `cd ~` takes you home so you can try again.
`mkdir` (make new folder) space name of new folder add '/' name of new folder
```
pwd
cd ~
mkdir temp
mkdir temp/stuff
mkdir temp/stuff/things
mkdir temp/stuff/things/orange
mkdir temp/stuff/things/orange/cat
mkdir temp/stuff/things/orange/cat/dog
```
create folders and then folders within folders

```
pwd
cd ~
cd temp
$ /Users/arampundik/temp
cd stuff
pwd
$ /Users/arampundik/temp/stuff
cd things
pwd
$ /Users/arampundik/temp/stuff/things
cd orange
pwd
/Users/arampundik/temp/stuff/things/orange
cd cat
pwd
/Users/arampundik/temp/stuff/things/orange/cat
```
navigate through folders and `pwd` to know location
```
pwd
cd ~
cd temp
pwd
$ /Users/arampundik/temp
ls
$ stuff
cd stuff
pwd
$ /Users/arampundik/temp/stuff
ls
$ things
cd things
pwd
$ /Users/arampundik/temp/stuff/things
ls
$ orange
cd orange
pwd
/Users/arampundik/temp/stuff/things/orange
ls
$ cat
cd cat
pwd
$ /Users/arampundik/temp/stuff/things/orange/cat
ls
$ dog
cd dog
pwd
$ /Users/arampundik/temp/stuff/things/orange/cat/dog
ls
$ house
cd house
pwd
$ /Users/arampundik/temp/stuff/things/orange/cat/dog/house
cd ..
pwd
$ /Users/arampundik/temp/stuff/things/orange/cat/dog
cd ..
pwd
$ /Users/arampundik/temp/stuff/things/orange/cat
cd ..
pwd
$ /Users/arampundik/temp/stuff/things/orange
cd ..
pwd
$ /Users/arampundik/temp/stuff/things
cd ..
pwd
$ /Users/arampundik/temp/stuff
cd ..
pwd
/Users/arampundik/temp
```
from temp `ls` all the way in to house
`cd ..` all the way out back to temp

