// Travis Skovira
// COSC 365
// JavaScript for the Budgeting App with Login

window.onload = function() {
    updateSummary();
};

let totalIncome = 0;
let totalExpenses = 0;

function signupUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username && password) {
        localStorage.setItem(username, password);
        document.getElementById("authMessage").textContent = "Sign up successful. Please login.";
    } else {
        document.getElementById("authMessage").textContent = "Please fill in both fields.";
    }
}

function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const storedPassword = localStorage.getItem(username);

    if (storedPassword === password) {
        document.getElementById("authContainer").style.display = "none";
        document.getElementById("appContainer").style.display = "block";
    } else {
        document.getElementById("authMessage").textContent = "Invalid login. Try again.";
    }
}

function addIncome() {
    const source = document.getElementById("incomeSource").value.trim();
    const amount = parseFloat(document.getElementById("incomeAmount").value);
    if (source && !isNaN(amount) && amount > 0) {
        const listItem = document.createElement("li");
        listItem.textContent = `${source}: $${amount.toFixed(2)}`;
        document.getElementById("incomeList").appendChild(listItem);
        totalIncome += amount;
        updateSummary();
        document.getElementById("incomeSource").value = "";
        document.getElementById("incomeAmount").value = "";
    } else {
        alert("Please enter a valid income source and amount.");
    }
}

function addExpense() {
    const category = document.getElementById("expenseCategory").value.trim();
    const amount = parseFloat(document.getElementById("expenseAmount").value);
    if (category && !isNaN(amount) && amount > 0) {
        const listItem = document.createElement("li");
        listItem.textContent = `${category}: $${amount.toFixed(2)}`;
        document.getElementById("expenseList").appendChild(listItem);
        totalExpenses += amount;
        updateSummary();
        document.getElementById("expenseCategory").value = "";
        document.getElementById("expenseAmount").value = "";
    } else {
        alert("Please enter a valid expense category and amount.");
    }
}

function updateSummary() {
    document.getElementById("totalIncome").textContent = totalIncome.toFixed(2);
    document.getElementById("totalExpenses").textContent = totalExpenses.toFixed(2);
    document.getElementById("balance").textContent = (totalIncome - totalExpenses).toFixed(2);
}
