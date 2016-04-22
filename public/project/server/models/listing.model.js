var q = require("q");
var mongoose = require('mongoose');

module.exports = function(listingdb) {

    var objectSchema = new mongoose.Schema({
        location: String,
        description: String,
        other: [String]
    });

    var ListingSchema = new mongoose.Schema(
        {
            name: String,
            detail: [objectSchema],
            userId: String
        }, {collection: "ListingModel"});

    var ListingModel = mongoose.model('ListingModel', ListingSchema);


    return {
        searchListings : searchListings,
        searchAll : searchAll,
        getAllCategories : getAllCategories,
        getCategoryById : getCategoryById,
        getListingById : getListingById,
        getListingByIds : getListingByIds,
        getListingByParams : getListingByParams,
        getListingsByLocation : getListingsByLocation,
        deleteListingById: deleteListingById,
        createListingForUser: createListingForUser,
        updateListingById: updateListingById,
        findAllListingsForUser: findAllListingsForUser,
        findListingByName: findListingByName,
        createListing: createListing
    };


    //Search Functions
    function searchListings(params, f){
        return listingdb.search.listings(params, f);
    }
    function searchAll(params, f){
        return listingdb.search.all(params, f);
    }

    //Category
    function getAllCategories(f) {
        return listingdb.category.all(f);
    }
    function getCategoryById(id, f) {
        return listingdb.category.getById(Number(id), f);
    }

    //Listings
    function getListingById(id, f){
        return listingdb.listings.getById(id, {withLocations: 'Y', withSocialAccounts: 'Y'}, f);
    }
    function getListingByIds(ids, f){
        return listingdb.listings.getById(ids, {}, f);
    }
    function getListingByParams(params, f){
        return listingdb.listings.find(params, f);
    }
    function getListingsByLocation(location){
        return listingdb.listings.find(location);
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
        var deferred = q.defer();
        ListingModel.findByIdAndUpdate(listingId, listing, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteListingById(listingId){
        var deferred = q.defer();
        ListingModel.findById(listingId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.remove();
                ListingModel.find(function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
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