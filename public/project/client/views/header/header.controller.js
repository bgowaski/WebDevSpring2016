(function(){
    angular
        .module("YoProLivingApp")
        .controller("HeaderController", ['UserService', '$location', '$rootScope', HeaderController]);

    function HeaderController(UserService, $location, $rootScope) {

        var vm = this;

        vm.logout = logout;

        function init() {
            vm.$location = $location;
        }

        init();

        function logout(){
            UserService
                .logout()
                .then(
                    function(){
                        $rootScope.currentUser = null;
                        $location.url("/home");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }

    }
})();