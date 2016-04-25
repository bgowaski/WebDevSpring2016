(function()
{
    angular
        .module("YoProLivingApp")
        .controller("ListingController", ['YoProLivingService', '$location', ListingController]);

    function ListingController(YoProLivingService, $location) {
        var vm = this;
        vm.searchAll = searchAll;
        vm.select = select;

        function searchAll(location){
            console.log(location);
            YoProLivingService.searchAll({q: location})
                .then(function(ret) {
                    vm.found = ret.data;
                    $location.path('/listing');
                });
        }

        function select(item){
            $location.path('/listing/'+item._id);
        }
    }
})();