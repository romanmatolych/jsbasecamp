/**Class representing a calendar */
class Calendar {
	/**
	 *Creates an instance of Calendar.
	 * @param {String} elem - calendar container
	 * @memberof Calendar
	 */
	constructor(elem) {
		this.elem = elem;
      
	// Days of week, starting on Monday
		this.daysNames = [
	  		"Mon",
	  		"Tue",
	  		"Wed",
	  		"Thu",
	  		"Fri",
			"Sat", 
			"Sun"
		];
  
		this.monthsNames = [
			"January",
			"February",
			"March", 
			"April",
			"May", 
			"June",
			"July", 
			"August",
			"September",
			"October",
			"November", 
			"December"
		];
  
		// Set the current day, month, year
		this.now = new Date();
  		this.currentMonth = this.now.getMonth();
		this.currentYear = this.now.getFullYear();
		this.currentDay = this.now.getDate();//highlight current day
	};
	
	/**
 	* Go to the next month
 	*
 	* @memberof Calendar
 	*/
	next() {
		if (this.currentMonth == 11) {
				this.currentMonth = 0;
				this.currentYear = this.currentYear + 1;
		} else {
			this.currentMonth = this.currentMonth + 1;
		}
		  this.renderCalendar();
	};
	  
	/**
	 * Go to the previous month
	 *
	 * @memberof Calendar
	 */
	previous () {
		if (this.currentMonth == 0 ) {
				this.currentMonth = 11;
				this.currentYear = this.currentYear - 1;
		}  else {
			this.currentMonth = this.currentMonth - 1;
		}
			this.renderCalendar();
	};

	/**
	 * Render calendar
	 *
	 * @memberof Calendar
	 */
	renderCalendar() {
		this.createCalendarBody(this.currentYear, this.currentMonth);
	};

	 /**
 	 *  Write calendar for current month
 	 *
  	 * @param {Number} year
  	 * @param {Number} month
  	 * @memberof Calendar
  	 */
	createCalendarBody(year, month) {
		// Get calendar container
		let cal = document.getElementById(this.elem);

	  	// Clear all previous cells
		cal.innerHTML = "";

		// Write current month
		let h3 = document.createElement("h3");
		cal.appendChild(h3);
		h3.innerHTML = this.monthsNames[month] + " " + year;

		let table = document.createElement("table");
		cal.appendChild(table);

		// Write the header of the days of the week
		let days = document.createElement("tr");
		for(let i = 0; i < this.daysNames.length;i++) {
			let th = document.createElement("th");
				if (i === 5 || i === 6) {
					th.classList.add("weekend");
		    	};
			th.innerHTML = this.daysNames[i];
			days.appendChild(th);
			};
		table.appendChild(days);

		// Create container for month data
		let tbody = document.createElement("tbody");
		table.appendChild(tbody);

		// Output month data
		let date = new Date();
		// Get first day of the month
		let lastDay = new Date(year, month + 1, 0).getDate();
		// Get last day of the month
		let firstDay = new Date(year, month).getDay();
		
		// Counters
		let q = 1;
		let v = 1;

		for (let i = 0; i < 6; i++) {
			let tr = document.createElement("tr");
			for (let n = 0; n < 7; n++) {
				let td = document.createElement("td");
				if (n === 5 || n === 6) {
					td.classList.add("weekend");
				}
				if ((q >= firstDay) && (v <= lastDay)) {
					td.textContent = v;
					v++;
				} else {
				td.textContent = " ";
				td.classList.add("clear");
				}
				if(v - 1 === this.currentDay && month === date.getMonth() && year === date.getFullYear()) {
					td.classList.add("today");
				};
				tr.appendChild(td);
				q++;

				// Highlight cell onclick
				td.addEventListener('click', function(e) {
					if (td.classList.contains("today")) {
						e.target.bgColor = "transparent";
					} else {
						let elems = document.querySelectorAll(".active");
  						[].forEach.call(elems, function(el) {
   							 el.classList.remove("active");
  						});
 						 e.target.className = "active";
					}
				})
			};
			tbody.appendChild(tr);
		};
	};
};

/**
* Create calendar onload
*
*/
window.onload = function() {
// Start calendar
	let c = new Calendar("calendar");			
	c.renderCalendar();

// Call previous() and next() methods on button click
	document.getElementById("next").onclick = function() {
		c.next();
	};
	document.getElementById("prev").onclick = function() {
		c.previous();
	};
};


  
