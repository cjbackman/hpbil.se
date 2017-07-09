(function () {
	var controller = function ($state, AuthService) {
		var ctrl = this;

		ctrl.formSubmit = function () {
			AuthService.Login(ctrl.username, ctrl.password)
			.then(function (response) {
				if (response && response.error) {
					ctrl.error = response.error;
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