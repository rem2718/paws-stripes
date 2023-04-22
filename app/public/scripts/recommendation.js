
const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
};

const status = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
};

const json = (response) => {
    return response.json()
}

arrPrint = (arr) => {
    let output = ""; arr.forEach(function
        (element) { output += `${element}, `; }); return output.slice(0, -2);
};

var pets;
var index = 0;
const getRecommendation = () => {
    const adoptID = document.getElementById("recommend").getAttribute('data-adopt-id');
    fetch(`/api/adopt/recommendation/${adoptID}`, {
        credentials: 'include',
        headers: {
            "Content-type": "application/json"
        },
    })
        .then(status)
        .then(json)
        .then((response) => {
            pets = response;
            document.getElementById('image').src = null;
            document.getElementById('petID').innerHTML = `${response[0].petID}`;
            document.getElementById('name').innerHTML = `${response[0].name}`;
            document.getElementById('type').innerHTML = `${response[0].type}`;
            document.getElementById('breed').innerHTML = `${response[0].breed}`;
            document.getElementById('age').innerHTML = `${response[0].age}`;
            document.getElementById('personality').innerHTML = `${arrPrint(response[0].personality)}`;
            document.getElementById('adopt-btn').setAttribute('href', `/api/adopt/${response[0].petID}`);
        })
        .catch((error) => {
            console.log(error.message);
            window.location.href = `/err-response/${error.message}`;
        });
};

const shuffleBtn = () => {
    const shuffle = document.getElementById('shuffle-btn');
    shuffle.addEventListener('click', () => {
        index = (index + 1) % pets.length;
        console.log(index);
        document.getElementById('image').src = null;
        document.getElementById('petID').innerHTML = `${pets[index].petID}`;
        document.getElementById('name').innerHTML = `${pets[index].name}`;
        document.getElementById('type').innerHTML = `${pets[index].type}`;
        document.getElementById('breed').innerHTML = `${pets[index].breed}`;
        document.getElementById('age').innerHTML = `${pets[index].age}`;
        document.getElementById('personality').innerHTML = `${arrPrint(pets[index].personality)}`;
        document.getElementById('adopt-btn').setAttribute('href', `/api/adopt/${pets[index].petID}`);
    });
}

getRecommendation();
shuffleBtn();