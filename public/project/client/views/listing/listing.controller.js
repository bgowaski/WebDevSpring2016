(function()
{
    angular
        .module("YoProLivingApp")
        .controller("ListingController", ['YoProLivingService', '$location', ListingController]);

    function ListingController(YoProLivingService, $location) {
        var vm = this;
        vm.selectListing = selectListing;
        vm.searchListing = searchListing;

        function init(){
        }
        return init();

        function selectListing(listing){
            $location.path('/listing/'+listing.id);
        }

        function searchListing(name){
            vm.listings = [];
            YoProLivingService.searchAll({q: name})
                .then(function(listingList) {
                    for (var i  in listingList.data){
                        if (lisitngList.data[i].type == 'listing'){
                            vm.listings.push(lisitngList.data[i]);
                        }
                    }
                });
            $location.path('/listing');
        }
    }
})();