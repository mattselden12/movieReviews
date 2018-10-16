const mongoose = require("mongoose");
const AuthorSchema = new mongoose.Schema({
    aname: {
        type: String,
        required: [true, "The author must have a name."],
        minlength: [3, "The author's name should be at least three characters long"]
        },
    quotes: [{
        quote: {
            type: String,
            required: [true, "You can't submit an empty quote."],
            minlength: [3, "Your quote must have at least three characters."]
        },
        votes: {
            type: Number,
            default: 0
        }
    }]
}, { timestamps: true })

mongoose.connect("mongodb://localhost:27017/authordb4", { useNewUrlParser: true }, (errs) => console.log(errs ? errs : "db is lookin good"));

module.exports = mongoose.model("Author", AuthorSchema)