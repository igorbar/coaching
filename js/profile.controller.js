(function(){
    'use strict';
    angular.module('coaching')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = [ '$location', '$routeParams', 'dataService'];

    function profileCtrl( $location, $routeParams, dataService) {
        var vm = this;
        vm.user = {};
        vm.user_id = $routeParams.userId;

        vm.actions = {
            save: save
        };

        function getUser(){
            return dataService.getData(vm.user_id)
                .success(function (data) {
                    vm.user = data;
                })
                .error(function(data) {

                });
        };
        if(vm.user_id != 'add'){
            getUser();
        }


        function save(){
            if(vm.profileForm.lastName.$valid){
                if(vm.user_id == 'add'){
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