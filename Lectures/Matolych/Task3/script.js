function createButton(value, callback) {
    let button = document.createElement("button");
    button.type = "button";
    button.textContent = value;
    button.addEventListener("click", callback);
    return button;
}

class Calendar {
    constructor() {     
        this.date = new Date;
    }

    updateTitle() {
        let title = this.date.toLocaleString(navigator.language || navigator.userLanguage, // get locale
            { year: "numeric", month: "long" });

        // Check if span exists
        if (!this.elem.children[0].firstChild) {
            let span = document.createElement("span");
            span.textContent = title;
            this.elem.children[0].appendChild(span);
        } else {
            this.elem.children[0] // header
                .childNodes[0].textContent = title;
        }
    }

    renderHeader() {
        let header = document.createElement("header");
        header.className = "header";
        this.elem.appendChild(header);

        this.updateTitle();

        let backButton = createButton("<", () => {
            this.date.setMonth(this.date.getMonth() - 1);
            this.updateTitle();
            this.fill(this.getDates());
        });
        backButton.className = "control"
        let nextButton = createButton(">", () => {
            this.date.setMonth(this.date.getMonth() + 1);
            this.updateTitle();
            this.fill(this.getDates());
        });
        nextButton.className = "control"
        
        let controlsContainer = document.createElement("div");
        controlsContainer.appendChild(backButton);
        controlsContainer.appendChild(nextButton);
        header.appendChild(controlsContainer);
    }

    // Returns an array of dates to be drawn
    getDates() {
        let date = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
        let dates = [];
        // get all days of current month
        while (date.getMonth() === this.date.getMonth()) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        // get previous month's last days (till first Sunday)
        while (dates[0].getDay() !== 0) {
            let firstDate = new Date(dates[0].getTime());
            firstDate.setDate(firstDate.getDate() - 1);
            dates.unshift(firstDate);
        }

        // push next month's days
        while (dates.length < 42 /* standard size of a calendar */) {
            let lastDate = new Date(dates[dates.length - 1].getTime());
            lastDate.setDate(lastDate.getDate() + 1);
            dates.push(lastDate);
        }
        return dates;
    }

    // Draw dates area
    fill(dates) {
        let tbody = this.elem.children[1].tBodies[0];
        if (!tbody) {
            tbody = document.createElement("tbody");
            this.elem.children[1].appendChild(tbody);
        } else {
            tbody.innerHTML = "";
        }
        
        // fill all days
        for (let row = 0; row < 6; row++) {
            let tr = document.createElement("tr");
            tbody.appendChild(tr);
            for (let day = 0; day < 7; day++) {
                let td = document.createElement("td");
                let currentDate = dates[row * 7 + day];

                if (currentDate.getMonth() !== this.date.getMonth()) td.classList.add("unavailable");
                if (currentDate.getDay() === 0) td.classList.add("weekend");
                if (currentDate.toDateString() === new Date().toDateString()) td.classList.add("today");
                
                td.addEventListener("click", event => {
                    // Select only one day at a time
                    Array.prototype.forEach.call(tbody.rows, r => {
                        for (let i = 0; i < r.cells.length; i++)
                            r.cells[i].classList.remove("selected");
                    });
                    event.target.classList.toggle("selected");
                });

                td.textContent = currentDate.getDate();
                tr.appendChild(td);
            }
        }
    }

    render() {
        this.renderHeader();

        let table = document.createElement("table");
        table.className = "dates";
        this.elem.appendChild(table);
        
        table.appendChild(document.createElement("thead"));

        let dates = this.getDates();

        // display weekdays
        let tr = document.createElement("tr");
        this.elem.children[1] // table
            .tHead
            .appendChild(tr);
        dates.slice(0, 7) // weekdays
            .map(d => d.toLocaleString(navigator.language || navigator.userLanguage, // get locale
                { weekday: "short" })) // locale weekdays' names
            .forEach(d => {
                let th = document.createElement("th");
                th.textContent = d;
                tr.appendChild(th);
            });

        this.fill(dates);
    }

    getElem() {
        this.elem = document.createElement("div");
        this.elem.className = "calendar";
        this.render();

        return this.elem;
    }
}

window.onload = function() {
    let c = new Calendar;
    document.querySelector(".container").appendChild(c.getElem());
};