globals = {
	pageURL: "pages/",
	currentCar: null
}

function requestContent (selection, file) {
	//Load file
	$(selection).load(globals.pageURL + file + ".html", function () {
		if (file == "cars") {
	        //Toggle selected car
	        $(".car-link").on("click", toggleCar);
    	}
	});

	//Update URL
	//history.pushState(null, null, globals.pageURL + file + ".html");

}

function getOpeningHours () {
	var weekend = isWeekend();
	if (weekend)
		return "Stängt";
	else 
		return "08:00 - 17:00";
}

function isWeekend () {
	var today = new Date().getDay();
	return ((today == 0) || (today == 6)) ? true : false;
}

function toggleCar (e) {
	var car = this.getAttribute("data-car");

	if (!globals.currentCar) {
		//Toggle new
		globals.currentCar = car;
		$(this).children().css("border", "2px solid steelblue");
		$("#details-" + car).slideToggle("slow");
	}
	
	else if (globals.currentCar && globals.currentCar == car) {
		//Remove old
		$("#link-" + globals.currentCar).children().css("border", "");
		$("#details-" + globals.currentCar).slideToggle("slow");
		globals.currentCar = null;
	}

	else if (globals.currentCar && globals.currentCar != car) {
		//Remove old
		$("#link-" + globals.currentCar).children().css("border", "");
		$("#details-" + globals.currentCar).slideToggle("fast", function () {
			//Toggle new
			globals.currentCar = car;
			$("#link-" + globals.currentCar).children().css("border", "2px solid steelblue");
			$("#details-" + globals.currentCar).slideToggle("slow");
		});
	}

	e.preventDefault();
}