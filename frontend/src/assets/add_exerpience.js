//Crowd-Sourced Travel Planner App
//Code is adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

let addExperienceForm = document.getElementById('add-experience-form-ajax');

addExperienceForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputExperienceTitle = document.getElementById("input-experience-title");
    let inputExperienceUserID = document.getElementById("input-user-id");
    let inputExperienceDescription = document.getElementById("input-experience-description");
    let inputExperienceRating = document.getElementById("input-experience-rating");
    let inputExperienceImage = document.getElementById("input-experience-image");
    
    let formData = new FormData();
    formData.append("title", inputExperienceTitle.value);
    formData.append("user_id", inputExperienceUserID.value);
    formData.append("description", inputExperienceDescription.value);
    formData.append("rating", inputExperienceRating.value);

    for (let i = 0; i < inputExperienceImage.files.length; i++) {
        formData.append("photos", inputExperienceImage.files[i]);
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-experience-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("Success:", xhttp.response);

            // Clear the input fields for another transaction
            inputExperienceTitle.value = '';
            inputExperienceUserID.value = '';
            inputExperienceDescription.value = '';
            inputExperienceRating.value = '';
            inputExperienceImage.value = ''; 

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(formData);
});
