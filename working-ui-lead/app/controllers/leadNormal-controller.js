app.controller('leadsController', ['$scope', 'leadNormalService', 'growl', 'leadSessionStorage', '$stateParams', 'serviceService', 'serviceStoarage', '$filter', 'serviceFullStoarage', 'leadBsmService', '$uibModal', function ($scope, leadNormalService, growl, leadSessionStorage, $stateParams, serviceService, serviceStoarage, $filter, serviceFullStoarage, leadBsmService, $uibModal) {
    var type = leadSessionStorage.getUserSession();
    var paramsData = $stateParams.rowData;
    $scope.cars = serviceStoarage.getServices();
    $scope.fullServices = serviceFullStoarage.getFullServices();

    leadBsmService.show().$promise.then(function (data) {

        $scope._bsms = data;
    })






    var chart = AmCharts.makeChart("chartdiv", {
        "type": "pie",
        "theme": "light",
        "innerRadius": "40%",
        "labelsEnabled": false,
        "autoMargins": false,
        "dataProvider": [{
          "country": "Lithuania",
          "litres": 1,
          "color": "red"
        }, {
          "country": "Czech Republic",
          "litres": 2,
          "color": "red"
        }, {
          "country": "Ireland",
          "litres": 3,
          "color": "back"
        }, {
          "country": "Ireland",
          "litres": 4,
          "color": "back"
        }, {
          "country": "Ireland",
          "litres": 5,
          "color": "back"
        }],
        "valueField": "litres",
        
        "colorField": "color"
      });












    serviceService.show().$promise.then(function (serviceData) {
        $scope.Services = serviceData;

    })

    $scope.discount = false;
    if (type.empData) {
        $scope.empTypeId = type.empData.id;
        $scope.empTypeName = type.empData.emp_firstname;
        if (type.empData.emp_type == 4) {
            $scope.discount = true;
        }
    }

    $scope.setReferral = function () {
        $scope.referValue = true;
    }

    $scope.unSetReferral = function () {
        $scope.referValue = false;
    }

    $scope.selectedLead = [];
    //$scope.selectedLead = [{ "id": 5, "name": "Hair" }, { "id": 10, "name": "Leg" }];
    //$scope.testDate = new Date('2017-03-14T12:44:15.000Z');

    $scope.process = {};
    $scope.Prioritys = {};
    $scope.__bsm = {}
    $scope.process.stateId = 1;

    $scope.process.states = [{
        id: 1,
        name: "No Responce"
    }, {
        id: 2,
        name: "Proposal Sent"
    }, {
        id: 3,
        name: "Consultation Done"
    }, {
        id: 4,
        name: "Demo Setup"
    }, {
        id: 5,
        name: "Innvoice Sent"
    }, {
        id: 6,
        name: "Payment Collect"
    }];

    //$scope.Prioritys.stateId = 1;

    $scope.Prioritys.states = [{
        id: 1,
        name: "Hot"
    }, {
        id: 2,
        name: "Cool"
    }];

    $scope.servicesPopup = function () {

        $uibModal.open({
            templateUrl: "views/selectService.html",
            controller: "selectServiceController",
            size: 'lg',
            resolve: {
                _services: function () {
                    return $scope.itemsSelected;
                },
                _servicesCost: function () {
                    return $scope.invoiceTemp;
                }
            }
        }).result
            .then(function (data) {
                console.log(data);
                $scope.serviceModelPopup = data.item;
                $scope.invoice = data.invoice;
                $scope.invoiceTemp =  $scope.invoice;
                console.log("*******");
                console.log( $scope.invoice);
            })
            .then(null, function (reason) {
                console.log(reason);

            });
    }

    /*  $scope.$watch('selectedLead', function () {
          var sum = 0;
          var serviceName = [];
       
          _.forEach($scope.fullServices, function (valueData, keyData) {
              _.forEach($scope.selectedLead, function (valueModel, keyModel) {
                  if (valueData.id == valueModel.id) {
                      sum = sum + valueData.service_price;
                      
                      serviceName = serviceName.concat(valueData.service_name); 
                      //$scope.selectServices = angular.extend($scope.selectServices, serviceName);
                       
                  }
              });
          });
          console.log(serviceName);
          $scope.selectServices = serviceName.toString().replace(/^"|"$/g, '');    
          $scope.invoice = sum;
          $scope.invoiceTemp = sum;
      });
  */

    $scope.referNextValidation = function () {
        if (angular.isUndefined($scope.Prioritys.stateId)) {
            growl.error("Invalid Prioritys ", {});
        } else {
            if (angular.isUndefined($scope.testDate) === true || !$scope.testDate) {
                growl.error("Invalid Date", {});
                return false;
            } else {
                if (angular.isUndefined($scope.budget) === true || !$scope.budget) {
                    growl.error("Invalid Budget", {});
                    return false;
                } else {
                    return true;
                }
            }
        }
    }

    $scope.eventManagerValidation = function () {
        if (angular.isUndefined($scope.firstName) === true || !$scope.firstName) {
            growl.error("Invalid First Name", {});
            return false;
        } else {
            if (angular.isUndefined($scope.email) === true || !$scope.email) {
                growl.error("Invalid Email", {});
                return false;
            } else {
                if (angular.isUndefined($scope.mobile) === true || !$scope.mobile) {
                    growl.error("Invalid Mobile", {});
                    return false;
                } else {
                    if (angular.isUndefined($scope.address) === true || !$scope.address) {
                        growl.error("Invalid Address", {});
                        return false;
                    } else {
                        if (angular.isUndefined($scope.service) === true || !$scope.service) {
                            growl.error("Invalid Service", {});
                            return false;
                        } else {
                            if (angular.isUndefined($scope.referBy) === true || !$scope.referBy) {
                                growl.error("Invalid Select Type", {});
                                return false;
                            } else {
                                if ($scope.referBy == 'Referral') {
                                    if (angular.isUndefined($scope.referPerson) === true || !$scope.referPerson) {
                                        growl.error("Invalid Referal Person", {});
                                        return false;
                                    } else {
                                        if ($scope.referNextValidation() == true) {
                                            return true;
                                        }
                                    }
                                } else {
                                    if ($scope.referNextValidation() == true) {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }



    if (paramsData) {

        $scope.empTypeName = paramsData.emp_firstname;
        $scope.firstName = paramsData.lead_firstname;
        $scope.lastName = paramsData.lead_lastname;
        $scope.email = paramsData.lead_email;
        $scope.mobile = paramsData.lead_mobile;
        $scope.address = paramsData.lead_address;
        $scope.service = paramsData.lead_service_req;
        $scope.process.stateId = paramsData.lead_priority;
        $scope.budget = paramsData.lead_budget;
        $scope.invoice = paramsData.lead_invoice;
        $scope.serviceModelPopup = paramsData.lead_final_service_req;
        $scope._discountAmt = paramsData.lead_discount;
        $scope.referBy = paramsData.lead_type;
        $scope.referPerson = paramsData.lead_refer_by;
        $scope.Prioritys.stateId = paramsData.lead_priority;
        $scope.invoiceTemp =  $scope.invoice;
        
        //paramsData.data = "Hair , Face"; 
        //console.log(paramsData.lead_final_service_req.split(',').toString().replace(/[\s]/g, ''));
        //console.log( $scope.serviceModelPopup.toString().replace(/[\s]/g, ''));
        if ($scope.serviceModelPopup) {
            $scope.serviceModelPopup = $scope.serviceModelPopup.toString().replace(/[\s]/g, '');
            var serviceSplit = $scope.serviceModelPopup.split(',');
            var serviceCost = 0;
            _.forEach($scope.fullServices, function (serviceValue, serviceKey) {
                _.forEach(serviceSplit, function (selectedValue, selectedKey) {
                    if (serviceValue.service_name == selectedValue) {
                        serviceCost = serviceCost + serviceValue.service_price;
                        serviceValue.selected = true;
                    }
                });
            });
        }
        console.log(serviceCost);
        $scope.invoice = serviceCost;


        if ($scope.referBy == 'Referral') {
            $scope.referValue = true;
        }
        if (angular.isUndefined(paramsData.lead_date_of_service) === true || !paramsData.lead_date_of_service) {
            $scope.testDate = new Date();
        } else {
            $scope.testDate = new Date(paramsData.lead_date_of_service);
        }
        $scope.firstButton = function () {
            if ($scope.eventManagerValidation() == true) {
                $scope.dateTime = $filter('date')($scope.testDate, "yyyy-MM-dd HH:mm");
                var updatePhase = {
                    id: paramsData.lead_id,
                    lead_firstname: $scope.firstName,
                    lead_lastname: $scope.lastName,
                    lead_email: $scope.email,
                    lead_mobile: $scope.mobile,
                    lead_address: $scope.address,
                    lead_status: $scope.process.stateId,
                    lead_service_req: $scope.service,
                    lead_invoice: $scope.invoice,
                    lead_date_of_service: $scope.dateTime,
                    lead_budget: $scope.budget,
                    lead_type: $scope.referBy,
                    lead_refer_by: $scope.referPerson,
                    lead_priority: $scope.Prioritys.stateId,
                    lead_discount: $scope._discountAmt
                };
                if ($scope.referBy == 'Self') {
                    $scope.referPerson = '';
                }
                if ($scope.Prioritys.stateId == 1) {
                    $scope.lead_hotjob_dashboard = "Hot";
                } else {
                    $scope.lead_hotjob_dashboard = "Not";
                }
                if (type.empData.emp_type == 2 || type.empData.emp_type == 3) {
                    console.log("UPDATE");
                    console.log(updatePhase);
                    leadNormalService.update(updatePhase).$promise.then(function (data) {
                        console.log(" Update Event manager");
                        growl.success("Updated Successfully", {});
                    }, function (err) {
                        growl.error("Server Error", {});
                        console.log(err);
                    });
                } else {
                    if (type.empData.emp_type == 4 || type.empData.emp_type == 1) {
                        leadNormalService.update(updatePhase).$promise.then(function (data) {
                            console.log(" updated admin and  Bsm");
                            growl.success("Updated Successfully", {});
                        }, function (err) {
                            growl.error("Server Error", {});
                            console.log(err);
                        });
                    }

                }
            }
        }

    } else {

        console.log("Else part");

        $scope.testDate = new Date();
        $scope.firstButton = function () {
            console.log($scope.result);
            console.log($scope.__bsm.bsmId);
            if ($scope.eventManagerValidation() == true) {

                if ($scope.referBy == 'Self') {
                    $scope.referPerson = '';
                }
                if ($scope.Prioritys.stateId == 1) {
                    $scope.lead_hotjob_dashboard = "Hot"
                } else {
                    $scope.lead_hotjob_dashboard = "Not"
                }
                $scope.dateTime = $filter('date')($scope.testDate, "yyyy-MM-dd HH:mm");
                var createPhase = {
                    emp_id: $scope.empTypeId,
                    lead_firstname: $scope.firstName,
                    lead_lastname: $scope.lastName,
                    lead_email: $scope.email,
                    lead_mobile: $scope.mobile,
                    lead_address: $scope.address,
                    lead_status: $scope.process.stateId,
                    lead_service_req: $scope.service,
                    lead_final_service_req: $scope.serviceModelPopup,
                    lead_asign_to: $scope.__bsm.bsmId,
                    lead_invoice: $scope.invoice,
                    lead_date_of_service: $scope.dateTime,
                    lead_budget: $scope.budget,
                    lead_discount: $scope._discountAmt,
                    lead_type: $scope.referBy,
                    lead_refer_by: $scope.referPerson,
                    lead_priority: $scope.Prioritys.stateId
                }
                if (type.empData.emp_type == 2 || type.empData.emp_type == 3) {
                    console.log("CREATE phase");
                    console.log(createPhase);
                    leadNormalService.create(createPhase).$promise.then(function (data) {
                        console.log(data);
                        growl.success("Created Successfully", {});
                    }, function (err) {
                        growl.error("Server Error", {});
                        console.log(err);
                    });
                } else {
                    if (type.empData.emp_type == 4 || type.empData.emp_type == 1) {
                        console.log("create");
                        console.log(createPhase);
                        leadNormalService.create(createPhase).$promise.then(function (data) {
                            console.log(" Update Params value");
                            growl.success("Created Successfully", {});
                        }, function (err) {
                            growl.error("Server Error", {});
                            console.log(err);
                        });
                    }
                }
            }
        }
    }

    $scope.discountAmt = function () {
        console.log($scope);
        console.log($scope.invoice);
        console.log($scope.invoiceTemp);
        console.log($scope._discountAmt);
        var temp = parseInt($scope.invoice);
        var dis = parseInt($scope._discountAmt);
        var inv = parseInt($scope.invoiceTemp);
        if (inv > dis) {
            $scope.invoice = inv - dis;
        } else {
            $scope.invoice = $scope.invoiceTemp;
        }
    }

}]);