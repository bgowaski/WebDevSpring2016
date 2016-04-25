var q = require("q");
var mongoose = require('mongoose');

module.exports = function() {

    var ListingSchema = require('./listing.schema.js')(mongoose);
    var ListingModel = mongoose.model('ListingModel', ListingSchema);

    return {
        searchListings : searchListings,
        searchAll : searchAll,
        getAllCategories : getAllCategories,
        getCategoryById : getCategoryById,
        getListingById : getListingById,
        getListingByIds : getListingByIds,
        getListingsByLocation : getListingsByLocation,
        deleteListingById: deleteListingById,
        createListingForUser: createListingForUser,
        updateListingById: updateListingById,
        findAllListingsForUser: findAllListingsForUser,
        findListingByName: findListingByName,
        createListing: createListing
    };


    //Search Functions
    function searchListings(params){
        return ListingModel.search.listings(params);
    }
    function searchAll(params){
        return ListingModel.find();
    }

    //Category
    function getAllCategories(f) {
        return ListingModel.category.all(f);
    }
    function getCategoryById(id, f) {
        return ListingModel.category.getById(Number(id), f);
    }
    //Listings
    function getListingById(id){
        return ListingModel.findById(id);
    }
    function getListingByIds(ids, f){
        return ListingModel.getById(ids, {}, f);
    }
    function getListingsByLocation(location){
        return ListingModel.find({location: location});
    }

    // Form editing
    function createListing(listing){
        var deferred = q.defer();
        ListingModel.create(listing, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllListingsForUser(userId){
        var deferred = q.defer();
        ListingModel.find(
            { userId: userId },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function createListingForUser(userId, listing){
        listing.userId = userId;
        return createListing(listing);
    }

    function updateListingById(listingId, listing){
        return ListingModel.update({_id: listingId}, {$set: listing})
    }

    function deleteListingById(listingId){
        return ListingModel.findById(listingId).remove();
    }

    function findListingByName(name){
        var deferred = q.defer();
        ListingModel.find(
            { name: name },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
};