var table = document.getElementById("table");
var thead = document.getElementsByTagName("thead");
var daysRow = document.getElementById("daysRow");//tr 
var tbody = document.querySelector("tbody");
var clearButton = document.createElement("button");
clearButton.classList.add("footerButtons");
clearButton.textContent = "Clear all selected";
var footer = document.querySelector("footer");

class  Calendar {

  constructor(){
    this.date = new Date();
    this.locale = navigator.language;
  }

  call(){
    this.drawCalendar();
    this.updateCalendar();
  }

  updateCalendar() {
    let calHeader = document.querySelector(".calHeader");
    calHeader.style.color = "#ffffff";
    calHeader.textContent = this.date.toLocaleString(this.locale, { year: "numeric", month: "long" });
    
    document.querySelector("#scrollPrevious").onclick = () =>{
      tbody.innerHTML = "";
      this.date.setMonth(this.date.getMonth() - 1);
      this.call();
    }
    document.querySelector("#scrollNext").onclick = () =>{
      tbody.innerHTML = "";
      this.date.setMonth(this.date.getMonth() + 1);
      this.call();
    } 
  }
  
  drawCalendar(){
    const One_Collumn = 6;
    const Days_In_Week = 7;
    let date = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    let dates = [];
  
    do{
      let current = new Date(date);
      date.setDate(date.getDate() + 1);
      dates.push(current);
    }while(date.getMonth() === this.date.getMonth());

    do{
      let first = new Date(dates[0].valueOf());
      first.setDate(first.getDate() - 1);
      dates.unshift(first);
    }while(dates[0].getDay() !== 0);
  
    for(let d = dates.length; d < One_Collumn*Days_In_Week; d++){
      let last = new Date(dates[d-1].valueOf());
      last.setDate(last.getDate() + 1);
      dates.push(last);
    }

    for (let i = 0; i < One_Collumn; i++){
      let tr = document.createElement("tr");
      
      for (let j = 0; j < Days_In_Week; j++){
        let td = document.createElement("td");
    
        let currentDate = dates[i * Days_In_Week + j];
        
        if (currentDate.getMonth() !== this.date.getMonth()) td.style.color= '#53576b';
        if(j === 0) td.style.color= '#bb1150';
        if (currentDate.toDateString() === new Date().toDateString()) td.classList.add("today"); 
        
        td.addEventListener("click", event => {
          if(currentDate.getMonth() !== this.date.getMonth()){
            event.target.bgColor= "transparent"; 
          }else{
            event.target.classList.toggle('selected');
          }
        }, false);

        footer.appendChild(clearButton);

        clearButton.addEventListener("click", () => {
          if(td.classList.contains('selected')) td.classList.remove('selected');
        }, false);

        td.textContent = currentDate.getDate();
        tr.appendChild(td);

      }

      tbody.appendChild(tr);
    }
    
  }

}

window.onload = function(){
  let calendar = new Calendar;
  calendar.call();
}
