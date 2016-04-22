/**
 * Created by bgowaski on 3/17/16.
 */
module.exports = function(app, db, mongoose, userModel) {
    var formModel    = require("./models/form.model.server.js")(db, mongoose);
    var fieldModel   = require("./models/field.model.server.js")(db, mongoose);
    var userService  = require("./services/user.service.server.js")(app, userModel);
    var formService  = require("./services/form.service.server.js")(app, formModel);
    var fieldService  = require("./services/fields.service.server.js")(app, fieldModel);
};
