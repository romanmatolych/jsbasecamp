class Calendar {
  constructor(calendar) {
    if (!calendar instanceof HTMLElement) {
      throw new ReferenceError(
        `First argument for ${
          this.constructor.name
        } should be instance of HTMLElement.`
      );
    }

    this.calendar = calendar;

    this.today = new Date();
    this.month = this.today.getMonth();
    this.year = this.today.getFullYear();

    this.locale = navigator.language;
    this.weekdayLength = "short";

    // init
    this.setDayNames();
    this.drawCalendar();
  }

  /**
   * Returns thead tag with month day names
   * @returns {HTMLTableElement}
   */
  getTableHead() {
    const dayNames = this.dayNames; //["пн", "вт", "ср", "чт", "пт", "сб", "нд"];

    const theadTag = document.createElement("thead");
    const tableRow = document.createElement("tr");

    for (let day = 0; day <= 6; day++) {
      const dayNameTag = document.createElement("th");

      dayNameTag.textContent = dayNames[day];
      tableRow.appendChild(dayNameTag);
    }

    theadTag.appendChild(tableRow);

    return theadTag;
  }

  /**
   * Returns tbody tag with month days
   * @param {number} month
   * @param {number} year
   * @returns {HTMLTableElement}
   */
  getTableBody(month = this.month, year = this.year) {
    const offsetDate = this.getWeekStartDate(month, year);

    const tbodyTag = document.createElement("tbody");

    for (let week = 1; week <= 6; week++) {
      const weekTag = document.createElement("tr");

      for (
        let day = 0, date = offsetDate;
        day <= 6;
        day++, date.setDate(date.getDate() + 1)
      ) {
        const dayTag = document.createElement("td");

        if (date.getMonth() !== month) {
          dayTag.classList.add("day-dummy"); // days from prev and next month
        } else {
          dayTag.classList.add("day");
        }

        if (
          date.getFullYear() === this.today.getFullYear() &&
          date.getMonth() === this.today.getMonth() &&
          date.getDate() === this.today.getDate()
        ) {
          dayTag.classList.add("day-today");
        }

        dayTag.textContent = date.getDate();
        weekTag.appendChild(dayTag);
      }

      tbodyTag.appendChild(weekTag);
    }

    tbodyTag.onclick = () => {
      const element = event.target;

      if (element.nodeName === "TD" && element.classList.contains("day")) {
        [...calendar.querySelectorAll(".day-selected")].forEach(day =>
          day.classList.remove("day-selected")
        );
        element.classList.add("day-selected");
      }
    };

    return tbodyTag;
  }

  /**
   * Returns table element with caledar
   * @param {number} month
   * @param {number} year
   * @returns {HTMLTableElement}
   */
  getTable(month = this.month, year = this.year) {
    const table = document.createElement("table");

    const tHead = this.getTableHead();
    const tBody = this.getTableBody(month, year);

    table.appendChild(tHead);
    table.appendChild(tBody);

    return table;
  }

  /**
   * Returns calendar header with current month name and year
   * @returns {HTMLElement}
   */
  getHeader() {
    const header = document.createElement("header");
    header.classList.add("calendar-header");

    const h3 = document.createElement("h3");
    h3.classList.add("month-name");
    h3.textContent = `${new Date(this.year, this.month).toLocaleString(
      this.locale,
      {
        month: "long"
      }
    )} ${this.year}`;

    const prev = document.createElement("button");
    prev.classList.add("prev-month");
    prev.textContent = "➜";

    const next = document.createElement("button");
    next.classList.add("next-month");
    next.textContent = "➜";

    header.appendChild(h3);
    header.appendChild(prev);
    header.appendChild(next);

    prev.onclick = () => this.prevMonth();
    next.onclick = () => this.nextMonth();

    return header;
  }

  /**
   * Draws calendar into DOM
   */
  drawCalendar() {
    const header = this.getHeader();
    const table = this.getTable();

    const calendarWrapper = document.createElement("div");
    calendarWrapper.classList.add("calendar-wrapper");

    calendarWrapper.appendChild(header);
    calendarWrapper.appendChild(table);

    this.calendar.appendChild(calendarWrapper);
  }

  /**
   * Sets date to prev month
   */
  prevMonth() {
    const prevMonthDate = new Date(this.year, this.month - 1);
    this.month = prevMonthDate.getMonth();
    this.year = prevMonthDate.getFullYear();

    this.redrawCalendar();
  }

  /**
   * Sets date to next month
   */
  nextMonth() {
    const nextMonthDate = new Date(this.year, this.month + 1);
    this.month = nextMonthDate.getMonth();
    this.year = nextMonthDate.getFullYear();

    this.redrawCalendar();
  }

  /**
   * Redraws calendar (for next/prev month)
   */
  redrawCalendar() {
    const monthName = new Date(this.year, this.month).toLocaleString(
      this.locale,
      {
        month: "long"
      }
    );

    this.calendar.querySelector("h3").textContent = `${monthName} ${this.year}`;

    this.calendar.querySelector("tbody").remove();
    this.calendar
      .querySelector("table")
      .appendChild(this.getTableBody(this.month, this.year));
  }

  /**
   * Sets array of localised day names
   */
  setDayNames() {
    let startWeekDate = this.getWeekStartDate();

    const dayNames = [];
    for (let day = 0; day <= 6; day++) {
      dayNames.push(
        startWeekDate.toLocaleString(this.locale, {
          weekday: this.weekdayLength
        })
      );
      startWeekDate.setDate(startWeekDate.getDate() + 1);
    }

    this.dayNames = dayNames;
  }

  /**
   * Returns offset date with week start
   * @param {number} month
   * @param {number} year
   * @returns {Date}
   */
  getWeekStartDate(month = this.month, year = this.year) {
    const date = new Date(year, month);

    // if month starts on sunday, we need to get another 6 days (-5)
    // from prev month: -5, -4, -3, -2, -1 and 0
    const offset = date.getDay() === 0 ? -5 : -date.getDay() + 2;

    return new Date(this.year, this.month, offset);
  }
}

// init
const calendarTag = document.getElementById("calendar");
const myCalendar = new Calendar(calendarTag);
