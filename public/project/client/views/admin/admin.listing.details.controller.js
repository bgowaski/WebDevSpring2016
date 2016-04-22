(function()
{
    angular
        .module("YoProLivingApp")
        .controller("AdminListingDetailController", ['YoProLivingService', '$routeParams', '$location',  AdminListingDetailController]);

    function AdminListingDetailController(YoProLivingService, $routeParams, $location)
    {
        var vm = this;
        var listingId = $routeParams.listingId;

        function init(){
        }
        init();
    }
})();