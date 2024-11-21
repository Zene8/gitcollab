window.onload = function() {
    document.getElementById("searchButton").onclick = function () {
        alert("This should open the search page.")
    };
}

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("loading")
    fetch('../nav-header')
        .then(response => response.text())
        .then(text => document.getElementById('nav-container').innerHTML = text);
});
//this would be great if the search page exists. also use window.href()
