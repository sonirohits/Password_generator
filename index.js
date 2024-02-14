const countvalue =document.querySelector('#counter');
function increment(){
    //get the value from UI
 let value =countvalue.innerHTML;  //in string formate we get value
 //innerHTML is also correnct instead of innertext
 value = parseInt(value);
 //Update the value
 value=value +1;
 //set the value on UI
 countvalue.innerHTML =value;
}

function decrement(){
    let value =countvalue.innerHTML;  //in string formate we get value
    value = parseInt(value);
    value=value  - 1;
    countvalue.innerHTML =value;
}