(function(){
    'use strict';
    angular
        .module('coaching')
        .directive('infoMessage', infoMessage);

    infoMessage.$inject = ['messageService'];

    function infoMessage(messageService) {
        return {
            restrict: 'AE',
            scope: {

            },
            link: function (scope) {
                scope.data = messageService.data;

                scope.cancel = function() {
                    messageService.hidePopup();
                };
            },
            templateUrl: "directives/info-message.directive.html"
        };
    }

})();