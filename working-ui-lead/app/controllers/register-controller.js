app.controller('registerController', ['$scope', 'growl', 'registerService', 'apiUrl', '$timeout', '$http', 'mailSenderService', function ($scope, growl, registerService, apiUrl, $timeout, $http, mailSenderService) {

    $scope.loginUrl = apiUrl.dev + "#/login";
    $scope.register = {};
    $scope.register.typeId = "1";
    $scope.register.types = [
        { id: "2", name: "Event Manager" },
        { id: "3", name: "Back Office" },
        { id: "4", name: "BSM" }
    ];

    $scope.setReferral = function () {
        console.log("******");
        $scope.referValue = true;
    }

    $scope.unSetReferral = function () {
        console.log("******");
        $scope.referValue = false;
    }

    $scope.registerSubmite = function () {

        // if date empty div is undefined 
        console.log($scope.type);
        if (angular.isUndefined($scope.type) === true || !$scope.type) {
            growl.error("Select Type", {});
        } else {
            if (angular.isUndefined($scope.firstName) === true || !$scope.firstName) {
                growl.error("Invalid First Name", {});
            } else {
                if (angular.isUndefined($scope.lastName) === true || !$scope.lastName) {
                    growl.error("Invalid Last Name", {});
                } else {
                    if (angular.isUndefined($scope.mobileNum) === true || !$scope.mobileNum) {
                        growl.error("Invalid mobile Number", {});
                    } else {
                        if (angular.isUndefined($scope.email) === true || !$scope.email) {
                            growl.error("Invalid Email Id", {});
                        } else {
                            if (angular.isUndefined($scope.pwd) === true || !$scope.pwd) {
                                growl.error("Invalid Password", {});
                            } else {
                                if (angular.isUndefined($scope.repwd) === true || !$scope.repwd) {
                                    growl.error("Invalid Repeat Password", {});
                                } else {

                                    if (angular.isUndefined($scope.address) === true || !$scope.address) {
                                        growl.error("Invalid Address", {});
                                    } else {
                                        if (!($scope.pwd === $scope.repwd)) {
                                            growl.error("Password Mismatch", {});
                                        } else {
                                            registerData = {
                                                emp_firstname: $scope.firstName,
                                                emp_lastname: $scope.lastName,
                                                emp_mobileno: $scope.mobileNum,
                                                emp_mailid: $scope.email,
                                                emp_pwd: $scope.pwd,
                                                emp_address: $scope.address,
                                                emp_type: $scope.type,
                                                status: 'Active'
                                            };
                                            registerService.create(registerData).$promise.then(function (data) {
                                                console.log(data);
                                                growl.success("Record Created", {});
                                                $timeout(function () {
                                                    window.location = apiUrl.dev + "#/login";
                                                }, 2000);
                                            }, function () {
                                                growl.error("Server Error", {});
                                            });
                                            mailSenderService.create({ mail: $scope.email }).$promise.then(function (data) {
                                                console.log(data);
                                            }, function (err) {
                                                console.log(err);
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    $scope.redirectToLogin = function () {
        window.location = apiUrl.dev + "#/login";
    }
}]);