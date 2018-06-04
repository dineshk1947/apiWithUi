app.controller('leadController', ['$scope', 'leadService', 'apiUrl', 'leadSessionStorage', '$state', 'serviceFullStoarage', 'serviceService', 'uiGridConstants', function ($scope, leadService, apiUrl, leadSessionStorage, $state, serviceFullStoarage, serviceService, uiGridConstants) {
    var empTypeData = leadSessionStorage.getUserSession();
    $scope.leadCreate = true;
    $scope.commonCreate = false;
    
    $scope.addLead = function(){
        $state.go('app.lead');;
    }
    serviceService.show().$promise.then(function (data) {
        //$scope.fullServices = data;
        angular.forEach(data, function(value, key) {        
            value.selected = JSON.parse(value.selected);
          });
          console.log("**********");
          console.log(data);
        serviceFullStoarage.addFullServices(data);
    });
    var vm = this;
    vm.titleName = "Lead Details";
    vm.popupHeader = "Lead";
    vm.deleteItem = "Lead";
    vm.commonService = leadService;
    vm.commonServiceById = leadService;
    vm.schema = {
        type: 'object',
        properties: {
            emp_firstname:{type: 'string', title: 'Name'},
            lead_firstname: { type: 'string', title: 'First Name' },            
            lead_lastname: { type: 'string', title: 'Last Name' },
            lead_email: { type: 'string', title: 'Email Id' },
            lead_mobile: { type: 'string', title: 'Mobile No' },
            lead_address: { type: 'string', title: 'Address' },
            lead_budget: { type: 'string', title: 'Budget' },
            lead_asign_to: { type: 'string', title: 'Lead Assign To' },
            lead_invoice: { type: 'string', title: 'Invoice' },
            lead_discount: { type: 'string', title: 'Discount' },
            lead_service_req: { type: 'string', title: 'Service req' },
            lead_final_service_req:{ type: 'string', title: 'Final request' },
            lead_status: { type: 'string', title: 'Status' },            
            lead_date_of_service: { type: 'string', title: 'Service Date' }
        }
    };
    

    vm.gridOptions = {
        useExternalSorting: true,
        sortInfo:{ names: ['lead_date_of_service'], directions: ['dsc']},
        columnDefs: [
            { name: 'emp_firstname', displayName: 'Emp Name',redirectButton:true, search:{id:empTypeData.empData.id , emp_type:empTypeData.empData.emp_type} },
            { name: 'lead_firstname', displayName: 'First Name' }, 
            { name: 'lead_lastname', displayName: 'Last Name' },            
            { name: 'lead_email', displayName: 'Email Id', enableFiltering: true },
            { name: 'lead_mobile', displayName: 'Mobile No.' },
            { name: 'lead_address', displayName: 'Address' },
            { name: 'lead_budget', displayName: 'Budget' },
            { name: 'lead_asign_to', displayName: 'Lead Assign To' },
            { name: 'lead_invoice', displayName: 'Invoice' },
            { name: 'lead_discount', displayName: 'Discount' },
            { name: 'lead_service_req', displayName: 'Service req' },
            { name: 'lead_final_service_req', displayName: 'Final Request' },
            { name: 'lead_status', displayName: 'Status' },            
            { name: 'lead_date_of_service', displayName: 'Service Date', sort: { direction: uiGridConstants.DESC, priority: 0 }}
        ],
        //enableGridMenu: false,
        excelfile: 'type.csv',
        PdfHeader: { text: "type List", style: 'headerStyle' }
    };
    if(empTypeData){
        if(empTypeData.empData){
            if(empTypeData.empData.emp_type === 2){                
                vm.gridOptions.columnDefs[0].visible  = false;                
            }
        }
    }
    vm.form = [
        {
            key: 'emp_firstname',
            type: 'textbox',           
            placeholder: 'Enter Lead Name'
        },
        {
            key: 'lead_firstname',
            type: 'textbox',
            placeholder: 'Enter Lead Name'
        },
        {
            key: 'lead_email',
            type: 'textbox',
            placeholder: 'Enter email'
        },
        {
            key: 'lead_mobile',
            type: 'textbox',
            placeholder: 'Enter Mobile No.'
        },
        {
            key: 'lead_address',
            type: 'textbox',
            placeholder: 'Enter address'
        },
        {
            key: 'lead_budget',
            type: 'textbox',
            placeholder: 'Enter Budget'
        },
        {
            key: 'lead_service_req',
            type: 'textbox',
            placeholder: 'Enter Service Requested'
        },
        {
            key: 'lead_status',
            type: 'textbox',
            placeholder: 'Enter Lead Status'
        },
        {
            key: 'lead_date_of_service',
            type: 'textbox',
            placeholder: 'Enter Lead Service Date'
        }
    ];

}])