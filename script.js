// Grammar
var inputGrammar =
// `GLOBAL -> global id GLOBAL_BODY end
// GLOBAL_BODY ->  CONSTANT_DECLARATION | ε
// CONSTANT_DECLARATION -> const id tk_igual tk_num

//
// `
`SR_PROGRAM ->  RESOURCE_BODY


RESOURCES_BODY -> RESOURCE_BODY RESOURCES_BODY |   epsilon

RESOURCE_BODY -> resource id RESOURCE_BODY'
RESOURCE_BODY' -> INTERFACE_PART INTERFACES_PART end | tk_par_izq tk_par_der INTERFACE_PART INTERFACES_PART end
INTERFACES_PART -> INTERFACE_PART INTERFACES_PART | epsilon
INTERFACE_PART -> CONSTANT_DECLARATION | IMPORT_SPECIFICATION |  OPERATION_DECLARATION  | TYPE_DECLARATION | EXTEND_DECLARATION | VARIABLE_DECLARATION | STATEMENTS





CONSTANT_DECLARATION -> const id tk_asig ARITHMETHIC_EXPRESSION ARITHMETHIC_EXPRESSIONS
IMPORT_SPECIFICATION -> import IDS_GROUP
OPERATION_DECLARATION ->  op id PARAMETER OPERATION_END
TYPE_DECLARATION -> type id tk_igual rec par_izq TYPE_SPECIFICATION par_der
EXTEND_DECLARATION -> extend IDS_GROUP



PARAMETER -> par_izq PARAMETER_SPECIFICATION par_der
PARAMETER_SPECIFICATION -> PARAMETER_ID tk_dos_puntos VAR_TYPE | PARAMETER_ID tk_dos_puntos VAR_TYPE tk_punto_coma PARAMETER_SPECIFICATION  |  epsilon
PARAMETER_ID -> id | ARRAY  | res ARRAY
OPERATION_END -> cor_izq OPERATION_TYPE cor_der | returns id tk_dos_puntos VAR_TYPE |  epsilon
TYPE_SPECIFICATION -> id tk_dos_puntos id VAR_TYPE  |  id tk_dos_puntos id VAR_TYPE  tk_punto_coma TYPE_SPECIFICATION


EXPRESSION -> EXPRESSION | BOOLEAN_EXPRESSION | ARITHMETHIC_EXPRESSION | epsilon









EXPRESSION_VARIABLE ->  epsilon | tk_asignación ARITHMETHIC_EXPRESSION

STATEMENTS -> STATEMENT STATEMENTS
STATEMENT -> SEQUENTIAL_STATEMENT | epsilon
SEQUENTIAL_STATEMENT -> skip
SEQUENTIAL_STATEMENT -> VARIABLE_DECLARATION | IDS_GROUP tk_asignacion ARITHMETHIC_EXPRESSION
SEQUENTIAL_STATEMENT -> VARIABLE_INSTANCE tk_suma tk_suma | VARIABLE tk_menos tk_menos
SEQUENTIAL_STATEMENT -> if BOOLEAN_EXPRESSION tk_ejecuta BLOCK tk_separa fi
SEQUENTIAL_STATEMENT -> do BOOLEAN_EXPRESSION tk_ejecuta tk_separa od
SEQUENTIAL_STATEMENT -> fs QUANTIFIER tk_ejecuta BLOCK af


ARITHMETHIC_EXPRESSION ->  tk_par_izq TERM ARITHMETHIC_EXPRESSIONS tk_par_der | TERM ARITHMETHIC_EXPRESSIONS
ARITHMETHIC_EXPRESSIONS ->  OP_BINARIO ARITHMETHIC_EXPRESSION | epsilon

TERM -> VARIABLE_INSTANCE | tk_num
OP_BINARIO -> tk_suma | tk_div | tk_menos | tk_multi


VARIABLES -> VARIABLES tk_coma | VARIABLE_DECLARATION |  epsilon




VARIABLE_INSTANCE -> id VARIABLE_INSTANCE'
VARIABLE_INSTANCE' -> tk_punto id | epsilon

VARIABLE_DECLARATION -> var IDS_GROUP
VARIABLE -> id

VAR_TYPE -> int | cap | double | char
IDS_GROUP -> id IDS_GROUP'
IDS_GROUP' -> tk_coma IDS_GROUP' | epsilon


`
//OP_BINARIO -> > | < | >= | <= | eq | == | ne | != | && | || |         % | **


//List of all tokens
var tokenList = [
    {
        name: "reserved",
        hardRegex: /^(global|body|const|create|receive|destroy|external|extend|getarg|get|global|import|int|mod|new|procedure|process|final|char|reply|next|proc|read|real|send|char|string|bool|resource|returns|scanf|sem|sprintf|stop|writes|write|cap|ref|end|res|val|var|ni|co|to|af|op|or|fa|fi|if)$/,
        softRegex: /^(global|body|const|create|receive|destroy|external|extend|getarg|get|global|import|int|mod|new|procedure|process|final|char|reply|next|proc|read|real|send|char|string|bool|resource|returns|scanf|sem|sprintf|stop|writes|write|cap|ref|end|res|val|var|ni|co|to|af|op|or|fa|fi|if)/,
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
        print: "onlyToken",
        lexeme: ":="
    },
    {
        name: "tk_coma",
        hardRegex: /^,$/,
        softRegex: /^,/,
        print: "onlyToken",
        lexeme: ","
    },
    {
        name: "tk_cor_der",
        hardRegex: /^\]$/,
        softRegex: /^\]/,
        print: "onlyToken",
        lexeme: "]"
    },
    {
        name: "tk_cor_izq",
        hardRegex: /^\[$/,
        softRegex: /^\[/,
        print: "onlyToken",
        lexeme: "["
    },
    {
        name: "tk_corche_izq",
        hardRegex: /^{$/,
        softRegex: /^{/,
        print: "onlyToken",
        lexeme: "{"
    },
    {
        name: "tk_corche_der",
        hardRegex: /^}$/,
        softRegex: /^}/,
        print: "onlyToken",
        lexeme: "}"
    },
    {
        name: "tk_distinto",
        hardRegex: /^!=$/,
        softRegex: /^!=/,
        print: "onlyToken",
        lexeme: "!="
    },
    {
        name: "tk_dos_puntos",
        hardRegex: /^:$/,
        softRegex: /^:/,
        print: "onlyToken",
        lexeme: ":"
    },
    {
        name: "tk_ejecuta",
        hardRegex: /^->$/,
        softRegex: /^->/,
        print: "onlyToken",
        lexeme: "->"
    },
    {
        name: "tk_igual",
        hardRegex: /^=$/,
        softRegex: /^=/,
        print: "onlyToken",
        lexeme: "="
    },
    {
        name: "tk_menorque",
        hardRegex: /^<$/,
        softRegex: /^</,
        print: "onlyToken",
        lexeme: "<"
    },
    {
        name: "tk_mayorque",
        hardRegex: /^>$/,
        softRegex: /^>/,
        print: "onlyToken",
        lexeme: ">"
    },
    {
        name: "tk_expr_sinc",
        hardRegex: /^\?$/,
        softRegex: /^\?/,
        print: "onlyToken",
        lexeme: "?"
    },
    {
        name: "tk_multi",
        hardRegex: /^\*$/,
        softRegex: /^\*/,
        print: "onlyToken",
        lexeme: "*"
    },
    {
        name: "tk_par_izq",
        hardRegex: /^\($/,
        softRegex: /^\(/,
        print: "onlyToken",
        lexeme: "("
    },
    {
        name: "tk_par_der",
        hardRegex: /^\)$/,
        softRegex: /^\)/,
        print: "onlyToken",
        lexeme: ")"
    },

    {
        name: "tk_punto_y_coma",
        hardRegex: /^;$/,
        softRegex: /^;/,
        print: "onlyToken",
        lexeme: ";"
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
        print: "onlyToken",
        lexeme: "-"
    },
    {
        name: "tk_separa",
        hardRegex: /^\[\]/,
        softRegex: /^\[\]/,
        print: "onlyToken",
        lexeme: "[]"
    },
    {
        name: "tk_suma",
        hardRegex: /^\+$/,
        softRegex: /^\+/,
        print: "onlyToken",
        lexeme: "+"
    },
    {
        name: "mod",
        hardRegex: /^mod$/,
        softRegex: /^mod/,
        print: "onlyToken",
        lexeme: "mod"
    },
    {
        name: "tk_div",
        hardRegex: /^\/$/,
        softRegex: /^\//,
        print: "onlyToken",
        lexeme: "/"
    },
    {
        name: "tk_punto",
        hardRegex: /^\.$/,
        softRegex: /^\./,
        print: "onlyToken",
        lexeme: "."
    },
    {
        name: "tk_swap",
        hardRegex: /^:=:$/,
        softRegex: /^:=:/,
        print: "onlyToken",
        lexeme: ":=:"
    },
    {
        name: "tk_tres_puntos",
        hardRegex: /^\.\.\.$/,
        softRegex: /^\.\.\.]/,
        print: "onlyToken",
        lexeme: "..."
    },
    {
        name: "tk_tres_puntos",
        hardRegex: /^\.\.\.$/,
        softRegex: /^\.\.\./,
        print: "onlyToken",
        lexeme: "..."
    },
    {
        name: "tk_porcentaje",
        hardRegex: /^%$/,
        softRegex: /^%/,
        print: "onlyToken",
        lexeme: "%"
    },
    //New tokens for SYNTACTICAL
    {
        name: "tk_ampersand",
        hardRegex: /^&$/,
        softRegex: /^&/,
        print: "onlyToken",
        lexeme: "&"
    }
]

//Additional Regexs
// This regexp matches to the comments after some piece of code and by itself
var commentRegex = /#(?=(?:(?:[^"]*"){2})*[^"]*$).*/;


// Useful Variables
var lexical_analysis;
var partial_lexical_analysis;
var currentTokenPosition = 0;
var wordsToAnalyse = []
var testWTA = []
var EOFlastSeenRightSide;
var EOFlastSeenLeftSide;
var EOFlastPosition;

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
      var rule = leftSideRule.replace(/\s/, '');
      //If the rule already exists, adds the derivations, otherwise it creates it
      if(!grammar[rule]) grammar[rule] = derivations;
      else for(let derivation of derivations) grammar[rule].push(derivation);
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
var error_printed;
function syntacticalAnalyzer(){
    primeros = {}
    siguientes = {}
    prediccion = []
    prediccionDebug = [] //Beutiful console debug
    error_printed = false;
    lexicalAnalyzer(); //Load tokens
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
    var lastLeftSide = noTerminal;
    for(let j=0; j<rules.length;j++){
        let rule = rules[j]
        if(rule.prediction.includes(token.name)){ //If that token exists in prediccion
            matched = true;
            let rightSideSplitted = rule.rightSide.split(/\s/g);
            rightSideSplitted = rightSideSplitted.filter((item,index)=>item!='') //removing empty elements
            for(let i=0; i<rightSideSplitted.length;i++){
              EOFlastSeenRightSide = rightSideSplitted;
              EOFlastSeenLeftSide = lastLeftSide;
              EOFlastPosition = i;
                let alpha = rightSideSplitted[i]
                if(!isTerminal(alpha)){
                    let option = genericAnalyze(alpha, lastLeftSide, rightSideSplitted, i);
                    if(option == 'stop') return 'stop'; //If there is an error we need to stop the algorithm
                }else{
                    if(alpha == 'epsilon'){
                        return 'continue';
                    }
                    else if (token.name != alpha) {
                        alternativePintSyntacticalError(alpha)
                        printSyntacticalError(token, lastLeftSide, rightSideSplitted, i);
                        return 'stop';
                    }
                    token = getNextToken(wordsToAnalyse);
                    if(token != 'EOF') syntacticColumn = token.column;  // Updating the row of the analysis. Add 1 if couting whitespaces
                    if(token == 'EOF'){
                        if(i != rightSideSplitted.length - 1){
                            if(isTerminal(rightSideSplitted[i+1]))
                                alternativePintSyntacticalError(rightSideSplitted[i+1])
                            else
                                alternativePintSyntacticalError(rules[j+1].prediction)
                            printSyntacticalError(token, lastLeftSide, rightSideSplitted, i);
                            //The last seen position here when an EOF is encountered is exactly the next one.
                            EOFlastPosition +=  1;
                            return 'stop';
                        }
                        return 'continue';
                    }
                }
            }
        }
    }

    //Case no rule is matched
    if(!matched){
      var required = []
      for(let rule of rules){
            let rightSideSplitted = rule.rightSide.split(/\s/g);
            rightSideSplitted = rightSideSplitted.filter((item,index)=>item!='') //removing empty elements
          required.push(rightSideSplitted[0])
      }
      alternativePintSyntacticalError(required)
      printSyntacticalError(token, lastLeftSide, lastRightSide, lastSeenPosition);
      EOFlastSeenRightSide = lastRightSide;
      EOFlastSeenLeftSide = lastLeftSide;
      EOFlastPosition = lastSeenPosition;
      return 'stop';
    }
}

function mainSyntactical(){
    wordsToAnalyse = []
    wordsToAnalyse = testWTA;
    token =  getNextToken(wordsToAnalyse) //First token
    syntacticColumn = 0; syntacticRow = 0;
    var result = genericAnalyze(Object.keys(grammar)[0]) //Initial symbol
    if(token != 'EOF' || result == 'stop')
        printSyntacticalError(token, EOFlastSeenLeftSide, EOFlastSeenRightSide, EOFlastPosition);
    else console.log("%c El analisis sintactico ha finalizado exitosamente.", "color: green");
}

////// PUEDE INTENTAR ARREGLAR LA FUNCIÓN ALTERNATIVA, QUE FUNCIONA CON SOLO UNA LINEA Y NO USA EOFlastSeenLeftSide, NI NIGUNO DE ESOS, QUE PARA MANTENIBILIDAD DEL CODIGO ES MEJOR
///// O PUEDE INTENTAR ARREGLAR LAS DOS FUNCIONES QUE USTED HIZO PARA IMPRIMIR EL ERROR, FUNCIONES QUE PUEDE QUE NO ESTÉN MAL PERO NO ES LO QUE NOS ESTÁN PIDIENDO, ESAS FUNCIONES ESTÁN CALCULANDO
// TODA LA SECUENCIA DE TOKENS ESPERADOS, PRIMERO "(", LUEGO "ID", LUEGO ")", Y SOLO NOS PIDEN LOS TOKENS ESPERADOS INMEDIATAMENTE "("
// PERO LA VERDAD YA ME LA HUEVO, USTED VERÁ

//An alternative Function to print  syntactical error
/*
    Falta ponerle que se imprima correctamente, con lexema, fila y columna

    1)Falla en el caso cuando se espera más de un token:

    por ejemplo "( id "
    Debe salir: se esperaba ")", ","
    está saliendo: se esperaba ")"

    por ejemplo "(id id)"
    Debe salir: se esperaba ",", ")"
    está saliendo se esperaba ")"
*/
function alternativePintSyntacticalError(tokenEsperado){
    console.error('Se esperaba', tokenEsperado)
}


//Function to print a syntacticalError
/*
    Imprime varias veces el error, toca poner una flag pero no sé si es lo indicado

    1) Falla en el caso cuando se espera más de un token:

    por ejemplo "( id "
    Debe salir: se esperaba ")", ","
    está saliendo: se esperaba "id", ","

    por ejemplo "(id id)"
    Debe salir: se esperaba ",", ")"
    está saliendo se esperaba ""

    2) Falla en el caso cuando el input está vacio:

    por ejemplo ""
    Debe salir: se esperaba "(" -> ya que es la única manera en la que puede empezar la gramatica
    está saliendo: se esperaba "(", "id", ")" -> efectivamente se espera la cadena un "(", luego un id, y luego un ")"
        Sin embargo el taller no nos pide imprimir todos los tokens que se esperen inmediatamente, en este caso solo se espera "(""

    3) Falla en el caso cuando se espera SOLO  un token:

    por ejemplo "( id ,"
    Debe salir: se esperaba "id"
    está saliendo: se esperaba ",", "id", ","
*/
function printSyntacticalError(token, lastLeftSide, lastRightSide, lastSeenPosition){
  if(!lastRightSide){
    lastRightSide = grammar[Object.keys(grammar)[0]];
    lastSeenPosition = 0;
  }
  if(!lastLeftSide){
    lastLeftSide = Object.keys(grammar)[0];
  }
  if(!token.name) var tokenFound = "fin de archivo";
  else var tokenFound = token.lexeme.toString();
  if(!error_printed)
      error_printed = true
      console.error("<" + syntacticRow + "," + syntacticColumn + "> Error sintactico: se encontró \"" + tokenFound + "\"; se esperaba: " + addMissingFromExpectedFromRule(lastLeftSide, lastRightSide, lastSeenPosition));

}

//Function to add text to output accordingly to expected syntax
function addMissingFromExpectedFromRule(leftSideRule, rightSideRule, expectedFromPosition){
  console.log(leftSideRule, rightSideRule, expectedFromPosition)
  var expected = "";

  //Build from the part of the expected rule all the tokens that were missing
  for(let i = expectedFromPosition ; i < rightSideRule.length; i++){
    var currentAlpha = rightSideRule[i];
    var derivationsOfAlpha = currentAlpha.split(/\s/g);
    if(derivationsOfAlpha.length > 1)
      expected += addMissingFromExpectedFromRule(leftSideRule, derivationsOfAlpha, 0);
    //If is not terminal it must be added all the no terminals from primeros set
    else {
      if(!isTerminal(currentAlpha)){
        for (let x = 0; x < primeros[currentAlpha].length ; x++){
          var currentPrimero = primeros[currentAlpha][x];
          // Check better what to do with epsilons
          if(currentPrimero == 'epsilon') continue;
          //expected += "\"";
          var derivationsOfPrimero = currentPrimero.split(/\s/g);
          if(derivationsOfPrimero.length > 1){
            for(let j = 0; j < derivationsOfPrimero.length; j ++ ){
              expected += "\"";
              expected += getTokenNameAndLexemeByWord(derivationsOfPrimero[j])["lexeme"];
              if (!j == derivationsOfPrimero.length - 1) expected += "\",";
            }
          } else {
            expected += "\"";
            expected += getTokenNameAndLexemeByWord(currentPrimero)["lexeme"];
          }

          if (i == rightSideRule.length - 1 && x == primeros[currentAlpha].length - 1) expected += "\"";
          else expected += "\",";
        }
      } else {
        expected += "\"";
        expected += getTokenNameAndLexemeByWord(rightSideRule[i].toString())["lexeme"];
        if (i == rightSideRule.length - 1) expected += "\"";
        else expected += "\",";
      }
    }
  }
  return expected;
}



//Function to get next token

function getNextToken(wordsToAnalyse){
  //If position is not passed to the function, it takes the next token
    if(wordsToAnalyse.length == currentTokenPosition)
        return 'EOF'
    var nextToken;
    nextToken = wordsToAnalyse[currentTokenPosition];
    currentTokenPosition += 1;
    syntacticRow = nextToken.row;
    return nextToken;
}


//  -------------------------------------------------------------------------- LEXICAL ANALYZER --------------------------------------------------------------------------

//Function that splits the code by breaklines and spaces to obtain the WORD
function lexicalAnalyzer() {
    lexical_analysis = "";
    var code;
    code = document.getElementById("codeTextArea").value;
    var lines = code.split(/\n/);
    for(var i = 0; i < lines.length; i++){
        var line = lines[i].replace(commentRegex, '');
        var words = splitWithIndex(line)
        for(let word of words){
            if(word.name != ""){
                findToken(word, i+1)
                if(partial_lexical_analysis.match(/Error lexico/)){
                    i = Number.MAX_SAFE_INTEGER //Force break of two loops
                    break;
                }
                wordsToAnalyse.push({word:word, row: i+1})
            }
        }
    }
    console.log(lexical_analysis)
    $('#result').html(lexical_analysis.replace(/&/g, '&amp;')
                                    .replace(/>/g, '&gt;')
                                    .replace(/</g, '&lt;')
                                    .replace(/\n/g,'<br/>'))

    return lexical_analysis;
}

// Function to populate dictionary to input to the function getNextToken
// This function gets the lexeme of a token and transform the lexical_analysis into an usable dictionary


function getTokenNameAndLexemeByWord(word){
  var currentName; var currentLexeme;
  for(let token of tokenList){
    if(word.match(token.hardRegex) && token['name'] == 'reserved'){
      currentName = word;
      currentLexeme = word;
    } else if(token['name'] == word){
      currentName = token.name;
      if(!token.lexeme) currentLexeme = word;
      else currentLexeme = token.lexeme;
    }
  }
  if(!currentLexeme){
    currentLexeme = word;
    currentName = word;
  }
  return {name: currentName, lexeme: currentLexeme};

}

//Function that finds the token that matches that WORD, but only when it is an absolute match
function findToken(word, row){
    var matched = false;
    for(let token of tokenList){
        if(word.name.match(token.hardRegex)){
            matched = true;
            print(token, word.name, word.column, row);
            return token
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
    var currentToken = {name: token.name, lexeme: word, row: row, column: column}

    if (token.print == "onlyWord"){
        partial_lexical_analysis = "<" + word + "," + row + "," + column + ">\n";
        currentToken.name = word
    }
    else if (token.print == "onlyToken")
        partial_lexical_analysis =  "<" + token.name + "," + row + "," + column + ">\n";
    else if (token.print == "wordAndToken")
        partial_lexical_analysis = "<" + token.name + "," + word + "," + row + "," + column + ">\n";



    testWTA.push(currentToken)
    lexical_analysis += partial_lexical_analysis
}


//Function that clears the input
function clearAll(){
    console.log("Clearing")
    wordsToAnalyse = []
    $('#result').html('')
}
