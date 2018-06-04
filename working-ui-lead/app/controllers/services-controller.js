app.controller('serviceController', ['$scope', 'serviceService', function ($scope, serviceService) {
    var vm = this;
    $scope.leadCreate = false;
    $scope.commonCreate = true;
    vm.titleName = "Services";
    vm.popupHeader = "Services";
    vm.deleteItem = "Services";
    vm.commonService = serviceService;
    vm.commonServiceById = serviceService;
    vm.schema = {
        type: 'object',
        properties: {
            service_name: { type: 'string', title: 'Service Name' },
            service_price: { type: 'string', title: 'Service Price' }
        },
        required: ['service_name', 'service_price']
    };
    vm.gridOptions = {
        columnDefs: [
            { name: 'service_name', displayName: 'Service Name' },
            { name: 'service_price', displayName: 'Service Price' }
        ],
        enableGridMenu: false,
        excelfile: 'type.csv',
        PdfHeader: { text: "type List", style: 'headerStyle' }
    };
    vm.form = [        
        {
            key: 'service_name',
            type: 'textbox',
            placeholder: 'Enter Service Name'
        },
        {
            key: 'service_price',
            type: 'textbox',          
            placeholder: 'Enter Service Price'           
        } 
    ];
}]);
