(function () {
	var controller = function () {
		var ctrl = this;

		ctrl.numFormatter = function (num, currency) {
			formatted_number = num ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') : '';
			formatted_number = (num && currency) ? formatted_number + ':-' : formatted_number;
			return formatted_number
		}
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