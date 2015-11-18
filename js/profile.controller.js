(function(){
    'use strict';
    angular.module('coaching')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$location', '$routeParams', 'dataService', 'messageService'];

    function profileCtrl( $location, $routeParams, dataService, messageService) {
        var vm = this;
        vm.user = {};
        vm.userId = $routeParams.userId;
        vm.path = $location.path();

        vm.messages = {
            updateMessage: 'The data is saved!',
            errorServer:  'Server is not available!'
        };

        vm.actions = {
            save: save
        };

        init();

        function init(){
            if(vm.userId !== 'add'){
                if(vm.path.match('user')){
                    loadUser();
                }
                else if(vm.path.match('admin')){
                    loadAdmin();
                }

            }
        }

        function loadUser(){
            dataService.Users.getUserById(vm.userId).then(
                function (data){
                    vm.user = data;
                },
                function (response){
                    messageService.showPopup(vm.messages.errorServer, 'error');
                }
            );
        }

        function loadAdmin(){
            dataService.Admins.getUserById(vm.userId).then(
                function (data){
                    vm.user = data;
                },
                function (response){
                    messageService.showPopup(vm.messages.errorServer, 'error');
                }
            );
        }


        function save() {

            if (vm.profileForm.$valid) {

                if(vm.path.match('user')) {
                    dataService.Users.save(vm.user).then(
                        function (data) {
                            messageService.showPopup(vm.messages.updateMessage, 'success');
                            $location.path('#/list');
                        },
                        function (response) {
                            messageService.showPopup(vm.messages.errorServer, 'error');
                        }
                    );
                }
                else if(vm.path.match('admin')){
                    dataService.Admins.save(vm.user).then(
                        function (data) {
                            messageService.showPopup(vm.messages.updateMessage, 'success');
                            $location.path('#/list');
                        },
                        function (response) {
                            messageService.showPopup(vm.messages.errorServer, 'error');
                        }
                    );
                }
            }

        }

    }

})();