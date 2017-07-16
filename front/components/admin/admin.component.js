(function () {
	var controller = function ($state, AuthService, CarService) {
		var ctrl = this;

		ctrl.$onInit = function () {
			AuthService.isValid()
			.then(function (response) {
				if (response && response.data.error) {
					$state.go("login");
				}
			})
			.catch(function (error) {
				$state.go("login");
			});

			CarService.getCars().then(function (response) {
		      ctrl.cars = response.data;
		    }).catch(function (error) {
		    	if (response) {
		    		console.warn(error.data.error);
		    	}
		    });
		};

		ctrl.logout = function () {
			AuthService.Logout();
		};

		ctrl.removeCar = function (car) {
			var id = car.id;
			var idx = _.findIndex(ctrl.cars, {'id': id});

			CarService.removeCar(id)
			.then(function (response) {
				if (idx > -1) {
					ctrl.cars.splice(idx,1);
				}
				else {
					console.warn("Car with id " + id + " not found.");
				}
			}).catch(function (error) {
				console.warn(error.data.error);
			});
		};

		ctrl.editCar = function (car) {
			ctrl.selectedCar = car;
		};

		ctrl.reset = function () {
			console.log("Admin resetcar")
			ctrl.selectedCar = undefined;
		};
	};

	controller.$inject = ['$state','AuthService', 'CarService'];

	var component = {
		controller: controller,
		templateUrl: 'front/components/admin/admin.html'
	};

	angular.module("admin.module", ["addCar.module"])
		.component("admin", component);
})()