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
                .then((data) => {
                    console.log(data);
                    const likes = document.getElementById(`likes-${data.id}`);
                    likes.textContent = data.likes;
                })
                .catch((error) => {
                    console.log(error);
                    window.location.href = `/err-response/${error.message}`;
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
                .then((data) => {
                    console.log(data);
                    const card = document.getElementById(`card-${data.id}`);
                    card.remove();

                })
                .catch((error) => {
                    console.log(error.message);
                    window.location.href = `/err-response/${error.message}`;
                });
        });
    }
}

function displayCards(experiences, isDel) {
    const container = document.getElementById("cards-container");
    container.innerHTML = '';
    experiences.forEach(experience => {
        const card = document.createElement("div");
        card.className = "card";
        card.id = `card-${experience._id}`;
        card.innerHTML = `
            <img src="${experience.image}" alt="Card 1" />
            <div class="card-text">
                <h5>Pet name: ${experience.petName}</h5>
                <h5>
                User: ${experience.isAnon ? "Anonymous" : experience.userFirstName + " " + experience.userLastName}
                </h5>
                <p>${experience.experience}</p>
            </div>
           <button id="like-${experience._id}" data-experience-id="${experience._id}" class="btn like-btn btn-primary">Like</button>
            <p id="likes-${experience._id}">${experience.likes}</p>
            `;
        if (isDel) {
            const delBtn = document.createElement("button");
            delBtn.id = `del-${experience._id}`;
            delBtn.className = "btn like-btn btn-primary";
            delBtn.setAttribute("data-experience-id", experience._id);
            delBtn.innerHTML = 'Delete';
            card.append(delBtn);
        }
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

function displayExperiences(id, isDel) {
    fetch(`/api/experiences/${id}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(status)
        .then(json)
        .then((data) => {
            console.log('Request succeeded with JSON response', data);
            displayCards(data, isDel);
        })
        .catch((error) => {
            console.log(error.message);
            window.location.href = `/err-response/${error.message}`;
        }
        );
}
displayExperiences("");
document.getElementById("all").addEventListener("click", () => { displayExperiences("", false) });
document.getElementById("one").addEventListener("click", () => { displayExperiences("12a", true) });




