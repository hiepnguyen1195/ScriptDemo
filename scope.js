// global scope
var name = 'hiep';
var scope1 = function () {
  // name is available here
  var scope2 = function () {
    // name is available here too
    var scope3 = function () {
      // name is also available here!
    };
  };
};

var lscope1 = function () {
    // name = undefined
    var lscope2 = function () {
        // name = undefined
        var lscope3 = function () {
        var name = 'hiep'; // locally scoped
        };
    };
};

//Lexical Scope
var myFunction = function () {
    var name = 'hiep';
    var myOtherFunction = function () {
        console.log('My name is ' + name);
    };
    console.log(name);
    myOtherFunction(); // call function
};

// `hiep`
// `My name is hiep`