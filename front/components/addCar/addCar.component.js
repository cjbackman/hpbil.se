(function () {
	var controller = function (CarService) {
		var ctrl = this;

		ctrl.$onInit = function () {
			ctrl.buttonText = ctrl.selectedCar ? "Uppdatera bil" : "Lägg till bil";
		};

		ctrl.$onChanges = function (changes) {
			console.log(changes);
		};

		ctrl.addCar = function () {
			console.log(ctrl.car);
		};

		ctrl.reset = function () {
			ctrl.selectedCar = undefined;
		};

		//Handle events for dropzone
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

	};

	controller.$inject = ['CarService'];

	var component = {
		bindings: {
			selectedCar: '<'
		},
		controller: controller,
		templateUrl: 'front/components/addCar/addCar.html'
	};

	angular.module("addCar.module", [])
		.component("addCar", component);
})()