(function () {
    angular
        .module("YoProLivingApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, UserService) {
        $scope.logout = logout;

        function logout() {
            UserService.setCurrentUser(null);
            $rootScope.$location.url("/home");
        }
    }
})();