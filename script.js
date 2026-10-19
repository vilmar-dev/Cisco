//reverse string
/*
let word= "hello";
let reverse=word.split("").reverse().join("");
console.log(reverse) */

function evenadd(receiver){
    if (receiver % 2 ===0 ){
        return "even";
    }else{
        return "odd";

    }
}
console.log(evenadd(4));