// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const Lexer = require("./lexer.js");
const lexer = new Lexer();
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "start", "symbols": ["program"]},
    {"name": "program", "symbols": ["stmts"]},
    {"name": "program", "symbols": ["empty"]},
    {"name": "stmts", "symbols": ["stmts", "stmt"]},
    {"name": "stmts", "symbols": ["stmt"]},
    {"name": "stmt", "symbols": ["expr", (lexer.has("SEMICOLON") ? {type: "SEMICOLON"} : SEMICOLON)]},
    {"name": "stmt", "symbols": ["ifstmt"]},
    {"name": "stmt", "symbols": ["whilestmt"]},
    {"name": "stmt", "symbols": ["forstmt"]},
    {"name": "stmt", "symbols": ["returnstmt"]},
    {"name": "stmt", "symbols": [(lexer.has("BREAK") ? {type: "BREAK"} : BREAK), (lexer.has("SEMICOLON") ? {type: "SEMICOLON"} : SEMICOLON)]},
    {"name": "stmt", "symbols": [(lexer.has("CONTINUE") ? {type: "CONTINUE"} : CONTINUE), (lexer.has("SEMICOLON") ? {type: "SEMICOLON"} : SEMICOLON)]},
    {"name": "stmt", "symbols": ["block"]},
    {"name": "stmt", "symbols": ["funcdef"]},
    {"name": "stmt", "symbols": [(lexer.has("SEMICOLON") ? {type: "SEMICOLON"} : SEMICOLON)]},
    {"name": "expr", "symbols": ["lvalue", (lexer.has("ASSIGN") ? {type: "ASSIGN"} : ASSIGN), "expr"]},
    {"name": "expr", "symbols": ["expr", (lexer.has("PLUS") ? {type: "PLUS"} : PLUS), "expr"]},
    {"name": "expr", "symbols": ["expr", (lexer.has("MINUS") ? {type: "MINUS"} : MINUS), "expr"]},
    {"name": "expr", "symbols": ["expr", (lexer.has("MUL") ? {type: "MUL"} : MUL), "expr"]},
    {"name": "expr", "symbols": ["expr", (lexer.has("DIV") ? {type: "DIV"} : DIV), "expr"]},
    {"name": "expr", "symbols": ["expr", (lexer.has("MOD") ? {type: "MOD"} : MOD), "expr"]},
    {"name": "expr", "symbols": ["expr", (lexer.has("LESS") ? {type: "LESS"} : LESS), "expr"]},
    {"name": "expr", "symbols": ["expr", (lexer.has("LESSEQUAL") ? {type: "LESSEQUAL"} : LESSEQUAL), "expr"]},
    {"name": "expr", "symbols": ["expr", (lexer.has("GREATER") ? {type: "GREATER"} : GREATER), "expr"]},
    {"name": "expr", "symbols": ["expr", (lexer.has("GREATEREQUAL") ? {type: "GREATEREQUAL"} : GREATEREQUAL), "expr"]},
    {"name": "expr", "symbols": ["expr", (lexer.has("EQUAL") ? {type: "EQUAL"} : EQUAL), "expr"]},
    {"name": "expr", "symbols": ["expr", (lexer.has("NOTEQUAL") ? {type: "NOTEQUAL"} : NOTEQUAL), "expr"]},
    {"name": "expr", "symbols": ["expr", (lexer.has("AND") ? {type: "AND"} : AND), "expr"]},
    {"name": "expr", "symbols": ["expr", (lexer.has("OR") ? {type: "OR"} : OR), "expr"]},
    {"name": "expr", "symbols": ["term"]},
    {"name": "term", "symbols": [(lexer.has("OPENPAREN") ? {type: "OPENPAREN"} : OPENPAREN), "expr", (lexer.has("CLOSEPAREN") ? {type: "CLOSEPAREN"} : CLOSEPAREN)]},
    {"name": "term", "symbols": [(lexer.has("MINUS") ? {type: "MINUS"} : MINUS), "expr"]},
    {"name": "term", "symbols": [(lexer.has("NOT") ? {type: "NOT"} : NOT), "expr"]},
    {"name": "term", "symbols": [(lexer.has("PLUSPLUS") ? {type: "PLUSPLUS"} : PLUSPLUS), "expr"]},
    {"name": "term", "symbols": [(lexer.has("MINUSMINUS") ? {type: "MINUSMINUS"} : MINUSMINUS), "expr"]},
    {"name": "term", "symbols": ["expr", (lexer.has("PLUSPLUS") ? {type: "PLUSPLUS"} : PLUSPLUS)]},
    {"name": "term", "symbols": ["expr", (lexer.has("MINUSMINUS") ? {type: "MINUSMINUS"} : MINUSMINUS)]},
    {"name": "term", "symbols": ["primary"]},
    {"name": "primary", "symbols": ["lvalue"]},
    {"name": "primary", "symbols": ["call"]},
    {"name": "primary", "symbols": ["objectdef"]},
    {"name": "primary", "symbols": [(lexer.has("OPENPAREN") ? {type: "OPENPAREN"} : OPENPAREN), "funcdef", (lexer.has("CLOSEPAREN") ? {type: "CLOSEPAREN"} : CLOSEPAREN)]},
    {"name": "primary", "symbols": ["const"]},
    {"name": "lvalue", "symbols": [(lexer.has("IDENTIFIER") ? {type: "IDENTIFIER"} : IDENTIFIER)]},
    {"name": "lvalue", "symbols": [(lexer.has("LOCAL") ? {type: "LOCAL"} : LOCAL), (lexer.has("IDENTIFIER") ? {type: "IDENTIFIER"} : IDENTIFIER)]},
    {"name": "lvalue", "symbols": [(lexer.has("DOUBLECOLON") ? {type: "DOUBLECOLON"} : DOUBLECOLON), (lexer.has("IDENTIFIER") ? {type: "IDENTIFIER"} : IDENTIFIER)]},
    {"name": "lvalue", "symbols": ["member"]},
    {"name": "member", "symbols": ["lvalue", (lexer.has("DOT") ? {type: "DOT"} : DOT), (lexer.has("IDENTIFIER") ? {type: "IDENTIFIER"} : IDENTIFIER)]},
    {"name": "member", "symbols": ["lvalue", (lexer.has("OPENBRACKET") ? {type: "OPENBRACKET"} : OPENBRACKET), "expr", (lexer.has("CLOSEBRACKET") ? {type: "CLOSEBRACKET"} : CLOSEBRACKET)]},
    {"name": "member", "symbols": ["call", (lexer.has("DOT") ? {type: "DOT"} : DOT), (lexer.has("IDENTIFIER") ? {type: "IDENTIFIER"} : IDENTIFIER)]},
    {"name": "member", "symbols": ["call", (lexer.has("OPENBRACKET") ? {type: "OPENBRACKET"} : OPENBRACKET), "expr", (lexer.has("CLOSEBRACKET") ? {type: "CLOSEBRACKET"} : CLOSEBRACKET)]},
    {"name": "call", "symbols": ["call", (lexer.has("OPENPAREN") ? {type: "OPENPAREN"} : OPENPAREN), "elist", (lexer.has("CLOSEPAREN") ? {type: "CLOSEPAREN"} : CLOSEPAREN)]},
    {"name": "call", "symbols": ["lvalue", "callsuffix"]},
    {"name": "call", "symbols": [(lexer.has("OPENPAREN") ? {type: "OPENPAREN"} : OPENPAREN), "funcdef", (lexer.has("CLOSEPAREN") ? {type: "CLOSEPAREN"} : CLOSEPAREN), (lexer.has("OPENPAREN") ? {type: "OPENPAREN"} : OPENPAREN), "elist", (lexer.has("CLOSEPAREN") ? {type: "CLOSEPAREN"} : CLOSEPAREN)]},
    {"name": "callsuffix", "symbols": ["normalcall"]},
    {"name": "callsuffix", "symbols": ["methodcall"]},
    {"name": "normalcall", "symbols": [(lexer.has("OPENPAREN") ? {type: "OPENPAREN"} : OPENPAREN), "elist", (lexer.has("CLOSEPAREN") ? {type: "CLOSEPAREN"} : CLOSEPAREN)]},
    {"name": "methodcall", "symbols": [(lexer.has("DOTDOT") ? {type: "DOTDOT"} : DOTDOT), (lexer.has("IDENTIFIER") ? {type: "IDENTIFIER"} : IDENTIFIER), (lexer.has("OPENPAREN") ? {type: "OPENPAREN"} : OPENPAREN), "elist", (lexer.has("CLOSEPAREN") ? {type: "CLOSEPAREN"} : CLOSEPAREN)]},
    {"name": "elist", "symbols": ["empty"]},
    {"name": "elist", "symbols": ["commaExpr"]},
    {"name": "commaExpr", "symbols": ["commaExpr", (lexer.has("COMMA") ? {type: "COMMA"} : COMMA), "expr"]},
    {"name": "commaExpr", "symbols": ["expr"]},
    {"name": "objectdef", "symbols": [(lexer.has("OPENBRACKET") ? {type: "OPENBRACKET"} : OPENBRACKET), "indexed", (lexer.has("CLOSEBRACKET") ? {type: "CLOSEBRACKET"} : CLOSEBRACKET)]},
    {"name": "objectdef", "symbols": [(lexer.has("OPENBRACKET") ? {type: "OPENBRACKET"} : OPENBRACKET), "commaExpr", (lexer.has("CLOSEBRACKET") ? {type: "CLOSEBRACKET"} : CLOSEBRACKET)]},
    {"name": "indexed", "symbols": ["empty"]},
    {"name": "indexed", "symbols": ["commaIndexedElem"]},
    {"name": "commaIndexedElem", "symbols": ["commaIndexedElem", (lexer.has("COMMA") ? {type: "COMMA"} : COMMA), "indexedelem"]},
    {"name": "commaIndexedElem", "symbols": ["indexedelem"]},
    {"name": "indexedelem", "symbols": [(lexer.has("OPENCURLY") ? {type: "OPENCURLY"} : OPENCURLY), "expr", (lexer.has("COLON") ? {type: "COLON"} : COLON), "expr", (lexer.has("CLOSECURLY") ? {type: "CLOSECURLY"} : CLOSECURLY)]},
    {"name": "block", "symbols": [(lexer.has("OPENCURLY") ? {type: "OPENCURLY"} : OPENCURLY), "stmts", (lexer.has("CLOSECURLY") ? {type: "CLOSECURLY"} : CLOSECURLY)]},
    {"name": "block", "symbols": [(lexer.has("OPENCURLY") ? {type: "OPENCURLY"} : OPENCURLY), (lexer.has("CLOSECURLY") ? {type: "CLOSECURLY"} : CLOSECURLY)]},
    {"name": "funcdef", "symbols": [(lexer.has("FUNCTION") ? {type: "FUNCTION"} : FUNCTION), "optionalId", (lexer.has("OPENPAREN") ? {type: "OPENPAREN"} : OPENPAREN), "idlist", (lexer.has("CLOSEPAREN") ? {type: "CLOSEPAREN"} : CLOSEPAREN), "block"]},
    {"name": "optionalId", "symbols": ["empty"]},
    {"name": "optionalId", "symbols": [(lexer.has("IDENTIFIER") ? {type: "IDENTIFIER"} : IDENTIFIER)]},
    {"name": "const", "symbols": [(lexer.has("NUMBER") ? {type: "NUMBER"} : NUMBER)]},
    {"name": "const", "symbols": [(lexer.has("LITERAL") ? {type: "LITERAL"} : LITERAL)]},
    {"name": "const", "symbols": [(lexer.has("NIL") ? {type: "NIL"} : NIL)]},
    {"name": "const", "symbols": [(lexer.has("TRUE") ? {type: "TRUE"} : TRUE)]},
    {"name": "const", "symbols": [(lexer.has("FALSE") ? {type: "FALSE"} : FALSE)]},
    {"name": "idlist", "symbols": ["empty"]},
    {"name": "idlist", "symbols": ["commaIds"]},
    {"name": "commaIds", "symbols": ["commaIds", (lexer.has("COMMA") ? {type: "COMMA"} : COMMA), (lexer.has("IDENTIFIER") ? {type: "IDENTIFIER"} : IDENTIFIER)]},
    {"name": "commaIds", "symbols": [(lexer.has("IDENTIFIER") ? {type: "IDENTIFIER"} : IDENTIFIER)]},
    {"name": "ifstmt", "symbols": [(lexer.has("IF") ? {type: "IF"} : IF), (lexer.has("OPENPAREN") ? {type: "OPENPAREN"} : OPENPAREN), "expr", (lexer.has("CLOSEPAREN") ? {type: "CLOSEPAREN"} : CLOSEPAREN), "stmt"]},
    {"name": "ifstmt", "symbols": [(lexer.has("IF") ? {type: "IF"} : IF), (lexer.has("OPENPAREN") ? {type: "OPENPAREN"} : OPENPAREN), "expr", (lexer.has("CLOSEPAREN") ? {type: "CLOSEPAREN"} : CLOSEPAREN), "stmt", (lexer.has("ELSE") ? {type: "ELSE"} : ELSE), "stmt"]},
    {"name": "whilestmt", "symbols": [(lexer.has("WHILE") ? {type: "WHILE"} : WHILE), (lexer.has("OPENPAREN") ? {type: "OPENPAREN"} : OPENPAREN), "expr", (lexer.has("CLOSEPAREN") ? {type: "CLOSEPAREN"} : CLOSEPAREN), "stmt"]},
    {"name": "forstmt", "symbols": [(lexer.has("FOR") ? {type: "FOR"} : FOR), (lexer.has("OPENPAREN") ? {type: "OPENPAREN"} : OPENPAREN), "elist", (lexer.has("SEMICOLON") ? {type: "SEMICOLON"} : SEMICOLON), "expr", (lexer.has("SEMICOLON") ? {type: "SEMICOLON"} : SEMICOLON), "elist", (lexer.has("CLOSEPAREN") ? {type: "CLOSEPAREN"} : CLOSEPAREN), "stmt"]},
    {"name": "returnstmt", "symbols": [(lexer.has("RETURN") ? {type: "RETURN"} : RETURN), "optionalExpr", (lexer.has("SEMICOLON") ? {type: "SEMICOLON"} : SEMICOLON)]},
    {"name": "optionalExpr", "symbols": ["empty"]},
    {"name": "optionalExpr", "symbols": ["expr"]},
    {"name": "empty", "symbols": []}
]
  , ParserStart: "start"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
