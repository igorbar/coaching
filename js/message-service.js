(function(){
    angular
        .module('coaching')
        .service('messageService', messageService);

    messageService.$inject = [];

    function messageService() {

        var service = {
            showPopup: showPopup,
            hidePopup:hidePopup
        };
        service.data = {
            showMessage: false,
            message: '',
            typeMessage: ''
        };

        function showPopup(message, type) {
            service.data.showMessage = true;
            service.data.message = message;
            service.data.typeMessage = type;
        };

        function hidePopup() {
            service.data.showMessage = false;
            service.data.message = '';
            service.data.typeMessage = '';
        };

        return service;

    }

})();
