// Import the functions you need from the SDKs you need
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
  import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js"
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

  var reset_btn = document.getElementById("restart_btn");
  var email = document.getElementById("email-input");
  var popup_email = document.getElementById("myPopup-email");

  email.addEventListener("click", () =>{
    popup_email.style.visibility = "hidden";
  })

  reset_btn.addEventListener("click", (e) => {
    e.preventDefault();
    
    if(!missingEmail(email.value)) {
        if(popup_email.checkVisibility()){
            popup_email.style.visibility = "visible";
            popup_email.style.transition = "all 1s ease-in-out";
        }
        return;
    }

    forgotPasswordEmail(email.value);
  })

  function missingEmail(email){
    if(!email){
        return false;
    }
    return true;
  }

  function forgotPasswordEmail(email){
    const auth = getAuth();
        sendPasswordResetEmail(auth, email)
        .then(() => {
        // Password reset email sent!
        window.location.href = "login.html";
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode);
    // ..
    });
  }
