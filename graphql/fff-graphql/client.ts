let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let myPromise = new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();

    request.responseType = 'json';
    request.open('POST', 'http://localhost:8888/graphql');
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Accept", "application/json");

    request.onload = () => {
      if (request.status == 200) {
        resolve(request.response);
        console.log('success ',request.response);
      } else {
        reject(Error(request.statusText)); // fail when server response error.
        console.log('server fail');
      }
    };
  
    request.send(JSON.stringify({query: "{ authors { firstName lastName }  }"})); //send request
    // console.log(request);
});

myPromise.then((data) => {
    console.log(' Promise fulfilled, Data is: ' + data);
})
.catch((error) => {
    console.log(error.message);
});