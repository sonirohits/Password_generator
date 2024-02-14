// chalo suru karte he bhai loge
const  input_slider =document.querySelector("[data-lengthslider]");
const  lengtthDisplay =document.querySelector("[data-lengthNumber]");
const password_display =document.querySelector("[data-passwordDisplay]");
const copyBtn =document.querySelector("[data-copy]");
const copyMsg =document.querySelector("[data-copyMsg]");

// length
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");

// checkboxes
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");

const indicator =document.querySelector("[data-indicator]");
const generateBtn =document.querySelector(".generateButton");
const allcheckBox =document.querySelectorAll("input[type=checkbox]");

// symbols string
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
let password="";
let passwordLength =10;
let checkCount = 0;
//let strength color in starting in gray

setIndicator("#ccc");
function handleSlider(){
    // .value is used because  when we fetch input element then 
    // to access the input value we use a  .value 
    input_slider.value =passwordLength;
    lengtthDisplay.innerHTML =passwordLength;
    const min =input_slider.min;
    const max =input_slider.max;
   input_slider.style.backgroundSize = ((passwordLength -min)*100/(max-min)) + "% 100%";
}
handleSlider();

function setIndicator(color){
    //setting color
    indicator.style.backgroundColor =color;
    //shadow
}

// get random Integer wala function
// Min or Max
function getrandomInteger(min,max){
  return  Math.floor(Math.random() * (max-min) + min );
}
function getrandomnumber(){
  return getrandomInteger(0,9);
}
function generateLowecase(){
  return String.fromCharCode(getrandomInteger(97,123));
}
function generateUppercase(){
  return String.fromCharCode(getrandomInteger(65,91));
}
function generateSymbols(){
  const ranDom =  getrandomInteger(0,symbols.length);
  return symbols.charAt(ranDom); // use index pe konsa char he wo charAt batata he
}
function calcStrength(){
  let hasUpper =false;
  let hasLower =false;
  let hasNum =false;
  let hasSym =false;

  if(uppercaseCheck.checked){
    // if uppercaseCheck checkBox  is clicked the  this uppercaseCheck.checked function return true
    hasUpper=true;
  }
  if(lowercaseCheck.checked){
    hasLower=true;
  }
  if(numbersCheck.checked){
    hasNum=true;
  }
  if(symbolsCheck.checked){
    hasSym=true;
  }

  if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >=8){
    setIndicator('#0f0');
  }
  else if(
    (hasLower||hasUpper) &&
    (hasNum|| hasSym) &&
    passwordLength >=6
  ){
    setIndicator("#ff0");
  }
  else{
    setIndicator("#f00");
  }
}



// righttext==writeText()
// How To Coppy Clip Board
// lets grow keep 
// clipboard.righttext meand clipboard me password copy kar rahe he
// rightext wala function promise return kar raha he
// if promise resolve then successfull coppied
// else promise is reject
// this is async code

// clipboard pe kuch bhi copy karna  he to right text wala 
// method he .method run on clipboard 
// right text retutrn the promise //promise resolve ho ga
// tabhi me manuga ki copy ho gaya he then we have to show the coppied text

//  if we click on copy symbole then message is copid and on display
// coppied message is display so we have to make sure that promise
// must be resolve the  display coppied message

// 
// this is very important function            
 async function copyContent(){
    try{
      await navigator.clipboard.writeText(password_display.value);
      copyMsg.innerText= "Coppied";
    }
  catch(e){
   copyMsg.innerText ="Failed";
  }
   copyMsg.classList.add("active");
   setTimeout(function(){
    copyMsg.classList.remove("active");
   },3000);
}



input_slider.addEventListener('input',function(e){
  passwordLength=e.target.value;// what is e  
  handleSlider();

});

copyBtn.addEventListener('click',function(){
if(password_display.value){
  copyContent();
}
});

function handlerchecknoxchange(){
checkCount =0;
allcheckBox.forEach(function(checkbox){
  if(checkbox.checked){
    checkCount++;
  }
});

if(passwordLength <checkCount){
  passwordLength =checkCount;
  handleSlider();
}
}
allcheckBox.forEach(function(checkbox){
  checkbox.addEventListener('change',handlerchecknoxchange);
});
// algorithm to shuffle
function shufflepassword(array){
  console.log("in shuffle ");
  // fisher yastes methid
  for (let i = array.length - 1; i > 0; i--) {
    // find out random j
    const j = Math.floor(Math.random() * (i + 1));
    // swap 2 numbers
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  // array.forEach((el) => (str += el));
  str = array.join("");
  return str;
}


// Implement mai heart of the function (Genrate Button)
// allcheckBox.forEach(function(checkbox){
//   checkbox.addEventListener('change',handlerchecknoxchange);
// });








// generate bbhosod odkgketh k


generateBtn.addEventListener('click',function(){
 
// none of the checkbox are selected
if(checkCount == 0 ){
  console.log("return thay che?")
  return;
}
if(passwordLength < checkCount){
  passwordLength =checkCount;
  handleSlider();
}
// lets start the new Journey  to find password
 password ="";
 //lets chech with  checkboxes are clicked
 let funcArr =[];
 if(uppercaseCheck.checked){
  funcArr.push(generateUppercase);
 }
 if(lowercaseCheck.checked){
  funcArr.push(generateLowecase);
 }
 if(numbersCheck.checked){
  funcArr.push(getrandomnumber);
 }
 if(symbolsCheck.checked){
  funcArr.push(generateSymbols);
 }

//  compulsory addition
for(let i=0;i<funcArr.length;i++){
  password += funcArr[i]();
  console.log("compulsory action");
}
// remaining addition

for(let i=0;i<passwordLength - funcArr.length;i++){
  let randomIndex =getrandomInteger(0,funcArr.length);
  password +=  funcArr[randomIndex]();
  console.log("rand");
  console.log("remaining action");
}
// shuffle the password
password = shufflepassword(Array.from(password));

// show in the UI
password_display.value =password;

// calculate stringth
calcStrength();


});