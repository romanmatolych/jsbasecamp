const chat = new Chat({
    messages: document.querySelector(".chat-messages"), 
    userlist: document.querySelector(".chat-userlist"),
});

const addUserButton = document.getElementById("add-user");
addUserButton.addEventListener("click", () => {
    getRandomUserInfo(info => {
        const newUser = new User(info);
        chat.addNewUser(newUser);

        // Generate new messages for each user every random amount of time
        const intervalTime = getRandomInteger(15, 30) * 1000;
        let timer = setTimeout(function fn() {
            getRandomText(text => {
                chat.postMessage(newUser, text);
            });
            timer = setTimeout(fn, intervalTime);
        }, intervalTime);
    });
});

/**
 * Fetches a randomly generated user using Random User Generator API
 * @param {Function} fn A callback function that is called when information is successfully received
 */
function getRandomUserInfo(fn) {
    const params = "noinfo";
    get('https://randomuser.me/api/?' + params,
        data => {
            const result = JSON.parse(data);
            // Handle API errors (https://randomuser.me/documentation#errors)
            if (result.error) {
                console.error(result.error);
                return;
            }

            const info = result.results[0];
            fn(info);
        },
        xhr => {
            console.error(`Error getting random user: ${xhr.status} ${xhr.statusText}`);
        });
}

/**
 * Fetches random text with RandomText
 * @param {Function} fn A callback function that is called when text is received
 */
function getRandomText(fn) {
    const params = "lorem/p-1/20-35";
    get("http://www.randomtext.me/api/" + params,
        data => {
            const text = JSON.parse(data).text_out;
            fn(text);
        },
        xhr => {
            console.error(`Error getting random text: ${xhr.status} ${xhr.statusText}`);
        });
}

/**
 * Load data from a server using HTTP GET request
 * @param {string} url URL to which the request is sent
 * @param {Function} onsuccess A callback function that is executed if the request succeeds
 * @param {Function} onerror A callback function that is executed if the request fails
 */
function get(url, onsuccess, onerror) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                onsuccess(xhr.responseText, xhr);
            } else {
                onerror(xhr);
            }
        }
    };
    xhr.send();
}

/**
 * Generates random integer between two numbers
 * @param {number} min The smallest integer the method may return
 * @param {number} max The largest integer the method may return
 */
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}