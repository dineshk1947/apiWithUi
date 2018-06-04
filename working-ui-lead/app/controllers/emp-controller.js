app.controller('empController', ['$scope', 'empService', 'uiGridConstants', function ($scope, empService, ) {
    var vm = this;
    $scope.leadCreate = false;
    $scope.commonCreate = true;
    vm.type = [{ id: 2, value: 'Event Manager' }, { id: 3, value: 'Back Office' }, { id: 4, value: 'BSM' }];
    vm.titleName = "Employer Details";
    vm.popupHeader = "Employer";
    vm.deleteItem = "Employer";
    vm.commonService = empService;
    vm.commonServiceById = empService;
    vm.schema = {
        type: 'object',
        properties: {
            emp_firstname: { type: 'string', title: 'First Name' },
            emp_lastname: { type: 'string', title: 'Last Name' },
            emp_mailid: { type: 'string', title: 'Email Id' },
            emp_mobileno: { type: 'string', title: 'Mobile No' },
            emp_pwd: { type: 'string', title: 'Password' },
            emp_address: { type: 'string', title: 'Address' },
            emp_type: { type: 'string', title: 'Type' },
            status: { type: 'string', title: 'Status' }
        },
        required: ['emp_firstname', 'emp_lastname', 'emp_mailid', 'emp_mobileno', 'emp_pwd', 'emp_address', 'emp_type', 'status']
    };

    vm.gridOptions = {
        columnDefs: [
            { name: 'emp_firstname', displayName: 'First Name' },
            { name: 'emp_lastname', displayName: 'Last Name' },
            { name: 'emp_mailid', displayName: 'Email Id', enableFiltering: true },
            { name: 'emp_mobileno', displayName: 'Mobile No.' },
            { name: 'emp_pwd', displayName: 'Password' },
            { name: 'emp_address', displayName: 'Address' },
            { name: 'emp_type', displayName: 'Type' },
            {
                name: 'status', displayName: 'Status'
            }
        ],
        //enableGridMenu: false,
        excelfile: 'type.csv',
        PdfHeader: { text: "type List", style: 'headerStyle' }
    };
    vm.form = [
        {
            key: 'emp_firstname',
            type: 'textbox',
            placeholder: 'Enter First Name'
        },
        {
            key: 'emp_lastname',
            type: 'textbox',
            placeholder: 'Enter Last Name'
        },
        {
            key: 'emp_mailid',
            type: 'textbox',
            placeholder: 'Enter Email Id'
        },
        {
            key: 'emp_mobileno',
            type: 'textbox',
            placeholder: 'Enter Mobile No.'
        },
        {
            key: 'emp_pwd',
            type: 'textbox',
            placeholder: 'Enter Password No.'
        },
        {
            key: 'emp_address',
            type: 'textbox',
            placeholder: 'Enter Address'
        },
        {
            key: 'emp_type',
            type: 'select',
            placeholder: 'Enter Type',
            titleMap: [
                { "value": 'EventManager', "name": 'EventManager' },
                { "value": 'BSM', "name": 'BSM' },
                { "value": 'BackOffice', "name": 'BackOffice' }
            ]
        },
        {
            key: 'status',
            type: 'select',
            placeholder: 'Enter Status',
            titleMap: [
                { "value": 'Active', "name": 'Active' },
                { "value": 'Inactive', "name": 'Inactive' }
            ]
        }
    ];
}])


    .filter('mapRole', function () {
        var genderHash = {
            2: 'Event Manager',
            3: 'Back Office',
            4: 'BSM'
        };

        return function (input) {
            if (!input) {
                return '';
            } else {
                return genderHash[input];
            }
        };
    });


