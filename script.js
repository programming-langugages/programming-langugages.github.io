// Grammar
var inputGrammar =
// `GLOBAL -> global id GLOBAL_BODY end
// GLOBAL_BODY ->  CONSTANT_DECLARATION | ε
// CONSTANT_DECLARATION -> const id tk_igual tk_num

//
// `
`SR_PROGRAM ->  RESOURCE_BODY RESOURCES_BODY | RESOURCES_BODY RESOURCE_BODY


RESOURCES_BODY -> RESOURCE_BODY RESOURCES_BODY | epsilon

RESOURCE_BODY -> resource id RESOURCE_BODY' end
RESOURCE_BODY' ->  BLOCK  | tk_par_izq tk_par_der BLOCK


BLOCK -> INTERFACE_PART INTERFACES_PART | CONDITIONAL_STATEMENT



INTERFACES_PART -> INTERFACE_PART INTERFACES_PART | epsilon

INTERFACE_PART ->  CONSTANT_DECLARATION | IMPORT_SPECIFICATION | CONDITIONAL_STATEMENT | GLOBAL_SPECIFICATION
INTERFACE_PART -> EXTEND_DECLARATION | OPERATION_DECLARATION  | TYPE_DECLARATION | PROCEDURE_SPECIFICATION | RESOURCE_SPECIFICATION
INTERFACE_PART ->  VARIABLE_DECLARATION |  SEQUENTIAL_STATEMENT | PRIMITIVE_FUNCTION | BODY_DECLARATION | FINAL_DECLARATION | INITIAL_DECLARATION



BODY_DECLARATION -> body id BODY_DECLARATION'
BODY_DECLARATION' -> epsilon
BODY_DECLARATION' -> tk_par_izq tk_par_der BLOCK end

BODY_BODY -> VARIABLE_DECLARATION | CONSTANT_DECLARATION



GLOBAL_SPECIFICATION -> global id GLOBAL_BODY GLOBAL_BODIES end
GLOBAL_BODIES -> CONSTANT_DECLARATION GLOBAL_BODIES | TYPE_DECLARATION GLOBAL_BODIES | epsilon |
GLOBAL_BODY -> CONSTANT_DECLARATION  | TYPE_DECLARATION
RESOURCE_SPECIFICATION -> spec id OPTIONAL_IMPORT RESOURCE_SPECIFICATION_BODY resource id tk_par_izq PARAMETER_CALL_FUNCTION tk_par_der SEPARATE_OPTIONAL
RESOURCE_SPECIFICATION_BODY -> CONSTANT_DECLARATION | OPERATION_DECLARATION | TYPE_DECLARATION | epsilon
OPTIONAL_IMPORT -> IMPORT_SPECIFICATION | epsilon
OPTIONAL_SEPARATE -> separate | epsilon

CONSTANT_DECLARATION -> const id tk_asig ARITHMETHIC_EXPRESSION ARITHMETHIC_EXPRESSIONS
IMPORT_SPECIFICATION -> import IDS_GROUP
OPERATION_DECLARATION ->  op id tk_par_izq PARAMETER_CALL_FUNCTION tk_par_der OPERATION_END
TYPE_DECLARATION -> type id tk_igual rec tk_par_izq TYPE_SPECIFICATION tk_par_der
EXTEND_DECLARATION -> extend IDS_GROUP
CONDITIONAL_STATEMENT -> if BOOLEAN_EXPRESSION tk_ejecuta BLOCK END_IF
CONDITIONAL_STATEMENT -> do BOOLEAN_EXPRESSION tk_ejecuta BLOCK END_DO
CONDITIONAL_STATEMENT -> fs QUANTIFIER tk_ejecuta BLOCK END_FS
CONDITIONAL_STATEMENT -> fa CYCLE tk_ejecuta BLOCK END_FA
PROCEDURE_SPECIFICATION -> PROCEDURE_RESERVED_WORD id PROCEDURE_SPECIFICATION' RETURNS BLOCK end
PROCEDURE_SPECIFICATION' -> IDS_GROUP_0 | tk_par_izq IDS_GROUP_0 tk_par_der
FINAL_DECLARATION -> final BLOCK end
INITIAL_DECLARATION -> inital BLOCK end
CYCLE -> VARIABLE_INSTANCE2 tk_asig TERM to TERM


RETURNS -> returns id | epsilon
PROCEDURE_RESERVED_WORD -> proc | process

OPERATION_END -> cor_izq OPERATION_TYPE cor_der | returns id tk_dos_puntos VAR_TYPE |  epsilon

TYPE_SPECIFICATION -> id tk_dos_puntos id VAR_TYPE TYPE_SPECIFICATION'
TYPE_SPECIFICATION' ->  tk_punto_y_coma TYPE_SPECIFICATION' | epsilon

END_IF -> tk_separa fi | fi
END_DO -> tk_separa od | od
END_FA -> tk_separa af | af
END_FS -> tk_separa fs | fs




PARAMETER -> par_izq PARAMETER_SPECIFICATION par_der
PARAMETER_SPECIFICATION -> PARAMETER_ID tk_dos_puntos VAR_TYPE | PARAMETER_ID tk_dos_puntos VAR_TYPE tk_punto_y_coma PARAMETER_SPECIFICATION  |  epsilon
PARAMETER_ID -> id | ARRAY  | res ARRAY



EXPRESSION -> EXPRESSION | BOOLEAN_EXPRESSION | ARITHMETHIC_EXPRESSION | epsilon



FNP_PARAMETER_TYPE_1 -> PRIMITIVE_FUNCTION FNP_PARAMETER_TYPE_1' | tk_cadena FNP_PARAMETER_TYPE_1' | id FNP_PARAMETER_TYPE_1''   # String or function or functions with identifiers n.x and parameters and parameters x.x
FNP_PARAMETER_TYPE_1'' -> tk_punto id FNP_PARAMETER_TYPE_1''' | CALL_FUNCTION_IN_FUNCTION FNP_PARAMETER_TYPE_1' | tk_coma FNP_PARAMETER_TYPE_1 | epsilon
FNP_PARAMETER_TYPE_1''' -> CALL_FUNCTION_IN_FUNCTION FNP_PARAMETER_TYPE_1' | FNP_PARAMETER_TYPE_1'
FNP_PARAMETER_TYPE_1' -> epsilon  | tk_coma FNP_PARAMETER_TYPE_1


PRIMITIVE_FUNCTION -> FUNCTION_ONE_PARAMETER | FUNCTION_TWO_PARAMETER | FUNCTION_N_PARAMETERS
FUNCTION_ONE_PARAMETER -> F1P_RESERVED_WORD_TYPE1 tk_par_izq F1P_PARAMETER tk_par_der SEMICOLON_OR_NOT
FUNCTION_ONE_PARAMETER -> F1P_RESERVED_WORD_TYPE2 tk_par_izq VAR_TYPE tk_par_der SEMICOLON_OR_NOT
FUNCTION_ONE_PARAMETER -> F1P_RESERVED_WORD_TYPE3 tk_par_izq id tk_par_der SEMICOLON_OR_NOT
FUNCTION_TWO_PARAMETER -> F2P_RESERVED_WORD tk_par_izq id F2P_PARAMETER tk_par_der SEMICOLON_OR_NOT
FUNCTION_N_PARAMETERS -> FNP_RESERVED_WORD_TYPE_1 tk_par_izq FNP_PARAMETER_TYPE_1 tk_par_der SEMICOLON_OR_NOT
FUNCTION_N_PARAMETERS -> FNP_RESERVED_WORD_TYPE_2 tk_par_izq FNP_PARAMETER_TYPE_2 tk_par_der SEMICOLON_OR_NOT
F1P_RESERVED_WORD_TYPE1 -> abs | pred | succ # Id / numbers
F1P_RESERVED_WORD_TYPE2 -> low | high | new # types
F1P_RESERVED_WORD_TYPE3 -> length | maxlength # ids
F1P_PARAMETER -> VARIABLE_INSTANCE | tk_num
F2P_RESERVED_WORD -> ub | lb
FNP_RESERVED_WORD_TYPE_1 -> write
FNP_RESERVED_WORD_TYPE_2 -> put
F2P_PARAMETER -> tk_coma tk_num | epsilon



FNP_PARAMETER_TYPE_2 -> STRINGS | PARAMETER_CALL_FUNCTION

STRINGS -> tk_cadena STRING
STRING -> tk_coma STRINGS | epsilon


EXPRESSION_VARIABLE ->  epsilon | tk_asignación ARITHMETHIC_EXPRESSION

STATEMENTS -> STATEMENT STATEMENTS
STATEMENT -> SEQUENTIAL_STATEMENT
SEQUENTIAL_STATEMENT -> skip | exit | next
SEQUENTIAL_STATEMENT -> VARIABLE_DECLARATION
SEQUENTIAL_STATEMENT -> VARIABLE_INSTANCE









BOOLEAN_EXPRESSION -> tk_par_izq TERM OP_BINARIO_BOOLEAN TERM BOOLEAN_EXPRESSION'
BOOLEAN_EXPRESSION -> TERM OP_BINARIO_BOOLEAN TERM BOOLEAN_EXPRESSION''
BOOLEAN_EXPRESSION' -> OP_BINARIO_BOOLEAN TERM tk_par_der | tk_par_der
BOOLEAN_EXPRESSION'' -> OP_BINARIO_BOOLEAN TERM | epsilon

VARIABLE_INSTANCE -> id VARIABLE_INSTANCE'
VARIABLE_INSTANCE' -> tk_punto id | tk_menos_menos | tk_suma_suma | epsilon
VARIABLE_INSTANCE' -> tk_coma IDS_GROUP | OP_BINARIO VARIABLE_INSTANCE'' |  ARRAY_DECLARATIONS tk_asig VARIABLE_INSTANCE''
VARIABLE_INSTANCE' -> tk_asig VARIABLE_INSTANCE'' | tk_swap VARIABLE_INSTANCE'' |  CALL_FUNCTION
VARIABLE_INSTANCE'' -> ARITHMETHIC_EXPRESSION ARITHMETHIC_EXPRESSIONS SEMICOLON_OR_NOT | CALL_FUNCTION | create id CALL_FUNCTION


VARIABLE_DECLARATION -> var id VARIABLE_DECLARATION'
VARIABLE_DECLARATION' -> tk_dos_puntos VARIABLE_DECLARATION''' | IDS_GROUP' VARIABLE_DECLARATION'' | tk_cor_izq TERM tk_cor_der ARRAY_DECLARATION tk_dos_puntos VAR_TYPE | tk_asig ARITHMETHIC_EXPRESSION ARITHMETHIC_EXPRESSIONS SEMICOLON_OR_NOT #VARIABLE_DECLARATION''''

VARIABLE_DECLARATION'''' -> ARRAY_DECLARATION tk_dos_puntos VAR_TYPE | tk_dos_puntos VAR_TYPE ARRAY_DECLARATION

VARIABLE_DECLARATION''' -> VAR_TYPE IDS_TYPE_GROUP' | PARAMETER_CALL_FUNCTION
VARIABLE_DECLARATION'' -> tk_dos_puntos VAR_TYPE
VARIABLE_DECLARATION'' -> epsilon






ARITHMETHIC_EXPRESSION ->  tk_par_izq TERM ARITHMETHIC_EXPRESSIONS tk_par_der SEMICOLON_OR_NOT
ARITHMETHIC_EXPRESSION -> TERM_ARITHMETHIC_EXPRESSION ARITHMETHIC_EXPRESSIONS
ARITHMETHIC_EXPRESSIONS ->  OP_BINARIO ARITHMETHIC_EXPRESSION | epsilon


TERM_ARITHMETHIC_EXPRESSION -> id TERM_ARITHMETHIC_EXPRESSION' | tk_num
TERM_ARITHMETHIC_EXPRESSION' -> tk_cor_izq TERM tk_cor_der | PARAMETER_CALL_FUNCTION_NO_ID


TERM -> PARAMETER_CALL_FUNCTION | tk_num



ARRAY_DECLARATIONS -> ARRAY_BASIC ARRAY_DECLARATION
ARRAY_DECLARATION -> tk_coma ARRAY_DECLARATIONS' | epsilon


ARRAY_BASIC -> tk_cor_izq TERM tk_cor_der


ARRAY_DECLARATIONS' -> ARRAY_BASIC' ARRAY_DECLARATION'
ARRAY_DECLARATION' -> tk_coma ARRAY_DECLARATIONS' | epsilon
ARRAY_BASIC' -> id tk_cor_izq TERM tk_cor_der | epsilon

VARIABLE_INSTANCE2 -> id VARIABLE_INSTANCE2'
VARIABLE_INSTANCE2' -> tk_punto id VARIABLE_INSTANCE2 | epsilon

OP_BINARIO -> tk_suma | tk_div | tk_menos | tk_multi | tk_suma_asig | tk_menos_asig
OP_BINARIO_BOOLEAN -> tk_distinto | tk_menorque | tk_mayorque  | tk_igual | tk_menorque tk_igual | tk_mayorque tk_igual

CALL_FUNCTION ->  tk_par_izq ARITHMETHIC_EXPRESSION ARITHMETHIC_EXPRESSIONS tk_par_der SEMICOLON_OR_NOT # Aqui puede ser PARAMETER_CALL_FUNCTION
CALL_FUNCTION_IN_FUNCTION -> tk_par_izq PARAMETER_CALL_FUNCTION tk_par_der

PARAMETER_CALL_FUNCTION_NO_ID -> PARAMETER_CALL_FUNCTION' | epsilon


PARAMETER_CALL_FUNCTION'' -> PARAMETER_CALL_FUNCTION' | tk_punto id PARAMETER_CALL_FUNCTION' | epsilon
PARAMETER_CALL_FUNCTION -> id PARAMETER_CALL_FUNCTION'' | epsilon # param param.param
PARAMETER_CALL_FUNCTION' -> tk_coma PARAMETER_CALL_FUNCTION | epsilon



SEMICOLON_OR_NOT -> tk_punto_y_coma | epsilon
VAR_TYPE -> int | cap | double | char | real

IDS_TYPE_GROUP -> id tk_dos_puntos VAR_TYPE IDS_TYPE_GROUP'
IDS_TYPE_GROUP' -> tk_coma IDS_TYPE_GROUP | epsilon

IDS_GROUP -> id IDS_GROUP'
IDS_GROUP' -> tk_coma IDS_GROUP | epsilon

IDS_GROUP_0 -> id IDS_GROUP_0' | epsilon
IDS_GROUP_0' -> tk_coma IDS_GROUP_0 | epsilon



`
//OP_BINARIO -> > | < | >= | <= | eq | == | ne | != | && | || |         % | **


//List of all tokens
var tokenList = [
    {
        name: "reserved",
        hardRegex: /^(global|double|body|const|create|do|od|fs|af|maxlength|length|receive|rec|destroy|external|extend|getarg|get|global|import|mod|new|real|procedure|process|final|reply|next|proc|read|real|send|char|string|bool|resource|returns|scanf|sem|sprintf|int|stop|high|writes|write|pred|cap|low|ref|end|abs|res|val|var|ni|co|to|af|op|or|fa|fi|if|lb|ub|put|type)$/,
        softRegex: /^(global|double|body|const|create|do|od|fs|af|maxlength|length|receive|rec|destroy|external|extend|getarg|get|global|import|mod|new|real|procedure|process|final|reply|next|proc|read|real|send|char|string|bool|resource|returns|scanf|sem|sprintf|int|stop|high|writes|write|pred|cap|low|ref|end|abs|res|val|var|ni|co|to|af|op|or|fa|fi|if|lb|ub|put|type)/,
        print: "onlyWord"
    }
    ,
    {
      name: "id",
      hardRegex: /^(_)?[a-zA-Z]+[a-zA-Z0-9_]*$/,
      softRegex: /^(_)?[a-zA-Z]+[a-zA-Z0-9_]*/,
      print: "wordAndToken"
    },
    {
        name: "tk_cadena",
        hardRegex: /^"([^\\"]|\\")*"$/,
        softRegex: /^"([^\\"]|\\")*"/,
        print: "wordAndToken"
    },
    {
        name: "tk_suma_asig",
        hardRegex: /^\+:=$/,
        softRegex: /^\+:=/,
        print: "onlyToken",
        lexeme: "+"
    },
    {
        name: "tk_menos_asig",
        hardRegex: /^\-:=$/,
        softRegex: /^\-:=/,
        print: "onlyToken",
        lexeme: "+"
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
        hardRegex: /^--$/,
        softRegex: /^--/,
        print: "onlyToken",
        lexeme: "-"
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
        name: "tk_suma_suma",
        hardRegex: /^\++$/,
        softRegex: /^\++/,
        print: "onlyToken",
        lexeme: "+"
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
var matchedTheFirstTime;
//  -------------------------------------------------------------------------- SYNTACTICAL ANALYZER --------------------------------------------------------------------------


//Function that generates the grammar based on the variable
var grammar = {};
function generateGrammar(){
    var lines = inputGrammar.match(/[^\r\n]+/g);
    var derivations;
    for(let line of lines){
      line = line.replace(commentRegex, '');
      line = line.replace(/^#(.)*/g, '')
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
    clearAll()
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
        if(Object.keys(grammar)[0] == key) siguientes[key].push('EOF') //If it is the first rule, add the symbol $

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
    if(!isTerminal(leftSide)){
      for(let token of tokens){
        if(token == ruleToGenerate){
          var indexNextToken = tokens.indexOf(token) + 1;
          if(tokens[indexNextToken]){

            if(!isTerminal(tokens[indexNextToken])){
              var aux = [...primeros[tokens[indexNextToken]]]
              if(aux.includes('epsilon')){
                var epsilon_index = primeros[tokens[indexNextToken]].indexOf('epsilon');
                aux.splice(epsilon_index, 1) //Removing epsilon of the copy
              }
              siguientes[ruleToGenerate] = siguientes[ruleToGenerate].concat(aux);
              if(primeros[tokens[indexNextToken]].includes('epsilon')){
                  siguientes[ruleToGenerate] = siguientes[ruleToGenerate].concat(siguientes[leftSide]);
              }
            } else {
              if(tokens[indexNextToken] != 'epsilon') siguientes[ruleToGenerate].push(tokens[indexNextToken]);
            }
          } else {
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
function genericAnalyze(noTerminal, lastLeftSide, lastRightSide, lastSeenPosition){
    var matched = false;
    var rules = prediccion.filter((item,index)=>item["leftSide"]==noTerminal) //Get all rules of that no terminal
    var lastLeftSide = noTerminal;
    for(let j=0; j<rules.length;j++){
        let rule = rules[j]
        if(rule.prediction.includes(token.name)){ //If that token exists in prediccion
            matched = true;
            matchedTheFirstTime = true;
            let rightSideSplitted = rule.rightSide.split(/\s/g);
            rightSideSplitted = rightSideSplitted.filter((item,index)=>item!='') //removing empty elements
            for(let i=0; i<rightSideSplitted.length;i++){
                let alpha = rightSideSplitted[i]
                if(!isTerminal(alpha)){
                    let option = genericAnalyze(alpha, lastLeftSide, rightSideSplitted, i);
                    if(option == 'stop') return 'stop'; //If there is an error we need to stop the algorithm
                }else{
                    if(alpha == 'epsilon'){
                        return 'continue';
                    }
                    else if (token.name != alpha) {
                        alternativePintSyntacticalError(token.lexeme, alpha, "onlyToken")
                        error_printed = true
                        console.log("RULE WHERE FALLO", rule)
                        return 'stop';
                    }
                    token = getNextToken(wordsToAnalyse);
                    if(token.name != 'EOF') syntacticColumn = token.column;  // Updating the row of the analysis. Add 1 if couting whitespaces
                    if(token.name == 'EOF'){
                        if(i != rightSideSplitted.length - 1){
                            if(isTerminal(rightSideSplitted[i+1]))
                                alternativePintSyntacticalError(token.lexeme, rightSideSplitted[i+1], "printOnlyToken")
                            else
                                alternativePintSyntacticalError(token.lexeme, rightSideSplitted[i+1], "printAllPrediction")
                            console.log("RULE WHERE FALLO", rule)
                            error_printed = true;
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
      alternativePintSyntacticalError(token.lexeme, noTerminal, "printAllPrediction")
      console.log("RULE WHERE FALLO", lastRightSide)
      error_printed = true;
      return 'stop';
    }
}

function mainSyntactical(){
    wordsToAnalyse = []
    wordsToAnalyse = testWTA;
    token =  getNextToken(wordsToAnalyse) //First token
    syntacticColumn = 0; syntacticRow = 0;
    var result = genericAnalyze(Object.keys(grammar)[0]) //Initial symbol
    if(token.name != 'EOF' && !error_printed)
        alternativePintSyntacticalError(token.lexeme, 'EOF', 'onlyToken')
    else if (result != "stop"){
        $('#result').prepend("<p class='successMessage'>El analisis sintactico ha finalizado exitosamente</p>")
        $('#result').append("<p class='successMessage'>El analisis sintactico ha finalizado exitosamente</p>")
        console.log("%c El analisis sintactico ha finalizado exitosamente.", "color: green");
    }

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
function alternativePintSyntacticalError(tokenFound, tokenExpected, modePrint){
    if(!matchedTheFirstTime){
        var currentError = "Error sintáctico: falta funcion_principal"
        console.log(currentError)
        $('#result').append("<p class='errorMessage'>" + currentError + "</p>")
        $('#result').prepend("<p class='errorMessage'>" + currentError + "</p>")
        return ;
    }
    if(modePrint == "printAllPrediction"){
      var rules = prediccion.filter((item,index)=>item["leftSide"]==tokenExpected) //Get all rules of that no terminal
      tokenExpected =  []
      for(rule of rules){

        tokenExpected.push(getTokenLexemeByWord(rule.prediction[0]))

      }
    }else
        tokenExpected = getTokenLexemeByWord(tokenExpected)
    $('#result').append("<p class='errorMessage'>" + "<" + syntacticRow + "," + syntacticColumn + "> Error sintactico: se encontró \"" + tokenFound + "\"; se esperaba: " + tokenExpected  + "</p>")
    $('#result').prepend("<p class='errorMessage'>" + "<" + syntacticRow + "," + syntacticColumn + "> Error sintactico: se encontró \"" + tokenFound + "\"; se esperaba: " + tokenExpected  + "</p>")
    console.error("<" + syntacticRow + "," + syntacticColumn + "> Error sintactico: se encontró \"" + tokenFound + "\"; se esperaba: " + tokenExpected);
}


  // Function to populate dictionary to input to the function getNextToken
// This function gets the lexeme of a token and transform the lexical_analysis into an usable dictionary


function getTokenLexemeByWord(word){
    var currentLexeme;
    for(let token of tokenList){
      if(!word) break;
      if(word.match(token.hardRegex) && token['name'] == 'reserved'){
        currentLexeme = word;
      } else if(token['name'] == word){
        if(!token.lexeme) currentLexeme = word;
        else currentLexeme = token.lexeme;
      }
    }
    if(!currentLexeme){
      currentLexeme = word;
    }
    return currentLexeme;

  }

//Function to get next token

function getNextToken(wordsToAnalyse){
  //If position is not passed to the function, it takes the next token
    if(wordsToAnalyse.length == currentTokenPosition)
        return {name: 'EOF', lexeme: 'EOF'}
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
    $('#result').html(lexical_analysis.replace(/&/g, '&amp;')
                                    .replace(/>/g, '&gt;')
                                    .replace(/</g, '&lt;')
                                    .replace(/\n/g,'<br/>'))

    return lexical_analysis;
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
                if(token_to_match.softRegex.exec(word)[0].length < matched_word[0].length)
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
    testWTA = []
    grammar = {}
    primeros = {}
    siguientes = {}
    prediccion = []
    prediccionDebug = [] //Beutiful console debug
    currentTokenPosition = 0;
    error_printed = false;
    matchedTheFirstTime = false;
}
