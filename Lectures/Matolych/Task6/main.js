const chat = new Chat({
    messages: document.querySelector(".chat-messages"), 
    userlist: document.querySelector(".chat-userlist"),
});

const MIN_TIME = 15, MAX_TIME = 30;
const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const USER_OPT = "noinfo", TEXT_OPT = "lorem/p-1/20-35";

const addUserButton = document.getElementById("add-user");
addUserButton.addEventListener("click", () => {
    getRandomUserInfo(info => {
        const newUser = new User(info);
        chat.addNewUser(newUser);

        // Generate new messages for each user every random amount of time
        const intervalTime = getRandomInteger(MIN_TIME, MAX_TIME) * 1000;
        let timer = setTimeout(function fn() {
            getRandomText(text => {
                chat.postMessage(newUser, text);
            },
            xhr => {
                console.error(`Error getting random text: ${xhr.status} ${xhr.statusText}`);
                chat.postMessage(newUser, LOREM);
            },
            TEXT_OPT);
            timer = setTimeout(fn, intervalTime);
        }, intervalTime);
    },
    xhr => {
        console.error(`Error getting random user: ${xhr.status} ${xhr.statusText}`);
    },
    USER_OPT);
});

/**
 * Fetches a randomly generated user using Random User Generator API
 * @param {Function} onsuccess A callback function that is called when information is successfully received
 * @param {Function} onerror A callback function that is executed if the operation fails
 * @param {string} [params] Extra parameters that you can add to a request
 */
function getRandomUserInfo(onsuccess, onerror, params = "") {
    get('https://randomuser.me/api/?' + params,
        data => {
            const result = JSON.parse(data);
            // Handle API errors (https://randomuser.me/documentation#errors)
            if (result.error) {
                console.error(result.error);
                return;
            }

            const info = result.results[0];
            onsuccess(info);
        }, 
        onerror
    );
}

/**
 * Fetches random text with RandomText
 * @param {Function} onsuccess A callback function that is called when text is received
 * @param {Function} onerror A callback function that is executed if the operation fails
 * @param {string} [params] Extra parameters that you can add to a request
 */
function getRandomText(onsuccess, onerror, params = "") {
    get("http://www.randomtext.me/api/" + params,
        data => {
            const text = JSON.parse(data).text_out;
            onsuccess(text);
        },
        onerror
    );
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