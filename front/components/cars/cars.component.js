(function () {
	var controller = function (BuyService) {
		var ctrl = this;

		ctrl.$onInit = function () {
			BuyService.getCars().then(function (resp) {
		      ctrl.cars = resp.data;
		    });
		};

	};

	controller.$inject = ['BuyService'];

	var component = {
		controller: controller,
		templateUrl: 'front/components/cars/cars.html'
	};

	angular.module("cars.module", ["car.module"])
		.component("cars", component);
})()