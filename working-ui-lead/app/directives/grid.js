
app
    .controller('avGridRowEditController', avGridRowEditController)
    .controller('avGridRowDeleteController', avGridRowDeleteController)
    .service("avGridRowEditService", avGridRowEditService)
    .service('avGridRowDeleteService', avGridRowDeleteService)
    .directive('avGrid', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/views/grids/uiGrid.html',
            controller: ['$scope', '$rootScope', '$http', '$filter', 'avGridRowEditService', 'avGridRowDeleteService', '$state', 'uiGridExporterConstants', 'uiGridExporterService', 'leadSessionStorage', '$uibModal', function ($scope, $rootScope, $http, $filter, avGridRowEditService, avGridRowDeleteService, $state, uiGridExporterConstants, uiGridExporterService, leadSessionStorage, $uibModal) {
                var empType = leadSessionStorage.getUserSession();
                var formArray = [], formCount = 0, i;
                $scope.dependentEntities = [];
                $scope.form = $scope.vm.form;
                $scope.vm.selectCountValue = 10;
                $scope.gridCount = [
                    { id: 10, name: "10" },
                    { id: 50, name: "50" },
                    { id: 100, name: "100" },
                    { id: 500, name: "500" },
                    { id: 1000, name: "1000" }
                ];
                $scope.downloadCSV = function () {
                    $scope.gridApi.exporter.csvExport(uiGridExporterConstants.ALL, uiGridExporterConstants.ALL);
                };
                $scope.downloadPDF = function () {
                    $scope.gridApi.exporter.pdfExport(uiGridExporterConstants.ALL, uiGridExporterConstants.ALL);
                };
                $scope.selectCount = { selected: '' };
                $scope.selectCount.selected = { name: '10', id: '10' };
                $scope.vm.isLoading = true;
                var countArray = 0;
                for (i = 0; i < $scope.vm.form.length; i += 1) {
                    if ($scope.form[i].avUri) {
                        formArray[countArray] = i;
                        countArray += 1;
                        function getDropDownData(formCount, i, callback) {

                            $http.get($scope.form[i].avUri)
                                .then(function (data) {
                                    var dropdownData;
                                    var count = 0;
                                    data.forEach(function (rowData) {
                                        if (count === 0) {
                                            dropdownData = '{"' + rowData.id + '":"' + rowData.name + '"';
                                            count++;
                                        }
                                        else {
                                            dropdownData = dropdownData.concat(',"' + rowData.id + '":"' + rowData.name + '"');
                                        }
                                    });
                                    $scope.dependentEntities[formArray[formCount]] = dropdownData.concat('}');
                                    $scope.form[formArray[formCount]].titleMap = JSON.parse($scope.dependentEntities[formArray[formCount]]);
                                    callback(dropdownData.concat('}'));
                                }, function (err) {
                                    console.log(err);
                                });



                        }
                        getDropDownData(formCount, i, function (data) {

                        });
                        formCount++;
                    }
                }
                $scope.vm.searchData = [];



                var roleTemplate;
                if ($scope.vm.gridOptions.columnDefs[0].redirectButton) {
                    $scope.redirectToLead = true;
                    if (empType) {
                        if (empType.empData) {
                            if (empType.empData.emp_type === 4) {
                                roleTemplate = '<div class="ui-grid-cell-contents"><button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.vm.leadEdit(grid.appScope, row)"><i class="glyphicon glyphicon-pencil"></i></button></div>';
                            }
                            if (empType.empData.emp_type === 3) {
                                roleTemplate = '<div class="ui-grid-cell-contents"><button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.vm.leadEdit(grid.appScope, row)"><i class="glyphicon glyphicon-pencil"></i></button></div>';
                            }
                            if (empType.empData.emp_type === 2) {
                                roleTemplate = '<div class="ui-grid-cell-contents"><button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.vm.leadEdit(grid.appScope, row)"><i class="glyphicon glyphicon-pencil"></i></button> </div>';
                            }
                            if (empType.empData.emp_type === 1) {
                                roleTemplate = '<div class="ui-grid-cell-contents"><button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.vm.leadEdit(grid.appScope, row)"><i class="glyphicon glyphicon-pencil"></i></button> <button type="button" class="btn btn-xs btn-warning" ng-click="grid.appScope.vm.deleteRow(grid.appScope, row)"><i class="glyphicon glyphicon-trash"></i></i></button></div>';
                            }
                        }
                    }
                    $scope.vm.gridOptions.columnDefs.unshift({
                        name: 'E/D',
                        cellTemplate: roleTemplate,
                        width: 68,
                        enableColumnMenu: false,
                        headerCellTemplate: '<div></div>'
                    });
                    for (i = 1; i < $scope.vm.gridOptions.columnDefs.length; i++) {
                        _.assign($scope.vm.gridOptions.columnDefs[i], { cellTemplate: '<div class="ui-grid-cell-contents"  title="{{COL_FIELD}}" ng-click="grid.appScope.vm.openModal(grid.appScope, row)"  ng-dblclick="grid.appScope.vm.leadEdit(grid.appScope, row)"><div ng-bind="COL_FIELD "></div></div>' });
                    }
                    
                    var myTemplate = "<a href='#' ng-click='grid.appScope.openModal($event, row)'>{{ row.entity }}</a>";
                    $scope.vm.openModal = function (e, row) {
                        //in here, you can access the event object and row object
                        var myEvent = e;
                        var myRow = row;

                        //this is how you open a modal
                        var modalInstance = $uibModal.open({
                            templateUrl: 'views/modalTemplate.html',
                            controller: 'readOnlyController',
                            backdrop: 'static',
                            resolve: {
                                grid: function () {
                                    return grid;
                                },
                                row: function () {
                                    return row;
                                }
                            }
                        });

                        //call the modal to open, then decide what to do with the promise
                        modalInstance.result.then(function (data) {
                            console.log(data);
                            //blah blah the user clicked okay
                        }, function (err) {
                            console.log(err);
                            //blah blah the user clicked cancel
                        })
                    }

                    $scope.vm.leadEdit = function (grid, row) {
                        console.log(row.entity);
                        $state.go('app.lead', { rowData: row.entity });
                    }
                } else {
                    $scope.vm.gridOptions.columnDefs.unshift({

                        name: 'E/D',
                        cellTemplate: '<div class="ui-grid-cell-contents" ><button type="button" title ="Edit" class="btn btn-xs btn-primary" ng-click="grid.appScope.vm.editRow(grid.appScope, row)"><i class="glyphicon glyphicon-pencil"></i></button> <button type="button" title="Delete" class="btn btn-xs btn-warning" ng-click="grid.appScope.vm.deleteRow(grid.appScope, row)"><i class="glyphicon glyphicon-trash"></i></i></button><div ng-bind="COL_FIELD "></div></div>',
                        width: 68,
                        enableColumnMenu: false,
                        enableFiltering: false
                    });
                    for (i = 1; i < $scope.vm.gridOptions.columnDefs.length; i++) {
                        _.assign($scope.vm.gridOptions.columnDefs[i], { cellTemplate: '<div class="ui-grid-cell-contents"  title="{{COL_FIELD}}"   ng-dblclick="grid.appScope.vm.editRow(grid.appScope, row)"><div ng-bind="COL_FIELD "></div></div>' });
                    }
                }



                $scope.vm.gridOptions = {
                    rowTemplate: './app/directives/views/grids/row-focus.html',
                    enableColumnResizing: true,
                    enableFiltering: true, // true
                    paginationPageSizes: [10, 50, 75, 100, 500, 1000],
                    paginationPageSize: 10,
                    enablePaginationControls: true,
                    columnDefs: $scope.vm.gridOptions.columnDefs,
                    exporterPdfTableHeaderStyle: { bold: true, italics: true, color: '#0000ff' },
                    exporterPdfOrientation: 'portrait',
                    exporterPdfPageSize: 'LETTER',
                    exporterPdfMaxGridWidth: 450,
                    exporterPdfDefaultStyle: { fontSize: 10 },
                    exporterPdfFooter: function (currentPage, pageCount) {
                        return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
                    },
                    exporterPdfCustomFormatter: function (docDefinition) {
                        docDefinition.styles.footerStyle = { fontSize: 10, bold: true, margin: [550] };
                        return docDefinition;
                    },
                    onRegisterApi: function (gridApi) {
                        $scope.gridApi = gridApi;
                        $scope.gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                            var noOfRecords = parseInt(pageSize);
                            var begin = noOfRecords * newPage - noOfRecords + 1;
                            var end = begin + noOfRecords - 1;
                            if (end > $scope.totalItems) {
                                end = $scope.totalItems;
                            }
                            $scope.vm.begin = begin;
                            $scope.vm.end = end;
                        });
                    }
                };
                console.log($scope.vm.gridOptions.columnDefs[0].search);
                $scope.vm.commonService.show($scope.vm.gridOptions.columnDefs[1].search).$promise.then(function (data) {
                    if (!data) {

                    } else {

                        var processData = [];
                        /*  if(type){
                              if(type.empData){
                                  if(type.empData.emp_type === 4){
                                      _.forEach(data, function (valueModel, keyModel) {
                                          if (valueData.lead_status == 'Processing') {
                                              processData.push(valueModel);   
                                          }
                                      });
                                  }
                              }
                          }*/


                        if (data[0].lead_status) {

                            for (i = 0; i < data.length; i++) {
                                if (data[i].lead_status == 1) {
                                    data[i].lead_status = "No Responce";
                                } else {
                                    if (data[i].lead_status == 2) {
                                        data[i].lead_status = "Proposal Sent";
                                    } else {
                                        if (data[i].lead_status == 3) {
                                            data[i].lead_status = "Consultation Done";
                                        } else {
                                            if (data[i].lead_status == 4) {
                                                data[i].lead_status = "Demo Setup";
                                            } else {
                                                if (data[i].lead_status == 5) {
                                                    data[i].lead_status = "Innvoice Sent";
                                                } else {
                                                    if (data[i].lead_status == 4) {
                                                        data[i].lead_status = "Payment Collect";
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        $scope.vm.gridOptions.data = data;
                        if ($scope.vm.selectCountValue > data.length) {
                            $scope.vm.end = $scope.vm.gridOptions.totalItems;
                        } else {
                            $scope.vm.end = $scope.vm.selectCountValue;
                        }
                        $scope.vm.begin = 1;
                        $scope.totalItems = data.length;
                        $scope.vm.gridOptions.paginationCurrentPage = 1;
                        $scope.vm.gridOptions.paginationPageSize = $scope.vm.selectCountValue;
                        //  $scope.vm.gridOptions.enablePaginationControls = false;
                        $scope.vm.gridOptions.minRowsToShow = $scope.vm.gridOptions.data.length < $scope.vm.gridOptions.numRows ? $scope.vm.gridOptions.data.length : $scope.vm.gridOptions.numRows;
                        $scope.vm.searchData = data;
                        if ($rootScope.searchterm) {
                            $scope.vm.searchGrid($rootScope.searchterm);
                        }
                    }
                }, function (err) {

                });
                $scope.vm.editRow = avGridRowEditService.editRow;
                $scope.vm.deleteRow = avGridRowDeleteService.deleteRow;
                $scope.addRow = function () {
                    var service = { id: 0 };
                    var rowTemp = {};
                    rowTemp.entity = service;
                    $scope.vm.editRow($scope, rowTemp);
                };
                $rootScope.refresh = function () {
                    $scope.vm.commonService.show().$promise.then(function (data) {
                        $scope.vm.gridOptions.enablePaginationControls = true;
                        if (!data) {
                            $scope.isPagination = false;
                            $scope.vm.gridOptions.data = null;
                        } else {
                            $scope.vm.gridOptions.data = data;
                            $scope.vm.searchData = data;
                            if ($scope.vm.gridOptions.paginationCurrentPage === 1) {
                                if ($scope.selectCount.selected.id >= $scope.vm.gridOptions.data.length) {
                                    $scope.vm.end = $scope.vm.gridOptions.data.length;
                                } else {
                                    $scope.vm.end = $scope.selectCount.selected.id;
                                }
                            } else {
                                if (data.length <= $scope.vm.gridOptions.paginationCurrentPage * 10) {
                                    $scope.vm.end = data.length;
                                }
                            }
                            $scope.totalItems = data.length;
                            $scope.vm.searchGrid($rootScope.searchterm);
                        }
                    });
                };
                $scope.vm.countChange = function (value) {
                    $scope.vm.gridOptions.paginationPageSize = value;
                };
                $scope.vm.searchGrid = function (searchTerm) {
                    $rootScope.searchterm = searchTerm;
                    $scope.vm.gridOptions.data = $filter('filter')($scope.vm.searchData, searchTerm, undefined);
                    $scope.totalItems = $scope.vm.gridOptions.data.length;
                    if ($scope.vm.gridOptions.data.length === 0) {
                        $scope.vm.begin = 0;
                    } else { // no else condition
                        $scope.vm.begin = 1;
                    }

                    if ($scope.vm.gridOptions.paginationCurrentPage === 1) {
                        //$scope.vm.begin = 1;
                        if ($scope.selectCount.selected.id >= $scope.vm.gridOptions.data.length) {
                            $scope.vm.end = $scope.vm.gridOptions.data.length;
                        } else {
                            $scope.vm.end = $scope.selectCount.selected.id;
                        }
                    } else {
                        if ($scope.vm.gridOptions.data.length <= $scope.vm.gridOptions.paginationCurrentPage * 10) {
                            var prevPage = $scope.vm.gridOptions.paginationCurrentPage - 1;
                            $scope.vm.begin = prevPage * 10 + 1;
                            $scope.vm.end = $scope.vm.gridOptions.data.length;
                        }
                    }
                    $scope.totalItems = $scope.vm.gridOptions.data.length;
                };
            }]
        }
    });
avGridRowEditService.$inject = ['$uibModal'];
function avGridRowEditService($uibModal) {
    var data = {};
    var service = {};
    data.choice = {};
    service.editRow = editRow;
    function editRow(grid, row) {

        $uibModal.open({
            templateUrl: 'app/directives/views/grids/edit.html',
            controller: 'avGridRowEditController as vm',
            resolve: {
                grid: function () {
                    return grid;
                },
                row: function () {
                    return row;
                }
            }
        });

    }
    return service;
}
avGridRowEditController.$inject = ['$scope', '$rootScope', '$uibModalInstance', 'grid', 'row'];
function avGridRowEditController($scope, $rootScope, $uibModalInstance, grid, row) {
    function getItemFromObject(obj, path) {
        var params = path.split('.');
        var newObj = obj;
        for (var param in params) {
            newObj = getPropertyFromObject(newObj, params[param]);
        }
        return newObj;
    }
    function getPropertyFromObject(obj, param) {
        if (obj.hasOwnProperty(param)) {
            return obj[param];
        }
        return obj;
    }
    var vm = this;
    vm.titleName = grid.vm.titleName;
    vm.popupHeader = grid.vm.popupHeader;
    vm.schema = grid.vm.schema;
    vm.entity = angular.copy(row.entity);
    vm.form = grid.vm.form;
    if (grid.dependentEntities.length > 0) {
        for (var i = 0; i < vm.form.length; i++) {
            if (vm.form[i].avDependency === true) {
                var value = JSON.parse(grid.dependentEntities[i]);
                var param = vm.form[i].avDependencyField;
                var returnValue = getItemFromObject(vm.entity, param);
                for (var a in value) {
                    if (a == returnValue) {
                        for (var j = 0; j < grid.vm.gridOptions.columnDefs.length; j++) {
                            if (grid.vm.gridOptions.columnDefs[j].avDependencyKeyId) {
                                var dependentId = grid.vm.gridOptions.columnDefs[j].avDependencyKeyId;
                                dependentId = dependentId.replace(/"/g, '');
                                if (dependentId == vm.form[i].key) {
                                    vm.entity[dependentId] = a;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    $scope.submitForm = function (form) {
        grid.detailedErrorMessage = "";
        $scope.$broadcast('schemaFormValidate');
        if (form.$valid) {
            if (row.entity.id == 0) {
                var jsonData = angular.copy(vm.entity);
                delete jsonData.id;
                console.log(jsonData);
                grid.vm.commonService.create(jsonData).$promise.then(function (data) {
                    if (grid.dependentEntities.length > 0) {
                        for (var i = 0; i < vm.form.length; i++) {
                            if (vm.form[i].avDependency === true) {
                                var value = JSON.parse(grid.dependentEntities[i]);
                                var param = vm.form[i].avDependencyField;
                                var returnValue = vm.entity[vm.form[i].key];
                                for (var a in value) {
                                    if (a == returnValue) {
                                        for (var j = 0; j < grid.vm.gridOptions.columnDefs.length; j++) {
                                            if (grid.vm.gridOptions.columnDefs[j].field) {
                                                var dependentName = grid.vm.gridOptions.columnDefs[j].field;
                                                createObject(vm.entity, dependentName);
                                                var objCount = 1;
                                                function createObject(obj, path) {
                                                    var params = path.split('.');
                                                    var newObj = obj;
                                                    for (var param in params) {
                                                        newObj = bindProperty(newObj, params[param], params.length);
                                                    }
                                                    return newObj;
                                                }
                                                function bindProperty(obj, param, length) {
                                                    if (objCount == length) {
                                                        return obj[param] = value[a];
                                                    }
                                                    else {
                                                        objCount++;
                                                        return obj[param] = {};
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    row.entity = angular.extend(row.entity, vm.entity);
                    row.entity.id = data.id;
                    grid.vm.searchData.push(row.entity);
                    grid.vm.detailedErrorMessage = "";
                    $uibModalInstance.close(row.entity);
                    $rootScope.refresh();
                }, function (err) {

                });
            } else {
                if (vm.entity.hasOwnProperty('created_date')) {
                    delete (vm.entity.created_date);
                    delete (vm.entity.modify_date);
                }
                delete (vm.entity.emp_firstname);
                console.log(vm.entity);
                grid.vm.commonServiceById.update(vm.entity).$promise.then(function (data) {
                    if (grid.dependentEntities.length > 0) {
                        for (var i = 0; i < vm.form.length; i++) {
                            if (vm.form[i].avDependency) {
                                var value = JSON.parse(grid.dependentEntities[i]);
                                var param = vm.form[i].avDependencyField;
                                var returnValue = getItemFromObject(vm.entity, param);
                                for (var a in value) {
                                    if (a == returnValue) {
                                        for (var j = 0; j < grid.vm.gridOptions.columnDefs.length; j++) {
                                            if (grid.vm.gridOptions.columnDefs[j].field) {
                                                var dependentName = grid.vm.gridOptions.columnDefs[j].field;
                                                createObject(vm.entity, dependentName);
                                                var objCount = 1;
                                                vm.entity[dependentName] = value[a];
                                                function createObject(obj, path) {
                                                    var params = path.split('.');
                                                    var newObj = obj;
                                                    for (var param in params) {
                                                        newObj = bindProperty(newObj, params[param], params.length);
                                                    }
                                                    return newObj;
                                                }
                                                function bindProperty(obj, param, length) {
                                                    if (objCount == length) {
                                                        return obj[param] = value[a];
                                                    }
                                                    else {
                                                        objCount++;
                                                        return obj[param] = {};
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    row.entity = angular.extend(row.entity, vm.entity);
                    var index = grid.vm.gridOptions.data.indexOf(row.entity);
                    row.grid.appScope.vm.searchData[index] = vm.entity;
                    $uibModalInstance.close(row.entity);
                    grid.vm.detailedErrorMessage = "";
                    $rootScope.refresh();
                });
            }
        }

    }
}
avGridRowDeleteService.$inject = ['$uibModal'];
function avGridRowDeleteService($uibModal) {
    var service = {};
    service.deleteRow = deleteRow;
    function deleteRow(grid, row) {
        $uibModal.open({
            templateUrl: 'app/directives/views/grids/delete.html',
            controller: 'avGridRowDeleteController as vm',
            resolve: {
                grid: function () {
                    return grid;
                },
                row: function () {
                    return row
                }
            }
        });
    }
    return service;
}
avGridRowDeleteController.$inject = ['$uibModalInstance', '$rootScope', 'grid', 'row'];
function avGridRowDeleteController($uibModalInstance, $rootScope, grid, row) {
    var vm = this;
    vm.entity = angular.copy(row.entity);
    vm.deleteItem = grid.vm.deleteItem;
    vm.remove = remove;
    function remove() {
        row.entity = angular.extend(row.entity, vm.entity);
        var index = grid.vm.gridOptions.data.indexOf(row.entity);
        grid.vm.commonServiceById.delete({ id: row.entity.id }).$promise.then(function () {
            grid.vm.gridOptions.data.splice(index, 1);
            $uibModalInstance.close(row.entity);
            $rootScope.refresh();
        });
    }
}

