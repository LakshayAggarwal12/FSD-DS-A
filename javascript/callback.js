function sum(a, b) {
  let result = a + b;
  return result;
}

function sumWithMsg(clbk, msg){
    const result = sum(10, 20);
    const fresult = "Hello " + msg + " the sum is " + result;
    console.log(fresult);
}
sumWithMsg(sum, "Mr. Lakshay");