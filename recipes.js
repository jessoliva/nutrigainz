var userFormEl = document.querySelector("#user-form")
var ingredientSearchEl = document.querySelector("#ingredients");
var recipeContainerEl = document.querySelector("#recipes-container");


// var appKey = "&app_key=38100359b40740841a18a00837f9be68"
// var appId = "&app_id=7ac48de2"

//Victoria's API keys
var appKey = "&app_key=38100359b40740841a18a00837f9be68"
var appId = "&app_id=7ac48de2"


var getRecipes = function(ingredients) {

    var apiUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=" + ingredients + "&random=true" + appId + appKey;

    //sample url
    //var apiUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=7ac48de2&app_key=38100359b40740841a18a00837f9be68"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);

                displayRecipes(data);

                if (data.hits.length == 0) {
                    alert("try again")
                }
            })
        } else {
            alert("try again")
        }
    })
    .catch(function(error) {
        alert("unable to connect to Edamam")
    })
    console.log(apiUrl);
}

var formSubmitHandler = function(event) {
    event.preventDefault();
    var ingredients = ingredientSearchEl.value.trim();

    if (ingredients) {
        getRecipes(ingredients);
        ingredientSearchEl.value = "";
    } else {
        alert("Please enter an ingredient")
    }
    console.log(ingredients);
}

var displayRecipes = function(data, searchTerm) {
    if (data.hits.length === 0) {
        recipeContainerEl.textContent = "No recipes found.";
        return;
    }

    console.log(data.hits);

    recipeContainerEl.textContent = "";
    ingredientSearchEl.textContent = searchTerm;

    for (var i = 0; i < data.hits.length; i++) {
        //format recipe name
        var recipeName = data.hits[i].recipe.label;
        var calories = data.hits[i].recipe.calories;
        var carbsValue = data.hits[i].recipe.totalNutrients.CHOCDF.quantity;
        var carbsUnit = data.hits[i].recipe.totalNutrients.CHOCDF.unit;
        var fatsValue = data.hits[i].recipe.totalNutrients.FAT.quantity;
        var fatsUnit = data.hits[i].recipe.totalNutrients.FAT.unit;
        var proteinValue = data.hits[i].recipe.totalNutrients.PROCNT.quantity;
        var proteinUnit = data.hits[i].recipe.totalNutrients.PROCNT.unit;
        var servings = data.hits[i].recipe.yield;

        var recipeEl = document.createElement("div");
        recipeEl.classList = "individual-recipes";

        //create a link for each recipe
        var linksEl = document.createElement("a");
        linksEl.classList = "list-item flex-row justify-space-between align-center";
        linksEl.setAttribute("href", data.hits[i].recipe.url);
        linksEl.setAttribute("target", "_blank");

        //add heart icon to each container
        var heartIconEl = document.createElement("i");
        heartIconEl.classList = "far fa-heart"

        //add nutrition information for each recipe
        var nutritionUlEl = document.createElement("ul");

        //add li for nutrition information for each recipe (Servings, Calories, Carbs, Protein, and Fat)
        var servingsLiEl = document.createElement("li");
        servingsLiEl.textContent = "Servings: " + servings;

        var caloriesLiEl = document.createElement("li");
        caloriesLiEl.textContent = "Calories: " + Math.round(calories);

        var carbsLiEl = document.createElement("li");
        carbsLiEl.textContent = "Carbs: " + Math.round(carbsValue) + " " + carbsUnit;

        var proteinLiEl = document.createElement("li");
        proteinLiEl.textContent = "Protein: " + Math.round(proteinValue) + " " + proteinUnit;

        var fatsLiEl = document.createElement("li");
        fatsLiEl.textContent = "Fat: " + Math.round(fatsValue) + " " + fatsUnit;


        //add thumbnail for each recipe
        var thumbnailEl = document.createElement("img");
        thumbnailEl.setAttribute("src", data.hits[i].recipe.image);


        //create a span element to hold recipe name
        var titleEl = document.createElement("span");
        titleEl.textContent = recipeName;

        //append title to links
        linksEl.appendChild(titleEl);

        //append links to container
        recipeEl.appendChild(linksEl);

        //append heart to container
        recipeEl.appendChild(heartIconEl);

        //append nutrion information to list
        nutritionUlEl.appendChild(servingsLiEl);
        nutritionUlEl.appendChild(caloriesLiEl);
        nutritionUlEl.appendChild(carbsLiEl);
        nutritionUlEl.appendChild(fatsLiEl);
        nutritionUlEl.appendChild(proteinLiEl);

        //append nutrition list to container
        recipeEl.appendChild(nutritionUlEl);

        //append image to container
        recipeEl.appendChild(thumbnailEl);

        //append container to the dom
        recipeContainerEl.appendChild(recipeEl);
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);