//Crowd-Sourced Travel Planner App
//Code is adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data


function deleteExperience(experienceId) {
    // Create an object with the experience ID to send to the server
    let data = {
        experience_id: experienceId
    };

    // Set up the AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-experience-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Define how the AJAX request should resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            deleteRow(experienceId);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the deletion.");
        }
    };

    // Send the request to the server
    xhttp.send(JSON.stringify(data));
}

function deleteRow(experienceId){
    let row = document.getElementById(`${experienceId}`);
    row.remove()
}

