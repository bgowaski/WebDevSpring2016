/**
 * Created by bgowaski on 3/31/16.
 */
module.exports = function(mongoose){

    var Field = require('./field.schema.server')(mongoose);

    var formSchema = mongoose.Schema({

        userId: String,
        title: {type: String, default: 'New Listing'},
        fields: [Field],
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now}
    }, {collection: 'yoproliving.form'});

    return formSchema

};