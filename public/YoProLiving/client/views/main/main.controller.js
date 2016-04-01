(function () {
    angular
        .module("YoProLivingApp")
        .controller("MainController", MainController);

    function MainController($rootScope, $location) {
        $rootScope.$location = $location;
        $rootScope.currentUser = null;
    }
})();