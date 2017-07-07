(function () {
	var controller = function () {
		var ctrl = this;
	};

	var component = {
		bindings: {
			car: '<'
		},
		controller: controller,
		templateUrl: 'front/components/car/car.html'
	};

	angular.module("car.module", [])
		.component("car", component);
})()