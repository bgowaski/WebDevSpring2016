/**
 * Created by bgowaski on 3/31/16.
 */
module.exports = function(mongoose){
    "use strict";

    var fieldSchema = mongoose.Schema({

        userId: String,
        title: String,
        fields: [fieldSchema],
        created: Date,
        updated: Date

    }, {collection: 'assignment.field'});

    return fieldSchema

};