const api = require("./controller.js");
const bodyparser = require("body-parser");
module.exports = function (app) {
    app.use(bodyparser.json());
    app.get("/movies", api.allMovies);
    app.get("/movies/:id", api.thisMovie);
    app.post("/movies", api.createMovie);
    app.put("/movies/:id", api.updateMovie);
    app.delete("/movies/:id", api.deleteMovie);
    app.post("/api/reviews/:id", api.addReview);
    return app;
}