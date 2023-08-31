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
const dbTeams = ref(db, '/TeamsLeague/');
let userLeagueInfo;
let myTeamName;
let myLeagueResult = {};
let p1;

var para = new URLSearchParams(window.location.search);
var email = para.get("email");

let team_page_link = document.getElementById("team_page_link");
team_page_link.innerHTML = `<a class="nav-link" href="team_page.html?${para.toString()}">My Team</a>`

let game_sim = document.getElementById("game_sim_link");
game_sim.innerHTML = `<a class="nav-link" href="game_simulate.html?${para.toString()}">Game Simulate</a>`

document.getElementById('userEmail').innerHTML = " " + email;

let logout = document.getElementById("logout");
logout.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    }).catch((error)=>{
        alert(error.code);
    });
});

onValue(dbRef, (snapshot)=>{
    for(let key in snapshot.val()){
        if(snapshot.val()[key]["Email"] === email){
            userLeagueInfo = snapshot.val()[key]["MyLeague"];
            myTeamName = snapshot.val()[key]["TeamName"];
        }
    }
});

onValue(dbTeams, (snapshot)=>{
    for(let key in snapshot.val()){
        myLeagueResult[key] = 0;
    }
    myLeagueResult[myTeamName] = 0;
    getResult();
});

function getResult(){
    for(let root in userLeagueInfo){
        for(let teamName in userLeagueInfo[root]["Games"]){
            if(userLeagueInfo[root]["Games"][teamName] === "Win"){
                myLeagueResult[teamName] += 3;
            }
            if(userLeagueInfo[root]["Games"][teamName] === "Equal"){
                myLeagueResult[teamName] += 1;
            }
        }
    }
    sortResults();
}

function sortResults(){
    let sortTableResults = [];
    for(let team in myLeagueResult){
        sortTableResults.push([team, myLeagueResult[team]]);
    }
    sortTableResults.sort(function(a,b){
        return a[1] - b[1];
    })

    putValueInTable(sortTableResults.reverse());
}

function putValueInTable(sortArray){
    let table = document.getElementById("table-league-body");
    let j = 1;
    for(let i = 0; i < sortArray.length; i++){
        
        table.innerHTML += 
        `<tr>
            <td>${j}</td>
            <td>${sortArray[i][0]}</td>
            <td>${sortArray[i][1]}</td>
        </tr>`
        j++;
    }
}
