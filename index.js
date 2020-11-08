// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "3001";
/**
 *  App Configuration
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.get("/dashboard", (req, res) => {
    res.render("dashboard", { title: "Dashboard", userProfile: { nickname: "William", reviews: "1, 2", upvotes: "23542", comments: "111111111" } });
});

app.get("/edit", (req, res) => {
    res.render("edit", { title: "Edit Post" });
});
app.get("/view", (req, res) => {
    res.render("view-post", { title: "View Post" })
})
/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});