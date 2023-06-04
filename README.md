# alpha-language-support README
    Alpha Language Support was created to help write scripts using the alpha language.
    Alpha scripts must have the .al extention

## Features
    Alpha Language Support currently supports:
        -syntax highlighting
        -syntax analysis
        -compile and run

Syntax Analysis

    The syntax analyser is activated upon file save,
    the file is parsed and a pop-up message is displayed
    in case of syntax error, error messages can also be examined
    in the Output Alpha panel. The messages are not very accurate
    but they provide a line number to help with debugging.
![Syntax Error Example](images/syntax-error.png)


Compile and Run VM

    To compile and run an alpha script, 
    1) open the command palette with Ctrl+Shift+P
    2) search Alpha Compile and Run VM
![Compile Example](images/palette.png)

    This will compile the active alpha file
    and produce a .abc file with the same name
    as the active file. To view the output of the script
    go to View -> Output (or Ctrl+Shift+U) and select the Alpha panel
![Compile Example](images/panel.png)

    Error messages from the compiler and the vm will also display
    in this panel
![Compile Example](images/output.png)


Syntax Highlighting
![Syntax Highlighting](images/syntax-highlight.png)

## Recommendation
    It is recommended that you use JohnOuz-Light++ theme
    for the best experience when writing alpha scripts 