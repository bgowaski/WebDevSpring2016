(function()
{
    angular
        .module("YoProLivingApp")
        .controller("ListingDetailController", ['YoProLivingService', 'UserService', '$location', '$routeParams', '$rootScope',ListingDetailController]);

    function ListingDetailController(YoProLivingService, UserService, $location, $routeParams, $rootScope) {
        var vm = this;
        vm.listing = {};
        var listingId = $routeParams.id;

        function init(){
            YoProLivingService.getListingById(listingId)
                .then(function(ret) {
                    vm.listing = ret.data;
                    //if (!$rootScope.currentUser) return;
                    //for (var i in $rootScope.currentUser.favorites) {
                    //    if ($rootScope.currentUser.favorites[i].name == vm.listing.name) {
                    //        vm.favorited = 1;
                    //    }
                    //}
                });
        }
        return init();
    }
})();