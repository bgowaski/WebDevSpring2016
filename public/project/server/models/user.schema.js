
module.exports = function(mongoose) {
    var UserSchema = new mongoose.Schema(
        {
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            roles: [String],
            emails: [String],
            phones: [String],
            favorites: [String],
            admin: [String]
        }, {collection: "users"});

    return UserSchema

};