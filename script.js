// Grammar
var inputGrammar =
`function -> ( parameter )
parameter -> id parameter' | epsilon
parameter' -> , id parameter' | epsilon
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
    //New tokens for SYNTACTICAL
    {
        name: "tk_ampersand",
        hardRegex: /^&$/,
        softRegex: /^&/,
        print: "onlyToken"
    }
]

//Additional Regexs
// This regexp matches to the comments after some piece of code and by itself
var commentRegex = /#(?=(?:(?:[^"]*"){2})*[^"]*$).*/;


// Useful Variables
var lexical_analysis;
var partial_lexical_analysis;
var currentToken;
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
  }

//Main function for syntactical analyzer
var token;
var primeros;
var siguientes;
var prediccion;
var prediccionDebug; //Beautiful console debug, not that beautiful but useful though.
var syntacticColumn;
var syntacticRow;
function syntacticalAnalyzer(){
    primeros = {}
    siguientes = {}
    prediccion = []
    prediccionDebug = [] //Beutiful console debug
    lexicalAnalyzer(null, true); //Load tokens
    generateGrammar();
    generatePrimeros();
    generateSiguientes();
    generatePrediccion();
    mainSyntactical();
}

function isTerminal(token){
    return !Object.keys(grammar).includes(token);
}

//-----PRIMEROS functions----

function generatePrimeros(){
    for(let noTerminal of Object.keys(grammar).reverse()){
        primeros[noTerminal] = []
        for(let rule of grammar[noTerminal])
            generatePrimerosOfNoTerminal(noTerminal, rule)
    }
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


//-----SIGUIENTES functions----

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


//-----PREDICCION functions----
function generatePrediccion(){
    for(let noTerminal of Object.keys(grammar)){
        for(let rule of grammar[noTerminal]){
            let set = {
                leftSide: noTerminal,
                rightSide: rule,
            }
            let debugSet = {...set}
            var primeros = getPrimeros(rule)
            var index = primeros.indexOf('epsilon');
            if(index == -1){ //No epsilon
                set['prediction'] = primeros
                debugSet['prediction'] = primeros.toString()
            }else{
                primeros.splice(index, 1)
                set['prediction'] = primeros.concat(siguientes[noTerminal])
                debugSet['prediction'] = primeros.concat(siguientes[noTerminal]).toString()
            }
            prediccion.push(set)
            prediccionDebug.push(debugSet)
        }

    }
    console.log("%c \n PREDICCION:", "color: orange")
    console.table( prediccionDebug)
}

//Bota tres mensajes de error
function genericAnalyze(noTerminal, lastRightSide, lastSeenPosition){
    var matched = false;
    var rules = prediccion.filter((item,index)=>item["leftSide"]==noTerminal) //Get all rules of that no terminal
    for(let rule of rules){
        if(rule.prediction.includes(token.name)){ //If that token exists in prediccion

            matched = true;
            let rightSideSplitted = rule.rightSide.split(/\s/g);
            rightSideSplitted = rightSideSplitted.filter((item,index)=>item!='') //removing empty elements
            for(let i=0; i<rightSideSplitted.length;i++){
                let alpha = rightSideSplitted[i]
                console.log("/////////////");
                console.log(i);
                console.log(alpha);
                console.log(token);
                console.log(rule);
                console.log(rule.rightSide);
                console.log("//");
                if(!isTerminal(alpha)){
                    let option = genericAnalyze(alpha, rightSideSplitted, i);
                    if(option == 'stop') return 'stop'; //If there is an error we need to stop the algorithm
                }else{
                    if(alpha == 'epsilon'){
                        return 'continue';
                    }
                    else if (token.name != alpha) {
                        printSyntacticalError(token, rightSideSplitted, i);
                        return 'stop';
                    }
                    token = getNextToken();
                    if(token != 'EOF') syntacticColumn += token.name.length;  // Updating the row of the analysis. Add 1 if couting whitespaces
                    if(token == 'EOF'){
                        if(i != rightSideSplitted.length - 1){
                            printSyntacticalError(token, rightSideSplitted, i);
                            return 'stop';

                        }
                        return 'continue';
                    }
                }
            }
        }
    }

    //Case no rule is matched
    if(!matched)
        printSyntacticalError(token, lastRightSide, lastSeenPosition);

}

function mainSyntactical(){
    token =  getNextToken() //First token
    syntacticColumn = 0; syntacticRow = 0;
    genericAnalyze(Object.keys(grammar)[0]) //Initial symbol
    if(token != 'EOF')
        printSyntacticalError(token);
    else console.log("%c El analisis sintactico ha finalizado exitosamente.", "color: green");
}

//Function to print a syntacticalError
function printSyntacticalError(token, lastRightSide, lastSeenPosition){
  if(!lastRightSide){
    lastRightSide = Object.keys(grammar)[0];
    lastSeenPosition = 0;
  }
  if(!token.name) var tokenFound = token;
  else var tokenFound = token.name.toString();
  console.error("<" + syntacticRow + "," + syntacticColumn + "> Error sintactico: se encontró \"" + tokenFound + "\"; se esperaba: " + addMissingFromExpectedFromRule(lastRightSide, lastSeenPosition));
}

//Function to add text to output accordingly to expected syntax
function addMissingFromExpectedFromRule(rightSideRule, expectedFromPosition){

  var expected = "";
  //Build from the part of the expected rule all the tokens that were missing
  for(let i = expectedFromPosition ; i < rightSideRule.length; i++){
    var currentAlpha = rightSideRule[i];
    //If is not terminal it must be added all the no terminals from primeros set
    if(!isTerminal(currentAlpha)){
      for (let x = 0; x < primeros[currentAlpha].length ; x++){
        expected += "\"";
        expected += primeros[currentAlpha][x];
        if (i == rightSideRule.length - 1 && x == primeros[currentAlpha].length - 1) expected += "\"";
        else expected += "\",";
      }
    } else {
      expected += "\"";
      expected += rightSideRule[i].toString();
      if (i == rightSideRule.length - 1) expected += "\"";
      else expected += "\",";
    }
    return expected;
  }
  //TODO: Fill this in with the tokens later
  // for(let i = expectedFromPosition ; i < rightSideRule.length; i++){
  //   expected += "\"";
  //   expected = rightSideRule[i].toString();
  //   if (i == rightSideRule.length - 1) expected += "\"";
  //   else expected += "\",";
  // }
}
//Function to get next token

function getNextToken(){
    if(wordsToAnalyse.length == 0)
        return 'EOF'
    // ----------- GET NEXT TOKEN FOR TEST

    var aux = wordsToAnalyse.shift()
    syntacticRow = aux.row;
    token = {name: aux.word.name}
    return token
    // ----------- REAL NEXT TOKEN
    //token = wordsToAnalyse.shift()
    //findToken(token.word, token.row)
    //$('#result').append(partial_lexical_analysis.replace(/&/g, '&amp;')
                                        //.replace(/>/g, '&gt;')
                                        //.replace(/</g, '&lt;')
                                        //.replace(/\n/g,'<br/>'))
    //return(currentToken)
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
        console.error("Error lexico")
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
    currentToken = {name: token.name, lexema: word, row: row, column: column}
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
