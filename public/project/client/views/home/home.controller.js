(function()
{
    angular
        .module("YoProLivingApp")
        .controller("HomeController", ['YoProLivingService', '$location',  HomeController]);

    function HomeController(YoProLivingService, $location) {
        var vm = this;
        vm.searchAll = searchAll;
        vm.select = select;

        function searchAll(name){
            YoProLivingService.searchAll({q: name})
                .then(function(ret) {
                    vm.found = ret.data;
                    $location.path('/home');
                });
        }

        function select(item){
            if (item.type == 'listing'){
                $location.path('/listing/'+item.id);
            }
        }
    }
})();