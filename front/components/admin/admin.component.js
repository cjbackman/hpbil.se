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
		    }).catch(function (response) {
		    	if (response) {
		    		console.warn(response.data.error);
		    	}
		    });
		};

		ctrl.logout = function () {
			AuthService.Logout();
		};
	};

	controller.$inject = ['$state', 'AuthService', 'CarService'];

	var component = {
		controller: controller,
		templateUrl: 'front/components/admin/admin.html'
	};

	angular.module("admin.module", [])
		.component("admin", component);
})()