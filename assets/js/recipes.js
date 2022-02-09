var userFormEl = document.querySelector("#user-form")
var ingredientSearchEl = document.querySelector("#ingredients");
var recipeContainerEl = document.querySelector("#recipes-container");

var favoriteRecipes = []


var appKey = "&app_key=38100359b40740841a18a00837f9be68"
var appId = "&app_id=7ac48de2"

//Victoria's API keys
// var appKey = "&app_key=38100359b40740841a18a00837f9be68"
// var appId = "&app_id=7ac48de2"


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

    // get span element to display user ingredients
    var spanEl = document.getElementById('ingredient-search-term');
    spanEl.textContent = ingredients

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

        //main container div 
        var recipeEl = document.createElement("div");
        recipeEl.classList = "my-5 flex justify-center bg-[#223C44] rounded-xl shadow-md overflow-hidden";

        //additional div 1
        var div1 = document.createElement("div");
        div1.classList = "basis-3/12 flex-col self-center";

        //add thumbnail for each recipe
        var thumbnailEl = document.createElement("img");
        thumbnailEl.classList = "rounded-full";
        thumbnailEl.setAttribute("src", data.hits[i].recipe.image);

        //additional div 2
        var div2 = document.createElement("div");
        div2.classList = "self-center ml-3 basis-8/12 list-none";

        //create a link for each recipe
        var linksEl = document.createElement("a");
        linksEl.classList = "text-xs list-item align-center";
        linksEl.setAttribute("href", data.hits[i].recipe.url);
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
        carbsLiEl.textContent = "Carbs: " + Math.round(carbsValue) + " " + carbsUnit;

        var proteinLiEl = document.createElement("li");
        proteinLiEl.textContent = "Protein: " + Math.round(proteinValue) + " " + proteinUnit;

        var fatsLiEl = document.createElement("li");
        fatsLiEl.textContent = "Fat: " + Math.round(fatsValue) + " " + fatsUnit;

        //additional div 3
        var div3 = document.createElement("div");
        div3.classList = "self-center basis-1/12";
        div3.id = data.hits[i]._links.self.href;

        //add heart icon to each container
        var heartIconEl = document.createElement("i");
        heartIconEl.classList = "far fa-heart";
        heartIconEl.id = "heart-icon"

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

// //toggle the heart icon on click
// var toggleHeartIcon = function(event) {
//     document.getElementById("heart-icon").classList.toggle("far");
//     document.getElementById("heart-icon").classList.toggle("fas");
// };

//toggle the heart icon on click
var toggleHeartIcon = function(event) {
    
    var favoriteToggle = event.target

    event.target.closest("i").classList.toggle("far");
    event.target.closest("i").classList.toggle("fas");
        if (event.target.classList.contains("fas")) {
            favoriteRecipes.push(event.target.closest("div").id)
        }
    
    localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
    
};

var loadFavoriteRecipes = function() {
    var savedRecipes = localStorage.getItem("favoriteRecipes");

    if (!savedRecipes) {
        return false;
    };

    favoriteRecipes = JSON.parse(savedRecipes);
}

loadFavoriteRecipes();

userFormEl.addEventListener("submit", formSubmitHandler);
recipeContainerEl.addEventListener("click", toggleHeartIcon);