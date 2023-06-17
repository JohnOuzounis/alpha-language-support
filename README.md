# alpha-language-support
    Alpha Language Support was created to help write scripts using the alpha language.
    Alpha scripts must have the .al extention

## Features
    Alpha Language Support currently supports:
        -syntax highlighting
        -syntax analysis
        -compile and run

## Syntax Analysis

    The syntax analyser is activated upon file save and
    the file is parsed. Error messages can be examined
    in the Output Alpha panel (see View Parse Output on how to open the Output panel).
    The messages are not very accurate but they provide a line number to help with debugging.
![Syntax Error Example](images/syntax-error.png)
    
    The parser can also be activated using the Parse Grammar command.
    To use the command, 
    1) open the command palette with Ctrl+Shift+P
    2) search Alpha Parse Grammar
![Compile Example](images/palette2.png)

    The parsing results will be displayed in the Output panel

## Compile and Run VM

    To compile and run an alpha script, 
    1) open the command palette with Ctrl+Shift+P
    2) search Alpha Compile and Run VM
![Compile Example](images/palette.png)

    This will compile the active alpha file
    and produce a .abc file with the same name
    as the active file. 
    Error messages from the compiler will be displayed
    in the Output panel (see View Parse Output on how to open the Output panel).

    The vm runs on a terminal (tested on powershell) and the output is displayed there.
![Compile Example](images/output.png)

    You can also run an alpha script using F5, to do that
    1) open .vscode folder (create one if it doen't exist)
    2) create a launch.json
    3) in the inputs field add the command: extension.compileAndRunVM
    4) in the configurations add a launch request

    Your launch.json should look like this.
![Compile Example](images/launchjson.png)

    You can suppress runtime warnings by adding a -Wno argument.
![Compile Example](images/launchjson2.png)


## View Parse Output

    To view the output of the parser
    go to View -> Output (or Ctrl+Shift+U) and select the Alpha panel
![Compile Example](images/panel.png)

