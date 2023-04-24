const status = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
};

const arrPrint = (arr) => {
    let output = ""; arr.forEach((element) => {
        output += `${element}, `;
    });
    return output.slice(0, -2);
};

const getRequest = (path, resFunction) => {
    fetch(path, {
        credentials: 'include',
        headers: {
            "Content-type": "application/json"
        },
    })
    .then((response) => response.json())
    .then(resFunction)
    .catch((error) => {
        console.log(error.message);
        window.location.href = `/err-response/${error.message}`;
    });
}

const putRequest = (path, body, resFunc) => {
    fetch(path, {
        method: 'put',
        credentials: 'include',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(status)
    .then((response) => response.json())
    .then(resFunc)
    .catch((error) => {
        console.log(error.message);
        window.location.href = `/err-response/${error.message}`;
    });
}

const deleteRequest = (path, resFunc) => {
    fetch(path, {
        method: 'delete',
        credentials: 'include',
        headers: {
            "Content-type": "application/json"
        },
    })
    .then(status)
    .then((response) => response.json())
    .then(resFunc)
    .catch((error) => {
        console.log(error.message);
        window.location.href = `/err-response/${error.message}`;
    });
}

