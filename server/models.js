const mongoose = require("mongoose");
const MovieSchema = new mongoose.Schema({
    mtitle: {
        type: String,
        required: [true, "The movie must have a title."],
        minlength: [3, "The movie's title should be at least three characters long"]
        },
    mreviews: [{
        review: {
            type: String,
            required: [true, "You can't submit an empty review."],
            minlength: [3, "Your review must have at least three characters."]
        },
        votes: {
            type: Number,
            default: 0
        }
    }]
}, { timestamps: true })

mongoose.connect("mongodb://localhost:27017/moviesdb", { useNewUrlParser: true }, (errs) => console.log(errs ? errs : "db is lookin good"));

module.exports = mongoose.model("Movie", MovieSchema)