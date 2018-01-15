function foo ()
{
  console.log("foo");
}
 
function bar ( )
{
  console.log("bar");
  foo();
}
 
function baz ()
{
  console.log("baz");
}
 
////Execute function to test Messages queue & call stack
bar();
baz();

// setTimeout( () => {
//   console.log("Test setTimeout");
// }, 1000);

// for (var i = 0; i < 10000; i++) {
//   console.log("Test For");
// }

//Promise
var myFirstPromise = new Promise((resolve, reject) => {
  var request = new XMLHttpRequest();

  request.open('GET', 'https://www.random.org/integers/?num=1&min=1&max=6&col=1&base=10&format=plain&rnd=new');
  request.onload = () => {
    if (request.status == 200) {
      resolve(request.response); // success when server response success.
      console.log('success ',request.response);
    } else {
      reject(Error(request.statusText)); // fail when server response error.
      // console.log('server fail');
    }
  };

  request.onerror = () => {
    reject(Error('Error fetching data.')); // fail when request error.
  };

  request.send(); //send request
 });

//examp promise
myFirstPromise.then((data) => {
  console.log('Got data! Promise fulfilled.');
  console.log('Random number is: ' + data);
})
.catch((error) => {
  console.log('Promise rejected.');
  console.log(error.message);
});

// Promise chain

var firstMethod = () => {
  var promise = new Promise( (resolve, reject) => {
    setTimeout( () =>  {
      console.log('first method completed');
      resolve({data: '123'});
    }, 2000);
  });
  return promise;
};

firstMethod.then(data => {
  console.log(data)
})


var secondMethod = (someStuff) => {
  var promise = new Promise( (resolve, reject) => {
    setTimeout( () => {
      console.log(someStuff);
      resolve({newData: someStuff.data + ' some more data'});
      console.log(someStuff);
    }, 2000);
  });
  return promise;
};

var thirdMethod = (someStuff) => {
  var promise = new Promise( (resolve, reject) => {
    setTimeout( () => {
      console.log('third method completed');
      resolve({result: someStuff.newData});
      console.log(someStuff);
    }, 3000);
  });
  return promise;
};

firstMethod().then(secondMethod).then(thirdMethod);