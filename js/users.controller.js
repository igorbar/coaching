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
        vm.typeMessage = '',
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

        activate();

        function activate() {
            return dataService.getData().success(function (data) {
                mapData(data);
            })
            .error(function(data) {
                messageService.showPopup(vm.messages.errorServer, 'error');
            });
        }

        function mapData(data){
            angular.forEach(data, function(item){
                if(item.admin){
                    vm.admins.push(item);
                }
                else {
                    vm.users.push(item);
                }
            });
        }

        function getRemoveUserId(userId){
            vm.removeUser = userId;
            vm.showModal = true;
        }

        function removeUser(){
            dataService.remove(vm.removeUser).success(function (data) {
                angular.forEach(vm.users, function(user, key){
                    if(user.id == vm.removeUser){
                        vm.users.splice(key, 1);
                    }
                });
                angular.forEach(vm.admins, function(admin, key){
                    if(admin.id == vm.removeUser){
                        vm.admins.splice(key, 1);
                    }
                });
                messageService.showPopup(vm.messages.removeMessage, 'success');
            })
            .error(function(data) {
                messageService.showPopup(vm.messages.errorServer, 'error')
            });
        }

    }

})();