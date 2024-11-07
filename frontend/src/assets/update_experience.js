//Crowd-Sourced Travel Planner App
//Code is adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

const updateExperienceForm = document.getElementById('update-experience-form-ajax');

// Modify the objects we need
updateExperienceForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form fields we need to get data from
    let inputExperienceId = document.getElementById("input-experience-id");
    let inputExperienceTitle = document.getElementById("input-experience-title");
    let inputExperienceUserID = document.getElementById("input-user-id");
    let inputExperienceDescription = document.getElementById("input-experience-description");
    let inputExperienceRating = document.getElementById("input-experience-rating");
    let inputExperienceImage = document.getElementById("input-experience-image");


    //Update dorm 
    let formData = new FormData();
    formData.append("experience_id", inputExperienceId.value); 
    formData.append("title", inputExperienceTitle.value);
    formData.append("user_id", inputExperienceUserID.value);
    formData.append("description", inputExperienceDescription.value);
    formData.append("rating", inputExperienceRating.value);

    for (let i = 0; i < inputExperienceImage.files.length; i++) {
        formData.append("photos", inputExperienceImage.files[i]);
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-experience-ajax", true);

    // Define what should happen when the request resolves
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("Update Success:", xhttp.response);

            inputExperienceTitle.value = '';
            inputExperienceUserID.value = '';
            inputExperienceDescription.value = '';
            inputExperienceRating.value = '';
            inputExperienceImage.value = ''; 

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error updating the experience.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(formData);
});

