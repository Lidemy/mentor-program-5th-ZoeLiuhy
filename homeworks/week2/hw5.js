function join(arr, concatStr) {
    var newStr1 = ''
    for (i=0; i<=arr.length-2; i++){
        newStr1 += arr[i].toString() + concatStr
    }
    return newStr1 + arr[arr.length-1].toString()
}


function repeat(str, times) {
    var newStr2 =''
    for (i=1; i<=times; i++){
       newStr2 += str
    }
    return newStr2
}


console.log(join(["a", "b", "c"], "!"));
console.log(repeat('a', 5));
