app.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$locationProvider', '$qProvider', '$httpProvider', 'growlProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider, $qProvider, $httpProvider, growlProvider) {

  $httpProvider.interceptors.push('TokenInterceptor');
  $urlRouterProvider.otherwise('/login');
  
  growlProvider.globalTimeToLive(3000);
  growlProvider.onlyUniqueMessages(true);
  
  $qProvider.errorOnUnhandledRejections(false);
  $locationProvider.hashPrefix('');

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'views/common/layouts/full.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Root',
      skip: true
    }
  })
  .state('app.main', {
    url: '/dashboard',
    templateUrl: 'views/dashboard.html'
  })
  
  .state('app.lead', {
    url: '/lead',
    params: {
      rowData: null
  },
    templateUrl: 'views/lead.html'
  })
  .state('app.leads', {
    url: '/leads',
    templateUrl: 'views/leads.html'
  })
  .state('appSimple', {
    abstract: true,
    templateUrl: 'views/common/layouts/simple.html'
  })

  // Additional Pages
  .state('appSimple.login', {
    url: '/login',
    templateUrl: 'views/pages/login.html'
  })
  .state('appSimple.register', {
    url: '/register',
    templateUrl: 'views/pages/register.html'
  })
  .state('app.components', {
    url: "/components",
    abstract: true,
    template: '<ui-view></ui-view>',
    ncyBreadcrumb: {
      label: 'Components'
    }
  })
  .state('app.components.employers', {
    url: '/employers',
    templateUrl: 'views/employer.html',
    ncyBreadcrumb: {
      label: 'Employers'
    }
  })
  .state('app.components.services', {
    url: '/services',
    templateUrl: 'views/services.html',
    ncyBreadcrumb: {
      label: 'Services'
    }
  })
}]);
