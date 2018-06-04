app.factory("leadSessionStorage", ['$window', function ($window) {
    var addUserSession = function (results) {
        if (results) {
            results = JSON.stringify(results);
        }
        $window.sessionStorage.session = results;
    };
    var getUserSession = function () {
        if ($window.sessionStorage.session) {
            return JSON.parse($window.sessionStorage.session);
        } else {
            return $window.sessionStorage.session;
        }
    };
    return {
        addUserSession: addUserSession,
        getUserSession: getUserSession
    };
}])
    .factory('TokenInterceptor', ['$q', 'leadSessionStorage', '$state', '$location', function ($q, leadSessionStorage, $state, $location) {
        return {
            request: function (config) {
                var session = leadSessionStorage.getUserSession();
                if (!($location.absUrl() === "http://127.0.0.1:8080/#/register")) {
                    if (angular.isUndefined(session) === true) {
                        $state.go('appSimple.login')
                    }
                }
                return config || $q.when(config);
            },
            response: function (response) {
                return response || $q.when(response);
            }
        };
    }])

    .factory('loginService', ['$resource', 'apiUrl', function ($resource, apiUrl) {
        return $resource(apiUrl.api+'login/auth', {},
            { create: { method: "POST", isArray: false } })
    }]).factory('registerService', ['$resource', 'apiUrl', function ($resource, apiUrl) {
        return $resource(apiUrl.api+'login/auth/register', {},
            { create: { method: "POST", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } } })
    }])
    .factory('chakramService', ['$resource', 'apiUrl', function ($resource, apiUrl) {
        return $resource('https://api.github.com/gists', {},
            { show: { method: "GET", isArray: true } })
    }])
    .factory('testService', ['$resource', 'apiUrl', function ($resource, apiUrl) {
        return $resource(apiUrl.api+'test/:id', {},
            {
                show: { method: "GET", isArray: true },
                create: { method: "POST", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } },
                update: { method: "PUT", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } },
                delete: { method: "DELETE" }
            })
    }])
    .factory('leadService', ['$resource', 'apiUrl', function ($resource, apiUrl) {
        return $resource(apiUrl.api+'leads/:emp_type/:id', {emp_type:'@emp_type',id: '@id' },
            {
                show: { method: "GET", isArray: true },
                create: { method: "POST", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } },
                update: { method: "PUT", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } },
                delete: { method: "DELETE" },
                query: {method: "HEAD"}
            })
    }])
    .factory('leadNormalService', ['$resource', 'apiUrl', function ($resource, apiUrl) {
        return $resource(apiUrl.api+'lead/:id', {id: '@id' },
            {
                show: { method: "GET", isArray: true },
                create: { method: "POST", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } },
                update: { method: "PUT", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } },
                delete: { method: "DELETE" }
            })
    }])    
    .factory('leadBsmService', ['$resource', 'apiUrl', function ($resource, apiUrl) {
        return $resource(apiUrl.api+'lead-bsms', {},
            {
                show: { method: "GET", isArray: true }
            })
    }])
    .factory('mailSenderService', ['$resource', 'apiUrl', function ($resource, apiUrl) {
        return $resource(apiUrl.api+'register-mail', {},
            {
                 create: { method: "POST", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } } 
            })
    }])
    .factory('empService', ['$resource', 'apiUrl', function ($resource, apiUrl) {
        return $resource(apiUrl.api+'emp-details/:id', { id: '@id' },
            {
                show: { method: "GET", isArray: true },
                create: { method: "POST", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } },
                update: { method: "PUT", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } },
                delete: { method: "DELETE" }
            })
    }])
    .factory('serviceService', ['$resource', 'apiUrl', function ($resource, apiUrl) {
        return $resource(apiUrl.api+'services/:id', { id: '@id' },
            {
                show: { method: "GET", isArray: true },
                create: { method: "POST", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } },
                update: { method: "PUT", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } },
                delete: { method: "DELETE" }
            })
    }])
    .factory('serviceStoarage', function () {
        var arr = [];
        var addServices = function (data) {
            arr = data;
        };
        var getServices = function () {
            return arr;
        };
        return {
            addServices: addServices,
            getServices: getServices
        }
    })
    .factory('serviceFullStoarage', function () {
        var arr1 = [];
        var addFullServices = function (data) {
            arr1 = data;
        };
        var getFullServices = function () {
            return arr1;
        };
        return {
            addFullServices: addFullServices,
            getFullServices: getFullServices
        }
    })
    .factory('chakramService', ['$resource', 'apiUrl', function ($resource, apiUrl) {
        return $resource('https://api.github.com/gists', {},
            { show: { method: "GET", isArray: true } })
    }]);
