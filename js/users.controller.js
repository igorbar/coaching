(function(){
    'use strict';
    angular.module('coaching')
        .controller('userListCtrl', userListCtrl);

    userListCtrl.$inject = ['dataService', 'messageService'];

    function userListCtrl(dataService, messageService) {
        var vm = this;
        vm.expression = 'firstName';
        vm.reverse = false;
        vm.showMessage = false;
        vm.message = '';
        vm.typeMessage = '';
        vm.users = [];
        vm.admins = [];
        vm.removeUser = null;
        vm.showModal = false;

        vm.messages = {
            removeMessage:  'User was removed!',
            errorServer:  'Server is not available!'
        };

        vm.actions = {
            getRemoveUserId:getRemoveUserId,
            removeUser:removeUser
        };


        function loadData(){
            dataService.Users.getAll().then(
                function (data){
                    vm.users = data;
                },
                function (response){
                    messageService.showPopup(vm.messages.errorServer, 'error');
                }
            );
            dataService.Admins.getAll().then(
                function (data){
                    vm.admins = data;
                },
                function (response){
                    messageService.showPopup(vm.messages.errorServer, 'error');
                }
            );
        }

        loadData();

        function getRemoveUserId(userId, group){
            vm.removeUser = userId;
            vm.userGroup = group;
            vm.showModal = true;
        }

        function removeUser(){
            if(vm.userGroup === 'user'){
                dataService.Users.remove(vm.removeUser).then(
                    function (data){
                        angular.forEach(vm.users, function(user, key){
                            if(user.id === vm.removeUser){
                                vm.users.splice(key, 1);
                            }
                        });
                        messageService.showPopup(vm.messages.removeMessage, 'success');
                    },
                    function (response){
                        messageService.showPopup(vm.messages.errorServer, 'error');
                    }
                );
            }
            else if(vm.userGroup === 'admin'){
                dataService.Admins.remove(vm.removeUser).then(
                    function (data){
                        angular.forEach(vm.admins, function(admin, key){
                            if(admin.id === vm.removeUser){
                                vm.admins.splice(key, 1);
                            }
                        });
                        messageService.showPopup(vm.messages.removeMessage, 'success');
                    },
                    function (response){
                        messageService.showPopup(vm.messages.errorServer, 'error');
                    }
                );
            }

        }

    }

})();
