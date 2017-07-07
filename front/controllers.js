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

function buyController ($scope, BuyService) {
    var data = BuyService();
    console.log(data);
};