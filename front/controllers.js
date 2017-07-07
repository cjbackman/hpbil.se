function loginController ($scope, $rootScope, $stateParams, $state, LoginService) {    
  $scope.formSubmit = function() {
    if(LoginService.login($scope.username, $scope.password)) {
      $scope.error = '';
      $scope.username = '';
      $scope.password = '';
      $state.transitionTo('admin');
    } else {
      $scope.error = "Incorrect username/password !";
    }   
  };
};

angular.module("app.controllers", [])
.controller("LoginController", loginController);