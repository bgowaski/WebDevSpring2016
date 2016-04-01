/**
 * Created by bgowaski on 3/31/16.
 */
module.exports = function(mongoose){
    "use strict";

    var fieldSchema = mongoose.Schema({
        label: String,
        type:[{
            type: String,
            enum: [TEXT, TEXTAREA, EMAIL, PASSWORD, OPTIONS, DATE, RADIOS, CHECKBOXES],
            default: TEXT
        }],
        placeholder: String,
        options: [{label:STRING, value:STRING}]
    }, {collection: 'assignment.field'});

    return fieldSchema
};