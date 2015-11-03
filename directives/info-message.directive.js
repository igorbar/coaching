(function(){
    'use strict';
    angular
        .module('coaching')
        .directive('infoMessage', infoMessage);

    function infoMessage() {
        return {
            restrict: 'E',
            scope: {
                type: "=",
                cancel: '&onCancel',
                message: "="
            },
            templateUrl: "directives/info-message.directive.html"
        };
    }

})();