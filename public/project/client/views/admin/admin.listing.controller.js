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
                .then(function(response) {
                    console.log("response " + response);
                    console.log("id to remove" + listing._id);
                    for (var x in vm.listings){
                        console.log("comparing to " + vm.listings[x]._id);
                        if (vm.listings[x]._id == listing._id){
                            console.log("splicing at " + x);
                            vm.listings.splice(x,1);
                            break;
                        }
                    }
                    $location.path('/AdminListing');
                });
        }

        function selectListing(index){
            $location.path('/AdminListing/' + vm.listings[index]._id);
        }

    }
})();