var totals = {
    calories: 0,
    fats: 0,
    proteins: 0,
    carbs: 0
};

var mealCount = 0;
var mostCal = null;
var leastCal = null;

function addMeal(meal) {
    var item = document.getElementById(meal + "Item").value;
    var calories = parseInt(document.getElementById(meal + "Calories").value);
    var fats = parseInt(document.getElementById(meal + "Fats").value);
    var proteins = parseInt(document.getElementById(meal + "Proteins").value);
    var carbs = parseInt(document.getElementById(meal + "Carbs").value);

    var listItem = document.createElement("li");
    listItem.textContent = item + " — " + calories + " cal, " + fats + "g fat, " + proteins + "g protein, " + carbs + "g carbs";
    document.getElementById(meal + "List").appendChild(listItem);

    totals.calories += calories;
    totals.fats += fats;
    totals.proteins += proteins;
    totals.carbs += carbs;

    updateSummary();

    mealCount++;
    document.getElementById("mealCount").textContent = mealCount;

    if (!mostCal || calories > mostCal.calories) {
        mostCal = { name: item, calories: calories };
        document.getElementById("mostCal").textContent = mostCal.name + " (" + mostCal.calories + " cal)";
    }

    if (!leastCal || calories < leastCal.calories) {
        leastCal = { name: item, calories: calories };
        document.getElementById("leastCal").textContent = leastCal.name + " (" + leastCal.calories + " cal)";
    }

    document.getElementById(meal + "Item").value = "";
    document.getElementById(meal + "Calories").value = "";
    document.getElementById(meal + "Fats").value = "";
    document.getElementById(meal + "Proteins").value = "";
    document.getElementById(meal + "Carbs").value = "";
}

function updateSummary() {
    document.getElementById("totalCalories").textContent = totals.calories;
    document.getElementById("totalFats").textContent = totals.fats;
    document.getElementById("totalProteins").textContent = totals.proteins;
    document.getElementById("totalCarbs").textContent = totals.carbs;

    var recCalories = parseInt(document.getElementById("recommendedCalories").textContent);
    var recFats = parseInt(document.getElementById("recommendedFats").textContent);
    var recProteins = parseInt(document.getElementById("recommendedProteins").textContent);
    var recCarbs = parseInt(document.getElementById("recommendedCarbs").textContent);

    var calPercent = Math.round((totals.calories / recCalories) * 100);
    var fatPercent = Math.round((totals.fats / recFats) * 100);
    var proteinPercent = Math.round((totals.proteins / recProteins) * 100);
    var carbPercent = Math.round((totals.carbs / recCarbs) * 100);

    document.getElementById("calPercent").textContent = calPercent;
    document.getElementById("fatPercent").textContent = fatPercent;
    document.getElementById("proteinPercent").textContent = proteinPercent;
    document.getElementById("carbPercent").textContent = carbPercent;
}
