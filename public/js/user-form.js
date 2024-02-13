
function signup(signupItems, loginItems){
  console.log("SIGN UP");
  console.log(loginItems.length);
  hideItems(loginItems);
  showItems(signupItems);
}
function login(loginItems, signupItems){
  console.log("Login");
  hideItems(signupItems);
  showItems(loginItems);
}
function hideItems(items){

  for(let i = 0;i<items.length; i++){
    if(items[i].dataset.hidden == 'true'){
      items[i].style.visibility = "hidden";
    }else{
      items[i].style.display = 'none';
    }
  }
}
function showItems(items){
  for(let i = 0;i<items.length; i++){
    if(items[i].dataset.hidden == 'true'){
      items[i].style.visibility = "visible";
    }else{
      items[i].style.display = 'block';
    }
  }
}
window.onload = (event) =>{
  const tagline = document.getElementById("tagline");
  const swapButton = document.getElementById("swap-button");
  const signupButton = document.getElementById("signup-button");
  const loginButton = document.getElementById("login-button");
  const confirmPasswordContainer = document.getElementById("confirm-password-container");
  swapButton.onclick = (event)=>{
    if(window.location.hash == "#login"){
      setSignUp();
    }else{
      setLogin();
    }
  }

  function setSignUp(){
    window.location.hash = "#signup";
      swapButton.textContent = "Login";
      signupButton.style.display = 'block';
      loginButton.style.display = 'none';
      tagline.textContent = "Create your account and get paid";
      confirmPasswordContainer.style.visibility = "visible";
  }
  function setLogin(){
    window.location.hash = "#login";
    swapButton.textContent = "Sign Up";
    signupButton.style.display = 'none';
    loginButton.style.display = 'block';
    tagline.textContent = "Total Recall of your account";
    confirmPasswordContainer.style.visibility = "hidden";
  }
  if(window.location.hash == "#login"){
    setLogin();
  }else{
    setSignUp();
  }
  document.getElementById("user-container").style.visibility = 'visible';
};