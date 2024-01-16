  //formats the product price to decimal
  // function displayPrice(price) {
  //   if (price) {
  //     //handle numbers less than 2 digits
  //     var leftDecimal = price.toString().replace(".", ""),
  //       rightDecimal = "00";

  //     //handle numbers > 2 digits
  //     if (leftDecimal.length > 2) {
  //       rightDecimal = leftDecimal.slice(-2);
  //       leftDecimal = leftDecimal.slice(0, -2);
  //     }
  //     //form the decimal price to be displayed
  //     var n = Number(leftDecimal + "." + rightDecimal).toFixed(2);
  //     return n === "NaN" ? price : n;
  //   }
  // }

  export const displayPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })