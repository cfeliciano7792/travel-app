//Crowd-Sourced Travel Planner App
//Code is adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

let addTripForm = document.getElementById('add-trip-form-ajax');

addTripForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTripTitle = document.getElementById("input-trip-title");
    let inputTripUserID = document.getElementById("input-user-id");
    let inputTripDescription = document.getElementById("input-trip-description");
    let inputTripImage = document.getElementById("input-trip-image");
    
    let formData = new FormData();
    formData.append("title", inputTripTitle.value);
    formData.append("user_id", inputTripUserID.value);
    formData.append("description", inputTripDescription.value);

    for (let i = 0; i < inputTripImage.files.length; i++) {
        formData.append("photos", inputTripImage.files[i]);
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-trip-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("Success:", xhttp.response);

            // Clear the input fields for another transaction
            inputTripTitle.value = '';
            inputTripUserID.value = '';
            inputTripDescription.value = '';
            inputTripImage.value = ''; 

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(formData);
});
