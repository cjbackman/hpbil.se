(function () {
	var controller = function (CarService) {
		var ctrl = this;

		ctrl.$onInit = function () {
			ctrl.buttonText = ctrl.car ? "Uppdatera bil" : "Lägg till bil";
			if (ctrl.car) {
				ctrl.getImages(ctrl.car.id);
			}
		};

		ctrl.$onChanges = function (changes) {
			ctrl.buttonText = ctrl.car ? "Uppdatera bil" : "Lägg till bil";
			if (ctrl.car) {
				ctrl.getImages(ctrl.car.id);
			}
		};

		// ************ Handle events for dropzone ************
		//Visit http://www.dropzonejs.com/#events for more events
		ctrl.dzCallbacks = {
			'addedfile' : function(file){
				ctrl.newFile = file;
			},
			'successmultiple' : function(file, response){
				ctrl.completeCar["images"] = JSON.parse(response)
				CarService.editCar(ctrl.completeCar)
					.then(function (response) {
						ctrl.updateCars();
						ctrl.reset();
						document.getElementById("addcarForm").reset();
					}).catch(function (error) {
						console.warn(error.data.error);
					});
			},
			'complete' : function (file, response) {
				ctrl.dzMethods.removeAllFiles();
			}
		};

		//Apply methods for dropzone
		//Visit http://www.dropzonejs.com/#dropzone-methods for more methods
		ctrl.dzMethods = {};
		ctrl.removeNewFile = function(){
			ctrl.dzMethods.removeFile(ctrl.newFile); // We got ctrl.newFile from 'addedfile' event callback
		};
		// ************ End Dopzone ************

		ctrl.addCar = function () {
			ctrl.completeCar = {
				"brand": null,
				"model": null,
				"year": "NULL",
				"milage": "NULL",
				"color": null,
				"price": "NULL",
				"misc": null
			};

			_.each(ctrl.car, function (value, key) {
				numericKeys = ["year", "milage", "price"];
				defaultValue = numericKeys.indexOf(key) > -1 ? "NULL" : null;
				ctrl.completeCar[key] = value ? value : defaultValue;
			});

			if (ctrl.dzMethods.getAllFiles().length > 0) {
				ctrl.dzMethods.processQueue();			
			}
			else {
				CarService.editCar(ctrl.completeCar)
					.then(function (response) {
						ctrl.updateCars();
						ctrl.reset();
						document.getElementById("addcarForm").reset();
					}).catch(function (error) {
						console.warn(error.data.error);
					});
			}
		};

		ctrl.resetCar = function () {
			ctrl.reset();
			ctrl.dzMethods.removeAllFiles();
		};

		ctrl.getImages = function (car_id) {
			CarService.getImages(car_id)
			.then(function (resp) {
				ctrl.car.images = resp.data;
			}).catch(function (error) {
				console.warn(error.data.error);
			});
		}

		ctrl.removeImage = function (id) {
			CarService.removeImage(id)
			.then(function (resp) {
				CarService.getImages(ctrl.car.id).then(function (response) {
			      ctrl.car.images = response.data;
			    }).catch(function (error) {
			    	console.warn(error.data.error);
			    });
			}).catch(function (error) {
				console.warn(error.data.error);
			});
		};
	};

	controller.$inject = ['CarService'];

	var component = {
		bindings: {
			car: '<',
			reset: '&',
			updateCars: '&'
		},
		controller: controller,
		templateUrl: 'front/components/addCar/addCar.html'
	};

	angular.module("addCar.module", [])
		.component("addCar", component);
})()