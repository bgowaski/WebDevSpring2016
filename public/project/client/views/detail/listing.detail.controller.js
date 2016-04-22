(function()
{
    angular
        .module("YoProLivingApp")
        .controller("ListingDetailController", ['YoProLivingService', 'UserService', '$location', '$routeParams', '$rootScope',LisitngDetailController]);

    function ListingDetailController(YoProLivingService, UserService, $location, $routeParams, $rootScope) {
        var vm = this;
        var listingId = $routeParams.id;

        function init(){
            YoProLivingService.getListingById(breweryId)
                .then(function(ret) {
                    vm.listing = ret.data;
                    $location.path('/listing/'+listingId);
                    if (!$rootScope.currentUser) return;
                    for (var i in $rootScope.currentUser.favorites) {
                        if ($rootScope.currentUser.favorites[i].name == vm.listing.name) {
                            vm.favorited = 1;
                        }
                    }
                });
        }
        return init();

        function favorite(){
            if (!vm.favorited){
                UserService.userLikes($rootScope.currentUser._id, {name: vm.listing.name, id: vm.listing.id, type: "listing"})
                    .then(function () {
                        $location.path('/listing/'+listingId);
                        vm.favorited = 1;
                    });
            }
            else {
                UserService.userDislikes($rootScope.currentUser._id, {name: vm.listing.name, id: vm.listing.id, type: "listing"})
                    .then(function () {
                        $location.path('/listing/'+listingId);
                        vm.favorited = 0;
                    });
            }
        }
    }
})();