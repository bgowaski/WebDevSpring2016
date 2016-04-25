module.exports = function(app) {

    var userModel   = require("./models/user.model.js")();
    var ListingModel   = require("./models/listing.model.js")();

    var userService  = require("./services/user.service.server.js") (app, userModel);
    var ListingService = require("./services/listing.service.server.js")(app, ListingModel, userModel);
};