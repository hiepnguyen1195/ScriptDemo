//const
function calculateTotalAmount (vip) {
    const amount = 0  
    if (vip) {
      const amount = 1 
    } 
    {
        const amount = 100 
        {
            const amount = 1000
        }
    }  
    return amount
  }
  
  console.log("const = " + calculateTotalAmount(true))
//let
function calculateTotalAmount (vip) {
    var amount = 0
    if (vip) {
      let amount = 1 // first amount is still 0
    } 
    { // more crazy blocks!
      let amount = 100 // first amount is still 0
      {
        let amount = 1000 // first amount is still 0
      }
    }  
    return amount
  }
  
console.log("let = " + calculateTotalAmount(true))
// Block-scoped function definitions.
{
  function foo () { return 1 }
  foo() === 1
  {
      function foo () { return 2 }
      foo() === 2
  }
  foo() === 1
}
console.log(foo());