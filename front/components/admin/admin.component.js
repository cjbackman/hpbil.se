(function () {
	var controller = function () {
		var ctrl = this;
	};

	var component = {
		controller: controller,
		templateUrl: 'front/components/admin/admin.html'
	};

	angular.module("admin.module", [])
		.component("admin", component);
})()