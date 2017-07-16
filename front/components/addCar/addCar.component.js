(function () {
	var controller = function (CarService) {
		var ctrl = this;

		ctrl.$onInit = function () {
			ctrl.buttonText = ctrl.car ? "Uppdatera bil" : "Lägg till bil";
		};

		ctrl.addCar = function () {

			var completeCar = {
				"brand": "",
				"model": "",
				"year": null,
				"milage": null,
				"color": "",
				"price": null,
				"misc": "",
			};

			_.each(ctrl.car, function (value, key) {
				completeCar[key] = value;
			});

			CarService.editCar(completeCar)
			.then(function (response) {
				ctrl.updateCars();
				ctrl.reset();
				ctrl.car = undefined;
			}).catch(function (error) {
				console.warn(error.data.error);
			});
		};

		ctrl.$onChanges = function (changes) {
			ctrl.buttonText = ctrl.car ? "Uppdatera bil" : "Lägg till bil";
		};

		ctrl.resetCar = function () {
			ctrl.reset();
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
			}
		};
		//Apply methods for dropzone
		//Visit http://www.dropzonejs.com/#dropzone-methods for more methods
		ctrl.dzMethods = {};
		ctrl.removeNewFile = function(){
			ctrl.dzMethods.removeFile(ctrl.newFile); //We got ctrl.newFile from 'addedfile' event callback
		}
		// ************ End Dopzone ************
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