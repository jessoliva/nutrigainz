// empty array to save loaded workouts to
let userWorkouts = [];
// reference saved workouts containers
const workoutContainerEl = document.getElementById("workouts-container");

// load scores from local storage, if any, to save into savedWorkouts array
function loadWorkout() {
  // load saved workouts
  let savedWorkout = localStorage.getItem("Workouts");
  // convert it to array
  savedWorkout = JSON.parse(savedWorkout);

  console.log("saved workout is ", savedWorkout);

  // if there are no saved workouts, do nothing
  if (savedWorkout === null) {
    return;
  }
  // else there are saved workouts, add them to the userWorkouts = []; empty array
  else {
    userWorkouts = savedWorkout;
  }
}
loadWorkout();

// display saved workouts
function displayWorkouts() {

  // loop through userWorkouts array
  for (i = 0; i < userWorkouts.length; i++) {
    // container to hold each workout saved
    const workoutSaved = document.createElement("div");
    workoutSaved.classList =
      "m-2 p-2 flex flex-wrap justify-center text-center border-4 border-primary rounded-[26px] border-white md:w-6/12 ";

    let workoutName = document.createElement("h2");
    workoutName.classList =
      "w-8/12 pt-1 pb-1 mb-2 border-b-2 border-tertiary text-tertiary text-lg font-semibold";
    workoutName.textContent = userWorkouts[i].name;
    // append title to container
    workoutSaved.appendChild(workoutName);

    // append container to workouts saved container
    workoutContainerEl.appendChild(workoutSaved);

    // save actual workout list into a variable
    let workoutList = userWorkouts[i].workout;

    // this will be the same as the finalRandomArray
    for (x = 0; x < workoutList.length; x++) {
      var exerciseCard = document.createElement("div");
      exerciseCard.id = "exercise-card";
      //sets exerciseID to be the same as in the api
      exerciseCard.setAttribute("data-exerciseID", workoutList[x].id);
      exerciseCard.classList = "w-full p-[1px]";

      // title of exercise
      var exerciseName = document.createElement("h2");
      exerciseName.id = "exercise-name";
      exerciseName.innerHTML = workoutList[x].name;
      exerciseName.classList =
        "collapsible btn-hover2 bg-primary rounded-[26px] font-semibold";

      // container for exercise description
      var exerciseDescription = document.createElement("div");
      exerciseDescription.classList = "content bg-tertiary rounded-[26px]";
      //
      // create p for each description
      var exerciseP = document.createElement("p");
      exerciseP.classList = "p-2 text-primary text-semibold";
      exerciseP.innerHTML = workoutList[x].description;
      exerciseDescription.appendChild(exerciseP);

      exerciseCard.append(exerciseName, exerciseDescription);
      workoutSaved.appendChild(exerciseCard);
    }
  }

  //function to make exercise collapsibles work
  var collapseList = document.getElementsByClassName("collapsible");
  console.log(collapseList.length);

  for (var i = 0; i < collapseList.length; i++) {
    collapseList[i].addEventListener("click", function (event) {
      this.classList.toggle("active");

      // grabs description container
      var content = this.nextElementSibling;

      if (
        content.textContent == "" ||
        content.textContent == null ||
        content.textContent == undefined
      ) {
        content.innerHTML =
          "<p class='p-2 text-primary text-semibold'>No Details Provided</p>";
      }

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
}
displayWorkouts();

// empty array to save loaded recipes to
let favoriteRecipes = [];

let loadedRecipes = [];

var recipeContainerEl = document.querySelector("#recipes-container");

// display saved recipes

var displayRecipes = function (loadedRecipes) {

  recipeContainerEl.textContent = "";

  for (var i = 0; i < loadedRecipes.length; i++) {
    //format recipe name
    var recipeName = loadedRecipes[i].recipe.label;
    var calories = loadedRecipes[i].recipe.calories;
    var carbsValue = loadedRecipes[i].recipe.totalNutrients.CHOCDF.quantity;
    var carbsUnit = loadedRecipes[i].recipe.totalNutrients.CHOCDF.unit;
    var fatsValue = loadedRecipes[i].recipe.totalNutrients.FAT.quantity;
    var fatsUnit = loadedRecipes[i].recipe.totalNutrients.FAT.unit;
    var proteinValue = loadedRecipes[i].recipe.totalNutrients.PROCNT.quantity;
    var proteinUnit = loadedRecipes[i].recipe.totalNutrients.PROCNT.unit;
    var servings = loadedRecipes[i].recipe.yield;

    //main container div
    var recipeEl = document.createElement("div");
    recipeEl.classList =
      "my-3 mx-2 w-11/12 p-2 flex justify-center bg-primary rounded-xl shadow-md overflow-hidden";

    //additional div 1
    var div1 = document.createElement("div");
    div1.classList = "basis-3/12 flex-col self-center";

    //add thumbnail for each recipe
    var thumbnailEl = document.createElement("img");
    thumbnailEl.classList = "rounded-full";
    thumbnailEl.setAttribute("src", loadedRecipes[i].recipe.image);

    //additional div 2
    var div2 = document.createElement("div");
    div2.classList = "self-center ml-3 basis-8/12 list-none";

    //create a link for each recipe
    var linksEl = document.createElement("a");
    linksEl.classList = "text-xs list-item align-center";
    linksEl.setAttribute("href", loadedRecipes[i].recipe.url);
    linksEl.setAttribute("target", "_blank");

    //create a span element to hold recipe name
    var titleEl = document.createElement("span");
    titleEl.textContent = recipeName;
    titleEl.classList = "text-white underline font-semibold";

    //add nutrition information for each recipe
    var nutritionUlEl = document.createElement("ul");
    nutritionUlEl.classList = "text-white text-xs";

    //add li for nutrition information for each recipe (Servings, Calories, Carbs, Protein, and Fat)
    var servingsLiEl = document.createElement("li");
    servingsLiEl.textContent = "Servings: " + servings;

    var caloriesLiEl = document.createElement("li");
    caloriesLiEl.textContent = "Calories: " + Math.round(calories);

    var carbsLiEl = document.createElement("li");
    carbsLiEl.textContent =
      "Carbs: " + Math.round(carbsValue) + " " + carbsUnit;

    var proteinLiEl = document.createElement("li");
    proteinLiEl.textContent =
      "Protein: " + Math.round(proteinValue) + " " + proteinUnit;

    var fatsLiEl = document.createElement("li");
    fatsLiEl.textContent = "Fat: " + Math.round(fatsValue) + " " + fatsUnit;

    //additional div 3
    var div3 = document.createElement("div");
    div3.classList = "self-center basis-1/12";
    div3.id = loadedRecipes[i]._links.self.href;

    //add heart icon to each container
    var heartIconEl = document.createElement("i");
    heartIconEl.classList = "fas fa-heart";
    heartIconEl.id = "heart-icon";

    //append recipEl
    recipeEl.appendChild(div1);

    //append image to container
    div1.appendChild(thumbnailEl);

    //append div2
    recipeEl.appendChild(div2);

    //append links to container
    div2.appendChild(linksEl);

    //append title to links
    linksEl.appendChild(titleEl);

    //append nutrion information to list
    nutritionUlEl.appendChild(servingsLiEl);
    nutritionUlEl.appendChild(caloriesLiEl);
    nutritionUlEl.appendChild(carbsLiEl);
    nutritionUlEl.appendChild(fatsLiEl);
    nutritionUlEl.appendChild(proteinLiEl);

    //append nutrition list to container
    div2.appendChild(nutritionUlEl);

    //append div3
    recipeEl.appendChild(div3);

    //append heart to container
    div3.appendChild(heartIconEl);

    //append container to the dom
    recipeContainerEl.appendChild(recipeEl);
  }
};

var getRecipes = function () {
  for (i = 0; i < favoriteRecipes.length; i++) {
    var apiUrl = favoriteRecipes[i];

    //sample url
    //var apiUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=7ac48de2&app_key=38100359b40740841a18a00837f9be68"

    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            loadedRecipes.push(data);
            displayRecipes(loadedRecipes);
          });
        } else {
          alert("try again");
        }
      })
      .catch(function (error) {
        alert("unable to connect to Edamam");
      });
  }
};

var loadFavoriteRecipes = function () {
  var savedRecipes = localStorage.getItem("favoriteRecipes");

  if (!savedRecipes) {
    return false;
  }

  favoriteRecipes = JSON.parse(savedRecipes);
};
loadFavoriteRecipes();
getRecipes();
