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

const deleteRequest = (path, body = {}, resFunc) => {
    fetch(path, {
        method: 'delete',
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

const pagination = (event, num) => {
    console.log(event);
    if (event) {
        let p1 = document.getElementById("p1");
        let p2 = document.getElementById("p2");
        let p3 = document.getElementById("p3");
        if (event.target.id === "pre") {
            p1.textContent = Number(p1.textContent) - 1;
            p2.textContent = Number(p2.textContent) - 1;
            p3.textContent = Number(p3.textContent) - 1;
            p1.parentNode.classList.remove("active");
            p2.parentNode.classList.add("active");
            p3.parentNode.classList.remove("active");
            num = Number(p2.textContent);
        } else if (event.target.id === "next") {
            p1.textContent = Number(p1.textContent) + 1;
            p2.textContent = Number(p2.textContent) + 1;
            p3.textContent = Number(p3.textContent) + 1;
            p1.parentNode.classList.remove("active");
            p2.parentNode.classList.add("active");
            p3.parentNode.classList.remove("active");
            num = Number(p2.textContent);
        } else {
            num = Number(event.target.textContent);
            p1.parentNode.classList.remove("active");
            p2.parentNode.classList.remove("active");
            p3.parentNode.classList.remove("active");
            event.target.parentNode.classList.add("active");
        }
        if (p1.textContent === "1") {
            document.getElementById('pre').parentNode.classList.add("disabled")
        } else {
            document.getElementById('pre').parentNode.classList.remove("disabled")
        }
    }
    return num;
}
