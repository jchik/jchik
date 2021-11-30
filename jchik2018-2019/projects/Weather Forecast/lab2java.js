var unit = "metric";
var tempUnit = "°C";
var speedUnit = "meters/sec";

function enterButton(e) {
	e = e || window.event;
    if (e.keyCode == 13)
    {
        document.getElementById('buttonSearch').click();
        return false;
    }
    return true;
}

function startup() {
	//document.getElementById('city').value = "Toronto";
	//search();
	var date = new Date();
	var dayOfWeek = date.getDay();
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	
	if(dayOfWeek < 2) {
		document.getElementById("tomorrowlabel").innerHTML = days[dayOfWeek+1];
		document.getElementById("daytwolabel").innerHTML = days[dayOfWeek+2];
		document.getElementById("daythreelabel").innerHTML = days[dayOfWeek+3];
		document.getElementById("dayfourlabel").innerHTML = days[dayOfWeek+4];
		document.getElementById("dayfivelabel").innerHTML = days[dayOfWeek+5];
	}
	else if (dayOfWeek == 2) {
		document.getElementById("tomorrowlabel").innerHTML = days[dayOfWeek+1];
		document.getElementById("daytwolabel").innerHTML = days[dayOfWeek+2];
		document.getElementById("daythreelabel").innerHTML = days[dayOfWeek+3];
		document.getElementById("dayfourlabel").innerHTML = days[dayOfWeek+4];
		document.getElementById("dayfivelabel").innerHTML = days[0];
	}
	else if (dayOfWeek == 3) {
		document.getElementById("tomorrowlabel").innerHTML = days[dayOfWeek+1];
		document.getElementById("daytwolabel").innerHTML = days[dayOfWeek+2];
		document.getElementById("daythreelabel").innerHTML = days[dayOfWeek+3];
		document.getElementById("dayfourlabel").innerHTML = days[0];
		document.getElementById("dayfivelabel").innerHTML = days[1];
	}
	else if (dayOfWeek == 4) {
		document.getElementById("tomorrowlabel").innerHTML = days[dayOfWeek+1];
		document.getElementById("daytwolabel").innerHTML = days[dayOfWeek+2];
		document.getElementById("daythreelabel").innerHTML = days[0];
		document.getElementById("dayfourlabel").innerHTML = days[1];
		document.getElementById("dayfivelabel").innerHTML = days[2];
	}
	else if (dayOfWeek == 5) {
		document.getElementById("tomorrowlabel").innerHTML = days[dayOfWeek+1];
		document.getElementById("daytwolabel").innerHTML = days[0];
		document.getElementById("daythreelabel").innerHTML = days[1];
		document.getElementById("dayfourlabel").innerHTML = days[2];
		document.getElementById("dayfivelabel").innerHTML = days[3];
	}
	else if (dayOfWeek == 6) {
		document.getElementById("tomorrowlabel").innerHTML = days[0];
		document.getElementById("daytwolabel").innerHTML = days[1];
		document.getElementById("daythreelabel").innerHTML = days[2];
		document.getElementById("dayfourlabel").innerHTML = days[3];
		document.getElementById("dayfivelabel").innerHTML = days[4];
	}
	
	displayTime();
}

function displayUpdate(){
	var refresh = 1000;
	mytime = setTimeout('displayTime()',refresh)
}

function displayTime() {
	var strcount
	var d = new Date()
	var format = d.getMonth()+1 + "/" + d.getDate() + "/" + d.getFullYear(); 
	format = format + " - " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
	document.getElementById("clock").innerHTML = format;
	tt = displayUpdate();
}

function buttonC() {
	unit = "metric";
	//document.getElementById("buttonCelsius").disabled = true;
	// document.getElementById("tomorrowinfo").innerHTML = "°C";
	// document.getElementById("daytwoinfo").innerHTML = "°C";
	// document.getElementById("daythreeinfo").innerHTML = "°C";
	// document.getElementById("dayfourinfo").innerHTML = "°C";
	// document.getElementById("dayfiveinfo").innerHTML = "°C";
	search();
}

function buttonF() {
	unit = "imperial";
	//document.getElementById("buttonFahrenheit").disabled = true;
	// document.getElementById("tomorrowinfo").innerHTML = "°F";
	// document.getElementById("daytwoinfo").innerHTML = "°F";
	// document.getElementById("daythreeinfo").innerHTML = "°F";
	// document.getElementById("dayfourinfo").innerHTML = "°F";
	// document.getElementById("dayfiveinfo").innerHTML = "°F";
	search();
}

function search() {
	currentweather();
	fivedayinfo();	
	hourly();
}

function currentweather() {
	var cwcity = document.getElementById('city').value;
	
	if (unit == "metric") {
		tempUnit = "°C";
		speedUnit = " meters/sec";
	}
	else {
		tempUnit = "°F";
		speedUnit = " miles/hour";
	}
	
	if (cwcity) {
		//var cwurl = "https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=2006fd679ef814eea637308c47c02419&mode=json&units=metric";
		var cwurl = "https://api.openweathermap.org/data/2.5/weather?q=" + cwcity + "&APPID=2006fd679ef814eea637308c47c02419&mode=json&units=" + unit;
		var request = new XMLHttpRequest();
	
		if(window.XMLHttpRequest) {
			request = new XMLHttpRequest();
		}
		else {
			if(window.ActiveXObject) {
				try {
					request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}
	
		request.onreadystatechange = function(){			
			if (request.readyState == 4){
				var jsonObj = JSON.parse(request.responseText);
				document.getElementById("cityname").innerHTML = jsonObj.name;
				document.getElementById("temperature").innerHTML = Math.round(jsonObj.main.temp) + tempUnit;
				document.getElementById("condition").innerHTML = jsonObj.weather[0].main + ": " + jsonObj.weather[0].description + "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.weather[0].icon  + ".png align=middle>";
				document.getElementById("wind").innerHTML = "Wind Speed: " + jsonObj.wind.speed + speedUnit;
				document.getElementById("humidity").innerHTML = "Humidity: " + jsonObj.main.humidity + "%";
			}
		}

		request.open("GET", cwurl, true);
		request.send();
	}
}

function fivedayinfo() {
	var fdcity = document.getElementById('city').value;
	//var url = "https://api.openweathermap.org/data/2.5/forecast/daily?q=Toronto&appid=2006fd679ef814eea637308c47c02419&mode=json&units=metric&cnt=5";
	var fdurl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + fdcity + "&appid=2006fd679ef814eea637308c47c02419&mode=json&units=" + unit + "&cnt=5";
	
	if (unit == "metric") {
		tempUnit = "°C";
		speedUnit = " meters/sec";
	}
	else {
		tempUnit = "°F";
		speedUnit = " miles/hour";
	}
	
	var request = new XMLHttpRequest();
	
	request.onreadystatechange = function(){			
		if (request.readyState == 4){
			var jsonObj = JSON.parse(request.responseText);
			
			document.getElementById("tomorrowinfo").innerHTML = Math.round(jsonObj.list[0].temp.day) + tempUnit;
			document.getElementById("tomorrowcondition").innerHTML = jsonObj.list[0].weather[0].main + ": " + jsonObj.list[0].weather[0].description +  "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[0].weather[0].icon  + ".png align=middle>";
			document.getElementById("tomorrowspeed").innerHTML = "Wind Speed: " + jsonObj.list[0].speed + speedUnit;
			document.getElementById("tomorrowminmax").innerHTML = "Max: " + Math.round(jsonObj.list[0].temp.max) + " | " + "Min: " + Math.round(jsonObj.list[0].temp.min);
			document.getElementById("tomorrowhumidity").innerHTML = "Humidity: " + jsonObj.list[0].humidity + "%";
		
			document.getElementById("daytwoinfo").innerHTML = Math.round(jsonObj.list[1].temp.day) + tempUnit;
			document.getElementById("daytwocondition").innerHTML = jsonObj.list[1].weather[0].main + ": " + jsonObj.list[1].weather[0].description +  "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[1].weather[0].icon  + ".png align=middle>";
			document.getElementById("daytwospeed").innerHTML = "Wind Speed: " + jsonObj.list[1].speed + speedUnit;
			document.getElementById("daytwominmax").innerHTML = "Max: " + Math.round(jsonObj.list[1].temp.max) + " | " + "Min: " + Math.round(jsonObj.list[1].temp.min);
			document.getElementById("daytwohumidity").innerHTML = "Humidity: " + jsonObj.list[1].humidity + "%";
			
			document.getElementById("daythreeinfo").innerHTML = Math.round(jsonObj.list[2].temp.day) + tempUnit;
			document.getElementById("daythreecondition").innerHTML = jsonObj.list[2].weather[0].main + ": " + jsonObj.list[2].weather[0].description +  "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[2].weather[0].icon  + ".png align=middle>";
			document.getElementById("daythreespeed").innerHTML = "Wind Speed: " + jsonObj.list[2].speed + speedUnit;
			document.getElementById("daythreeminmax").innerHTML = "Max: " + Math.round(jsonObj.list[2].temp.max) + " | " + "Min: " + Math.round(jsonObj.list[2].temp.min);
			document.getElementById("daythreehumidity").innerHTML = "Humidity: " + jsonObj.list[2].humidity + "%";
			
			document.getElementById("dayfourinfo").innerHTML = Math.round(jsonObj.list[3].temp.day) + tempUnit;
			document.getElementById("dayfourcondition").innerHTML = jsonObj.list[3].weather[0].main + ": " + jsonObj.list[3].weather[0].description +  "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[3].weather[0].icon  + ".png align=middle>";
			document.getElementById("dayfourspeed").innerHTML = "Wind Speed: " + jsonObj.list[3].speed + speedUnit;
			document.getElementById("dayfourminmax").innerHTML = "Max: " + Math.round(jsonObj.list[3].temp.max) + " | " + "Min: " + Math.round(jsonObj.list[3].temp.min);
			document.getElementById("dayfourhumidity").innerHTML = "Humidity: " + jsonObj.list[3].humidity + "%";
			
			document.getElementById("dayfiveinfo").innerHTML = Math.round(jsonObj.list[4].temp.day) + tempUnit;
			document.getElementById("dayfivecondition").innerHTML = jsonObj.list[4].weather[0].main + ": " + jsonObj.list[4].weather[0].description +  "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[4].weather[0].icon  + ".png align=middle>";
			document.getElementById("dayfivespeed").innerHTML = "Wind Speed: " + jsonObj.list[4].speed + speedUnit;
			document.getElementById("dayfiveminmax").innerHTML = "Max: " + Math.round(jsonObj.list[4].temp.max) + " | " + "Min: " + Math.round(jsonObj.list[4].temp.min);
			document.getElementById("dayfivehumidity").innerHTML = "Humidity: " + jsonObj.list[4].humidity + "%";
		}
	}
	
	request.open("GET", fdurl, true);
	request.send();
}

function hourly() {
	var hcity = document.getElementById('city').value;
	//var url = "https://api.openweathermap.org/data/2.5/forecast?q=Toronto&appid=2006fd679ef814eea637308c47c02419&mode=json&units=metric";
	var hurl = "https://api.openweathermap.org/data/2.5/forecast?q=" + hcity + "&appid=2006fd679ef814eea637308c47c02419&mode=json&units=" + unit;

	if (unit == "metric") {
		tempUnit = "°C";
		speedUnit = " meters/sec";
	}
	else {
		tempUnit = "°F";
		speedUnit = " miles/hour";
	}
	
	var request = new XMLHttpRequest();
	
	request.onreadystatechange = function(){			
		if (request.readyState == 4){
			var jsonObj = JSON.parse(request.responseText);
			
			document.getElementById("time0").innerHTML = (jsonObj.list[0].dt_txt).slice(11,16) + "<br>" + "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[0].weather[0].icon  + ".png> <br>" + jsonObj.list[0].weather[0].main + "<br>"
			+ Math.round(jsonObj.list[0].main.temp) + tempUnit;
			
			document.getElementById("time1").innerHTML = (jsonObj.list[1].dt_txt).slice(11,16) + "<br>" + "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[1].weather[0].icon  + ".png> <br>" + jsonObj.list[1].weather[0].main + "<br>"
			+ Math.round(jsonObj.list[1].main.temp) + tempUnit;
			
			document.getElementById("time2").innerHTML = (jsonObj.list[2].dt_txt).slice(11,16) + "<br>" + "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[2].weather[0].icon  + ".png> <br>" + jsonObj.list[2].weather[0].main + "<br>"
			+ Math.round(jsonObj.list[2].main.temp) + tempUnit;
			
			document.getElementById("time3").innerHTML = (jsonObj.list[3].dt_txt).slice(11,16) + "<br>" + "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[3].weather[0].icon  + ".png> <br>" + jsonObj.list[3].weather[0].main + "<br>"
			+ Math.round(jsonObj.list[3].main.temp) + tempUnit;
			
			document.getElementById("time4").innerHTML = (jsonObj.list[4].dt_txt).slice(11,16) + "<br>" + "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[4].weather[0].icon  + ".png> <br>" + jsonObj.list[4].weather[0].main + "<br>"
			+ Math.round(jsonObj.list[4].main.temp) + tempUnit;
			
			document.getElementById("time5").innerHTML = (jsonObj.list[5].dt_txt).slice(11,16) + "<br>" + "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[5].weather[0].icon  + ".png> <br>" + jsonObj.list[5].weather[0].main + "<br>"
			+ Math.round(jsonObj.list[5].main.temp) + tempUnit;
			
			document.getElementById("time6").innerHTML = (jsonObj.list[6].dt_txt).slice(11,16) + "<br>" + "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[6].weather[0].icon  + ".png> <br>" + jsonObj.list[6].weather[0].main + "<br>"
			+ Math.round(jsonObj.list[6].main.temp) + tempUnit;
						
			document.getElementById("time7").innerHTML = (jsonObj.list[7].dt_txt).slice(11,16) + "<br>" + "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[7].weather[0].icon  + ".png> <br>" + jsonObj.list[7].weather[0].main + "<br>"
			+ Math.round(jsonObj.list[7].main.temp) + tempUnit;
			
			document.getElementById("time8").innerHTML = (jsonObj.list[8].dt_txt).slice(11,16) + "<br>" + "<img src=" + "https://openweathermap.org/img/w/" + jsonObj.list[8].weather[0].icon  + ".png> <br>" + jsonObj.list[8].weather[0].main + "<br>"
			+ Math.round(jsonObj.list[8].main.temp) + tempUnit;
		}
	}
	
		
	request.open("GET", hurl, true);
	request.send();
}