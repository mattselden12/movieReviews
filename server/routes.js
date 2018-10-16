const api = require("./controller.js");
const bodyparser = require("body-parser");
module.exports = function (app) {
    app.use(bodyparser.json());
    app.get("/authors", api.allAuthors);
    app.get("/authors/:id", api.thisAuthor);
    app.post("/authors", api.createAuthor);
    app.put("/authors/:id", api.updateAuthor);
    app.delete("/authors/:id", api.deleteAuthor);
    app.post("/api/quotes/:id", api.addQuote);
    return app;
}