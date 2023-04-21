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

const userID = getCookie('userID');

const status = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
};

function json(response) {
    return response.json()
}

const getHours = () => {
    fetch(`/api/volunteer/hours/${userID}`, {
        credentials: 'include',
        headers: {
            "Content-type": "application/json"
        },
    })
        .then(json)
        .then((data) => {
            var hourDiv = document.getElementById("hours");
            hourDiv.innerHTML = `completed hours of volunteering: ${data.hours} hours`
        })
        .catch((error) => {
            console.log(error.message);
            window.location.href = `/err-response/${error.message}`;
        });
}

const getUserInfo = () => {
    fetch(`/api/user/${userID}`, {
        credentials: 'include',
        headers: {
            "Content-type": "application/json"
        },
    })
        .then(json)
        .then((data) => {
            var userDiv = document.getElementById("details");
            userDiv.innerHTML = `userID: ${data.userID} username: ${data.username}`
        })
        .catch((error) => {
            console.log(error.message);
            window.location.href = `/err-response/${error.message}`;
        });
}

const getReqSt = (type) => {
    fetch(`/api/${type}/status/${userID}`, {
        credentials: 'include',
        headers: {
            "Content-type": "application/json"
        },
    })
        .then(json)
        .then((data) => {
            var div = document.getElementById(type);
            div.innerHTML = `requestID: ${data.requestID}, status: ${data.status}`
        })
        .catch((error) => {
            console.log(error.message);
            window.location.href = `/err-response/${error.message}`;
        });
}



var delBtn = document.getElementById("delete-acc");

delBtn.addEventListener("click", (event) => {
    fetch(`/api/user/${userID}`, {
        method: 'delete',
        credentials: 'include',
        headers: {
            "Content-type": "application/json"
        },
    })
        .then(status)
        .then(() => {
            window.location.href = "/";
        })
        .catch((error) => {
            console.log(error.message);
            window.location.href = `/err-response/${error.message}`;
        });
});

getUserInfo();
getHours();
getReqSt('adopt');
getReqSt('rescue');
getReqSt('handover');
getReqSt('volunteer');
