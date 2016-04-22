(function(){
    angular
        .module("YoProLivingApp")
        .factory("YoProLivingService", YoProLivingService);

    function YoProLivingService($http) {
        var api = {
            searchListings : searchListings,
            searchAll : searchAll,
            getAllCategories : getAllCategories,
            getCategoryById : getCategoryById,
            getListingsByLocation : getListingsByLocation,
            getListingByParams : getListingByParams,
            getListingById : getListingById,
            createListingForUser: createListingForUser,
            findAllListingsForUser: findAllListingsForUser,
            deleteListingById: deleteListingById,
            updateListingById: updateListingById,
            findListingByName: findListingByName
        };
        return api;

        function searchListings(params) {
            return $http.post("/api/project/search/listing",params);
        }
        function searchAll(params) {
            return $http.post("/api/project/search",params);
        }
        function getAllCategories() {
            return $http.get("/api/project/category");
        }
        function getCategoryById(id) {
            return $http.get("/api/project/category/"+id);
        }
        function getListingById(id) {
            return $http.get("/api/project/listing/"+id);
        }
        function getListingsByLocation(location) {
            return $http.get("/api/project/listing?location="+location);
        }
        function getListingByParams(params) {
            return $http.post("/api/project/listing",params);
        }
        function createListingForUser(userId, listing){
            return $http.post("/api/project/user/"+userId+"/listing", listing);
        }
        function findAllListingsForUser(userId){
            return $http.get("/api/project/user/"+userId+"/listing");
        }
        function deleteListingById(listingId){
            return $http.delete("/api/project/listing/"+listingId);
        }
        function findListingByName(listingName){
            return $http.get("/api/project/listing/"+listingName);
        }
        function updateListingById(listingId, listing){
            return $http.put("/api/project/listing/"+listingId, listing);
        }
    }
})();