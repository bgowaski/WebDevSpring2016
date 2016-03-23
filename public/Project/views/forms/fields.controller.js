(function () {
    'use strict';

    angular.module("YoProLivingApp")
        .controller("FieldsController", FieldsController);

    function FieldsController($scope) {
        if (!$rootScope.currentUser) {
            $rootScope.$location.url('/login')
        }
    }
})();