
  app.controller('chakramController',['$scope', 'chakramService',function($scope, chakramService){
      console.log("**************");
    var vm = this;
    vm.titleName = "lookup Cities";
    vm.popupHeader = "Cities";
    vm.deleteItem = "Cities";
    vm.commonService = chakramService;
    vm.commonServiceById = {};
    vm.schema = {
        type: 'object',
        properties: {
            Url: {type: 'string', title: 'Url'},
            forks_url: {type: 'string', title: 'forks_url'},
            commits_url: {type: 'string', title: 'commits_url'},
            git_push_url: {type: 'string', title: 'git_push_url'}
        }
    };

    vm.gridOptions = {
        columnDefs: [
            {name: 'model-popup', visible: false, isModelPopupOpen: true, deleteField: 'lookup_country'},
            {name: 'Url'},
            {name: 'forks_url',enableFiltering : true,cellClass: 'cellToolTip'},
            {name: 'commits_url'},
            {name: 'git_push_url'}
        ],
        enableGridMenu: false,
        excelfile: 'type.csv',
        PdfHeader: {text: "type List", style: 'headerStyle'}
    };
    vm.form = [
        {
            key: 'Url',
            type: 'textbox',
            placeholder: 'Enter Url'
        },
        {
            key: 'forks_url',
            type: 'textbox',
            placeholder: 'Enter Description'
        },
        {
            key: 'commits_url',
            type: 'textbox',
            placeholder: 'Enter Description'
        },
        {
            key: 'git_push_url',
            type: 'textbox',
            placeholder: 'Enter Region'
        }
    ];
}]).controller('ModalDemoCtrl', function ($scope,$uibModal, $log, $document) {
  
    $scope.open = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'app/directives/views/grids/edit.html'
      });
    
    };
  
  
  
   
  });
  