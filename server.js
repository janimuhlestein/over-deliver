const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Super super secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    maxAge: 10 * 60 * 1000,
    store: new SequelizeStore({
        db: sequelize
    }),
    rolling: true
};

app.use(session(sess));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
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
    res.render("view-post", { title: "View Post" });
});
app.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});
app.get("/signup", (req, res) => {
    res.render("signup", { title: "Sign-up" });
});
app.get("/search", (req, res) => {
    res.render("search", { title: "Search" });
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});