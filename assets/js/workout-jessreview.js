//VARIABLES
//workout tab variables
const workoutTabEl = document.getElementById("workout-tab");
const workoutTabTitleEl = document.getElementById("workout-tab-title");
const workoutTabBtnsWrapper = document.getElementById("workout-tab-btns");
const generateWorkoutBtn = document.getElementById("generate-workout-btn");
const archiveWrapperEl = document.getElementById("archive-wrapper");
const generateWorkoutWrapperEl = document.getElementById("generate-workout-wrapper");
const workoutDropdownEl = document.getElementById("workout-list");
const muscleGroupWrapperEl = document.getElementById("muscle-group-wrapper");
const exerciseListWrapperEl = document.getElementById("exercise-wrapper");
const individualMusclesWrapperEl = document.getElementById("individual-muscle-wrapper");
let muscleGroupArray = [];
const muscleGroup = ["Arms", "Legs", "Chest", "Back", "Core"];


//FUNCTIONS
var reset = function () { 
  muscleGroupArray=[];
};

// load data 
var loadArchive = function () {
  workoutTabTitleEl.textContent = "Select a Day to View Muscles";

  // reset array
  reset();
  var muscleApi = "https://wger.de/api/v2/muscle/?format=json";

  //gets muscle data from api
  fetch(muscleApi)
  .then(function (response) {

    // if the response is ok, send the data to muscleGroupCards()
    if (response.ok) {

      response.json().then(function(data) {
        muscleGroupCards(data);
        console.log(data);
      });
    } 
    else {
    alert("Error: Something Went Wrong");
    }
  })
  .catch(function (error) {
    alert("Unable to Connect to WGER");
  });
};

//generate muscle group cards
function muscleGroupCards(data) {
  muscleGroupWrapperEl.innerHTML = "";
  exerciseListWrapperEl.innerHTML = "";
  individualMusclesWrapperEl.innerHTML = "";
  reset();

  // loop through array to generate card for each muscle group
  for (i = 0; i < muscleGroup.length; i++) {
    var bodyCard = document.createElement("div");
    bodyCard.id = "muscle-card";
    bodyCard.classList = "muscle-card";
    bodyCard.id = muscleGroup[i] + "-group";

    var bodyCardName = document.createElement("h2");
    bodyCardName.classList = "card-title";
    bodyCardName.textContent = muscleGroup[i];

    var bodyImageContainer = document.createElement("div");
    bodyImageContainer.id = muscleGroup[i] + "-image";
    bodyImageContainer.setAttribute(
      "style",
      "background-image: url(./assets/images/" +
        muscleGroup[i] +
        ".svg); background-repeat: no-repeat; width: 150px; height: 100px; background-size: 110px"
    );

    bodyCard.append(bodyCardName, bodyImageContainer);
    muscleGroupWrapperEl.appendChild(bodyCard);
    archiveWrapperEl.appendChild(muscleGroupWrapperEl);
  };


  //add dropdown list to select muscle group to generate random workout





  //add event listeners for muscle group cards. 
  //will return error when user has gone group card -> ind muscle -> back to group cards -> other group card(because group cards are not present in html).this does not break the functionality
  muscleGroupWrapperEl.addEventListener("click", (event) => {

    if (event.target.id === "Arms-image") {
      console.log("ARM CLICK");
      for (var i = 0; i < data.results.length; i++) {
        var muscle = data.results[i];

        // displays the name of the muscle only
        console.log(data.results[i].name);

        if (
          muscle.id == 2 ||
          muscle.id == 1 ||
          muscle.id == 13 ||
          muscle.id == 5
        ) 
        {
          muscleGroupArray.push(muscle);
          loadIndMuscles(muscleGroupArray);
        }
      }
    } 
    else if (event.target.id === "Legs-image") {
      console.log("LEG CLICK");
      for (var i = 0; i < data.results.length; i++) {
        var muscle = data.results[i];

        if (
          muscle.id == 11 ||
          muscle.id == 7 ||
          muscle.id == 8 ||
          muscle.id == 10 ||
          muscle.id == 15
        ) 
        {
          muscleGroupArray.push(muscle);
          loadIndMuscles(muscleGroupArray);
        }
      }
    } 
    else if (event.target.id === "Chest-image") {
      console.log("CHEST CLICK");
      for (var i = 0; i < data.results.length; i++) {
        var muscle = data.results[i];

        if (muscle.id == 4) {
          muscleGroupArray.push(muscle);
          loadIndMuscles(muscleGroupArray);
        }
      }
    } 
    else if (event.target.id === "Back-image") {
      console.log("BACK CLICK");
      for (var i = 0; i < data.results.length; i++) {
        var muscle = data.results[i];

        if (muscle.id == 12 || muscle.id == 9) {
          muscleGroupArray.push(muscle);
          loadIndMuscles(muscleGroupArray);
        }
      }
    } 
    else if (event.target.id === "Core-image") {
      console.log("CORE CLICK");
      for (var i = 0; i < data.results.length; i++) {
        var muscle = data.results[i];

        if (muscle.id == 14 || muscle.id == 6 || muscle.id == 3) {
          muscleGroupArray.push(muscle);
          loadIndMuscles(muscleGroupArray);
        }
      }
    }

  });
};

var loadIndMuscles = function (muscleGroupArray) {

  workoutTabTitleEl.textContent = "Select Individual Muscle to Display Details";
  muscleGroupWrapperEl.innerHTML = "";
  exerciseListWrapperEl.innerHTML = "";
  individualMusclesWrapperEl.innerHTML = "";
  var muscleList = document.createElement("div");
  muscleList.id = "muscles";

  var returnBtn = document.createElement("button");
  returnBtn.setAttribute("type", "button");
  returnBtn.setAttribute("name", "returnbtn");
  returnBtn.id = "returnbtn";
  returnBtn.textContent = "Back";
  individualMusclesWrapperEl.appendChild(returnBtn);

  returnBtn.addEventListener("click", muscleGroupCards);

  // loop through array to generate individual muscle cards
  for (var i = 0; i < muscleGroupArray.length; i++) {

    var muscleCard = document.createElement("div");
    muscleCard.id = muscleGroupArray[i].name;
    muscleCard.classList = "muscle-card";
    //assigns muscle id to be the same as the muscle id in the api
    muscleCard.setAttribute("data-muscleID", muscleGroupArray[i].id);

    var muscleName = document.createElement("h2");
    muscleName.id = "muscle-name";
    muscleName.textContent = muscleGroupArray[i].name;

    //checks if the background body should be front or back view
    if (muscleGroupArray[i].is_front === true) {
      var bodyImage =
        "https://wger.de/static/images/muscles/muscular_system_front.svg";
    } else {
      var bodyImage =
        "https://wger.de/static/images/muscles/muscular_system_back.svg";
    }

    //sets image url as a variable
    var imageLocation = muscleGroupArray[i].image_url_secondary;

    var imageContainer = document.createElement("div");
    imageContainer.id = muscleGroupArray[i].id;
    imageContainer.setAttribute(
      "style",
      "background-image: url(https://wger.de" +
        imageLocation +
        "), url(" +
        bodyImage +
        "); width: 150px; height: 276px; background-size: 150px"
    );

    muscleCard.append(muscleName);
    // muscleCard.append(muscleName, imageContainer);
    muscleList.appendChild(muscleCard);
    individualMusclesWrapperEl.appendChild(muscleList);
  };

  // add event delegation listeners for ind muscles to push to fetch 
  muscleList.addEventListener("click", function (event) {
    var muscleID = event.target.id;

    loadExerciseList(muscleID);
  });

};


var loadExerciseList = function (muscleID) {

  muscleGroupWrapperEl.innerHTML = "";
  exerciseListWrapperEl.innerHTML = "";
  individualMusclesWrapperEl.innerHTML = "";

  var apiUrl =
    "https://wger.de/api/v2/exercise/?muscles=" +
    muscleID +
    "&language=2&format=json";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayExerciseList(data);
      });
    }
  });
};

var displayExerciseList = function (data) {

  muscleGroupWrapperEl.innerHTML = "";
  exerciseListWrapperEl.innerHTML = "";
  individualMusclesWrapperEl.innerHTML = "";

  for (var i = 0; i < data.results.length; i++) {
    var indExerciseWrapper = document.createElement("div");
    indExerciseWrapper.id = data.results[i].id;
    
    var exerciseTitle = document.createElement("h2");
    exerciseTitle.id = "exercise-title";
    exerciseTitle.textContent = data.results[i].name;
  
    indExerciseWrapper.appendChild(exerciseTitle);
    exerciseListWrapperEl.appendChild(indExerciseWrapper);
  };

  var returnBtn = document.createElement("button");
  returnBtn.setAttribute("type", "button");
  returnBtn.setAttribute("name", "returnbtn");
  returnBtn.id = "returnbtn";
  returnBtn.textContent = "Back";
  exerciseListWrapperEl.appendChild(returnBtn);

  returnBtn.addEventListener("click", loadIndMuscles);
};

async function fetchArms() {

  var armData = await Promise.all([
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=2&language=2&format=json"
    ).then((response) => response.json()),
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=1&language=2&format=json"
    ).then((response) => response.json()),
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=13&language=2&format=json"
    ).then((response) => response.json()),
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=5&language=2&format=json"
    ).then((response) => response.json()),
  ]);

  console.log(armData);
}

var randomizeWorkout = function () {

  console.log("Random Workout");
   
  var chosenDay =
    workoutDropdownEl.options[workoutDropdownEl.selectedIndex].value;
  console.log(chosenDay)

  if (chosenDay === "Arms") {
    console.log("arms")

    fetchArms();
    
  }
};


// EVENT LISTENERS
// need to add one for when workout tab is clicked to call loadArchive
generateWorkoutBtn.addEventListener("click", randomizeWorkout);

loadArchive();