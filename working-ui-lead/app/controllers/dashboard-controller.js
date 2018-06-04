app.controller('hotPriorityController', ['$scope', '$uibModalInstance',function($scope, $uibModalInstance){



    $scope.ok = function () {
        console.log("CLOse");
        $uibModalInstance.close();
      };
    
      $scope.cancel = function () {
        console.log("cancel");
        $uibModalInstance.dismiss('cancel');
      };

}]);
app.controller('dashboardController', ['$scope', 'apiUrl', 'leadNormalService', 'leadSessionStorage', '$uibModal', function ($scope, apiUrl, leadNormalService, leadSessionStorage, $uibModal) {
    var type = leadSessionStorage.getUserSession();
    //$scope.admin = true;
/*
    $uibModal.open({
        templateUrl: "views/hotPriority.html",
        controller: "hotPriorityController"
      });
*/
    if (type) {
        if (type.empData.emp_type == 3 || type.empData.emp_type == 4) {
            leadNormalService.query().$promise.then(function (data) {
                console.log(data);
                $scope.leadLength = data.length;
            });

        }
    }

    $scope.redirectToLead = function () {
        window.location = apiUrl.dev + "#/leads";
    };
}]);