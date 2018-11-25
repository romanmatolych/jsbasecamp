var Calendar=function() //calendar class
{
	this.Months=["January", "February", "March","April", "May", 
	"June","July", "August", "September","October", "November", 
	"December"];

	this.date=new Date();
	this.currentYear=this.date.getFullYear();
	this.currentMonth=this.date.getMonth();
	this.currentDay=this.date.getDate();
	this.WEEKS_COUNT=5;
	this.DAYS_COUNT=7;

	this.showCalendar=function() //function that displays calendar
	{	
		var isnow=false; //bool check if there's today's date in displayed month
		if(this.date.getMonth()==new Date().getMonth() && this.date.getFullYear()==new Date().getFullYear()) isnow=true;

		this.WEEKS_COUNT=5;	//setting standart number of weeks
		document.querySelector(".calendarInfo").textContent=this.Months[this.currentMonth]+this.currentYear; //display month and year

		document.querySelector(".Cbody").remove(); //remove previously displayed month

		var startDate=this.date; //var with which we'll get length of month
		startDate.setDate(1);

		var prevDate=new Date(); //var with which we'll get length of previous month
		prevDate.setMonth(this.date.getMonth()-1);
		if(prevDate.getMonth()<0) prevDate.setMonth(11);
		var prev=getLastDayOfMonth(prevDate);

		var data=document.createElement('Cbody'); //creating new calendar
		data.className='Cbody';

		var count=(getLastDayOfMonth(this.date)); //var with length of month
		var iter=0, start=startDate.getDay();

		var iter2=prev-start+2; //number of previous month days to display

			let zz=document.createElement('tr'); 
			zz.className="daysRow";
			for (var j=0; j<this.DAYS_COUNT; ++j)
			{
				let zzz=document.createElement('th');
				zzz.onclick=function(){ //adding onclick for <th>
					let selected=document.querySelector(".selected");
                    if(selected){
                        selected.classList.remove('selected');//remove old selection
                    }
             		
             		if(!this.classList.contains("inactive"))//inactive items shouldn't be selected
                    this.classList.add("selected");
				}

				if(j<start-1) //checking if current month started
				{
					zzz.className+="inactive";
					zzz.textContent=iter2.toString();
					iter2++;
				}
				else 
				{
					iter++;
					zzz.textContent=iter.toString();
				}
				if(j%7==6) zzz.className+="weekend"; //checking for weekend day
				zz.append(zzz);
			}
			data.appendChild(zz);
		//adding first row with days from previous month


		for(var i=0; i<this.WEEKS_COUNT-1; ++i) //adding other days
		{
			var temp=1;
			let ff=document.createElement('tr');
			ff.className="daysRow";
			for (var j=0; j<this.DAYS_COUNT; ++j)
			{
				iter++;
				let fff=document.createElement('th');
				fff.onclick=function(){
					let selected=document.querySelector(".selected");
                    if(selected){
                        selected.classList.remove('selected');//remove old selection
                    }
             		
             		if(!this.classList.contains("inactive")) //inactive items shouldn't be selected
                    this.classList.add("selected");
				}
				if (iter<=count)
					fff.textContent=iter.toString();
				else
				{
					fff.classList.add("inactive");
					fff.textContent=temp; temp++;
				}
			    if(j%7==6) fff.classList.add("weekend");
				ff.append(fff);
				if(i==this.WEEKS_COUNT-2 && j==this.DAYS_COUNT-1 && iter<count) //checking if standart number of weeks is enough
					this.WEEKS_COUNT++;
				if(isnow && iter==new Date().getDate())
					fff.classList.add("today");
			}
			data.append(ff);
		document.querySelector('.container').append(data);
		}
		
	}

	this.NextMonth=function()
	{
		if(this.currentMonth==11)
		{
			this.currentMonth=0;
			this.currentYear++;
		}
		else this.currentMonth++;

		this.date.setMonth(this.currentMonth);
		this.date.setFullYear(this.currentYear);
		this.date.setDate(1);
		this.showCalendar();
	}

	this.PrevMonth=function()
	{
		if(this.currentMonth==0)
		{
			this.currentMonth=11;
			this.currentYear--;
		}
		else this.currentMonth--;

		this.date.setMonth(this.currentMonth);
		this.date.setFullYear(this.currentYear);
		this.date.setDate(1);
		this.showCalendar();
	}
}

function getLastDayOfMonth(date) { //function returns number of days in a month
	var month=date.getMonth();
	var year=date.getFullYear();
  var date = new Date(year, month + 1, 0);
  return date.getDate();
}

window.onload=function(){
	var a=new Calendar();
	a.showCalendar();

	document.getElementById('nextButton').onclick=function(){
		a.NextMonth();
	}

	document.getElementById('prevButton').onclick=function(){
		a.PrevMonth();
	}
}