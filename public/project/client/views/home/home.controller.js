(function()
{
    angular
        .module("YoProLivingApp")
        .controller("HomeController", ['YoProLivingService', '$location',  HomeController]);

    function HomeController(YoProLivingService, $location) {
        var vm = this;
        vm.searchAll = searchAll;
        vm.select = select;

        function searchAll(location){
            console.log(location);
            YoProLivingService.searchAll({q: location})
                .then(function(ret) {
                    vm.found = ret.data;
                    $location.path('/home');
                });
        }

        function select(item){
            $location.path('/listing/'+item._id);
        }
    }
})();