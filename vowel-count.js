function getCount(str) {
  const vowels = ['a', 'e' , 'i' , 'o', 'u']
  let count = 0 


  // str is string not array  normalize string to array 
  // loop string  and store to array 
  for (let i = 0; i < str.length;i++){
    // compair charactor with vowels
        for (let j=0 ; j < vowels.length; j++){
          if(str[i] === vowels[j]){
            count++
          }    
        }
  }
 
  return count;
}
 



getCount()