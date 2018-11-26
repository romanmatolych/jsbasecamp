const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];

const weekdaysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class Renderer {

    constructor(date = new Date) {

        this.date = date;
        this.calendar = new Calendar(this.date);
        this.container;
        this.calendarElement;
    }

    render() {

        this.container = document.querySelector('.wrap');
        this.calendarElement = document.createElement('div');
        this.calendarElement.className = 'calendar';

        this.renderHeader();
        this.renderCalendar();

        this.container.appendChild(this.calendarElement);
    }

    renderHeader() {

        let header = document.createElement('header');
        let btnLeft = document.createElement('button');
        let btnRight = document.createElement('button');

        header.classList.add('header');
        let span = document.createElement('span');

        let titleText = `${monthNames[this.date.getMonth()]} ${this.date.getFullYear()}`;

        span.innerHTML = titleText;
        document.getElementById('title').innerHTML = titleText;

        btnLeft.changer = -1;
        btnRight.changer = 1;
        btnLeft.classList.add('leftBtn');
        btnRight.classList.add('rightBtn');
        btnLeft.addEventListener('click', this.changeMonth.bind(this));
        btnRight.addEventListener('click', this.changeMonth.bind(this));
        btnLeft.innerHTML = '<';
        btnRight.innerHTML = '>';

        header.appendChild(btnLeft);
        header.appendChild(span);
        header.appendChild(btnRight);

        this.container.appendChild(header);
    }

    renderCalendar() {

        let table = document.createElement('table');
        table.classList.add('table');

        table.appendChild(document.createElement('thead'))
            .appendChild(document.createElement('tr'));

        table.appendChild(document.createElement('tbody'));

        let daysInWeek = 7;
        let weeksInGrid = 6;

        let days = this.calendar.getDaysArray();

        for (let i = 1; i <= daysInWeek; i++) {

            let th = document.createElement('th');

            if (i < weekdaysNames.length) {

                th.innerHTML = weekdaysNames[i];
            } else {

                th.innerHTML = weekdaysNames[0];
            }

            table.children[0].children[0].appendChild(th);
        }

        for (let i = 0; i < weeksInGrid; i++) {

            let tr = document.createElement('tr');
            for (let j = 0; j < daysInWeek; j++) {

                let day = days[i][j];
                let td = document.createElement('td');

                td.innerHTML = day.dayOfMonth;

                if (!day.isActiveDay) {

                    td.classList.add('disabled');
                }

                if (day.isCurrentDay) {

                    td.classList.add('today');
                }

                if (day.isWeekend) {

                    td.classList.add('weekend');
                }

                td.addEventListener('click', this.makeActive.bind(td));

                tr.appendChild(td);
            }

            table.children[1].appendChild(tr);
        }

        this.calendarElement.appendChild(table);

        //console.log(days);
    }

    changeMonth(event) {

        this.date.setMonth(this.date.getMonth() + event.target.changer);
        this.calendar = new Calendar(this.date);

        let parent = document.querySelector('.wrap');
        let childHeader = document.querySelector('.header');
        let childCalendar = document.querySelector('.calendar');

        parent.removeChild(childHeader);
        parent.removeChild(childCalendar);

        this.render();
    }

    makeActive() {

        const oldActiveElements = document.getElementsByClassName('active');

        for (let element of oldActiveElements) {
            element.classList.remove('active');
        }

        this.classList.add('active');
    }
}