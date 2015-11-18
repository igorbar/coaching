(function () {
    angular.module('coaching', ['ngRoute', 'ngResource'])
        .config(config);

        function config($routeProvider, $resourceProvider) {
            $resourceProvider.defaults.stripTrailingSlashes = false;
            $routeProvider.when('/list', {
                    templateUrl: 'list-users.html',
                    controller: 'userListCtrl',
                    controllerAs: 'vm'
                })
                .when('/admin/:userId', {
                    templateUrl: 'profile.html',
                    controller: 'profileCtrl',
                    controllerAs: 'vm'
                })
                .when('/user/:userId', {
                    templateUrl: 'profile.html',
                    controller: 'profileCtrl',
                    controllerAs: 'vm'
                })
                .otherwise({
                    redirectTo: '/list',
                    templateUrl: 'list-users.html'
                });

    };

})();