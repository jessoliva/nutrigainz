// empty array to save loaded workouts to 
let userWorkouts = [];

// load scores from local storage, if any, to save into savedWorkouts array
function loadWorkout() {

    // load saved workouts
    let savedWorkout = localStorage.getItem('Workouts');
    // convert it to array
    savedWorkout = JSON.parse(savedWorkout);

    console.log(savedWorkout);
  
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
        console.log(userWorkouts[i].name)
    }

}
displayWorkouts();