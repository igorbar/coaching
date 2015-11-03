(function () {
    angular.module('coaching', ['ngRoute'])
        .config(config);

        function config($routeProvider) {

            $routeProvider.when('/list', {
                    templateUrl: 'list-users.html',
                    controller: 'userManageCtrl',
                    controllerAs: 'vm'
                })
                .when('/profile/:userId', {
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