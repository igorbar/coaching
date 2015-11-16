(function(){
    'use strict';
    angular.module('coaching')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$location', '$routeParams', 'dataService', 'messageService', '$q'];

    function profileCtrl( $location, $routeParams, dataService, messageService, $q) {
        var vm = this;
        vm.user = {};

        vm.messages = {
            addMessage:  'New user was created!',
            updateMessage: 'Update was successful!',
            errorServer:  'Server is not available!'
        };

        vm.actions = {
            save: save
        };

        function getUser() {
            var deferred = $q.defer();

            dataService.getData($routeParams.userId)
                .success(function (data) {
                    vm.user = data;
                    deferred.resolve(vm.user);
                })
                .error(function (data) {
                    messageService.showPopup(vm.messages.errorServer, 'error');
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        if($routeParams.userId != 'add'){
            getUser();
        }


        function save() {

            if (vm.profileForm.$valid) {
                if ($routeParams.userId == 'add') {
                    dataService.create(vm.user)
                        .success(function (data) {
                            messageService.showPopup(vm.messages.addMessage, 'success');
                            $location.path('#/list');
                        })
                        .error(function (data) {
                            messageService.showPopup(vm.messages.errorServer, 'error');
                        });
                }
                else {
                    dataService.update(vm.user)
                        .success(function (data) {
                            messageService.showPopup(vm.messages.updateMessage, 'success');
                            $location.path('#/list');
                        })
                        .error(function (data) {
                            messageService.showPopup(vm.messages.errorServer, 'error');
                        });
                }
            }

        }

    }

})();