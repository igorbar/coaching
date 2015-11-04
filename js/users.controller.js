(function(){
    'use strict';
    angular.module('coaching')
        .controller('userListCtrl', userListCtrl);

    userListCtrl.$inject = ['dataService'];

    function userListCtrl(dataService) {
        var vm = this;
        vm.expression = 'firstName';
        vm.reverse = false;
        vm.showMessage = false;
        vm.message = '';
        vm.typeMessage = '',
        vm.users = [];
        vm.removeUser = null;
        vm.showModal = false;

        vm.actions = {
            showPopup:showPopup,
            hidePopup:hidePopup,
            getRemoveUserId:getRemoveUserId,
            removeUser:removeUser
        };

        activate();

        function activate() {
            return dataService.getData().success(function (data) {
                vm.users = data;
            })
            .error(function(data) {
                showPopup(vm.messages.errorServer, 'error');
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
                        vm.users.splice(key, 1)
                    }
                });
                showPopup(vm.messages.removeMessage, 'success');
            })
            .error(function(data) {
                 showPopup(vm.messages.errorServer, 'error')
            });
        }

        function showPopup(message, type) {
            vm.showMessage = true;
            vm.message = message;
            vm.typeMessage = type;
        };

        function hidePopup() {
            vm.showModal = false;
            vm.message = '';
            vm.typeMessage = '';
        };

        vm.messages = {
            addMessage:  'New user was created!',
            updateMessage: 'Update was successful!',
            removeMessage:  'User was removed!',
            errorServer:  'Server is not available!'
        };

    }

})();