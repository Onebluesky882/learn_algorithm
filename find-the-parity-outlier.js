// You are given an array (which will have a length of at least 3,
// but could be very large) containing integers. 
// The array is either entirely comprised of odd integers or entirely comprised of even integers except for a single integer N.
// Write a method that takes the array as an argument and returns this "outlier" N.

// [2, 4, 0, 100, 4, 11, 2602, 36] -->  11 (the only odd number)
// [160, 3, 1719, 19, 11, 13, -21] --> 160 (the only even number)

function findOutlier(integers){
 
  // loop array 
  let odd = []
  let even = []
 
 
  for( let i = 0 ; i < integers.length ; i++){
    if (integers[i] % 2 === 0){
         even.push(integers[i])
        
      } else if (integers[i] % 2 !== 0) {
        odd.push(integers[i])
      }
  }
  
  if(even.length === 1 ){
  return even[0]
  } else if ( odd.length === 1){
   return odd[0]
  }


 
}
