app.controller('loginController', ['$scope', 'loginService', 'apiUrl', 'leadSessionStorage', 'growl', 'serviceService', 'serviceStoarage', function ($scope, loginService, apiUrl, leadSessionStorage, growl, serviceService, serviceStoarage) {

  $scope.submit = function () {
    if (angular.isUndefined($scope.userName) === true || !$scope.userName || angular.isUndefined($scope.password) === true || !$scope.password) {
      growl.error("Invalid Credentials", {});
    } else {
      loginService.create({ emp_email: $scope.userName, emp_pwd: $scope.password }).$promise.then(function (data) {
        console.log(data);
        if (data.status === 404)
          growl.error("You Are Not Registered", {});
        else {
          serviceService.show().$promise.then(function (serviceData) {
            var i;
            for (i = 0; i < serviceData.length; i++) {
              serviceData[i].name = serviceData[i]['service_name'];
              delete serviceData[i].service_name;
              delete serviceData[i].service_price;
              delete serviceData[i].created_date;
              delete serviceData[i].modify_date;
              delete serviceData[i].$$hashKey
            }    
            serviceStoarage.addServices(serviceData);       
          });

          window.location = apiUrl.dev + "#/dashboard";
          leadSessionStorage.addUserSession(data);
        }
      }, function (err) {
        growl.error("Server Issue", {});

      });
    }
  }

  $scope.redirectToRegister = function () {
    window.location = apiUrl.dev + "#/register";
  }
}]);