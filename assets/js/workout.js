//VARIABLES
//workout tab variables
const workoutTabEl = document.getElementById("workout-tab");
const archiveWrapperEl = document.getElementById("archive-wrapper");
const muscleGroupWrapperEl = document.getElementById("muscle-group-wrapper");
const individualMusclesWrapperEl = document.getElementById(
  "individual-muscle-wrapper"
);
const exerciseListWrapperEl = document.getElementById("exercise-wrapper");
const generateWorkoutWrapperEl = document.getElementById(
  "generate-workout-wrapper"
);
const generateWorkoutBtn = document.getElementById("generate-workout-btn");
const workoutDropdownEl = document.getElementById("workout-list");
const muscleGroup = ["Arms", "Legs", "Chest", "Back", "Core"];
var muscleGroupArray = [];
var muscleGroupCardArray = [];
var randomWorkoutArray = [];
var finalRandomArray = [];
var chosenDay = [];


//FUNCTIONS
var reset = function () {
  muscleGroupArray = [];
};

//load workout tab
var loadArchive = function () {
  //clear values
  // generateWorkoutWrapperEl.removeAttribute("style");

  reset();

  var muscleApi = "https://wger.de/api/v2/muscle/?format=json";

  //gets muscle data from api
  fetch(muscleApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          //saves initial muscle data as a global variable
          muscleGroupCardArray.push(data);
          muscleGroupCards(data);
        });
      } else {
        alert("Error: Something Went Wrong");
      }
    })
    .catch(function (error) {
      alert("Unable to Connect to WGER");
    });
};

//generate muscle group cards
function muscleGroupCards() {
  //clear values
  muscleGroupWrapperEl.innerHTML = "";
  exerciseListWrapperEl.innerHTML = "";
  individualMusclesWrapperEl.innerHTML = "";
  // generateWorkoutWrapperEl.removeAttribute("style");

  reset();

  //loop through array to generate muscle group cards
  for (i = 0; i < muscleGroup.length; i++) {
    // create muscle group card for each muscle group
    var muscleGroupCard = document.createElement("div");
    muscleGroupCard.classList = "w-11/12 h-[15%] py-2 flex justify-center items-center bg-primary rounded-[26px]";
    muscleGroupCard.id = muscleGroup[i] + "-group";

    // create image element
    var muscleGroupImageContainer = document.createElement("img");
    muscleGroupImageContainer.id = muscleGroup[i] + "-image";
    muscleGroupImageContainer.src = './assets/images/' + muscleGroup[i] + '.svg';
    muscleGroupImageContainer.setAttribute('width', '18%');
    muscleGroupImageContainer.setAttribute('style', 'transform: scale(-1,1)');
    muscleGroupImageContainer.classList = 'muscle-img';

    // create h2 element
    var muscleGroupCardName = document.createElement("h2");
    muscleGroupCardName.classList = "card-title px-3 font-semibold text-xl";
    muscleGroupCardName.setAttribute = ('style', 'pointer-events: none');
    muscleGroupCardName.textContent = muscleGroup[i] + ' Day';

    // create info element
    var moreInfoBtn = document.createElement("i");
    moreInfoBtn.id = muscleGroup[i] + "-info";
    moreInfoBtn.classList = 'fas fa-info-circle';

    muscleGroupCard.append(muscleGroupImageContainer, muscleGroupCardName, moreInfoBtn);
    muscleGroupWrapperEl.appendChild(muscleGroupCard);
    archiveWrapperEl.appendChild(muscleGroupWrapperEl);
  };
};

//load individual muscles from muscle group info btn
var loadIndMuscles = function () {
  //clear values
  muscleGroupWrapperEl.innerHTML = "";
  exerciseListWrapperEl.innerHTML = "";
  individualMusclesWrapperEl.innerHTML = "";
  // generateWorkoutWrapperEl.setAttribute("style", "display: none");

  var muscleList = document.createElement("div");
  muscleList.id = "muscles";
  muscleList.classList = "scroll";

  // var muscleListTitle = document.createElement("h2");
  // muscleListTitle.textContent = "Select a Muscle for Exercise List"
  // muscleList.appendChild(muscleListTitle);

  // create return button
  var returnBtn = document.createElement("button");
  returnBtn.setAttribute("type", "button");
  returnBtn.setAttribute("name", "returnbtn");
  returnBtn.id = "returnbtn-ind-muscles";
  returnBtn.classList = 'btn-hover2 p-3 px-8 self-center btn bg-secondary rounded-[26px] font-semibold';
  returnBtn.textContent = "Back";
  individualMusclesWrapperEl.appendChild(returnBtn);


  //loop through array to generate individual muscle cards
  for (var i = 0; i < muscleGroupArray.length; i++) {
    // muscle card container that hold image and heading
    var indMuscleCard = document.createElement("div");
    indMuscleCard.id = muscleGroupArray[i].name;
    indMuscleCard.classList = "ind-muscle-card p-3 m-3 flex flex-wrap justify-center  bg-primary rounded-[26px]";
    //assigns muscle id to be the same as the muscle id in the api
    indMuscleCard.setAttribute("data-muscleID", muscleGroupArray[i].id);

    // heading of container
    var muscleName = document.createElement("h2");
    muscleName.classList = 'p-2 px-8 mb-3 bg-secondary rounded-[26px] text-lg text-center';
    muscleName.textContent = muscleGroupArray[i].name;

    // image of container
    //checks if the background body should be front or back view
    if (muscleGroupArray[i].is_front === true) {
      var bodyImage =
        "https://wger.de/static/images/muscles/muscular_system_front.svg";
    } else {
      var bodyImage =
        "https://wger.de/static/images/muscles/muscular_system_back.svg";
    }
    //
    //sets image url as a variable
    var imageLocation = muscleGroupArray[i].image_url_secondary;
    // makes container that holds image
    var imageContainer = document.createElement("div");
    imageContainer.id = muscleGroupArray[i].id;
    imageContainer.classList = "muscle-image";
    imageContainer.setAttribute(
      "style",
      "background-image: url(https://wger.de" +
        imageLocation +
        "), url(" +
        bodyImage +
        "); width: 150px; height: 276px; background-size: 150px"
    );

    indMuscleCard.appendChild(muscleName);
    indMuscleCard.appendChild(imageContainer);
    muscleList.appendChild(indMuscleCard);
    individualMusclesWrapperEl.appendChild(muscleList);
  };
};

//fetch exercise list from clicking on individual muscle image
var loadExerciseList = function (muscleID) {
  //clear values
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
        displayExerciseList(data);
      });
    }
  });
};

//display exercise list from clicking on individual muscle image
var displayExerciseList = function (data) {
  //clear values
  muscleGroupWrapperEl.innerHTML = "";
  exerciseListWrapperEl.innerHTML = "";
  individualMusclesWrapperEl.innerHTML = "";

  // var muscleWorkoutTitle = document.createElement("h3");
  // muscleWorkoutTitle.textContent = "Select a Workout for Details";
  // exerciseListWrapperEl.appendChild(muscleWorkoutTitle);

  // generate back button
  var returnBtn = document.createElement("button");
  returnBtn.setAttribute("type", "button");
  returnBtn.setAttribute("name", "returnbtn");
  returnBtn.id = "returnbtn-exercise";
  returnBtn.classList = 'btn-hover2 p-3 px-8 self-center btn bg-secondary rounded-[26px] font-semibold';
  returnBtn.textContent = "Back";
  exerciseListWrapperEl.appendChild(returnBtn);

  // loop through array to generate individual exercise cards
  for (var i = 0; i < data.results.length; i++) {
    // container holding individual exercise
    var indExerciseWrapper = document.createElement("div");
    indExerciseWrapper.id = data.results[i].id;
    indExerciseWrapper.classList = "individual-exercise w-11/12";

    // title for individual exercise
    var exerciseTitle = document.createElement("button");
    exerciseTitle.id = "exercise-title";
    exerciseTitle.classList = "collapsible btn-hover2 my-2 bg-primary rounded-[26px] text-semibold";
    exerciseTitle.textContent = data.results[i].name;
    // append to individual exercise container
    indExerciseWrapper.appendChild(exerciseTitle);

    // container holding info for exercise
    var exerciseDescription = document.createElement("div");    
    exerciseDescription.classList = "content bg-primary rounded-[26px]";
    // create p for each description
    var exerciseP = document.createElement('div');
    exerciseP.classList = 'p-2';
    exerciseP.innerHTML = data.results[i].description;
    // append description paragraph to div
    exerciseDescription.appendChild(exerciseP);
    // 
    // append description container to individual exercise container
    indExerciseWrapper.appendChild(exerciseDescription);

    // append to container holding all exercises
    exerciseListWrapperEl.appendChild(indExerciseWrapper);
  };

  //function to make exercise collapsibles work
  var collapseList = document.getElementsByClassName("collapsible");

  for (var i = 0; i < collapseList.length; i++) {
    collapseList[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;

      if (
        content.innerHTML == "" ||
        content.innerHTML == null ||
        content.innerHTML == undefined
      ) {
        content.innerHTML = "<p>No Details Provided</p>";
      }

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  };
};

//send user input from dropdown to fetch muscle group
var randomizeWorkout = function () {
  chosenDay = [];
  //get information from dropdown and save as global variable
  chosenDay =
    workoutDropdownEl.options[workoutDropdownEl.selectedIndex].value;

  if (chosenDay === "Arms") {
    fetchArms();
  } else if (chosenDay === "Legs") {
    fetchLegs();
  } else if (chosenDay === "Chest") {
    fetchChest();
  } else if (chosenDay === "Back") {
    fetchBack();
  } else if (chosenDay === "Core") {
    fetchCore();
  } else {
    //TO DO: NEEDS TO BE A MODAL
    alert("Please Select Muscle Group");
  }
};

//generates and displays randomized workout list of six exercises from a muscle group
var displayRandomWorkout = function (data) {
  //clear values
  muscleGroupWrapperEl.innerHTML = "";
  exerciseListWrapperEl.innerHTML = "";
  individualMusclesWrapperEl.innerHTML = "";
  // generateWorkoutWrapperEl.setAttribute("style", "display: none");
  
  randomWorkoutArray = [];
  finalRandomArray = [];

  var muscleGroupImageContainer = document.createElement("div");
  muscleGroupImageContainer.id = muscleGroup[i] + "-image";
  if (chosenDay === "Arms") {
    muscleGroupImageContainer.setAttribute(
      "style",
      "background-image: url(./assets/images/arms.svg); background-repeat: no-repeat; width: 150px; height: 100px; background-size: 110px"
    );
  } else if (chosenDay === "Legs") {
     muscleGroupImageContainer.setAttribute(
       "style",
       "background-image: url(./assets/images/legs.svg); background-repeat: no-repeat; width: 150px; height: 100px; background-size: 110px"
     );
  } else if (chosenDay === "Chest") {
     muscleGroupImageContainer.setAttribute(
       "style",
       "background-image: url(./assets/images/chest.svg); background-repeat: no-repeat; width: 150px; height: 100px; background-size: 110px"
     );
  } else if (chosenDay === "Back") {
     muscleGroupImageContainer.setAttribute(
       "style",
       "background-image: url(./assets/images/back.svg); background-repeat: no-repeat; width: 150px; height: 100px; background-size: 110px"
     );
  } else if (chosenDay === "Core") {
     muscleGroupImageContainer.setAttribute(
       "style",
       "background-image: url(./assets/images/core.svg); background-repeat: no-repeat; width: 150px; height: 100px; background-size: 110px"
     );
  }
  exerciseListWrapperEl.appendChild(muscleGroupImageContainer);

  //pushes each array of workout results into one array
  for (var i = 0; i < data.length; i++) {
    var exercises = data[i].results;
    randomWorkoutArray.push(exercises);
  };

  //simplifies array so that it contains only the objects of the multiple arrays
  const simpleArray = (randomWorkoutArray = []) => {
    const result = [];
    randomWorkoutArray.forEach((element) => {
      element.forEach((el) => {
        result.push(el);
      });
    });
    
    //loops through simpleArray to randomize the list without duplicates
    for (var i = 0; i < result.length; i++) {
      var randomExercise = result[Math.floor(Math.random() * result.length)];
      //variable to check if items are already in the array before pushing
      var check = finalRandomArray.includes(randomExercise);

      if (check === false) {
        finalRandomArray.push(randomExercise);
      } else {
        while (check === true) {
          randomExercise = result[Math.floor(Math.random() * result.length)];
          check = finalRandomArray.includes(randomExercise);
          if (check === false) {
            finalRandomArray.push(randomExercise);
          }
        }
      }
    };
  };
  simpleArray(randomWorkoutArray);

  //cut finalRandomArray to only first 6 exercises
  finalRandomArray = finalRandomArray.splice(0, 6);

  //loop through randomized array to generate exercise list
  for (var i = 0; i < finalRandomArray.length; i++) {
    var exerciseCard = document.createElement("div");
    exerciseCard.id = "exercise-card";
    //sets exerciseID to be the same as in the api
    exerciseCard.setAttribute("data-exerciseID", finalRandomArray[i].id);

    var exerciseName = document.createElement("h2");
    exerciseName.id = "exercise-name";
    exerciseName.innerHTML = finalRandomArray[i].name;
    exerciseName.classList = "collapsible";

    var exerciseDescription = document.createElement("div");
    exerciseDescription.innerHTML = finalRandomArray[i].description;
    exerciseDescription.classList = "content";

    exerciseCard.appendChild(exerciseName);
    exerciseCard.appendChild(exerciseDescription);
    exerciseListWrapperEl.appendChild(exerciseCard);
  };

  //function to make exercise collapsibles work
  var collapseList = document.getElementsByClassName("collapsible");

  for (var i = 0; i < collapseList.length; i++) {
    collapseList[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;

      if (
        content.innerHTML == "" ||
        content.innerHTML == null ||
        content.innerHTML == undefined
      ) {
        content.innerHTML = "<p>No Details Provided</p>";
      }
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  };

  var returnBtn = document.createElement("button");
  returnBtn.setAttribute("type", "button");
  returnBtn.setAttribute("name", "returnbtn");
  returnBtn.id = "returnbtn-random";
  returnBtn.textContent = "Back";
  individualMusclesWrapperEl.appendChild(returnBtn);

  var favoriteBtn = document.createElement("button");
  favoriteBtn.setAttribute("type", "button");
  favoriteBtn.setAttribute("name", "favoriteBtn");
  favoriteBtn.id = "favoriteBtn-random";
  favoriteBtn.textContent = "Save Workout";
  individualMusclesWrapperEl.appendChild(favoriteBtn);

  var makeCurrentWorkoutBtn = document.createElement("button");
  makeCurrentWorkoutBtn.setAttribute("type", "button");
  makeCurrentWorkoutBtn.setAttribute("name", "makeCurrentWorkoutBtn");
  makeCurrentWorkoutBtn.id = "makeCurrentWorkoutBtn-random";
  makeCurrentWorkoutBtn.textContent = "Try It!";
  individualMusclesWrapperEl.appendChild(makeCurrentWorkoutBtn);
};

//ASYNC FETCH FUNCTIONS IN ORDER TO GET RANDOMIZED WORKOUTS FOR MUSCLE GROUPS
async function fetchArms() {
  var data = await Promise.all([
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
  displayRandomWorkout(data);
};

async function fetchLegs() {
  var data = await Promise.all([
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=11&language=2&format=json"
    ).then((response) => response.json()),
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=7&language=2&format=json"
    ).then((response) => response.json()),
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=8&language=2&format=json"
    ).then((response) => response.json()),
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=10&language=2&format=json"
    ).then((response) => response.json()),
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=15&language=2&format=json"
    ).then((response) => response.json()),
  ]);
  displayRandomWorkout(data);
};

async function fetchChest() {
  var data = await Promise.all([
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=4&language=2&format=json"
    ).then((response) => response.json()),
  ]);
  displayRandomWorkout(data);
};

async function fetchBack() {
  var data = await Promise.all([
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=12&language=2&format=json"
    ).then((response) => response.json()),
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=9&language=2&format=json"
    ).then((response) => response.json()),
  ]);
  displayRandomWorkout(data);
};

async function fetchCore() {
  var data = await Promise.all([
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=14&language=2&format=json"
    ).then((response) => response.json()),
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=6&language=2&format=json"
    ).then((response) => response.json()),
    fetch(
      "https://wger.de/api/v2/exercise/?muscles=3&language=2&format=json"
    ).then((response) => response.json()),
  ]);
  displayRandomWorkout(data);
};

//EVENT LISTENERS
//TO DO: need to add listener for when workout tab is clicked to call loadArchive. add listener for when favoriteBtn is pressed (also function to save to localStorage). add listener for when makeCurrentWorkoutBtn is pressed (also function to push to home page)
// generateWorkoutBtn.addEventListener("click", randomizeWorkout);

//DYNAMIC EVENT LISTENERS
//listener for back button on randomized workout and individual muscles
document.querySelector("#archive-wrapper").addEventListener("click", function (event) {
  if (
    event.target.matches("#returnbtn-ind-muscles") ||
    event.target.matches("#returnbtn-random")
  ) {
    muscleGroupCards(muscleGroupCardArray);
  }
});

//listener for back button on individual muscle exercise list
document.querySelector("#archive-wrapper").addEventListener("click", function (event) {
  if (event.target.matches("#returnbtn-exercise")) {
    loadIndMuscles();
  }
});

//listener for individual muscle images to load exercises for individual muscles
document.querySelector("#archive-wrapper").addEventListener("click", function (event) {
  if (event.target.matches(".muscle-image")) {
    var muscleID = event.target.id;
    loadExerciseList(muscleID);
  }
});

//listener for muscle group info buttons to load individual muscles
document.querySelector("#archive-wrapper").addEventListener("click", function (event) {
  if (event.target.id === "Arms-group") {
    for (var i = 0; i < muscleGroupCardArray[0].results.length; i++) {
      var muscle = muscleGroupCardArray[0].results[i];

      if (
        muscle.id == 2 ||
        muscle.id == 1 ||
        muscle.id == 13 ||
        muscle.id == 5
      ) {
        muscleGroupArray.push(muscle);
      }
      loadIndMuscles(muscleGroupArray);
    }
  } 
  else if (event.target.id === "Legs-info") {
    for (var i = 0; i < muscleGroupCardArray[0].results.length; i++) {
      var muscle = muscleGroupCardArray[0].results[i];

      if (
        muscle.id == 11 ||
        muscle.id == 7 ||
        muscle.id == 8 ||
        muscle.id == 10 ||
        muscle.id == 15
      ) {
        muscleGroupArray.push(muscle);
      }
      loadIndMuscles(muscleGroupArray);
    }
  } 
  else if (event.target.id === "Chest-info") {
    for (var i = 0; i < muscleGroupCardArray[0].results.length; i++) {
      var muscle = muscleGroupCardArray[0].results[i];

      if (muscle.id == 4) {
        muscleGroupArray.push(muscle);
      }
      loadIndMuscles(muscleGroupArray);
    }
  } 
  else if (event.target.id === "Back-info") {
    for (var i = 0; i < muscleGroupCardArray[0].results.length; i++) {
      var muscle = muscleGroupCardArray[0].results[i];

      if (muscle.id == 12 || muscle.id == 9) {
        muscleGroupArray.push(muscle);
      }
      loadIndMuscles(muscleGroupArray);
    }
  } 
  else if (event.target.id === "Core-info") {
    for (var i = 0; i < muscleGroupCardArray[0].results.length; i++) {
      var muscle = muscleGroupCardArray[0].results[i];

      if (muscle.id == 14 || muscle.id == 6 || muscle.id == 3) {
        muscleGroupArray.push(muscle);
      }
      loadIndMuscles(muscleGroupArray);
    }
  }
});

loadArchive();