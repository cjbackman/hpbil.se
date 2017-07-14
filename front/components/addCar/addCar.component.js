(function () {
	var controller = function (CarService) {
		var ctrl = this;

		ctrl.$onInit = function () {
			ctrl.buttonText = ctrl.car ? "Uppdatera bil" : "Lägg till bil";
		};

		ctrl.addCar = function () {
			console.log(ctrl.car);
		};

		ctrl.$onChanges = function (changes) {
			ctrl.buttonText = ctrl.car ? "Uppdatera bil" : "Lägg till bil";
		};

		ctrl.reset = function () {
			ctrl.car = undefined;
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
			car: '<'
		},
		controller: controller,
		templateUrl: 'front/components/addCar/addCar.html'
	};

	angular.module("addCar.module", [])
		.component("addCar", component);
})()