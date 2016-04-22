/**
 * Created by bgowaski on 3/31/16.
 */
module.exports = function(mongoose){
    "use strict";

    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],
        age: String,
        Occupation: String,
        Location: String,
        roles: [{
            type: String,
            enum: ["user","admin"]
        }]

    }, {collection: 'yoproliving.user'});

    return userSchema

};