(function () {
	var controller = function ($state, LoginService) {
		var ctrl = this;

		ctrl.formSubit = function () {
			LoginService.Login($ctrl.username, $ctrl.password)
			.then(function (response) {
				console.log(response);
			});
		};
	};

	controller.$inject = ['$state', 'LoginService'];

	var component = {
		controller: controller,
		templateUrl: 'front/components/login/login.html'
	};

	angular.module("login.module", [])
		.component("login", component);
})()