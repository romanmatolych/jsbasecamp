class User {
    /**
     * @param {Object} info Object containing all information about a user
     */
    constructor(info) {
        if (typeof info !== "object") throw new TypeError("Invalid info argument");
        this.info = info;
    }

    /**
     * @returns {Element} Prepared element of the user
     */
    getElem() {
        if (!this._elem) this.renderElem();
        return this._elem;
    }

    /**
     * Creates and stores element representing the user
     */
    renderElem() {
        const user = document.createElement("div");
        user.className = "user";

        const thumbnail = document.createElement("img");
        thumbnail.src =  this.info.picture.thumbnail;
        user.appendChild(thumbnail);

        const name = document.createElement("h3");
        name.appendChild(document.createTextNode(`${this.info.name.first} ${this.info.name.last}`));
        user.appendChild(name);

        const city = document.createElement("p");
        city.textContent = `City: ${this.info.location.city}`;
        user.appendChild(city);

        const phone = document.createElement("p");
        phone.textContent = `Phone: ${this.info.phone}`;
        user.appendChild(phone);
        
        this._elem = user;
    }
}

/**
 * Class representing a chat with a list of users
 */
class Chat {
    /**
     * @param {Object} options Object with options such as elements where to display messages and a userlist
     */
    constructor(options = {}) {
        if ((!options.messages || !options.messages.nodeType) || 
            (!options.userlist || !options.userlist.nodeType)) throw new Error("Invalid parts for a chat");
        this.messages = options.messages;
        this.userlist = options.userlist;
        this.members = [];
    }

    addNewUser(user) {
        this.members.push(user);
        this.userlist.appendChild(user.getElem());
        // Keep the scrollbar always on the bottom
        this.userlist.scrollTop = this.userlist.scrollHeight - this.userlist.clientHeight;
    }

    /**
     * Posts message in the chat from a user
     * @param {User} user Author of the message
     * @param {DOMString} message A string containing HTML of the message 
     */
    postMessage(user, message) {
        if (!this.members.includes(user)) throw new Error("User is not a member of the chat");

        this.messages.appendChild(this._renderMessage(user, message));
        // Keep the scrollbar always on the bottom
        this.messages.scrollTop = this.messages.scrollHeight - this.messages.clientHeight;
    }

    /**
     * Method for creating a message element
     * @param {User} user Author of the message
     * @param {DOMString} message Content of the message
     * @returns {Element} Prepared element of the message
     */
    _renderMessage(user, message) {
        const post = document.createElement("div");
        post.className = "post";

        const img = document.createElement("img");
        img.src =  user.info.picture.medium;
        post.appendChild(img);

        const info = document.createElement("h2");
        info.appendChild(document.createTextNode(`${user.info.login.username}(${user.info.dob.age})`));
        post.appendChild(info);

        const foo = document.createElement("div");
        foo.innerHTML = message;
        const messageText = foo.firstChild;
        post.appendChild(messageText);

        return post;
    }
}