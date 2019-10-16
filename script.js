// Grammar
var inputGrammar =
`FUNCTION -> abs par_der PARAMETER par_izq
PARAMETER -> identifier comma PARAMETER | identifier`


//List of all tokens
var tokenList = [
    {
        name: "reserved",
        hardRegex: /^(global|body|create|receive|destroy|external|getarg|get|global|import|int|mod|new|procedure|process|final|char|reply|next|proc|read|real|send|char|string|bool|resource|returns|scanf|sem|sprintf|stop|writes|write|cap|ref|end|res|val|var|ni|co|to|af|op|or|fa|fi|if)$/,
        softRegex: /^(global|body|create|receive|destroy|external|getarg|get|global|import|int|mod|new|procedure|process|final|char|reply|next|proc|read|real|send|char|string|bool|resource|returns|scanf|sem|sprintf|stop|writes|write|cap|ref|end|res|val|var|ni|co|to|af|op|or|fa|fi|if)/,
        print: "onlyWord"
    }
    ,
    {
        name: "id",
        hardRegex: /^[a-zA-Z]+[a-zA-Z0-9]*$/,
        softRegex: /^[a-zA-Z]+[a-zA-Z0-9]*/,
        print: "wordAndToken"
    },
    {
        name: "tk_cadena",
        hardRegex: /^".*"$/,
        softRegex: /^".*"/,
        print: "wordAndToken"
    },
    {
        name: "tk_asig",
        hardRegex: /^:=$/,
        softRegex: /^:=/,
        print: "onlyToken"
    },
    {
        name: "tk_coma",
        hardRegex: /^,$/,
        softRegex: /^,/,
        print: "onlyToken"
    },
    {
        name: "tk_cor_der",
        hardRegex: /^\]$/,
        softRegex: /^\]/,
        print: "onlyToken"
    },
    {
        name: "tk_cor_izq",
        hardRegex: /^\[$/,
        softRegex: /^\[/,
        print: "onlyToken"
    },
    {
        name: "tk_corche_izq",
        hardRegex: /^{$/,
        softRegex: /^{/,
        print: "onlyToken"
    },
    {
        name: "tk_corche_der",
        hardRegex: /^}$/,
        softRegex: /^}/,
        print: "onlyToken"
    },
    {
        name: "tk_distinto",
        hardRegex: /^!=$/,
        softRegex: /^!=/,
        print: "onlyToken"
    },
    {
        name: "tk_dos_puntos",
        hardRegex: /^:$/,
        softRegex: /^:/,
        print: "onlyToken"
    },
    {
        name: "tk_ejecuta",
        hardRegex: /^->$/,
        softRegex: /^->/,
        print: "onlyToken"
    },
    {
        name: "tk_igual",
        hardRegex: /^=$/,
        softRegex: /^=/,
        print: "onlyToken"
    },
    {
        name: "tk_menorque",
        hardRegex: /^<$/,
        softRegex: /^</,
        print: "onlyToken"
    },
    {
        name: "tk_mayorque",
        hardRegex: /^>$/,
        softRegex: /^>/,
        print: "onlyToken"
    },
    {
        name: "tk_expr_sinc",
        hardRegex: /^\?$/,
        softRegex: /^\?/,
        print: "onlyToken"
    },
    {
        name: "tk_multi",
        hardRegex: /^\*$/,
        softRegex: /^\*/,
        print: "onlyToken"
    },
    {
        name: "tk_par_izq",
        hardRegex: /^\($/,
        softRegex: /^\(/,
        print: "onlyToken"
    },
    {
        name: "tk_par_der",
        hardRegex: /^\)$/,
        softRegex: /^\)/,
        print: "onlyToken"
    },

    {
        name: "tk_punto_y_coma",
        hardRegex: /^;$/,
        softRegex: /^;/,
        print: "onlyToken"
    },
    {
        name: "tk_num",
        hardRegex: /(^(-)?[0-9]*\.[0-9]+[0-9]*$)|(^(-)?[0-9]+[0-9]*$)/,
        softRegex: /(^(-)?[0-9]*\.[0-9]+[0-9]*)|(^(-)?[0-9]+[0-9]*)/,
        print: "wordAndToken"
    },
    {
        name: "tk_menos",
        hardRegex: /^-$/,
        softRegex: /^-/,
        print: "onlyToken"
    },
    {
        name: "tk_separa",
        hardRegex: /^\[\]/,
        softRegex: /^\[\]/,
        print: "onlyToken"
    },
    {
        name: "tk_suma",
        hardRegex: /^\+$/,
        softRegex: /^\+/,
        print: "onlyToken"
    },
    {
        name: "mod",
        hardRegex: /^mod$/,
        softRegex: /^mod/,
        print: "onlyToken"
    },
    {
        name: "tk_div",
        hardRegex: /^\/$/,
        softRegex: /^\//,
        print: "onlyToken"
    },
    {
        name: "tk_punto",
        hardRegex: /^\.$/,
        softRegex: /^\./,
        print: "onlyToken"
    },
    {
        name: "tk_swap",
        hardRegex: /^:=:$/,
        softRegex: /^:=:/,
        print: "onlyToken"
    },
    {
        name: "tk_tres_puntos",
        hardRegex: /^\.\.\.$/,
        softRegex: /^\.\.\.]/,
        print: "onlyToken"
    },
    {
        name: "tk_tres_puntos",
        hardRegex: /^\.\.\.$/,
        softRegex: /^\.\.\./,
        print: "onlyToken"
    },
    {
        name: "tk_porcentaje",
        hardRegex: /^%$/,
        softRegex: /^%/,
        print: "onlyToken"
    },
]

//Additional Regexs
var commentRegex = /#(?=(?:(?:[^"]*"){2})*[^"]*$).*/;


// Useful Variables
var lexical_analysis;
var partial_lexical_analysis;
var wordsToAnalyse = []

//  -------------------------------------------------------------------------- SYNTACTICAL ANALYZER --------------------------------------------------------------------------

//Function to compute the first of the each of the grammar
function computeSetFirst(){


}

//Function that generates the grammar based on the variable
var grammar = {};
function generateGrammar(){
    var lines = inputGrammar.match(/[^\r\n]+/g);
    var derivations;
    for(let line of lines){
      derivations = [];
      var matched = line.split(/->/g);
      var leftSideRule = matched[0];
      var rightSideRule = matched[1];
      var derivationsRightSideRule = rightSideRule.split(/\|/g);
      for(let derivation of derivationsRightSideRule){
        derivations.push(derivation.replace(/\s/, ''));
  
      }
      grammar[leftSideRule.replace(/\s/, '')] = derivations;
      console.log(leftSideRule + " /// "  + rightSideRule);
      console.log(derivationsRightSideRule);
      console.log(grammar);   
    }
    $('#result').html("<i>Grammar generated</i>")
  }

//Main function for syntactical analyzer
function syntacticalAnalyzer(){
    generateGrammar()
    generatePrimeros()
}

var primeros = {}
function generatePrimeros(){ 
    for(let key of Object.keys(grammar))
        for(let rule of grammar[key])
            getPrimeros(key, rule)
}

function getPrimeros(leftSide, rightSide){
    if(rightSide == 'epsilon')
        primeros[leftSide] = 'epsilon' 
    var splitted = rightSide.trim().split(/\s/g);
    for(let a of splitted){
        if(Object.keys(grammar).includes(a)){
            console.log("%c Is no terminal", "color: blue", a)
        }
    }
    console.log(splitted)
}

//Function to get next token
function getNextToken(){
    if(wordsToAnalyse.length==0)
        lexicalAnalyzer(null, true)
    token = wordsToAnalyse.shift()
    findToken(token.word, token.row)
    console.log(partial_lexical_analysis)
    $('#result').append(partial_lexical_analysis.replace(/&/g, '&amp;')
                                        .replace(/>/g, '&gt;')
                                        .replace(/</g, '&lt;')
                                        .replace(/\n/g,'<br/>'))
}


//  -------------------------------------------------------------------------- LEXICAL ANALYZER --------------------------------------------------------------------------

//Function that splits the code by breaklines and spaces to obtain the WORD
function lexicalAnalyzer(input, only_load) {
    lexical_analysis = "";
    var code;
    if (!input)
        code = document.getElementById("codeTextArea").value;
    else
        code = input;
    var lines = code.split(/\n/);
    for(var i = 0; i < lines.length; i++){
        var line = lines[i].replace(commentRegex, '');
        var words = splitWithIndex(line)
        for(let word of words){
            if(word.name != ""){
                if(!only_load){ //Sometimes we only need to load all the words but no do the analysis
                    findToken(word, i+1)
                    if(partial_lexical_analysis.match(/Error lexico/)){
                        i = Number.MAX_SAFE_INTEGER //Force break of two loops
                        break;
                    }
                }
                wordsToAnalyse.push({word:word, row: i+1})
            }
        }
    }
    if(!only_load){
        console.log(lexical_analysis)
        $('#result').html(lexical_analysis.replace(/&/g, '&amp;')
                                        .replace(/>/g, '&gt;')
                                        .replace(/</g, '&lt;')
                                        .replace(/\n/g,'<br/>'))
        return lexical_analysis;
    }
}


//Function that finds the token that matches that WORD, but only when it is an absolute match
function findToken(word, row){
    var matched = false;
    for(let token of tokenList){
        if(word.name.match(token.hardRegex)){
            matched = true;
            print(token, word.name, word.column, row)
            break;
        }
    }
    if(!matched){
        deepFindToken(word.name, row, word.column)
    }
}


//Function that finds the token that matches one word, but only when it is within another one
function deepFindToken(word, row, column) {
    var matched = false;
    var min_index_token = Number.MAX_SAFE_INTEGER;
    var token_to_match;
    for (let token of tokenList) {
        if (word.match(token.softRegex)) {
            matched = true;
            // Get index of the matched regexep
            matched_word = token.softRegex.exec(word)
            if (matched_word.index < min_index_token) {
                min_index_token = matched_word.index;
                token_to_match = token;
            }else if(matched_word.index == min_index_token){ //Solve problem with global1(
                if(token_to_match.softRegex.exec(word)[0] != matched_word[0])
                    token_to_match = token;
            }
        }
    }
    if (matched) {
        var matched_regexp = token_to_match.softRegex.exec(word)[0];
        print(token_to_match, matched_regexp, column, row)
        if (!(word === matched_regexp) && (matched_regexp.length != 0)) {
            var cropped_word = word.replace(matched_regexp, '');
            column += matched_regexp.length
            deepFindToken(cropped_word.trim(), row, column);
        }
    } else {
        partial_lexical_analysis = ">>> Error lexico(linea:" + row + ",posicion:" + column + ")\n"
        lexical_analysis += partial_lexical_analysis
    }
}


//Function that splits by spaces and saves the column of the word
function splitWithIndex(line){
    var splits = line.split(/\s(?=(?:(?:[^"]*"){2})*[^"]*$)/g);
    var words=[]
    var index=0
    for(let split of splits){
        if(split!='')
            words.push({ column: index+1, name: split})
        index += split.length + 1
    }

    return words
}


//Function that prints the token
function print(token, word, column, row){
    if (token.print == "onlyWord")
        partial_lexical_analysis = "<" + word + "," + row + "," + column + ">\n";
    else if (token.print == "onlyToken")
        partial_lexical_analysis =  "<" + token.name + "," + row + "," + column + ">\n";
    else if (token.print == "wordAndToken")
        partial_lexical_analysis = "<" + token.name + "," + word + "," + row + "," + column + ">\n";

    lexical_analysis += partial_lexical_analysis
}


//Function that clears the input
function clearAll(){
    console.log("Clearing")
    wordsToAnalyse = []
    $('#result').html('')
}