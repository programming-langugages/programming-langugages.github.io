// Grammar
var inputGrammar =
`A -> B C | ant A all
B -> big C | bus A boss | epsilon
C -> cat | cow
D -> spliff | wutend | shark C E | epsilon
E -> brayan | es toxico C
`


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
// This regexp matches to the comments after some piece of code and by itself
var commentRegex = /#(?=(?:(?:[^"]*"){2})*[^"]*$).*/;


// Useful Variables
var lexical_analysis;
var partial_lexical_analysis;
var wordsToAnalyse = []

//  -------------------------------------------------------------------------- SYNTACTICAL ANALYZER --------------------------------------------------------------------------


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
    }
    console.log("%c GRAMMAR", 'color: blue', grammar);
    $('#result').html("<i>Grammar generated</i>")
  }

//Main function for syntactical analyzer
function syntacticalAnalyzer(){
    generateGrammar();
    generatePrimeros();
    generateSiguientes();
}

function isTerminal(token){
    return !Object.keys(grammar).includes(token);
}

//PRIMEROS functions
var primeros = {};
var siguientes = {};
function generatePrimeros(){
    for(let key of Object.keys(grammar).reverse()){
        primeros[key] = []
        for(let rule of grammar[key])
            generatePrimerosOfNoTerminal(key, rule)
    }
    for(let noTerminal of Object.keys(primeros))
      primeros[noTerminal] = primeros[noTerminal].filter((item, index) => primeros[noTerminal].indexOf('epsilon') != index)
    console.log("%c PRIMEROS", "color: green", primeros)
}

function generatePrimerosOfNoTerminal(leftSide, rightSide){
    var tokens = rightSide.split(/\s/g);
    for(let token of tokens){
        if(!isTerminal(token)){ //If it is NO terminal
            if(primeros[token].includes('epsilon')){ //If only has epsilon
                if(primeros[token].length == 1){
                    primeros[leftSide].push('epsilon')
                    return;
                }
                var aux = [...primeros[token]] //Doing a copy of the array
                var epsilon_index = primeros[token].indexOf('epsilon');
                aux.splice(epsilon_index, 1) //Removing epsilon of the copy
                primeros[leftSide] = primeros[leftSide].concat(aux)
            }else{
                primeros[leftSide] = primeros[leftSide].concat(primeros[token])
                return;
            }
        }else if(token != ''){ //If it is terminal and not empty
            primeros[leftSide].push(token)
            return;
        }
    }
    primeros[leftSide].push('epsilon') //If all derivations have epsilon
}

//Function that will be used in prediction
function getPrimeros(rule){
    var tokens = rule.split(/\s/g);
    var response = []
    for(let token of tokens){
        if(!isTerminal(token)){ //If it is NO terminal
            if(primeros[token].includes('epsilon')){
                if(primeros[token].length == 1){ //If only has epsilon
                    return ['epsilon']
                }
                var aux = [...primeros[token]] //Doing a copy of the array
                var epsilon_index = primeros[token].indexOf('epsilon');
                aux.splice(epsilon_index, 1) //Removing epsilon of the copy
                response = response.concat(aux)
            }else{
                if(response.length > 0)
                    return response.concat(primeros[token])
                return primeros[token]
            }
        }else if(token != ''){ //If it is terminal and not empty
            return [token]
        }
    }
    return response.concat('epsilon') //If all derivations have epsilon
}




//Function to generate set of siguientes of all the rules
function generateSiguientes(){
  for(let key of Object.keys(grammar)){
        // console.log("KEY " + key.toString());
        siguientes[key] = []
        if(Object.keys(grammar)[0] == key) siguientes[key].push('$') //If it is the first rule, add the symbol $

        generateSiguientesEachRule(key);
  }
  console.log("%c SIGUIENTES", "color: red", siguientes)
}
//Function to compute siguientes based on a rule on which it will be generated
function generateSiguientesEachRule(ruleToGenerate){

    for(let key of Object.keys(grammar)){
        for(let rule of grammar[key]){
            generateSiguientesOfNoTerminal(key, rule, ruleToGenerate)
          }
    }

}


function generateSiguientesOfNoTerminal(leftSide, rightSide, ruleToGenerate){
    var tokens = rightSide.split(/\s/g);
    // console.log("Right side: " + rightSide.toString() + " ruleToGenerate " + ruleToGenerate.toString());
    if(!isTerminal(leftSide)){
      for(let token of tokens){
        if(token == ruleToGenerate){
          var indexNextToken = tokens.indexOf(token) + 1;
          // console.log(tokens[indexNextToken]);
          if(tokens[indexNextToken]){

            if(!isTerminal(tokens[indexNextToken])){
              var aux = [...primeros[tokens[indexNextToken]]]
              if(aux.includes('epsilon')){
                var epsilon_index = primeros[tokens[indexNextToken]].indexOf('epsilon');
                aux.splice(epsilon_index, 1) //Removing epsilon of the copy
              }
              siguientes[ruleToGenerate] = siguientes[ruleToGenerate].concat(aux);
              // console.log(primeros[tokens[indexNextToken]]);
              if(primeros[tokens[indexNextToken]].includes('epsilon')){
                  // console.log("1 Adding this to " + ruleToGenerate.toString());
                  // console.log(siguientes[leftSide]);
                  siguientes[ruleToGenerate] = siguientes[ruleToGenerate].concat(siguientes[leftSide]);
              }
            } else {
              // console.log("2 Adding this " + tokens[indexNextToken].toString() + " to " + ruleToGenerate.toString());
              if(tokens[indexNextToken] != 'epsilon') siguientes[ruleToGenerate].push(tokens[indexNextToken]);
            }
          } else {
            // console.log("3 Adding siguientes of left Side:  "  + leftSide + " to " + ruleToGenerate.toString() );
            // console.log(siguientes[leftSide]);
            if(siguientes[leftSide]) siguientes[ruleToGenerate] = siguientes[ruleToGenerate].concat(siguientes[leftSide])
          }
        }
      }
    }


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
