module.exports = function(mongoose) {

    var ListingSchema = new mongoose.Schema({
        userId: String,
        type: String,
        location: String,
        rent: String,
        address: String,
        bedrooms: String,
        pets: String,
        //pets: {
        //    type: Boolean,
        //    default: false
        //},
        utilities: String,
        details: String,
        parking: String,
        contact: String,
        //parking: {
        //    type: Boolean,
        //    default: false
        //}
        image: String
    },{collection: "ListingModel"});

    return ListingSchema

};