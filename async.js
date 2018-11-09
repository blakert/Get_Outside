const promise1 = new Promise(function(resolve,reject){
   resolve("success!");
   reject("failure!");
});

promise1.then(function (value){
   console.log(value); 
});



