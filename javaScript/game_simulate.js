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
const dbTeamsInfo = ref(db,'/TeamsLeague/');
const dbScheduleInfo = ref(db,'/Schedule/');
let team_name;
let userPlayer;
let teamInfo;
let secheduleInfo;
let userLeagueInfo;
let teamOpponent;
let userTeamInfo;
let gameNumberPlaye;
let userKey;

var para = new URLSearchParams(window.location.search);
var email = para.get("email");

let team_page_link = document.getElementById("team_page_link");
team_page_link.innerHTML = `<a class="nav-link" href="team_page.html?${para.toString()}">My Team</a>`

let table_link = document.getElementById("table_page_link");
table_link.innerHTML = `<a class="nav-link" href="table_page.html?${para.toString()}">League Table</a>`

document.getElementById('userEmail').innerHTML = " " + email;

let logout = document.getElementById("logout");
logout.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    }).catch((error)=>{
        alert(error.code);
    });
    
})

onValue(dbRef, (snapshot)=>{
    for(let key in snapshot.val()){
        if(snapshot.val()[key]["Email"] === email){
            userKey = key;
            team_name = snapshot.val()[key]["TeamName"];
            userPlayer = snapshot.val()[key]["Players"];
            userLeagueInfo = snapshot.val()[key]["MyLeague"];
            userTeamInfo = snapshot.val()[key]["TeamAverage"]
        }
    }
    document.getElementById("myTeamName").innerHTML = team_name;
    for(let player in userPlayer) {
        showSquad(userPlayer[player]);
    };
});


onValue(dbTeamsInfo,(snapshot)=>{
    teamInfo = snapshot.val();
})

onValue(dbScheduleInfo,(snapshot)=>{
    secheduleInfo = snapshot.val();
    findTeamOpponent();
})



function showSquad(player){
    let squad = document.getElementById("mySquadPlayers");
    squad.innerHTML +=
    `<div class="col-2  mt-2"> 
        <div class="flipcard">
            <div class="flipcard-wrap">
                <div class="card card-front">
                    <img src="${player["Image"]} alt="" class="card-img-top">
                </div>
                <div class="card card-back">
                    <div class="card-body">
                    <h5>Name:</h5> <p>${player["Name"]}</p>
                    <h5>Position:</h5><p>${player["Position"]}</p>
                    <h5>Rating:</h5><p>${player["Rating"]}</p><br>
                </div>
            </div>
        </div>
    </div>`   
}

function findTeamOpponent(){
    if(userLeagueInfo === " "){
        gameNumberPlaye = 0;
        for(let game in secheduleInfo[0]){
            if(secheduleInfo[0][game]["Team1"] === "userTeam"){
                teamOpponent = secheduleInfo[0][game]["Team2"];
            }
            if(secheduleInfo[0][game]["Team2"] === "userTeam"){
                teamOpponent = secheduleInfo[0][game]["Team1"];
            }      
        }
    }
    else{
        let lengthOfMyLeague = 0;
        for(let i in userLeagueInfo){
            lengthOfMyLeague++;
        }

        if(lengthOfMyLeague === secheduleInfo.length){
            let teamWonShow = document.getElementById("TeamWon");
            let btnHide = document.getElementById("simulate");
            btnHide.style.visibility = "hidden";
            console.log(btnHide);
            teamWonShow.innerHTML = `The Game Is Finished Now You Can Go To See The League Table`
            myPopup.classList.add("show");

            closePopup.addEventListener("click", function () {
                myPopup.classList.remove("show");
            });
            
            window.addEventListener("click", function (event) {
            if (event.target == myPopup) {
                myPopup.classList.remove("show");
                }
            });
        }

        gameNumberPlaye = lengthOfMyLeague;
        for(let game in secheduleInfo[lengthOfMyLeague]){
            if(secheduleInfo[lengthOfMyLeague][game]["Team1"] === "userTeam"){
                teamOpponent = secheduleInfo[lengthOfMyLeague][game]["Team2"];
            }
            if(secheduleInfo[lengthOfMyLeague][game]["Team2"] === "userTeam"){
                teamOpponent = secheduleInfo[lengthOfMyLeague][game]["Team1"];
            }   
        }
    }
    document.getElementById("teamOpponentName").innerHTML = `${teamOpponent}`;
}

let simBtn = document.getElementById("simulate");
simBtn.addEventListener("click", () =>{    
    let userWin = false;
    let updateDataLeague = {};
    let gamePlayeData = {};
    let teamsPlayeInfo = {};
    let random1 = Math.floor(Math.random() * 3) * teamInfo[teamOpponent]["ATK"] * 
                teamInfo[teamOpponent]["MID"] * teamInfo[teamOpponent]["DEF"];
    let random2 = Math.floor(Math.random() * 3) * userTeamInfo["ATK"] * userTeamInfo["MID"] * userTeamInfo["DEF"];

    if(random1 > random2){
        teamsPlayeInfo[team_name] = "Lose";
        teamsPlayeInfo[teamOpponent] = "Win";
        gamePlayeData["Games"] = teamsPlayeInfo;
    }

    else if(random1 < random2){
        userWin = true;
        teamsPlayeInfo[team_name] = "Win";
        teamsPlayeInfo[teamOpponent] = "Lose";
        gamePlayeData["Games"] = teamsPlayeInfo;
    }

    else{
        teamsPlayeInfo[team_name] = "Equal";
        teamsPlayeInfo[teamOpponent] = "Equal";
        gamePlayeData["Games"] = teamsPlayeInfo;
            
    }


    let r1;
    let r2;
    for(let game in secheduleInfo[gameNumberPlaye]){
        let t1 = secheduleInfo[gameNumberPlaye][game]["Team1"];
        let t2 = secheduleInfo[gameNumberPlaye][game]["Team2"];
        if(t1 !== "userTeam" && t2 !== teamOpponent && t2 !== "userTeam" && t1 !== teamOpponent){
            teamsPlayeInfo[t1];
            teamsPlayeInfo[t2];
            r1 = Math.floor(Math.random() * 3) * teamInfo[t1]["ATK"] * 
            teamInfo[t1]["MID"] * teamInfo[t1]["DEF"];
            r2 = Math.floor(Math.random() * 3) * teamInfo[t2]["ATK"] * 
            teamInfo[t2]["MID"] * teamInfo[t2]["DEF"];
            if(r1 > r2){
                teamsPlayeInfo[t1] = "Win";
                teamsPlayeInfo[t2] = "Lose";
                gamePlayeData["Games"] = teamsPlayeInfo;
            }
            else if(r1 < r2){
                teamsPlayeInfo[t1] = "Lose";
                teamsPlayeInfo[t2] = "Win";
                gamePlayeData["Games"] = teamsPlayeInfo;
            }
            else{
                teamsPlayeInfo[t1] = "Equal";
                teamsPlayeInfo[t2] = "Equal";
                gamePlayeData["Games"] = teamsPlayeInfo;
            }
        }
    }
    updateDataLeague[gameNumberPlaye] = gamePlayeData;
    const updateUserData = ref(db,"/UsersTeams/" + userKey + "/MyLeague");
    console.log(updateUserData);
    update(updateUserData, updateDataLeague);
    let teamWonShow = document.getElementById("TeamWon");
    
    if(userWin == true){
        teamWonShow.innerHTML = `Your Team: ${team_name}<br>Is Won`;
        teamWonShow.style.color = "green";
    }
    else{
        teamWonShow.innerHTML = `Your Team ${team_name}<br>Is Lose`;
        teamWonShow.style.color = "red";
    }

    myPopup.classList.add("show");

    closePopup.addEventListener("click", function () {
        myPopup.classList.remove("show");
        location.reload();
    });
    
    window.addEventListener("click", function (event) {
        if (event.target == myPopup) {
            myPopup.classList.remove("show");
            location.reload();
        }
    });
    
});

