(function () {
	var controller = function ($state, CarService) {
		var ctrl = this;

		ctrl.$onInit = function () {
			CarService.getCars().then(function (resp) {
		      ctrl.cars = resp.data;
		      _.each(ctrl.cars, function (car) {
				CarService.getImages(car.id)
				.then(function (response) {
					car.images = response.data;
				}).catch(function (error) {
					console.warn(error.data.error);
				});
		      });
		      
		      if (ctrl.id) {
		      	ctrl.selectedCar = ctrl.cars.filter(function (c) { return c.id === ctrl.id })[0];
		      }
		    });
		};

		ctrl.selectCar = function (id) {
			$state.go('car', { id: id });
		};

	};

	controller.$inject = ['$state', 'CarService'];

	var component = {
		controller: controller,
		bindings: {
			id: "<"
		},
		templateUrl: 'front/components/cars/cars.html'
	};

	angular.module("cars.module", ["car.module", "carDetail.module"])
		.component("cars", component);
})()