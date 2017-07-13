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