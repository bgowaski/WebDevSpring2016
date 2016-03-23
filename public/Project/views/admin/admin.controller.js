(function () {
    'use strict';

    angular.module("YoProLivingApp")
        .controller("AdminController", AdminController);

    function AdminController($scope) {
        if (!$rootScope.currentUser.roles.indexOf('admin') > -1) {
            $rootScope.$location.url('/login')
        }
    }
})();