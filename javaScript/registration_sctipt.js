// Import the functions you need from the SDKs you need
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBDQpgVcshPwrAIhN4IMz8JFcnc2qR7PIM",
    authDomain: "manager-league.firebaseapp.com",
    projectId: "manager-league",
    storageBucket: "manager-league.appspot.com",
    messagingSenderId: "270306529432",
    appId: "1:270306529432:web:31a47bf48b209c038100ed",
    measurementId: "G-G8XX6B49ED"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  
  var flag = false;
  var clear_btn = document.getElementById("btn-clear");
  var signUp_btn = document.getElementById("btn-sign-up");
  var password = document.getElementById("password-input");
  var conf_password = document.getElementById("password-confirm-input");
  
  conf_password.addEventListener("click", ()=>{
    document.getElementById("myPopup-conf").style.visibility = "hidden";
  });
  
  password.addEventListener("click", ()=>{
    document.getElementById("myPopup-pass").style.visibility = "hidden";
  });

  clear_btn.addEventListener("click", function(e){
    e.preventDefault();
    var first_name = document.getElementById("first-name-input");
    var last_name = document.getElementById("last-name-input");
    var team_name = document.getElementById("team-name-input");
    var phone_num = document.getElementById("phone-num-input");
    var email = document.getElementById("email-input");
    var password = document.getElementById("password-input");
    var conf_password = document.getElementById("password-confirm-input");
  
    first_name.value = "";
    last_name.value = "";
    team_name.value = "";
    phone_num.value = "";
    email.value = "";
    password.value = "";
    conf_password.value = "";
  })


signUp_btn.addEventListener("click", function(e){
    e.preventDefault();

    var first_name = document.getElementById("first-name-input");
    var last_name = document.getElementById("last-name-input");
    var team_name = document.getElementById("team-name-input");
    var phone_num = document.getElementById("phone-num-input");
    var email = document.getElementById("email-input");

    
    if(!checkValue(first_name, last_name, team_name, phone_num, email, password, conf_password)){
      alert("One of the fields above is missing, all fields must be filled.");
      return;
    } 
    
    if(password.value != conf_password.value){
      var cof_popup = document.getElementById("myPopup-conf");
      if(cof_popup.checkVisibility()){
        cof_popup.style.visibility = "visible"
      }
      return;
    }
    
    if(!checkPassword(password)){
      var popup = document.getElementById("myPopup-pass");
      if(popup.checkVisibility()){
        popup.style.visibility = "visible";
      }
      return;
    }
    

    if(!checkLegalEmail(email)){
      alert("The email address is not valid");
      return;
    }
    creatUser(email.value, password.value);
});

function checkValue(first, last, team, phone, email, password, conf_password){
    if(!first.value || !last.value || !team.value || !phone.value || !email.value || !password.value || !conf_password){
      return false;
    }
    return true;
}

function checkPassword(password){
  
  if(password.value.length < 8 ){
    return false;
  }

  if(!/[a-z]/.test(password.value) && !/[A-Z]/.test(password.value)){
    return false;
  }

  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if(!specialChars.test(password.value)){
    return false;
  }
  return true;
}

function checkLegalEmail(email){
  if(!/[@]/.test(email.value)){
    return false;
  }
  return true;
}

function creatUser(email, password){
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      window.location.href = "login.html";
    // ...
  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.messageg;
      alert(errorCode);
      
  })
}
