app.controller('headerController',['$scope', 'apiUrl', '$sessionStorage', 'leadSessionStorage',function($scope, apiUrl, $sessionStorage, leadSessionStorage){
    var empTypeData = leadSessionStorage.getUserSession();
    if(empTypeData){
        if(empTypeData.empData){
            $scope.userName = empTypeData.empData.emp_firstname;
        }
    }
    $scope.logout = function(){
        sessionStorage.clear(); 
        window.location = apiUrl.dev + "#/login";
    }
}]);