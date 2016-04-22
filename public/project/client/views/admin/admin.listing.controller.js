(function()
{
    angular
        .module("YoProLivingApp")
        .controller("AdminListingController", ['YoProLivingService', '$location', '$rootScope',  AdminListingController]);

    function AdminListingController(YoProLivingService, $location, $rootScope)
    {
        var vm = this;
        vm.updating = 1;
        vm.addListing = addListing;
        vm.updateListing = updateListing;
        vm.deleteListing = deleteListing;
        vm.selectListing = selectListing;
        vm.clickListing = clickListing;
        vm.updating = 1;

        function init(){
            console.log("init");
            vm.$location = $location;
            vm.user = $rootScope.currentUser;
            YoProLivingService.findAllListingsForUser(vm.user._id)
                .then(function(listings) {
                    console.log(listings.data);
                    vm.listings = listings.data;
                    $location.path('/AdminListing');
                });
        }
        return init();

        function addListing(newListing){
            YoProLivingService.createListingForUser(vm.user._id, newListing);
            YoProLivingService.findAllListingsForUser(vm.user._id)
                .then(function(listings) {
                    newListing.name = "";
                    newListing.details = "";
                    vm.listings = listings.data;
                    $location.path('/AdminListing');
                });
        }

        function updateListing(newListing){
            YoProLivingService.updateListingById(newListing._id, newListing);
            YoProLivingService.findAllListingsForUser(vm.user._id)
                .then(function(listings) {
                    newListing.name = "";
                    newListing.details = "";
                    vm.updating = 1;
                    vm.listings = listings.data;
                    $location.path('/AdminListing');
                });
        }
        function deleteListing(listing){
            YoProLivingService.deleteListingById(listing._id)
                .then(function(listings) {
                    vm.listings = listings.data;
                    $location.path('/AdminListing');
                });
        }

        function selectListing(index){
            vm.selectedListingIndex = index;
            vm.newListing = vm.listings[index];
            vm.updating = 0;
        }

        function clickListing(listing){
            $location.path('/AdminListing/'+listing._id);
        }
    }
})();