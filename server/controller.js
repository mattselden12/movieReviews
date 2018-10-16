const Movie = require("./models.js");
module.exports = {
    allMovies: (req, res) => Movie
        .find({})
        .sort('field aname')
        .then(data => res.json(
            { status: "good", content: data }
        ))
        .catch(errs => res.json(
            { status: "bad", content: errs }
        )),
    thisMovie: (req, res) => Movie
        .findById(req.params.id)
        .then(data => res.json(
            { status: "good", content: data }
        ))
        .catch(errs => res.json(
            { status: "bad", content: errs }
        )),
    createMovie: (req, res) => Movie
        .create(req.body)
        .then(data => console.log("createMovie route worked") || res.json(
            { status: "good", content: data }
        ))
        .catch(errs => console.log("createMovie route error") || res.json(
            { status: "bad", content: errs }
        )),
    updateMovie: (req, res) => Movie
        .findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(data => res.json(
            { status: "good", content: data }
        ))
        .catch(errs => res.json(
            { status: "bad", content: errs }
        )),
    deleteMovie: (req, res) => Movie
        .findByIdAndRemove(req.params.id)
        .then(data => res.json(
            { status: "good", content: data }
        ))
        .catch(errs => res.json(
            { status: "bad", content: errs }
        )),

    addReview: (req, res) => Movie.findById(req.params.id)
        .then(data => {
            let curMov = data;
            curMov.mreviews.push(req.body);
            curMov.save(function (err, data) {
                if (err) {
                    console.log(err);
                    res.json({ status: "bad", content: err })
                }
                else {
                    console.log(data);
                    console.log(curMov);
                    res.json({ status: "good", content: data })

                }
            })
        })
        .catch(errs => res.json(
            { status: "bad", content: errs }
        ))
}
