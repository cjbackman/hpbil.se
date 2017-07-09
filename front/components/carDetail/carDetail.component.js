(function () {
	var controller = function () {
		var ctrl = this;
	};

	var component = {
		bindings: {
			car: '<'
		},
		controller: controller,
		templateUrl: 'front/components/carDetail/carDetail.html'
	};

	angular.module("carDetail.module", [])
		.component("carDetail", component);
})()