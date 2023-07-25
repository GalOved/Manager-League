// Import the functions you need from the SDKs you need
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
  import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js"
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

  var sign_btn = document.getElementById("sign_in_btn");
  var email = document.getElementById("email-input");
  var password = document.getElementById("password-input");
  var rememberMe = document.getElementById("remember-me");

  sign_btn.addEventListener("click", (e) =>{
      e.preventDefault();
      
      if(!missingBox(email.value, password.value)){
        alert("One of the arguments (email or password) are missing.");
        return;
      }

      if(rememberMe.checked){
          rememberUser(email.value, password.value);
      }
      
      else{
        signInUser(email.value, password.value);
      }

  })
  
  function signInUser(email, password){
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      alert("sign in successfully.")
      //TODO:location the user to the home page with the command "window.location.href:'homePageLocation'"
      // ...
      })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode);
    });
  }

  function missingBox(email, password){
    if(!email || !password){
      return false;
    }
    return true;
  }
  
  function rememberUser(email, password){
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return signInWithEmailAndPassword(auth, email, password);
    })
    .then((userCredential) => {
        // User signed in successfully
        //TODO:location the user to the home page with the command "window.location.href:'homePageLocation'"
    })

    .catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode);
    });
  }