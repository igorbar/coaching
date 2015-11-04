(function(){
    'use strict';
    angular.module('coaching')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$location', '$routeParams', 'dataService'];

    function profileCtrl( $location, $routeParams, dataService) {
        var vm = this;
        vm.user = {};

        vm.actions = {
            save: save
        };

        function getUser(){
            return dataService.getData($routeParams.userId)
                .success(function (data) {
                    vm.user = data;
                })
                .error(function(data) {

                });
        };
        if($routeParams.userId != 'add'){
            getUser();
        }


        function save(){
            if(vm.profileForm.$valid){
                if($routeParams.userId == 'add'){
                    dataService.create(vm.user)
                        .success(function (data) {
                            $location.path('#/list');
                        })
                        .error(function(data) {

                        });
                }
                else {
                    dataService.update(vm.user)
                        .success(function (data) {
                            $location.path('#/list');
                        })
                        .error(function(data) {

                        });
                }
            }

        }

    }

})();