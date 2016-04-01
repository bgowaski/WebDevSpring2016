(function() {
    angular
        .module("YoProLivingApp")
        .controller("MainController", MainController);

    function MainController($scope, $location){
        $scope.$location = $location;
    }

})();