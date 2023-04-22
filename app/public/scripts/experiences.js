
function displayCards(experiences) {
    const container = document.getElementById("cards-container");
    experiences.forEach(experience => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <button class="btn del-btn btn-primary">Delete</button>
            <img src="${experience.image}" alt="Card 1" />
            <div class="card-text">
                <h5>Pet name: ${experience.petName}</h5>
                <h5>
                User: ${experience.isAnon ? "Anonymous" : experience.userFirstName + " " + experience.userLastName}
                </h5>
                <p>${experience.experience}</p>
            </div>
            <button id="like-btn" class="btn btn-primary">Like</button>
            <p>${experience.likes}</p>
            `;
        container.appendChild(card);
    });
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

function likeBtnListener() {
    const likeBtn = document.getElementById("like-btn");
    likeBtn.addEventListener("click", function () {
        fetch("/api/experiences/1", {
            method: 'PUT',
            credentials: 'include',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ 'like': 'like' })
        })
            .then(status)
            .then(json)
            .then(function (data) {
                console.log('Request succeeded with JSON response', data);
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    });
}

fetch("/api/experiences", {
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

