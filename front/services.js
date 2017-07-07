function loginService ($http) {
    $http.get("../../backend/auth.php")
    .then(function (response) {
		var admin = response.data.records.username;
		var pass = response.data.records.password;
		var isAuthenticated = false;

		return {
		  login : function(username, password) {
		    isAuthenticated = username === admin && password === pass;
		    return isAuthenticated;
		  },
		  isAuthenticated : function() {
		    return isAuthenticated;
		  }
		};
    });
};

function buyService ($http) {
	return {
		getCars: function () {
			return $http.get("../../backend/getCars.php")
				.then(function (response) {
					return response;
			});
		}
	}
};

angular.module("app.services", [])
.factory("BuyService", buyService)
.factory("LoginService", loginService);