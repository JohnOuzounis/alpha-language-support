@{%
const Lexer = require("./lexer.js");
const lexer = new Lexer();
%}

@lexer lexer

start -> program empty

program -> stmts
        | empty

stmts -> stmts stmt
      | stmt

stmt -> expr %SEMICOLON
      | ifstmt
      | whilestmt
      | forstmt
      | returnstmt
      | %BREAK %SEMICOLON
      | %CONTINUE %SEMICOLON
      | block
      | funcdef
      | %SEMICOLON

expr -> lvalue %ASSIGN expr
      | expr %PLUS expr
      | expr %MINUS expr
      | expr %MUL expr
      | expr %DIV expr
      | expr %MOD expr
      | expr %LESS expr
      | expr %LESSEQUAL expr
      | expr %GREATER expr
      | expr %GREATEREQUAL expr
      | expr %EQUAL expr
      | expr %NOTEQUAL expr
      | expr %AND expr
      | expr %OR expr
      | term

term -> %OPENPAREN expr %CLOSEPAREN
      | %MINUS expr
      | %NOT expr
      | %PLUSPLUS expr
      | %MINUSMINUS expr
      | expr %PLUSPLUS
      | expr %MINUSMINUS
      | primary

primary -> lvalue
         | call
         | objectdef
         | %OPENPAREN funcdef %CLOSEPAREN
         | const

lvalue -> %IDENTIFIER
        | %LOCAL %IDENTIFIER
        | %DOUBLECOLON %IDENTIFIER
        | member

member -> lvalue %DOT %IDENTIFIER
        | lvalue %OPENBRACKET expr %CLOSEBRACKET
        | call %DOT %IDENTIFIER
        | call %OPENBRACKET expr %CLOSEBRACKET

call -> call %OPENPAREN elist %CLOSEPAREN
      | lvalue callsuffix
      | %OPENPAREN funcdef %CLOSEPAREN %OPENPAREN elist %CLOSEPAREN

callsuffix -> normalcall
            | methodcall

normalcall -> %OPENPAREN elist %CLOSEPAREN

methodcall -> %DOTDOT %IDENTIFIER %OPENPAREN elist %CLOSEPAREN

elist -> empty
       | commaExpr

commaExpr -> commaExpr %COMMA expr
           | expr

objectdef -> %OPENBRACKET indexed %CLOSEBRACKET
           | %OPENBRACKET commaExpr %CLOSEBRACKET

indexed -> empty
         | commaIndexedElem

commaIndexedElem -> commaIndexedElem %COMMA indexedelem
                  | indexedelem

indexedelem -> %OPENCURLY expr %COLON expr %CLOSECURLY

block -> %OPENCURLY stmts %CLOSECURLY
       | %OPENCURLY %CLOSECURLY

funcdef -> %FUNCTION optionalId %OPENPAREN idlist %CLOSEPAREN block

optionalId -> empty
            | %IDENTIFIER

const -> %NUMBER
       | %LITERAL
       | %NIL
       | %TRUE
       | %FALSE

idlist -> empty
        | commaIds

commaIds -> commaIds %COMMA %IDENTIFIER
          | %IDENTIFIER

ifstmt -> %IF %OPENPAREN expr %CLOSEPAREN stmt
        | %IF %OPENPAREN expr %CLOSEPAREN stmt %ELSE stmt

whilestmt -> %WHILE %OPENPAREN expr %CLOSEPAREN stmt

forstmt -> %FOR %OPENPAREN elist %SEMICOLON expr %SEMICOLON elist %CLOSEPAREN stmt

returnstmt -> %RETURN optionalExpr %SEMICOLON

optionalExpr -> empty
              | expr

empty -> null
