function likeBtnListener() {
    var buttons = document.querySelectorAll(".like-btn");
    console.log(buttons);
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", (event) => {
            const experienceId = event.target.dataset.experienceId;
            fetch(`/api/experiences/${experienceId}`, {
                method: 'put',
                credentials: 'include',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ 'like': 'remove like' })
            })
                .then(status)
                .then(json)
                .then(function (data) {
                    console.log(data);
                    const likes = document.getElementById(`likes-${data.id}`);
                    likes.textContent = data.likes;
                })
                .catch(function (error) {
                    console.log('Request failed', error);
                });
        });
    }
}

function delBtnListener() {
    var buttons = document.querySelectorAll(".del-btn");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", (event) => {
            const experienceId = event.target.dataset.experienceId;
            fetch(`/api/experiences/${experienceId}`, {
                method: 'delete',
                credentials: 'include',
                headers: {
                    "Content-type": "application/json"
                },
            })
                .then(status)
                .then(json)
                .then(function (data) {
                    console.log(data);
                    const card = document.getElementById(`card-${data.id}`);
                    card.remove();

                })
                .catch(function (error) {
                    console.log('Request failed', error);
                });
        });
    }
}

function displayCards(experiences) {
    const container = document.getElementById("cards-container");
    experiences.forEach(experience => {
        const card = document.createElement("div");
        card.className = "card";
        card.id = `card-${experience._id}`;
        card.innerHTML = `
            <button id="del-${experience._id}" data-experience-id="${experience._id}" class="btn del-btn btn-primary">Delete</button>
            <img src="${experience.image}" alt="Card 1" />
            <div class="card-text">
                <h5>Pet name: ${experience.petName}</h5>
                <h5>
                User: ${experience.isAnon ? "Anonymous" : experience.userFirstName + " " + experience.userLastName}
                </h5>
                <p>${experience.experience}</p>
            </div>
            <button id="like-btn-${experience._id}" data-experience-id="${experience._id}" class="btn like-btn btn-primary">Like</button>
            <p id="likes-${experience._id}">${experience.likes}</p>
            `;
        container.appendChild(card);
    });
    likeBtnListener();
    delBtnListener();
};

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
};

function json(response) {
    return response.json()
}

function displayExperiences(id) {
    fetch(`/api/experiences/${id}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(status)
        .then(json)
        .then(function (data) {
            console.log('Request succeeded with JSON response', data);
            displayCards(data);
        })
        .catch(function (error) {
            console.log('Request failed', error);
        }
        );
}
displayExperiences("");
document.getElementById("all").addEventListener("click", () => { displayExperiences("") });
document.getElementById("one").addEventListener("click", () => { displayExperiences("12a") });




