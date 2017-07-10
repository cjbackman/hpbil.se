(function () {
	var controller = function ($state, AuthService) {
		var ctrl = this;

		ctrl.$onInit = function () {
			AuthService.isValid()
			.then(function (response) {
				if (response && !response.data.error) {
					$state.go("admin");
				}
			});
		};

		ctrl.formSubmit = function () {
			AuthService.Login(ctrl.username, ctrl.password)
			.then(function (response) {
				if (response && response.data.error) {
					ctrl.error = response.data.error;
				}
			});
		};
	};

	controller.$inject = ['$state', 'AuthService'];

	var component = {
		controller: controller,
		templateUrl: 'front/components/login/login.html'
	};

	angular.module("login.module", [])
		.component("login", component);
})()