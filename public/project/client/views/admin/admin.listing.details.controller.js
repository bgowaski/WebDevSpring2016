(function()
{
    angular
        .module("YoProLivingApp")
        .controller("AdminListingDetailController", ['YoProLivingService', '$routeParams', '$location',  AdminListingDetailController]);

    function AdminListingDetailController(YoProLivingService, $routeParams, $location)
    {
        var vm = this;
        var listingId = $routeParams.listingId;
        vm.listing = {};
        vm.update = update;

        function init(){
            YoProLivingService.getListingById(listingId)
                .then(function(ret) {
                    vm.listing = ret.data;
                });
        }
        init();


        function update(listing){
            YoProLivingService.updateListingById(listing._id, listing)
                .then(function(response) {
                   // nothing to do
                });
        }
    }
})();