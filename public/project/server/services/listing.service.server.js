module.exports = function(app, model) {
    app.post("/api/project/search/listing", searchListings);
    app.post("/api/project/search", searchAll);
    app.get("/api/project/category", getAllCategories);
    app.get("/api/project/category/:id", getCategoryById);
    app.get("/api/project/listing/listings", getListingByIds);
    app.get("/api/project/listing/:id", getListingById);
    app.post("/api/project/listing", getListingByParams);
    app.delete("/api/project/listing/:listingId", deleteListingById);
    app.post("/api/project/user/:userId/listing", createListingForUser);
    app.put("/api/project/listing/:listingId", updateListingById);
    app.get("/api/project/user/:userId/listing", findAllListingsForUser);
    app.get("/api/project/listing/:listingName", findListingByName);

    function searchListings(req, res){
        var params = req.body;
        model.searchListings(params, function(err, list)
        {
            res.json(list);
        });
    }

    function searchAll(req, res){
        var params = req.body;
        model.searchAll(params, function(err, list)
        {
            res.json(list);
        });
    }

    function getAllCategories(req, res){
        model.getAllCategories(function(err, list)
        {
            res.json(list);
        });
    }

    function getCategoryById(req, res){
        var id = req.params.id;
        model.getCategoryById(id, function(err, list)
        {
            res.json(list);
        });
    }

    function getListingById(req, res){
        var id = req.params.id;
        model.getListingById(id, function(err, list)
        {
            res.json(list);
        });
    }
    function getListingByIds(req, res){
        var ids = req.body;
        model.getListingByIds(ids, function(err, list)
        {
            res.json(list);
        });
    }
    function getListingByParams(req, res){
        var params = req.body;
        if (req.query.id){
            getListingById(req, res);
        }
        model.getListingByParams(params, function(err, list)
        {
            res.json(list);
        });
    }

    function getListingsByLocation(req, res){
        var location = req.query.location;
        model.getListingsByLocation(location)
            .then(function (list) {
            res.json(list);
        });
    }

    function findAllListingsForUser(req, res){
        var userId = req.params.userId;
        model.findAllListingsForUser(userId).then(
            function (doc) {
                res.json(doc);
            },
            function ( err ) {
                res.status(400).send(err);
            }
        );
    }

    function deleteListingById(req, res){
        var listingId = req.params.listingId;
        model.deleteListingById(listingId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findListingByName(req, res){
        var listingName = req.params.listingName;
        model.findListingByName(listingName)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function createListingForUser(req, res){
        var listing = req.body;
        var listingId = req.params.userId;
        model.createListingForUser(listingId, listing)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateListingById(req, res){
        var listing = req.body;
        var listingId = req.params.listingId;
        model.updateListingById(listingId, listing)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }
};