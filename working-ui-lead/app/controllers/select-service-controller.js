app.controller('selectServiceController', ['$scope', 'serviceFullStoarage', '$uibModalInstance', function ($scope, serviceFullStoarage, $uibModalInstance) {
    $scope.selectServices = serviceFullStoarage.getFullServices();    
    console.log($scope.selectServices);
    $scope.ok = function () {

    }

    $scope.cancel = function () {

    }
    $scope.GetValue = function () {
        var selectedServices = "";
        var count = 0;
        for (var i = 0; i < $scope.selectServices.length; i++) {
            console.log($scope.selectServices[i].selected);
            if ($scope.selectServices[i].selected) {                
                var serviceName = $scope.selectServices[i].service_name;
                selectedServices += serviceName + " , ";
                count = count + $scope.selectServices[i].service_price;
            }
        }
        console.log(count);
        selectedServices = selectedServices.substring(0, selectedServices.length - 2);
        $scope.itemsSelected = selectedServices;
        $scope.invoiceValue = count ;
        var data = {item:$scope.itemsSelected, invoice :$scope.invoiceValue , invoiceTemp :$scope.invoiceValue}
        $uibModalInstance.close(data);
    }

}]);