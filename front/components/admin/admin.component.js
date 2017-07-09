(function () {
	var controller = function ($state, AuthService) {
		var ctrl = this;

		ctrl.$onInit = function () {
			AuthService.isValid()
			.then(function (response) {
				if (response && response.data.error) {
					$state.go("start");
				}
			})
			.catch(function (error) {
				$state.go("start");
			});
		};

		ctrl.logOut = function () {
			AuthService.Logout();
			$state.go("start");
		};
	};

	controller.$inject = ['$state', 'AuthService'];

	var component = {
		controller: controller,
		templateUrl: 'front/components/admin/admin.html'
	};

	angular.module("admin.module", [])
		.component("admin", component);
})()