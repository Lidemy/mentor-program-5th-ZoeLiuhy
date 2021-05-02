function capitalize(str) {
  var newFirst =''
  var code = str.charCodeAt(0)
  if (code >= 97 && code <= 122){
    newFirst += String.fromCharCode(code - 32)
  } else{
    newFirst += str[0]
  }
  var originalRest =''
  for (var i=1; i<=str.length-1; i++){
    originalRest += str[i]
    }
return newFirst + originalRest
}

console.log(capitalize('nick'));
