(function () {
	var controller = function () {
		var ctrl = this;
	};

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