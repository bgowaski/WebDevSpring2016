module.exports = function(mongoose) {

    var ListingSchema = new mongoose.Schema({
        userId: String,
        type: String,
        location: String,
        address: String,
        pets: {
            type: Boolean,
            default: false
        },
        utilities: [String],
        details: String,
        parking: {
            type: Boolean,
            default: false
        }
    },{collection: "ListingModel"});

    return ListingSchema

};