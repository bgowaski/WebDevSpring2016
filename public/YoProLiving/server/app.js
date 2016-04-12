/**
 * Created by bgowaski on 3/17/16.
 */
module.exports = function(app, db, mongoose) {
    var userModel    = require("./models/user.model.server.js")(db,mongoose);
    var formModel    = require("./models/form.model.server.js")(db,mongoose);
    var fieldModel   = require("./models/field.model.server.js")(db, mongoose);
    var userService  = require("./services/user.service.server.js")(app, userModel);
    var formService  = require("./services/form.service.server.js")(app, formModel);
    var fieldService  = require("./services/fields.service.server.js")(app, formModel);
};
