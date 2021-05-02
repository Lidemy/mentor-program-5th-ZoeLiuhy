function printFactor(n) {
    for(i=0; i<=n; i++){
        if(n % i === 0){
            console.log(i)
        }
    }
}

printFactor(10);
