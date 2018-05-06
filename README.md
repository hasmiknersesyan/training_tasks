## GENERAL SETUP

1. You'll need to have jdk installed on your machine.
2. Check if java is installed by executing "java -version" in command line
3. You'll need Node.js 
4. Install Protractor globally:
   "npm install -g protractor"
5. In project directory, update third party modules:
   "npm install"
   "webdriver-manager update"
6. In project directory, install modules used in project:
   "npm install q-promise --save"


### TO RUN A SPECIFC TEST
> protractor config.js

### TO RUN A TASKS 
1. Uncomment then function calls
2. Run the following:
> node tasks.js
