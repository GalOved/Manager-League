// Import the functions you need from the SDKs you need
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
  import { getDatabase, ref, onValue , push, update, set } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"
  import { getAuth , signOut} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    // ...
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://manager-league-default-rtdb.europe-west1.firebasedatabase.app",
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
const auth = getAuth();
const db = getDatabase();
const dbRef = ref(db, '/UsersTeams/');

var para = new URLSearchParams(window.location.search);
var email = para.get("email");
var userPlayers;
var STlist = [];
var CBlist = [];
var CMlist = [];
var GKlist = [];

var st1 = document.getElementById("st1");
var st2 = document.getElementById("st2");

var cm1 = document.getElementById("cm1");
var cm2 = document.getElementById("cm2");
var cm3 = document.getElementById("cm3");
var cm4 = document.getElementById("cm4");

var cb1 = document.getElementById("cb1");
var cb2 = document.getElementById("cb2");
var cb3 = document.getElementById("cb3");
var cb4 = document.getElementById("cb4");

var gk = document.getElementById("gk");

let userKey;


onValue(dbRef, (snapshot)=>{
        for(let key in snapshot.val()){
            if(snapshot.val()[key]["Email"] === email){
                userPlayers = snapshot.val()[key]["Players"];
                userKey = key;
            }
        }
        for(let i = 0 ; i < userPlayers.length ; i++){
            if(userPlayers[i]["Position"] == "ST"){
                STlist.push(userPlayers[i]);
            }
            if(userPlayers[i]["Position"] == "CB"){
                CBlist.push(userPlayers[i]);
            }
            if(userPlayers[i]["Position"] == "CM"){
                CMlist.push(userPlayers[i]);
            }
            if(userPlayers[i]["Position"] == "GK"){
                    GKlist.push(userPlayers[i]);
            }
        }
        fillDefult()
    });

function fillDefult(){
    st1.innerHTML = `
        <div class="flipcard">
            <div class="flipcard-wrap">
                <div class="card card-front">
                    <img src="${STlist[0]["Image"]} alt="" class="card-img-top">
                </div>
                <div class="card card-back">
                    <div class="card-body">
                    <h5>Name:</h5> <p>${STlist[0]["Name"]}</p>
                    <h5>Position:</h5><p>${STlist[0]["Position"]}</p>
                    <h5>Rating:</h5><p>${STlist[0]["Rating"]}</p><br>
                </div>
            </div>
        </div>        
    `

    st2.innerHTML = `
    <div class="flipcard">
        <div class="flipcard-wrap">
            <div class="card card-front">
                <img src="${STlist[1]["Image"]} alt="" class="card-img-top">
            </div>
            <div class="card card-back">
                <div class="card-body">
                <h5>Name:</h5> <p>${STlist[1]["Name"]}</p>
                <h5>Position:</h5><p>${STlist[1]["Position"]}</p>
                <h5>Rating:</h5><p>${STlist[1]["Rating"]}</p><br>
            </div>
        </div>
    </div>        
    `

    cm1.innerHTML = `
    <div class="flipcard">
        <div class="flipcard-wrap">
            <div class="card card-front">
                <img src="${CMlist[0]["Image"]} alt="" class="card-img-top">
            </div>
            <div class="card card-back">
                <div class="card-body">
                <h5>Name:</h5> <p>${CMlist[0]["Name"]}</p>
                <h5>Position:</h5><p>${CMlist[0]["Position"]}</p>
                <h5>Rating:</h5><p>${CMlist[0]["Rating"]}</p><br>
            </div>
        </div>
    </div>        
    `   
    
    cm2.innerHTML = `
    <div class="flipcard">
        <div class="flipcard-wrap">
            <div class="card card-front">
                <img src="${CMlist[1]["Image"]} alt="" class="card-img-top">
            </div>
            <div class="card card-back">
                <div class="card-body">
                <h5>Name:</h5> <p>${CMlist[1]["Name"]}</p>
                <h5>Position:</h5><p>${CMlist[1]["Position"]}</p>
                <h5>Rating:</h5><p>${CMlist[1]["Rating"]}</p><br>
            </div>
        </div>
    </div>        
    `   

    cm3.innerHTML = `
    <div class="flipcard">
        <div class="flipcard-wrap">
            <div class="card card-front">
                <img src="${CMlist[2]["Image"]} alt="" class="card-img-top">
            </div>
            <div class="card card-back">
                <div class="card-body">
                <h5>Name:</h5> <p>${CMlist[2]["Name"]}</p>
                <h5>Position:</h5><p>${CMlist[2]["Position"]}</p>
                <h5>Rating:</h5><p>${CMlist[2]["Rating"]}</p><br>
            </div>
        </div>
    </div>        
    `   

    cm4.innerHTML = `
    <div class="flipcard">
        <div class="flipcard-wrap">
            <div class="card card-front">
                <img src="${CMlist[3]["Image"]} alt="" class="card-img-top">
            </div>
            <div class="card card-back">
                <div class="card-body">
                <h5>Name:</h5> <p>${CMlist[3]["Name"]}</p>
                <h5>Position:</h5><p>${CMlist[3]["Position"]}</p>
                <h5>Rating:</h5><p>${CMlist[3]["Rating"]}</p><br>
            </div>
        </div>
    </div>        
    `
    
    cb1.innerHTML = `
    <div class="flipcard">
        <div class="flipcard-wrap">
            <div class="card card-front">
                <img src="${CBlist[0]["Image"]} alt="" class="card-img-top">
            </div>
            <div class="card card-back">
                <div class="card-body">
                <h5>Name:</h5> <p>${CBlist[0]["Name"]}</p>
                <h5>Position:</h5><p>${CBlist[0]["Position"]}</p>
                <h5>Rating:</h5><p>${CBlist[0]["Rating"]}</p><br>
            </div>
        </div>
    </div>        
    `   
    
    cb2.innerHTML = `
    <div class="flipcard">
        <div class="flipcard-wrap">
            <div class="card card-front">
                <img src="${CBlist[1]["Image"]} alt="" class="card-img-top">
            </div>
            <div class="card card-back">
                <div class="card-body">
                <h5>Name:</h5> <p>${CBlist[1]["Name"]}</p>
                <h5>Position:</h5><p>${CBlist[1]["Position"]}</p>
                <h5>Rating:</h5><p>${CBlist[1]["Rating"]}</p><br>
            </div>
        </div>
    </div>        
    `   

    cb3.innerHTML = `
    <div class="flipcard">
        <div class="flipcard-wrap">
            <div class="card card-front">
                <img src="${CBlist[2]["Image"]} alt="" class="card-img-top">
            </div>
            <div class="card card-back">
                <div class="card-body">
                <h5>Name:</h5> <p>${CBlist[2]["Name"]}</p>
                <h5>Position:</h5><p>${CBlist[2]["Position"]}</p>
                <h5>Rating:</h5><p>${CBlist[2]["Rating"]}</p><br>
            </div>
        </div>
    </div>        
    `   

    cb4.innerHTML = `
    <div class="flipcard">
        <div class="flipcard-wrap">
            <div class="card card-front">
                <img src="${CBlist[3]["Image"]} alt="" class="card-img-top">
            </div>
            <div class="card card-back">
                <div class="card-body">
                <h5>Name:</h5> <p>${CBlist[3]["Name"]}</p>
                <h5>Position:</h5><p>${CBlist[3]["Position"]}</p>
                <h5>Rating:</h5><p>${CBlist[3]["Rating"]}</p><br>
            </div>
        </div>
    </div>       
    `   

    gk.innerHTML = `
    <div class="flipcard">
        <div class="flipcard-wrap">
            <div class="card card-front">
                <img src="${GKlist[0]["Image"]} alt="" class="card-img-top">
            </div>
            <div class="card card-back">
                <div class="card-body">
                <h5>Name:</h5> <p>${GKlist[0]["Name"]}</p>
                <h5>Position:</h5><p>${GKlist[0]["Position"]}</p>
                <h5>Rating:</h5><p>${GKlist[0]["Rating"]}</p><br>
            </div>
        </div>
    </div>        
    `   
}

document.getElementById('userEmail').innerHTML = " " + email;

let logout = document.getElementById("logout");
logout.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    }).catch((error)=>{
        alert(error.code);
    });
    
})
