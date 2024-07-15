export const TOKENS = {
    LeftParen: 'LeftParen',
    RightParen: 'RightParen',
    LeftBrace: 'LeftBrace',
    RightBrace: 'RightBrace',
    LeftBracket: 'LeftBracket',
    RightBracket: 'RightBracket',
    Period: 'Period',
    Comma: 'Comma',
    Colon: 'Colon',
    Keyword: 'Keyword',
    Identifier: 'Identifier',
    String: 'String',
    Number: 'Number',
    Or: 'Or',
    Not: 'Not',
    And: 'And',
    Equiv: 'Equiv',
    NotEquiv: 'NotEquiv',
    Gt: 'Gt',
    Gte: 'Gte',
    Lt: 'Lt',
    Lte: 'Lte',
    Plus: 'Plus',
    Minus: 'Minus',
    Asterisk: 'Asterisk',
    Slash: 'Slash',
    EOF: 'EOF'
}

export class Token {
    constructor(type, value, content, line, column) {
        this.type = type  // Any value in TOKENS
        this.value = value
        this.content = content
        this.line = line
        this.column = column
    }

    toString() {
        return this.value
    }
}

class Lexer {
    constructor(program) {
        this.program = program
        // this.current refers to the next character not the current character
        this.current = 0
        this.tokens = []
        this.line = 1
        this.column = 0
    }


    error(msg) {
        throw new PHError(`Error at: ${this.line}:${this.column}: ${msg}`)
    }

    peek() {
        // this checks the next character and returns a null byte if it's outside the program
        if (this.current >= this.program.length) return '\0'
        // why is it just this.current? It's because this.current starts off as 1 (even though it says 0 in the constructor it's actually incremented in the scanToken function) 
        return this.program[this.current]
    }

    advance() {
        // this checks if the current character is outside of the program length
        if (this.current >= this.program.length) return '\0'
        // go to next character (each character is seperated by column)
        this.column++
        // go to and return next character
        return this.program[this.current++]
    }

    scanTokens() {
        // while the next character isn't the end of the line, attempt to scan the token
        while (this.peek() != '\0') this.scanToken()
        this.tokens.push(new Token(TOKENS.EOF, null, null, this.line, this.column))
        return this.tokens
    }
}