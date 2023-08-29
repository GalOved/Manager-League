// Import the functions you need from the SDKs you need
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
  import { getDatabase, ref, onValue , push, update } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"
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
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  const dbRef1 = ref(db, '/SelectPlayerList');
  const dbRef2 = ref(db, '/UsersTeams');

  onValue(dbRef1, (snapshot)=>{
    const data = snapshot.val();
    var GK_list = data["GK_List"];
    var CB_list = data["CB_List"];
    var CM_list = data["CM_List"];
    var ST_list = data["ST_List"];

    for(let key in GK_list){
        addGKToList(key, GK_list[key]["position"], GK_list[key]["rating"], GK_list[key]["image"]);
    }

    for(let key in CB_list){
        addCBToList(key, CB_list[key]["position"], CB_list[key]["rating"], CB_list[key]["image"]);
    }

    for(let key in CM_list){
        addCMToList(key, CM_list[key]["position"], CM_list[key]["rating"], CM_list[key]["image"]);
    }

    for(let key in ST_list){
        addSTToList(key, ST_list[key]["position"], ST_list[key]["rating"], ST_list[key]["image"]);
    }
});

function addGKToList(name, position, rating, image) {
    var gk_list = document.getElementById("GKlist");

    gk_list.innerHTML = gk_list.innerHTML +
    `<div class="card">
        <img class="card-img-top" src="${image}}" alt="image of ${name}">
        <div class="card-body">
            <h6 class="card-title">${name}</h6>
            <p class="card-text">
                Position: ${position}
                <br>
                rating: ${rating}
            </p>
            <button type="button" class="btn btn-primary btn-sm" 
                onclick="player_selected(\'${name}\',\'${position}\', \'${rating}\', \'${image}\' )">select player</button>
        </div>
    </div>`
}

function addCBToList(name, position, rating, image) {
    var cb_list = document.getElementById("CBlist");

    cb_list.innerHTML = cb_list.innerHTML +
    `<div class="card">
        <img class="card-img-top" src="${image}}" alt="image of ${name}">
        <div class="card-body">
            <h6 class="card-title">${name}</h6>
            <p class="card-text">
                Position: ${position}
                <br>
                rating: ${rating}
            </p>
            <button type="button" class="btn btn-primary btn-sm" 
                onclick="player_selected(\'${name}\',\'${position}\', \'${rating}\', \'${image}\' )">select player</button>
        </div>
    </div>`
}

function addCMToList(name, position, rating, image) {
    var cm_list = document.getElementById("CMlist");

    cm_list.innerHTML = cm_list.innerHTML +
    `<div class="card">
        <img class="card-img-top" src="${image}}" alt="image of ${name}">
        <div class="card-body">
            <h6 class="card-title">${name}</h6>
            <p class="card-text">
                Position: ${position}
                <br>
                rating: ${rating}
            </p>
            <button type="button" class="btn btn-primary btn-sm" 
                onclick="player_selected(\'${name}\',\'${position}\', \'${rating}\', \'${image}\' )">select player</button>
        </div>
    </div>`
}

function addSTToList(name, position, rating, image) {
    var st_list = document.getElementById("STlist");

    st_list.innerHTML = st_list.innerHTML +
    `<div class="card">
        <img class="card-img-top" src="${image}}" alt="image of ${name}">
        <div class="card-body">
            <h6 class="card-title">${name}</h6>
            <p class="card-text">
                Position: ${position}
                <br>
                rating: ${rating}
            </p>
            <button type="button" class="btn btn-primary btn-sm" 
                onclick="player_selected(\'${name}\',\'${position}\', \'${rating}\', \'${image}\' )">select player</button>
        </div>
    </div>`
}

var para = new URLSearchParams(window.location.search);
var team_name = para.get("teamName");
var email = para.get("email");
var head = document.getElementById("head");
head.innerHTML =   "Team Name: " + team_name + " " + `<br>` + head.innerHTML;

var subButton = document.getElementById("submit-team");
subButton.addEventListener("click", (e)=>{
    e.preventDefault();
    if(playerTeam.length < 11){
        alert("You do not have enough players in the team, more players must be added to the list of players");
        return;
    }
    var playersSelectByUser = {}
    for(let i = 0 ; i < playerTeam.length ; i++){
        let playerDetaile = {
            Name : playerTeam[i][0],
            Position : playerTeam[i][1],
            Rating : playerTeam[i][2],
            Image : playerTeam[i][3],
            Onfield: true,
        };
        playersSelectByUser[i] = playerDetaile;
    }

    let ATK = 0, MID = 0, DEF = 0 ;
    for(let player in playersSelectByUser){
        if(playersSelectByUser[player]["Position"] == "ST"){
            ATK += Number(playersSelectByUser[player]["Rating"]);
        }
        if(playersSelectByUser[player]["Position"] == "CM"){
            MID += Number(playersSelectByUser[player]["Rating"]);
        }
        if(playersSelectByUser[player]["Position"] == "CB" || playersSelectByUser[player]["Position"] == "GK"){
            DEF += Number(playersSelectByUser[player]["Rating"]);
        }
    }
    ATK = ATK/2;
    MID = MID/4;
    DEF = DEF/5;

    const average = {
        ATK : ATK,
        MID : MID,
        DEF : DEF
    }

    const unqKey = push(dbRef2).key;
    const data = {
        Email : email,
        TeamName : team_name,
        Players : playersSelectByUser,
        TeamAverage : average,
    };

    const updateData = {};
    updateData[unqKey] = data;
    update(dbRef2, updateData);
    updateData[unqKey] = data;
    window.location.href = "login.html";
})
let num_players_selected = document.getElementById("num-player-select");
num_players_selected.innerHTML = `<p>ST: ${num_of_ST}
                                <br>CM: ${num_of_CM}
                                <br>CB: ${num_of_CB}
                                <br>GK: ${num_of_GK}</p>`

