app.controller('sidebarController',['$scope', 'apiUrl', 'leadSessionStorage',function($scope, apiUrl, leadSessionStorage){    
    var type = leadSessionStorage.getUserSession();
    //$scope.admin = true;
    if(type){
        if(type.empData){
            if(type.empData.emp_type === 1){
              $scope.admin = true;
            }
        }
    }
    $scope.logout = function(){
        sessionStorage.clear(); 
        window.location = apiUrl.dev + "#/login";
    }    
}]);