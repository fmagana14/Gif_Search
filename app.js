// Require Libraries
const express = require("express");

// App Setup
const app = express();

app.use(express.static('public'));
// Middleware
// Allow Express (our web framework) to render HTML templates and send them back to the client using a new function
const handlebars = require("express-handlebars");

const hbs = handlebars.create({
  // Specify helpers which are only registered on this instance.
  helpers: {
    foo() {
      return "FOO!";
    },
    bar() {
      return "BAR!";
    },
  },
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");
// MIDDLEWARE ENDS HERE

// Routes
// app.js
// Require Libraries

// Require tenorjs near the top of the file
const Tenor = require("tenorjs").client({
  // Replace with your own key
  Key: "AIzaSyBlJ5FnJRvT_r0FamXIFcyZ92raUW9xOyY", // https://tenor.com/developer/keyregistration
  Filter: "high", // "off", "low", "medium", "high", not case sensitive
  Locale: "en_US", // Your locale here, case-sensitivity depends on input
});

// routes
app.get("/", (req, res) => {
  let term = "funny";
  if (req.query.term) {
    term = req.query.term;
  }
  // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
  Tenor.Search.Query(term, "10")
    .then((response) => {
      // store the gifs we get back from the search
      const gifs = response;
      console.log(gifs); // Debug line
      // pass the gifs as an object into the home page
      res.render("home", { gifs });
    })
    .catch(console.error);
});
// Start Server

app.listen(3000, () => {
  console.log("Gif Search listening on port localhost:3000!");
});
