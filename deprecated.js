//Useful functions that are not being used right now but I can´t delete cause my partner 

function handleFiles(input) {

    const file = input.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        const file = event.target.result;
        const allLines = file.split(/\r\n|\n/);
        // Reading line by line
        allLines.forEach((line) => {
            console.log(line);
        });
    };

    reader.onerror = (event) => {
        alert(event.target.error.name);
    };

    reader.readAsText(file);
}
//Function that reads a file
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                fileDisplayArea.innerText = allText
            }
        }
    }
    rawFile.send(null);
}

// function readTextFile(){
//
//   var file = this.files[0];
//
//   var reader = new FileReader();
//   reader.onload = function(progressEvent){
//     // Entire file
//     console.log(this.result);
//
//     // By lines
//     var lines = this.result.split('\n');
//     for(var line = 0; line < lines.length; line++){
//       console.log(lines[line]);
//     }
//   };
//   reader.readAsText(file);
// }

function testInputs() {

    const input1 =
`    global sizes
     # matrix dimension, default 10
     var N := 10
     # number of processes, default 2
     var PR := 2
     # strip size
     var S : int
  body sizes
     getarg(1, N); getarg(2, PR); S := N/PR
     if N mod PR != 0 ->
       write("N must be a multiple of PR"); stop (1)
     fi
  end`;

    const output1 = `<global,1,1>
<id,sizes,1,8>
<var,3,4>
<id,N,3,8>
<tk_asig,3,10>
<tk_num,10,3,13>
<var,5,4>
<id,PR,5,8>
<tk_asig,5,11>
<tk_num,2,5,14>
<var,7,4>
<id,S,7,8>
<tk_dos_puntos,7,10>
<int,7,12>
<body,8,1>
<id,sizes,8,6>
<getarg,9,4>
<tk_par_izq,9,10>
<tk_num,1,9,11>
<tk_coma,9,12>
<id,N,9,14>
<tk_par_der,9,15>
<tk_punto_y_coma,9,16>
<getarg,9,18>
<tk_par_izq,9,24>
<tk_num,2,9,25>
<tk_coma,9,26>
<id,PR,9,28>
<tk_par_der,9,30>
<tk_punto_y_coma,9,31>
<id,S,9,33>
<tk_asig,9,35>
<id,N,9,38>
<tk_div,9,39>
<id,PR,9,40>
<if,10,4>
<id,N,10,7>
<mod,10,9>
<id,PR,10,13>
<tk_distinto,10,16>
<tk_num,0,10,19>
<tk_ejecuta,10,21>
<write,11,6>
<tk_par_izq,11,11>
<tk_cadena,"N must be a multiple of PR",11,12>
<tk_par_der,11,40>
<tk_punto_y_coma,11,41>
<stop,11,43>
<tk_par_izq,11,48>
<tk_num,1,11,49>
<tk_par_der,11,50>
<fi,12,4>
<end,13,1>`;
    const input2 = `2.5598055not3!=88&56.a`;

    const output2 = `<tk_num,2.5598055,1,1>
    <id,not3,1,10>
    <tk_distinto,1,14>
    <tk_num,88,1,16>
    >>> Error lexico(linea:1,posicion:18)`;
    const input3 = `!=$`;
    const output3 = `<tk_distinto,1,1>
    >>> Error lexico(linea:1,posicion:3)`;
    const input4 = `     ()(()()()()()())()&getarg!=
global1
global
i1if
ifif
if`
  const output4 = ` SIN GETARG ERROR LEXICO`

const input5 = `90.00.50`;
const output5 = `<tk_num,90.00,1,1>
<tk_punto,1,6>
<tk_num,50,1,7>`

const input6 = `1&23948998`;
const output6 = `<tk_num,1,1,1>
>>> Error lexico(linea:1,posicion:2)`;


const input7 = ``;

const output7 = `<resource,1,1>
<id,factorial,1,10>
<tk_par_izq,1,19>
<tk_par_der,1,20>
<procedure,3,4>
<id,fact,3,14>
<tk_par_izq,3,18>
<id,k,3,19>
<tk_dos_puntos,3,20>
<int,3,22>
<tk_par_der,3,25>
<returns,3,27>
<id,f,3,35>
<tk_dos_puntos,3,36>
<int,3,38>
<if,4,7>
<id,k,4,10>
<tk_menorque,4,12>
<tk_num,0,4,14>
<tk_ejecuta,4,16>
<id,f,4,19>
<tk_asig,4,21>
<tk_num,-1,4,24>
<tk_separa,5,7>
<id,k,5,10>
<tk_igual,5,12>
<tk_num,0,5,14>
<or,5,16>
<id,k,5,19>
<tk_igual,5,21>
<tk_num,1,5,23>
<tk_ejecuta,5,25>
<id,f,5,28>
<tk_asig,5,30>
<tk_num,1,5,33>
<tk_separa,6,7>
<id,k,6,10>
<tk_mayorque,6,12>
<tk_num,1,6,14>
<tk_ejecuta,6,16>
<id,f,6,19>
<tk_asig,6,21>
<id,k,6,24>
<tk_multi,6,26>
<id,fact,6,28>
<tk_par_izq,6,32>
<id,k,6,33>
<tk_menos,6,34>
<tk_num,1,6,35>
<tk_par_der,6,36>
<fi,7,7>
<end,8,4>
<id,fact,8,8>
<var,10,4>
<id,n,10,8>
<tk_dos_puntos,10,9>
<int,10,11>
<writes,11,4>
<tk_par_izq,11,10>
<tk_cadena,"Cuántos factoriales hay? ",11,11>
<tk_par_der,11,38>
<tk_punto_y_coma,11,39>
<read,11,41>
<tk_par_izq,11,45>
<id,n,11,46>
<tk_par_der,11,47>
<write,12,4>
<tk_par_izq,12,9>
<tk_par_der,12,10>
<fa,13,4>
<id,i,13,7>
<tk_asig,13,9>
<tk_num,1,13,12>
<to,13,14>
<id,n,13,17>
<tk_ejecuta,13,19>
<write,14,7>
<tk_par_izq,14,12>
<id,i,14,13>
<tk_coma,14,14>
<tk_cadena,"el factorial es ",14,16>
<tk_coma,14,34>
<id,fact,14,36>
<tk_par_izq,14,40>
<id,i,14,41>
<tk_par_der,14,42>
<tk_par_der,14,43>
<af,15,4>
<end,16,1>
<id,factorial,16,5>

`;

console.log(lexicalAnalyzer(input1))
  console.log("Testing all inputs!");
  for (var i = 1; i <= 7; ++i) {
    var to_execute = "(lexicalAnalyzer(input" + i.toString() + ",false)).trim() == " + "output" + i.toString() + ".trim()" ;
    console.log(to_execute);
    console.log( eval("(lexicalAnalyzer(input" + i.toString() + ",false)).trim()"));
    console.log(eval(to_execute));

  }
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
          for (let x = 0; x < prediccion[currentAlpha].length ; x++){
            var currentPrimero = prediccion[currentAlpha][x];
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
