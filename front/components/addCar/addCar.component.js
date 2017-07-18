(function () {
	var controller = function (CarService) {
		var ctrl = this;

		ctrl.$onInit = function () {
			ctrl.buttonText = ctrl.car ? "Uppdatera bil" : "Lägg till bil";
		};

		ctrl.$onChanges = function (changes) {
			ctrl.buttonText = ctrl.car ? "Uppdatera bil" : "Lägg till bil";
		};

		// ************ Handle events for dropzone ************
		//Visit http://www.dropzonejs.com/#events for more events
		ctrl.dzCallbacks = {
			'addedfile' : function(file){
				console.log(file);
				ctrl.newFile = file;
			},
			'success' : function(file, xhr){
				console.log(file, xhr);
			},
			'complete' : function (file) {
				ctrl.dzMethods.removeAllFiles();
			}
		};
		//Apply methods for dropzone
		//Visit http://www.dropzonejs.com/#dropzone-methods for more methods
		ctrl.dzMethods = {};
		ctrl.removeNewFile = function(){
			ctrl.dzMethods.removeFile(ctrl.newFile); //We got ctrl.newFile from 'addedfile' event callback
		}
		// ************ End Dopzone ************

		ctrl.addCar = function () {
			var completeCar = {
				"brand": null,
				"model": null,
				"year": null,
				"milage": null,
				"color": null,
				"price": null,
				"misc": null
			};

			_.each(ctrl.car, function (value, key) {
				completeCar[key] = value;
			});

			CarService.editCar(completeCar)
			.then(function (response) {
				ctrl.dzMethods.processQueue();
				ctrl.updateCars();
				ctrl.reset();
				document.getElementById("addcarForm").reset();
			}).catch(function (error) {
				console.warn(error.data.error);
			});
		};

		ctrl.resetCar = function () {
			ctrl.reset();
			ctrl.dzMethods.removeAllFiles();
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