const modal =document.querySelector(".modal");
const overlay=document.querySelector(".overlay");

// poiter -event is  css property
//ek pointer -events se apke  element pe kya pharak padta he
// uske liye pointer event use hota he
//modal open function

function openmodal(){
    console.log('Modal is Opne');
    modal.classList.add('active');
    overlay.classList.add('overlayactive');
};

// modal close function

function closemodal(){
    console.log('Modal Is Close');
    modal.classList.remove("active");
    overlay.classList.remove("overlayactive");
};